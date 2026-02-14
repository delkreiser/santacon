# Boulder SantaCon App — Improvement Plan (November 2026)

Status legend: `[ ]` = Todo | `[x]` = Done

---

## High Priority

These are critical for maintainability, correctness, and preparing the app for the 2026 event.

### 1. Extract event configuration into a single config file
`[x]` — Done. Created `config/event.js` with all event-specific data. Updated `index.html` to reference config throughout.

All year-specific data is currently scattered across 2,300+ lines of inline JSX. Create a central `config/event.js` (or `event-config.js`) containing:

- Event name, edition number (20th Annual), year, date
- Schedule stops (venues, times, drink specials, map embeds/links, notes, music)
- Venue quests (emoji, description, distance, unlock times)
- Challenges list
- Badge definitions and unlock criteria
- Social media links (Instagram, Facebook)
- After-party details (venue, time, price, DJs, ticket URL)
- Carol lyrics data (nice and naughty lists)
- Countdown target date
- OG/meta description text

**Goal:** For 2026, only edit this one file to update the entire app.

---

### 2. Fix hardcoded dates and stale metadata
`[x]` — Done. All date logic now derives from `EVENT_CONFIG.date`. Meta tags updated to 2026. Helper functions `isEventDay()` and `isAfterEventDay()` replace all hardcoded date checks.

Current bugs and inconsistencies to resolve:

- OG meta description says "November 29th, 2024" while the title says "2025" (line 16)
- Twitter meta description has the same stale "2024" date (line 23)
- Hardcoded date checks scattered throughout (`year === 2025 && month === 10 && day < 28`) — at least 5 occurrences
- Countdown timer targets a hardcoded date
- `.ics` calendar download has hardcoded date values
- All date logic should derive from the config's event date (see item #1)

---

### 3. Split the monolith into separate files
`[x]` — Done. Split 2,328-line monolith into 16 focused files under `src/`.

Final project structure:

```
santacon/
├── index.html                  # Minimal HTML shell (Vite entry)
├── index-legacy.html           # Archived original monolith
├── package.json                # Vite project config
├── vite.config.js              # Vite + React + Tailwind v4 plugins
├── src/
│   ├── main.jsx                # Entry point (createRoot API)
│   ├── App.jsx                 # Root component, state management
│   ├── styles.css              # All custom styles (Tailwind v4 @import)
│   ├── config/
│   │   └── event.js            # All event-specific data (ES module)
│   ├── data/
│   │   └── carols.js           # Carol lyrics (nice & naughty)
│   ├── components/
│   │   ├── Snowflakes.jsx
│   │   ├── Navigation.jsx
│   │   ├── HomePage.jsx
│   │   ├── CarolsPage.jsx
│   │   ├── QuestsPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── MailingListPage.jsx
│   │   ├── AfterPartyPage.jsx
│   │   ├── MajorAwardPage.jsx
│   │   ├── ScheduleStop.jsx
│   │   └── BadgePopup.jsx
│   └── utils/
│       └── dateUtils.js        # Date formatting, countdown, current stop logic
├── public/
│   └── img/                    # Static image assets
└── config/
    └── event.js                # Legacy config (used by index-legacy.html)
```

---

### 4. Add a build system (Vite + React)
`[x]` — Done. Replaced CDN React + Babel Standalone with Vite build system. Production bundle: 253KB JS + 28KB CSS (down from ~800KB+ Babel alone).

- Vite v7 with `@vitejs/plugin-react` and `@tailwindcss/vite` (Tailwind v4)
- ES module imports between all split files
- Production builds are minified and tree-shaken
- HMR during development (`npm run dev`)
- Dev server starts in ~170ms
- Added `package.json`, updated `.gitignore` for `node_modules/` and `dist/`

---

### 5. Modernize React patterns
`[x]` — Done.

- ~~Replace deprecated `ReactDOM.render()` with `createRoot()` API~~ ✅ Done in `src/main.jsx`
- ~~Consolidate quest state into `useReducer`~~ ✅ Moved badges, venueQuests, challenges, and badge popup state into a single `questReducer` with typed actions (`SET_BADGES`, `SET_VENUE_QUESTS`, `SET_CHALLENGES`, `QUEUE_BADGE_POPUPS`, `SHOW_BADGE_POPUP`, `CLOSE_BADGE_POPUP`). Reduced 7 `useState` calls to 1 `useReducer`.
- ~~Remove unused countdown timer causing unnecessary re-renders~~ ✅ The `countdown` state was computed every 60 seconds but never rendered. Removed the state and `setInterval` entirely, eliminating a full-app re-render every minute.

---

## Medium Priority

Important improvements for UX, performance, and code quality.

### 6. Fix the Mailchimp integration
`[x]` — Done. Replaced `no-cors` fetch with Mailchimp's JSONP `post-json` endpoint.

