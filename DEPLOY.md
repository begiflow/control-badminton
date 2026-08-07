# Đẩy lên GitHub và bật Pages

Repo local đã sẵn sàng: đã `git init`, đã commit toàn bộ 9 file lên branch `main`, working tree sạch. Chỉ còn hai việc cần tài khoản GitHub của bạn.

Mở Terminal và `cd` vào thư mục chứa các file này trước khi chạy.

---

## Cách 1 — Dùng GitHub CLI (nhanh nhất, 2 lệnh)

Nếu chưa có `gh`:

```bash
brew install gh
gh auth login
```

Chọn `GitHub.com` → `HTTPS` → `Login with a web browser`, rồi làm theo hướng dẫn trên trình duyệt.

Sau đó tạo repo và đẩy lên:

```bash
gh repo create control-badminton --public --source=. --remote=origin --push
```

Bật GitHub Pages:

```bash
gh api -X POST repos/:owner/control-badminton/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

Xong. Link của bạn sẽ là:

```
https://<tên-github-của-bạn>.github.io/control-badminton/
```

Lần đầu build mất khoảng 1–2 phút.

---

## Cách 2 — Làm bằng tay trên web

1. Vào https://github.com/new
2. Repository name: `control-badminton` — chọn **Public** (Pages miễn phí cần public nếu bạn dùng tài khoản Free)
3. **Không tích** "Add a README file" — repo local đã có sẵn rồi, tích vào sẽ gây xung đột
4. Bấm **Create repository**
5. Quay lại Terminal, chạy (thay `<user>` bằng tên GitHub của bạn):

```bash
git remote add origin https://github.com/<user>/control-badminton.git
git push -u origin main
```

Nếu GitHub hỏi mật khẩu, nó cần **Personal Access Token** chứ không phải mật khẩu tài khoản. Tạo tại https://github.com/settings/tokens → *Generate new token (classic)* → tích quyền `repo`.

6. Vào repo trên web → tab **Settings** → mục **Pages** ở cột trái
7. Phần **Source** chọn `Deploy from a branch`
8. Branch: `main`, thư mục: `/ (root)` → bấm **Save**
9. Đợi 1–2 phút, link sẽ hiện ngay đầu trang đó

---

## Kiểm tra sau khi deploy

- [ ] Mở link, trang hiện đúng phần "Phom tay kín" với 5 bài
- [ ] Bấm mở một bài, sơ đồ SVG sân hiển thị được
- [ ] Bộ đếm hiệp dưới màn hình bấm chạy được
- [ ] Mở trên điện thoại, thêm vào màn hình chính
- [ ] Bật chế độ máy bay rồi mở lại app từ màn hình chính — vẫn vào được (service worker đã cache)

Nếu bước cuối không chạy: service worker chỉ hoạt động qua HTTPS. GitHub Pages luôn là HTTPS nên bình thường sẽ ổn; thử tải lại trang một lần rồi mới bật chế độ máy bay.

---

## Cập nhật về sau

Mỗi lần sửa nội dung giáo án:

```bash
git add -A
git commit -m "mô tả thay đổi"
git push
```

Pages tự build lại sau khoảng 1 phút.

**Quan trọng:** nếu bạn sửa `index.html`, hãy đổi số phiên bản trong `sw.js` (dòng `const CACHE = 'control-v1'` → `'control-v2'`). Không đổi thì máy đã cài app sẽ tiếp tục dùng bản cũ trong cache.

---

## Vài lưu ý

**Repo nên để public hay private?** Nội dung là giáo án tập luyện cá nhân, không có gì nhạy cảm — dữ liệu tiến độ và video bạn lưu nằm trong `localStorage` trên máy bạn, không nằm trong repo. Nếu muốn để private thì cần tài khoản GitHub Pro mới bật được Pages.

**Đổi tên repo?** Tên repo quyết định đường dẫn. Nếu bạn đặt repo tên `<user>.github.io` thì link sẽ là `https://<user>.github.io/` không có hậu tố — nhưng mỗi tài khoản chỉ có một repo như vậy.

**Tiến độ có đồng bộ giữa các máy không?** Không. `localStorage` gắn với từng trình duyệt trên từng thiết bị. Mở link trên điện thoại và trên laptop sẽ là hai bộ dữ liệu riêng.
