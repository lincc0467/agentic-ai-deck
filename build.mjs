// build.mjs — 一份內容 × 三個設計方向 → 三套完整 20 頁 deck
// 用法：node build.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, CHAPTERS } from './content.js';
import { DIAGRAMS } from './diagrams.mjs';
import themeA from './themes/theme-a.js';
import themeB from './themes/theme-b.js';
import themeC from './themes/theme-c.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'skills', 'huashu-design');
const THEMES = [themeA, themeB, themeC];

const W = 1280, H = 720;   // 960pt × 540pt @ 96dpi

const shell = (theme, page, body, idx) => `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<title>${String(idx).padStart(2, '0')} · ${page.title || page.title1 || '封面'}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${theme.fonts}
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:960pt; height:540pt; position:relative; overflow:hidden; -webkit-font-smoothing:antialiased; }
  h1,h2,h3,h4,h5,h6,p { font-weight:inherit; }
${theme.css}
</style>
</head>
<body>
${body}
</body>
</html>
`;

// ── deck_index.html 拼接器：直接沿用 skill 的成品，只改 MANIFEST 與尺寸 ──
function buildIndex(theme, files) {
  const src = path.join(SKILL, 'assets', 'deck_index.html');
  let html = fs.readFileSync(src, 'utf8');
  const manifest = files
    .map((f) => `    { file: "slides/${f.file}", label: ${JSON.stringify(f.label)} },`)
    .join('\n');
  html = html.replace(
    /window\.DECK_MANIFEST = \[[\s\S]*?\];/,
    `window.DECK_MANIFEST = [\n${manifest}\n  ];`
  );
  html = html.replace(/window\.DECK_WIDTH = \d+;/, `window.DECK_WIDTH = ${W};`);
  html = html.replace(/window\.DECK_HEIGHT = \d+;/, `window.DECK_HEIGHT = ${H};\n  window.DECK_OVERVIEW = 'grid';   // 鎖定淺色網格概覽（使用者指定不要黑底）`);
  // 演示模式的四周襯底同樣去黑
  html = html.replace(/background: #0a0a0a;/g, 'background: #E9EAE7;');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>智能體 AI 系統設計與應用 · 方向${theme.id} ${theme.name}</title>`);
  // 繁中硬規定：外殼字型鏈不得出現 SC，介面文字一律繁體
  html = html.replace(/"PingFang SC"/g, '"PingFang TC", "Microsoft JhengHei"');
  const UI = [
    ['Overview · 点击任意页进入演示', '概覽 · 點擊任一頁進入演示'],
    ['Infinite Gallery · 悬停暂停 · 点击任意页进入演示', '無限畫廊 · 停留暫停 · 點擊任一頁進入演示'],
    ['▶ 开始演示', '▶ 開始演示'],
    ['⊞ 概览', '⊞ 概覽'],
  ];
  for (const [zh, tw] of UI) html = html.split(zh).join(tw);
  return html;
}

// 圖解原生尺寸（直接讀 SVG 的 viewBox，版面只需給寬度即可等比縮放）
const DSIZE = Object.fromEntries(Object.entries(DIAGRAMS).map(([k, svg]) => {
  const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  return [k, [parseFloat(m[1]), parseFloat(m[2])]];
}));

const ctxFor = (i) => ({
  index: i + 1,
  total: PAGES.length,
  chapters: CHAPTERS,
  chapterOf: (p) => CHAPTERS.find((c) => c.id === p.ch) || null,
  dsize: (name) => DSIZE[name] || (() => { throw new Error(`未知圖解：${name}`); })(),
});

let report = [];

for (const theme of THEMES) {
  const dir = path.join(ROOT, 'decks', theme.id);
  const slidesDir = path.join(dir, 'slides');
  const assetsDir = path.join(dir, 'assets');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(slidesDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });

  // 每套 deck 自帶資產副本（含 diagrams/ 子目錄）→ 整個資料夾可獨立搬移
  fs.cpSync(path.join(ROOT, 'assets'), assetsDir, { recursive: true });

  const files = [];
  PAGES.forEach((p, i) => {
    const ctx = ctxFor(i);
    const body = theme.render(p, ctx);
    if (!body) throw new Error(`方向${theme.id} 第 ${i + 1} 頁（type=${p.type}）沒有輸出`);
    const name = `${String(i + 1).padStart(2, '0')}-${p.type}.html`;
    fs.writeFileSync(path.join(slidesDir, name), shell(theme, p, body, i + 1), 'utf8');
    files.push({ file: name, label: p.short || p.title || `${p.title1}${p.title2}` });
  });

  fs.writeFileSync(path.join(dir, 'index.html'), buildIndex(theme, files), 'utf8');
  report.push(`方向${theme.id} · ${theme.name}　→　${files.length} 頁 + 概覽牆`);
}

// ── 根目錄：三版入口 ──
const rootIndex = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<title>智能體 AI 簡報改版 · 三個設計方向</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { min-height:100vh; background:#F1F2F0; color:#14161A;
         font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif; padding:64px 72px; }
  h1 { font-size:38px; font-weight:900; letter-spacing:0.01em; }
  .sub { margin-top:12px; font-size:15px; font-weight:300; color:#4F5358; line-height:1.7; }
  .grid { margin-top:44px; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; }
  a.card { display:block; padding:28px 26px; background:#FFFFFF; border:1px solid #DCDEDB;
           border-radius:10px; text-decoration:none; color:inherit; transition:border-color .18s ease; }
  a.card:hover { border-color:#D4501A; }
  .id { font-size:12px; letter-spacing:0.2em; color:#D4501A; }
  .nm { margin-top:14px; font-size:23px; font-weight:700; }
  .ds { margin-top:10px; font-size:13.5px; font-weight:300; color:#4F5358; line-height:1.65; }
  .mt { margin-top:18px; font-size:12px; color:#6E7278; }
  footer { margin-top:48px; font-size:12.5px; color:#6E7278; line-height:1.8; }
</style>
</head>
<body>
  <h1>智能體 AI 系統設計與應用 · 三個設計方向</h1>
  <p class="sub">同一份內容、同一組資產、同樣 20 頁，只換設計邏輯。點進任一版進入概覽牆，按 → 翻頁、ESC 回概覽。</p>
  <div class="grid">
${THEMES.map((t) => `    <a class="card" href="decks/${t.id}/index.html">
      <p class="id">方向 ${t.id}</p>
      <p class="nm">${t.name}</p>
      <p class="ds">${t.desc}</p>
      <p class="mt">${PAGES.length} 頁 · 960×540pt</p>
    </a>`).join('\n')}
  </div>
  <footer>全篇繁體中文台灣用語 · 中文字型一律 TC · 版面依 Path A 硬約束撰寫，可直接導出可編輯 PPTX。</footer>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), rootIndex, 'utf8');

console.log(report.join('\n'));
console.log('根目錄入口：index.html');