- Switched from `fetch()` with `mode: 'no-cors'` (couldn't read response) to JSONP callback pattern
- Now reads actual Mailchimp response: shows success, "already subscribed", or specific error messages
- No backend/serverless function needed — JSONP avoids CORS entirely
- Honeypot bot protection field still included

---

### 7. Optimize image loading
`[x]` — Done. Created `OptimizedImage` component with WebP, lazy loading, and CLS prevention.

- Created `src/components/OptimizedImage.jsx` — reusable component handling all image optimizations
- Converted 11 of 14 JPEGs to WebP (3 skipped where WebP was larger). Total savings: ~500KB across all images
- Uses `<picture>` element with WebP source + JPEG fallback for broad browser support
- All non-hero images have `loading="lazy"` (hero images on Home and After-Party use `lazy={false}`)
- All images include `width`/`height` attributes to prevent cumulative layout shift (CLS)
- JPEG originals preserved for browsers without WebP support

---

### 8. Lazy-load Google Maps iframes
`[x]` — Already done. The `ScheduleStop` component conditionally renders iframes only when `expandedStop === index`, so maps are never loaded until a user expands. The iframe also has `loading="lazy"` as an extra safeguard.

---

### 9. Improve dark mode implementation
`[x]` — Done. Replaced `body.dark-mode` + `!important` CSS overrides with Tailwind v4 `dark:` variants.

- Added `@custom-variant dark (&:where(.dark, .dark *));` to `styles.css` for class-based dark mode
- Removed all 8 `body.dark-mode .text-gray-*` / `.bg-white` / `.border-gray-*` `!important` overrides
- Dark mode now toggled via `.dark` class on `<html>` (was `.dark-mode` on `<body>`)
- Added `dark:` variant classes to all 10 component files (Navigation, HomePage, CarolsPage, QuestsPage, ScheduleStop, AboutPage, MailingListPage, BadgePopup, AfterPartyPage, MajorAwardPage)
- Custom classes (`glass-effect`, `gradient-bg`) use `.dark` parent selector in CSS
- Dark mode preference persisted in `localStorage` (`santacon_dark_mode`) and restored on load
- CSS grew ~3KB (28→31KB) from added dark variant selectors — no JS size change

---

### 10. Add hash-based routing for bookmarkable URLs
`[—]` — Skipped. The app is designed to feel like a native mobile app during the live event, not a traditional website. Tab-based navigation without URL routing reinforces that experience.

---

## Low Priority

Nice-to-have improvements for polish and accessibility.

### 11. Accessibility improvements
`[x]` — Done. All 6 items implemented across 7 files.

- ~~Bottom nav: add `aria-label="Main navigation"`~~ ✅ Added to `<nav>` in Navigation.jsx
- ~~Carol font size buttons: add `aria-label`~~ ✅ "Decrease font size" / "Increase font size" in CarolsPage.jsx; also added `aria-label` to dark mode toggle in App.jsx
- ~~Badge popup modals: add `role="dialog"`, `aria-modal="true"`, focus trapping, and Escape key~~ ✅ Created `useDialogA11y` hook in BadgePopup.jsx — auto-focuses first button, traps Tab cycle, closes on Escape. Applied to both BadgePopup and MajorAwardModal.
- ~~Schedule stops: accordion uses `aria-expanded`~~ ✅ Added to ScheduleStop.jsx, all 3 AboutPage.jsx sections (data-driven + rules + bring), and QuestsPage.jsx badge legend
- ~~Color contrast for past stops meets WCAG AA~~ ✅ Changed `text-gray-500` → `text-gray-600 dark:text-gray-400` (was 4.39:1 on bg-gray-100, now 6.87:1 light / 5.78:1 dark)
- ~~Skip-to-content link for keyboard navigation~~ ✅ Added `sr-only` link at top of App.jsx, visible on focus. Changed main content wrapper from `<div>` to `<main id="main-content">`.

---

### 12. Optimize snowflake animation
`[x]` — Done. Replaced 20 fixed-position DOM elements with a single `<canvas>` element.

- ~~Add `will-change: transform` to reduce paint costs~~ ✅ Applied on the canvas element
- ~~Consider pausing animation when tab is not visible (`document.visibilitychange`)~~ ✅ Page Visibility API pauses the rAF loop when the tab is hidden
- ~~Replace with a single `<canvas>` element for better performance on mobile~~ ✅ Replaced all 20 DOM snowflakes with a single canvas using `requestAnimationFrame`
- ~~Reduce count on mobile devices (`window.innerWidth`)~~ ✅ 10 flakes on screens < 640px, 20 on desktop; recalculated on resize
- Removed `.snowflake` CSS class and `@keyframes snowfall` (no longer needed)
- CSS dropped slightly (30.85 KB vs 31 KB) from removing unused snowflake rules

---

### 13. Move About page content to a content file
`[x]` — Done. Extracted all About page prose into `src/data/about.js` data file.

- Created `src/data/about.js` with structured section objects (id, title, titleColor, subtitle, content blocks)
- Each content block is typed: `text`, `image`, or `link` — rendered by a generic `ContentBlock` component
- Supports `{edition}` interpolation for dynamic text (e.g., "our 20th annual event")
- Santa's Rules section now renders from `EVENT_CONFIG.rules` (already extracted in event.js)
- What to Bring section already used `EVENT_CONFIG.whatToBring`
- `AboutPage.jsx` reduced from 209 lines of hardcoded JSX to 167 lines of data-driven rendering
- To update copy for 2027: edit `src/data/about.js` and `src/config/event.js` — no component changes needed

---

### 14. Add PWA support
`[ ]`

The app is used during a live event where connectivity may be spotty:
- Add a `manifest.json` for "Add to Home Screen"
- Add a service worker for offline caching of the app shell and images
- Cache carol lyrics, schedule, and quest data for offline use
- This would make the app work reliably in crowded venues with poor cell signal

---

### 15. Add basic analytics
`[ ]`

No tracking exists currently. Consider lightweight, privacy-respecting analytics:
- Simple page view tracking (which tabs are most visited)
- Quest/badge completion rates (interesting for event planning)
- Options: Plausible, Umami, or a simple custom event counter
- Avoid heavy solutions like Google Analytics

---
