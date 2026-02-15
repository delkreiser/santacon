# Gamification — 2026 Design Spec

Status: **Ideation / Pre-development**
Last updated: Feb 2026

---

## Vision

Extend the Quests feature (well-received in 2025) into a full point-scoring system with a public leaderboard. Give participants reasons to engage *before* the event (promo activities) and *during* the event (quest completion), with friendly competition culminating in one person being crowned **Santa Supreme**.

---

## Principles

- **Low friction above all.** This is a party app. Signup must be instant — no email, no password.
- **Honor system.** Cheating is on the cheater. We add "good Santa" language but don't build anti-cheat systems.
- **No real-time pressure.** Leaderboard updates on manual refresh — no WebSocket complexity.
- **Public leaderboard.** Anyone can view it; no account required to see the standings.

---

## Identity / Accounts

### Decision: Username + icon, cached locally

- User picks a **display name** (e.g. "SantaClaws42") and one of **4 Santa-themed icons** (to be designed)
- Username + icon choice + UUID stored in `localStorage`
- A UUID is generated client-side and is the real identity key; username is the display label
- Usernames must be unique — checked against the DB on creation
- If the user clears localStorage or switches devices, they lose their account *(acceptable tradeoff for zero-friction signup)*

### Username Rules
- Max 20 characters
- Alphanumeric + underscores only (no spaces, no special characters)
- Basic profanity filter (blocklist)
- Cannot be changed after creation — keeps leaderboard stable

### Session Behavior
- **First visit:** Onboarding flow (see UX Flow below). Skippable — can view leaderboard without an account.
- **Returning visit (new session):** Toast/modal popup — *"Welcome back, SantaClaws42! 🔥 X-day streak!"*
  - If streak is active (opened app on consecutive days), streak count is shown
  - Streak display also lives permanently on the profile modal

---

## Quests Page Layout

The Quests page is a full redesign. All gamification lives here — no new nav tab needed.

### Page Structure (top to bottom)

