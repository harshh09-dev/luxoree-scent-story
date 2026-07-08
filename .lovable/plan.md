# Luxoree v1 — Cinematic Storefront (Visual Foundation)

Scope confirmed with you: **homepage + shop + product page**, mock data (no auth/cart/checkout/admin yet), full 15-perfume fictional catalog with AI-generated bottle renders, Framer Motion + GSAP/ScrollTrigger.

The reference images set the tone: matte black, warm gold (#C9A24C-ish), ivory Cormorant headings, editorial spacing, luxury bottle photography. I will capture that feel without copying compositions pixel-for-pixel.

---

## Design system

- **Theme**: dark-first only (v1). Matte black background, warm gold accents, ivory text, subtle grain overlay.
- **Palette** (tokens in `src/styles.css` via oklch):
  - background `#0A0A0A`, surface `#141414`, elevated `#1C1B18`
  - foreground / ivory `#F4EFE6`
  - gold `#C9A24C`, gold-soft `#E8CC85`
  - muted text `#8A857C`, hairline border `rgba(201,162,76,0.15)`
- **Typography**: Cormorant Garamond (display) + Inter (body), loaded via `@fontsource-variable/cormorant-garamond` and `@fontsource-variable/inter` (imported in `styles.css`, per Tailwind v4 rules — no CDN link).
- **Motion register**: slow easing (custom cubic-bezier `.22,.61,.36,1`), 600–1200ms reveals, no bounce.

## Tech additions

- `bun add gsap` (ScrollTrigger + SplitText-lite via manual splitting)
- `motion` (framer-motion successor, already ergonomic on React 19)
- `@fontsource-variable/cormorant-garamond`, `@fontsource-variable/inter`
- `lucide-react` (should already be present via shadcn)
- Keep TanStack Query + Router as-is; no Cloud/Supabase in v1.

## Routes

```
src/routes/
  __root.tsx        (updated: fonts, real meta, Nav + Footer + announcement bar shell)
  index.tsx         (cinematic homepage)
  shop.tsx          (grid + filters)
  shop.$slug.tsx    (product detail)
  about.tsx         (short editorial brand story)
  quiz.tsx          (placeholder route — "Coming soon", visible section on home)
```

Each route ships its own `head()` with unique title/description/OG.

## Mock catalog

`src/data/perfumes.ts` — 15 perfumes (5 men / 5 women / 5 unisex) with full schema: name, slug, gender, tagline, description, family, top/heart/base notes, longevity ("6–8 Hours" or "8–10 Hours"), projection, season, occasion, ingredients, directions, price (₹349), mrp (₹499), 20ml (₹99), rating, review count, featured, best-seller, hero image. Names like Midnight Oud, Ocean Breeze, Royal Cedar, Velvet Noir, Bloom Essence, etc.

**Images**: I'll generate 15 luxury bottle renders with the image tool (dark studio, warm rim light, "LUXOREE" label suggestion, matte black + gold cap), plus 3 collection covers (Men/Women/Unisex) and 1 hero bottle. Saved as `.jpg` in `src/assets/perfumes/`. This is ~19 image generations — the heaviest cost in v1.

## Homepage sections (cinematic scroll)

1. **Announcement bar** — auto-rotating messages (₹99 20ml offer, ₹349 50ml, free delivery within 3km), horizontal fade-swap every 4s.
2. **Sticky glass nav** — logo, Home / Shop / Quiz / About / Reviews / Contact, icons for search, wishlist, cart (all visual only in v1).
3. **Hero** — full-viewport. Hero bottle centered with slow float + subtle rotation (Framer Motion), radial gold glow, drifting particle layer (CSS/canvas dust), split-letter reveal on "Crafted by Hand. Made to Leave a Mark." (GSAP stagger), two CTAs, cursor-follow soft radial light (throttled).
4. **Trust badge strip** — 6 icons with hairline dividers.
5. **Shop by Collection** — 3 large editorial cards (Men / Women / Unisex), image zoom on hover, gold underline sweep.
6. **Today's Special Offer** — dark card with 20ml ₹99 and 50ml ₹349 side-by-side, MRP strikethrough, "Order on WhatsApp" button (opens `wa.me/…` deep link with prefilled message — placeholder phone number, easy to swap).
7. **Best Sellers** — horizontal snap scroller of 5 cards (bottle, name, gender, rating, price, wishlist icon), GSAP ScrollTrigger reveal with staggered lift+fade.
8. **Cinematic showcase** — pinned section (GSAP pin + scrub): a signature perfume "Midnight Oud" fills the viewport, ingredient words fade in around it as user scrolls, then unpins.
9. **Why Luxoree** — 6-tile grid with slow icon reveal.
10. **Fragrance Finder Quiz teaser** — full-width band with soft gold smoke, "Find Your Signature Scent" heading, CTA to `/quiz` (route renders a "Coming soon" placeholder in v1).
11. **New Arrivals** — 4-card grid.
12. **Reviews** — average rating hero (4.8 / 1,250+), 3 review cards, "View all".
13. **Instagram gallery** — 6 masonry tiles (generated lifestyle imagery — reused bottle renders + a couple of styled shots).
14. **Newsletter** — email input, glass card.
15. **CTA banner** — "Ready to find your signature fragrance?" → Shop.
16. **Footer** — brand blurb, quick links, policies (routes exist as stubs later), contact, socials.

All section transitions: fade-in-up on enter, no abrupt cuts. Cursor light + grain overlay live at the layout level.

## Shop page

- Header with breadcrumb + "Our Collection" title
- Tab filter: All / Men / Women / Unisex (client-side)
- Sort: Popularity / Price ↑ / Price ↓ / Rating
- Search input (client-side filter over name + notes)
- Responsive grid (2 col mobile, 3 tablet, 4 desktop)
- Card: bottle, name, gender, rating, price + MRP strikethrough, wishlist heart (visual only), "Add to Cart" (visual only)
- Empty state when filter returns 0

## Product page (`/shop/$slug`)

- Two-column desktop, stacked mobile
- Left: large image + 4 thumbnails (reused hero at different crops in v1), click-to-zoom modal
- Right: name, gender, rating, price/MRP, size selector (20ml ₹99 / 50ml ₹349), quantity, "Order on WhatsApp" primary button, "Add to Wishlist"
- Trust row: COD, 7-day returns, secure packaging, WhatsApp support
- Tabs: Description / Fragrance Notes (top/heart/base with icon pills) / Details (longevity, projection, season, occasion, ingredients) / Reviews (mock)
- "You May Also Like" — 4 related from same gender

## Accessibility & perf

- Semantic landmarks, one `<main>` per route, alt on every image, `aria-label` on icon buttons, focus-visible rings in gold.
- Motion respects `prefers-reduced-motion` — GSAP timelines and Framer variants skip to end state.
- Images lazy-loaded except hero (preloaded via route `head().links`).
- Cursor light and grain use single fixed layers; particles use CSS transforms only.

## Explicitly out of scope for v1 (deferred)

Auth, Supabase/Cloud, real cart persistence, checkout, real WhatsApp order save, reviews CRUD, wishlist persistence, admin dashboard, quiz logic + results, fragrance finder recommendations, Razorpay, blog, address book, order tracking. Buttons for these render but are visual-only or link to a "Coming soon" placeholder. Architecture keeps them easy to wire up next.

## Build order

1. Fonts + tokens + `__root.tsx` shell (nav, footer, announcement bar, grain + cursor light).
2. Mock catalog data file.
3. Generate all 19 images.
4. Homepage sections top-to-bottom.
5. Shop page.
6. Product page.
7. About + quiz placeholder routes.
8. Reduced-motion pass, mobile pass, final polish.
