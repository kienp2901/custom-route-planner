# Custom Route Planner Backend

Backend API cho Custom Route Planner được xây dựng với Node.js, Express và TypeScript.

## Tính năng

- API endpoint `/api/route` để tính toán tuyến đường
- Tích hợp Google Maps Geocoding API để chuyển đổi địa chỉ thành tọa độ
- Tích hợp Google Maps Directions API để tính toán tuyến đường
- Validation đầu vào với express-validator
- Xử lý lỗi và CORS support

## Công nghệ sử dụng

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Validation**: express-validator
- **Environment**: dotenv
- **CORS**: cors

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

3. Cập nhật các biến môi trường trong `.env`:
```
PORT=3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Build và chạy ứng dụng:

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

API server sẽ chạy tại `http://localhost:3000`

## API Endpoints

### POST /api/route

Tính toán tuyến đường giữa các điểm đến.

**Request Body:**
```json
{
  "destinations": ["Điểm 1", "Điểm 2", "Điểm 3"],
  "mode": "driving" | "walking"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "routes": [
      {
        "from": "Điểm 1",
        "to": "Điểm 2", 
        "distance_km": 3.2,
        "duration_min": 10
      }
    ],
    "total_distance_km": 7.7,
    "total_duration_min": 25,
    "map_polyline": "encoded_polyline_string"
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Custom Route Planner API is running"
}
```

## Cấu trúc project

```
├── src/
│   ├── index.ts              # Entry point và server setup
│   ├── routes/
│   │   └── routePlanner.ts   # Route handlers
│   └── services/
│       └── googleService.ts  # Google Maps API integration
├── dist/                     # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── env.example
```

## Google Maps API Integration

Backend sử dụng hai Google Maps API:

1. **Geocoding API**: Chuyển đổi địa chỉ thành tọa độ lat/lng
2. **Directions API**: Tính toán tuyến đường với waypoints

## Error Handling

API xử lý các lỗi phổ biến:
- Validation errors (thiếu điểm đến, mode không hợp lệ)
- Geocoding errors (địa chỉ không tìm thấy)
- Directions API errors (không thể tính toán tuyến đường)
- Server errors (API key không hợp lệ, network issues)

## Environment Variables

- `PORT`: Port cho server (default: 3000)
- `GOOGLE_MAPS_API_KEY`: API key cho Google Maps services
