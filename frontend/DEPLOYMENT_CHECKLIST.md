# KaziNzuri - Pre-Deployment Checklist

## Code Quality
- [ ] No console errors or warnings
- [ ] All environment variables properly configured
- [ ] No hardcoded API endpoints or passwords
- [ ] All dependencies are necessary

## Build & Performance
- [ ] `npm run build` runs without errors
- [ ] `npm run preview` shows correct production build
- [ ] No large bundle size warnings
- [ ] Images are optimized

## Features Testing
- [ ] Homepage loads correctly
- [ ] Search filters work (category, region, district)
- [ ] User registration works
- [ ] User login works
- [ ] Admin login works (password: admin123)
- [ ] Job posting works (for users)
- [ ] Job application works
- [ ] Profile page loads
- [ ] Admin dashboard shows data
- [ ] Logout works
- [ ] Navigation between pages works
- [ ] Side menu works on mobile

## Responsive Design
- [ ] Looks good on desktop (1200px+)
- [ ] Looks good on tablet (768px+)
- [ ] Looks good on mobile (320px+)
- [ ] All buttons are clickable on mobile
- [ ] No horizontal scrolling on mobile

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Security
- [ ] No sensitive data in localStorage (except intentional)
- [ ] No API keys exposed
- [ ] No admin password visible in code
- [ ] HTTPS enabled on Netlify

## Performance
- [ ] Page loads in < 3 seconds
- [ ] Lighthouse score > 80
- [ ] No memory leaks
- [ ] Smooth animations and transitions

## Files Required for Netlify
- [ ] `netlify.toml` - Build configuration ✓
- [ ] `public/_redirects` - SPA routing ✓
- [ ] `.env.example` - Environment template ✓
- [ ] `.gitignore` - Git ignore patterns ✓
- [ ] `package.json` - Dependencies ✓
- [ ] `NETLIFY_DEPLOYMENT.md` - Deployment guide ✓

## Before Pushing to GitHub
- [ ] All changes committed
- [ ] No node_modules in git
- [ ] .env files excluded
- [ ] dist/ folder excluded
- [ ] README.md updated

## Netlify Configuration
- [ ] Site name chosen
- [ ] GitHub repository connected
- [ ] Build command set: `npm run build`
- [ ] Publish directory set: `dist`
- [ ] Node version set: `18`
- [ ] Environment variables added
- [ ] Domain configured

## Post-Deployment Testing
- [ ] Homepage loads
- [ ] All routes work (no 404 errors)
- [ ] Search functionality works
- [ ] User authentication works
- [ ] Admin panel accessible
- [ ] No console errors
- [ ] Mobile view works
- [ ] Forms submit correctly

## Domain & DNS (Optional)
- [ ] Custom domain connected
- [ ] SSL certificate generated
- [ ] DNS records configured

## Monitoring & Maintenance
- [ ] Set up Netlify notifications
- [ ] Monitor deployment logs
- [ ] Check analytics
- [ ] Plan for updates

## Quick Deployment Steps
```bash
# 1. Verify build locally
npm run build
npm run preview

# 2. Commit changes
git add .
git commit -m "Ready for Netlify deployment"

# 3. Push to GitHub
git push -u origin main

# 4. Deploy on Netlify
# Option A: Via CLI
netlify deploy --prod

# Option B: Via GitHub (recommended - automatic)
# Just push to GitHub, Netlify will deploy automatically
```

## Troubleshooting
If deployment fails:
1. Check Netlify deploy logs
2. Verify build locally: `npm run build`
3. Check .gitignore for common issues
4. Clear Netlify cache and retry
5. Review NETLIFY_DEPLOYMENT.md for help
