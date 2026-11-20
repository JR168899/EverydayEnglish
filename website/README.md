# Everyday English — website v1 (working preview)

Domain: everydayenglish.app · GitHub repo (planned): EverydayEnglish
CI: `../logo-concepts/CI.md` — locked. Wordmark No. 1 only, no icon; 7 rainbow
level colours; warm cream default theme + male / female themes in Settings.

## Run it locally

```bash
cd ~/workspace/everyday-english/website
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

`file://` also works for most pages (all data is loaded from `data/data.js`,
no fetch calls), but the local server is the reliable way to check it.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Landing + onboarding: level choice → sign-in → daily goal + reminder |
| `home.html` | **Today's News English** — one global hottest story, no categories (Voyager 1, AP via Google News Top Stories, 19–20 Nov 2026; excerpt only + link to original) |
| `courses.html` | All 7 levels with progress rings (Foundation–B2 open, C1/C2 coming soon) |
| `level.html?level=a2` | Units + day list for a level, visited ✓ / not visited markers |
| `day.html?level=a1&day=1` | One daily page: main 10-card lesson + supplement tabs (phrasal verb, idiom, sentence pattern, flashcard, joke, weekly writing) |
| `settings.html` | Theme picker, account, daily goal/reminder, plan |

## Real data (from `../repo/content/`, read-only source — repo/ was not touched)

- `data/data.js` is generated from the repo: level metadata, unit lists
  (A2 30, B1 26, B2 20 units; Foundation 3 phases; A1 180 lessons grouped
  into 23 eight-day units), A1 Day 1's real 10 cards, A2 Day 1's full lesson,
  and the real A1 supplement samples (cheer up / break a leg / “I am good at …” /
  giraffe / snowman joke / “My family” writing).
- News lesson: real top story, verified against Google News Top Stories
  (20 Nov 2026). Excerpt is two sentences from the AP report; full text is
  never republished — the page links to the original.

## Placeholders (not built yet — clearly marked in the UI)

- **Auth / backend:** Google + Apple sign-in buttons on `index.html` are
  demo placeholders. No Firebase project, no credentials, no account is
  created. Progress is stored in `localStorage` (`ee-progress-v1`) in this
  browser only. Next step: Firebase Auth + Firestore, same shape as the
  local progress object (see the comment at the top of `app.js`).
- **Full course rendering:** A1 Day 1 and A2 Day 1 render fully. Every other
  day shows its real lesson title and a clear notice that its full 10 cards
  still need rendering from its repo unit file. Supplement tabs currently
  show the A1 sample set; per-level supplement sets are the next step.
- **News automation:** today's lesson is a static sample for 20 Nov 2026.
  The daily job (fetch Google News Top Stories each morning → AI lesson →
  publish) is not built yet.
