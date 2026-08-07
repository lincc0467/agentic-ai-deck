// 方向 B ·「暖白編輯部」— 現實參照：Anthropic 設計系統
// canvas #F0EEE6 / card #FAF9F5 / clay #D97757 只用於單一最關鍵處 / slate ink #141413 / 無漸層

const C = {
  bg: '#F0EEE6', card: '#FAF9F5', bd: '#E3DFD4', ink: '#141413',
  body: '#5C574E', mut: '#645E52', faint: '#7D7568', hair: '#DCD8CC',
  clay: '#D97757', claySoft: '#B5866E',
};

const br = (s) => String(s).replace(/\n/g, '<br>');
const SER = `"Noto Serif TC","PMingLiU",serif`;

export default {
  id: 'B',
  name: '暖白編輯部',
  desc: '暖白紙感 + 襯線標題 + 左右分欄，全頁只有一處高飽和色',
  fonts: `<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;500;600;700&display=swap" rel="stylesheet">`,

  css: `
  body { background:${C.bg}; font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif; }
  .serif { font-family:${SER}; }
  .h2   { font-family:${SER}; font-size:30pt; font-weight:600; line-height:1.34; color:${C.ink}; }
  .lead { font-size:15pt; font-weight:300; line-height:1.65; color:${C.body}; }
  .kick { font-size:11pt; font-weight:500; letter-spacing:0.16em; color:${C.mut}; }
  .k    { font-family:${SER}; font-size:16pt; font-weight:600; line-height:1.4; color:${C.ink}; }
  .v    { font-size:12.5pt; font-weight:400; line-height:1.55; color:${C.body}; }
  .card { background:${C.card}; border:1pt solid ${C.bd}; border-radius:7pt; }
  .num  { font-family:${SER}; font-size:40pt; font-weight:600; line-height:1; color:${C.ink}; font-variant-numeric:tabular-nums; }
  .unit { font-size:12pt; font-weight:400; color:${C.mut}; }
  .lbl  { font-size:12pt; line-height:1.45; color:${C.mut}; }
  `,

  head(p, ctx) {
    const ch = ctx.chapterOf(p);
    return `
  <div style="position:absolute; left:72pt; top:72pt; width:150pt;"><p class="kick">${ch ? `${ch.no} ${ch.name}` : ''}</p></div>
  ${p.stepNo ? `<div style="position:absolute; left:72pt; top:100pt; width:150pt;"><p style="font-size:11pt; line-height:1.6; color:${C.faint};">STEP ${p.stepNo}</p></div>` : ''}
  <div style="position:absolute; left:72pt; top:452pt; width:150pt;"><p style="font-size:10pt; letter-spacing:0.14em; color:${C.faint};">${String(ctx.index).padStart(2, '0')} / ${ctx.total}</p></div>
  <div style="position:absolute; left:250pt; top:72pt; width:1pt; height:396pt; background:${C.hair};"></div>`;
  },

  title(p) {
    return `
  <div style="position:absolute; left:298pt; top:72pt; width:598pt;"><h2 class="h2">${br(p.title)}</h2></div>
  ${p.lead ? `<div style="position:absolute; left:298pt; top:${p.title.length > 16 ? 152 : 122}pt; width:560pt;"><p class="lead">${p.lead}</p></div>` : ''}`;
  },

  render(p, ctx) {
    const t = this;
    switch (p.type) {

      case 'cover': {
        const chs = ctx.chapters.map((c, i) => `
  <div style="position:absolute; left:${298 + i * 152}pt; top:396pt; width:${i === 3 ? 142 : 140}pt;" data-pptx-merge="true">
    <p style="font-size:10pt; letter-spacing:0.14em; color:${C.faint};">${c.no}</p>
    <p class="serif" style="font-size:14pt; font-weight:500; line-height:1.5; color:${C.ink}; margin-top:8pt;">${c.name}</p>
    <p style="font-size:11pt; line-height:1.55; color:${C.mut}; margin-top:4pt;">${c.blurb}</p>
  </div>`).join('');
        return `
  <div style="position:absolute; left:72pt; top:72pt; width:150pt;"><p class="kick">內部技術分享</p></div>
  <div style="position:absolute; left:72pt; top:104pt; width:150pt;"><p style="font-size:11pt; letter-spacing:0.16em; color:${C.mut};">${ctx.total} 頁 · 約 40 分鐘</p></div>
  <div style="position:absolute; left:72pt; top:412pt; width:26pt; height:26pt; background:${C.clay};"></div>
  <div style="position:absolute; left:72pt; top:452pt; width:150pt;"><p class="serif" style="font-size:13pt; font-weight:500; line-height:1.5; color:${C.ink};">閉環，<br>是這份內容的形狀</p></div>
  <div style="position:absolute; left:250pt; top:72pt; width:1pt; height:396pt; background:${C.hair};"></div>
  <div style="position:absolute; left:298pt; top:118pt; width:600pt;">
    <h1 class="serif" style="font-size:56pt; font-weight:600; line-height:1.26; color:${C.ink};">${p.title1}</h1>
    <h1 class="serif" style="font-size:56pt; font-weight:600; line-height:1.26; color:${C.ink};">${p.title2}</h1>
  </div>
  <div style="position:absolute; left:298pt; top:290pt; width:540pt;"><p style="font-size:17pt; font-weight:300; line-height:1.72; color:${C.body};">${p.sub}</p></div>
  <div style="position:absolute; left:298pt; top:372pt; width:598pt; height:1pt; background:${C.hair};"></div>
  ${chs}`;
      }

      case 'bullets': {
        const top = p.lead ? 196 : 160;
        const gap = p.items.length >= 5 ? 56 : 68;
        const start = p.startNo || 1;
        const rows = p.items.map((it, i) => `
  <div style="position:absolute; left:298pt; top:${top + i * gap - 12}pt; width:598pt; height:1pt; background:${C.hair};"></div>
  ${p.numbered ? `<div style="position:absolute; left:298pt; top:${top + i * gap + 2}pt; width:40pt;"><p class="serif" style="font-size:15pt; font-weight:600; color:${C.clay}; font-variant-numeric:tabular-nums;">${String(start + i).padStart(2, '0')}</p></div>` : ''}
  <div style="position:absolute; left:${p.numbered ? 346 : 298}pt; top:${top + i * gap}pt; width:${p.numbered ? 550 : 598}pt;" data-pptx-merge="true">
    <p class="k">${it.k}</p>
    <p class="v" style="margin-top:5pt;">${it.v}</p>
  </div>`).join('');
        const logos = p.logos ? `
  <div style="position:absolute; left:298pt; top:406pt; width:598pt; height:1pt; background:${C.hair};"></div>
  <div style="position:absolute; left:298pt; top:422pt; width:200pt;"><p class="kick" style="color:${C.clay};">${p.kicker || ''}</p></div>
  ${p.logos.map((g, i) => `
  <div class="card" style="position:absolute; left:${298 + i * 202}pt; top:446pt; width:190pt; height:38pt;"></div>
  ${g.src ? `<div style="position:absolute; left:${312 + i * 202}pt; top:456pt; width:18pt; height:18pt;"><img src="../assets/${g.src}" style="width:18pt; height:18pt;" alt=""></div>` : ''}
  <div style="position:absolute; left:${(g.src ? 338 : 312) + i * 202}pt; top:${g.src ? 458 : 452}pt; width:${g.src ? 140 : 166}pt;"><p style="font-size:11.5pt; line-height:1.4; color:${C.ink};">${g.text ? `<span style="font-weight:700;">${g.text}</span>　` : ''}${g.name}</p></div>`).join('')}` : '';
        const footer = (p.footer && !p.logos) ? `
  <div class="card" style="position:absolute; left:298pt; top:410pt; width:598pt; height:74pt; padding:18pt 22pt;" data-pptx-merge="true">
    ${p.kicker ? `<p class="kick" style="color:${C.clay};">${p.kicker}</p>` : ''}
    <p class="serif" style="font-size:15pt; font-weight:500; line-height:1.5; color:${C.ink}; margin-top:${p.kicker ? 8 : 0}pt;">${p.footer}</p>
  </div>` : '';
        return t.head(p, ctx) + t.title(p) + rows + logos + footer;
      }

      case 'split': {
        const col = (c, x, on) => `
  <div class="card" style="position:absolute; left:${x}pt; top:170pt; width:288pt; height:298pt; ${on ? `border-color:${C.clay};` : ''}"></div>
  <div style="position:absolute; left:${x + 22}pt; top:190pt; width:250pt;"><p class="serif" style="font-size:18pt; font-weight:600; color:${on ? C.clay : C.faint};">${c.label}</p></div>
  <div style="position:absolute; left:${x + 22}pt; top:222pt; width:244pt; height:1pt; background:${C.hair};"></div>
  ${c.items.map((s, i) => `
  <div style="position:absolute; left:${x + 22}pt; top:${238 + i * 38}pt; width:250pt;">
    <p style="font-size:13pt; font-weight:${on ? 500 : 400}; line-height:1.4; color:${on ? C.ink : C.mut};">${s}</p>
  </div>`).join('')}`;
        return t.head(p, ctx) + t.title(p) + col(p.left, 298, false) + col(p.right, 608, true);
      }

      case 'flow': {
        const rows = p.steps.map((s, i) => `
  <div class="card" style="position:absolute; left:${298 + i * 152}pt; top:170pt; width:142pt; height:126pt; padding:16pt;" data-pptx-merge="true">
    <p style="font-size:10pt; letter-spacing:0.14em; color:${C.faint};">0${i + 1}</p>
    <p class="serif" style="font-size:16pt; font-weight:600; line-height:1.35; color:${i === p.steps.length - 1 ? C.clay : C.ink}; margin-top:10pt;">${s.label}</p>
    <p style="font-size:11pt; line-height:1.5; color:${C.mut}; margin-top:8pt;">${s.detail}</p>
  </div>
  ${i < p.steps.length - 1 ? `<div style="position:absolute; left:${298 + i * 152 + 146}pt; top:232pt; width:6pt; height:1pt; background:${C.faint};"></div>` : ''}`).join('');
        const loop = `
  <div style="position:absolute; left:298pt; top:316pt; width:1pt; height:18pt; background:${C.clay};"></div>
  <div style="position:absolute; left:895pt; top:316pt; width:1pt; height:18pt; background:${C.clay};"></div>
  <div style="position:absolute; left:298pt; top:333pt; width:598pt; height:1pt; background:${C.clay};"></div>
  <div style="position:absolute; left:462pt; top:325pt; width:270pt; height:17pt; background:${C.bg};">
    <p style="font-size:10pt; letter-spacing:0.1em; line-height:17pt; color:${C.clay}; text-align:center;">未達成 · 回到目標定義</p>
  </div>`;
        const notes = p.notes.map((nt, i) => `
  <div style="position:absolute; left:${298 + i * 306}pt; top:378pt; width:290pt;" data-pptx-merge="true">
    <p class="kick" style="color:${C.clay};">${nt.k}</p>
    <p style="font-size:13pt; font-weight:300; line-height:1.55; color:${C.body}; margin-top:8pt;">${nt.v}</p>
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + rows + loop + notes;
      }

      case 'steps': {
        const cols = p.steps.map((s, i) => `
  <div class="card" style="position:absolute; left:${298 + i * 121}pt; top:200pt; width:112pt; height:170pt; padding:16pt;" data-pptx-merge="true">
    <p class="serif" style="font-size:22pt; font-weight:600; line-height:1; color:${C.clay}; font-variant-numeric:tabular-nums;">${s.no}</p>
    <p class="serif" style="font-size:14pt; font-weight:600; line-height:1.45; color:${C.ink}; margin-top:16pt;">${br(s.name)}</p>
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + cols + `
  <div style="position:absolute; left:298pt; top:392pt; width:1pt; height:18pt; background:${C.hair};"></div>
  <div style="position:absolute; left:895pt; top:392pt; width:1pt; height:18pt; background:${C.hair};"></div>
  <div style="position:absolute; left:298pt; top:409pt; width:598pt; height:1pt; background:${C.hair};"></div>
  <div style="position:absolute; left:470pt; top:401pt; width:254pt; height:17pt; background:${C.bg};">
    <p style="font-size:10pt; letter-spacing:0.1em; line-height:17pt; color:${C.faint}; text-align:center;">驗證回饋至目標定義</p>
  </div>`;
      }

      case 'stat': {
        const hero = p.stats.find((s) => s.hero);
        const rest = p.stats.filter((s) => !s.hero);
        const cells = rest.map((s, i) => {
          const topRow = i < 2;
          const x = topRow ? 604 + i * 152 : 298 + (i - 2) * 121;
          const y = topRow ? 186 : 330;
          const w = topRow ? 140 : 113;
          return `
  <div class="card" style="position:absolute; left:${x}pt; top:${y}pt; width:${w}pt; height:${topRow ? 130 : 118}pt; padding:${topRow ? 20 : 14}pt;" data-pptx-merge="true">
    <p class="num" style="font-size:${s.text ? (topRow ? 26 : 20) : (topRow ? 40 : 30)}pt;">${s.value}${s.unit ? `<span class="unit" style="font-size:${topRow ? 12 : 10}pt;">&nbsp;${s.unit}</span>` : ''}</p>
    <p class="lbl" style="margin-top:${topRow ? 12 : 10}pt; font-size:${topRow ? 12 : 10.5}pt;">${s.label}</p>
  </div>`;
        }).join('');
        return t.head(p, ctx) + `
  <div style="position:absolute; left:298pt; top:72pt; width:598pt;"><h2 class="h2">${br(p.title)}</h2></div>
  <div class="card" style="position:absolute; left:298pt; top:186pt; width:286pt; height:130pt; padding:22pt 24pt;" data-pptx-merge="true">
    <p class="serif" style="font-size:64pt; font-weight:600; line-height:1; color:${C.clay}; font-variant-numeric:tabular-nums;">${hero.value}<span style="font-family:'Noto Sans TC',sans-serif; font-size:16pt; font-weight:400; color:${C.claySoft};">&nbsp;${hero.unit}</span></p>
    <p class="lbl" style="margin-top:16pt;">${hero.label}</p>
  </div>` + cells;
      }

      case 'case': {
        const blocks = p.blocks.map((b, i) => `
  <div style="position:absolute; left:298pt; top:${186 + i * 96}pt; width:598pt; height:1pt; background:${C.hair};"></div>
  <div style="position:absolute; left:298pt; top:${202 + i * 96}pt; width:160pt;"><p class="kick" style="color:${C.clay};">${b.label}</p></div>
  <div style="position:absolute; left:474pt; top:${196 + i * 96}pt; width:422pt;" data-pptx-merge="true">
    ${b.items.map((s, j) => `<p class="${j === 0 ? 'k' : 'v'}" style="margin-top:${j ? 7 : 0}pt;">${s}</p>`).join('')}
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + blocks;
      }

      case 'turn': {
        const side = (d, x, on) => `
  <div class="card" style="position:absolute; left:${x}pt; top:160pt; width:288pt; height:262pt; ${on ? `border-color:${C.clay};` : ''}"></div>
  <div style="position:absolute; left:${x + 22}pt; top:180pt; width:250pt;"><p class="kick" style="color:${on ? C.clay : C.faint};">${d.label}</p></div>
  <div style="position:absolute; left:${x + 22}pt; top:206pt; width:250pt;" data-pptx-merge="true">
    <p class="serif" style="font-size:62pt; font-weight:600; line-height:1; color:${on ? C.clay : C.faint}; font-variant-numeric:tabular-nums;">${d.score}<span style="font-family:'Noto Sans TC',sans-serif; font-size:18pt; font-weight:400;">&nbsp;${d.unit}</span></p>
    <p class="lbl" style="margin-top:10pt;">${d.note}</p>
  </div>
  <div style="position:absolute; left:${x + 22}pt; top:314pt; width:244pt; height:1pt; background:${C.hair};"></div>
  ${d.items.map((s, i) => `
  <div style="position:absolute; left:${x + 22}pt; top:${330 + i * 30}pt; width:250pt;">
    <p style="font-size:12pt; font-weight:400; line-height:1.4; color:${on ? C.ink : C.mut};">${s}</p>
  </div>`).join('')}`;
        return t.head(p, ctx) + t.title(p) + side(p.before, 298, false) + side(p.after, 608, true) + `
  <div style="position:absolute; left:298pt; top:440pt; width:160pt;"><p class="kick" style="color:${C.faint};">改進來源</p></div>
  ${p.sources.map((s, i) => `
  <div style="position:absolute; left:${420 + i * 130}pt; top:438pt; width:16pt; height:16pt;"><img src="../assets/${s.src}" style="width:16pt; height:16pt;" alt=""></div>
  <div style="position:absolute; left:${444 + i * 130}pt; top:440pt; width:106pt;"><p style="font-size:11pt; color:${C.mut};">${s.name}</p></div>`).join('')}`;
      }

      case 'closing': {
        const acts = p.actions.map((s, i) => `
  <div style="position:absolute; left:298pt; top:${356 + i * 32}pt; width:34pt;"><p class="serif" style="font-size:13pt; font-weight:600; color:${C.clay}; font-variant-numeric:tabular-nums;">${String(i + 1).padStart(2, '0')}</p></div>
  <div style="position:absolute; left:340pt; top:${354 + i * 32}pt; width:556pt;"><p style="font-size:13.5pt; font-weight:400; line-height:1.45; color:${C.body};">${s}</p></div>`).join('');
        return t.head(p, ctx) + t.title(p) + `
  <div class="card" style="position:absolute; left:298pt; top:150pt; width:598pt; height:118pt; padding:24pt 26pt;" data-pptx-merge="true">
    <p class="kick" style="color:${C.clay};">${p.keyLabel}</p>
    <p class="serif" style="font-size:26pt; font-weight:600; line-height:1.4; color:${C.ink}; margin-top:12pt;">${p.key}</p>
  </div>
  <div style="position:absolute; left:298pt; top:310pt; width:598pt; height:1pt; background:${C.hair};"></div>
  <div style="position:absolute; left:298pt; top:324pt; width:300pt;"><p class="kick">${p.actionLabel}</p></div>` + acts;
      }
    }
    return '';
  },
};
