# System Requirements

## Server Requirements

### Minimum Requirements
- **Node.js:** 18.0.0 or higher
- **npm:** 9.0.0 or higher (comes with Node.js)
- **RAM:** 512MB minimum (1GB recommended)
- **Disk Space:** 500MB for installation

### Recommended Requirements
- **Node.js:** 20.x LTS (Long Term Support)
- **npm:** 10.x or higher
- **RAM:** 2GB or more
- **Disk Space:** 1GB or more

## Development Environment

### Supported Operating Systems
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+, Debian 11+, etc.)

### Code Editor
- **VS Code** (recommended)
- Any editor that supports TypeScript/React

### Browser Support (Development)
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Deployment

### Recommended Hosting Platforms
- **Vercel** (recommended - built by Next.js creators)
- **Netlify**
- **AWS Amplify**
- **Cloudflare Pages**
- Any Node.js hosting service

### Build Requirements
- Node.js 18+ for build process
- Sufficient memory for build (1GB+ recommended)

## Third-Party Services (Optional)

The template integrates with (user must configure):
- **Spotify** - For music embeds
- **YouTube** - For video embeds
- **Mailchimp** - For newsletter (optional)
- **Form Services** - For contact forms (Formspree, Resend, etc.)

## Checking Your System

### Check Node.js Version
```bash
node --version
```
Should show: `v18.0.0` or higher

### Check npm Version
```bash
npm --version
```
Should show: `9.0.0` or higher

### Check Available Disk Space
```bash
# Windows
dir

# macOS/Linux
df -h
```

## Installation Verification

After installation, verify everything works:

```bash
npm install
npm run dev
```

If the development server starts without errors, your system meets all requirements.

## Troubleshooting

### Node.js Version Too Old
- Download latest LTS from [nodejs.org](https://nodejs.org/)
- Uninstall old version first
- Install new version
- Restart terminal/command prompt

### Insufficient Memory
- Close other applications
- Increase swap space (Linux)
- Use a machine with more RAM

### Build Failures
- Ensure Node.js 18+ is installed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

---

**Note:** These are the requirements for the template itself. Your hosting provider may have additional requirements.