- **Ads / charging:** free at launch. Accounts carry `paidEntitlement: false`
  from day one. No AdSense code is included. F-1 check required before any
  ad income (ask the school's international student office).

## Files

- `index.html`, `home.html`, `courses.html`, `level.html`, `day.html`, `settings.html`
- `styles.css`, `app.js`, `data/data.js`
- `assets/logo-wordmark-1.webp` (copy of the picked wordmark — logo only, no icon)
- Nothing is pushed to GitHub by this build.

---

# Website v2 (2026-11-20) — professional redesign

James's feedback on v1: opening a single `index.html` in the chat file viewer showed
plain text only — no icons, no colour blocks — and he asked for a properly professional
English-learning site. Note on that: the chat file viewer opens one file on its own, so
its relative `styles.css`, `data.js` and logo never load. **The site must be viewed served
over HTTP** (local server below, or Cloudflare Pages with output directory `website`) —
that is where the design lives. v2 also adds a tiny inline fallback style in every page
(cream background) so a bare file open is never plain white text, but the full design
still needs the served CSS.

## What changed visually

- **Design system (`styles.css`, rewritten):** Duolingo / premium-language-app style —
  big gradient hero banners, bold colour blocks, cards with strong shadows and large
  rounded corners, stat chips, section headers with icon tiles, clear hierarchy.
  Same CI: warm cream `#FFF6E0`, warm orange `#F68A1E`, deep brown `#7A2A1A`, Nunito.
  Male (navy/teal) and female (pink/lavender) themes still work in Settings.
- **No emoji as icons anywhere** (checked): all icons are inline SVGs (book, chat,
  news, star, check, play, calendar, flame, target, globe, pen, smile, layers, clock,
  trophy, sparkles, users). A shared icon set was added to `app.js` (`EE.icons` /
  `EE.icon(name)`) and is used by the JS-generated markup.
- **Level layout correction (James, 2026-11-20):** the 7 levels are no longer a 2-column
  grid with C2 alone and an empty cell. **Foundation is a full-width featured card**
  (red gradient colour block, larger, "Start here" badge) on top, then pairs in
  2-column rows: A1 | A2, B1 | B2, C1 | C2. Applied to both the onboarding level
  choices (`index.html`) and the level cards (`courses.html`). C1/C2 stay disabled /
  coming-soon, each level keeps its rainbow colour. A2 (yellow) uses dark text on its
  colour blocks for readability.
- **`index.html`:** gradient hero with the wordmark on a cream band, stat chips
  (7 levels · 2,190 days · 10 cards a day · new news every morning), 3 feature cards
  with SVG icon tiles, numbered onboarding steps, level choices as colour-topped cards.
- **`home.html`:** "Continue learning" is now a gradient hero; the news lesson opens
  with a navy/indigo news-hero banner (headline, source, date, level, reading time);
  vocabulary is a grid of coloured word cards; grammar is three highlighted blocks;
  paragraph structure and "how to read" are numbered step lists.
- **`courses.html`:** hero banner + 7 level cards, each a **full colour block** in its
  rainbow colour (white text, progress ring + progress bar, days/units/visited, big
  watermark book icon). Foundation spans full width (see above).
- **`level.html`:** level header is a full colour-block banner with ring, status pill
  and progress bar; each unit has a colour-accented header card with its own ring;
  visited days show an SVG check in a green circle.
- **`day.html`:** lesson title sits in a full level-colour header band; the 10 cards
  are numbered colour-topped flashcards; A2's expression/grammar/check are highlighted
  blocks; supplement tabs are coloured pills with SVG icons (phrasal verb, idiom,
  pattern, flashcard, joke, writing); "Mark this day visited" button has an SVG check.
- **`settings.html`:** hero banner; theme swatches are real colour-block previews
  (full-width gradient bar + colour dots for warm cream / navy & teal / pink &
  lavender); account, goal/reminder and plan sections have icon headers; Free plan
  shown as a green pill.

## What did NOT change

All content, data and functionality from v1 are kept: `data/data.js` untouched;
all file names and relative paths unchanged; onboarding steps, sign-in placeholders,
progress/visited in `localStorage`, news lesson (Voyager 1), supplements, settings
behaviour. Only `styles.css`, the six pages and `app.js` (icon set added, no API
changes) were edited. Nothing in `../repo/` was touched.

## Still placeholder (unchanged from v1)

- **Auth / backend:** Google + Apple sign-in are demo placeholders; no Firebase
  project or credentials; progress in `localStorage` (`ee-progress-v1`) only.
- **Full course rendering:** A1 Day 1 and A2 Day 1 render fully; other days show
  their real title + notice. Supplement tabs show the A1 sample set.
- **News automation:** the Voyager 1 lesson is a static 20 Nov 2026 sample.
- **Logo:** `assets/logo-wordmark-1.webp` is referenced and served locally, but was
  **not** pushed to GitHub (binary — `push_files` is UTF-8 only). Upload it separately
  or it will 404 on the live site. **Not pushed to GitHub by this build.**

## Preview locally

```bash
cd ~/workspace/everyday-english/website
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

Verified 2026-11-20: `node --check` passes on `app.js`, `data/data.js` and every
page's inline script; local server returned **200** for `index.html`, `home.html`,
`courses.html`, `level.html?level=a2`, `day.html?level=a1&day=1`,
`day.html?level=a2&day=1`, `settings.html`, `styles.css`, `app.js`, `data/data.js`
and `assets/logo-wordmark-1.webp`; no emoji found in any page/CSS/JS.

---

# Website v3 (2026-11-20) — architecture + full-width layout

James's feedback on v2: (1) the architecture must be News first, then Main Course,
then the six Supplements, with room to add more supplement types later; (2) the
site will later become an APP, so the web build must be structured app-ready;
(3) v2 pages squeezed everything into a narrow centre column — the web version
must fill the whole page and be rich, and mobile must adapt to a phone aspect ratio.

## Information architecture (locked order, same on every page)

```
index.html  (landing + onboarding: level → sign-in → daily goal)
  └─► home.html            1 · Today's News        — entry point after login
  └─► courses.html         2 · Main Course         — 7 levels, Foundation–C2
        └─► level.html?level=<level>   — units + day list
              └─► day.html?level=<level>&day=<n>  — 10 cards + supplement tabs
  └─► supplements.html     3 · Supplements         — hub of the 6 types
        └─► supplement.html?type=<id>&level=<level> — one type, one level
  └─► review.html          4 · Review              — visited days, quiz + error book (next build)
  └─► settings.html        5 · Me / Settings       — theme, account, goal, plan
```

## Navigation — web top bar ↔ app bottom tabs (same 5 destinations)

| # | Tab | Web (desktop) | App / mobile |
| --- | --- | --- | --- |
| 1 | News | Top bar, logo left, nav centre/right | Bottom tab bar |
| 2 | Courses | Top bar | Bottom tab bar |
| 3 | Supplements | Top bar | Bottom tab bar |
| 4 | Review | Top bar | Bottom tab bar |
| 5 | Me | Top bar, right | Bottom tab bar |

One shared header (`header.site` + `nav.main`) and one shared bottom tab bar
(`nav.tabbar`, SVG icon + label) are on every page. The active tab is highlighted
by `app.js` (`EE.navTab()`, matched from the file name — level/day count as
Courses, supplement detail counts as Supplements), so a page never needs a
hard-coded active class. When this becomes a native app, the tab bar is the app's
tab bar and the five routes above are its five screens — same order, same names,
same URLs as deep links.

## Supplements are extensible — one array entry per type

`data/supplements.js` holds `window.EE_SUPPLEMENTS.types`. Each entry: `id`,
`name`, `zh` (Chinese name), `color`, `icon` (an `EE.icons` key), `description`,
`perLevel` / `perLevelLabel`, `total`, `cadence` (`daily` / `weekly`), `sampleKey`
(key into `EE_DATA.supplementsA1`). The hub (`supplements.html`) and the detail
page (`supplement.html?type=<id>&level=<level>`) both render from that array —
no per-type page code exists.

**To add a 7th supplement type:** add ONE entry to that array. That is all. It
appears automatically on the hub, on every detail page's level chips and sidebar,
and on the home / level / day sidebars. Current registry (verified in Node):
6 types, totals add up to 10,813 (5 × 2,100 daily + 313 writing).

The A1 sample items (cheer up / break a leg / “I am good at …” / giraffe /
snowman joke / “My family”) are shown on `supplement.html` for level A1; other
levels show a clear "full set not in this preview yet" notice with a link to the
A1 sample. Day-page supplement tabs are unchanged and still work.

## Full-width layout + responsive breakpoints

- `.wrap` is now **max-width 1360px** (was 1020px), side padding 32px; `.narrow`
  is 880px. Heroes and news banners use `.fullbleed` — edge-to-edge gradient
  bands, padding that tracks the 1360px content column.
- Grids stretch across the page: 3–4 columns on desktop (supplements hub is 3,
  IA strip is 4, stat rows are 4), 2 on tablet, 1 on phone.
- Home: full-bleed Continue hero → 3-card today row (Today's lesson / Your
  progress / Today's supplements) → full-bleed news banner → main article +
  right sidebar (supplements, up next, Main Course). Level and day pages use
  `.layout` (content + 340px sticky sidebar on desktop, single column on mobile).
- Index: full-bleed hero, full-width feature row, full-width level grid
  (Foundation full-width featured card, then A1|A2, B1|B2, C1|C2 pairs — unchanged),
  plus an IA strip (News / Main Course / Supplements / Review). Courses: full-bleed
  hero, full-width level grid, Supplements preview + "How a day works". Settings:
  full-bleed hero, cards in a 2-column grid on desktop.
- **Breakpoints:** `1024px` — top-bar nav links hide, the fixed bottom tab bar
  appears, `.layout` collapses to one column, grids go to 2 columns;
  `640px` — everything single column, larger tap targets, tab bar labels shrink.
  No fixed narrow widths remain; `overflow-x: hidden` on the page.

## What did NOT change

v2's visual design (warm cream `#FFF6E0`, warm orange `#F68A1E`, deep brown
`#7A2A1A`, Nunito, rainbow level colours, inline SVG icons, no emoji), all
lesson/news content, `data/data.js` lesson data (untouched), progress/visited
in `localStorage`, onboarding and settings behaviour. `app.js` gained icons
(`user`, `refresh`, `grid`), `EE.supplementTypes()` / `EE.supplementById()` and
`EE.navTab()` — no existing API changed. Nothing in `../repo/` was touched.

