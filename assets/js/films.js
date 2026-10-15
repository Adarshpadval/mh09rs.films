document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('filmDialog');
  if (!dialog) return;
  const video = dialog.querySelector('video');
  const error = dialog.querySelector('.film-error');
  let trigger;
  document.querySelectorAll('[data-film]').forEach(button => button.addEventListener('click', () => {
    trigger = button;
    dialog.querySelector('h2').textContent = button.dataset.filmTitle || 'Film preview';
    error.hidden = true;
    video.src = button.dataset.film;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  }));
  video.addEventListener('error', () => { error.hidden = false; });
  dialog.querySelector('.film-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.body.style.overflow = '';
    trigger?.focus({ preventScroll: true });
  });
});
