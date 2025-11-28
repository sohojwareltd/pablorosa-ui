# Customization Guide

This guide will help you customize the template to match your brand and content.

## Table of Contents

1. [Basic Information](#basic-information)
2. [Content Sections](#content-sections)
3. [Styling & Colors](#styling--colors)
4. [Media Files](#media-files)
5. [Third-Party Integrations](#third-party-integrations)
6. [Advanced Customization](#advanced-customization)

## Basic Information

### Site Metadata

Edit `app/layout.tsx` to update:
- Site title
- Meta description
- Keywords
- Open Graph tags

```typescript
export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your site description",
  keywords: "your, keywords, here",
  // ...
};
```

## Content Sections

### 1. Hero Section

**File:** `components/sections/Hero.tsx`

- Update hero text and tagline
- Replace video: Add your video to `public/` and update the path
- Update CTA button text and links

### 2. Music Section

**File:** `components/sections/Music.tsx`

Update the `tracks` array with your music:

```typescript
const tracks: Track[] = [
  {
    embedUrl: 'https://open.spotify.com/embed/track/YOUR_TRACK_ID',
    title: 'Your Track Title',
    artist: 'Your Artist Name',
    duration: '3:45',
  },
  // Add more tracks...
];
```

**To get Spotify embed URLs:**
1. Open your track on Spotify
2. Click "..." → "Share" → "Embed track"
3. Copy the embed URL

### 3. Album Hero Section

**File:** `components/sections/AlbumHero.tsx`

Update the `latestAlbum` object:
- Album title, year, description
- Cover art path
- Demo audio file path
- Track list
- Platform links (Spotify, iTunes, Amazon)

### 4. Gallery Section

**File:** `components/sections/Gallery.tsx`

1. Add your images to `public/coverart/`
2. Update the `artworks` array:

```typescript
export const artworks: Artwork[] = [
  { id: 1, title: 'Artwork 01', image: '/coverart/your-image.jpg', year: '2024' },
  // Add more artworks...
];
```

### 5. YouTube Sets Section

**File:** `components/sections/YouTubeSets.tsx`

Update YouTube video IDs in the `sets` array. Extract the ID from YouTube URLs:
- URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Use only the `VIDEO_ID` part

### 6. Tour Slider Section

**File:** `components/sections/TourSlider.tsx`

1. Add tour images to `public/tour/`
2. Update the `tourDates` array with your tour information

### 7. Field Journal Section

**File:** `components/sections/FieldJournal.tsx`

Update the `entries` array with your journal content:
- Quotes
- Notes
- Sketches
- Dates

### 8. Social Hub Section

**File:** `components/sections/SocialHub.tsx`

Update social media links:
- Instagram
- Twitter/X
- Facebook
- YouTube
- SoundCloud
- Spotify

### 9. Contact Section

**File:** `components/sections/Contact.tsx`

- Update contact email
- Configure form submission (use services like Formspree, Resend, or your own API)

## Styling & Colors

### Global Styles

**File:** `app/globals.css`

Customize design tokens:

```css
/* Primary Colors */
--color-primary: #960018; /* Carmine Red */
--color-secondary: #6b46c1; /* Purple */
--color-accent: #2563eb; /* Blue */

/* Typography */
--font-serif: 'Playfair Display', serif;
--font-sans: 'Inter', sans-serif;
--font-grotesk: 'Space Grotesk', sans-serif;
```

### Component-Specific Styling

Each component uses Tailwind CSS classes. You can:
- Modify colors directly in component files
- Update spacing and sizing
- Adjust animation timings

## Media Files

### Image Requirements

- **Cover Art:** Recommended 1200x1200px, JPG/PNG
- **Tour Images:** Recommended 1920x1080px, JPG
- **Hero Video:** MP4 format, optimized for web

### Audio Files

- **Demo Audio:** MP3 format, place in `public/audio/`
- Recommended bitrate: 128-192 kbps

## Third-Party Integrations

### Mailchimp Newsletter

**File:** `components/sections/SocialHub.tsx`

1. Get your Mailchimp form action URL
2. Replace the form action in the newsletter form
3. Configure Mailchimp form settings

### Form Submission

**File:** `components/sections/Contact.tsx`

Options:
- **Formspree:** Easy form handling service
- **Resend:** Modern email API
- **Custom API:** Your own backend endpoint

## Advanced Customization

### Adding New Sections

1. Create a new component in `components/sections/`
2. Import and add to `app/page.tsx`
3. Follow existing section patterns

### Modifying Animations

**Framer Motion** is used throughout. Adjust:
- Duration
- Easing functions
- Delay timings
- Animation types

### Custom Fonts

1. Add fonts to `app/layout.tsx`
2. Update CSS variables in `app/globals.css`
3. Apply to components

### Navigation Menu

**File:** `components/Navigation.tsx`

- Update menu items
- Modify scroll behavior
- Customize mobile menu

## Tips

- Always test after making changes
- Use browser DevTools to inspect elements
- Keep backups before major changes
- Optimize images before uploading
- Test on multiple devices and browsers

## Support

For customization help, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Framer Motion Documentation: https://www.framer.com/motion/
