import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { FAQ_DOCUMENTS } from "../docs/faq.js";

export async function processFaqIntoChunks() {
    console.log("Bắt đầu xử lý Chunking dữ liệu FAQ...");

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
        separators: ["\n\n", "\n", ".", "?", "!", " ", ""], // Ưu tiên cắt theo đoạn, rồi đến câu
    });

    const finalDocuments = [];

    for (const faq of FAQ_DOCUMENTS) {
        // 1. Dùng splitter cắt phần "answer" ra thành các đoạn nhỏ (nếu nó dài hơn chunkSize)
        const answerChunks = await textSplitter.splitText(faq.answer);

        // 2. Ép ngữ cảnh (Context Injection) vào từng mảnh nhỏ
        answerChunks.forEach((chunkText, index) => {
            const relatedStr = faq.related_questions ? faq.related_questions.join(", ") : "";
            
            // Xây dựng lại PageContent: BẮT BUỘC phải gắn lại Câu hỏi vào từng chunk
            // Để khi model Embedding đọc, nó biết đoạn text này đang phục vụ mục đích gì
            const enrichedContent = `
Chủ đề: ${faq.category}
Câu hỏi chính: ${faq.question}
Các câu hỏi liên quan: ${relatedStr}
Nội dung chi tiết (Phần ${index + 1}/${answerChunks.length}): ${chunkText.trim()}
            `.trim();

            // 3. Đóng gói thành Document chuẩn của LangChain
            const doc = new Document({
                pageContent: enrichedContent,
                metadata: {
                    faq_id: faq.id,
                    category: faq.category,
                    chunk_index: index,
                    total_chunks: answerChunks.length,
                    type: "faq"
                }
            });

            finalDocuments.push(doc);
        });
    }

    console.log(`Đã băm xong! Từ ${FAQ_DOCUMENTS.length} FAQ gốc tạo ra ${finalDocuments.length} Chunks bảo toàn ngữ cảnh.`);
    return finalDocuments;
}