## Still placeholder (unchanged from v1/v2)

- **Auth / backend:** Google + Apple sign-in are demo placeholders; no Firebase
  project or credentials; progress in `localStorage` (`ee-progress-v1`) only.
- **Full course rendering:** A1 Day 1 and A2 Day 1 render fully; other days show
  their real title + notice. Supplement sets beyond the A1 samples are not built yet.
- **Review:** built from real visited days only. The quick quiz and the error book
  are clearly marked "coming in the next build" — no quiz questions or errors are
  invented. **Not pushed to GitHub by this build.**
- **News automation:** the Voyager 1 lesson is a static 20 Nov 2026 sample.
- **Logo:** `assets/logo-wordmark-1.webp` is referenced and served locally, but was
  **not** pushed to GitHub (binary — `push_files` is UTF-8 only). Upload it separately
  or it will 404 on the live site.

## Preview locally

```bash
cd ~/workspace/everyday-english/website
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

Verified 2026-11-20: `node --check` passes on `app.js`, `data/data.js`,
`data/supplements.js` and every page's inline script (one apostrophe bug in
day.html's sidebar code was found by the check and fixed); local server returned
**200** for `index.html`, `home.html`, `courses.html`, `supplements.html`,
`supplement.html`, `supplement.html?type=phrasal-verbs&level=a1`, `review.html`,
`level.html`, `level.html?level=a2`, `day.html`, `day.html?level=a1&day=1`,
`day.html?level=a2&day=1`, `settings.html`, `styles.css`, `app.js`,
`data/data.js`, `data/supplements.js` and `assets/logo-wordmark-1.webp`; no emoji
in any page/CSS/JS; registry totals verified in Node (6 types, 10,813 items).
