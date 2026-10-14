// Scroll-driven camera gate and film transport; never intercept native scrolling.
document.addEventListener('DOMContentLoaded', () => {
  const frames = [...document.querySelectorAll('.cinema-frame')];
  if (!frames.length || !('IntersectionObserver' in window)) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 961px) and (pointer: fine)');
  const reels = [...document.querySelectorAll('.camera-reel')];
  const visible = new Set();
  let pending = 0;
  let listening = false;

  function render() {
    pending = 0;
    if (reduced.matches) return;
    reels.forEach(reel => {
      const rect = reel.getBoundingClientRect();
      const stage = reel.querySelector('.reel-stage');
      const viewport = reel.querySelector('.reel-window');
      const track = reel.querySelector('.reel-track');
      const top = parseFloat(getComputedStyle(stage).top) || 0;
      const distance = rect.height - stage.offsetHeight;
      const progress = Math.max(0, Math.min(1, (top - rect.top) / Math.max(1, distance)));
      const opening = Math.min(1, progress / .28);
      const advance = Math.max(0, (progress - .28) / .72);
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      reel.style.setProperty('--iris-radius', (5 + opening * 100).toFixed(2) + '%');
      reel.style.setProperty('--reel-offset', (-advance * travel).toFixed(2) + 'px');
      reel.style.setProperty('--gear-angle', (advance * 280).toFixed(2) + 'deg');
      reel.querySelector('.reel-counter').textContent = String(Math.min(track.children.length, 1 + Math.floor(advance * track.children.length))).padStart(2, '0');
    });
    visible.forEach(frame => {
      const rect = frame.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1,
        (innerHeight / 2 - rect.top - rect.height / 2) / (innerHeight / 2 + rect.height / 2)));
      frame.style.setProperty('--camera-offset', (desktop.matches ? progress * 18 : 0).toFixed(2) + 'px');
    });
  }
  function schedule() {
    if (!pending) pending = requestAnimationFrame(render);
  }
  function configure() {
    const enabled = !reduced.matches;
    reels.forEach(reel => {
      reel.classList.toggle('reel-running', enabled);
      reel.querySelector('.reel-instruction').textContent = enabled
        ? 'Scroll to open the lens and advance the film'
        : 'Scroll sideways to explore the frames';
      const viewport = reel.querySelector('.reel-window');
      if (enabled) viewport.removeAttribute('tabindex');
      else viewport.setAttribute('tabindex', '0');
    });
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
