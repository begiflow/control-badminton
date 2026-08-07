# CONTROL — Giáo án chuyển sang lối chơi kiểm soát

Web app một trang, chạy offline, dùng cho việc chuyển lối đánh cầu lông sang phong cách **kiểm soát** của Kento Momota.

Giáo án được cá nhân hoá cho hồ sơ: **32 tuổi · 1m64 · 60kg · tập solo · 2 buổi sân + 3 buổi khô mỗi tuần**. Ưu tiên an toàn khớp gối và cổ chân, loại bỏ bật nhảy đập và lối bào thể lực.

## Nội dung

**25 bài tập** chia 5 nhóm, mỗi bài gồm mục tiêu (học từ Momota điểm gì), hướng dẫn từng bước, khối lượng tập, và nguồn video.

| Nhóm | Bài | Nội dung |
|---|---|---|
| Phom tay kín | 01–05 | Grip trung tính, một phom ba đường cầu, xoay cẳng tay, ôm lưới, trái tay ngón cái |
| Bộ chân lướt | 06–11 | Split-step nhẹ, chassé 4 góc, xoay hông thay bật nhảy, lunge an toàn, shadow, hồi vị |
| Phòng thủ & đôi công | 12–15 | Tư thế thủ thấp, đỡ cầu vào người, drive tầm ngang, chuyển thủ thành công |
| Điều cầu & chiến thuật | 16–20 | Lift tấn công, punch clear, follow the line, đấu người cao, giao cầu thấp |
| Phòng chấn thương | 21–25 | Achilles, cổ chân, gối và háng, chóp xoay vai, mobility |

Ngoài ra: lịch tuần 1 và tuần 2, 7 luật tự áp khi đánh giao lưu, 10 chỉ số nghiệm thu, lộ trình 8 tuần theo trình tự 守 → 破 → 離.

## Tính năng

- **19 sơ đồ SVG** vẽ theo kích thước sân chuẩn BWF: 13,40 × 6,10 m, lưới 1,55 m, vạch giao cầu ngắn 1,98 m, vạch đơn lùi 0,46 m
- **Bộ đếm hiệp/nghỉ** cố định dưới màn hình, có tín hiệu âm thanh khi chuyển pha
- **Đánh dấu tiến độ** từng bài, lưu trên máy
- **Video hai tầng**: nút "Xem Momota làm" (footage và phân tích chậm) và "Học cách làm" (video hướng dẫn kỹ thuật), cộng 195 từ khoá tìm kiếm tiếng Việt và tiếng Anh
- **Tự lưu video**: dán link YouTube vào bài bất kỳ, app nhớ và nhúng sẵn cho lần sau
- **Chạy offline** qua service worker, cài được ra màn hình chính điện thoại

## Cấu trúc

```
index.html              toàn bộ app trong một file, không phụ thuộc thư viện ngoài
manifest.webmanifest    cấu hình PWA
sw.js                   service worker cho chế độ offline
icon-192.png            icon ứng dụng
icon-512.png
apple-touch-icon.png
.nojekyll               tắt xử lý Jekyll trên GitHub Pages
```

Không có bước build, không có dependency, không có backend. Mọi dữ liệu (tiến độ, video đã lưu) nằm trong `localStorage` của trình duyệt, không gửi đi đâu.

## Chạy tại máy

Mở thẳng `index.html` bằng trình duyệt là dùng được. Service worker chỉ kích hoạt khi phục vụ qua HTTPS, nên muốn thử chế độ offline thì chạy một server tĩnh:

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Cài ra điện thoại

Mở link GitHub Pages trên điện thoại, rồi:

- **iOS Safari** — nút Chia sẻ → Thêm vào MH chính
- **Android Chrome** — menu ba chấm → Thêm vào màn hình chính

Sau lần mở đầu tiên, app dùng được cả khi mất mạng.

## Lưu ý

Tiến độ và video đã lưu gắn với trình duyệt trên từng thiết bị. Mở trên máy khác sẽ là danh sách trống.

Đây là tài liệu tập luyện, không thay thế tư vấn y tế. Nếu có tiền sử chấn thương gối, cổ chân hoặc vai, hỏi ý kiến bác sĩ thể thao trước khi bắt đầu.

## Nguồn tham khảo

- Kích thước sân và lưới theo BWF Statutes, Laws of Badminton, mục 1
- Phân tích lối chơi Momota: [The Total Badminton of Kento Momota](https://medium.com/this-is-badminton/the-total-badminton-of-kento-momota-4f53e45510ec) · [Kento Momota – A Player Study](https://getgoodatbadminton.com/kento-momota-badminton-a-player-study) · [Momota's lob and lift tactic](https://stevesbadminton.com/2024/08/26/lets-discuss-one-tactic-which-was-favoured-by-momota-lobs-and-lifts-to-the-corners-of-the-court/)
