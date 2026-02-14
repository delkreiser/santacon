# Codebase Audit — February 2026

Post-improvements audit of the Boulder SantaCon web app.

---

## CRITICAL

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | Mojibake `AÃ±o` in Feliz Navidad lyrics | `src/data/carols.js:95` | `[x]` Fixed |
| 2 | Stale duplicate `config/event.js` at repo root (no export, wrong Mailchimp URL) | `config/event.js` | `[x]` Fixed — deleted `config/` directory |
| 3 | Invalid Font Awesome icon `fa-angel` (doesn't exist in FA 6.4) | `src/components/CarolsPage.jsx:25` | `[ ]` |
| 4 | Eventbrite ticket URL says "2025" | `src/config/event.js:131` | `[—]` Skipped — last year's event, new one not booked yet |

## WARNING

| # | Issue | File | Status |
|---|-------|------|--------|
| 5 | `bg-opacity-50/70` broken in Tailwind v4 — modal backdrops solid black | `src/components/BadgePopup.jsx` | `[x]` Fixed — `bg-black/50` and `bg-black/70` |
| 6 | Same `bg-opacity-30` issue on Major Award card button | `src/components/QuestsPage.jsx:65` | `[x]` Fixed — `bg-white/30 hover:bg-white/50` |
| 7 | Service worker doesn't precache Vite JS/CSS bundles — offline = blank page | `public/sw.js` | `[ ]` |
| 8 | YouTube embed `origin` param says `boulder-santacon.com`, site is `santarchy.app` | `src/config/event.js:32` | `[ ]` |
| 9 | Badge description says "4 stops" but there are 5 | `src/config/event.js:236` | `[ ]` |
| 10 | Super Santa description says "3+ side quests" but requires 1 venue + 5 challenges | `src/config/event.js:244` | `[ ]` |
| 11 | Calendar .ics has no timezone (TZID) — floating time | `src/components/HomePage.jsx` | `[ ]` |
| 12 | Unused `EVENT_CONFIG` import | `src/components/MailingListPage.jsx:2` | `[ ]` |
| 13 | Missing WebP for `group.jpg` (194KB) and `costumes.jpg` (84KB) | `public/img/` | `[ ]` |
| 14 | Duplicate `img/` directory at repo root (stale copy) | `img/` | `[ ]` |

## INFO

| # | Issue | File | Status |
|---|-------|------|--------|
| 15 | Dark mode missing on "Drink Specials:" and "Music:" labels | `src/components/ScheduleStop.jsx` | `[ ]` |
| 16 | Orphaned images: `cacophony.jpg/webp`, `caroling.jpg/webp` | `public/img/` | `[ ]` |
| 17 | Dead code: `mohawk.jpg` in IMAGE_DIMS, `calculateCountdown`, `mapLink` field | various | `[ ]` |
| 18 | Unnecessary `import React` in 9 files (React 19 JSX transform) | various | `[ ]` |
| 19 | Major Award card is `div` with `onClick` — not keyboard accessible | `src/components/QuestsPage.jsx:53` | `[ ]` |
| 20 | Venue quest checkboxes not wrapped in `<label>` | `src/components/QuestsPage.jsx:132` | `[ ]` |
| 21 | Google Maps iframes missing `title` for screen readers | `src/components/ScheduleStop.jsx` | `[ ]` |
| 22 | Hardcoded `"5:00pm"` instead of using config | `src/components/QuestsPage.jsx:190` | `[ ]` |
| 23 | `frameBorder="0"` deprecated — use `style={{ border: 0 }}` | `src/components/HomePage.jsx` | `[ ]` |
| 24 | `.DS_Store` committed in `public/` | `public/.DS_Store` | `[ ]` |
| 25 | No `<meta name="description">` in index.html | `index.html` | `[ ]` |
| 26 | No React error boundary — runtime error = white screen | `src/main.jsx` | `[ ]` |
| 27 | Snowflakes z-9999 renders on top of modals | `src/components/Snowflakes.jsx` | `[ ]` |
| 28 | Side quest promo card inline gradient doesn't adapt to dark mode | `src/components/HomePage.jsx` | `[ ]` |
