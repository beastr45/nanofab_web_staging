/* =====================================================================
   The circuitry along the sides of every page.

   Traces ending in vias, drawn faintly into one SVG that covers the
   page down to the footer, between the section backgrounds and the
   content (README, "The circuitry"). Near the top they only live in the
   margins; further down there are a few more and they reach a little
   further in. Each trace draws itself as it scrolls into view.

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
    if (key === lastKey) { layer.style.height = (footer ? footer.offsetTop : H) + 'px'; return; }
    lastKey = key;

    var fTop = footer ? footer.offsetTop : H;
    var css = getComputedStyle(document.documentElement);
    var maxw = parseFloat(css.getPropertyValue('--maxw')) || 1440;
    var gut = Math.min(56, Math.max(16, W * 0.04));
    var margin = Math.max(0, (W - maxw) / 2) + gut; // where the content column starts
    var R = rng(seedOf(location.pathname) ^ W);

    layer.textContent = '';
    layer.style.height = fTop + 'px';
    var svg = el('svg', { width: W, height: fTop, viewBox: '0 0 ' + W + ' ' + fTop }, layer);
    var board = el('g', { class: 'c-board' }, svg);
    drawn = []; next = 0;

    // how deep we are (0 at the top, 1 at the footer) and how far in
    // the circuitry may reach from each edge at that depth
    function depth(y) { return Math.max(0, Math.min(1, y / Math.max(1, fTop))); }
    function reach(y) {
      return Math.max(10, margin - 6) + Math.pow(depth(y), 2.2) * 0.3 * (W / 2 - margin);
    }

    // anything reaching into the content column is drawn fainter, so
    // text over it stays easy to read
    function inside(pts) {
      for (var i = 0; i < pts.length; i++) if (pts[i][0] > margin && pts[i][0] < W - margin && true) return true;
      return false;
    }
    function trace(pts, y, cls) {
      var d = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L');
      var p = el('path', { d: d, pathLength: 1, class: 'c-trace' + (cls ? ' ' + cls : '') + (inside(pts) ? ' c-in' : '') }, board);
      drawn.push({ y: y, n: p });
      return p;
    }
    function via(x, y) {
      var c = el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 3.2, class: 'c-via' + (inside([[x, y]]) ? ' c-in' : '') }, board);
      drawn.push({ y: y, n: c });
    }
    // a bus: n parallel traces leaving one edge, stepping 45 degrees
    // up or down partway, ending in a staggered row of vias
    function bus(side, y, room) {
      var n = 1 + Math.floor(R() * (room > 120 ? 4 : 2)), pitch = 7;
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
        via(end[0], end[1]);
      }
    }
    // walk down the page; each step may drop a bus on each side
    var y = 120;
    while (y < fTop - 80) {
      var d = depth(y), step = 380 - 200 * d;
      [-1, 1].forEach(function (side) {
        if (R() > 0.4 + d * 0.5) return;
        var yy = y + R() * step;
        if (yy > fTop - 80) return;
        var room = reach(yy);
        bus(side, yy, room);
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
