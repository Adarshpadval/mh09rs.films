document.addEventListener('DOMContentLoaded', () => {
  const items = [...document.querySelectorAll('.gallery-item')];
  const filters = [...document.querySelectorAll('.filter-btn')];
  const gallery = document.querySelector('.masonry-gallery');
  const status = document.querySelector('.gallery-status');
  const dialog = document.getElementById('photoLightbox');
  const visibleItems = () => items.filter(item => !item.hidden);
  function updateStatus() {
    if (status) status.textContent = String(visibleItems().length).padStart(2, '0') + ' photographs / select to enlarge';
  }
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    items.forEach(item => { item.hidden = category !== 'all' && item.dataset.category !== category; });
    gallery?.classList.toggle('is-filtered', category !== 'all');
    updateStatus();
    document.dispatchEvent(new Event('portfolio:filtered'));
  }));
  updateStatus();
  if (!dialog) return;
  const photo = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  let current = null;
  let trigger = null;
  function show(item) {
    current = item;
    const source = item.querySelector('img');
    photo.src = source.src;
    photo.alt = source.alt;
    caption.textContent = item.querySelector('.gallery-caption-title').textContent + ' / ' +
      String(visibleItems().indexOf(item) + 1).padStart(2, '0') + ' of ' + visibleItems().length;
  }
  function advance(direction) {
    const active = visibleItems();
    show(active[(active.indexOf(current) + direction + active.length) % active.length]);
  }
  items.forEach(item => item.addEventListener('click', () => {
    trigger = item;
    show(item);
    dialog.showModal();
    dialog.dispatchEvent(new Event('photo:opened'));
    document.body.style.overflow = 'hidden';
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => advance(-1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => advance(1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); advance(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); advance(1); }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    trigger?.focus();
  });
});
