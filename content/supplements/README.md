# Everyday English — Supplements

Supplementary learning, separate from the daily 10-card main course.
The main course teaches new items day by day; the supplements are extra
learning a student can browse by type and level.

## Structure

```
content/supplements/
  README.md
  phrasal-verbs/
  idioms/
  sentence-patterns/
  flashcards/
  jokes/
  writing/
    foundation/ a1/ a2/ b1/ b2/ c1/ c2/
```

- 6 types × 7 levels (foundation, a1, a2, b1, b2, c1, c2).
- The 7 levels match the main course levels. The levels were confirmed
  2026-11-14: "Foundation to B2" is not a stop at B2; supplements cover
  all 7 levels, same as the main course.

## Naming

- The five 300-item types: `item-001.json`, `item-002.json`, …
- Writing: `composition-001.json`, `composition-002.json`, …
- One file per item. Files are numbered in order within each type/level.

## Locked totals (confirmed 2026-11-14)

| Type | Per level | 7 levels |
| ---- | --------: | -------: |
| Phrasal verbs | 300 | 2,100 |
| Idioms | 300 | 2,100 |
| Universal sentence patterns | 300 | 2,100 |
| Vocabulary flashcards | 300 | 2,100 |
| Jokes | 300 | 2,100 |
| **First five, total** | **1,500/level** | **10,500** |
| Writing (one per week) | — | 313 |
| **All six, total** | | **10,813** |

Writing totals by level (one composition per week, 7-day week —
confirmed 2026-11-20, quality over quantity; the 5-day-week
alternative, 438, is dropped):

| Level | Compositions |
| ---- | -----------: |
| Foundation | 9 |
| A1 | 26 |
| A2 | 34 |
| B1 | 51 |
| B2 | 73 |
| C1 | 60 |
| C2 | 60 |
| **Total** | **313** |

## Writing word ladder

| Level | Words per composition |
| ---- | --------------------: |
| Foundation | 50 |
| A1 | 100 |
| A2 | 150 |
| B1 | 200 |
| B2 | 300 |
| C1 | 400 |
| C2 | 600 |

Each writing item contains: a model text, a structure map, 3–5 reusable
patterns, a writing task, and a self-check list. Topics recycle the
main-course vocabulary for that level, and finished work goes in the
student's own writing portfolio. Four grading standards apply: length,
genre, sentence/linking complexity, writing skills.

## Rules

- **No duplicates with the main course.** An item already taught in the
  main course (Foundation + A1 + A2 + B1 + B2 + C1 + C2) must not be
  counted again as new. Check every candidate with the real checker
  (`lexical_history.check_item`) against all prior teaching plus the
  shared cross-stage ledger (`b1-b2-ledger.json`), and replace anything
  already taught. The same-level no-repeat rule applies: a new item
  (whole phrase and its component words) must be genuinely new within
  its level.
- **English only in course content.** No Chinese in supplement items.
  No "James Real" in example sentences. No Cambridge certification
  claims.
- **Jokes** follow the locked joke format: the joke, why it is funny,
  key words with short English explanations. Never repeat a joke already
  delivered (check `used_jokes.txt`).
- **Status: samples removed 2026-11-20.** One sample per type per level
  (42 total) was made 2026-11-20 and then deleted at James's request —
  only formal, published items ship from now on. Bulk production has
  not started. Phase 1 (main course Foundation–B2) comes first; supplements
  are Phase 2.

## Item formats

- Phrasal verb / idiom: entry, English definition, synonyms, one
  example sentence, one short example conversation.
- Sentence pattern: pattern, English explanation of when/how to use it,
  3 example sentences in different situations.
- Flashcard: word, IPA, part of speech, English definition, one example
  sentence.
- Joke: the joke, why it is funny, key words with short English
  explanations.
- Writing: topic, word target, model text, structure map, 3–5 reusable
  patterns, writing task, self-check list.
