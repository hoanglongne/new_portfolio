# 📸 Image Setup for Project Gallery

## Quick Start

Bạn có 3 options để setup images cho gallery:

### Option 1: Sử dụng ảnh thật (Recommended)
1. Copy ảnh project của bạn vào `public/projects/[project-name]/`
2. Đảm bảo tên file khớp với paths trong `src/data/projects.ts`
3. Optimize images trước (compress, resize nếu cần)

### Option 2: Tạo folder structure với placeholders
```bash
./create-gallery-folders.sh
```
Script này sẽ tạo tất cả folders và placeholder files cần thiết.

### Option 3: Dùng online placeholder service
Update URLs trong `src/data/projects.ts` tạm thời:
```typescript
url: 'https://placehold.co/1920x1080/1a1a2e/ffffff?text=Dashboard'
```

## Image Paths Reference

Hiện tại, data trong `src/data/projects.ts` đang reference:

### Gear Indigo
- `/projects/gearindigo/landing-hero.png`
- `/projects/gearindigo/landing-features.png`
- `/projects/gearindigo/dashboard-main.png`
- `/projects/gearindigo/dashboard-analytics.png`
- `/projects/gearindigo/chat-interface.png`
- `/projects/gearindigo/chat-streaming.png`
- `/projects/gearindigo/editor-main.png`
- `/projects/gearindigo/editor-tools.png`
- `/projects/gearindigo/deployment-config.png`
- `/projects/gearindigo/deployment-success.png`

### Spine Finance
- `/projects/spine/landing.png`
- `/projects/spine/markets-overview.png`
- `/projects/spine/dashboard.png`

### ELMS
- `/projects/elms/login.png`
- `/projects/elms/student-dashboard.png`
- `/projects/elms/teacher-dashboard.png`
- `/projects/elms/course-list.png`

## Image Specs

**Recommended sizes:**
- Thumbnails (listing): 800x600px hoặc 4:3 ratio
- Cover images: 1920x1080px hoặc 16:9 ratio
- Gallery images: 1920x1080px (tùy content, có thể khác)

**Format:**
- WebP (best) - modern, nhỏ gọn
- PNG (good) - cho UI screenshots
- JPG (ok) - cho photos/complex images

**Compression:**
- Aim for < 200KB per image
- Tools: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

## Using Placeholders During Development

Nếu chưa có ảnh thật, bạn có thể:

1. **Comment out sections chưa có ảnh**:
```typescript
gallery: {
    'landing': {
        title: 'Landing Page',
        description: 'Coming soon',
        images: [] // Empty array = no error
    }
}
```

2. **Dùng existing image cho tất cả**:
```typescript
url: '/projects/gearindigo.png', // Dùng thumbnail cho tất cả tạm
```

3. **Generate placeholders online**:
```typescript
url: 'https://placehold.co/1920x1080/0a1c2a/9da9b4?text=Dashboard+View&font=roboto'
```

## Script hỗ trợ

### Generate folders:
```bash
./create-gallery-folders.sh
```

### Download sample placeholders (if you want):
```bash
# Example using wget/curl
curl https://placehold.co/1920x1080/0a1c2a/9da9b4?text=Landing > public/projects/gearindigo/landing-hero.png
```

## Notes

- Nếu image không load, check browser console để xem path error
- Next.js automatically optimizes images trong `public/`
- Không cần restart server khi add images mới vào `public/`
- Gallery sẽ gracefully handle missing images với placeholder UI

---

Để biết thêm chi tiết, xem [PROJECT_UPDATE_GUIDE.md](./PROJECT_UPDATE_GUIDE.md)
