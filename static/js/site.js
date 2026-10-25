/* =====================================================================
   Minnesota Nanofabrication Club: the small amount of behaviour the
   site needs. No dependencies, no build step. Everything degrades:
   without JavaScript the nav links still work, every machine card
   renders open, and nothing is hidden behind an animation.
   ===================================================================== */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- header takes the theme of the section under it ---------- */
  var header = $('#siteHeader'), nav = $('#nav');
  var themed = $$('[data-nav]');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var probe = nav.getBoundingClientRect().bottom - 1;
      var theme = 'dark', atTop = false;
      for (var i = 0; i < themed.length; i++) {
        var r = themed[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          theme = themed[i].dataset.nav;
          atTop = themed[i].id === 'top' && scrollY < 40;
          break;
        }
      }
      nav.classList.toggle('on-dark', theme === 'dark' && !atTop);
      nav.classList.toggle('on-light', theme === 'light');
      spy();
    });
  }
  if (nav) {
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
  }

  /* ---------- scroll spy: marks the section you are reading ----------
     Any link with data-spy="<id>" (sub-nav bars, the Sponsors link in
     the header) gets .is-active while that section is under the bars. */
  var spyLinks = $$('[data-spy]').filter(function (a) { return document.getElementById(a.dataset.spy); });
  function spy() {
    if (!spyLinks.length) return;
    var line = (nav ? nav.getBoundingClientRect().bottom : 0) + 90;
    var current = null;
    spyLinks.forEach(function (a) {
      var el = document.getElementById(a.dataset.spy);
      var r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = a.dataset.spy;
    });
    spyLinks.forEach(function (a) {
      var on = a.dataset.spy === current;
      a.classList.toggle('is-active', on);
      if (a.closest('.subnav')) {
        if (on) { a.setAttribute('aria-current', 'location'); }
        else { a.removeAttribute('aria-current'); }
      }
    });
    var act = $('.subnav a.is-active');
    if (act && act.parentElement.scrollWidth > act.parentElement.clientWidth) {
      var p = act.parentElement, l = act.offsetLeft - 16;
      if (l < p.scrollLeft || act.offsetLeft + act.offsetWidth > p.scrollLeft + p.clientWidth) p.scrollTo({ left: l, behavior: 'smooth' });
    }
  }

  /* ---------- full-screen menu (the button in the top right, every width) ---------- */
  var menu = $('#menu'), toggle = $('#menuToggle'), closeBtn = $('#menuClose'), lastFocus = null;
  if (menu && toggle && closeBtn) {
    menu.hidden = false;
    var openMenu = function () {
      lastFocus = document.activeElement;
      menu.classList.add('is-open');
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      setTimeout(function () { closeBtn.focus(); }, 30);
    };
    var closeMenu = function (restore) {
      menu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (restore !== false && lastFocus) lastFocus.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', function () { closeMenu(); });
    $$('[data-close]', menu).forEach(function (a) { a.addEventListener('click', function () { closeMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        var f = $$('a, button', menu), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    
  }

  /* ---------- bands on /machines/ fold ----------
     The band heading is a button. The band marked data-start-open
     starts open, the rest closed; a link to a band or to a card inside
     it opens that band. */
  var bandBtns = $$('[data-band-toggle]');
  function setBand(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) panel.hidden = !open;
    btn.closest('.band').classList.toggle('is-closed', !open);
  }
  function openBandOf(el) {
    var band = el && el.closest('.band');
    var btn = band && $('[data-band-toggle]', band);
    if (btn && btn.getAttribute('aria-expanded') !== 'true') setBand(btn, true);
  }
  bandBtns.forEach(function (btn) {
    setBand(btn, btn.hasAttribute('data-start-open'));
    btn.addEventListener('click', function () { setBand(btn, btn.getAttribute('aria-expanded') !== 'true'); });
  });
  $$('.subnav a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () { openBandOf(document.getElementById(a.getAttribute('href').slice(1))); });
  });

  /* ---------- machine cards: open in place ---------- */
  var cards = $$('[data-card]');
  function setCard(card, open, focus) {
    var btn = $('.mcard-toggle', card), body = $('[data-body]', card), label = $('[data-label]', card);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.hidden = !open;
    card.classList.toggle('is-open', open);
    if (label) label.textContent = open ? 'Close' : 'Read more';
    if (open && focus) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  cards.forEach(function (card) {
    setCard(card, false);
    $('.mcard-toggle', card).addEventListener('click', function () {
      var open = card.classList.contains('is-open');
      setCard(card, !open);
      if (!open) {
        if (history.replaceState) history.replaceState(null, '', '#' + card.id);
        // the card now spans the row; keep its top in view
        var top = card.getBoundingClientRect().top;
        if (top < 120) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  // "Part of" links inside a card open the parent card too
  function openFromHash(smooth) {
    var id = decodeURIComponent(location.hash.slice(1));
    var card = id && document.getElementById(id);
    if (card && card.classList.contains('band')) openBandOf($('[data-band-toggle]', card));
    if (card && card.hasAttribute('data-card')) { openBandOf(card); setCard(card, true, smooth !== false); }
  }
  if (cards.length) {
    openFromHash();
    addEventListener('hashchange', openFromHash);
    var all = $('[data-expand-all]');
    if (all) all.addEventListener('click', function () {
      var open = all.getAttribute('aria-pressed') !== 'true';
      cards.forEach(function (c) { setCard(c, open); });
      if (open) bandBtns.forEach(function (b) { setBand(b, true); });
      all.setAttribute('aria-pressed', open ? 'true' : 'false');
      all.textContent = open ? 'Close all' : 'Open all';
    });
  }

  /* ---------- reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  if (nav) onScroll();
})();
