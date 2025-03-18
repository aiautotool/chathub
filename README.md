# Ứng dụng Chat với Nhiều Mô hình AI

Ứng dụng web này cho phép người dùng tương tác với nhiều mô hình AI như OpenAI, Claude, Grok, DeepSeek và Gemini, sử dụng một giao diện chat thống nhất.

## Tính năng

- Hỗ trợ nhiều mô hình AI:
  - OpenAI (o3-mini, o1, o1-mini)
  - Claude (3.7 Sonnet, 3.5 Haiku)
  - Grok-2
  - DeepSeek (r1, v3)
  - Gemini (2.0 Flash, 2.0 Pro)
- Giao diện chat dễ sử dụng và phản hồi nhanh
- Chuyển đổi dễ dàng giữa các mô hình khác nhau
- Quản lý cuộc hội thoại cho từng mô hình

## Cài đặt

### Yêu cầu

- Node.js (phiên bản 20.x hoặc mới hơn)
- Các API key cho các mô hình AI (tất cả đều là tùy chọn, ứng dụng sẽ vẫn hoạt động với một số API key)
  - OPENAI_API_KEY
  - ANTHROPIC_API_KEY
  - XAI_API_KEY (cho Grok)
  - DEEPSEEK_API_KEY
  - GEMINI_API_KEY

### Cài đặt

1. Clone repository:
   ```
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Cài đặt các gói phụ thuộc:
   ```
   npm install
   ```

3. Tạo file `.env` từ mẫu:
   ```
   cp .env.example .env
   ```

4. Cập nhật file `.env` với các API key của bạn:
   ```
   OPENAI_API_KEY=sk-your-openai-api-key
   ANTHROPIC_API_KEY=sk-your-anthropic-api-key
   XAI_API_KEY=your-xai-api-key
   DEEPSEEK_API_KEY=your-deepseek-api-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

5. Khởi động ứng dụng:
   ```
   npm run dev
   ```

6. Mở trình duyệt và truy cập http://localhost:5000

## Hướng dẫn sử dụng

1. Chọn mô hình AI từ sidebar bên trái
2. Nhập tin nhắn trong khung chat ở dưới cùng
3. Nhấn nút gửi hoặc nhấn Enter để gửi tin nhắn
4. Xem phản hồi từ AI trong giao diện chat

## Thông tin về API key

### OpenAI
- Đăng ký tại: https://platform.openai.com/
- API key bắt đầu bằng: sk-...

### Anthropic (Claude)
- Đăng ký tại: https://console.anthropic.com/
- API key bắt đầu bằng: sk-ant-...

### xAI (Grok)
- Đăng ký tại: https://api.x.ai/
- API key có định dạng: có thể khác nhau

### DeepSeek
- Đăng ký tại: https://platform.deepseek.com/
- API key có định dạng: có thể khác nhau

### Google Gemini
- Đăng ký tại: https://aistudio.google.com/
- API key bắt đầu bằng: AIza...

## Khắc phục sự cố

- Nếu bạn nhận được lỗi API key, hãy đảm bảo rằng:
  1. Bạn đã nhập đúng API key trong file .env
  2. Bạn đã khởi động lại ứng dụng sau khi cập nhật API key
  3. API key của bạn có quyền truy cập vào các mô hình được yêu cầu

- Nếu một mô hình cụ thể không hoạt động:
  1. Kiểm tra xem API key tương ứng đã được cung cấp chưa
  2. Xem logs để biết thêm chi tiết về lỗi cụ thể

## Giấy phép

Copyright © 2025