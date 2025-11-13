# Deployment Guide — Pablo Rosa Website

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended — Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `pablo` repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

   ✅ **Done!** Your site will be live in ~2 minutes with automatic deployments on every push.

---

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

---

### Option 3: GitHub Pages (Manual Setup)

For Next.js static export (requires configuration):

1. **Configure Next.js for static export:**
   ```bash
   # Update next.config.ts
   ```

2. **Add GitHub Actions workflow** (see `.github/workflows/deploy.yml`)

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

---

## 📦 First-Time GitHub Setup

If you haven't set up git yet:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Pablo Rosa portfolio website"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/pablo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔧 Environment Variables

If you need environment variables (e.g., Mailchimp API keys):

1. **Vercel/Netlify:** Add them in the dashboard under Settings → Environment Variables
2. **Local:** Create a `.env.local` file (already in `.gitignore`)

---

## 📝 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Set up Vercel/Netlify account
- [ ] Connect GitHub repository
- [ ] Configure build settings (auto-detected for Next.js)
- [ ] Add environment variables if needed
- [ ] Customize domain (optional)
- [ ] Test live deployment

---

## 🎯 Post-Deployment

After deployment:
1. Update Mailchimp form action URL with your endpoint
2. Replace placeholder social media URLs
3. Add your actual content (tracks, images, journal entries)
4. Configure custom domain (optional)

---

**Questions?** The site is built with Next.js and will work perfectly on Vercel with zero configuration! 🚀

