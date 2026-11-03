# ShudsonMartin

Brand website for ShudsonMartin — Interior Design, Fashion & Lifestyle. Est. 2016.

React · TypeScript · Vite · React Router · GSAP (ScrollTrigger) · Framer Motion · hand-written CSS.

## Run

```bash
npm install
npm run dev        # local development
npm run build      # production build → dist/
npm run preview    # serve the production build
```

Deploying as a single-page app: configure the host to serve `index.html` for all routes
(e.g. Netlify `_redirects`: `/* /index.html 200`; Vercel does this automatically for Vite).

## Routes

`/` · `/interior` · `/fashion` · `/lifestyle` · `/about` · `/contact` · anything else → 404 page.

## Things to update

| What | Where |
| --- | --- |
| Email address | `src/data/brand.ts` → `email.address` |
| **Social media links** (@shudsonmartinstudio) | `src/data/brand.ts` → `socials` |
| Phones, address (8 Walpole Street, Freetown) + map, founder, years | `src/data/brand.ts` |
| **All photography** (temporary Unsplash images) | `src/data/images.ts` |

To replace a photo, change its `src` in `src/data/images.ts` — either another Unsplash photo id,
or a path such as `/images/interior/living-01.jpg` (put the file in `public/images/...`).
`focus` controls the crop (CSS `object-position`). Images that fail to load fall back automatically.

## Structure

```
src/
  data/        brand.ts (contact details), images.ts (every photograph)
  components/  Header, MobileMenu, Footer, Loader, PageTransition, Media, SmartImage,
               RevealText, Gallery, Lightbox, ContactSection, NextWorld, Button…
  hooks/       useScrollAnimations (data-reveal / data-parallax), useHeroIntro, usePageMeta
  pages/       Home, Interior, Fashion, Lifestyle, About, Contact, NotFound
  styles/      tokens.css (colours, type, spacing, motion), base, typography, layout,
               components, and one stylesheet per page
```

Animations honour the visitor's *reduced motion* setting.

## Original work (`public/work/`)

Hudson Martin's own photographs live in `public/work/` and are registered in `src/data/images.ts` → `portfolio`.
They are used across Home, Interior, Fashion and About. Location data (EXIF/GPS) has been stripped from every file.

Several fashion portraits were re-staged on a studio backdrop in the brand palette (plum or stone):
`founder-eyelet`, `print-porch`, `gilded-evening-founder`, `fuchsia-flame`, `saffron-raised`, `blush-street`.
`blush-bouquet` keeps its real setting, softened out of focus. `still-life` and `cube-shelf` were straightened,
and `jewel-stripe` was cropped from a screenshot with the app overlays removed.

Stock Unsplash placeholders remain for subjects without original photography yet (page heroes, residential,
commercial, bedrooms, kitchens, architectural details and the Lifestyle world).

## Brand assets

`brand-assets/` holds the logo files for social profiles (handle: **@shudsonmartinstudio**; on X: **@shudsonmartins**; on TikTok: **@shudsonmartinstud**):

| File | Use |
|---|---|
| `shudsonmartin-profile-1080.png` | Profile picture on Instagram, Facebook, X, TikTok, Pinterest, LinkedIn (circle-crop safe) |
| `shudsonmartin-linkedin-banner.png` | LinkedIn cover image (1584 × 396) |
| `shudsonmartin-facebook-cover.png` | Facebook Page cover photo (1640 × 624) |
| `shudsonmartin-x-header.png` | X header image (1500 × 500) |
| `shudsonmartin-wordmark-light.png` | Wordmark, transparent — for dark backgrounds |
| `shudsonmartin-wordmark-dark.png` | Wordmark, transparent — for light backgrounds |

To change them, edit `brand-assets/logo-source.html` and re-render it (open in Chrome and screenshot each block).
