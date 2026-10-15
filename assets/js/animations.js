/* Motion enhances native scrolling. No wheel interception, animation library or intro. */
document.addEventListener('DOMContentLoaded', () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 800px)');
  const root = document.documentElement;
  const hero = document.querySelector('.cinematic-hero');
  const pin = hero?.querySelector('.hero-pin');
  const depth = [...document.querySelectorAll('.closing-scene, .studio-image-card')];
  const animations = new Set();
  let frame = 0, observer;
  const clamp = n => Math.max(0, Math.min(1, n));
  function draw() {
    frame = 0;
    if (reduced.matches) return;
    // Read geometry before writing styles, once per requested animation frame.
    const rect = hero?.getBoundingClientRect();
    const travel = hero ? hero.offsetHeight - pin.offsetHeight : 1;
    const depths = depth.map(el => ({ el, rect:el.getBoundingClientRect() }));
    if (hero && rect.bottom > 0 && rect.top < innerHeight) {
      const p = clamp(-rect.top / Math.max(1,travel));
      const eased = 1 - Math.pow(1-p,2);
      hero.style.setProperty('--hero-scale',1-eased*(compact.matches?.06:.18));
      hero.style.setProperty('--hero-y',`${eased*(compact.matches?18:32)}px`);
      hero.style.setProperty('--hero-radius',`${eased*8}px`);
      hero.style.setProperty('--surround-opacity',eased);
      hero.style.setProperty('--surround-scale',.92+eased*.08);
    }
    depths.forEach(({el,rect}) => {
      if (compact.matches || rect.bottom<=0 || rect.top>=innerHeight) return;
      const p=clamp((innerHeight-rect.top)/(innerHeight+rect.height));
      el.style.setProperty('--photo-offset',`${(p-.5)*24}px`);
    });
  }
  function schedule() { if (!frame && !reduced.matches) frame=requestAnimationFrame(draw); }
  function configure() {
    observer?.disconnect();
    animations.forEach(a=>a.cancel()); animations.clear();
    root.classList.toggle('scroll-cinema',!reduced.matches);
    hero?.removeAttribute('style');
    depth.forEach(el=>el.style.removeProperty('--photo-offset'));
    if (reduced.matches) { cancelAnimationFrame(frame); frame=0; return; }
    if ('IntersectionObserver' in window) {
      observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
        if (!isIntersecting || target.hidden) return;
        observer.unobserve(target);
        if(target.contains(document.activeElement)) return;
        const siblings=[...target.parentElement.children];
        const delay=target.matches('.gallery-item,.film-card')?(siblings.indexOf(target)%2)*(compact.matches?60:100):0;
        const animation=target.animate([{opacity:.35,transform:`translateY(${compact.matches?10:20}px)`},{opacity:1,transform:'translateY(0)'}],{duration:compact.matches?420:700,delay,easing:'cubic-bezier(.22,1,.36,1)'});
        animations.add(animation);
        animation.onfinish=()=>animations.delete(animation);
      }),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
      document.querySelectorAll('.section-title,.studio-quote,.film-card,.gallery-item,.service-card').forEach(el=>observer.observe(el));
    }
    schedule();
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('portfolio:filtered',()=>{animations.forEach(a=>a.cancel());animations.clear();schedule();});
  document.addEventListener('focusin',()=>{animations.forEach(a=>{if(a.effect?.target.contains(document.activeElement))a.cancel();});});
  reduced.addEventListener('change',configure);
  compact.addEventListener('change',configure);
  configure();
});
