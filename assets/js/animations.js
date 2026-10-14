/* MH09RS cinematic enhancement. Native scrolling; GSAP owns only visual timelines.
   The static document, navigation, categories, and dialogs never depend on GSAP. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) { root.classList.remove('cinematic-js'); return; }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 800px), (pointer: coarse)');
  const shortScreen = matchMedia('(max-height: 600px)');
  const opening = document.querySelector('.camera-opening');
  const toggle = document.querySelector('.motion-toggle');
  const dialog = document.getElementById('photoLightbox');
  let manualOff = false;
  try { manualOff = sessionStorage.getItem('mh09rs-motion') === 'off'; } catch (_) {}
  let enabled = false;
  let sceneContext;
  let galleryContext;
  let refreshFrame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const irisEase = gsap.parseEase('power2.inOut');
  const point = (radius, angle) => [
    (300 + radius * Math.cos(angle)).toFixed(2),
    (300 + radius * Math.sin(angle)).toFixed(2)
  ].join(' ');

  function refresh() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  function createOpening() {
    if (!opening) return;
    const stage = opening.querySelector('.opening-stage');
    const lens = opening.querySelector('.opening-lens');
    const photo = opening.querySelector('.opening-photo');
    const flash = opening.querySelector('.opening-flash');
    const blades = [...opening.querySelectorAll('.iris-blade')];
    const ring = opening.querySelector('.lens-focus-ring');
    const focus = opening.querySelector('.opening-focus');
    const state = { progress: 0 };
    let width, height, lensWidth;
    function measure() {
      width = stage.clientWidth;
      height = stage.clientHeight;
      lensWidth = lens.clientWidth;
    }
    measure();
    function draw() {
      const p = state.progress;
      const aperture = irisEase(clamp(p / .5));
      const radius = 10 + aperture * 191;
      const phase = aperture * .65;
      blades.forEach((blade, index) => {
        const a = index * Math.PI / 4, b = a + Math.PI / 4;
        blade.setAttribute('d', 'M' + point(210, a) + ' A210 210 0 0 1 ' +
          point(210, b) + ' L' + point(radius, b + phase) + ' L' + point(radius, a + phase) + ' Z');
      });
      ring.setAttribute('transform', 'rotate(' + (aperture * 28).toFixed(2) + ' 300 300)');
      const expansion = irisEase(clamp((p - .48) / .4));
      const smallRadius = radius * lensWidth / 600;
      const clipRadius = smallRadius + expansion * (Math.hypot(width, height) - smallRadius);
      const center = compact.matches ? '43%' : '48%';
      photo.style.clipPath = 'circle(' + clipRadius.toFixed(2) + 'px at 50% ' + center + ')';
      photo.style.transform = 'scale(' + (1.055 - expansion * .055).toFixed(4) + ')';
      photo.style.filter = compact.matches ? 'none' : 'blur(' + ((1 - aperture) * 1.4).toFixed(2) + 'px)';
      lens.style.transform = 'translate(-50%,-50%) scale(' + (1 + expansion * .45).toFixed(4) + ')';
      lens.style.opacity = 1 - clamp((p - .52) / .24);
      const capture = clamp((p - .465) / .06);
      flash.style.opacity = (Math.sin(capture * Math.PI) * .2).toFixed(3);
      const shake = compact.matches ? 0 : Math.sin((p - .47) * 300) * Math.exp(-Math.pow((p - .495) / .025, 2)) * 1.25;
      stage.style.transform = 'translate3d(' + shake.toFixed(2) + 'px,' + (shake * -.45).toFixed(2) + 'px,0)';
      focus.style.top = center;
      focus.style.opacity = Math.sin(clamp((p - .15) / .5) * Math.PI) * .48;
      focus.style.transform = 'scale(' + (1.25 - aperture * .25).toFixed(4) + ')';
      opening.dataset.phase = p < .3 ? 'opening' : p < .55 ? 'focusing' : 'photograph';
    }
    gsap.to(state, {
      progress: 1, duration: 1, ease: 'none', onUpdate: draw,
      scrollTrigger: {
        id: 'camera-opening', trigger: opening, start: () => 'top ' + (innerWidth <= 600 ? 72 : 88),
        end: 'bottom bottom', scrub: compact.matches ? true : .35,
        invalidateOnRefresh: true, onRefresh: () => { measure(); draw(); }
      }
    });
    draw();
    opening.querySelector('.opening-instruction').textContent = 'Scroll / Open · Focus · Remember';
  }

  function createReels() {
    document.querySelectorAll('.camera-reel').forEach((reel, index) => {
      const track = reel.querySelector('.reel-track');
      const viewport = reel.querySelector('.reel-window');
      const gear = reel.querySelector('.reel-gear');
      const counter = reel.querySelector('.reel-counter');
      const state = { progress: 0 };
      let travel = 0;
      viewport.removeAttribute('tabindex');
      reel.querySelector('.reel-instruction').textContent = 'Scroll to advance the film';
      const measure = () => { travel = Math.max(0, track.scrollWidth - viewport.clientWidth); };
      measure();
      const draw = () => {
        track.style.transform = 'translate3d(' + (-state.progress * travel).toFixed(2) + 'px,0,0)';
        gear.style.transform = 'rotate(' + (state.progress * 360).toFixed(2) + 'deg)';
        counter.textContent = String(Math.min(track.children.length, 1 + Math.floor(state.progress * track.children.length))).padStart(2, '0');
      };
      gsap.to(state, {
        progress: 1, duration: 1, ease: 'none', onUpdate: draw,
        scrollTrigger: {
          id: 'film-transport-' + index, trigger: reel, start: () => 'top ' + (innerWidth <= 600 ? 72 : 88),
          end: 'bottom bottom', scrub: compact.matches ? true : .45, invalidateOnRefresh: true,
          onRefresh: () => { measure(); draw(); }
        }
      });
    });
  }

  function createDepth() {
    document.querySelectorAll('.cinema-frame').forEach((frame, index) => {
      const photo = frame.querySelector('img');
      // Crop within a reserved frame: no layout changes as the photograph moves.
      gsap.fromTo(photo, { y: compact.matches ? 0 : -16, scale: 1.025 }, {
        y: compact.matches ? 0 : 16, scale: 1, ease: 'none',
        scrollTrigger: { id: 'photo-depth-' + index, trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .5 }
      });
    });
    if (!compact.matches) {
      document.querySelectorAll('.hero-content, .studio-content-col').forEach(text => {
        gsap.fromTo(text, { y: 16 }, { y: -16, ease: 'none',
          scrollTrigger: { trigger: text, start: 'top bottom', end: 'bottom top', scrub: .6 }
        });
      });
    }
    document.querySelectorAll('.closing-scene').forEach(scene => {
      gsap.fromTo(scene.querySelector('.closing-image'), { yPercent: -3, scale: 1.035 }, {
        yPercent: 3, scale: 1, ease: 'none',
        scrollTrigger: { id: 'closing-scene', trigger: scene, start: 'top bottom', end: 'bottom top', scrub: .5 }
      });
      gsap.fromTo(scene.querySelector('.closing-copy'), { y: 28 }, {
        y: 0, ease: 'none',
        scrollTrigger: { trigger: scene, start: 'top 90%', end: 'top 20%', scrub: .5 }
      });
    });
  }

  function rebuildGallery() {
    galleryContext?.revert();
    if (!enabled) return;
    galleryContext = gsap.context(() => {
      document.querySelectorAll('.gallery-item:not([hidden])').forEach((item, index) => {
        const photo = item.querySelector('img');
        const scene = item.classList.contains('gallery-scene') && !item.closest('.is-filtered');
        gsap.fromTo(photo, {
          clipPath: scene ? 'inset(12% 14% 12% 14%)' : 'inset(7% 0% 7% 0%)',
          scale: scene ? 1.055 : 1.025
        }, {
          clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none',
          scrollTrigger: {
            id: 'gallery-develop-' + index, trigger: item, start: 'top 96%',
            end: scene ? 'top 12%' : 'top 65%', scrub: compact.matches ? true : .4,
            invalidateOnRefresh: true
          }
        });
      });
    });
    refresh();
  }

  function setup() {
    galleryContext?.revert();
    sceneContext?.revert();
    document.querySelectorAll('.opening-stage, .opening-photo, .opening-lens, .opening-focus, .opening-flash, .reel-track, .reel-gear').forEach(el => el.removeAttribute('style'));
    enabled = !reduced.matches && !manualOff && !shortScreen.matches;
    root.classList.toggle('cinematic-js', enabled);
    document.querySelectorAll('.camera-reel').forEach(reel => {
      reel.querySelector('.reel-window').setAttribute('tabindex', '0');
      reel.querySelector('.reel-counter').textContent = '01';
      reel.querySelector('.reel-instruction').textContent = 'Scroll sideways to explore the frames';
    });
    if (opening) {
      opening.querySelector('.opening-instruction').textContent = 'Wedding films & photography';
      delete opening.dataset.phase;
    }
    if (toggle) {
      toggle.hidden = false;
      toggle.disabled = reduced.matches || shortScreen.matches;
      toggle.textContent = reduced.matches ? 'Reduced motion on' : shortScreen.matches ? 'Static view' : manualOff ? 'Enable motion' : 'Pause motion';
      toggle.setAttribute('aria-pressed', String(!enabled));
    }
    if (!enabled) { refresh(); return; }
    sceneContext = gsap.context(() => {
      createOpening();
      createReels();
      createDepth();
    });
    rebuildGallery();
    refresh();
  }

  toggle?.addEventListener('click', () => {
    // Preserve the control's screen position when the pinned section is collapsed.
    const oldY = toggle.getBoundingClientRect().top;
    manualOff = !manualOff;
    try { sessionStorage.setItem('mh09rs-motion', manualOff ? 'off' : 'on'); } catch (_) {}
    setup();
    window.scrollBy({ top: toggle.getBoundingClientRect().top - oldY, behavior: 'instant' });
    toggle.focus({ preventScroll: true });
  });
  [reduced, compact, shortScreen].forEach(query => query.addEventListener('change', setup));
  document.addEventListener('portfolio:filtered', rebuildGallery);
  document.addEventListener('focusin', event => {
    const item = event.target.closest?.('.gallery-item');
    if (item && enabled) gsap.set(item.querySelector('img'), { clipPath: 'inset(0%)' });
  });
  dialog?.addEventListener('photo:opened', () => {
    if (!enabled) return;
    gsap.fromTo(dialog.querySelector('.lightbox-image'), { scale: .975 }, {
      scale: 1, duration: compact.matches ? .2 : .45, ease: 'power2.out', clearProps: 'transform'
    });
  });
  setup();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('pageshow', refresh);
});
