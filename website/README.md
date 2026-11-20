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