```
┌─────────────────────────────────┐
│  🎅 BOULDER SANTACON QUESTS     │  ← page header
│  Earn points. Become Santa      │
│  Supreme.                       │
├─────────────────────────────────┤
│  [Icon] SantaClaws42  325 pts   │  ← identity bar (always visible)
│  Rank #7  [View Profile →]      │    taps open profile modal
├─────────────────────────────────┤
│  🏆 LEADERBOARD          [↻]   │  ← collapsed card (Option C)
│  🥇 HoHoHunter    1,200 pts    │    top 3 always visible
│  🥈 SantaClaws42    325 pts    │    current user row highlighted
│  🥉 JingleBeltBob   310 pts    │
│  [See full leaderboard ▼]       │  ← expands to top 50 inline
├─────────────────────────────────┤
│  PRE-EVENT QUESTS               │  ← active X days before event (TBD)
│  ┌──────────────────────────┐   │
│  │ 📸 Follow @bouldersantacon│   │
│  │ +50 pts · one-time  [✓]  │   │
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │ 🔗 Share the event        │   │
│  │ +75 pts · one-time [Share]│   │
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │ 📅 Daily check-in         │   │
│  │ +5 pts today · 🔥3 streak │   │  ← recurring daily, streak shown here
│  └──────────────────────────┘   │
├─────────────────────────────────┤
│  EVENT DAY QUESTS    🔒         │  ← locked until Nov 27
│  ┌──────────────────────────┐   │
│  │  [blurred quest card]     │   │  ← one teaser card, blurred
│  │  SantaCon Quests unlock   │   │
│  │  on November 27th! 🎅     │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

### Leaderboard: Option C (collapsible card near top)
- Collapsed by default: shows top 3 + current user's row
- "See full leaderboard ▼" expands inline to show top 50
- Manual refresh button `[↻]` — re-fetches from Supabase
- Shows last-updated timestamp
- Non-participants see the full leaderboard with a *"Create a username to join!"* prompt where the identity bar would be

### Locked Event Quests
- One blurred/greyed quest card visible as a teaser
- Text: *"SantaCon Quests unlock on November 27th! 🎅"*
- No count of how many quests are hidden — keeps it a surprise

---

## Profile Modal

Tapping **[View Profile →]** slides up a bottom-sheet modal:

```
┌─────────────────────────────────┐
│  [Icon]  SantaClaws42           │
│  325 pts · Rank #7              │
│  🔥 3-day streak                │  ← streak lives here
│  Member since Oct 14, 2026      │
├─────────────────────────────────┤
│  BADGES                         │
│  [🎅][🍺][🎶][  ][  ][  ]      │
│   earned ↑        locked ↑      │
│  (filled image)  (outline only) │
├─────────────────────────────────┤
│  POINT BREAKDOWN                │
│  Pre-event quests      125 pts  │
│  Venue check-ins       100 pts  │
│  Challenges            100 pts  │
│  Streak bonus           25 pts  │
│                    ─────────    │
│                        325 pts  │
└─────────────────────────────────┘
```

- Badges not yet earned show as outline/ghost only — no label, no spoilers
- Badges to be designed; badge art provided by organizer

---

## Point System

### Pre-Event Activities
Active X days before the event (exact unlock date TBD — stored as a config value).

| Activity | Points | Cadence | Verification |
|---|---|---|---|
| Follow @bouldersantacon on Instagram | 50 pts | One-time | Self-reported, honor system |
| Share the event | 75 pts | One-time | Taps Web Share API sheet (fallback: FB/IG links) |
| Daily app check-in | 5 pts (first time) / 1 pt (repeat) | Daily | Opens app — auto-awarded on load |

**Streak mechanic:**
- Opening the app on consecutive days builds a streak
- Streak count shown on: welcome-back modal, daily check-in card, profile modal
- Streak bonus: TBD (e.g. 7-day streak = +25 bonus pts)
- Streak resets if a day is missed

### Day-of Activities (unlock Nov 27)

#### Venue Check-ins
| Action | Points |
|---|---|
| Check in at each venue stop | 100 pts per stop (5 stops = 500 pts max) |

Honor system — user taps check-in button at each stop.

#### Challenge Quests
| Tier | Points |
|---|---|
| Easy / social | 25 pts |
| Medium | 50 pts |
| Hard / group | 100 pts |

Exact challenge list and tier assignments TBD (provided by organizer before build).

#### Bonus Multipliers
| Bonus | Points |
|---|---|
| Complete all 5 venue stops | +200 pts |
| Complete 5+ challenges | +150 pts |
| Both pre-event one-time quests done before event day | +100 early bird bonus |
| 7-day pre-event streak | +25 pts (TBD) |

### Point Ceiling (rough estimate)
| Source | Max Points |
|---|---|
| Pre-event one-time | 125 pts |
| Daily streak (30 days) | ~135 pts |
| 5 venue check-ins | 500 pts |
| ~8 challenges (mix) | ~400 pts |
| Bonuses | ~475 pts |
| **Total** | **~1,635 pts** |

---

## UX Flow

### New User — First Visit to Quests Page
1. Page shows: event explanation, point system overview, leaderboard teaser, and a prominent **"Create Your Santa Name"** button
2. User taps button → modal/sheet opens:
   - Enter username (validated: unique, alphanumeric, ≤20 chars)
   - Select one of 4 Santa icons
3. Client generates UUID → saves UUID + username + icon to `localStorage` → writes to `players` table in Supabase
4. Confirmation: *"You're in, SantaClaws42! Start earning points. 🎅"*
5. Page reloads into the full Quests layout with their identity bar visible

### Returning User — New Session
1. App loads → reads UUID + username from `localStorage`
2. Checks last-visit date in `localStorage`
3. If consecutive day: shows *"Welcome back, SantaClaws42! 🔥 3-day streak!"* modal — auto-awards daily check-in points
4. If same day: silently loads (no modal, no double points)
5. If streak broken: *"Welcome back, SantaClaws42!"* (no streak mention)

### Earning Points
1. User taps a point-earning action
2. Client checks `localStorage` — has this `activity_key` been completed (or completed today for daily)?
3. If eligible: POST to Supabase `point_events` (player_id + activity_key + points)
4. DB unique constraint on (player_id + activity_key) acts as backstop for one-time actions
5. UI shows "+50 pts 🎉" animation, running total updates
6. `localStorage` updated to record completion

### Leaderboard
1. On page load: fetches top 3 for collapsed card view
2. User taps "See full leaderboard ▼": fetches top 50 inline
3. User taps `[↻]`: re-fetches current data
4. Current user's row highlighted throughout

---

## Leaderboard States

| Phase | Behavior |
|---|---|
| **Pre-event** | Live, shows pre-event points only; most at 0 early on |
| **Day of event** | Full leaderboard, all point sources active |
| **Post-event** | Frozen / read-only. Winner crowned **Santa Supreme**. |

### Santa Supreme
- #1 player at leaderboard freeze time = **Santa Supreme**
- Quests page shows a permanent winner callout with their username, icon, and total points
- IRL: winner receives trophy / pro-wrestling-style belt from organizer
- Callout stays visible until next year's event replaces it
- Freeze timing: TBD (midnight after event? 24 hours later?)

---

## Database

### Stack: Supabase (Postgres + REST API)

**Why:**
- Free tier handles hundreds of users easily
- Postgres = structured, queryable, reliable
- Auto-generated REST API — no backend server, works with static Vite build
- Row-level security for data protection
- No server to maintain

### Schema (draft)

```sql
-- Players
CREATE TABLE players (
  id UUID PRIMARY KEY,             -- generated client-side, stored in localStorage
  username TEXT UNIQUE NOT NULL,
  icon_id INT NOT NULL DEFAULT 1,  -- 1-4, maps to the 4 Santa icons
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Point transactions (full audit log)
CREATE TABLE point_events (
  id SERIAL PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  activity_key TEXT NOT NULL,      -- e.g. 'follow_instagram', 'checkin_stop_2', 'challenge_7', 'daily_2026-11-01'
  points INT NOT NULL,
  awarded_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (player_id, activity_key) -- prevents duplicate one-time awards
);

-- Leaderboard view (computed on query)
CREATE VIEW leaderboard AS
  SELECT
    p.id,
    p.username,
    p.icon_id,
    SUM(pe.points) AS total_points,
    COUNT(*) AS actions_taken
  FROM players p
  JOIN point_events pe ON pe.player_id = p.id
  GROUP BY p.id, p.username, p.icon_id
  ORDER BY total_points DESC;
```

**Note on daily check-ins:** The `activity_key` for daily actions includes the date (e.g. `daily_2026-11-01`), so the UNIQUE constraint naturally prevents double-awarding on the same day while allowing repeat awards on different days.

---

## Tech Stack Addition

Current: Vite + React 19 + Tailwind v4, deployed as static site

Additions needed:
- `@supabase/supabase-js` npm package
- Supabase project (free tier) — create at supabase.com
- `.env` variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- No backend server required

---

## Open Questions

- [ ] Exact pre-event quest unlock date / how many days before event?
- [ ] Exact streak bonus point value (suggested: +25 for 7-day streak)
- [ ] Exact point values per challenge tier — to be set when challenge list is finalized
- [ ] Leaderboard freeze time post-event (midnight Nov 27? noon Nov 28?)
- [ ] Santa Supreme callout: username + icon + total points, or add a "highlight reel" of what they completed?
- [ ] Should existing badges feed into points? (e.g. "SantaCon Veteran" badge = +X pts)
- [ ] How many / which pre-event activities recur daily vs. are one-time only? (Currently: follow + share = one-time; daily check-in = recurring)
- [ ] Any hidden "surprise" bonus activities revealed on event day?
- [ ] 4 Santa icon designs — to be provided by organizer

---

## Out of Scope (for now)

- Email / password auth
- QR code venue verification
- Real-time WebSocket leaderboard
- Admin panel for manually awarding / revoking points
- Social features (following other Santas, messaging)
- Device switching / account recovery
