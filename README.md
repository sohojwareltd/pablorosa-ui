# Modern Portfolio Template

A premium, immersive one-page portfolio template perfect for musicians, artists, and creative professionals. Features cinematic animations, modern design, and seamless media integration. Built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Cinematic Animations** — Smooth, elegant transitions with Framer Motion
- 🎨 **Editorial Design** — Minimal, refined typography and asymmetric layouts
- 📱 **Fully Responsive** — Optimized for all screen sizes
- 🎵 **Media Integration** — Spotify, SoundCloud, and YouTube embeds
- 📝 **Field Journal** — Masonry layout for creative notes and reflections
- 📧 **Mailchimp Integration** — Newsletter signup ready
- 🖱️ **Custom Cursor** — Interactive cursor effects
- 🚀 **Smooth Scrolling** — Buttery smooth scroll with Lenis

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Smooth Scroll:** Lenis
- **TypeScript:** Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pablo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

If you encounter SWC binding errors on Windows (warnings about `@next/swc-win32-x64-msvc`), you can use the webpack fallback:
```bash
npm run dev:webpack
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Troubleshooting

**SWC Binding Errors on Windows:**
If you see warnings about SWC bindings not being valid Win32 applications, these are usually non-blocking. Next.js will automatically fall back to WASM bindings. However, if you encounter a `turbo.createProject` error, use:
```bash
npm run dev:webpack
```

This runs the dev server with webpack instead of Turbopack.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── sections/           # Section components
│   │   ├── Hero.tsx
│   │   ├── Music.tsx
│   │   ├── Gallery.tsx
│   │   ├── YouTubeSets.tsx
│   │   ├── FieldJournal.tsx
│   │   ├── SocialHub.tsx
│   │   └── Contact.tsx
│   ├── Navigation.tsx      # Navigation menu
│   ├── Cursor.tsx          # Custom cursor component
│   └── SmoothScroll.tsx    # Lenis smooth scroll wrapper
└── public/                 # Static assets
```

## Customization

### Adding Your Content

1. **Music Section** (`components/sections/Music.tsx`)
   - Replace placeholder Spotify/SoundCloud embed URLs with your tracks
   - Update track titles and metadata

2. **Gallery** (`components/sections/Gallery.tsx`)
   - Add your cover art images to the `public` folder
   - Update the `artworks` array with your image paths

3. **YouTube Sets** (`components/sections/YouTubeSets.tsx`)
   - Replace YouTube video IDs with your own
   - Update video titles, dates, and descriptions

4. **Field Journal** (`components/sections/FieldJournal.tsx`)
   - Add your journal entries, quotes, and sketches
   - Customize entry types as needed

5. **Social Links** (`components/sections/SocialHub.tsx`)
   - Update social media URLs
   - Replace icons with your preferred design

6. **Mailchimp Integration** (`components/sections/SocialHub.tsx`)
   - Replace the form action URL with your Mailchimp endpoint
   - Configure Mailchimp form settings

7. **Contact Email** (`components/sections/Contact.tsx`)
   - Update the email address
   - Configure form submission endpoint (consider using a service like Formspree or Resend)

### Design Tokens

Edit `app/globals.css` to customize:
- **Colors:** Carmine Red (`#960018`) and neutrals
- **Typography:** Font families and sizes
- **Spacing:** Layout spacing values

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

Build the production bundle:
```bash
npm run build
npm start
```

## Performance

- ✅ Optimized images with Next.js Image component
- ✅ Code splitting with Next.js App Router
- ✅ Lazy loading for media embeds
- ✅ CSS optimized with Tailwind
- ✅ Smooth animations with hardware acceleration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Documentation

For detailed guides, please refer to:
- **[INSTALLATION.md](INSTALLATION.md)** - Step-by-step installation guide
- **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Complete customization guide
- **[SUPPORT.md](SUPPORT.md)** - Support policy and common issues
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[CREDITS.md](CREDITS.md)** - Credits and attributions

## License

This template is licensed under GPL v2.0 for ThemeForest distribution.

---

**Built with modern technologies, designed for creative professionals.**
