export const movieTools = [
  {
    type: "function", // BẮT BUỘC LÀ "function"
    function: {
      name: "search_movies",
      description:
        "Dùng để tìm kiếm phim. ĐIỀU KIỆN BẮT BUỘC: Chỉ gọi công cụ này khi người dùng đã cung cấp RÕ RÀNG TÊN PHIM hoặc MỘT THỂ LOẠI CỤ THỂ. Nếu người dùng chỉ nói chung chung ('phim hot', 'phim hay'), KHÔNG GỌI CÔNG CỤ NÀY, hãy phản hồi bình thường để hỏi họ thích thể loại nào.",
      parameters: {
        // Đổi từ input_schema thành parameters
        type: "object",
        properties: {
          keyword: {
            type: "string",
            description:
              "Từ khóa tìm kiếm, thường là tên phim hoặc tên đạo diễn. QUAN TRỌNG: TUYỆT ĐỐI KHÔNG trích xuất các tính từ đánh giá chung chung của người dùng (ví dụ: 'hot', 'hay', 'mới', 'đỉnh', 'buồn') làm keyword. Nếu không có tên phim cụ thể, hãy để trống trường này.",
          },
          genre: {
            type: "string",
            description:
              "Tên thể loại phim. LƯU Ý QUAN TRỌNG: Bạn BẮT BUỘC phải ánh xạ từ ngữ của khách hàng sang đúng các giá trị trong danh sách cho phép. Ví dụ: khách nói 'tình cảm' -> CHỌN 'Lãng Mạn'; khách nói 'hoạt hình' hoặc 'anime' -> CHỌN 'Hoạt Hình'. TUYỆT ĐỐI không điền giá trị nằm ngoài danh sách.",
            enum: [
              "Hoạt Hình",
              "Hành Động",
              "Lãng Mạn",
              "Khoa Học Viễn Tưởng",
              "Chính Kịch",
              "Phiêu Lưu",
              "Gia Đình",
              "Tội Phạm",
              "Giật Gân",
              "Lịch Sử",
              "Kinh Dị",
            ],
          },
          language: {
            type: "string",
            description: "Ngôn ngữ hoặc định dạng dịch của phim.",
          },
          ageRating: {
            type: "string",
            description:
              "Giới hạn độ tuổi của phim (ví dụ: 'P', 'T13', 'T16', 'T18', 'K').",
          },
          status: {
            type: "string",
            description:
              "Trạng thái của phim. Trả về 'showing' nếu người dùng hỏi 'phim đang chiếu', 'upcoming' nếu hỏi 'phim sắp chiếu'.",
            enum: ["showing", "upcoming", "all"],
          },
          page: {
            type: "integer",
            description: "Trang hiện tại để phân trang. Mặc định là 0.",
          },
          size: {
            type: "integer",
            description:
              "Số lượng phim tối đa trả về trên mỗi trang. Mặc định là 10.",
          },
        },
        // Nếu có tham số nào bắt buộc (required), bạn khai báo ở đây.
        // Vì bên trên bạn ghi optional_params hết nên array này rỗng.
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_now_playing",
      description:
        "Lấy danh sách các phim ĐANG CÓ LỊCH CHIẾU tại rạp. Dùng khi người dùng hỏi các câu như 'Hôm nay có phim gì?', 'Hà Nội đang chiếu phim gì?', 'Cuối tuần có phim gì hay?'. KHÔNG dùng tool này nếu người dùng chỉ tìm kiếm thông tin phim chung chung mà không quan tâm đến việc chiếu rạp.",
      parameters: {
        type: "object",
        properties: {
          locationQuery: {
            type: "string",
            description:
              "Tên thành phố, tỉnh thành hoặc khu vực người dùng muốn xem phim (ví dụ: 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'). Bỏ qua các từ như 'ở', 'tại'. Ánh xạ với trường region của rạp chiếu.",
          },
          date: {
            type: "string",
            description:
              "Ngày người dùng muốn xem phim. BẮT BUỘC phải quy đổi sang định dạng 'YYYY-MM-DD'. Nếu người dùng nói 'hôm nay', 'ngày mai', 'chủ nhật tuần này', hãy tự động tính toán ra ngày tháng năm chính xác.",
          },
          page: {
            type: "integer",
            description: "Trang hiện tại để phân trang. Mặc định là 0.",
          },
          size: {
            type: "integer",
            description:
              "Số lượng phim tối đa trả về trên mỗi trang. Mặc định là 10.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_coming_soon",
      description:
        "Lấy danh sách các bộ phim SẮP RA MẮT (Coming Soon). Sử dụng công cụ này khi người dùng hỏi các câu như: 'Sắp có phim gì ra mắt?', 'Tháng sau có phim gì chiếu không?', 'Phim sắp ra rạp'. Dữ liệu trả về sẽ là các phim có ngày khởi chiếu dự kiến (releaseDate) lớn hơn ngày hiện tại.",
      parameters: {
        type: "object",
        properties: {
          page: {
            type: "integer",
            description: "Trang hiện tại để phân trang. Mặc định là 0.",
          },
          size: {
            type: "integer",
            description:
              "Số lượng phim tối đa trả về trên mỗi trang. Mặc định là 10.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_movie_detail",
      description:
        "Lấy thông tin chi tiết của một bộ phim cụ thể (nội dung, trailer, thời lượng). Dùng tên phim để tìm kiếm.",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description:
              "Tên bộ phim người dùng muốn xem chi tiết (ví dụ: 'Mai', 'Lật Mặt', 'Avatar').",
          },
          year: {
            type: "integer",
            description:
              "Năm phát hành của bộ phim. NẾU người dùng có nhắc đến (ví dụ: 'Avatar năm 2009') thì truyền vào. Nếu không, bỏ trống.",
          },
          language: {
            type: "string",
            description:
              "Ngôn ngữ phim, dùng để phân biệt các bản lồng tiếng, phụ đề hoặc bản remake (ví dụ: 'Tiếng Anh', 'Tiếng Việt').",
          },
        },
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_showtimes_by_movie",
      description:
        "Tìm lịch chiếu phim. Có thể tìm theo tên phim kết hợp với địa điểm, tên rạp hoặc khu vực.",
      parameters: {
        type: "object",
        properties: {
          movieTitle: {
            type: "string",
            description: "Tên phim.",
          },
          date: {
            type: "string",
            description: "Định dạng YYYY-MM-DD.",
          },
          locationQuery: {
            type: "string",
            description:
              "Thông tin về rạp, khu vực hoặc thành phố (ví dụ: 'CGV', 'Cầu Giấy', 'Hà Nội').",
          },
        },
        required: ["movieTitle"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_showtimes_by_cinema",
      description:
        "Lấy toàn bộ lịch chiếu phim của một RẠP CHIẾU CỤ THỂ. Dùng khi người dùng hỏi các câu như 'Rạp CGV Cầu Giấy hôm nay chiếu phim gì?', 'Lịch chiếu rạp Quốc Gia'. BẮT BUỘC phải có thông tin tên rạp hoặc địa chỉ.",
      parameters: {
        type: "object",
        properties: {
          locationQuery: {
            type: "string",
            description:
              "Tên rạp, cụm rạp hoặc địa chỉ rạp chiếu (ví dụ: 'CGV Cầu Giấy', 'BHD Phạm Ngọc Thạch', 'Rạp Quốc Gia'). Trích xuất từ câu hỏi.",
          },
          date: {
            type: "string",
            description:
              "Ngày muốn xem phim. Định dạng 'YYYY-MM-DD'. Nếu người dùng nói 'hôm nay', 'ngày mai', hãy tự tính toán ra ngày chính xác. Bỏ trống nếu không được nhắc đến.",
          },
        },
        required: ["locationQuery"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_cinemas_nearby",
      description:
        "Tìm danh sách các rạp chiếu phim gần vị trí hiện tại của người dùng nhất. BẮT BUỘC phải có tọa độ GPS (lat, lng). NẾU chưa có tọa độ trong ngữ cảnh, hãy yêu cầu người dùng chia sẻ vị trí qua nút bấm.",
      parameters: {
        type: "object",
        properties: {
          lat: {
            type: "number",
            description: "Vĩ độ (Latitude) lấy từ GPS của thiết bị người dùng.",
          },
          lng: {
            type: "number",
            description:
              "Kinh độ (Longitude) lấy từ GPS của thiết bị người dùng.",
          },
          radius: {
            type: "number",
            description: "Bán kính tìm kiếm tính bằng km. Mặc định là 10km.",
          },
        },
        required: ["lat", "lng"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_my_points",
      description:
        "Lấy số điểm thưởng tích lũy và hạng thành viên của người dùng hiện tại. Chỉ dùng khi người dùng hỏi về điểm, quyền lợi hoặc hạng thành viên.",
      parameters: {
        type: "object",
        properties: {},
        // Thêm mảng rỗng nếu không có tham số bắt buộc nào
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_booking_history",
      description:
        "Lấy danh sách lịch sử đặt vé của người dùng hiện tại. Bao gồm thông tin phim, rạp, suất chiếu, trạng thái thanh toán và mã QR vé nếu đã thanh toán thành công.",
      parameters: {
        type: "object",
        properties: {
          limit: {
            type: "integer",
            description: "Số lượng giao dịch gần nhất muốn lấy. Mặc định là 5.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_my_vouchers",
      description:
        "Lấy danh sách mã giảm giá (voucher) có trong ví của người dùng. Trả về các mã còn hạn dùng, giá trị giảm và điều kiện áp dụng.",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["active", "used", "expired"],
            description:
              "Trạng thái voucher: active (còn hạn), used (đã dùng), expired (hết hạn). Mặc định là active.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "ask_faq",
      description:
        "Tra cứu các thông tin về quy định rạp phim, chính sách đặt vé/hủy vé, độ tuổi, hướng dẫn thanh toán, điểm thưởng, voucher và các dịch vụ tại rạp. Dùng khi người dùng hỏi các câu mang tính chất tìm hiểu quy định, hướng dẫn.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Câu hỏi hoặc từ khóa cần tra cứu trong tài liệu FAQ.",
          },
        },
        required: ["query"],
      },
    },
  },
];