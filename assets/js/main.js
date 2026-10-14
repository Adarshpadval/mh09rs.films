document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.current-year').forEach(el => { el.textContent = new Date().getFullYear(); });
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  if (!toggle || !menu) return;
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  function setOpen(open, restoreFocus = false) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (open) menu.querySelector('a')?.focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(menu.hidden, true));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') { setOpen(false, true); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...document.querySelectorAll('.site-header a, .site-header button, .mobile-nav a')]
      .filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', event => {
    if (event.matches && !menu.hidden) setOpen(false);
  });
});
