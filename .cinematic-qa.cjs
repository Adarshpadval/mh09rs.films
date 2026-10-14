const {chromium}=require('C:/Users/adars/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs=require('fs'),path=require('path'),http=require('http'),os=require('os');
const root=process.cwd();
const server=http.createServer((req,res)=>{
const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
fs.readFile(file,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'text/plain'});res.end(e?'':b);});
});
(async()=>{
await new Promise(r=>server.listen(4173,'127.0.0.1',r));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const shots=os.tmpdir(); const results=[];
async function atProgress(id,p){
 const y=await page.evaluate(({id,p})=>{const t=ScrollTrigger.getById(id);if(!t)throw Error('Missing trigger '+id);return t.start+(t.end-t.start)*p;},{id,p});
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
 await page.waitForTimeout(650);
}
try{
for(const width of [320,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 for(const file of ['index.html','pages/about.html','pages/portfolio.html']){
  await page.goto('http://127.0.0.1:4173/'+file);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(150);
  const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,items:document.querySelectorAll('.gallery-item').length,broken:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.src)}));
  if(state.overflow||state.h1!==1||state.broken.length)throw Error(JSON.stringify({width,file,state}));
  results.push({width,file,...state});
 }
}
await page.setViewportSize({width:1440,height:1000});
await page.goto('http://127.0.0.1:4173/index.html');await page.evaluate(()=>document.fonts.ready);
const blade0=await page.locator('.iris-blade').first().getAttribute('d');
await atProgress('camera-opening',0);
await page.screenshot({path:path.join(shots,'mh09rs-lens-closed.png')});
await atProgress('camera-opening',.35);
const blade1=await page.locator('.iris-blade').first().getAttribute('d');
if(blade0===blade1)throw Error('Aperture blades did not move');
await page.screenshot({path:path.join(shots,'mh09rs-lens-opening.png')});
await atProgress('camera-opening',.95);
if(await page.locator('.opening-lens').evaluate(el=>+getComputedStyle(el).opacity)>.05)throw Error('Lens did not transition out');
await page.screenshot({path:path.join(shots,'mh09rs-lens-photo.png')});
await atProgress('camera-opening',.1);
if(await page.locator('.opening-lens').evaluate(el=>+getComputedStyle(el).opacity)<.95)throw Error('Lens reverse failed');
await atProgress('film-transport-0',.7);
if(await page.locator('.reel-track').evaluate(el=>getComputedStyle(el).transform)==='none')throw Error('Reel did not move');
await page.screenshot({path:path.join(shots,'mh09rs-film-transport.png')});
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
if(await page.evaluate(()=>ScrollTrigger.getAll().length)!==0)throw Error('Reduced motion did not clean triggers');
if(await page.locator('.opening-photo').evaluate(el=>getComputedStyle(el).clipPath)!=='none')throw Error('Reduced motion photo clipped');
if(await page.locator('.reel-window').first().getAttribute('tabindex')!=='0')throw Error('Static reel not keyboard accessible');
await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(200);
await atProgress('camera-opening',.3);
await page.locator('.motion-toggle').click();
if(await page.evaluate(()=>document.documentElement.classList.contains('cinematic-js')))throw Error('Motion pause failed');
await page.locator('.motion-toggle').click();
if(!await page.evaluate(()=>document.documentElement.classList.contains('cinematic-js')))throw Error('Motion resume failed');
await page.goto('http://127.0.0.1:4173/pages/portfolio.html');await page.evaluate(()=>document.fonts.ready);
await page.locator('[data-filter="weddings"]').click();await page.waitForTimeout(200);
if(await page.locator('.gallery-item:visible').count()!==3)throw Error('Filter failed');
if(await page.evaluate(()=>ScrollTrigger.getAll().filter(t=>t.vars.id?.startsWith('gallery-develop')).length)!==3)throw Error('Filter trigger rebuild failed');
await page.locator('.gallery-item:visible').first().click();
if(!await page.locator('dialog').evaluate(el=>el.open))throw Error('Lightbox failed');
await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');
await page.locator('[data-filter="all"]').click();await page.waitForTimeout(200);
if(await page.locator('.gallery-item:visible').count()!==12)throw Error('Lost portfolio items');
await atProgress('gallery-develop-0',1);
await page.screenshot({path:path.join(shots,'mh09rs-portfolio-scene.png')});
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:4173/index.html');await page.evaluate(()=>document.fonts.ready);
await atProgress('camera-opening',.3);
await page.screenshot({path:path.join(shots,'mh09rs-lens-mobile.png')});
await page.locator('.menu-toggle').click();if(await page.locator('.mobile-nav').isHidden())throw Error('Menu failed');
await page.keyboard.press('Escape');
const nojs=await browser.newContext({javaScriptEnabled:false});
const staticPage=await nojs.newPage();await staticPage.goto('http://127.0.0.1:4173/index.html');
if(await staticPage.locator('.opening-photo').evaluate(el=>getComputedStyle(el).clipPath)!=='none')throw Error('No-JS fallback clipped');
const blocked=await browser.newContext();const fallback=await blocked.newPage();
await fallback.route('**/vendor/**',route=>route.abort());
await fallback.goto('http://127.0.0.1:4173/index.html');
if(await fallback.evaluate(()=>document.documentElement.classList.contains('cinematic-js')))throw Error('Library failure fallback failed');
await page.setViewportSize({width:844,height:390});
if(await page.evaluate(()=>document.documentElement.classList.contains('cinematic-js')))throw Error('Landscape fallback failed');
console.log(JSON.stringify({results,errors,interactions:'aperture, reversal, transport, reduced motion, pause, filters, dialog, menu, no-JS, blocked vendor, landscape: PASS',screenshots:shots},null,2));
if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
