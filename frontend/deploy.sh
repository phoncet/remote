#!/bin/bash
# KaziNzuri - Quick Deployment Script
# Run this to prepare for Netlify deployment

echo "🚀 KaziNzuri - Netlify Deployment Preparation"
echo "=============================================="
echo ""

# Check Node version
echo "📋 Checking Node.js version..."
node --version
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Build project
echo "🔨 Building project..."
npm run build
echo ""

# Check build output
if [ -d "dist" ]; then
  echo "✅ Build successful!"
  echo "📁 Build size:"
  du -sh dist/
  echo ""
else
  echo "❌ Build failed! Check errors above."
  exit 1
fi

# Preview build
echo "👀 Preview production build..."
echo "Run: npm run preview"
echo ""

# Git status
echo "📊 Git status:"
git status
echo ""

# Next steps
echo "✨ Next Steps:"
echo "1. Test locally: npm run preview"
echo "2. Commit changes: git add . && git commit -m 'Ready for Netlify deployment'"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Deploy on Netlify:"
echo "   - Option A: netlify deploy --prod"
echo "   - Option B: Connect GitHub repo on netlify.com"
echo ""
echo "✅ Ready for deployment!"
