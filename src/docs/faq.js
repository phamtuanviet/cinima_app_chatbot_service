export const FAQ_DOCUMENTS = [
  {
    id: "faq_cancel_ticket",
    category: "booking_policy",
    question: "Tôi có thể hủy vé hoặc hoàn tiền sau khi đã thanh toán không?",
    answer:
      "Rất tiếc, theo quy định hiện tại của hệ thống, vé đã thanh toán thành công sẽ KHÔNG được hỗ trợ hủy, đổi suất chiếu hoặc hoàn tiền trong mọi trường hợp. " +
      "Bạn vui lòng kiểm tra kỹ thông tin phim, rạp, suất chiếu và chỗ ngồi trước khi xác nhận thanh toán trên cổng VNPAY nhé.",
    related_questions: [
      "hủy vé được không",
      "trả vé lại có được không",
      "đổi vé xem phim",
      "hoàn tiền vé xem phim",
      "cancel booking",
      "tôi lỡ đặt vé sai giờ",
      "muốn hủy đơn đặt vé",
      "refund vé"
    ],
    tags: ["hủy vé", "hoàn tiền", "không đổi trả", "cancel", "refund"]
  },
  {
    id: "faq_booking_time_limit",
    category: "booking_policy",
    question: "Tôi có bao nhiêu thời gian để hoàn tất thanh toán sau khi chọn ghế?",
    answer:
      "Sau khi chọn ghế, bạn sẽ có đúng 15 phút để hoàn tất quá trình thanh toán (Thời gian giữ chỗ - Seat Hold Session). " +
      "Trong 15 phút này, ghế của bạn sẽ được khóa để người khác không thể đặt trùng. " +
      "Nếu quá 15 phút mà hệ thống chưa ghi nhận thanh toán thành công, ghế sẽ tự động được giải phóng để nhường cho khách hàng khác và giao dịch của bạn sẽ chuyển sang trạng thái Đã hết hạn.",
    related_questions: [
      "thời gian giữ ghế",
      "bao lâu để thanh toán",
      "ghế bị mất sau khi chọn",
      "hết thời gian chọn ghế",
      "vé hết hạn",
      "tại sao mất ghế"
    ],
    tags: ["giữ ghế", "thời gian thanh toán", "15 phút", "seat hold"]
  },
  {
    id: "faq_movie_age_rating",
    category: "booking_policy",
    question: "Quy định về độ tuổi xem phim (Phân loại phim) như thế nào?",
    answer:
      "Hệ thống phân loại phim theo quy định của Cục Điện ảnh bao gồm:\n" +
      "• P: Phim phổ biến cho mọi lứa tuổi.\n" +
      "• K: Phim cho trẻ em dưới 13 tuổi, bắt buộc phải có người lớn đi kèm.\n" +
      "• T13: Phim cấm khán giả dưới 13 tuổi.\n" +
      "• T16: Phim cấm khán giả dưới 16 tuổi.\n" +
      "• T18: Phim cấm khán giả dưới 18 tuổi.\n" +
      "Khách hàng cần mang theo giấy tờ tùy thân (CCCD/Thẻ học sinh) khi đến rạp để nhân viên kiểm tra độ tuổi đối với các phim có dán nhãn.",
    related_questions: [
      "trẻ em có được xem phim này không",
      "phim T18 là gì",
      "kiểm tra căn cước công dân",
      "bao nhiêu tuổi được xem",
      "phân loại phim"
    ],
    tags: ["độ tuổi", "T18", "T16", "trẻ em", "CCCD"]
  },
  {
    id: "faq_ticket_format",
    category: "booking_policy",
    question: "Sau khi đặt vé tôi nhận được gì và check-in như thế nào?",
    answer:
      "Ngay sau khi thanh toán VNPAY thành công, bạn sẽ nhận được một Mã vé (Ticket Code) và một Mã QR hiển thị trực tiếp trong phần Lịch sử đặt vé trên ứng dụng.\n" +
      "Cách check-in tại rạp: Bạn chỉ cần mở ứng dụng, đưa Mã QR vé điện tử này cho nhân viên tại cửa phòng chiếu để quét là có thể vào xem, hoàn toàn KHÔNG cần phải xếp hàng in vé giấy tại quầy.",
    related_questions: [
      "vé điện tử như thế nào",
      "check in bằng gì",
      "quét mã QR vào rạp",
      "mã vé ở đâu",
      "không in vé được không",
      "vé trên điện thoại",
      "xem mã QR vé"
    ],
    tags: ["check-in", "QR code", "vé điện tử", "mã vé"]
  },
  {
    id: "faq_payment_methods",
    category: "payment",
    question: "Ứng dụng hỗ trợ những phương thức thanh toán nào?",
    answer:
      "Hiện tại, để đảm bảo giao dịch nhanh chóng và an toàn nhất, hệ thống chỉ hỗ trợ thanh toán duy nhất qua Cổng thanh toán VNPAY.\n" +
      "Thông qua VNPAY, bạn có thể sử dụng:\n" +
      "• Ứng dụng Mobile Banking của các ngân hàng để quét mã VNPAY-QR.\n" +
      "• Thẻ ATM nội địa.\n" +
      "• Thẻ quốc tế (Visa, Mastercard, JCB).\n" +
      "Hệ thống chưa hỗ trợ thanh toán bằng tiền mặt, MoMo hay ZaloPay.",
    related_questions: [
      "thanh toán bằng MoMo được không",
      "dùng ZaloPay được không",
      "thanh toán thẻ Visa",
      "có nhận thẻ ATM không",
      "cách thanh toán vé",
      "phương thức thanh toán",
      "chuyển khoản được không"
    ],
    tags: ["thanh toán", "VNPAY", "Visa", "ATM", "QR"]
  },
  {
    id: "faq_loyalty_points",
    category: "loyalty_points",
    question: "Chính sách tích điểm và sử dụng điểm thưởng như thế nào?",
    answer:
      "Chương trình khách hàng thân thiết được áp dụng tự động cho mọi tài khoản:\n\n" +
      "1. Cách tích điểm:\n" +
      "• Với mỗi giao dịch mua vé thành công, bạn sẽ được tích lũy 2% giá trị hóa đơn vào tài khoản điểm thưởng.\n\n" +
      "2. Cách sử dụng điểm:\n" +
      "• Tỷ lệ quy đổi: 1 Điểm = 1 VNĐ.\n" +
      "• Bạn có thể sử dụng số điểm này để giảm giá trực tiếp vào tổng tiền khi đặt vé cho các lần tiếp theo. Số điểm có thể được cộng dồn và không giới hạn giá trị giảm tối đa.",
    related_questions: [
      "cách tích điểm",
      "mua vé có tích điểm không",
      "điểm thưởng tính như thế nào",
      "quy đổi điểm",
      "1 điểm bằng bao nhiêu tiền",
      "dùng điểm mua vé",
      "điểm đổi tiền"
    ],
    tags: ["tích điểm", "điểm thưởng", "loyalty", "quy đổi điểm", "2%"]
  },
  {
    id: "faq_voucher_types",
    category: "voucher_policy",
    question: "Sự khác nhau giữa các loại mã giảm giá (Voucher) là gì?",
    answer:
      "Hệ thống hiện cung cấp 2 loại Voucher chính để bạn áp dụng khi đặt vé:\n\n" +
      "1. Voucher Giảm theo phần trăm (%):\n" +
      "• Giảm một tỷ lệ % trên tổng tiền đơn hàng.\n" +
      "• Sẽ có quy định số tiền giảm tối đa.\n" +
      "• Ví dụ: Giảm 20% (Tối đa 50k).\n\n" +
      "2. Voucher Giảm tiền cố định:\n" +
      "• Giảm trực tiếp một số tiền cố định.\n" +
      "• Ví dụ: Giảm thẳng 30.000đ cho đơn hàng.\n\n" +
      "Mỗi voucher đều có quy định về 'Giá trị đơn tối thiểu' để được áp dụng. Bạn có thể xem chi tiết trong mục Ví Voucher của mình.",
    related_questions: [
      "voucher phần trăm là gì",
      "voucher giảm thẳng là gì",
      "phân biệt loại voucher",
      "giảm phần trăm hay giảm tiền",
      "voucher tính như thế nào",
      "cách tính giảm giá voucher"
    ],
    tags: ["voucher", "mã giảm giá", "phần trăm", "cách tính giảm giá"]
  },
  {
    id: "faq_seat_types",
    category: "seat_types",
    question: "Các loại ghế trong rạp là gì? Giá khác nhau như thế nào?",
    answer:
      "Trong hệ thống rạp hiện có 3 loại ghế chính, giá vé sẽ thay đổi tùy thuộc vào loại ghế bạn chọn:\n\n" +
      "1. Ghế Thường (NORMAL): Ghế ngồi tiêu chuẩn, giá vé bằng với giá cơ bản của suất chiếu.\n" +
      "2. Ghế VIP: Ghế được đặt ở vị trí trung tâm rạp, góc nhìn tốt nhất, sẽ có phụ thu thêm phí so với ghế thường.\n" +
      "3. Ghế Đôi (COUPLE): Ghế băng dài dành cho 2 người, không có tay vịn ở giữa. Khi chọn loại ghế này, bạn sẽ phải mua theo cặp (2 vé).\n\n" +
      "Lưu ý: Nếu bạn xem phim vào các ngày cuối tuần (Thứ 7, Chủ Nhật) hoặc ngày Lễ, giá vé có thể sẽ cộng thêm phụ phí cuối tuần (Weekend Surcharge).",
    related_questions: [
      "ghế VIP là gì",
      "ghế đôi couple",
      "loại ghế rạp",
      "ghế đôi xem phim",
      "phân biệt loại ghế",
      "giá vé cuối tuần",
      "thứ 7 giá vé tăng không",
      "giá ghế tính thế nào"
    ],
    tags: ["ghế VIP", "ghế đôi", "ghế COUPLE", "ghế NORMAL", "loại ghế", "giá vé cuối tuần"]
  },
  {
    id: "faq_food_policy",
    category: "cinema_rules",
    question: "Tôi có thể mang đồ ăn từ ngoài vào rạp không?",
    answer:
      "Để đảm bảo không gian xem phim sạch sẽ và không ảnh hưởng đến trải nghiệm của các khán giả khác, tất cả các cụm rạp trong hệ thống đều quy định KHÔNG mang thức ăn, đồ uống có mùi từ bên ngoài vào phòng chiếu.\n" +
      "Bạn có thể đặt trước các Combo Bắp Nước ngay trên ứng dụng khi mua vé để nhận mức giá ưu đãi hơn so với mua tại quầy.",
    related_questions: [
      "mang đồ ăn vào rạp được không",
      "mang nước vào rạp",
      "có được mang bắp từ ngoài không",
      "quy định đồ ăn rạp",
      "rạp có cho mang đồ ăn không"
    ],
    tags: ["đồ ăn", "quy định rạp", "mang đồ ăn", "combo bắp nước"]
  },
  {
    id: "faq_find_cinema",
    category: "general",
    question: "Làm sao để tìm rạp chiếu phim gần tôi nhất?",
    answer:
      "Ứng dụng được tích hợp hệ thống định vị thông minh để giúp bạn tìm rạp dễ dàng. " +
      "Bạn chỉ cần cung cấp quyền truy cập vị trí (GPS) trên thiết bị, ứng dụng hoặc Chatbot sẽ tự động tính toán khoảng cách và đề xuất danh sách các cụm rạp đang nằm gần vị trí của bạn nhất.",
    related_questions: [
      "tìm rạp gần đây",
      "rạp nào gần tôi",
      "cách tìm rạp gần nhất",
      "bật định vị tìm rạp",
      "rạp chiếu phim quanh đây"
    ],
    tags: ["tìm rạp", "gần đây", "GPS", "định vị", "location"]
  },
  {
    id: "faq_receive_combo",
    category: "services_combos",
    question: "Tôi đã đặt Combo bắp nước trên ứng dụng, làm sao để nhận tại rạp?",
    answer:
      "Khi đến rạp, bạn không cần phải xếp hàng mua bắp nước nữa. Hãy đi thẳng đến khu vực Quầy thực phẩm (Concession), mở ứng dụng và đưa Mã QR vé (đã bao gồm thông tin Combo) cho nhân viên quét. Nhân viên sẽ chuẩn bị bắp và nước theo đúng đơn hàng bạn đã thanh toán.",
    related_questions: [
      "lấy bắp nước như thế nào",
      "nhận combo ở đâu",
      "cách lấy đồ ăn đã đặt",
      "mua bắp trên app rồi làm sao",
      "quét mã lấy nước"
    ],
    tags: ["combo", "bắp nước", "lấy đồ ăn", "quầy"]
  },
  {
    id: "faq_lost_found",
    category: "services_combos",
    question: "Tôi để quên đồ trong rạp chiếu phim thì phải làm sao?",
    answer:
      "Nếu bạn phát hiện để quên tài sản (điện thoại, ví, túi xách...) trong phòng chiếu, vui lòng liên hệ ngay với nhân viên rạp hoặc Quản lý ca trực tại cụm rạp đó. " +
      "Nhân viên sẽ hỗ trợ kiểm tra và tìm kiếm. Lưu ý, rạp không chịu trách nhiệm bồi thường đối với các tài sản cá nhân bị thất lạc.",
    related_questions: [
      "quên điện thoại",
      "rớt đồ trong rạp",
      "làm mất ví",
      "tìm đồ thất lạc",
      "liên hệ quản lý rạp"
    ],
    tags: ["quên đồ", "thất lạc", "mất tài sản", "lost and found"]
  },
  {
    id: "faq_late_entry",
    category: "cinema_operations",
    question: "Tôi đến trễ sau khi phim đã chiếu có được vào rạp không?",
    answer:
      "Bạn vẫn có thể vào phòng chiếu nếu đến trễ. Tuy nhiên, để không làm ảnh hưởng đến trải nghiệm của các khán giả khác, nhân viên rạp sẽ dùng đèn pin nhỏ để hướng dẫn bạn vào ghế. " +
      "Lưu ý: Thời gian chiếu phim thực tế thường bắt đầu sau 10-15 phút quảng cáo và trailer so với giờ in trên vé.",
    related_questions: [
      "đến trễ có vào được không",
      "muộn giờ chiếu",
      "vào rạp trễ",
      "bị muộn xem phim",
      "chính sách đến muộn",
      "phim chiếu quảng cáo bao lâu"
    ],
    tags: ["đến trễ", "vào muộn", "giờ chiếu", "quảng cáo"]
  },
  {
    id: "faq_holiday_hours",
    category: "cinema_operations",
    question: "Rạp chiếu phim có mở cửa vào các ngày Lễ, Tết không?",
    answer:
      "Có! Hệ thống rạp chiếu phim phục vụ khách hàng xuyên suốt các ngày Lễ, Tết Âm lịch, Dương lịch. Thậm chí vào các dịp này, rạp thường có thêm các suất chiếu khuya để phục vụ nhu cầu giải trí. " +
      "Tuy nhiên, giá vé vào ngày Lễ/Tết sẽ có áp dụng phụ phí cuối tuần/ngày lễ. Bạn có thể kiểm tra giá vé chính xác ngay trên ứng dụng khi chọn ghế.",
    related_questions: [
      "tết có mở cửa không",
      "lễ rạp có làm việc không",
      "giờ mở cửa ngày lễ",
      "mùng 1 tết xem phim",
      "suất chiếu khuya"
    ],
    tags: ["Lễ Tết", "mở cửa", "giờ hoạt động", "phụ phí ngày lễ"]
  },
  {
    id: "faq_chatbot_capabilities",
    category: "app_chatbot_guide",
    question: "Chatbot này có thể giúp tôi làm những việc gì?",
    answer:
      "Tôi là Trợ lý ảo của rạp chiếu phim, tôi có thể giúp bạn:\n" +
      "1. Tìm kiếm phim đang chiếu, sắp chiếu hoặc thông tin phim cụ thể.\n" +
      "2. Tra cứu lịch chiếu theo ngày, theo rạp hoặc phim.\n" +
      "3. Tìm cụm rạp gần vị trí của bạn nhất.\n" +
      "4. Kiểm tra số điểm thưởng và các mã Voucher giảm giá trong ví của bạn.\n" +
      "5. Xem lại lịch sử đặt vé và lấy Mã QR vé điện tử.\n" +
      "Bạn cứ nhắn tin tự nhiên như đang chat với một người bạn nhé, ví dụ: 'Gần đây có rạp nào không?' hoặc 'Kiểm tra điểm thưởng giúp tôi'.",
    related_questions: [
      "bạn làm được gì",
      "chatbot giúp được gì",
      "cách dùng bot",
      "tìm rạp trên bot",
      "tính năng trợ lý ảo"
    ],
    tags: ["chatbot", "tính năng", "hướng dẫn", "trợ lý ảo"]
  },
  {
    id: "faq_account_login",
    category: "app_chatbot_guide",
    question: "Tôi không đăng nhập được hoặc quên mật khẩu thì phải làm sao?",
    answer:
      "Nếu bạn quên mật khẩu hoặc gặp lỗi đăng nhập:\n" +
      "• Tại màn hình Đăng nhập, hãy chọn 'Quên mật khẩu'. Hệ thống sẽ gửi một mã OTP hoặc đường link xác thực về Email đăng ký của bạn để tạo mật khẩu mới.\n" +
      "• Đảm bảo bạn đang nhập đúng định dạng Email.\n" +
      "Lưu ý: Bạn bắt buộc phải đăng nhập thì tôi mới có thể giúp bạn kiểm tra điểm thưởng, mã giảm giá cá nhân hay lịch sử vé đã đặt nhé.",
    related_questions: [
      "quên mật khẩu",
      "không đăng nhập được",
      "lỗi tài khoản",
      "reset mật khẩu",
      "tôi chưa đăng nhập",
      "lấy lại pass"
    ],
    tags: ["đăng nhập", "quên mật khẩu", "tài khoản", "lỗi app"]
  }
];