#!/bin/bash

# Script to create placeholder structure for project gallery images

echo "🎨 Creating project gallery folder structure..."

cd public/projects || exit

# Gear Indigo
echo "📁 Creating Gear Indigo folders..."
mkdir -p gearindigo
cd gearindigo
touch landing-hero.png landing-features.png
touch dashboard-main.png dashboard-analytics.png
touch chat-interface.png chat-streaming.png
touch editor-main.png editor-tools.png
touch deployment-config.png deployment-success.png
cd ..

# Spine Finance
echo "📁 Creating Spine Finance folders..."
mkdir -p spine
cd spine
touch landing.png markets-overview.png dashboard.png
cd ..

# ELMS
echo "📁 Creating ELMS folders..."
mkdir -p elms
cd elms
touch login.png student-dashboard.png teacher-dashboard.png course-list.png
cd ..

echo "✅ Done! Folder structure created."
echo ""
echo "📝 Next steps:"
echo "1. Add your real images to the folders in public/projects/"
echo "2. Or use placeholder generator: https://placehold.co/"
echo "3. Run 'npm run dev' to see your portfolio"
echo ""
echo "📂 Structure created:"
echo "  public/projects/"
echo "    ├── gearindigo/ (10 placeholder files)"
echo "    ├── spine/ (3 placeholder files)"
echo "    └── elms/ (4 placeholder files)"
