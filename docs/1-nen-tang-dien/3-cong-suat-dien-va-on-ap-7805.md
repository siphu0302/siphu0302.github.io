---
sidebar_position: 3
title: Bài 3 - Công suất điện & Chọn công suất linh kiện / 7805
description: Khái niệm công suất điện (P = U × I), cách chọn công suất điện trở và tính tỏa nhiệt cho IC ổn áp 7805 khi cấp nguồn cho vi điều khiển PIC.
---

# Bài 3: Công suất điện & Tỏa nhiệt mạch nguồn cho PIC

:::info Tóm tắt

Biết điện áp và dòng điện thôi chưa đủ để mạch chạy bền bỉ — **Công suất điện ($P$)** cho biết năng lượng chuyển hóa thành nhiệt nhanh đến mức nào. Trong thực hành vi điều khiển PIC, nắm rõ công suất giúp bạn:
1. Chọn đúng **công suất điện trở** (ví dụ `1/4W`, `1/2W`, `1W`) để không bị cháy sém khi xả nhiệt.
2. Tính toán độ tỏa nhiệt của **IC ổn áp tuyến tính 7805** khi hạ áp từ nguồn cao (như `12V` hoặc `24V`) xuống `5V` nuôi vi điều khiển.

:::

## 1. Công suất điện là gì?

**Công suất điện ($P$)** là đại lượng đo tốc độ tiêu thụ hoặc chuyển hóa năng lượng điện trong một đơn vị thời gian, đơn vị là **Watt (W)** (hoặc `mW` cho mạch công suất nhỏ).

Từ **Định luật Ohm** và định nghĩa công suất, ta có 3 công thức tương đương rất hay dùng:

$$P = V \times I$$

$$P = I^2 \times R$$

$$P = \frac{V^2}{R}$$

* **$P$:** Công suất tiêu thụ hoặc tỏa nhiệt (tính bằng **Watt - W**).
* **$V$:** Điện áp rơi trên linh kiện (tính bằng **Volt - V**).
* **$I$:** Dòng điện chạy qua linh kiện (tính bằng **Ampere - A**).
* **$R$:** Điện trở (tính bằng **Ohm - $\Omega$**).

---

## 2. Cách chọn công suất điện trở an toàn

Trên thị trường, điện trở cắm thông dụng thường có các mức công suất định mức như **`1/8W` (`0.125W`)**, **`1/4W` (`0.25W`)**, **`1/2W` (`0.5W`)**, **`1W`**, **`2W`**...

:::tip Nguyên tắc an toàn khi chọn công suất điện trở
Công suất tỏa nhiệt thực tế trên điện trở nên chọn **ít nhất gấp 2 lần** công suất tính toán lý thuyết để điện trở không bị quá nóng, đổi màu hoặc sai trị số theo thời gian:

$$P_{\text{chọn}} \ge 2 \times P_{\text{thực tế}}$$
:::

### Ví dụ thực tế
Giả sử bạn có một điện trở mắc nối tiếp chịu sụt áp $V_R = 6\text{V}$ và dòng điện chạy qua là $I = 50\text{mA} = 0.05\text{A}$:

1. Tính công suất tỏa nhiệt thực tế:
   $$P_{\text{thực tế}} = 6\text{V} \times 0.05\text{A} = 0.3\text{W}$$
2. Nhân hệ số an toàn tối thiểu gấp 2 lần:
   $$P_{\text{cần}} \ge 2 \times 0.3\text{W} = 0.6\text{W}$$
3. Nếu chỉ dùng điện trở `1/4W` (`0.25W`), linh kiện sẽ bị quá công suất và nóng chảy. Trong trường hợp này, bạn nên chọn điện trở **`1W`** (hoặc mắc song song/nối tiếp nhiều điện trở để chia đều nhiệt).

---

## 3. Bài toán thực tế trên mạch PIC: IC ổn áp 7805 tỏa nhiệt

Vi điều khiển PIC (như PIC16F877A) thường chạy ổn định ở mức điện áp **`5V`**. Trong thực tế, nguồn cấp của bạn có thể là adapter `9V`, bình ắc quy `12V`, hoặc nguồn công nghiệp `24V`, nên bạn thường dùng IC ổn áp tuyến tính **7805** để hạ áp xuống `5V`.

### Công thức tính nhiệt tỏa ra trên IC 7805
IC tuyến tính hoạt động bằng cách "đốt" phần điện áp chênh lệch giữa ngõ vào ($V_{\text{in}}$) và ngõ ra ($V_{\text{out}} = 5\text{V}$) thành nhiệt năng:

$$P_{\text{7805}} = (V_{\text{in}} - V_{\text{out}}) \times I_{\text{tải}}$$

### So sánh hai trường hợp cùng nuôi tải `300mA` (`0.3A`) ở mức `5V`:

| Nguồn cấp vào ($V_{\text{in}}$) | Điện áp chênh lệch ($V_{\text{in}} - 5\text{V}$) | Dòng tải ($I_{\text{tải}}$) | Công suất tỏa nhiệt trên 7805 | Đánh giá thực tế |
| :--- | :--- | :--- | :--- | :--- |
| **9V** | `4V` | `0.3A` | `1.2W` | Ấm nhẹ, gắn thêm miếng tản nhiệt nhôm nhỏ là chạy ổn định |
| **12V** | `7V` | `0.3A` | `2.1W` | Tỏa nhiệt khá lớn, bắt buộc phải gắn tản nhiệt nhôm |
| **24V** | `19V` | `0.3A` | `5.7W` | Rất nóng, dễ kích hoạt bảo vệ quá nhiệt hoặc sụt áp; nên dùng mạch hạ áp xung (Buck converter) |

:::warning Lưu ý quan trọng khi cấp nguồn cho mạch PIC
* Không cấp nguồn điện áp cao trực tiếp nếu chưa kiểm tra giới hạn chịu nhiệt của IC ổn áp và tản nhiệt.
* Khi dòng tải tăng lên (ví dụ thêm relay, motor, LED ma trận), công suất tỏa nhiệt trên 7805 tăng tỷ lệ thuận theo dòng điện.
:::

---

## 4. Thuật ngữ thường gặp trong Datasheet

* **Power Dissipation ($P_D$):** Công suất tiêu tán / tỏa nhiệt tối đa cho phép của linh kiện.
* **Thermal Shutdown / Over-temperature Protection:** Tính năng tự ngắt hoặc giảm dòng để bảo vệ IC khi nhiệt độ vượt ngưỡng an toàn.
* **Heat Sink:** Bộ tản nhiệt (thường bằng nhôm) giúp tăng diện tích tiếp xúc với không khí để giải nhiệt nhanh hơn.
* **Buck Converter:** Mạch hạ áp chuyển mạch (hiệu suất cao hơn ổn áp tuyến tính khi chênh lệch điện áp lớn).