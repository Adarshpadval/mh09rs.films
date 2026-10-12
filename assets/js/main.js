/**
 * MH09RS FILMS — CORE APPLICATION JAVASCRIPT
 * Brand: MH09RS Films | Founder: Rohit Suryawanshi | Kolhapur, Maharashtra
 * Production-ready static implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeaderScroll();
  initMobileNav();
  initScrollProgressBar();
  initVideoModal();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
 * 1. PRELOADER
 * -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.querySelector('.preloader-progress-bar');
  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progressBar) {
      progressBar.style.width = Math.min(progress, 100) + '%';
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.add('site-ready');
      }, 300);
    }
  }, 60);

  // Fallback safety timeout so visitor is never trapped
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
      }
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
 * 2. STICKY HEADER & SCROLL BEHAVIOR
 * -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
 * 3. MOBILE NAVIGATION DRAWER
 * -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
 * 4. SCROLL PROGRESS INDICATOR
 * -------------------------------------------------------------------------- */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
 * 5. CINEMA VIDEO MODAL VIEWER
 * -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('cinemaModal');
  if (!modal) return;

  const modalContainer = modal.querySelector('.video-container-responsive');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const filmCards = document.querySelectorAll('[data-video-id]');

  const openVideo = (videoId, title) => {
    if (!modalContainer) return;
    // Embed YouTube video with privacy mode (nocookie)
    modalContainer.innerHTML = `
      <iframe 
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
        title="${title || 'MH09RS Films Cinematography'}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    modal.classList.remove('active');
    if (modalContainer) {
      modalContainer.innerHTML = ''; // Stop video playback
    }
    document.body.style.overflow = '';
  };

  filmCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = card.getAttribute('data-video-id');
      const title = card.getAttribute('data-title') || '';
      if (videoId) {
        openVideo(videoId, title);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideo);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideo();
    }
  });
}

/* --------------------------------------------------------------------------
 * 6. DYNAMIC COPYRIGHT YEAR
 * -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}
