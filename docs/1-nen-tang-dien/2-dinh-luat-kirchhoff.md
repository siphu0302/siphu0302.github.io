---
sidebar_position: 2
title: Bài 2 - Định luật Kirchhoff (KCL & KVL)
description: Quy tắc bảo toàn dòng điện và điện áp trong mạch điện tử, ứng dụng tính công suất chân I/O và thiết kế mạch phân áp đọc ADC trên vi điều khiển PIC.
---

# Bài 2: Định luật Kirchhoff & Thiết kế mạch phân áp cho PIC

:::info Tóm tắt
Nếu Định luật Ohm giúp bạn tính toán trên từng linh kiện riêng lẻ, thì **Định luật Kirchhoff** giúp bạn làm chủ toàn bộ sơ đồ mạch. Trong thiết kế mạch vi điều khiển PIC, hai định luật này dùng để:
1. Kiểm soát tổng dòng điện tiêu thụ trên toàn bộ chip để tránh quá tải gây cháy vi điều khiển (**KCL**).
2. Thiết kế mạch hạ áp (phân áp) để đọc các cảm biến hoặc nguồn điện có điện áp cao (`12V`, `24V`) vào chân ADC `5V` của PIC (**KVL**).
:::

## 1. Định luật Kirchhoff 1 về Dòng điện (KCL)

### Nguyên lý cơ bản
Tại một điểm nút (Node) bất kỳ trong mạch điện, **tổng dòng điện chạy vào nút luôn bằng tổng dòng điện chạy ra khỏi nút đó**.

> **Σ I<sub>vào</sub> = Σ I<sub>ra</sub>**

Hãy hình dung điểm nút như một ngã ba ống nước: lượng nước chảy vào ngã ba bắt buộc phải bằng tổng lượng nước chia ra các nhánh rẽ.

### Ứng dụng thực tế: Bảo vệ nguồn tổng của PIC16F877A
Nhiều người mới học thường chỉ chú ý giới hạn dòng của từng chân đơn lẻ (`25mA`/chân) mà quên mất giới hạn tổng dòng điện đi qua chân nguồn **V<sub>DD</sub>** và **V<sub>SS</sub>** của toàn bộ chip.

Theo tài liệu kỹ thuật (Datasheet) của PIC16F877A:
* **Dòng tối đa trên 1 chân I/O:** `25 mA`
* **Tổng dòng tối đa trên toàn bộ Port A, Port B, Port E kết hợp:** `200 mA`
* **Tổng dòng tối đa đi qua chân nguồn V<sub>DD</sub>:** `250 mA`

**Bài toán thực tế:** Bạn nối 16 đèn LED vào 2 Port (Port B và Port D), mỗi LED bạn thiết kế dòng sáng cao là `15mA`.
* Áp dụng định luật Kirchhoff 1 tại nút nguồn **V<sub>DD</sub>** của PIC:
  `I_tổng = 16 × 15mA = 240 mA`
* Cộng thêm dòng nuôi nhân CPU hoạt động (khoảng `10mA - 20mA`), tổng dòng đã chạm ngưỡng `260 mA` — vượt quá giới hạn chịu đựng của chân V<sub>DD</sub>! Nếu bật sáng cả 16 LED cùng lúc trong thời gian dài, chip sẽ nóng ran và hỏng.

:::tip Giải pháp thiết kế mạch chuẩn
Khi điều khiển nhiều LED hoặc tải tiêu thụ dòng lớn cùng lúc:
* Giảm dòng mỗi LED xuống mức `5mA - 8mA` (điện trở hạn dòng khoảng `470 Ω` đến `680 Ω`).
* Hoặc sử dụng **Transistor / IC đệm dòng (như ULN2803, 74HC595)** để lấy nguồn trực tiếp từ bên ngoài thay vì rút dòng trực tiếp qua chân vi điều khiển PIC.
:::

## 2. Định luật Kirchhoff 2 về Điện áp (KVL)

### Nguyên lý cơ bản
Trong một vòng mạch kín (Loop) bất kỳ, **tổng điện áp của nguồn cấp luôn bằng tổng độ sụt áp (điện áp rơi) trên tất cả các linh kiện mắc nối tiếp trong vòng đó**.

> **V<sub>nguồn</sub> = V<sub>1</sub> + V<sub>2</sub> + ... + V<sub>n</sub>**

Trong bài trước, khi tính điện trở cho LED (`V_R = 5V - 2V = 3V`), chính là bạn đã áp dụng Định luật Kirchhoff 2 cho vòng mạch kín gồm: Chân PIC (`5V`) → Điện trở (`3V`) → Đèn LED (`2V`) → GND (`0V`).

## 3. Ứng dụng cốt lõi: Mạch phân áp (Voltage Divider) đọc ADC

Bộ chuyển đổi tín hiệu tương tự sang số (**ADC**) của PIC16F877A chỉ đọc được điện áp tối đa bằng điện áp nguồn nuôi (**5V**). Nếu bạn muốn dùng PIC để đo điện áp của một bình ắc quy **12V**, cắm trực tiếp `12V` vào chân `AN0` sẽ làm cháy chân vi điều khiển ngay lập tức.

Giải pháp là dùng **2 điện trở mắc nối tiếp (R<sub>1</sub> và R<sub>2</sub>)** để chia nhỏ điện áp `12V` xuống dưới `5V`.

### Sơ đồ kết nối nguyên lý:
* Điểm đầu **R<sub>1</sub>** nối vào cực Dương ắc quy (**V<sub>in</sub> = 12V**).
* Điểm giữa **R<sub>1</sub>** và **R<sub>2</sub>** trích ra đưa vào chân đọc ADC của PIC (**V<sub>out</sub>**).
* Điểm cuối **R<sub>2</sub>** nối xuống Đất (**GND**).

### Công thức mạch phân áp (suy ra từ KVL và Định luật Ohm):
1. Dòng điện chạy qua hai điện trở mắc nối tiếp là như nhau:
   `I = V_in / (R_1 + R_2)`
2. Điện áp lấy ra tại chân PIC chính là điện áp rơi trên điện trở **R<sub>2</sub>**:
   > **V<sub>out</sub> = V<sub>in</sub> × [ R<sub>2</sub> / (R