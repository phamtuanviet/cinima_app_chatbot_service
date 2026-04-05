import { HumanMessage, SystemMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
// import { llm } from '../config/groq.js';
import { llm } from '../config/gemini.js';
import { movieTools } from '../docs/tool.js'; 
import { searchFaqInVectorDB } from '../tools/ragTool.js';
import * as springBootApi from './springBootClient.js';
import { redisClient } from '../config/redis.js';

// Trói toàn bộ công cụ vào LLM
const llmWithTools = llm.bindTools(movieTools);

// Lấy ngày hiện tại động (Dynamic Date) để Bot luôn biết hôm nay là thứ mấy, ngày mấy
const today = new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const SYSTEM_PROMPT = `
Bạn là Trợ lý ảo CSKH xuất sắc của hệ thống rạp chiếu phim. 

QUY TẮC HOẠT ĐỘNG CỐT LÕI:

1. KỶ LUẬT SỬ DỤNG CÔNG CỤ (TOOL CALLING):
- TUYỆT ĐỐI KHÔNG gọi công cụ tìm kiếm nếu yêu cầu của khách hàng quá chung chung hoặc mơ hồ (ví dụ: "có phim gì hot", "phim gì hay", "tìm phim").
- KHÔNG BAO GIỜ sử dụng các tính từ cảm quan (như "hot", "hay", "mới", "buồn", "vui") làm tham số 'keyword' để tìm kiếm.
- Nếu thiếu thông tin cụ thể (tên phim, thể loại rõ ràng, vị trí rạp, ngày chiếu), BẮT BUỘC phải đặt 1-2 câu hỏi gợi ý để thu hẹp phạm vi tìm kiếm TRƯỚC KHI gọi tool (Ví dụ: "Dạ, anh/chị đang muốn xem thể loại hành động hay tình cảm ạ?", "Anh/chị muốn tìm rạp ở khu vực nào để em kiểm tra lịch chiếu nhé?").

2. KHÔNG ĐOÁN MÒ DỮ LIỆU:
- Chỉ cung cấp thông tin dựa trên kết quả trả về từ các công cụ (tools).
- Tuyệt đối không tự bịa ra lịch chiếu, tên phim, mã voucher hay chương trình khuyến mãi. Nếu hệ thống không tìm thấy dữ liệu, hãy thành thật báo lại với khách.

3. ĐÚNG CHUYÊN MÔN:
- Chỉ hỗ trợ các vấn đề liên quan đến hệ thống rạp: phim ảnh, lịch chiếu, đặt vé, điểm thưởng, voucher và quy định rạp.
- Khéo léo và lịch sự từ chối mọi chủ đề ngoài lề (thời tiết, tin tức, chính trị, viết code,...).

4. VĂN PHONG & THÁI ĐỘ:
- Trả lời tự nhiên, thân thiện, súc tích và đi thẳng vào vấn đề. KHÔNG dài dòng.
- Xưng hô: Luôn xưng "em" và gọi khách là "anh/chị" hoặc "bạn". 
- Trình bày thông tin (danh sách phim, lịch chiếu) rõ ràng, dễ đọc (dùng gạch đầu dòng hoặc in đậm tên phim).

5. NHẬN THỨC THỜI GIAN & ĐỊA ĐIỂM:
- Thời gian hiện tại là: ${today}.
- LUÔN quy đổi các từ chỉ thời gian tương đối ("hôm nay", "ngày mai", "cuối tuần") sang định dạng ngày tháng chính xác (YYYY-MM-DD) dựa vào mốc thời gian trên trước khi gọi tool tìm lịch chiếu.
`;

// ============================================================================
// HÀM HELPER: CHUYỂN ĐỔI DATA GIỮA LANGCHAIN VÀ REDIS
// ============================================================================
function deserializeMessages(rawArray) {
    return rawArray.map(m => {
        if (m.type === 'system') return new SystemMessage(m.content);
        if (m.type === 'human') return new HumanMessage(m.content);
        if (m.type === 'ai') return new AIMessage({ content: m.content, tool_calls: m.tool_calls });
        if (m.type === 'tool') return new ToolMessage({ content: m.content, tool_call_id: m.tool_call_id, name: m.name });
        return new HumanMessage(m.content); 
    });
}

function serializeMessages(messages) {
    return messages.map(m => {
        if (m instanceof SystemMessage) return { type: 'system', content: m.content };
        if (m instanceof HumanMessage) return { type: 'human', content: m.content };
        if (m instanceof AIMessage) return { type: 'ai', content: m.content, tool_calls: m.tool_calls };
        if (m instanceof ToolMessage) return { type: 'tool', content: m.content, tool_call_id: m.tool_call_id, name: m.name };
        return { type: 'human', content: m.content }; 
    });
}

function maskDataForLLM(toolName, rawData) {
    if (!rawData || typeof rawData === 'string' || rawData.error) return rawData;

    try {
        // Xử lý nếu data là danh sách (List)
        if (Array.isArray(rawData)) {
            const top10 = rawData.slice(0, 10); // Chỉ cho AI đọc 10 kết quả đầu tiên
            
            if (["search_movies", "get_now_playing", "get_coming_soon"].includes(toolName)) {
                return top10.map(m => ({ title: m.title, genre: m.genre, ageRating: m.ageRating }));
            }
            if (["get_showtimes_by_movie", "get_showtimes_by_cinema"].includes(toolName)) {
                return top10.map(s => ({ cinema: s.cinemaName, time: s.startTime, format: s.format }));
            }
            if (toolName === "get_cinemas_nearby") {
                return top10.map(c => ({ name: c.name, address: c.address, distance: c.distance }));
            }
            return top10; // Fallback
        }
        
        // Xử lý nếu data là 1 Object chi tiết
        if (toolName === "get_movie_detail") {
            return { title: rawData.title, duration: rawData.duration, description: rawData.shortDescription };
        }
        
        return rawData;
    } catch (e) {
        return rawData; // Nếu lỗi filter thì đành trả nguyên cục
    }
}

// ============================================================================
// HÀM XỬ LÝ LÕI (XUẤT RA CHO FILE INDEX.JS GỌI)
// ============================================================================
export async function processUserMessage(sessionId, userMessage, userId, userLocation = null) {
    const redisKey = `chat_session:${sessionId}`;
    let messages = [];
    try {
        // --- BƯỚC 1: KÉO LỊCH SỬ & CẮT TỈA (SAFE TRIMMING) ---
        const storedHistory = await redisClient.get(redisKey);
        if (storedHistory) {
            messages = deserializeMessages(JSON.parse(storedHistory));
            if (messages.length > 31) {
                const systemPrompt = messages[0]; 
                let recentHistory = messages.slice(-30); 
                while (recentHistory.length > 0 && !(recentHistory[0] instanceof HumanMessage)) {
                    recentHistory.shift(); 
                }
                messages = [systemPrompt, ...recentHistory];
            }
        } else {
            messages = [new SystemMessage(SYSTEM_PROMPT)];
        }

        const now = new Date();
        const dateVN = now.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const isoDateVN = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })).toISOString().split('T')[0];

        // --- BƯỚC 2: NHỒI TỌA ĐỘ VÀO NGỮ CẢNH (LOCATION CONTEXT) ---
        let hiddenContext = `\n\n--- [GHI CHÚ TỪ HỆ THỐNG - ẨN VỚI NGƯỜI DÙNG] ---`;
        if (userLocation && userLocation.lat && userLocation.lng) {
            hiddenContext = `\n(Ngữ cảnh ẩn: Tọa độ GPS của khách là Lat: ${userLocation.lat}, Lng: ${userLocation.lng}. Hãy dùng nó cho các tool tìm rạp gần đây).`;
        } else {
            hiddenContext = `\n(Ngữ cảnh ẩn: Khách chưa cung cấp vị trí GPS. Nếu cần, hãy bảo khách bấm nút chia sẻ vị trí).`;
        }
        hiddenContext += `\n THỜI GIAN HIỆN TẠI LÀ: ${dateVN} (Định dạng: ${isoDateVN}). BẮT BUỘC dùng mốc thời gian này để tính toán. TUYỆT ĐỐI BỎ QUA mọi thông tin ngày tháng cũ trong lịch sử trò chuyện phía trên.`;
        messages.push(new HumanMessage(userMessage + hiddenContext));

        console.log(`[Session: ${sessionId}] Đang phân tích ý định...`);

        // --- BƯỚC 3: GỌI LLM LẦN 1 (CHỌN TOOL) ---
        const aiResponse = await llmWithTools.invoke(messages);
        messages.push(aiResponse);

        let finalResponseContent = aiResponse.content;
        let uiActions = []; 

        // --- BƯỚC 4: BỘ CHUYỂN MẠCH THỰC THI TOOL ---
        if (aiResponse.tool_calls && aiResponse.tool_calls.length > 0) {
            console.log(`🛠️ Chạy ${aiResponse.tool_calls.length} tool(s)...`);
            console.log("Tool calls chi tiết:", aiResponse.tool_calls);

            const toolResults = await Promise.all(
                aiResponse.tool_calls.map(async (toolCall) => {
                    const toolName = toolCall.name;
                    const args = toolCall.args;
                    
                    let rawData; // Dữ liệu đầy đủ cho Android
                    let llmData; // Dữ liệu siêu nhẹ cho AI đọc

                    switch (toolName) {
                      // 1. Nhóm RAG (FAQ)
                      case "ask_faq":
                        rawData = await searchFaqInVectorDB(args.query);
                        llmData = rawData; // Đã xử lý text nên không cần mask
                        break;

                      // 2. Nhóm Tìm Phim
                      case "search_movies":
                        rawData = await springBootApi.searchMovies(args); // Gọi đích danh tên hàm
                        uiActions.push({
                          type: "SHOW_MOVIE_LIST",
                          data: rawData,
                        });
                        llmData = maskDataForLLM(toolName, rawData);
                        break;

                      case "get_now_playing":
                        rawData = await springBootApi.getNowPlaying(args);
                        uiActions.push({
                          type: "SHOW_MOVIE_LIST",
                          data: rawData,
                        });
                        llmData = maskDataForLLM(toolName, rawData);
                        break;

                      case "get_coming_soon":
                        rawData = await springBootApi.getComingSoon(args);
                        uiActions.push({
                          type: "SHOW_MOVIE_LIST",
                          data: rawData,
                        });
                        llmData = maskDataForLLM(toolName, rawData);
                        break;

                      case "get_movie_detail":
                        rawData = await springBootApi.getMovieDetail(args);
                        uiActions.push({
                          type: "NAVIGATE_TO_MOVIE_DETAIL",
                          data: rawData,
                        });
                        llmData = maskDataForLLM(toolName, rawData);
                        break;

                      // 3. Nhóm Rạp và Lịch Chiếu
                      case "get_showtimes_by_movie":
                        rawData = await springBootApi.getShowtimesByMovie(args);
                        uiActions.push({
                          type: "SHOW_SHOWTIMES",
                          data: rawData,
                        });
                        llmData = maskDataForLLM(toolName, rawData);
                        break;

                      case "get_showtimes_by_cinema":
                        rawData =
                          await springBootApi.getShowtimesByCinema(args);
                        uiActions.push({
                          type: "SHOW_SHOWTIMES",
                          data: rawData,
                        });
                        llmData = maskDataForLLM(toolName, rawData);
                        break;

                      case "get_cinemas_nearby":
                        if (!args.lat || !args.lng) {
                          rawData = { error: "Thiếu tọa độ GPS." };
                          uiActions.push({
                            type: "REQUEST_LOCATION_PERMISSION",
                          });
                          llmData = rawData;
                        } else {
                          rawData = await springBootApi.getCinemasNearby(args);
                          uiActions.push({
                            type: "SHOW_CINEMA_MAP",
                            data: rawData,
                          });
                          llmData = maskDataForLLM(toolName, rawData);
                        }
                        break;

                      // 4. Nhóm Cá nhân (Truyền userId xuống Spring Boot)
                      case "get_my_points":
                        rawData = await springBootApi.getMyPoints(args, userId);
                        uiActions.push({
                          type: "SHOW_USER_POINTS",
                          data: rawData,
                        });
                        llmData = rawData;
                        break;
                      case "get_booking_history":
                        rawData = await springBootApi.getBookingHistory(
                          args,
                          userId,
                        );
                        uiActions.push({
                          type: "SHOW_BOOKING_HISTORY",
                          data: rawData,
                        });
                        llmData = rawData;
                        break;
                      case "get_my_vouchers":
                        rawData = await springBootApi.getMyVouchers(
                          args,
                          userId,
                        );
                        uiActions.push({
                          type: "SHOW_VOUCHER_LIST",
                          data: rawData,
                        });
                        llmData = rawData;
                        break;

                      default:
                        rawData = { error: `Tool không tồn tại.` };
                        llmData = rawData;
                    }

                    // Gửi bản MINI (llmData) lại cho LangChain
                    return new ToolMessage({
                        tool_call_id: toolCall.id,
                        name: toolName,
                        content: typeof llmData === 'string' ? llmData : JSON.stringify(llmData)
                    });
                })
            );

            messages.push(...toolResults);

            // --- BƯỚC 5: GỌI LLM LẦN 2 (TỔNG HỢP CÂU TRẢ LỜI) ---
            const finalAiResponse = await llmWithTools.invoke(messages);
            messages.push(finalAiResponse);
            finalResponseContent = finalAiResponse.content;
        }

        // --- BƯỚC 6: LƯU REDIS (TTL 24H) ---
        await redisClient.set(redisKey, JSON.stringify(serializeMessages(messages)), { EX: 86400 });

        // --- BƯỚC 7: TRẢ KẾT QUẢ CHO KOTLIN ---
        return {
            status: "success",
            content: finalResponseContent,
            ui_actions: uiActions // Kotlin sẽ dựa vào đây để vẽ giao diện trực quan!
        };

    } catch (error) {
        console.error("Lỗi luồng AI:", error.message || error);

        // 1. KIỂM TRA LỖI NGHIỆP VỤ TỪ SPRING BOOT (400, 404)
        if (error.response && error.response.data) {
            const springBootMessage = error.response.data.message || error.response.data.error;
            
            if (springBootMessage) {
                // --- CỰC KỲ QUAN TRỌNG: LƯU CÂU TRẢ LỜI NÀY VÀO LỊCH SỬ ---
                // Ép câu thông báo lỗi này thành một tin nhắn của AI
                messages.push(new AIMessage(springBootMessage));
                
                // Lưu lại vào Redis y hệt như Bước 6
                // (Dùng try-catch lồng nhau đề phòng Redis sập mạng không làm hỏng luồng trả kết quả)
                try {
                    await redisClient.set(redisKey, JSON.stringify(serializeMessages(messages)), { EX: 86400 });
                } catch (redisErr) {
                    console.error("Lỗi lưu Redis khi bắt lỗi Spring Boot:", redisErr);
                }

                // Trả về cho Kotlin
                return {
                    status: "success", 
                    content: springBootMessage, 
                    ui_actions: []
                };
            }
        }

        // 2. NẾU LÀ LỖI HỆ THỐNG THẬT SỰ (Ví dụ: Đứt cáp quang, Gemini hết Quota)
        // Lỗi này thì KHÔNG NÊN lưu vào Redis để tránh làm rác lịch sử hội thoại
        return {
            status: "error",
            content: "Xin lỗi anh/chị, hệ thống đang bận xử lý quá nhiều yêu cầu. Vui lòng thử lại sau vài giây nhé!",
            ui_actions: []
        };
    }
}
