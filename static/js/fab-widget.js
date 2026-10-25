/* =====================================================================
   "Our logo, fabricated" (layouts/partials/fab-widget.html).
   Steps through the process: each step adds .at-<n> to .fabw for every
   step reached, and static/css/fab-widget.css animates the drawing.
   Plays once the section is on screen, loops, and pauses on hover or
   when a step is chosen. With reduced motion it doesn't autoplay.
   ===================================================================== */
(function () {
  'use strict';
  var root = document.querySelector('[data-fabw]');
  if (!root) return;
  var steps = Array.prototype.slice.call(root.querySelectorAll('[data-go]'));
  var last = steps.length - 1;
  var playBtn = root.querySelector('[data-fabw-play]');
  var playLabel = root.querySelector('[data-fabw-play-label]');
  var num = root.querySelector('[data-fabw-num]');
  var label = root.querySelector('[data-fabw-label]');
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HOLD = 2600, HOLD_END = 5000;
  var cur = last, timer = null, playing = false, seen = false;

  function go(n) {
    cur = n;
    for (var i = 1; i <= last; i++) root.classList.toggle('at-' + i, i <= n);
    root.dataset.step = n;
    steps.forEach(function (b, i) { b.setAttribute('aria-current', i === n ? 'step' : 'false'); });
    num.textContent = String(n).padStart(2, '0');
    label.textContent = steps[n].dataset.label;
  }
  function tick() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      go(cur >= last ? 0 : cur + 1);
      tick();
    }, cur >= last ? HOLD_END : HOLD);
  }
  function play(on) {
    playing = on;
    clearTimeout(timer);
    playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    playLabel.textContent = on ? 'Pause' : 'Play';
    if (on) {
      if (cur >= last) go(0);
      tick();
    }
  }

  steps.forEach(function (b, i) {
    b.addEventListener('click', function () { play(false); go(i); });
  });
  playBtn.addEventListener('click', function () { play(!playing); });

  go(last);
  if (still || !('IntersectionObserver' in window)) return;
  // start from a bare wafer the first time it scrolls into view
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !seen) { seen = true; go(0); play(true); }
      else if (!e.isIntersecting && playing) { clearTimeout(timer); }
      else if (e.isIntersecting && playing) { tick(); }
    });
  }, { threshold: 0.35 }).observe(root);
})();
