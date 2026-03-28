# Portfolio Project Update Guide

## 🎉 Nâng Cấp Hoàn Tất!

Portfolio của bạn đã được nâng cấp với hệ thống quản lý project chi tiết và gallery theo sitemap.

## ✨ Tính Năng Mới

### 1. **Dynamic Project Pages**
- Mỗi project giờ có trang riêng với URL: `/work/[slug]`
- Ví dụ: `/work/gear-indigo`, `/work/spine-finance`

### 2. **Chi Tiết Project Đầy Đủ**
Mỗi project hiển thị:
- Overview đầy đủ
- Technologies stack
- Challenge & Solution
- Key Features
- Photo Gallery theo sitemap
- Outcome & Impact

### 3. **Photo Gallery với Sitemap**
- Phân loại ảnh theo sections (Landing, Dashboard, Chat, Editor, etc.)
- Lightbox với zoom
- Navigation keyboard (← → để chuyển ảnh, ESC để đóng)
- Smooth animations

## 📁 Cấu Trúc File Mới

```
src/
  ├── data/
  │   └── projects.ts          # Centralized project data
  ├── pages/
  │   └── work/
  │       ├── index.tsx         # Danh sách projects (updated)
  │       └── [slug].tsx        # Dynamic project detail page
  └── components/
      └── ProjectGallery.tsx   # Gallery component với lightbox

public/
  └── projects/
      ├── gearindigo.png       # Thumbnail cho listing
      ├── spine.png
      ├── lms.png
      └── [project-name]/      # Folder cho gallery images
          ├── landing-hero.png
          ├── dashboard-main.png
          └── ...
```

## 🚀 Cách Thêm Project Mới

### Bước 1: Chuẩn bị images
Tạo folder trong `public/projects/[ten-project-moi]/` với các ảnh:
- Thumbnail: `public/projects/ten-project-moi.png` (cho listing page)
- Cover image: có thể dùng cùng thumbnail hoặc ảnh khác
- Gallery images: đặt trong folder với tên mô tả

### Bước 2: Thêm data vào `src/data/projects.ts`

```typescript
{
    id: 4,
    slug: 'ten-project-slug',
    title: 'Tên Project',
    shortDescription: 'Mô tả ngắn cho listing page',
    fullDescription: `Mô tả chi tiết đầy đủ về project...
    
    Có thể nhiều đoạn văn.`,
    
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Full Stack',  // hoặc category mới
    featured: true,
    
    role: 'Full-stack Developer',
    duration: 'Mar 2024 - Present',
    team: 'Solo project',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/...',  // optional
    
    thumbnail: '/projects/ten-project.png',
    coverImage: '/projects/ten-project.png',
    
    challenge: 'Mô tả thách thức khi làm project...',
    solution: 'Cách giải quyết...',
    
    features: [
        'Feature 1 description',
        'Feature 2 description',
        // ...
    ],
    
    gallery: {
        'landing': {
            title: 'Landing Page',
            description: 'First impression and showcase',
            images: [
                {
                    url: '/projects/ten-project/landing-hero.png',
                    alt: 'Landing page hero section',
                    caption: 'Hero section with CTA'  // optional
                },
                // More images...
            ]
        },
        'dashboard': {
            title: 'Dashboard',
            description: 'Main user interface',
            images: [
                {
                    url: '/projects/ten-project/dashboard.png',
                    alt: 'Dashboard view'
                }
            ]
        },
        // Thêm sections theo sitemap của app...
    },
    
    outcome: 'Kết quả và impact của project...'
}
```

### Bước 3: Deploy!
Project mới sẽ tự động xuất hiện trong:
- Listing page (`/work`)
- Detail page (`/work/ten-project-slug`)
- Category filters (nếu là category mới)

## 🎨 Cấu Trúc Gallery Sitemap

Tổ chức gallery theo cấu trúc logic của app, ví dụ:

**Cho Web App:**
```javascript
gallery: {
    'landing': {...},      // Trang landing
    'authentication': {}, // Login/Signup
    'dashboard': {},      // Dashboard chính
    'feature-1': {},      // Feature cụ thể
    'feature-2': {},
    'admin': {},          // Admin panel
}
```

**Cho Mobile App:**
```javascript
gallery: {
    'onboarding': {...},   // Onboarding screens
    'home': {},            // Home screen
    'profile': {},         // User profile
    'settings': {},        // Settings
}
```

**Cho Design/Marketing:**
```javascript
gallery: {
    'branding': {...},     // Logo, colors, typography
    'marketing': {},       // Ads, banners
    'ui-components': {},   // Reusable components
}
```

## 🔧 Troubleshooting

### TypeScript Errors
Nếu gặp lỗi import sau khi tạo files mới:
```bash
# Restart TypeScript server
# Trong VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# Hoặc rebuild
npm run dev
```

### Images không hiển thị
- Kiểm tra path = `/projects/...` (bắt đầu với `/`)
- Đảm bảo file tồn tại trong `public/projects/`
- Xóa cache: `rm -rf .next && npm run dev`

### Gallery không hoạt động
- Đảm bảo có ít nhất 1 section trong gallery object
- Mỗi section phải có array `images` (có thể empty)

## 📸 Placeholder Images

Code hiện đang reference các images trong `projectsData`. Để tránh 404:

1. **Sử dụng ảnh thật của bạn**: Copy vào `public/projects/`
2. **Dùng placeholders tạm**: Tạo folders và placeholder images
3. **Update paths**: Comment out các paths không có ảnh thật

### Script tạo placeholder folders:
```bash
cd public/projects

# Gear Indigo
mkdir -p gearindigo
cd gearindigo
touch landing-hero.png landing-features.png dashboard-main.png dashboard-analytics.png chat-interface.png chat-streaming.png editor-main.png editor-tools.png deployment-config.png deployment-success.png
cd ..

# Spine Finance
mkdir -p spine
cd spine
touch landing.png markets-overview.png dashboard.png
cd ..

# ELMS
mkdir -p elms
cd elms
touch login.png student-dashboard.png teacher-dashboard.png course-list.png
cd ..
```

## 🎯 Next Steps

1. **Thêm ảnh thật** vào các folders trong `public/projects/`
2. **Test các pages**:
   - `/work` - Listing page
   - `/work/gear-indigo` - Detail page
   - Click vào gallery để test lightbox
3. **Customize styling** nếu cần
4. **Thêm projects mới** theo hướng dẫn trên

## 💡 Tips

- **Optimize images**: Dùng WebP format và compress trước khi upload
- **Lazy loading**: Đã được implement, không cần lo
- **SEO**: Luôn điền `alt` text cho images
- **Gallery organization**: Sắp xếp sections theo user journey
- **Mobile responsive**: Đã được handle, test trên mobile

---

Made with ❤️ by GitHub Copilot
