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
`[ ]`

Current approach uses `body.dark-mode` class with `!important` overrides on Tailwind utility classes (lines 40-64). This is brittle and fights Tailwind's specificity.

- Switch to Tailwind's built-in `dark:` variant (`darkMode: 'class'` in Tailwind config)
- Remove all `!important` dark mode overrides from custom CSS
- Use `dark:bg-gray-900`, `dark:text-gray-100`, etc. directly in JSX
- Persist dark mode preference in localStorage (may already be happening via the body class toggle)

---

### 10. Add hash-based routing for bookmarkable URLs
`[ ]`

Currently all navigation is via `activeTab` state — there are no URLs. This means:
- Users can't bookmark or share a direct link to the Carols or Quests page
- Browser back button doesn't work between tabs
- Refreshing always returns to the Home tab

Implement simple hash routing (`#carols`, `#quests`, `#about`, etc.) or use a lightweight router.

---

## Low Priority

Nice-to-have improvements for polish and accessibility.

### 11. Accessibility improvements
`[ ]`

- Bottom nav: add `role="navigation"` and `aria-label="Main navigation"`
- Carol font size buttons: add `aria-label` (e.g., "Increase font size", "Decrease font size")
- Badge popup modals: add `role="dialog"`, `aria-modal="true"`, focus trapping, and Escape key to close
- Schedule stops: ensure accordion pattern uses `aria-expanded`
- Color contrast: verify gray-on-gray text for past stops meets WCAG AA (4.5:1 ratio)
- Add skip-to-content link for keyboard navigation

---

### 12. Optimize snowflake animation
`[ ]`

20 fixed-position elements with CSS animation run continuously on every page:
- Add `will-change: transform` to reduce paint costs
- Consider pausing animation when tab is not visible (`document.visibilitychange`)
- Alternative: replace with a single `<canvas>` element for better performance on mobile
- Reduce count on mobile devices (check `window.innerWidth`)

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
