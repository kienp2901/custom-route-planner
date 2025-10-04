````
Bạn là một lập trình viên frontend chuyên nghiệp.  
Hãy xây dựng một project Next.js (React + TypeScript + TailwindCSS) cho bài toán sau:

📝 Bài toán:
Người dùng nhập các vị trí cần di chuyển (điểm đến). Hệ thống sinh ra bản đồ với thứ tự các điểm.  
Ví dụ: 
- Điểm 1: 25T2 Nguyễn Thị Thập
- Điểm 2: Cầu Long Biên
- Điểm 3: Lăng Bác

Ứng dụng sẽ hiển thị bản đồ với thứ tự các điểm 1 → 2 → 3, cho phép chọn phương tiện (ô tô hoặc đi bộ), tính toán khoảng cách (km) và thời gian di chuyển từng chặng. Cuối cùng có một nút "Dẫn đường" mở Google Maps với lộ trình qua các điểm.

📦 Yêu cầu chi tiết:
- Framework: Next.js + TypeScript.
- UI: TailwindCSS.
- Thư viện bản đồ: @react-google-maps/api.
- Thư viện gọi API: Axios.
- Tính năng:
  1. Form nhập danh sách các điểm đến (cho phép thêm/xóa điểm).
  2. Dropdown chọn phương tiện: "Ô tô" hoặc "Đi bộ".
  3. Nút “Tạo bản đồ”.
  4. Khi bấm “Tạo bản đồ”:
     - Gọi API backend tại `/api/route` với body:
       ```json
       {
         "destinations": ["Điểm 1", "Điểm 2", "Điểm 3"],
         "mode": "driving" | "walking"
       }
       ```
  5. Hiển thị bản đồ:
     - Marker cho từng điểm (1, 2, 3...).
     - Đường nối các điểm theo thứ tự.
  6. Hiển thị thông tin:
     - Khoảng cách và thời gian giữa từng chặng.
     - Tổng khoảng cách và tổng thời gian.
  7. Nút “Dẫn đường”:
     - Sinh link dạng:
       ```
       https://www.google.com/maps/dir/Điểm1/Điểm2/Điểm3
       ```
     - Khi bấm sẽ mở Google Maps với lộ trình.

⚙️ Gợi ý:
- Dùng `useLoadScript` để load Google Maps API.
- Dùng `Polyline` để vẽ đường đi.
- Dữ liệu route lấy từ backend.
- Tách code thành các component:
  - `RouteForm.tsx`
  - `RouteMap.tsx`
  - `RouteInfo.tsx`

🎨 UI thân thiện, đơn giản, responsive.
````