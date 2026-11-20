/* Everyday English v1 — front-end only.
   PROGRESS PLACEHOLDER: progress is stored in this browser's localStorage
   until Firebase Auth + Firestore are connected (see README.md). The shape
   below mirrors the planned Firestore document:
     users/{uid} = { level, currentDay, goalMinutes, reminderTime,
                     theme, paidEntitlement: false,
                     visited: { a1: { "1": true, ... } }, streak: n }
   No credentials exist yet — do not add any here. */
(function () {
  'use strict';
  var KEY = 'ee-progress-v1';
  var THEME_KEY = 'ee-theme-v1';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(p) { localStorage.setItem(KEY, JSON.stringify(p)); }

  window.EE = {
    /* Inline SVG icons (stroke style, currentColor). No emoji as icons. */
    icons: {
      book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22h16"/><path d="M18 14h-8"/><path d="M18 18h-8"/><path d="M18 10h-8"/><path d="M10 6h8v4h-8zM4 10v6a2 2 0 0 0 2 2h2"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
      play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
      calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
      target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
      smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
      trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a1 1 0 0 0-1 1c0 2.5 2 4 4 4M17 6h3a1 1 0 0 1 1 1c0 2.5-2 4-4 4"/></svg>',
      spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.4 4.8L20 8l-4 3.9.9 5.6L12 14.9 7.1 17.5 8 11.9 4 8l5.6-1.2L12 2z"/></svg>',
      users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 2.6-6.4"/><polyline points="3 4 3 9 8 9"/></svg>',
      grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>'
    },
    icon: function (name) { return (window.EE.icons && window.EE.icons[name]) || ''; },
    /* Supplement registry (data/supplements.js). Returns [] if not loaded. */
    supplementTypes: function () {
      return (window.EE_SUPPLEMENTS && window.EE_SUPPLEMENTS.types) || [];
    },
    supplementById: function (id) {
      var list = this.supplementTypes();
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },
    /* Map the current page to one of the 5 app tabs, for nav highlighting. */
    navTab: function () {
      var f = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
      var map = {
        'home.html': 'news', 'index.html': '',
        'courses.html': 'courses', 'level.html': 'courses', 'day.html': 'courses',
        'supplements.html': 'supplements', 'supplement.html': 'supplements',
        'review.html': 'review', 'settings.html': 'me'
      };
      return map[f] || '';
    },
    data: function () { return window.EE_DATA || {}; },
    progress: load,
    saveProgress: save,
    theme: function () { return localStorage.getItem(THEME_KEY) || 'default'; },
    setTheme: function (t) {
      localStorage.setItem(THEME_KEY, t);
      document.documentElement.setAttribute('data-theme', t === 'default' ? '' : t);
      if (t === 'default') document.documentElement.removeAttribute('data-theme');
    },
    isVisited: function (level, day) {
      var p = load();
      return !!(p.visited && p.visited[level] && p.visited[level][String(day)]);
    },
    markVisited: function (level, day) {
      var p = load();
      p.visited = p.visited || {};
      p.visited[level] = p.visited[level] || {};
      p.visited[level][String(day)] = true;
      p.level = level; p.currentDay = day;
      p.lastVisit = new Date().toISOString().slice(0, 10);
      save(p);
      return p;
    },
    unmarkVisited: function (level, day) {
      var p = load();
      if (p.visited && p.visited[level]) delete p.visited[level][String(day)];
      save(p);
      return p;
    },
    visitedCount: function (level, total) {
      var p = load(), n = 0;
      if (p.visited && p.visited[level]) n = Object.keys(p.visited[level]).length;
      return { done: Math.min(n, total), total: total };
    },
    continueTarget: function () {
      var p = load();
      if (p.level && p.currentDay) return { level: p.level, day: p.currentDay };
      return { level: 'a1', day: 1 }; /* first lesson for a new learner */
    },
    /* Progress ring: returns an SVG string. colour = level colour. */
    ring: function (done, total, colour, size) {
      size = size || 64;
      var r = (size / 2) - 6, c = 2 * Math.PI * r;
      var pct = total ? Math.min(1, done / total) : 0;
      var off = c * (1 - pct);
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + done + ' of ' + total + ' done">' +
        '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="#EDE3C8" stroke-width="7"/>' +
        '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + colour + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
        '<text x="50%" y="54%" text-anchor="middle" font-size="' + Math.round(size * 0.24) + '" font-weight="900" fill="currentColor">' + Math.round(pct * 100) + '%</text></svg>';
    },
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }
  };

  /* Apply saved theme as early as possible, and highlight the current
     tab in both the desktop top bar and the mobile bottom tab bar. */
  document.addEventListener('DOMContentLoaded', function () {
    var t = window.EE.theme();
    if (t && t !== 'default') document.documentElement.setAttribute('data-theme', t);
    var tab = window.EE.navTab();
    if (tab) {
      document.querySelectorAll('nav.main a, nav.tabbar a').forEach(function (a) {
        var key = a.getAttribute('data-nav') || a.getAttribute('data-tab');
        a.classList.toggle('active', key === tab);
      });
    }
  });
})();
