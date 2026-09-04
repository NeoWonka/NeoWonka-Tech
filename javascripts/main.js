// Fade hero overlay on scroll and handle nav toggle
(function () {
  const hero = document.getElementById('hero');
  const overlay = hero && hero.querySelector('.hero-overlay');
  const heroBg = hero && hero.querySelector('.hero-bg');
  const nav = document.getElementById('sideNav');
  const toggle = document.getElementById('navToggle');
  const closeBtn = document.getElementById('navClose');

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function onScroll() {
    if (!overlay || !hero) return;
    const rect = hero.getBoundingClientRect();
    const scrolled = clamp(1 - ( -rect.top / (rect.height * 0.9) ), 0, 1);
    // set overlay opacity (text fade)
    overlay.style.opacity = scrolled;
    // small parallax on background
    if (heroBg) {
      heroBg.style.transform = `translateY(${(-rect.top * 0.15)}px)`;
    }
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add('open');
    nav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Event listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) closeNav();
      else openNav();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  // Close nav on link click (good for small screens)
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }

  // init
  document.addEventListener('DOMContentLoaded', onScroll);
  onScroll();
})();