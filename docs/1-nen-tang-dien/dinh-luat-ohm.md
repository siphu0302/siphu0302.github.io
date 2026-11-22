---
sidebar_position: 1
title: Bài 1 - Định luật Ohm
description: Nền tảng cốt lõi của mọi mạch điện tử và ứng dụng tính toán điện trở hạn dòng cho vi điều khiển PIC.
---

# Bài 1: Định luật Ohm & Ứng dụng trong thiết kế mạch PIC

:::info Tóm tắt
Định luật Ohm giải thích mối quan hệ giữa Điện áp (**V**), Dòng điện (**I**) và Điện trở (**R**). Đây là công cụ đầu tiên cần dùng để bảo vệ chân xuất nhập (I/O) của vi điều khiển PIC không bị cháy khi giao tiếp với đèn LED và các thiết bị ngoại vi.
:::

## 1. Bản chất của 3 đại lượng cơ bản

Trước khi đi vào công thức, hãy hình dung mạch điện giống như một hệ thống ống nước:

| Đại lượng | Ký hiệu | Đơn vị | Ý nghĩa vật lý |
| :--- | :--- | :--- | :--- |
| **Điện áp** | **V** (hoặc **U**) | Volt (V) | Áp lực đẩy các hạt electron di chuyển (tương tự áp suất nước). |
| **Dòng điện** | **I** | Ampere (A) | Lượng điện tích chảy qua tiết diện dây dẫn trong 1 giây (tương tự lưu lượng nước). |
| **Điện trở** | **R** | Ohm (Ω) | Sự cản trở dòng chảy của vật liệu (tương tự độ hẹp của đường ống). |

## 2. Công thức Định luật Ohm

Cường độ dòng điện chạy qua một vật dẫn tỷ lệ thuận với điện áp đặt vào hai đầu vật dẫn đó và tỷ lệ nghịch với điện trở của nó:

> **I = V / R**

Từ công thức gốc, ta suy ra hai biến thể thường dùng trong thiết kế mạch:
* **Tính điện áp rơi trên linh kiện:** `V = I × R`
* **Tính giá trị điện trở cần thiết:** `R = V / I`

## 3. Ứng dụng thực tế: Tính trở hạn dòng cho LED trên PIC16F877A

Khi lập trình bài toán kinh điển đầu tiên là **chớp tắt đèn LED** trên vi điều khiển PIC16F877A, nếu bạn nối trực tiếp chân xuất tín hiệu (ví dụ chân `RB0`) vào chân Dương (Anode) của đèn LED rồi nối xuống Đất (GND), dòng điện tăng vọt sẽ làm hỏng cả LED lẫn chân vi điều khiển.

### Thông số kỹ thuật cần biết:
1. **Điện áp nguồn xuất ra từ chân PIC (V<sub>CC</sub>):** `5V` (khi xuất mức logic `1`).
2. **Điện áp rơi trên LED đỏ thông thường (V<sub>LED</sub>):** khoảng `2V`.
3. **Dòng điện an toàn để LED sáng rõ (I<sub>LED</sub>):** `10mA = 0.01A` *(Chân I/O của PIC16F877A chịu được tối đa 25mA, nhưng chỉ nên cho hoạt động quanh mức 10mA để đảm bảo độ bền)*.

### Các bước tính toán điện trở hạn dòng (R<sub>hạn_dòng</sub>):

* **Bước 1:** Tính điện áp thực tế rơi trên điện trở (V<sub>R</sub>):
  `V_R = V_CC - V_LED = 5V - 2V = 3V`

* **Bước 2:** Áp dụng định luật Ohm để tìm giá trị điện trở:
  `R_hạn_dòng = V_R / I_LED = 3V / 0.01A = 300 Ω`

:::tip Lựa chọn linh kiện thực tế
Trên thị trường rất ít bán sẵn điện trở đúng `300 Ω`. Theo chuẩn dãy điện trở phổ biến ngoài tiệm linh kiện, bạn nên chọn giá trị chuẩn gần nhất lớn hơn một chút là **330 Ω** (Vòng màu: *Cam - Cam - Nâu - Kim nhũ*). Khi đó dòng điện thực tế chạy qua mạch là:

**I = 3V / 330 Ω ≈ 9.1 mA**

Đèn LED vẫn sáng rõ và chân vi điều khiển PIC hoạt động hoàn toàn mát mẻ, an toàn.
:::

## 4. Các thuật ngữ thường gặp khi tra cứu tài liệu (Datasheet)

Khi đọc tài liệu kỹ thuật của vi điều khiển PIC hoặc linh kiện, bạn sẽ bắt gặp các ký hiệu viết tắt sau:
* **V<sub>F</sub> (Forward Voltage):** Điện áp thuận (điện áp rơi trên LED hoặc Diode khi dẫn điện).
* **I<sub>OH</sub> / I<sub>OL</sub>:** Dòng điện tối đa mà chân vi điều khiển có thể cấp ra (Source) ở mức cao hoặc thu vào (Sink) ở mức thấp.