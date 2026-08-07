// shoot.mjs — 一個瀏覽器實例截完三套 deck 全部頁面，兼作概覽牆縮圖
// 用法：node shoot.mjs [A|B|C ...]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['A', 'B', 'C'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });

let errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

let n = 0;
for (const id of ids) {
  const slidesDir = path.join(ROOT, 'decks', id, 'slides');
  const outDir = path.join(ROOT, 'decks', id, 'thumbs');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(slidesDir).filter((x) => x.endsWith('.html')).sort()) {
    await page.goto(pathToFileURL(path.join(slidesDir, f)).href, { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    // 溢出檢查：內容不得超出 960×540pt 畫布
    const over = await page.evaluate(() => {
      const w = document.body.scrollWidth, h = document.body.scrollHeight;
      return (w > document.body.clientWidth + 2 || h > document.body.clientHeight + 2) ? { w, h } : null;
    });
    if (over) errors.push(`${id}/${f} 溢出 ${over.w}×${over.h}px`);
    await page.screenshot({ path: path.join(outDir, f.replace('.html', '.png')) });
    n++;
  }
}

await browser.close();
console.log(`截圖完成：${n} 張`);
if (errors.length) { console.log('⚠️ 問題:'); errors.forEach((e) => console.log('  ' + e)); }
else console.log('無 pageerror、無溢出');
