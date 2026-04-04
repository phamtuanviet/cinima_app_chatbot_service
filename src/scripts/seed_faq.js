import * as lancedb from "@lancedb/lancedb";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import dotenv from "dotenv";
import path from "path";
import { processFaqIntoChunks } from "./prepare_faq.js";

dotenv.config();

async function runIngestion() {
  try {
    console.log("--- BẮT ĐẦU QUY TRÌNH NẠP DỮ LIỆU ---");

    // 1. Embedding model (dùng base cho ổn định)
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HF_API_KEY,
      model: "intfloat/multilingual-e5-base",
    });

    // 2. Chunk data
    const chunkedDocs = await processFaqIntoChunks();
    console.log("Số chunks:", chunkedDocs.length);

    // 3. DB path tuyệt đối (tránh lỗi path)
    const dbPath = path.resolve("./lancedb_data");
    console.log("DB PATH:", dbPath);

    const db = await lancedb.connect(dbPath);

    const tableName = "faq_knowledge_base";

    // 4. Xóa bảng cũ nếu có
    const tableNames = await db.tableNames();
    if (tableNames.includes(tableName)) {
      console.log("Xóa bảng cũ...");
      await db.dropTable(tableName);
    }

    console.log("Đang tạo embeddings và lưu...");

    // 5. Tạo data (manual → chắc chắn không lỗi silent)
    const data = [];

    for (let i = 0; i < chunkedDocs.length; i++) {
      const doc = chunkedDocs[i];

      const vector = await embeddings.embedQuery(doc.pageContent);

      data.push({
        vector: vector,
        text: doc.pageContent,
        ...doc.metadata,
      });

      console.log(`Processed ${i + 1}/${chunkedDocs.length}`);
    }

    // 6. Tạo table và insert
    const table = await db.createTable(tableName, data);

    console.log("-----------------------------------------");
    console.log("✅ HOÀN THÀNH!");
    console.log("Tables:", await db.tableNames());
    console.log(`Vectors stored: ${data.length}`);
    console.log("-----------------------------------------");

  } catch (error) {
    console.error("❌ LỖI:", error);
  }
}

runIngestion();