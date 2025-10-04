# Custom Route Planner Frontend

Ứng dụng frontend cho Custom Route Planner được xây dựng với Next.js, TypeScript và TailwindCSS.

## Tính năng

- Form nhập danh sách các điểm đến với khả năng thêm/xóa điểm
- Dropdown chọn phương tiện di chuyển (ô tô hoặc đi bộ)
- Hiển thị bản đồ với Google Maps API
- Hiển thị thông tin chi tiết về tuyến đường
- Nút dẫn đường mở Google Maps

## Công nghệ sử dụng

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Maps**: @react-google-maps/api
- **HTTP Client**: Axios

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env.local` từ `env.example`:
```bash
cp env.example .env.local
```

3. Cập nhật các biến môi trường trong `.env.local`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

4. Chạy ứng dụng:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Cấu trúc project

```
├── components/          # React components
│   ├── RouteForm.tsx   # Form nhập điểm đến
│   ├── RouteMap.tsx    # Component hiển thị bản đồ
│   └── RouteInfo.tsx   # Component hiển thị thông tin tuyến đường
├── lib/                # Utilities và API client
│   └── api.ts         # API client với Axios
├── types/              # TypeScript type definitions
│   └── index.ts       # Interface definitions
├── styles/             # Global styles
│   └── globals.css    # TailwindCSS imports và custom styles
└── pages/              # Next.js pages
    ├── _app.tsx       # App wrapper
    └── index.tsx      # Home page
```

## API Integration

Frontend giao tiếp với backend thông qua API endpoint `/api/route` để:
- Gửi danh sách điểm đến và phương tiện di chuyển
- Nhận về thông tin tuyến đường, khoảng cách, thời gian và polyline

## Google Maps Integration

Ứng dụng sử dụng Google Maps API để:
- Hiển thị bản đồ tương tác
- Vẽ polyline tuyến đường
- Hiển thị markers cho các điểm đến
- Tạo link dẫn đường đến Google Maps
