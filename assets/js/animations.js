/* Short aperture introduction; native scrolling always remains available. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const opening = document.querySelector('.camera-opening');
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.motion-toggle');
  const skip = document.querySelector('.skip-intro');
  const photo = opening?.querySelector('.opening-photo');
  const lens = opening?.querySelector('.opening-lens');
  const gsap = window.gsap;
  let intro, finished = false, paused = false, frame = 0;
  try { paused = sessionStorage.getItem('mh09rs-motion') === 'off'; } catch (_) {}
  const point = (r,a) => `${(300+r*Math.cos(a)).toFixed(2)} ${(300+r*Math.sin(a)).toFixed(2)}`;
  function draw(p) {
    if (!opening) return;
    const aperture = Math.min(1,p/.65), radius = 10+aperture*194;
    opening.querySelectorAll('.iris-blade').forEach((blade,i) => {
      const a=i*Math.PI/4,b=a+Math.PI/4,phase=aperture*.65;
      blade.setAttribute('d',`M${point(210,a)} A210 210 0 0 1 ${point(210,b)} L${point(radius,b+phase)} L${point(radius,a+phase)} Z`);
    });
    const expansion = Math.max(0,(p-.55)/.45);
    const stageRect = opening.getBoundingClientRect(), lensRect = lens.getBoundingClientRect();
    const x = lensRect.left-stageRect.left+lensRect.width/2, y = lensRect.top-stageRect.top+lensRect.height/2;
    const small = radius*lensRect.width/600;
    photo.style.clipPath=`circle(${small+expansion*Math.hypot(opening.clientWidth,opening.clientHeight)}px at ${x}px ${y}px)`;
    lens.style.opacity=String(1-Math.min(1,Math.max(0,(p-.6)/.3)));
  }
  function finish() {
    finished=true;intro?.kill();root.classList.remove('cinematic-js');
    photo?.style.removeProperty('clip-path');
    if(lens) lens.style.display='none';
    if(skip) skip.hidden=true;
  }
  function syncMotion() {
    if(toggle){toggle.hidden=false;toggle.disabled=reduced.matches;toggle.textContent=reduced.matches?'Reduced motion on':paused?'Resume motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused||reduced.matches));}
    if(reduced.matches){finish();photo?.style.removeProperty('transform');}
    else if(paused){intro?.pause();photo?.style.removeProperty('transform');}
    else intro?.resume();
  }
  function updateScroll() {
    frame=0; header?.classList.toggle('is-scrolled',scrollY>40);
    if(opening && !finished && scrollY>80) finish();
    if(photo && finished && !paused && !reduced.matches && innerWidth>800 && scrollY<opening.offsetHeight) photo.style.transform=`translate3d(0,${Math.min(scrollY*.12,70)}px,0) scale(1.06)`;
  }
  window.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateScroll);},{passive:true});
  updateScroll();
  if(opening && gsap && !reduced.matches && !paused && scrollY<80){
    const state={p:0}; draw(0); skip.hidden=false;
    intro=gsap.to(state,{p:1,duration:2.2,ease:'power2.inOut',onUpdate:()=>draw(state.p),onComplete:finish});
  }else finish();
  skip?.addEventListener('click',()=>{finish();toggle?.focus({preventScroll:true});});
  toggle?.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('mh09rs-motion',paused?'off':'on');}catch(_){}syncMotion();});
  reduced.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',()=>{if(!finished){if(document.hidden)intro?.pause();else if(!paused&&!reduced.matches)intro?.resume();}});
  syncMotion();
});
