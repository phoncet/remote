# KaziNzuri Frontend - Netlify Deployment Guide

## Requirements

- Node.js 18.x or higher
- npm or yarn
- Git repository

## Setup Instructions

### 1. Prerequisites
```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 8.x or higher
```

### 2. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 3. Deploy to Netlify

#### Option A: Using Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Option B: Connect GitHub Repository
1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select GitHub repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `18`
6. Click "Deploy site"

#### Option C: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy dist folder
netlify deploy --prod --dir=dist
```

### 4. Environment Variables

#### Set in Netlify Dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add variables:
   - `NODE_VERSION` = `18`
   - `NODE_ENV` = `production`
   - `VITE_API_URL` = (your API URL if needed)

Or create `.env.production.local` file:
```
VITE_API_URL=https://api.example.com
```

### 5. Configuration Files

The project includes:
- **netlify.toml** - Netlify build configuration
- **vite.config.js** - Vite build configuration
- **.env.example** - Example environment variables
- **.gitignore** - Git ignore patterns

### 6. Redirect Configuration

The `netlify.toml` file includes:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures React Router works correctly by redirecting all routes to index.html.

### 7. Build Optimization

- **Output:** `dist/` folder (optimized for production)
- **Size:** Minified and tree-shaken
- **Performance:** Optimized for fast loading

### 8. Deployment Checklist

- [ ] All code committed to GitHub
- [ ] No sensitive data in code
- [ ] Environment variables set in Netlify
- [ ] Build command verified: `npm run build`
- [ ] Publish directory correct: `dist`
- [ ] Redirects configured for SPA routing
- [ ] Test production build locally: `npm run build && npm run preview`

### 9. Common Issues

**Issue:** Build fails with "node_modules not found"
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install`

**Issue:** Routes not working after deployment
- Solution: Verify redirects in `netlify.toml` are configured

**Issue:** Environment variables not loaded
- Solution: Check Netlify dashboard under Site settings → Build & deploy → Environment

### 10. Post-Deployment

1. Test all routes and features
2. Check browser console for errors
3. Verify API connections (if applicable)
4. Test mobile responsiveness
5. Check lighthouse performance score

### 11. Useful Links

- [Netlify Documentation](https://docs.netlify.com)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Netlify CLI Documentation](https://docs.netlify.com/cli/overview/)

### 12. Support

For issues:
1. Check Netlify deploy logs
2. Review browser console
3. Check `npm run build` output locally
4. Verify all files are in `.gitignore` correctly
