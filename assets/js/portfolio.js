/**
 * MH09RS FILMS — PORTFOLIO GALLERY & LIGHTBOX
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initPhotoLightbox();
});

/* --------------------------------------------------------------------------
 * 1. GALLERY CATEGORY FILTERING
 * -------------------------------------------------------------------------- */
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 2. FULLSCREEN PHOTOGRAPHY LIGHTBOX
 * -------------------------------------------------------------------------- */
function initPhotoLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!lightbox || !galleryItems.length) return;

  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const itemsArray = Array.from(galleryItems);

  const showImage = (index) => {
    if (index < 0) index = itemsArray.length - 1;
    if (index >= itemsArray.length) index = 0;
    currentIndex = index;

    const currentItem = itemsArray[currentIndex];
    const imgEl = currentItem.querySelector('img');
    const titleEl = currentItem.querySelector('.gallery-caption-title');
    const tagEl = currentItem.querySelector('.gallery-caption-tag');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'MH09RS Films';
    }

    if (lightboxCaption) {
      const title = titleEl ? titleEl.textContent : '';
      const tag = tagEl ? tagEl.textContent : '';
      lightboxCaption.innerHTML = `<strong>${title}</strong> <span>· ${tag}</span>`;
    }
  };

  itemsArray.forEach((item, idx) => {
    item.addEventListener('click', () => {
      showImage(idx);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}
