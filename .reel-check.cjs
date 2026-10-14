const {chromium}=require('C:/Users/adars/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const server=http.createServer((req,res)=>{
const file=path.resolve('.','.'+decodeURIComponent(req.url.split('?')[0]));
fs.readFile(file,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png'})[path.extname(file)]||'text/plain'});res.end(e?'':b);});
});
(async()=>{
await new Promise(r=>server.listen(4173,'127.0.0.1',r));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:900});
 for(const file of ['index.html','pages/about.html']){
 await page.goto('http://127.0.0.1:4173/'+file);await page.evaluate(()=>document.fonts.ready);
 const metrics=await page.locator('.camera-reel').evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,range:el.offsetHeight-el.querySelector('.reel-stage').offsetHeight,sticky:parseFloat(getComputedStyle(el.querySelector('.reel-stage')).top)}));
 const states=[];
 for(const p of [0,.3,.7,1,.3]){
 await page.evaluate(({m,p})=>scrollTo(0,m.top-m.sticky+m.range*p),{m:metrics,p});
 await page.waitForTimeout(180);
 states.push(await page.locator('.camera-reel').evaluate(el=>({iris:el.style.getPropertyValue('--iris-radius'),offset:el.style.getPropertyValue('--reel-offset'),overflow:document.documentElement.scrollWidth>innerWidth})));
 }
 if(states.some(s=>s.overflow))throw Error('Horizontal overflow '+width+file);
 if(parseFloat(states[0].iris)>10||parseFloat(states[1].iris)<100)throw Error('Lens not opening');
 if(parseFloat(states[3].offset)>=parseFloat(states[2].offset))throw Error('Film not advancing');
 if(Math.abs(parseFloat(states[4].offset)-parseFloat(states[1].offset))>2)throw Error('Reverse scroll failed');
 if(width===1440&&file==='index.html'){
 await page.evaluate(({m})=>scrollTo(0,m.top-m.sticky+m.range*.65),{m:metrics});
 await page.waitForTimeout(500);await page.screenshot({path:path.join(os.tmpdir(),'mh09rs-scroll-reel.png')});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);
 const staticState=await page.locator('.camera-reel').evaluate(el=>({running:el.classList.contains('reel-running'),clip:getComputedStyle(el.querySelector('.reel-window')).clipPath,tab:el.querySelector('.reel-window').tabIndex}));
 if(staticState.running||staticState.clip!=='none'||staticState.tab!==0)throw Error('Reduced motion failed');
 await page.emulateMedia({reducedMotion:'no-preference'});
 console.log(width+' '+file+': lens, film advance, reverse, overflow and reduced motion PASS');
 }
}
if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
