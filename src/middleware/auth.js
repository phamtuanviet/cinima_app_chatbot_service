import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1. Nếu không có header hoặc không có chữ Bearer -> Đuổi về luôn
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error: "Unauthorized", 
            message: "Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng Chatbot." 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Tự động giải mã và kiểm tra hạn sử dụng
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Lấy thông tin user nạp vào request để các tầng dưới xài
        req.userId = decoded.userId;   
        req.userEmail = decoded.sub;   
        req.userRole = decoded.role;   
        
        // Cấp phép cho đi tiếp vào API Chat
        next();
    } catch (error) {
        // Bắt lỗi Token hết hạn (Hữu ích để Kotlin tự động gọi API refresh_token)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: "Token_Expired", 
                message: "Phiên đăng nhập đã hết hạn." 
            });
        }
        // Lỗi Token rác, bị sửa đổi
        return res.status(401).json({ 
            error: "Invalid_Token", 
            message: "Token không hợp lệ." 
        });
    }
};