// One shutter reveal per image. Scroll motion is bounded and desktop-only.
document.addEventListener('DOMContentLoaded', () => {
  const frames = [...document.querySelectorAll('.cinema-frame')];
  if (!frames.length || !('IntersectionObserver' in window)) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 961px) and (pointer: fine)');
  const visible = new Set();
  let pending = 0;
  let listening = false;

  function render() {
    pending = 0;
    visible.forEach(frame => {
      const rect = frame.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1,
        (innerHeight / 2 - rect.top - rect.height / 2) / (innerHeight / 2 + rect.height / 2)));
      frame.style.setProperty('--camera-offset', (progress * 18).toFixed(2) + 'px');
    });
  }
  function schedule() {
    if (!pending) pending = requestAnimationFrame(render);
  }
  function configure() {
    const enabled = !reduced.matches && desktop.matches;
    if (enabled && !listening) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      listening = true;
    } else if (!enabled && listening) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(pending);
      pending = 0;
      listening = false;
    }
    if (enabled) schedule();
    else frames.forEach(frame => frame.style.removeProperty('--camera-offset'));
    if (reduced.matches) frames.forEach(frame => frame.classList.add('is-exposed'));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.add(entry.target);
        // Two frames allow the closed shutter to paint before opening.
        requestAnimationFrame(() => requestAnimationFrame(() => entry.target.classList.add('is-exposed')));
      } else visible.delete(entry.target);
    });
    if (listening) schedule();
  }, { threshold: 0.08 });
  frames.forEach(frame => {
    if (!reduced.matches) frame.classList.add('motion-ready');
    observer.observe(frame);
  });
  reduced.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  configure();
});
