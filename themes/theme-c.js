// 方向 C ·「系統網格」— 最佳設計師：Otl Aicher（慕尼黑 1972 視覺系統）
// 嚴格模組網格 + 色彩即編碼：章節、資料分類都由色彩承載，零裝飾。

const C = {
  bg: '#FFFFFF', ink: '#1A1A1A', body: '#4A4A4A', mut: '#6E6E6E',
  line: '#D8D8D8', soft: '#F2F2F2',
};
const CH = { c1: '#2E6DA4', c2: '#5E9B47', c3: '#7B5EA7', c4: '#E08A2E' };
const GROUP = { 規模: '#2E6DA4', 產出: '#5E9B47', 品質: '#E08A2E', 效率: '#7B5EA7' };
const RAMP = ['#2E6DA4', '#3D8A96', '#5E9B47', '#E08A2E', '#7B5EA7'];

const br = (s) => String(s).replace(/\n/g, '<br>');

export default {
  id: 'C',
  name: '系統網格',
  desc: '白底嚴格網格 + 色彩即編碼，章節與資料分類都靠顏色說話',
  fonts: `<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap" rel="stylesheet">`,

  css: `
  body { background:${C.bg}; font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif; }
  .cap  { font-size:10pt; font-weight:500; letter-spacing:0.2em; color:${C.mut}; }
  .h2   { font-size:28pt; font-weight:700; line-height:1.35; color:${C.ink}; }
  .lead { font-size:15pt; font-weight:300; line-height:1.6; color:${C.body}; }
  .k    { font-size:15.5pt; font-weight:700; line-height:1.4; color:${C.ink}; }
  .v    { font-size:12.5pt; font-weight:400; line-height:1.5; color:${C.body}; }
  .key  { font-size:9pt; font-weight:500; letter-spacing:0.16em; }
  .num  { font-size:42pt; font-weight:700; line-height:1; color:${C.ink}; font-variant-numeric:tabular-nums; }
  .unit { font-size:13pt; font-weight:400; color:${C.mut}; }
  .lbl  { font-size:12pt; font-weight:400; line-height:1.45; color:${C.body}; }
  `,

  color(p, ctx) {
    const ch = ctx.chapterOf(p);
    return ch ? CH[ch.id] : CH.c1;
  },

  head(p, ctx) {
    const ch = ctx.chapterOf(p);
    const c = this.color(p, ctx);
    const kick = [ch ? `${ch.no} ${ch.name}` : '', p.stepNo ? `STEP ${p.stepNo}` : ''].filter(Boolean).join('　·　');
    return `
  <div style="position:absolute; left:0; top:0; width:40pt; height:540pt; background:${c};"></div>
  <div style="position:absolute; left:88pt; top:52pt; width:560pt;"><p class="cap">${kick}</p></div>
  <div style="position:absolute; left:648pt; top:52pt; width:268pt; text-align:right;"><p class="cap">${ctx.index} / ${ctx.total}</p></div>
  <div style="position:absolute; left:88pt; top:76pt; width:828pt; height:2pt; background:${C.ink};"></div>`;
  },

  title(p) {
    return `
  <div style="position:absolute; left:88pt; top:104pt; width:760pt;"><h2 class="h2">${br(p.title)}</h2></div>
  ${p.lead ? `<div style="position:absolute; left:88pt; top:${p.title.length > 16 ? 190 : 152}pt; width:640pt;"><p class="lead">${p.lead}</p></div>` : ''}`;
  },

  render(p, ctx) {
    const t = this;
    const c = t.color(p, ctx);

    switch (p.type) {

      case 'cover': {
        const band = ctx.chapters.map((ch, i) => `
  <div style="position:absolute; left:0; top:${i * 135}pt; width:40pt; height:135pt; background:${CH[ch.id]};"></div>`).join('');
        const steps = [
          { no: '01', name: '定義目標\n與範圍' }, { no: '02', name: '任務分解\n與策略' },
          { no: '03', name: '建構推理\n引擎' }, { no: '04', name: '整合工具\n與 API' },
          { no: '05', name: '驗證與\n回饋循環' },
        ].map((s, i) => `
  <div style="position:absolute; left:${88 + i * 168}pt; top:398pt; width:156pt; height:5pt; background:${RAMP[i]};"></div>
  <div style="position:absolute; left:${88 + i * 168}pt; top:414pt; width:156pt;" data-pptx-merge="true">
    <p style="font-size:22pt; font-weight:700; line-height:1; color:${RAMP[i]}; font-variant-numeric:tabular-nums;">${s.no}</p>
    <p style="font-size:13pt; font-weight:500; line-height:1.45; color:${C.ink}; margin-top:10pt;">${br(s.name)}</p>
  </div>`).join('');
        return band + `
  <div style="position:absolute; left:88pt; top:60pt; width:500pt;"><p class="cap">內部技術分享 · AGENTIC AI</p></div>
  <div style="position:absolute; left:588pt; top:60pt; width:328pt; text-align:right;"><p class="cap">${ctx.total} 頁 / 五步方法 / 一則案例</p></div>
  <div style="position:absolute; left:88pt; top:84pt; width:828pt; height:2pt; background:${C.ink};"></div>
  <div style="position:absolute; left:88pt; top:132pt; width:700pt;">
    <h1 style="font-size:54pt; font-weight:700; line-height:1.2; color:${C.ink};">${p.title1}</h1>
    <h1 style="font-size:54pt; font-weight:700; line-height:1.2; color:${C.ink};">${p.title2}</h1>
  </div>
  <div style="position:absolute; left:88pt; top:284pt; width:580pt;"><p style="font-size:16pt; font-weight:300; line-height:1.65; color:${C.body};">${p.sub}</p></div>
  <div style="position:absolute; left:88pt; top:378pt; width:828pt; height:1pt; background:${C.line};"></div>
  ${steps}
  <div style="position:absolute; left:88pt;  top:482pt; width:2pt; height:22pt; background:#7B5EA7;"></div>
  <div style="position:absolute; left:914pt; top:482pt; width:2pt; height:22pt; background:#7B5EA7;"></div>
  <div style="position:absolute; left:88pt;  top:502pt; width:828pt; height:2pt; background:#7B5EA7;"></div>
  <div style="position:absolute; left:352pt; top:494pt; width:300pt; height:19pt; background:${C.bg};">
    <p style="font-size:10pt; font-weight:500; letter-spacing:0.14em; line-height:19pt; color:#7B5EA7; text-align:center;">閉環 · 驗證結果回饋至目標定義</p>
  </div>`;
      }

      case 'bullets': {
        const top = p.lead ? 232 : 176;
        const gap = p.items.length >= 5 ? 52 : 64;
        const start = p.startNo || 1;
        const rows = p.items.map((it, i) => `
  <div style="position:absolute; left:88pt; top:${top + i * gap}pt; width:${p.numbered ? 44 : 4}pt; ${p.numbered ? '' : `height:${gap - 18}pt; background:${c};`}">
    ${p.numbered ? `<p style="font-size:16pt; font-weight:700; line-height:1; color:${c}; font-variant-numeric:tabular-nums;">${String(start + i).padStart(2, '0')}</p>` : ''}
  </div>
  <div style="position:absolute; left:${p.numbered ? 140 : 108}pt; top:${top + i * gap - 3}pt; width:${p.numbered ? 776 : 808}pt;" data-pptx-merge="true">
    <p class="k">${it.k}</p>
    <p class="v" style="margin-top:5pt;">${it.v}</p>
  </div>`).join('');
        const logos = p.logos ? `
  <div style="position:absolute; left:88pt; top:428pt; width:828pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:88pt; top:444pt; width:200pt;"><p class="key" style="color:${c};">${p.kicker || ''}</p></div>
  ${p.logos.map((g, i) => `
  <div style="position:absolute; left:${248 + i * 224}pt; top:438pt; width:210pt; height:34pt; background:${C.soft};"></div>
  ${g.src ? `<div style="position:absolute; left:${262 + i * 224}pt; top:446pt; width:18pt; height:18pt;"><img src="../assets/${g.src}" style="width:18pt; height:18pt;" alt=""></div>` : ''}
  <div style="position:absolute; left:${(g.src ? 288 : 262) + i * 224}pt; top:${g.src ? 448 : 444}pt; width:${g.src ? 160 : 186}pt;"><p style="font-size:11.5pt; line-height:1.3; color:${C.ink};">${g.text ? `<span style="font-weight:700;">${g.text}</span>　` : ''}${g.name}</p></div>`).join('')}` : '';
        const footer = (p.footer && !p.logos) ? `
  <div style="position:absolute; left:88pt; top:432pt; width:828pt; height:4pt; background:${c};"></div>
  <div style="position:absolute; left:88pt; top:448pt; width:828pt;" data-pptx-merge="true">
    ${p.kicker ? `<p class="key" style="color:${c};">${p.kicker}</p>` : ''}
    <p style="font-size:15pt; font-weight:500; line-height:1.5; color:${C.ink}; margin-top:${p.kicker ? 8 : 0}pt;">${p.footer}</p>
  </div>` : '';
        return t.head(p, ctx) + t.title(p) + rows + logos + footer;
      }

      case 'split': {
        const col = (d, x, on) => `
  <div style="position:absolute; left:${x}pt; top:190pt; width:396pt; height:5pt; background:${on ? c : '#B8B8B8'};"></div>
  <div style="position:absolute; left:${x}pt; top:206pt; width:396pt;"><p style="font-size:18pt; font-weight:700; color:${on ? c : C.mut};">${d.label}</p></div>
  ${d.items.map((s, i) => `
  <div style="position:absolute; left:${x}pt; top:${248 + i * 40}pt; width:396pt;">
    <p style="font-size:13.5pt; font-weight:${on ? 500 : 400}; line-height:1.4; color:${on ? C.ink : C.mut};">${s}</p>
  </div>
  <div style="position:absolute; left:${x}pt; top:${248 + i * 40 + 28}pt; width:396pt; height:1pt; background:${C.line};"></div>`).join('')}`;
        return t.head(p, ctx) + t.title(p) + col(p.left, 88, false) + col(p.right, 520, true);
      }

      case 'flow': {
        const n = p.steps.length, w = 192, gap = 20;
        const items = p.steps.map((s, i) => `
  <div style="position:absolute; left:${88 + i * (w + gap)}pt; top:238pt; width:${w}pt; height:5pt; background:${RAMP[i]};"></div>
  <div style="position:absolute; left:${88 + i * (w + gap)}pt; top:254pt; width:${w}pt;" data-pptx-merge="true">
    <p style="font-size:11pt; font-weight:500; letter-spacing:0.14em; color:${RAMP[i]};">0${i + 1}</p>
    <p style="font-size:18pt; font-weight:700; line-height:1.3; color:${C.ink}; margin-top:10pt;">${s.label}</p>
    <p class="v" style="margin-top:8pt;">${s.detail}</p>
  </div>`).join('');
        const notes = p.notes.map((nt, i) => `
  <div style="position:absolute; left:${88 + i * 420}pt; top:420pt; width:400pt;" data-pptx-merge="true">
    <p class="key" style="color:${c};">${nt.k}</p>
    <p style="font-size:13.5pt; font-weight:300; line-height:1.5; color:${C.body}; margin-top:8pt;">${nt.v}</p>
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + items + `
  <div style="position:absolute; left:88pt;  top:360pt; width:2pt; height:22pt; background:${c};"></div>
  <div style="position:absolute; left:914pt; top:360pt; width:2pt; height:22pt; background:${c};"></div>
  <div style="position:absolute; left:88pt;  top:380pt; width:828pt; height:2pt; background:${c};"></div>
  <div style="position:absolute; left:372pt; top:372pt; width:260pt; height:19pt; background:${C.bg};">
    <p style="font-size:10pt; font-weight:500; letter-spacing:0.12em; line-height:19pt; color:${c}; text-align:center;">未達成 · 回到目標定義</p>
  </div>` + notes;
      }

      case 'steps': {
        const w = 156, gap = 12;
        const cols = p.steps.map((s, i) => `
  <div style="position:absolute; left:${88 + i * (w + gap)}pt; top:250pt; width:${w}pt; height:5pt; background:${RAMP[i]};"></div>
  <div style="position:absolute; left:${88 + i * (w + gap)}pt; top:268pt; width:${w}pt;" data-pptx-merge="true">
    <p style="font-size:24pt; font-weight:700; line-height:1; color:${RAMP[i]}; font-variant-numeric:tabular-nums;">${s.no}</p>
    <p style="font-size:15pt; font-weight:500; line-height:1.45; color:${C.ink}; margin-top:14pt;">${br(s.name)}</p>
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + cols + `
  <div style="position:absolute; left:88pt;  top:400pt; width:2pt; height:22pt; background:${C.line};"></div>
  <div style="position:absolute; left:914pt; top:400pt; width:2pt; height:22pt; background:${C.line};"></div>
  <div style="position:absolute; left:88pt;  top:420pt; width:828pt; height:2pt; background:${C.line};"></div>
  <div style="position:absolute; left:372pt; top:412pt; width:260pt; height:19pt; background:${C.bg};">
    <p style="font-size:10pt; font-weight:500; letter-spacing:0.12em; line-height:19pt; color:${C.mut}; text-align:center;">驗證回饋至目標定義</p>
  </div>`;
      }

      case 'stat': {
        const cells = p.stats.map((s, i) => {
          const x = 88 + (i % 4) * 210, y = i < 4 ? 216 : 352;
          const gc = GROUP[s.group];
          return `
  <div style="position:absolute; left:${x}pt; top:${y}pt; width:198pt; height:4pt; background:${gc};"></div>
  <div style="position:absolute; left:${x}pt; top:${y + 16}pt; width:198pt;" data-pptx-merge="true">
    <p class="key" style="color:${gc};">${s.group}</p>
    <p class="num" style="margin-top:10pt;${s.text ? 'font-size:32pt;' : ''}">${s.value}${s.unit ? `<span class="unit">&nbsp;${s.unit}</span>` : ''}</p>
    <p class="lbl" style="margin-top:${s.text ? 16 : 10}pt;">${s.label}</p>
  </div>`;
        }).join('');
        const legend = Object.entries(GROUP).map(([g, col], i) => `
  <div style="position:absolute; left:${88 + i * 96}pt; top:506pt; width:10pt; height:10pt; background:${col};"></div>
  <div style="position:absolute; left:${104 + i * 96}pt; top:504pt; width:80pt;"><p style="font-size:10pt; color:${C.mut};">${g}</p></div>`).join('');
        return t.head(p, ctx) + t.title(p) + cells + `
  <div style="position:absolute; left:88pt; top:490pt; width:828pt; height:1pt; background:${C.line};"></div>` + legend;
      }

      case 'case': {
        const blocks = p.blocks.map((b, i) => `
  <div style="position:absolute; left:88pt; top:${228 + i * 92}pt; width:828pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:88pt; top:${244 + i * 92}pt; width:180pt;"><p class="key" style="color:${c};">${b.label}</p></div>
  <div style="position:absolute; left:288pt; top:${238 + i * 92}pt; width:628pt;" data-pptx-merge="true">
    ${b.items.map((s, j) => `<p class="${j === 0 ? 'k' : 'v'}" style="margin-top:${j ? 7 : 0}pt;">${s}</p>`).join('')}
  </div>`).join('');
        return t.head(p, ctx) + t.title(p) + blocks;
      }

      case 'turn': {
        const side = (d, x, on) => `
  <div style="position:absolute; left:${x}pt; top:196pt; width:396pt; height:5pt; background:${on ? c : '#B8B8B8'};"></div>
  <div style="position:absolute; left:${x}pt; top:212pt; width:396pt;"><p class="key" style="color:${on ? c : C.mut};">${d.label}</p></div>
  <div style="position:absolute; left:${x}pt; top:236pt; width:396pt;" data-pptx-merge="true">
    <p style="font-size:66pt; font-weight:700; line-height:1; color:${on ? c : '#9A9A9A'}; font-variant-numeric:tabular-nums;">${d.score}<span style="font-size:20pt; font-weight:400;">&nbsp;${d.unit}</span></p>
    <p class="lbl" style="margin-top:10pt;">${d.note}</p>
  </div>
  ${d.items.map((s, i) => `
  <div style="position:absolute; left:${x}pt; top:${360 + i * 32}pt; width:396pt;">
    <p style="font-size:12.5pt; font-weight:400; line-height:1.4; color:${on ? C.ink : C.mut};">${s}</p>
  </div>`).join('')}`;
        return t.head(p, ctx) + t.title(p) + side(p.before, 88, false) + side(p.after, 520, true) + `
  <div style="position:absolute; left:88pt; top:476pt; width:828pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:88pt; top:490pt; width:160pt;"><p class="key" style="color:${C.mut};">改進來源</p></div>
  ${p.sources.map((s, i) => `
  <div style="position:absolute; left:${228 + i * 130}pt; top:488pt; width:16pt; height:16pt;"><img src="../assets/${s.src}" style="width:16pt; height:16pt;" alt=""></div>
  <div style="position:absolute; left:${252 + i * 130}pt; top:490pt; width:106pt;"><p style="font-size:11pt; color:${C.mut};">${s.name}</p></div>`).join('')}`;
      }

      case 'closing': {
        const acts = p.actions.map((s, i) => `
  <div style="position:absolute; left:88pt; top:${362 + i * 34}pt; width:40pt;"><p style="font-size:14pt; font-weight:700; color:${c}; font-variant-numeric:tabular-nums;">${String(i + 1).padStart(2, '0')}</p></div>
  <div style="position:absolute; left:136pt; top:${360 + i * 34}pt; width:780pt;"><p style="font-size:14pt; font-weight:400; line-height:1.45; color:${C.body};">${s}</p></div>`).join('');
        return t.head(p, ctx) + t.title(p) + `
  <div style="position:absolute; left:88pt; top:186pt; width:828pt; height:5pt; background:${c};"></div>
  <div style="position:absolute; left:88pt; top:206pt; width:828pt;" data-pptx-merge="true">
    <p class="key" style="color:${c};">${p.keyLabel}</p>
    <p style="font-size:27pt; font-weight:700; line-height:1.4; color:${C.ink}; margin-top:12pt;">${p.key}</p>
  </div>
  <div style="position:absolute; left:88pt; top:322pt; width:828pt; height:1pt; background:${C.line};"></div>
  <div style="position:absolute; left:88pt; top:336pt; width:300pt;"><p class="key" style="color:${C.mut};">${p.actionLabel}</p></div>` + acts;
      }
    }
    return '';
  },
};
