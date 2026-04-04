import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Sử dụng chung port 6379 với Spring Boot
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({
    url: redisUrl
});

redisClient.on('error', (err) => console.error('❌ Lỗi kết nối Redis:', err));
redisClient.on('connect', () => console.log('✅ Đã kết nối tới Redis thành công!'));

// Khởi động kết nối
await redisClient.connect();