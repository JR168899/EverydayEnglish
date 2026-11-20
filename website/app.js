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

  /* Apply saved theme as early as possible. */
  document.addEventListener('DOMContentLoaded', function () {
    var t = window.EE.theme();
    if (t && t !== 'default') document.documentElement.setAttribute('data-theme', t);
  });
})();
