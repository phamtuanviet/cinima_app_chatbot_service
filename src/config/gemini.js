import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config';

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite-preview", // Thử tên cụ thể này
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1beta", 
  temperature: 0,
});