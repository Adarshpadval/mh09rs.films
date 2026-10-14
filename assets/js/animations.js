/**
 * MH09RS FILMS — MOTION & SCROLL REVEALS
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollObserver();
});

/* --------------------------------------------------------------------------
 * INTERSECTION OBSERVER FOR SCROLL REVEALS
 * -------------------------------------------------------------------------- */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-mask');
  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('revealed');
    } else {
      observer.observe(el);
    }
  });
}
