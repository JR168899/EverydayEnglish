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
