# 🚀 Sanity CMS Setup Guide

Portfolio của bạn đã được integrate với **Sanity.io** - một Headless CMS mạnh mẽ!

## ✨ Những gì đã setup:

✅ Sanity schemas cho Projects
✅ API client và queries
✅ Image optimization tự động
✅ Embedded Studio trong app
✅ Static generation với revalidation

## 📋 Bước Setup (5-10 phút)

### Bước 1: Tạo Sanity Project

1. **Truy cập:** https://sanity.io/
2. **Đăng ký/Đăng nhập** (miễn phí)
3. **Create new project:**
   - Click "Create project"
   - Project name: "Portfolio" (hoặc tên bạn muốn)
   - Dataset: "production" (mặc định)
   - Lưu lại **Project ID** (dạng: abc123xyz)

### Bước 2: Cấu hình Environment Variables

1. **Copy file example:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Update `.env.local`** với Project ID từ bước 1:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Thay bằng Project ID của bạn
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-03-13
   ```

### Bước 3: Configure CORS trên Sanity.io

1. Vào https://sanity.io/manage
2. Chọn project vừa tạo
3. Settings → API → CORS Origins
4. **Add CORS origin:**
   - Origin: `http://localhost:3000` (cho development)
   - Allow credentials: ✅ Check
   - Click "Add"
5. **Thêm production URL** (sau khi deploy):
   - Origin: `https://your-domain.com`
   - Allow credentials: ✅ Check

### Bước 4: Khởi động Dev Server

```bash
npm run dev
```

### Bước 5: Truy cập Sanity Studio

Mở browser:
```
http://localhost:3000/studio
```

**Lần đầu:**
- Sanity sẽ yêu cầu đăng nhập
- Sign in với account đã tạo ở Bước 1
- Accept permissions

## 🎨 Sử dụng Sanity Studio

### Thêm Project Mới:

1. **Truy cập Studio:** `http://localhost:3000/studio`
2. **Click "Project"** trong sidebar
3. **Click "Create" button (dấu +)**
4. **Điền thông tin:**

   **Basic Info:**
   - Title: Tên project
   - Slug: Click "Generate" tự động từ title
   - Short Description: Mô tả ngắn cho listing page
   - Full Description: Mô tả đầy đủ

   **Images:**
   - Thumbnail: Click "Upload" → Chọn ảnh (800x600 recommended)
   - Cover Image: Ảnh lớn cho detail page (1920x1080 recommended)

   **Details:**
   - Category: Chọn từ dropdown
   - Technologies: Nhập và enter (e.g., "React", "Next.js")
   - Featured: Toggle on/off
   - Role: Your role in project
   - Duration: Timeline
   - Team: Team size or "Solo project"
   - Live URL: Link to deployed project
   - GitHub URL: (Optional)

   **Project Story:**
   - Challenge: Vấn đề gặp phải
   - Solution: Cách giải quyết
   - Features: List các tính năng chính (mỗi dòng 1 feature)
   - Outcome: Kết quả đạt được

   **Gallery:**
   - Click "Add item" trong Gallery Sections
   - Section Key: ID duy nhất (e.g., "landing", "dashboard")
   - Title: Tên hiển thị (e.g., "Landing Page")
   - Description: Mô tả section
   - Images: Upload nhiều ảnh
     - Image: Upload file
     - Alt Text: Mô tả ảnh (cho SEO)
     - Caption: Text hiển thị (optional)

   **Display Order:**
   - Order: Số thứ tự (thấp hơn = hiện trước)

5. **Click "Publish"**

🎉 Done! Project sẽ xuất hiện ở `/work` ngay lập tức!

## 📸 Gallery Organization Best Practices

Tổ chức gallery theo user flow hoặc features:

**Web App:**
```
landing → authentication → dashboard → features → settings
```

**Mobile App:**
```
onboarding → home → core-features → profile
```

**Design Project:**
```
branding → wireframes → ui-designs → prototypes
```

## 🔄 Workflow Hàng Ngày

### Thêm/Edit Projects:
1. Vào `/studio`
2. Click project cần edit
3. Thay đổi và "Publish"
4. Changes live ngay! (hoặc max 60s với ISR)

### Upload Images:
- Drag & drop trực tiếp vào image fields
- Sanity tự động:
  - Upload lên CDN
  - Optimize size
  - Generate responsive versions
  - Serve qua CDN nhanh

### Preview Changes:
- Studio có real-time preview
- Hoặc check `/work` sau khi publish

## 🚀 Deploy to Production

### 1. Update CORS:
Thêm production domain vào Sanity CORS (như ở Bước 3)

### 2. Add Environment Variables trên hosting:
**Vercel/Netlify:**
- Settings → Environment Variables
- Add:
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
  NEXT_PUBLIC_SANITY_DATASET=production
  NEXT_PUBLIC_SANITY_API_VERSION=2024-03-13
  ```

### 3. Deploy:
```bash
git add .
git commit -m "Add Sanity CMS"
git push
```

Vercel/Netlify sẽ auto rebuild!

## 📊 Sanity Free Tier:

✅ **Bạn có:**
- 3 users
- Unlimited API requests
- 10GB bandwidth/tháng
- 5GB asset storage
- Real-time collaboration

❌ **Không lo:**
- Đủ xài cho portfolio cá nhân
- Upgrade khi cần (bắt đầu từ $99/mo)

## 🛠️ Troubleshooting

### Lỗi: "Missing environment variable"
→ Check `.env.local` có đúng format và restart `npm run dev`

### Studio không load:
→ Check CORS settings trên sanity.io/manage

### Images không hiển thị:
→ Verify Project ID đúng và images đã publish

### "Forbidden" error:
→ Đăng nhập lại Studio và check permissions

## 🎯 Next Steps

1. **Thêm projects từ data cũ:**
   - Mở `src/data/projects.ts`
   - Copy thông tin
   - Paste vào Studio
   - Upload images tương ứng

2. **Customize schema** (nếu cần):
   - Edit `sanity/schemas/project.ts`
   - Add/remove fields
   - Studio sẽ update tự động

3. **Backup cũ:**
   - Giữ file `src/data/projects.ts` để reference
   - Hoặc xóa sau khi đã migrate hết

## 💡 Tips

- **Keyboard shortcuts trong Studio:**
  - `Cmd/Ctrl + S`: Publish
  - `Cmd/Ctrl + Alt + P`: Preview
  
- **Image optimization:**
  - Upload PNG cho UI screenshots
  - Upload JPG cho photos
  - Sanity tự convert sang WebP

- **Version history:**
  - Studio lưu tất cả versions
  - Click "History" button để xem

- **Batch operations:**
  - Select nhiều projects
  - Bulk publish/unpublish

## 📚 Resources

- Sanity Docs: https://www.sanity.io/docs
- GROQ Cheat Sheet: https://www.sanity.io/docs/query-cheat-sheet
- Image API: https://www.sanity.io/docs/image-url
- Community: https://slack.sanity.io/

---

**Questions?** Check docs or reach out!

Happy content managing! 🎨✨
