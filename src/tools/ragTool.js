import * as lancedb from "@lancedb/lancedb";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Khởi tạo Embedding Model (Phải dùng đúng model như lúc nạp dữ liệu)
const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HF_API_KEY,
    model: "intfloat/multilingual-e5-base",
});

/**
 * Hàm này sẽ được Agent (Node.js) gọi khi nó quyết định dùng tool 'ask_faq'
 * @param {string} userQuery - Câu hỏi trích xuất từ người dùng
 * @returns {Promise<string>} - Ngữ cảnh (Context) đã được gom lại để LLM đọc
 */
export async function searchFaqInVectorDB(userQuery) {
  try {
    console.log(`🔍 Đang tìm kiếm FAQ cho câu hỏi: "${userQuery}"`);

    // 1. Biến câu hỏi của khách thành Vector số học
    const queryVector = await embeddings.embedQuery(userQuery);

    // 2. Kết nối tới thư mục LanceDB
    const dbPath = path.resolve("./lancedb_data");
    const db = await lancedb.connect(dbPath);

    // 3. Mở bảng chứa tri thức
    const tableName = "faq_knowledge_base";
    const table = await db.openTable(tableName);

    // 4. Tìm kiếm Vector (Top-K Similarity Search)
    // limit(3): Chỉ lấy 3 đoạn văn bản có khoảng cách vector gần nhất (nghĩa sát nhất)
    const results = await table.search(queryVector).limit(3).execute();

    // Nếu không tìm thấy gì (trường hợp DB rỗng)
    if (!results || results.length === 0) {
      return "Hệ thống không tìm thấy quy định nào liên quan đến câu hỏi này.";
    }

    // 5. Gom kết quả (Context Injection)
    // Chuyển mảng kết quả thành một chuỗi văn bản dài để LLM dễ đọc hiểu
    let contextString =
      "Dưới đây là các quy định trích xuất từ cẩm nang của rạp chiếu phim. Hãy dựa HƯỚNG DẪN NÀY để trả lời khách hàng:\n\n";

    results.forEach((row, index) => {
      // row._distance là độ lệch vector (càng nhỏ càng giống nhau)
      contextString += `[TÀI LIỆU SỐ ${index + 1} - Mức độ khớp: ${(1 - row._distance).toFixed(2)}]\n`;
      contextString += `${row.text}\n\n`;
      contextString += `--- \n`;
    });

    console.log(`✅ Tìm thấy ${results.length} tài liệu liên quan.`);
    return contextString;
  } catch (error) {
    console.error("❌ Lỗi khi truy vấn LanceDB:", error);
    return "Đã xảy ra lỗi kỹ thuật khi tra cứu cơ sở dữ liệu quy định. Hãy báo khách hàng đợi chút.";
  }
}