# 🎯 AI Prompt Template for Portfolio Project Details

Copy paste prompt này khi bạn đang ở trong một project và muốn AI giúp tổng hợp thông tin để thêm vào portfolio.

---

## 📋 Master Prompt Template

```
Tôi cần bạn giúp tổng hợp thông tin về project này để thêm vào portfolio của tôi.

Hãy phân tích codebase hiện tại và trả lời theo format sau:

### 1. BASIC INFO
- **Project Title**: [tên dự án]
- **Short Description** (1-2 câu, max 200 chars): [mô tả ngắn]
- **Category**: [chọn 1: Blockchain / Full Stack / Frontend / Backend / Mobile / AI/Machine Learning / DevOps]
- **Live URL**: [nếu có]
- **GitHub URL**: [nếu có]

### 2. FULL DESCRIPTION (3-4 đoạn văn)
[Mô tả chi tiết về:
- Project làm gì, giải quyết vấn đề gì
- Ai là user/customer, scale ra sao
- Architecture/technical approach tổng quan
- Impact/results đạt được]

### 3. YOUR ROLE & TIMELINE
- **Role**: [ví dụ: Full-stack Developer, Lead Frontend Engineer, etc.]
- **Duration**: [ví dụ: "6 months", "Jan 2024 - Mar 2024"]
- **Team**: [ví dụ: "Solo project", "Team of 4 developers", "Startup founding team"]

### 4. TECHNOLOGIES
List tất cả tech stack sử dụng:
- [React, Next.js, TypeScript, Node.js, MongoDB, etc.]

### 5. CHALLENGE & SOLUTION
- **Challenge**: [Vấn đề/khó khăn kỹ thuật chính cần giải quyết]
- **Solution**: [Approach/giải pháp bạn đã implement để giải quyết]

### 6. KEY FEATURES (3-5 features)
Liệt kê các tính năng chính với impact cụ thể:

1. **[Feature Name]**
   - Description: [Chi tiết về feature này, metrics nếu có]

2. **[Feature Name]**
   - Description: [...]

3. **[Feature Name]**
   - Description: [...]

### 7. OUTCOME & IMPACT
[Kết quả đạt được: số lượng users, performance improvements, business impact, deployment status, etc. Càng có số liệu càng tốt!]

---

**LƯU Ý:**
- Ưu tiên thông tin có numbers/metrics (ví dụ: "30% faster", "500+ users", "99.9% uptime")
- Nếu không có thông tin chính xác, hãy note rõ là "To be updated"
- Tập trung vào technical challenges và solutions thực tế bạn đã implement
```

---

## 🎨 Variations - Prompts cho từng trường hợp cụ thể

### Option A: Khi project đang trong development
```
Project này đang trong giai đoạn development. Hãy phân tích codebase và:
1. Tổng hợp những gì đã implement xong
2. List tech stack đang dùng
3. Mô tả architecture hiện tại
4. Note những phần còn đang làm dở

Format output theo Portfolio Project Template ở trên.
```

### Option B: Khi project đã deploy
```
Project này đã được deploy và đang chạy production. Hãy:
1. Phân tích source code để hiểu architecture
2. Kiểm tra package.json/dependencies để list đầy đủ tech stack
3. Review README/docs nếu có
4. Tóm tắt features chính dựa trên code structure

Format output theo Portfolio Project Template ở trên.
```

### Option C: Khi muốn focus vào technical depth
```
Tôi muốn showcase technical expertise qua project này. Hãy:
1. Identify các technical challenges thú vị (performance, scalability, complex logic, etc.)
2. Highlight những patterns/architectures advanced đã sử dụng
3. Point out những optimization/best practices
4. Đề xuất metrics/numbers để quantify impact (nếu có thể estimate từ code)

Format output theo Portfolio Project Template ở trên, focusing on technical depth.
```

---

## 💡 Tips để get câu trả lời tốt hơn

### DO ✅
- Share thêm context về business domain nếu cần
- Nói rõ target audience của portfolio (recruiter? technical lead? startup founder?)
- Cung cấp metrics/numbers thực tế nếu bạn có
- Review và adjust output của AI cho đúng với reality

### DON'T ❌
- Đừng để AI bịa numbers - nếu không có data thật thì skip
- Đừng overstate impact - giữ cho realistic
- Đừng copy 100% - review và personalize lại

---

## 🚀 Quick Start Example

**Scenario**: Bạn đang trong một Next.js e-commerce project

**Prompt**:
```
Tôi cần bạn giúp tổng hợp thông tin về project e-commerce này để thêm vào portfolio.

Context thêm:
- Project phục vụ khoảng 1000+ users/month
- Tech stack: Next.js 14, TypeScript, Stripe, Tailwind
- Tôi làm role Full-stack Developer
- Duration: 4 tháng (Sep 2024 - Dec 2024)

Hãy phân tích codebase và format theo Portfolio Project Template.
Focus on: payment integration, inventory management, và real-time features.
```

---

## 📁 Sau khi có output từ AI

1. **Review & Edit**: Đọc lại, sửa cho đúng với thực tế
2. **Add to Sanity**: Copy vào script import hoặc nhập manual qua Studio
3. **Add Images**: Upload thumbnail & cover image
4. **Publish**: Push lên portfolio!

---

## 🔗 Related Files

- `IMPORT_PROJECTS.md` - Hướng dẫn import projects vào Sanity
- `src/sanity/schemas/project.ts` - Schema definition
- `scripts/import-cv-projects.js` - Import script template
- `src/data/fallbackProjects.ts` - Examples of well-formatted projects

---

**Happy documenting! 🎉**
