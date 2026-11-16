# 🍵 MocAndChill (MocAndChill.com)

> **Nền tảng kết nối và chia sẻ lối sống thảo mộc, y học cổ truyền dành riêng cho giới trẻ.**  
> *Sống xanh • Lành mạnh • Hiện đại*

---

## 📌 1. Giới thiệu dự án (Overview)

**MocAndChill** là một dự án khởi nghiệp công nghệ kết hợp thương mại điện tử và nội dung số, nhằm đưa các giá trị quý báu của thảo mộc tự nhiên và y học cổ truyền Việt Nam tiếp cận gần gũi, hiện đại và trẻ trung hơn với thế hệ trẻ (Gen Z & Millennials).

### 🎯 Bài toán giải quyết (The Problem)
- **Nhu cầu tăng cao:** Giới trẻ ngày càng quan tâm đến sức khỏe toàn diện (wellness), xu hướng tiêu dùng hữu cơ, trà thảo mộc và lối sống "chậm" để cân bằng sau áp lực học tập/công việc.
- **Rào cản thị trường:** Các thương hiệu Đông y và thảo dược truyền thống thường mang hình ảnh già dặn, bao bì cổ điển, thông tin khô khan, khó hiểu và thiếu tính trải nghiệm số.
- **Giải pháp của MocAndChill:** Trẻ hóa trải nghiệm Đông y thông qua thiết kế thị giác bắt mắt (aesthetic), nội dung ngắn gọn dễ hiểu, bài trắc nghiệm cá nhân hóa (Quiz Recommendation) và nền tảng mua sắm tiện lợi.

---

## 💼 2. Mô hình kinh doanh (Business Model)

MocAndChill định vị theo mô hình **Hybrid: E-commerce kết hợp Content & Community (B2C & C2C)**:

1. **B2C (Business-to-Consumer):**
   - Phân phối các set trà thảo mộc độc quyền, nguyên liệu pha chế tại nhà (Home-brewing Kits) theo tiêu chuẩn tự nhiên 100%.
   - Cung cấp phụ kiện thưởng trà phong cách tối giản (ấm, cốc thủy tinh, bình lọc).
2. **Content Marketing & Magazine:**
   - Xây dựng hệ sinh thái nội dung "Herbal Lifestyle" ngắn gọn, infographics, giải mã các vị thuốc Đông y dưới lăng kính khoa học hiện đại.
3. **C2C & Community (Định hướng mở rộng):**
   - Không gian kết nối các bạn trẻ yêu thích thảo mộc chia sẻ công thức pha chế (DIY recipes), đánh giá và trao đổi nguyên liệu thủ công từ các nông trại bản địa.

---

## 🌟 3. Các tính năng cốt lõi (Core Features)

| Tính năng | Mô tả chi tiết |
| :--- | :--- |
| **🏠 Trang chủ (Homepage)** | Giao diện hiện đại mang gam màu xanh thảo mộc tự nhiên, giới thiệu câu chuyện thương hiệu, danh mục nổi bật và các chỉ số niềm tin. |
| **🧪 Trắc nghiệm cá nhân hóa (Smart Quiz)** | Bài test trắc nghiệm 4 bước nhanh: *"Hôm nay bạn thấy thế nào?"*, từ đó gợi ý chính xác loại trà thảo mộc, bài thuốc lành tính và lời khuyên sức khỏe phù hợp tức thì. |
| **🛍 Cửa hàng E-commerce (Shop)** | Danh mục sản phẩm đa dạng (Trà thư giãn, Trà tăng lực, Trà thanh lọc detox, Set quà tặng, Dụng cụ pha chế); hỗ trợ bộ lọc danh mục, mức giá và tìm kiếm thông minh. |
| **📄 Chi tiết sản phẩm (Product Detail)** | Cung cấp đầy đủ thông số: xuất xứ, thành phần, quy cách, hướng dẫn pha chế từng bước và hệ thống đánh giá thực tế từ người dùng. |
| **🛒 Giỏ hàng & Thanh toán (Cart & Checkout)** | Tự động tính toán phí vận chuyển, hỗ trợ mã giảm giá (voucher), form đặt hàng nhanh với các hình thức thanh toán COD, Chuyển khoản, Ví điện tử; lưu trữ giỏ hàng qua LocalStorage. |
| **📝 Blog & Tạp chí Thảo mộc (Magazine)** | Chuyên mục chia sẻ bí quyết chăm sóc sức khỏe, giải tỏa stress văn phòng, làm đẹp tự nhiên và cẩm nang sống xanh. |

