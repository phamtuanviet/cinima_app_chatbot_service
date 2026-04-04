import express from 'express';
import dotenv from 'dotenv';
import { verifyToken } from './middleware/auth.js';
import { processUserMessage } from './services/chatService.js';

dotenv.config();

// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();
// const client = new OpenAI({
//     apiKey: process.env.GROQ_API_KEY,
//     baseURL: "https://api.groq.com/openai/v1",
// });

// const response = await client.responses.create({
//     model: "openai/gpt-oss-20b",
//     input: "Explain the importance of fast language models",
// });
// console.log(response.output_text);

const app = express();
app.use(express.json());

app.post('/api/chat', verifyToken, async (req, res) => {
    try {
        const { message, chatSessionId, location } = req.body;
        
        const currentUserId = req.userId; 
        
        if (!message || !chatSessionId) {
            return res.status(400).json({ error: "Thiếu dữ liệu đầu vào" });
        }

        const botReply = await processUserMessage(chatSessionId, message, currentUserId,location);
        
        res.json(botReply);
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).json({ error: "Hệ thống Chatbot đang bận" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 ChatService đang chạy tại http://localhost:${PORT}`);
});