// Run with sharp available, or pass its installed module path as the first argument.
// Originals stay untouched. Output widths never exceed the source dimensions.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.argv[2] || 'sharp');
const source = path.resolve(__dirname, '../assets/images');
const destination = path.join(source, 'optimized');
(async () => {
  await fs.mkdir(destination, { recursive: true });
  const results = [];
  for (const file of (await fs.readdir(source)).filter(file => /\.jpg$/i.test(file))) {
    const input = path.join(source, file);
    const meta = await sharp(input).metadata();
    const widths = [...new Set([480, 960, 1440].map(width => Math.min(width, meta.width)))];
    const variants = [];
    for (const width of widths) {
      const name = path.basename(file, '.jpg') + '-' + width + '.webp';
      const info = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toFile(path.join(destination, name));
      variants.push({ file: name, width: info.width, bytes: info.size });
    }
    results.push({ file, width: meta.width, height: meta.height, originalBytes: (await fs.stat(input)).size, variants });
  }
  console.log(JSON.stringify(results));
})().catch(error => { console.error(error); process.exitCode = 1; });
