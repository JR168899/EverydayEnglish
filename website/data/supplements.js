/* Everyday English — supplement registry (v3).
   THE single source of truth for supplement types. To add a new supplement
   type later (a 7th, 8th, ...), add ONE entry to window.EE_SUPPLEMENTS.types
   below — no new page code is needed: supplements.html (the hub) and
   supplement.html (the type detail page) both render from this array.
   - id: used in URLs, e.g. supplement.html?type=phrasal-verbs&level=a1
   - icon: a key in EE.icons (app.js)
   - color: kept in the data only. It is NEVER rendered as a fill:
     only the seven LEVEL colours are used as colour blocks, so supplement
     icons are neutral frames with a dark icon — no supplement colour blocks.
   - perLevel: items per level (300 for the five daily types); writing is
     weekly, so perLevel is the string '1 per week' and perLevelCounts holds
     the confirmed weekly totals per level (313 in total).
   - sampleKey: key in EE_DATA.supplementsA1 with the real A1 sample item
     (only A1 samples exist so far). */
window.EE_SUPPLEMENTS = {
  totalItems: 10813,
  types: [
    {
      id: 'flashcards',
      name: 'Vocabulary Flashcards',
      color: '#3B82F6',
      icon: 'layers',
      description: 'New words as picture cards: word, sound, meaning and one example sentence you can say yourself.',
      perLevel: 300,
      perLevelLabel: '300 items per level',
      total: 2100,
      cadence: 'daily',
      sampleKey: 'flashcards'
    },
    {
      id: 'phrasal-verbs',
      name: 'Phrasal Verbs',
      color: '#F97316',
      icon: 'chat',
      description: 'Two- and three-word verbs you hear every day — cheer up, look for, give up — learned in a short conversation, never alone.',
      perLevel: 300,
      perLevelLabel: '300 items per level',
      total: 2100,
      cadence: 'daily',
      sampleKey: 'phrasalVerbs'
    },
    {
      id: 'idioms',
      name: 'Idioms & Slang',
      color: '#8B5CF6',
      icon: 'spark',
      description: 'Sayings that do not mean what the words say — break a leg, piece of cake — with the story behind each one.',
      perLevel: 300,
      perLevelLabel: '300 items per level',
      total: 2100,
      cadence: 'daily',
      sampleKey: 'idioms'
    },
    {
      id: 'sentence-patterns',
      name: 'Universal Sentence Patterns',
      color: '#22C55E',
      icon: 'pen',
      description: 'Sentence frames you can reuse everywhere — I am good at … — with examples for real situations.',
      perLevel: 300,
      perLevelLabel: '300 items per level',
      total: 2100,
      cadence: 'daily',
      sampleKey: 'sentencePatterns'
    },
    {
      id: 'jokes',
      name: 'Jokes',
      color: '#EC4899',
      icon: 'smile',
      description: 'One short joke a day. Laugh first, then learn why it is funny and the key words that make it work.',
      perLevel: 300,
      perLevelLabel: '300 items per level',
      total: 2100,
      cadence: 'daily',
      sampleKey: 'jokes'
    },
    {
      id: 'writing',
      name: 'Writing',
      color: '#7A2A1A',
      icon: 'book',
      description: 'One composition a week — quality over quantity. A model text, a structure map, patterns to reuse, a writing task and a self-check list.',
      perLevel: '1 per week',
      perLevelLabel: '1 composition per week',
      perLevelCounts: { foundation: 9, a1: 26, a2: 34, b1: 51, b2: 73, c1: 60, c2: 60 },
      total: 313,
      cadence: 'weekly',
      sampleKey: 'writing'
    }

  ]
};
