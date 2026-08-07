// render-diagrams.mjs — SVG 原始檔 → 高解析 PNG（3x），供投影片以 <img> 嵌入
// 用法：node render-diagrams.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { DIAGRAMS } from './diagrams.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'assets', 'diagrams');
fs.mkdirSync(OUT, { recursive: true });

const SCALE = 3;
const browser = await chromium.launch();

for (const [name, svg] of Object.entries(DIAGRAMS)) {
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg, 'utf8');

  const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const w = Math.ceil(parseFloat(m[1])), h = Math.ceil(parseFloat(m[2]));

  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: SCALE,
  });
  await page.setContent(`<!DOCTYPE html><html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0}html,body{width:${w}px;height:${h}px;background:transparent}svg{display:block}</style>
</head><body>${svg}</body></html>`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), omitBackground: true });
  await page.close();
  console.log(`${name}  ${w}×${h}pt  →  ${w * SCALE}×${h * SCALE}px`);
}

await browser.close();
