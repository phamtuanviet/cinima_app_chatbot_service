import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Khởi tạo instance Axios kết nối xuống Spring Boot
const apiClient = axios.create({
    baseURL: process.env.SPRING_BOOT_URL || 'http://localhost:8080',
    timeout: 15000, // Đợi 15s
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Hàm Helper gọi API an toàn.
 * Nếu thành công trả về data. Nếu Spring Boot lỗi, trả về Object chứa error để LLM tự xử lý.
 */
async function safeGet(endpoint, params = {}, userId = null) {
    try {
        const config = { params };
        
        // Nếu API cần định danh, gắn X-User-Id vào header cho Spring Boot đọc
        if (userId) {
            config.headers = { 'X-User-Id': userId };
        }
        
        console.log(`📡 [Spring Boot] GET ${endpoint} | Params:`, params);
        const response = await apiClient.get(endpoint, config);
        return response.data;
    } catch (error) {
        console.error(`❌ Lỗi API [${endpoint}]:`, error.message);
        return { 
            error: "Hệ thống rạp chiếu phim đang phản hồi chậm. Hãy xin lỗi khách hàng và hẹn thử lại sau." 
        };
    }
}

// ============================================================================
// NHÓM 1: PHIM ẢNH (MOVIES)
// ============================================================================

export const searchMovies = (args) => 
    safeGet('/api/chatbot/movies/search', args);

export const getNowPlaying = (args) => 
    safeGet('/api/chatbot/movies/now-playing', args);

export const getComingSoon = (args) => 
    safeGet('/api/chatbot/movies/coming-soon', args);

export const getMovieDetail = (args) => 
    safeGet('/api/chatbot/movies/detail', args);


// ============================================================================
// NHÓM 2: LỊCH CHIẾU VÀ RẠP (SHOWTIMES & CINEMAS)
// ============================================================================

export const getShowtimesByMovie = (args) => 
    safeGet('/api/chatbot/showtimes', args);

export const getShowtimesByCinema = (args) => 
    safeGet('/api/chatbot/cinemas/showtimes', args);

export const getCinemasNearby = (args) => 
    safeGet('/api/chatbot/cinemas/nearby', args);


// ============================================================================
// NHÓM 3: NGƯỜI DÙNG (USER ACCOUNT & VOUCHERS) - YÊU CẦU TOKEN
// ============================================================================

export const getMyPoints = (args, userId) => {
    if (!userId) return { error: "Vui lòng đăng nhập để tra cứu điểm." };
    return safeGet('/api/chatbot/users/me/points', args, userId);
};

export const getBookingHistory = (args, userId) => {
    if (!userId) return { error: "Vui lòng đăng nhập để xem lịch sử đặt vé." };
    return safeGet('/api/chatbot/users/me/bookings', args, userId);
};

export const getMyVouchers = (args, userId) => {
    if (!userId) return { error: "Vui lòng đăng nhập để xem kho voucher." };
    return safeGet('/api/chatbot/vouchers/me', args, userId);
};