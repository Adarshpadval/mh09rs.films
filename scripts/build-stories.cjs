/* Regenerate homepage film cards after editing assets/data/stories.json. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const write = (name, content) => fs.writeFileSync(path.join(root, name), content);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stories = JSON.parse(read('assets/data/stories.json'));
let home = read('index.html');
function image(name, prefix, className='', eager=false) {
  const variants = fs.readdirSync(path.join(root,'assets/images/optimized')).filter(f => f.startsWith(name+'-') && f.endsWith('.webp'));
  const srcset = variants.map(f => `${prefix}assets/images/optimized/${f} ${f.match(/-(\d+)\.webp$/)[1]}w`).join(', ');
  return `<img class="${className}" src="${prefix}assets/images/${escape(name)}.jpg" srcset="${srcset}" sizes="(max-width:600px) 100vw, 60vw" width="1200" height="800" loading="${eager?'eager':'lazy'}" ${eager?'fetchpriority="high"':''} decoding="async" alt="${escape(name.replaceAll('-',' '))} — sample collection photograph">`;
}
const cards = stories.map((s,i) => `<button type="button" class="film-card film-card-${['large','medium','wide'][i]}" data-film="${escape(s.video)}" data-film-title="${escape(s.title)}" aria-label="Watch ${escape(s.title)}">${image(s.cover,'','film-card-thumb')}<span class="film-card-overlay"><span class="film-card-top"><span class="film-badge">${escape(s.kind)}</span><span aria-hidden="true">&#9655;</span></span><span class="film-card-bottom"><span class="film-title">${escape(s.title)}</span><span class="film-meta-details">${escape(s.location)} &middot; ${s.demo?'Sample story':'Wedding story'}</span></span></span></button>`).join('\n');
home = home.replace(/<!-- story-cards:start -->[\s\S]*?<!-- story-cards:end -->/,`<!-- story-cards:start --><div class="featured-films-grid">${cards}</div><!-- story-cards:end -->`);
write('index.html',home);
console.log(`Updated ${stories.length} homepage film cards.`);