---

## 🛠 4. Công nghệ sử dụng (Tech Stack)

Dự án được tối ưu hóa theo tiêu chuẩn **Modern Pure Frontend Web**:

- **HTML5 & Semantic Markup:** Cấu trúc trang chuẩn SEO, dễ tiếp cận và tối ưu trải nghiệm đọc.
- **CSS3 Modern Design System:** 
  - CSS Custom Properties (Variables) theo bảng màu thảo dược thiên nhiên (`#2E5D3A`, `#E8734A`, `#FFF9F2`).
  - Flexbox & CSS Grid linh hoạt, chuẩn Responsive 100% trên Smartphone, Tablet và Laptop.
  - Hiệu ứng vi tương tác (Micro-interactions), glassmorphism, floating cards và transitions mượt mà.
- **Vanilla JavaScript (ES6+):**
  - Quản lý trạng thái giỏ hàng độc lập bằng `LocalStorage API`.
  - Thuật toán phân tích điều kiện và đề xuất sản phẩm dựa trên câu trả lời Quiz.
  - Bộ lọc dữ liệu đa chiều (Filter, Search & Sort) không cần reload trang.

---

## 📁 5. Cấu trúc thư mục (Project Structure)

```text
MocAndChill/
│
├── index.html            # Trang chủ chính
├── shop.html             # Cửa hàng sản phẩm thảo mộc
├── product-detail.html    # Trang chi tiết sản phẩm & hướng dẫn pha chế
├── quiz.html             # Bài trắc nghiệm gợi ý trà cá nhân hóa
├── blog.html             # Tạp chí chia sẻ kiến thức & lối sống xanh
├── cart.html             # Trang giỏ hàng & quản lý đơn hàng
├── README.md             # Tài liệu giới thiệu dự án
│
├── css/
│   └── style.css         # Toàn bộ mã nguồn định kiểu & Design System
│
└── js/
    ├── main.js           # Dữ liệu sản phẩm, bài viết blog & logic giỏ hàng dùng chung
    ├── shop.js           # Bộ lọc, tìm kiếm và sắp xếp sản phẩm
    ├── quiz.js           # Động cơ câu hỏi và thuật toán tư vấn cá nhân hóa
    └── cart.js           # Quản lý giỏ hàng, mã giảm giá và modal đặt hàng
```

---

## 🚀 6. Hướng dẫn chạy thử nghiệm (Getting Started)

### Cách 1: Mở trực tiếp trên máy cục bộ
1. Tải hoặc clone thư mục `MocAndChill` về máy tính.
2. Nhấp đúp chuột vào file **`index.html`** để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari).

### Cách 2: Triển khai trực tuyến lên GitHub Pages
1. Tạo một repository mới trên GitHub (ví dụ: `mocandchill`).
2. Tải toàn bộ mã nguồn lên repository.
3. Vào **Settings** $\rightarrow$ **Pages** $\rightarrow$ tại mục **Source** chọn branch `main` (hoặc `master`) $\rightarrow$ bấm **Save**.
4. Trang web sẽ trực tiếp khả dụng tại: `https://<your-username>.github.io/mocandchill/`

---

## 🔮 7. Định hướng phát triển (Future Roadmap)

- [ ] **Tích hợp AI Trợ lý Thảo dược:** Chatbot AI hỗ trợ bắt mạch tâm lý và gợi ý thực đơn trà theo thời tiết & giờ sinh học.
- [ ] **Backend & Database:** Kết nối NodeJS/Python API và cơ sở dữ liệu để quản lý tài khoản người dùng và đơn hàng thực tế.
- [ ] **Mô hình Subscription (Giao trà định kỳ):** Đăng ký hộp quà trà bất ngờ mỗi tháng theo 4 mùa xuân - hạ - thu - đông.
- [ ] **Cộng đồng C2C:** Diễn đàn trao đổi mẹo sống xanh và công thức pha chế thảo mộc tự làm.

---
