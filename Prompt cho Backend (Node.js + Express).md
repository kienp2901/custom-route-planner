````
Bạn là một lập trình viên backend chuyên nghiệp.  
Hãy xây dựng một project Node.js + Express cho bài toán sau:

📝 Bài toán:
Người dùng nhập danh sách điểm đến và loại phương tiện. Backend sẽ gọi Google Maps API để lấy lộ trình đi qua các điểm đó theo thứ tự. Sau đó trả về dữ liệu khoảng cách, thời gian di chuyển từng chặng, tổng quãng đường, tổng thời gian và polyline để frontend hiển thị.

📦 Yêu cầu chi tiết:
- Công nghệ: Node.js + Express + TypeScript.
- Thư viện: Axios, dotenv, cors, express-validator.
- File cấu hình: `.env` chứa GOOGLE_MAPS_API_KEY.
- API endpoint:
  - `POST /api/route`
  - Request body:
    ```json
    {
      "destinations": ["Điểm 1", "Điểm 2", "Điểm 3"],
      "mode": "driving" | "walking"
    }
    ```
- Xử lý:
  1. Với mỗi địa chỉ, gọi Google Maps Geocoding API → lat/lng.
  2. Gọi Google Maps Directions API để lấy route đi qua tất cả điểm theo thứ tự.
  3. Trích xuất dữ liệu:
     - Khoảng cách (km) và thời gian (phút) cho từng chặng.
     - Tổng khoảng cách và tổng thời gian.
     - Chuỗi polyline cho tuyến đường.
- Response JSON:
  ```json
  {
    "routes": [
      {"from": "Điểm 1", "to": "Điểm 2", "distance_km": 3.2, "duration_min": 10},
      {"from": "Điểm 2", "to": "Điểm 3", "distance_km": 4.5, "duration_min": 15}
    ],
    "total_distance_km": 7.7,
    "total_duration_min": 25,
    "map_polyline": "encoded_polyline_string"
  }
````

⚙️ Gợi ý cấu trúc project:

```
src/
  index.ts
  routes/
    routePlanner.ts
  services/
    googleService.ts
.env
```

🧰 Yêu cầu bổ sung:

* Dùng `dotenv` để load GOOGLE_MAPS_API_KEY.
* Dùng `axios` để gọi API Google.
* Có validate đầu vào (ít nhất 2 điểm).
* Xử lý lỗi: địa chỉ không hợp lệ, thiếu mode, API key sai.
* Bật CORS để frontend có thể gọi từ domain khác.

```