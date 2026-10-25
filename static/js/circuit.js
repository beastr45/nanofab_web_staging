/* =====================================================================
   The circuitry along the sides of every page.

   Traces, vias, bond pads and small dies are drawn into one SVG that
   covers the whole document, between the section backgrounds and the
   content (README, "The circuitry"). Near the top they only live in the
   margins; further down they get denser and reach further in, and over
   the last stretch before the footer the page fills with UV until the
   footer is solid purple. Each trace draws itself as it scrolls into
   view.

   Decoration only: aria-hidden, no pointer events, and the page is
   unchanged without JavaScript. To turn it off, delete the <script> tag
   for this file in layouts/_default/baseof.html.
   ===================================================================== */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var layer = document.createElement('div');
  layer.className = 'circuit';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  var footer = document.querySelector('.footer');
  var drawn = [], next = 0, lastKey = '';

  // seeded random, so the same page always gets the same board
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function seedOf(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h; }

  function build() {
    // measure the page without the layer, or a page that got shorter
    // (a band folded) would stay as tall as the old layer
    layer.style.height = '0';
    var W = document.documentElement.clientWidth;
    var H = footer ? footer.offsetTop + footer.offsetHeight : document.documentElement.scrollHeight;
    var key = W + 'x' + H;
    if (key === lastKey) { layer.style.height = H + 'px'; return; }
    lastKey = key;

    var fTop = footer ? footer.offsetTop : H;
    var wraps = document.querySelectorAll('main .wrap');
    var lastWrap = wraps[wraps.length - 1];
    // the purple starts rising a little above the end of the last content
    // (which sits on top of it) and is solid by the footer
    var flood = lastWrap ? Math.max(fTop - 560, Math.min(fTop, lastWrap.getBoundingClientRect().bottom + scrollY - 220)) : fTop;
    var css = getComputedStyle(document.documentElement);
    var maxw = parseFloat(css.getPropertyValue('--maxw')) || 1440;
    var gut = Math.min(56, Math.max(16, W * 0.04));
    var margin = Math.max(0, (W - maxw) / 2) + gut; // where the content column starts
    var R = rng(seedOf(location.pathname) ^ W);

    layer.textContent = '';
    layer.style.height = H + 'px';
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H }, layer);
    var defs = el('defs', {}, svg);
    var g = el('linearGradient', { id: 'cFlood', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, style: 'stop-color: var(--fab); stop-opacity: 0' }, g);
    el('stop', { offset: 0.55, style: 'stop-color: var(--fab); stop-opacity: 0.18' }, g);
    el('stop', { offset: 1, style: 'stop-color: var(--fab); stop-opacity: 1' }, g);
    // the rising purple, just above the footer
    if (flood < fTop) el('rect', { x: 0, y: flood, width: W, height: fTop - flood, fill: 'url(#cFlood)' }, svg);

    var board = el('g', { class: 'c-board' }, svg);
    var floor = el('g', { class: 'c-floor' }, svg);
    drawn = []; next = 0;

    // how deep we are (0 at the top, 1 at the footer) and how far in
    // the circuitry may reach from each edge at that depth
    function depth(y) { return Math.max(0, Math.min(1, y / Math.max(1, fTop))); }
    function reach(y) {
      if (y >= fTop) return W / 2;
      var d = depth(y);
      return Math.max(10, margin - 6) + Math.pow(d, 2.2) * (W / 2 - margin);
    }
    function parent(y) { return y >= fTop ? floor : board; }

    // anything reaching into the content column is drawn fainter, so
    // text over it stays easy to read
    function inside(pts) {
      for (var i = 0; i < pts.length; i++) if (pts[i][0] > margin && pts[i][0] < W - margin && pts[i][1] < fTop) return true;
      return false;
    }
    function trace(pts, y, cls) {
      var d = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L');
      var p = el('path', { d: d, pathLength: 1, class: 'c-trace' + (cls ? ' ' + cls : '') + (inside(pts) ? ' c-in' : '') }, parent(y));
      drawn.push({ y: y, n: p });
      return p;
    }
    function via(x, y) {
      var c = el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 3.2, class: 'c-via' + (inside([[x, y]]) ? ' c-in' : '') }, parent(y));
      drawn.push({ y: y, n: c });
    }
    function pad(x, y, s) {
      var r = el('rect', { x: (x - s / 2).toFixed(1), y: (y - s / 2).toFixed(1), width: s, height: s, class: 'c-pad' }, parent(y));
      drawn.push({ y: y, n: r });
    }
    function die(x, y, w, h) {
      var grp = el('g', { class: 'c-part' }, parent(y));
      el('rect', { x: x, y: y, width: w, height: h, class: 'c-die' }, grp);
      el('rect', { x: x + 4, y: y + 4, width: w - 8, height: h - 8, class: 'c-seal' }, grp);
      var n = Math.max(2, Math.floor(h / 9)), i, py;
      for (i = 0; i < n; i++) {
        py = y + (i + 0.5) * h / n;
        el('path', { d: 'M' + (x - 7) + ' ' + py + 'h7M' + (x + w) + ' ' + py + 'h7', class: 'c-pin' }, grp);
      }
      drawn.push({ y: y, n: grp });
    }
    function cross(x, y) {
      var grp = el('g', { class: 'c-part' }, parent(y));
      el('path', { d: 'M' + (x - 8) + ' ' + y + 'h16M' + x + ' ' + (y - 8) + 'v16', class: 'c-mark' }, grp);
      el('rect', { x: x - 12, y: y - 12, width: 24, height: 24, class: 'c-mark-box' }, grp);
      drawn.push({ y: y, n: grp });
    }
    function viaArray(x, y, cols, rows) {
      for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) via(x + i * 9, y + j * 9);
    }

    // a bus: n parallel traces leaving one edge, stepping 45 degrees
    // up or down partway, ending in a staggered row of vias
    function bus(side, y, room) {
      var n = 1 + Math.floor(R() * (room > 120 ? 6 : 3)), pitch = 7;
      var len1 = room * (0.25 + R() * 0.35), len2 = room * (0.15 + R() * 0.3);
      var dy = (R() < 0.5 ? -1 : 1) * (12 + R() * 40);
      for (var i = 0; i < n; i++) {
        var yy = y + i * pitch, a = len1 + (dy > 0 ? (n - i) : i) * pitch * 0.42;
        var b = Math.min(room - 8, a + Math.abs(dy) + len2 + i * 9);
        var sx = function (v) { return side < 0 ? v : W - v; };
        var pts = [[sx(-2), yy], [sx(a), yy], [sx(a + Math.abs(dy)), yy + dy], [sx(b), yy + dy]];
        if (b <= a + Math.abs(dy)) pts.pop();
        trace(pts, yy);
        var end = pts[pts.length - 1];
        if (R() < 0.75) via(end[0], end[1]); else pad(end[0], end[1], 8);
      }
    }
    // a rail: one long vertical run in the margin, with short taps
    function rail(side, y, room) {
      var x = side < 0 ? 8 + R() * (room - 16) : W - 8 - R() * (room - 16);
      var len = 160 + R() * 420, taps = 1 + Math.floor(R() * 3);
      trace([[x, y], [x, y + len]], y, 'c-rail');
      via(x, y); via(x, y + len);
      for (var t = 0; t < taps; t++) {
        var ty = y + (t + 1) * len / (taps + 1), dir = side < 0 ? 1 : -1;
        var tl = Math.min(room - Math.abs(x - (side < 0 ? 0 : W)) - 6, 14 + R() * 60);
        if (tl > 10) { trace([[x, ty], [x + dir * tl, ty]], ty); pad(x + dir * tl, ty, 6); }
      }
    }

    // walk down the page; each step drops a few parts on each side
    var y = 120;
    while (y < H - 40) {
      var d = depth(y), inFloor = y >= fTop;
      var step = inFloor ? 70 : 300 - 230 * Math.pow(d, 0.8);
      [-1, 1].forEach(function (side) {
        var room = reach(y);
        var count = inFloor ? (W < 700 ? 1 : 2) : (R() < 0.55 + d * 0.45 ? 1 : 0) + (R() < d * d ? 1 : 0);
        for (var k = 0; k < count; k++) {
          var yy = y + R() * step, roll = R();
          if (yy > H - 40) continue;
          room = reach(yy);
          if (roll < 0.55) bus(side, yy, room);
          else if (roll < 0.72 && room > 36) rail(side, yy, room);
          else if (roll < 0.82 && room > 90) { var w = 30 + R() * 40, h = 24 + R() * 40; die(side < 0 ? 16 + R() * (room - w - 32) : W - 16 - w - R() * (room - w - 32), yy, w, h); }
          else if (roll < 0.9 && room > 40) cross(side < 0 ? 22 + R() * (room - 44) : W - 22 - R() * (room - 44), yy);
          else if (room > 50) viaArray(side < 0 ? 10 + R() * (room - 46) : W - 46 - R() * (room - 56), yy, 2 + Math.floor(R() * 3), 2 + Math.floor(R() * 3));
        }
      });
      y += step;
    }

    drawn.sort(function (a, b) { return a.y - b.y; });
    if (reduce) drawn.forEach(function (o) { o.n.classList.add('on'); });
    reveal();
  }

  function reveal() {
    var line = scrollY + innerHeight * 0.92;
    while (next < drawn.length && drawn[next].y < line) drawn[next++].n.classList.add('on');
  }

  var t = 0;
  function rebuild() { clearTimeout(t); t = setTimeout(build, 150); }
  addEventListener('scroll', function () { requestAnimationFrame(reveal); }, { passive: true });
  addEventListener('resize', rebuild);
  if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(document.body);
  addEventListener('load', build);
  build();
})();
