// 方向 A ·「敘事軸」— 秒數輪盤 14 號 Sparkline 敘事波形（Duarte）的 Path-A 降級實作
// 波形由 SVG path 降級為 CSS 階梯線段；戲劇性有損失，這是誠實降級。

// 淺底版（使用者指定不要黑底）：冷調紙灰 + 單一橙，與 B 的暖白、C 的純白區隔
const C = {
  bg: '#F1F2F0', ink: '#14161A', mut: '#4F5358', dim: '#6E7278',
  line: '#DCDEDB', rule: '#BFC3BE', acc: '#D4501A', off: '#8E9294',
};

const br = (s) => String(s).replace(/\n/g, '<br>');

export default {
  id: 'A',
  name: '敘事軸',
  desc: '深墨底 + 單一橙，一條階梯敘事軸貫穿全場',
  fonts: `<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap" rel="stylesheet">`,

  css: `
  body { background:${C.bg}; font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif; }
  /* 等寬字用系統內建款（Windows 有 Consolas、macOS 有 Menlo）——
     PPTX 只保留字型鏈的第一個名稱，用 webfont 會在沒裝字型的機器上 fallback 破版 */
  .mono { font-family:"Consolas","Menlo","Noto Sans TC","Microsoft JhengHei",monospace; font-variant-numeric:tabular-nums; }
  h1,h2,h3 { color:${C.ink}; }
  .kick { font-size:10pt; letter-spacing:0.2em; color:${C.dim}; }
  .h2   { font-size:32pt; font-weight:900; line-height:1.24; letter-spacing:0.01em; color:${C.ink}; }
  .lead { font-size:15pt; font-weight:300; line-height:1.55; color:${C.mut}; }
  .k    { font-size:16pt; font-weight:700; line-height:1.4; color:${C.ink}; }
  .v    { font-size:13pt; font-weight:300; line-height:1.5; color:${C.mut}; }
  .no   { font-size:15pt; font-weight:500; letter-spacing:0.1em; color:${C.acc}; font-variant-numeric:tabular-nums; }
  .num  { font-size:46pt; font-weight:900; line-height:1; color:${C.ink}; font-variant-numeric:tabular-nums; }
  .unit { font-size:13pt; font-weight:400; color:${C.dim}; }
  .lbl  { font-size:12pt; font-weight:300; line-height:1.4; color:${C.mut}; }
  `,

  // ── 共用：頁首 ──
  head(p, ctx) {
    const ch = ctx.chapterOf(p);
    const kick = [ch ? `${ch.no} ${ch.name}` : '', p.stepNo ? `STEP ${p.stepNo}` : '']
      .filter(Boolean).join('　/　');
    const w = Math.round(828 * (ctx.index / ctx.total));
    return `
  <div style="position:absolute; left:64pt; top:46pt; width:600pt;"><p class="mono kick">${kick}</p></div>
  <div style="position:absolute; left:64pt; top:46pt; width:832pt; text-align:right;"><p class="mono kick">${String(ctx.index).padStart(2,'0')} / ${ctx.total}</p></div>
  <div style="position:absolute; left:64pt; top:70pt; width:832pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:64pt; top:69pt; width:${w}pt; height:3pt; background:${C.acc};"></div>`;
  },

  // ── 共用：底部敘事軸縮影 ──
  axis(ctx) {
    const x = 64 + Math.round(828 * ((ctx.index - 1) / (ctx.total - 1)));
    const left = Math.min(x, 890);
    return `
  <div style="position:absolute; left:64pt; top:504pt; width:828pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:${left}pt; top:500pt; width:9pt; height:9pt; background:${C.acc};"></div>`;
  },

  // 圖解以 <img> 嵌入（Path A 規則 4 允許），等比依原生 viewBox 縮放
  img(ctx, name, x, y, w) {
    const [nw, nh] = ctx.dsize(name);
    const h = +(w * nh / nw).toFixed(1);
    return `<img src="../assets/diagrams/${name}.png" style="position:absolute; left:${x}pt; top:${y}pt; width:${w}pt; height:${h}pt;" alt="">`;
  },

  // 在給定的矩形區域內置中並等比塞入圖解（寬高皆不溢出）
  fit(ctx, name, { top, bottom, maxW = 800 }) {
    const [nw, nh] = ctx.dsize(name);
    const availH = bottom - top;
    let w = Math.min(maxW, availH * nw / nh);
    const h = w * nh / nw;
    const x = Math.round(480 - w / 2);
    const y = Math.round(top + (availH - h) / 2);
    return this.img(ctx, name, x, y, +w.toFixed(1));
  },

  title(p) {
    return `
  <div style="position:absolute; left:64pt; top:94pt; width:760pt;"><h2 class="h2">${br(p.title)}</h2></div>
  ${p.lead ? `<div style="position:absolute; left:64pt; top:${p.title.length > 18 ? 178 : 142}pt; width:640pt;"><p class="lead">${p.lead}</p></div>` : ''}`;
  },

  // turn 頁專用：標題不帶 lead（lead 另放在兩欄之上，避免壓到分隔線）
  head0(p, ctx) {
    return `
  <div style="position:absolute; left:64pt; top:94pt; width:760pt;"><h2 class="h2">${br(p.title)}</h2></div>
  ${p.lead ? `<div style="position:absolute; left:64pt; top:150pt; width:640pt;"><p class="lead" style="font-size:13pt;">${p.lead}</p></div>` : ''}`;
  },

  render(p, ctx) {
    const t = this;
    switch (p.type) {

      case 'cover': {
        const segs = [
          [64, 446, 140, C.rule], [204, 438, 140, C.rule], [344, 428, 140, C.rule],
          [484, 420, 140, C.rule], [624, 464, 100, C.off], [724, 396, 172, C.acc],
        ].map(([l, tp, w, c]) => `<div style="position:absolute; left:${l}pt; top:${tp}pt; width:${w}pt; height:2pt; background:${c};"></div>`).join('');
        const conns = [
          [203, 438, 10, C.rule], [343, 428, 12, C.rule], [483, 420, 10, C.rule],
          [623, 420, 46, C.rule], [723, 396, 70, C.acc],
        ].map(([l, tp, h, c]) => `<div style="position:absolute; left:${l}pt; top:${tp}pt; width:2pt; height:${h}pt; background:${c};"></div>`).join('');
        const labels = [[64,'概念'],[204,'場景'],[344,'架構'],[484,'五步方法'],[624,'未達標'],[724,'翻盤']]
          .map(([l, s], i) => `<div style="position:absolute; left:${l}pt; top:482pt; width:150pt;"><p class="mono" style="font-size:10pt; letter-spacing:0.14em; color:${i===5?C.acc:C.dim};">${s}</p></div>`).join('');
        return `
  <div style="position:absolute; left:64pt; top:52pt; width:832pt;"><p class="mono" style="font-size:11pt; font-weight:500; letter-spacing:0.22em; color:${C.acc};">AGENTIC&nbsp;AI&nbsp;SYSTEMS</p></div>
  <div style="position:absolute; left:64pt; top:52pt; width:832pt; text-align:right;"><p class="mono" style="font-size:11pt; letter-spacing:0.18em; color:${C.dim};">內部技術分享&nbsp;/&nbsp;${ctx.total}&nbsp;頁</p></div>
  <div style="position:absolute; left:64pt; top:78pt; width:832pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:64pt; top:150pt; width:800pt;">
    <h1 style="font-size:66pt; font-weight:900; line-height:1.16; letter-spacing:0.01em;">${p.title1}</h1>
    <h1 style="font-size:66pt; font-weight:900; line-height:1.16; letter-spacing:0.01em;">${p.title2}</h1>
  </div>
  <div style="position:absolute; left:64pt; top:318pt; width:620pt;"><p style="font-size:19pt; font-weight:300; line-height:1.6; color:${C.mut};">${p.sub}</p></div>
  ${segs}${conns}
  <div style="position:absolute; left:718pt; top:390pt; width:13pt; height:13pt; background:${C.acc};"></div>
  <div style="position:absolute; left:619pt; top:459pt; width:11pt; height:11pt; background:${C.off};"></div>
  ${labels}`;
      }

      case 'bullets': {
        // 版面由可用高度反推行距，不寫死常數——否則行數變多或有頁尾帶時會疊字
        const hasBand = !!(p.logos || p.footer);
        const areaTop = p.lead ? 206 : 182;
        const n = p.items.length;
        // 有圖時：條列走緊湊固定行高，把下半場讓給圖（圖是主角，不是插圖）
        // 圖解頁：條目排成雙欄，行數減半，把高度讓給圖（圖是主角）
        const twoCol = !!p.diagram && !p.diagramOnly && n >= 4;
        const rowsCount = twoCol ? Math.ceil(n / 2) : n;
        const rowH = twoCol ? 48 : (p.diagram ? 34 : ((hasBand ? 414 : 488) - areaTop) / n);
        const areaBot = p.diagramOnly ? areaTop - 14
          : (p.diagram ? areaTop + rowsCount * rowH : (hasBand ? 414 : 488));
        const DIA_H = p.diagramOnly ? 248 : (hasBand ? 400 : 486) - (areaBot + 14);
        const start = p.startNo || 1;
        const numW = p.numbered ? 60 : 0;
        const kX = 64 + numW;
        const kW = p.wideKey || 286;
        const vX = kX + kW + 20;
        const vW = 896 - vX;
        const kSize = p.diagram ? 14 : 16;
        const vSize = p.diagram ? 12 : 13;
        // diagramOnly：圖已完整承載這些條目，再列一次就是重複
        const rows = (p.diagramOnly ? [] : p.items).map((it, i) => {
          if (twoCol) {
            // 雙欄：左右各半，同一列共用一條分隔線
            const col = i % 2, r = Math.floor(i / 2);
            const y = Math.round(areaTop + r * rowH);
            const cx = 64 + col * 428;
            return `
  ${col === 0 ? `<div style="position:absolute; left:64pt; top:${y - 10}pt; width:832pt; height:1pt; background:${C.line};"></div>` : ''}
  <div style="position:absolute; left:${cx}pt; top:${y}pt; width:404pt;" data-pptx-merge="true">
    <p class="k" style="font-size:13.5pt;">${it.k}</p>
    <p class="v" style="font-size:12pt; margin-top:4pt;">${it.v}</p>
  </div>`;
          }
          const y = Math.round(areaTop + i * rowH);
          return `
  <div style="position:absolute; left:64pt; top:${y - (p.diagram ? 9 : 15)}pt; width:832pt; height:1pt; background:${C.line};"></div>
  ${p.numbered ? `<div style="position:absolute; left:64pt; top:${y + 2}pt; width:52pt;"><p class="mono no" style="font-size:${p.diagram ? 13 : 15}pt;">${String(start + i).padStart(2, '0')}</p></div>` : ''}
  <div style="position:absolute; left:${kX}pt; top:${y}pt; width:${kW}pt;"><p class="k" style="font-size:${kSize}pt;">${it.k}</p></div>
  <div style="position:absolute; left:${vX}pt; top:${y + 2}pt; width:${vW}pt;"><p class="v" style="font-size:${vSize}pt;">${it.v}</p></div>`;
        }).join('');
        const logos = p.logos ? `
  <div style="position:absolute; left:64pt; top:428pt; width:832pt; height:1pt; background:${C.rule};"></div>
  <div style="position:absolute; left:64pt; top:444pt; width:200pt;"><p class="mono kick" style="color:${C.acc};">${p.kicker || ''}</p></div>
  ${p.logos.map((g, i) => `
  <div style="position:absolute; left:${280 + i * 210}pt; top:440pt; width:200pt; height:30pt;">
    ${g.src ? `<img src="../assets/${g.src}" style="width:19pt; height:19pt; opacity:0.85;" alt="">` : ''}
  </div>
  <div style="position:absolute; left:${280 + i * 210 + (g.src ? 27 : 0)}pt; top:${g.src ? 444 : 440}pt; width:180pt;"><p style="font-size:12pt; color:${C.mut};">${g.text ? `<span class="mono" style="color:${C.ink};">${g.text}</span>　` : ''}${g.name}</p></div>`).join('')}` : '';
        const footer = (p.footer && !p.logos) ? `
  <div style="position:absolute; left:64pt; top:432pt; width:832pt; height:1pt; background:${C.acc};"></div>
  <div style="position:absolute; left:64pt; top:448pt; width:832pt;" data-pptx-merge="true">
    ${p.kicker ? `<p class="mono kick" style="color:${C.acc};">${p.kicker}</p>` : ''}
    <p style="font-size:15pt; font-weight:500; line-height:1.5; color:${C.ink}; margin-top:${p.kicker ? 6 : 0}pt;">${p.footer}</p>
  </div>` : '';
        const diaTop = areaBot + 16;
        const dia = p.diagram ? `
  <div style="position:absolute; left:64pt; top:${diaTop - 12}pt; width:832pt; height:1pt; background:${C.line};"></div>` +
          t.fit(ctx, p.diagram, { top: diaTop, bottom: diaTop + DIA_H, maxW: 812 }) : '';
        return t.head(p, ctx) + t.title(p) + rows + dia + logos + footer + t.axis(ctx);
      }

      case 'split': {
        const strip = (name, x) => (p.diagrams ? t.img(ctx, name, x, 148, 380) : '');
        const col = (c, x, on) => `
  <div style="position:absolute; left:${x}pt; top:238pt; width:396pt; height:3pt; background:${on ? C.acc : C.rule};"></div>
  <div style="position:absolute; left:${x}pt; top:252pt; width:396pt;"><p style="font-size:18pt; font-weight:700; color:${on ? C.acc : C.dim};">${c.label}</p></div>
  ${c.items.map((s, i) => `
  <div style="position:absolute; left:${x}pt; top:${292 + i * 35}pt; width:396pt;">
    <p style="font-size:13.5pt; font-weight:${on ? 500 : 300}; line-height:1.4; color:${on ? C.ink : C.mut};">${s}</p>
  </div>
  <div style="position:absolute; left:${x}pt; top:${292 + i * 35 + 26}pt; width:396pt; height:1pt; background:${C.line};"></div>`).join('')}`;
        return t.head(p, ctx) + t.title(p) +
          strip(p.diagrams?.left, 64) + strip(p.diagrams?.right, 500) +
          col(p.left, 64, false) + col(p.right, 500, true) + t.axis(ctx);
      }

      case 'flow': {
        const notes = p.notes.map((nt, i) => `
  <div style="position:absolute; left:${64 + i * 420}pt; top:${i === 0 ? 424 : 424}pt; width:400pt;" data-pptx-merge="true">
    <p class="mono kick" style="color:${C.acc};">${nt.k}</p>
    <p style="font-size:14pt; font-weight:300; line-height:1.5; color:${C.mut}; margin-top:8pt;">${nt.v}</p>
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) +
          t.img(ctx, p.diagram, 120, 208, 720) + `
  <div style="position:absolute; left:64pt; top:408pt; width:832pt; height:1pt; background:${C.line};"></div>` +
          notes + t.axis(ctx);
      }

      case 'steps': {
        const w = 156, gap = 12;
        const cols = p.steps.map((s, i) => `
  <div style="position:absolute; left:${64 + i * (w + gap)}pt; top:250pt; width:${w}pt; height:4pt; background:${C.acc};"></div>
  <div style="position:absolute; left:${64 + i * (w + gap)}pt; top:268pt; width:${w}pt;" data-pptx-merge="true">
    <p class="mono" style="font-size:26pt; font-weight:500; line-height:1; color:${C.acc};">${s.no}</p>
    <p style="font-size:16pt; font-weight:700; line-height:1.45; color:${C.ink}; margin-top:14pt;">${br(s.name)}</p>
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + cols + `
  <div style="position:absolute; left:64pt;  top:400pt; width:2pt; height:22pt; background:${C.rule};"></div>
  <div style="position:absolute; left:894pt; top:400pt; width:2pt; height:22pt; background:${C.rule};"></div>
  <div style="position:absolute; left:64pt;  top:420pt; width:284pt; height:2pt; background:${C.rule};"></div>
  <div style="position:absolute; left:612pt; top:420pt; width:284pt; height:2pt; background:${C.rule};"></div>
  <div style="position:absolute; left:352pt; top:412pt; width:256pt;">
    <p class="mono" style="font-size:10pt; letter-spacing:0.14em; line-height:19pt; color:${C.dim}; text-align:center;">驗證回饋至目標定義</p>
  </div>` + t.axis(ctx);
      }

      case 'stat': {
        const cells = p.stats.map((s, i) => {
          const x = 64 + (i % 4) * 214, y = i < 4 ? 212 : 348;
          return `
  <div style="position:absolute; left:${x}pt; top:${y}pt; width:190pt; height:2pt; background:${s.hero ? C.acc : C.rule};"></div>
  <div style="position:absolute; left:${x}pt; top:${y + 14}pt; width:190pt;" data-pptx-merge="true">
    <p class="num" ${s.text ? 'style="font-size:36pt;"' : ''}>${s.value}${s.unit ? `<span class="unit">&nbsp;${s.unit}</span>` : ''}</p>
    <p class="lbl" style="margin-top:${s.text ? 14 : 10}pt;">${s.label}</p>
  </div>`;
        }).join('');
        return t.head(p, ctx) + `
  <div style="position:absolute; left:64pt; top:96pt; width:600pt;"><h2 class="h2">${p.short}</h2></div>
  <div style="position:absolute; left:64pt; top:146pt; width:560pt;"><p class="lead">${p.lead}</p></div>` + cells + t.axis(ctx);
      }

      case 'case': {
        // 有圖時改為「圖解主導」：圖放上半，文字區塊壓成下方兩欄
        if (p.diagram) {
          const cols = p.blocks.map((b, i) => `
  <div style="position:absolute; left:${64 + i * 432}pt; top:392pt; width:400pt; height:1pt; background:${C.rule};"></div>
  <div style="position:absolute; left:${64 + i * 432}pt; top:406pt; width:400pt;" data-pptx-merge="true">
    <p class="mono kick" style="color:${C.acc};">${b.label}</p>
    ${b.items.map((s) => `<p style="font-size:13pt; font-weight:300; line-height:1.5; color:${C.mut}; margin-top:7pt;">${s}</p>`).join('')}
  </div>`).join('');
          return t.head(p, ctx) + t.title(p) + t.img(ctx, p.diagram, 140, 168, 680) + cols + t.axis(ctx);
        }
        const blocks = p.blocks.map((b, i) => `
  <div style="position:absolute; left:64pt; top:${222 + i * 92}pt; width:832pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:64pt; top:${238 + i * 92}pt; width:220pt;"><p class="mono kick" style="color:${C.acc};">${b.label}</p></div>
  <div style="position:absolute; left:300pt; top:${232 + i * 92}pt; width:596pt;" data-pptx-merge="true">
    ${b.items.map((s, j) => `<p style="font-size:15pt; font-weight:${j === 0 ? 500 : 300}; line-height:1.55; color:${j === 0 ? C.ink : C.mut}; margin-top:${j ? 6 : 0}pt;">${s}</p>`).join('')}
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + blocks + t.axis(ctx);
      }

      case 'turn': {
        const side = (d, x, on) => `
  <div style="position:absolute; left:${x}pt; top:196pt; width:396pt; height:3pt; background:${on ? C.acc : C.off};"></div>
  <div style="position:absolute; left:${x}pt; top:210pt; width:396pt;"><p style="font-size:15pt; font-weight:700; color:${on ? C.acc : C.dim};">${d.label}</p></div>
  <div style="position:absolute; left:${x}pt; top:238pt; width:396pt;" data-pptx-merge="true">
    <p style="font-size:70pt; font-weight:900; line-height:1; color:${on ? C.acc : C.off}; font-variant-numeric:tabular-nums;">${d.score}<span style="font-size:22pt; font-weight:400;">&nbsp;${d.unit}</span></p>
    <p class="lbl" style="margin-top:10pt;">${d.note}</p>
  </div>
  ${d.items.map((s, i) => `
  <div style="position:absolute; left:${x}pt; top:${372 + i * 34}pt; width:396pt;">
    <p style="font-size:13pt; font-weight:300; line-height:1.4; color:${on ? C.ink : C.mut};">${s}</p>
  </div>`).join('')}`;
        const sources = p.sources.map((s, i) => `
  <div style="position:absolute; left:${500 + i * 120}pt; top:${486}pt; width:19pt; height:19pt;"><img src="../assets/${s.src}" style="width:16pt; height:16pt; opacity:0.8;" alt=""></div>
  <div style="position:absolute; left:${500 + i * 120 + 24}pt; top:488pt; width:96pt;"><p style="font-size:11pt; color:${C.dim};">${s.name}</p></div>`).join('');
        return t.head(p, ctx) + t.head0(p) + side(p.before, 64, false) + side(p.after, 500, true) + `
  <div style="position:absolute; left:470pt; top:250pt; width:20pt; height:2pt; background:${C.rule};"></div>
  <div style="position:absolute; left:64pt; top:474pt; width:832pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:64pt; top:486pt; width:400pt;"><p class="mono kick">改進來源</p></div>` + sources;
      }

      case 'closing': {
        const acts = p.actions.map((s, i) => `
  <div style="position:absolute; left:64pt; top:${370 + i * 34}pt; width:52pt;"><p class="mono no">${String(i + 1).padStart(2, '0')}</p></div>
  <div style="position:absolute; left:116pt; top:${368 + i * 34}pt; width:780pt;"><p style="font-size:15pt; font-weight:300; line-height:1.4; color:${C.mut};">${s}</p></div>`).join('');
        return t.head(p, ctx) + t.title(p) + `
  <div style="position:absolute; left:64pt; top:196pt; width:832pt; height:3pt; background:${C.acc};"></div>
  <div style="position:absolute; left:64pt; top:214pt; width:832pt;" data-pptx-merge="true">
    <p class="mono kick" style="color:${C.acc};">${p.keyLabel}</p>
    <p style="font-size:28pt; font-weight:900; line-height:1.35; color:${C.ink}; margin-top:12pt;">${p.key}</p>
  </div>
  <div style="position:absolute; left:64pt; top:330pt; width:832pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:64pt; top:344pt; width:300pt;"><p class="mono kick">${p.actionLabel}</p></div>` + acts + t.axis(ctx);
      }
    }
    return '';
  },
};
