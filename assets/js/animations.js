/**
 * MH09RS FILMS — CINEMATIC MOTION & ANIMATIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollObserver();
  initSubtleParallax();
});

/* --------------------------------------------------------------------------
 * 1. LUXURY CUSTOM CURSOR (DESKTOP ONLY)
 * -------------------------------------------------------------------------- */
function initCustomCursor() {
  // Disable on touch devices or reduced motion
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouchDevice || prefersReduced) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');
  const label = document.querySelector('.cursor-label');

  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth trailing follower loop
  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  };
  requestAnimationFrame(animateFollower);

  // Hover states on interactive elements
  const interactives = document.querySelectorAll('a, button, .film-card, .gallery-item, .travel-card, input, select, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const cursorText = el.getAttribute('data-cursor');
      if (cursorText && label) {
        label.textContent = cursorText;
        follower.classList.add('has-label');
      } else {
        follower.classList.add('hovering');
      }
    });

    el.addEventListener('mouseleave', () => {
      follower.classList.remove('hovering', 'has-label');
      if (label) label.textContent = '';
    });
  });
}

/* --------------------------------------------------------------------------
 * 2. INTERSECTION OBSERVER FOR SCROLL REVEALS
 * -------------------------------------------------------------------------- */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-mask');
  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
 * 3. SUBTLE PARALLAX DEPTH
 * -------------------------------------------------------------------------- */
function initSubtleParallax() {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouchDevice || prefersReduced) return;

  const parallaxItems = document.querySelectorAll('[data-speed]');
  if (!parallaxItems.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        parallaxItems.forEach(item => {
          const speed = parseFloat(item.getAttribute('data-speed')) || 0.1;
          const rect = item.getBoundingClientRect();
          // Only animate when near viewport
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (window.innerHeight - rect.top) * speed * 0.15;
            item.style.transform = `translateY(${yPos}px)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
