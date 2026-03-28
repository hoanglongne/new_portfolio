# Import CV Projects to Sanity

This guide explains how to quickly import your CV projects into Sanity CMS without manual GUI entry.

## 📋 Prerequisites

1. Sanity project already set up (see `SANITY_INTEGRATION.md`)
2. Project ID and Dataset configured in `.env.local`
3. Sanity API token with Editor permissions

## 🔑 Step 1: Create Sanity API Token

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your portfolio project
3. Go to **Settings → API → Tokens**
4. Click **"Add API token"**
5. Give it a name (e.g., "Import Script")
6. Select **"Editor"** permission (required for creating documents)
7. Copy the generated token

## ⚙️ Step 2: Add Token to Environment Variables

Add the token to your `.env.local` file:

```bash
# Your existing variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Add this new line:
SANITY_API_TOKEN=your-editor-token-here
```

## 🚀 Step 3: Run the Import Script

```bash
# Make sure you're in the project root directory
cd /Users/macos/Desktop/Portfolio/portfolio

# Run the import script
node scripts/import-cv-projects.js
```

## ✅ What Gets Imported

The script will create 6 projects based on your CV and current work:

1. **Spine Finance Dashboard** (Blockchain)
   - Fixed-rate DeFi lending & borrowing platform
   - Multi-chain support (Rise, HyperEVM, Base, Ethereum, Citrea)
   - React 19 with Promise-based suspension architecture
   - 408 files, 61k LOC, 50+ UI components
   - Lead Frontend Engineer, Nov 2024 - Mar 2026

2. **E-Learning Marketplace** (Full Stack)
   - Udemy-scale LMS system
   - Complete feature set from your CV

3. **Singapore Maritime Automation** (Full Stack)
   - Port machinery control dashboard
   - 30% efficiency improvement metrics

4. **B2B2C Travel API Hub** (Backend)
   - High-concurrency OTA integration
   - 40% latency reduction achievements

5. **ORATIO** (Full Stack)
   - Real-time IELTS Speaking practice platform
   - Supabase + LiveKit audio matching system
   - Mar 2026 - Present (ongoing)

6. **ERA Tourist** (Full Stack)
   - Multi-Region TravelTech SaaS platform
   - 1 codebase → N market-specific websites
   - Tour Planning Engine with smart pricing
   - 50k LOC, 162 files, 12+ admin modules
   - Full bilingual support (VN/EN)

## 📸 Step 4: Add Images (Manual)

After importing, you'll need to add images through the Sanity Studio:

1. Visit `http://localhost:3000/studio`
2. Click on each project
3. Upload **thumbnail** and **cover image**
4. Click **Publish**

### Recommended Image Sizes

- **Thumbnail**: 800x600px (4:3 ratio)
- **Cover Image**: 1920x1080px (16:9 ratio)

## 🔄 Re-running the Script

The script uses `createOrReplace`, so you can run it multiple times safely:
- Existing projects will be updated (keeping the same ID)
- Images you've uploaded manually will be preserved
- Any edits you made in the Studio will be overwritten

## 🛠️ Troubleshooting

### "SANITY_API_TOKEN not found"
Make sure you added the token to `.env.local` (not `.env.local.example`)

### "Invalid credentials"
- Token might have expired or been revoked
- Create a new token with Editor permissions
- Update `.env.local` with the new token

### "Project ID not found"
Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env.local`

### Import succeeds but projects don't appear in Studio
- Try refreshing the Studio page
- Check that you're logged into the correct Sanity account
- Verify the dataset name matches (usually "production")

## 🎨 Customization

To modify project data before importing:

1. Edit `scripts/import-cv-projects.js`
2. Update the `cvProjects` array
3. Run the script again

## 📚 Related Files

- `scripts/import-cv-projects.js` - Import script
- `src/data/fallbackProjects.ts` - Fallback data (already updated)
- `src/sanity/schemas/project.ts` - Sanity project schema
- `SANITY_INTEGRATION.md` - Full Sanity setup guide

## 🎯 Next Steps

After importing:

1. ✅ Add images to projects in Studio
2. ✅ Review and tweak descriptions if needed
3. ✅ Adjust the `order` field to control display sequence
4. ✅ Mark projects as `featured` if desired
5. ✅ Visit `/work` to see your projects live!
6. ✅ Consider adding gallery images for project detail pages

---

**Note**: The fallback projects in `src/data/fallbackProjects.ts` have already been updated to match your CV, so your `/work` page will show correct data even before importing to Sanity.
