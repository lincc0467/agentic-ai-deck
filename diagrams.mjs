// diagrams.mjs — 方向 A 的向量圖解原始檔（真 SVG）
// 由 render-diagrams.mjs 轉為高解析 PNG 後以 <img> 嵌入投影片（Path A 規則 4）。
// 改圖請改這裡，不要改 PNG。

const P = {
  ink: '#14161A', mut: '#4F5358', dim: '#6E7278',
  line: '#DCDEDB', rule: '#BFC3BE', acc: '#D4501A', off: '#9EA2A4',
  paper: '#F1F2F0', white: '#FFFFFF',
};
const FONT = `font-family="Noto Sans TC, Microsoft JhengHei, sans-serif"`;

const defs = (id) => `
  <defs>
    <marker id="ah-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${P.rule}"/>
    </marker>
    <marker id="ah-acc-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${P.acc}"/>
    </marker>
    <marker id="ah-off-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${P.off}"/>
    </marker>
  </defs>`;

const box = (x, y, w, h, { stroke = P.rule, fill = P.white, sw = 1 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

const label = (x, y, s, { size = 13, color = P.ink, weight = 700, anchor = 'middle' } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${s}</text>`;

const wrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;

// ── 1 · 核心架構閉環（第 7 頁）────────────────────────────
function archLoop() {
  const W = 560, BW = 124, BH = 70, G = 21;
  const xs = [0, 1, 2, 3].map((i) => 0.5 + i * (BW + G));
  const cy = 43, bottom = 78;
  const names = [
    ['目標定義', '要解決什麼'],
    ['推理引擎', '感知 · 規劃 · 決策'],
    ['執行層', '呼叫工具 · 驗證回饋'],
    ['目標達成', '輸出結果'],
  ];
  const boxes = xs.map((x, i) => {
    const on = i === 3;
    return box(x, 8, BW, BH, { stroke: on ? P.acc : P.rule, sw: on ? 1.6 : 1 }) +
      label(x + BW / 2, cy - 2, names[i][0], { size: 15, color: on ? P.acc : P.ink }) +
      label(x + BW / 2, cy + 18, names[i][1], { size: 10.5, color: P.dim, weight: 400 });
  }).join('');
  const arrows = [0, 1, 2].map((i) => {
    const x1 = xs[i] + BW + 4, x2 = xs[i + 1] - 4;
    return `<line x1="${x1}" y1="${cy}" x2="${x2}" y2="${cy}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-arch)"/>`;
  }).join('');
  const backY = 138;
  const sx = xs[3] + BW / 2, ex = xs[0] + BW / 2;
  const ret = `<path d="M ${sx} ${bottom} L ${sx} ${backY - 10} Q ${sx} ${backY} ${sx - 10} ${backY} L ${ex + 10} ${backY} Q ${ex} ${backY} ${ex} ${backY - 10} L ${ex} ${bottom + 2}"
      fill="none" stroke="${P.acc}" stroke-width="1.6" marker-end="url(#ah-acc-arch)"/>`;
  const cap = `<rect x="${W / 2 - 92}" y="${backY - 10}" width="184" height="20" fill="${P.paper}"/>` +
    label(W / 2, backY + 4.5, '未達成 · 回到目標定義', { size: 11, color: P.acc, weight: 500 });
  return wrap(W, 152, defs('arch') + boxes + arrows + ret + cap);
}

// ── 2 · 單次推理 vs 迭代推理（第 3 頁，兩條並置）──────────
function pipeOneShot() {
  const W = 396, BW = 96, BH = 40, G = 46;
  const xs = [0, 1, 2].map((i) => 4 + i * (BW + G));
  const cy = 28;
  const names = ['輸入', '模型', '輸出'];
  const boxes = xs.map((x, i) => box(x, 8, BW, BH, { stroke: P.off }) +
    label(x + BW / 2, cy + 5, names[i], { size: 14, color: P.mut })).join('');
  const arrows = [0, 1].map((i) =>
    `<line x1="${xs[i] + BW + 5}" y1="${cy}" x2="${xs[i + 1] - 5}" y2="${cy}" stroke="${P.off}" stroke-width="1.4" marker-end="url(#ah-off-one)"/>`).join('');
  const stop = `<line x1="${xs[2] + BW + 6}" y1="${cy - 9}" x2="${xs[2] + BW + 6}" y2="${cy + 9}" stroke="${P.off}" stroke-width="1.6"/>`;
  return wrap(W, 78, defs('one') + boxes + arrows + stop +
    label(W / 2, 70, '單向管線 · 一次就結束', { size: 11, color: P.dim, weight: 400 }));
}

function pipeIterative() {
  const W = 396, BW = 78, BH = 40, G = 26;
  const xs = [0, 1, 2, 3].map((i) => 4 + i * (BW + G));
  const cy = 28;
  const names = ['目標', '規劃', '執行', '驗證'];
  const boxes = xs.map((x, i) => box(x, 8, BW, BH, { stroke: i === 3 ? P.acc : P.rule, sw: i === 3 ? 1.5 : 1 }) +
    label(x + BW / 2, cy + 5, names[i], { size: 14, color: i === 3 ? P.acc : P.ink })).join('');
  const arrows = [0, 1, 2].map((i) =>
    `<line x1="${xs[i] + BW + 4}" y1="${cy}" x2="${xs[i + 1] - 4}" y2="${cy}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-iter)"/>`).join('');
  const sx = xs[3] + BW / 2, ex = xs[0] + BW / 2, by = 62;
  const ret = `<path d="M ${sx} 48 L ${sx} ${by - 8} Q ${sx} ${by} ${sx - 8} ${by} L ${ex + 8} ${by} Q ${ex} ${by} ${ex} ${by - 8} L ${ex} 50"
      fill="none" stroke="${P.acc}" stroke-width="1.5" marker-end="url(#ah-acc-iter)"/>`;
  return wrap(W, 78, defs('iter') + boxes + arrows + ret +
    `<rect x="${W / 2 - 62}" y="${by - 9}" width="124" height="18" fill="${P.paper}"/>` +
    label(W / 2, by + 4, '未達標就再一輪', { size: 11, color: P.acc, weight: 500 }));
}

// ── 3 · 四個平行 Agent（第 14 頁）─────────────────────────
function agentFanout() {
  const W = 700, H = 210;
  const srcW = 104, srcH = 52, srcX = 0.5, srcY = H / 2 - srcH / 2;
  const agX = 258, agW = 152, agH = 34;
  const ys = [19, 65, 111, 157];   // 與左右兩端的方塊共用中心線
  const outW = 116, outH = 52, outX = W - outW - 0.5, outY = H / 2 - outH / 2;
  const cy = H / 2;

  const src = box(srcX, srcY, srcW, srcH, { stroke: P.rule }) +
    label(srcX + srcW / 2, cy - 3, '整批論文', { size: 16 }) +
    label(srcX + srcW / 2, cy + 15, '單一來源', { size: 10.5, color: P.dim, weight: 400 });

  const names = ['架構提取', '超參統計', '消融研究', '技巧整理'];
  const agents = ys.map((y, i) => box(agX, y, agW, agH, { stroke: P.rule }) +
    label(agX + 14, y + 22, `0${i + 1}`, { size: 11, color: P.acc, weight: 500, anchor: 'start' }) +
    label(agX + 46, y + 22, names[i], { size: 13.5, anchor: 'start' })).join('');

  const inLines = ys.map((y) => {
    const ty = y + agH / 2;
    return `<path d="M ${srcX + srcW} ${cy} C ${srcX + srcW + 70} ${cy}, ${agX - 70} ${ty}, ${agX - 5} ${ty}" fill="none" stroke="${P.rule}" stroke-width="1.2" marker-end="url(#ah-fan)"/>`;
  }).join('');
  const outLines = ys.map((y) => {
    const ty = y + agH / 2;
    return `<path d="M ${agX + agW + 3} ${ty} C ${agX + agW + 70} ${ty}, ${outX - 70} ${cy}, ${outX - 5} ${cy}" fill="none" stroke="${P.rule}" stroke-width="1.2" marker-end="url(#ah-fan)"/>`;
  }).join('');

  const out = box(outX, outY, outW, outH, { stroke: P.acc, sw: 1.6 }) +
    label(outX + outW / 2, cy - 3, '知識庫', { size: 16, color: P.acc }) +
    label(outX + outW / 2, cy + 15, '結構化輸出', { size: 10.5, color: P.dim, weight: 400 });

  const cap = label(agX + agW / 2, 205, '四個 Agent 平行執行', { size: 11, color: P.dim, weight: 400 });

  return wrap(W, H, defs('fan') + inLines + outLines + src + agents + out + cap);
}

// ── 4 · 三種任務執行策略（第 10 頁）──────────────────────
function strategies() {
  const W = 760, H = 118, CW = 240, G = 20;
  const dot = (x, y, on) => `<circle cx="${x}" cy="${y}" r="7" fill="${on ? P.acc : P.white}" stroke="${on ? P.acc : P.rule}" stroke-width="1.4"/>`;
  const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-st)"/>`;

  // 順序式
  const c0 = 0, y0 = 40;
  const seq = [0, 1, 2].map((i) => dot(c0 + 40 + i * 80, y0, i === 2)).join('') +
    [0, 1].map((i) => arr(c0 + 49 + i * 80, y0, c0 + 71 + i * 80, y0)).join('') +
    label(c0 + CW / 2, 92, '順序式', { size: 13 }) +
    label(c0 + CW / 2, 110, '一步接一步', { size: 10.5, color: P.dim, weight: 400 });

  // 迴圈式
  const c1 = CW + G;
  const loop = [0, 1, 2].map((i) => dot(c1 + 40 + i * 80, y0, i === 2)).join('') +
    [0, 1].map((i) => arr(c1 + 49 + i * 80, y0, c1 + 71 + i * 80, y0)).join('') +
    `<path d="M ${c1 + 200} ${y0 + 9} L ${c1 + 200} ${y0 + 24} Q ${c1 + 200} ${y0 + 32} ${c1 + 192} ${y0 + 32} L ${c1 + 48} ${y0 + 32} Q ${c1 + 40} ${y0 + 32} ${c1 + 40} ${y0 + 24} L ${c1 + 40} ${y0 + 11}" fill="none" stroke="${P.acc}" stroke-width="1.4" marker-end="url(#ah-acc-st)"/>` +
    label(c1 + CW / 2, 92, '迴圈式', { size: 13 }) +
    label(c1 + CW / 2, 110, '未達標就重跑', { size: 10.5, color: P.dim, weight: 400 });

  // 條件式
  const c2 = (CW + G) * 2;
  const cond = dot(c2 + 40, y0, false) + dot(c2 + 160, y0 - 22, false) + dot(c2 + 160, y0 + 22, true) +
    `<path d="M ${c2 + 49} ${y0} C ${c2 + 100} ${y0}, ${c2 + 105} ${y0 - 22}, ${c2 + 151} ${y0 - 22}" fill="none" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-st)"/>` +
    `<path d="M ${c2 + 49} ${y0} C ${c2 + 100} ${y0}, ${c2 + 105} ${y0 + 22}, ${c2 + 151} ${y0 + 22}" fill="none" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-st)"/>` +
    label(c2 + CW / 2, 92, '條件式', { size: 13 }) +
    label(c2 + CW / 2, 110, '依判斷走不同路', { size: 10.5, color: P.dim, weight: 400 });

  return wrap(W, H, defs('st') + seq + loop + cond);
}

// ── 5 · 感知-行動迴圈，四大特徵標在迴圈的四個位置（第 2 頁）──
function agentLoop() {
  const W = 720, H = 200;
  const cy = 84, BW = 138, BH = 60;
  const xs = [8, 194, 380, 566];
  const nodes = [
    ['感知環境', '反應性 Reactive'],
    ['設定目標', '目標導向 Goal-oriented'],
    ['自主決策', '自主性 Autonomy'],
    ['採取行動', '主動性 Proactive'],
  ];
  const boxes = xs.map((x, i) =>
    box(x, cy - BH / 2, BW, BH, { stroke: P.rule }) +
    label(x + BW / 2, cy - 4, nodes[i][0], { size: 15 }) +
    label(x + BW / 2, cy + 16, nodes[i][1], { size: 9.5, color: P.acc, weight: 500 })
  ).join('');
  const arrows = [0, 1, 2].map((i) =>
    `<line x1="${xs[i] + BW + 4}" y1="${cy}" x2="${xs[i + 1] - 4}" y2="${cy}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-al)"/>`).join('');
  const sx = xs[3] + BW / 2, ex = xs[0] + BW / 2, by = 162;
  const ret = `<path d="M ${sx} ${cy + BH / 2} L ${sx} ${by - 10} Q ${sx} ${by} ${sx - 10} ${by} L ${ex + 10} ${by} Q ${ex} ${by} ${ex} ${by - 10} L ${ex} ${cy + BH / 2 + 2}"
    fill="none" stroke="${P.acc}" stroke-width="1.6" marker-end="url(#ah-acc-al)"/>`;
  const cap = `<rect x="${W / 2 - 108}" y="${by - 10}" width="216" height="20" fill="${P.paper}"/>` +
    label(W / 2, by + 4.5, '環境改變 · 持續感知，不等指令', { size: 11, color: P.acc, weight: 500 });
  // 「環境」置於第一格正上方，虛線短接進感知，不懸空
  const top = label(ex, 22, '外部環境', { size: 11.5, color: P.dim, weight: 500 }) +
    `<line x1="${ex}" y1="30" x2="${ex}" y2="${cy - BH / 2 - 5}" stroke="${P.rule}" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#ah-al)"/>`;
  return wrap(W, H, defs('al') + top + boxes + arrows + ret + cap);
}

// ── 6 · 驗證三道關卡 + 回流（第 13 頁）──────────────────
function verifyGates() {
  const W = 720, H = 176;
  const gw = 168, gh = 62, gy = 26, gap = 24;
  const xs = [0, 1, 2].map((i) => 8 + i * (gw + gap));
  const names = [['格式驗證', '結構是否合法'], ['完整性檢查', '欄位是否齊全'], ['事實一致性', '內容是否對得上原文']];
  const gates = xs.map((x, i) =>
    box(x, gy, gw, gh, { stroke: P.rule }) +
    label(x + gw / 2, gy + 26, names[i][0], { size: 14 }) +
    label(x + gw / 2, gy + 45, names[i][1], { size: 10, color: P.dim, weight: 400 })
  ).join('');
  const arrows = [0, 1].map((i) =>
    `<line x1="${xs[i] + gw + 4}" y1="${gy + gh / 2}" x2="${xs[i + 1] - 4}" y2="${gy + gh / 2}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-vg)"/>`).join('');
  const okX = 8 + 3 * (gw + gap);
  const ok = box(okX, gy, 128, gh, { stroke: P.acc, sw: 1.6 }) +
    label(okX + 64, gy + 26, '通過', { size: 15, color: P.acc }) +
    label(okX + 64, gy + 45, '交付', { size: 10, color: P.dim, weight: 400 });
  const okArrow = `<line x1="${xs[2] + gw + 4}" y1="${gy + gh / 2}" x2="${okX - 4}" y2="${gy + gh / 2}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-vg)"/>`;
  // 每道關卡不通過 → 回流到修正
  const by = 138;
  const fails = xs.map((x) =>
    `<path d="M ${x + gw / 2} ${gy + gh} L ${x + gw / 2} ${by}" fill="none" stroke="${P.acc}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.75"/>`).join('');
  // 回流線整條走 accent 色，從最後一關拉回第一關的左緣
  const bar = `<path d="M ${xs[2] + gw / 2} ${by} L ${xs[0] + gw / 2} ${by}" fill="none" stroke="${P.acc}" stroke-width="1.4"/>` +
    `<path d="M ${xs[0] + gw / 2} ${by} L 8 ${by} L 8 ${gy + gh / 2 + 10}" fill="none" stroke="${P.acc}" stroke-width="1.4" marker-end="url(#ah-acc-vg)"/>`;
  const cap = `<rect x="${xs[1] + gw / 2 - 84}" y="${by - 9}" width="168" height="18" fill="${P.paper}"/>` +
    label(xs[1] + gw / 2, by + 4, '任一關不過 · 自動修正重跑', { size: 10.5, color: P.acc, weight: 500 });
  return wrap(W, H, defs('vg') + gates + arrows + ok + okArrow + fails + bar + cap);
}

// ── 7 · 步數放大成本與延遲（第 18 頁）───────────────────
function costCurve() {
  const W = 660, H = 200;
  const x0 = 46, y0 = 152, x1 = 600, yTop = 46;
  const axis = `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${P.rule}" stroke-width="1.2"/>` +
    `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${yTop}" stroke="${P.rule}" stroke-width="1.2"/>`;
  const steps = [1, 3, 5, 8, 12];
  const maxS = 12;
  const px = (s) => x0 + ((s - 1) / (maxS - 1)) * (x1 - x0 - 24);
  const py = (s) => y0 - (s / maxS) * (y0 - yTop - 12);
  // 柱：每一步的累積呼叫次數
  const bars = steps.map((s) => {
    const x = px(s), h = y0 - py(s), bw = 30;
    return `<rect x="${x - bw / 2}" y="${py(s)}" width="${bw}" height="${h}" fill="${s === maxS ? P.acc : P.off}" opacity="${s === maxS ? 1 : 0.28}"/>` +
      label(x, y0 + 16, `${s} 步`, { size: 10.5, color: P.dim, weight: 400 }) +
      label(x, py(s) - 8, `${s}×`, { size: 11.5, color: s === maxS ? P.acc : P.mut, weight: 700 });
  }).join('');
  // 軸標與註記提到頂端獨立一行，不與柱頂數字爭位
  const yl = label(x0 - 8, 22, 'API 呼叫次數', { size: 10.5, color: P.dim, weight: 400, anchor: 'start' });
  const note = label(W - 12, 22, '延遲同步累積', { size: 10.5, color: P.acc, weight: 500, anchor: 'end' });
  const cap = label(W / 2, 192, '單次推理 1 次呼叫 → 12 步任務 12 次呼叫，成本與延遲同時放大', { size: 11, color: P.dim, weight: 400 });
  return wrap(W, H, defs('cc') + axis + bars + yl + note + cap);
}

// ── 8 · Context 三層堆疊 + 思維鏈（第 11 頁）────────────
function contextStack() {
  const W = 700, H = 186;
  const lw = 290, lh = 40, lx = 8;
  const layers = [
    ['系統 Prompt', '定義角色與規則 · 整場固定'],
    ['Few-shot 範例', '示範期望的輸出格式'],
    ['動態上下文', '每輪隨任務變動'],
  ];
  const stack = layers.map((l, i) => {
    const y = 24 + i * (lh + 8);
    return box(lx, y, lw, lh, { stroke: i === 2 ? P.acc : P.rule, sw: i === 2 ? 1.5 : 1 }) +
      label(lx + 14, y + 18, l[0], { size: 13, anchor: 'start', color: i === 2 ? P.acc : P.ink }) +
      label(lx + 14, y + 33, l[1], { size: 9.5, color: P.dim, weight: 400, anchor: 'start' });
  }).join('');
  const brace = `<path d="M ${lx + lw + 8} 24 L ${lx + lw + 16} 24 L ${lx + lw + 16} 132 L ${lx + lw + 8} 132" fill="none" stroke="${P.rule}" stroke-width="1.2"/>` +
    `<line x1="${lx + lw + 16}" y1="78" x2="${lx + lw + 44}" y2="78" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-cs)"/>`;
  // 思維鏈：三個推理步驟串成一列
  const cx = lx + lw + 56, cw = 104, ch = 34;
  const cot = [0, 1, 2].map((i) => {
    const y = 24 + i * (ch + 15);
    return box(cx, y, cw, ch, { stroke: P.rule }) +
      label(cx + cw / 2, y + 22, `推理 ${i + 1}`, { size: 12.5 }) +
      (i < 2 ? `<line x1="${cx + cw / 2}" y1="${y + ch + 2}" x2="${cx + cw / 2}" y2="${y + ch + 12}" stroke="${P.rule}" stroke-width="1.3" marker-end="url(#ah-cs)"/>` : '');
  }).join('');
  const outX = cx + cw + 44;
  const out = box(outX, 61, 116, 60, { stroke: P.acc, sw: 1.6 }) +
    label(outX + 58, 86, '可解釋的', { size: 12.5, color: P.acc }) +
    label(outX + 58, 104, '決策', { size: 12.5, color: P.acc });
  const oa = `<line x1="${cx + cw + 4}" y1="91" x2="${outX - 4}" y2="91" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-cs)"/>`;
  const caps = label(lx + lw / 2, 178, 'Context 是疊起來的，不是並列的三件事', { size: 10.5, color: P.dim, weight: 400 }) +
    label(cx + cw / 2, 178, '思維鏈逐步展開', { size: 10.5, color: P.dim, weight: 400 });
  return wrap(W, H, defs('cs') + stack + brace + cot + out + oa + caps);
}

// ── 9 · 兩項核心優勢的兩種形狀（第 4 頁）────────────────
function advantageShapes() {
  const W = 760, H = 176, half = 366;
  // 左：分解 → 擊破 → 整合
  const lx = 4, cy = 66;
  const src = box(lx, cy - 22, 76, 44, { stroke: P.rule }) + label(lx + 38, cy + 5, '複雜任務', { size: 12 });
  const ys = [18, 58, 98];
  const subs = ys.map((y, i) => box(lx + 128, y, 82, 32, { stroke: P.rule }) + label(lx + 169, y + 21, `子任務 ${i + 1}`, { size: 11 })).join('');
  const inL = ys.map((y) => `<path d="M ${lx + 78} ${cy} C ${lx + 100} ${cy}, ${lx + 106} ${y + 16}, ${lx + 126} ${y + 16}" fill="none" stroke="${P.rule}" stroke-width="1.2" marker-end="url(#ah-av)"/>`).join('');
  const outL = ys.map((y) => `<path d="M ${lx + 212} ${y + 16} C ${lx + 232} ${y + 16}, ${lx + 238} ${cy}, ${lx + 258} ${cy}" fill="none" stroke="${P.rule}" stroke-width="1.2" marker-end="url(#ah-av)"/>`).join('');
  const merge = box(lx + 260, cy - 22, 76, 44, { stroke: P.acc, sw: 1.5 }) + label(lx + 298, cy + 5, '整合結果', { size: 12, color: P.acc });
  const capL = label(lx + 168, 158, '複雜任務處理 · 分解後各個擊破', { size: 11, color: P.dim, weight: 400 });

  // 右：偵測 → 修正 → 改進（閉環）
  const rx = half + 20;
  const nw = 96, nh = 40, ny = cy - 20;
  const rn = ['偵測錯誤', '自動修正', '逐步改進'];
  const rxs = [0, 1, 2].map((i) => rx + i * (nw + 26));
  const rBoxes = rxs.map((x, i) => box(x, ny, nw, nh, { stroke: i === 2 ? P.acc : P.rule, sw: i === 2 ? 1.5 : 1 }) +
    label(x + nw / 2, ny + 25, rn[i], { size: 12.5, color: i === 2 ? P.acc : P.ink })).join('');
  const rArrows = [0, 1].map((i) => `<line x1="${rxs[i] + nw + 4}" y1="${cy}" x2="${rxs[i + 1] - 4}" y2="${cy}" stroke="${P.rule}" stroke-width="1.3" marker-end="url(#ah-av)"/>`).join('');
  const rsx = rxs[2] + nw / 2, rex = rxs[0] + nw / 2, rby = 124;
  const rRet = `<path d="M ${rsx} ${ny + nh} L ${rsx} ${rby - 8} Q ${rsx} ${rby} ${rsx - 8} ${rby} L ${rex + 8} ${rby} Q ${rex} ${rby} ${rex} ${rby - 8} L ${rex} ${ny + nh + 2}" fill="none" stroke="${P.acc}" stroke-width="1.5" marker-end="url(#ah-acc-av)"/>`;
  const capR = label(rx + 172, 158, '自我修正 · 錯了自己繞回來', { size: 11, color: P.dim, weight: 400 });
  const divider = `<line x1="${half + 2}" y1="14" x2="${half + 2}" y2="140" stroke="${P.line}" stroke-width="1"/>`;

  return wrap(W, H, defs('av') + src + subs + inL + outL + merge + capL + divider + rBoxes + rArrows + rRet + capR);
}

// ── 10 · 責任邊界：自主區 / 人工介入區（第 9 頁）─────────
function boundary() {
  const W = 700, H = 180;
  const colW = 320, colH = 116, y = 14;
  const leftItems = ['查詢與讀取資料', '產生草稿與建議', '自我驗證與重試'];
  const rightItems = ['寫入正式系統', '對外發送與公告', '不可逆 / 高風險操作'];
  const col = (x, title, items, on) =>
    box(x, y, colW, colH, { stroke: on ? P.acc : P.rule, sw: on ? 1.6 : 1 }) +
    label(x + 16, y + 24, title, { size: 13.5, anchor: 'start', color: on ? P.acc : P.mut }) +
    items.map((s, i) => label(x + 16, y + 50 + i * 21, `· ${s}`, { size: 11.5, color: P.mut, weight: 400, anchor: 'start' })).join('');
  const line = `<line x1="${W / 2}" y1="4" x2="${W / 2}" y2="${y + colH + 12}" stroke="${P.acc}" stroke-width="1.6" stroke-dasharray="5 4"/>`;
  const badge = `<rect x="${W / 2 - 44}" y="${y + colH + 4}" width="88" height="20" fill="${P.paper}"/>` +
    label(W / 2, y + colH + 18.5, '責任邊界', { size: 11, color: P.acc, weight: 500 });
  const cap = label(W / 2, 174, '邊界要在設計階段畫死，不是出事後才補', { size: 11, color: P.dim, weight: 400 });
  return wrap(W, H, defs('bd') + col(4, 'Agent 自主區', leftItems, false) + col(W - colW - 4, '需人工確認', rightItems, true) + line + badge + cap);
}

// ── 11 · Function calling 一次來回的時序（第 12 頁）──────
function toolSequence() {
  const W = 720, H = 176;
  const y1 = 56, y2 = 118;      // Agent 泳道 / 工具泳道
  const laneL = 116, laneR = 664;
  const lanes = [['Agent', y1], ['工具 / API', y2]];
  const laneLines = lanes.map(([n, y]) =>
    `<line x1="${laneL}" y1="${y}" x2="${laneR}" y2="${y}" stroke="${P.line}" stroke-width="1"/>` +
    label(laneL - 8, y + 4, n, { size: 12, color: P.mut, anchor: 'end' })).join('');
  const callX = 190, backX = 396;
  const arrows =
    `<line x1="${callX}" y1="${y1 + 6}" x2="${callX}" y2="${y2 - 6}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-ts)"/>` +
    label(callX + 9, (y1 + y2) / 2 + 4, '① 發出呼叫', { size: 11, color: P.mut, weight: 400, anchor: 'start' }) +
    `<line x1="${backX}" y1="${y2 - 6}" x2="${backX}" y2="${y1 + 6}" stroke="${P.rule}" stroke-width="1.4" marker-end="url(#ah-ts)"/>` +
    label(backX + 9, (y1 + y2) / 2 + 4, '② 回傳結果', { size: 11, color: P.mut, weight: 400, anchor: 'start' });
  const work = box(238, y2 - 13, 120, 26, { stroke: P.rule, fill: P.white }) + label(298, y2 + 5, '執行', { size: 11.5, color: P.mut });
  const parse = box(486, y1 - 15, 122, 30, { stroke: P.acc, sw: 1.5, fill: P.white }) + label(547, y1 + 5, '解析結果', { size: 12.5, color: P.acc });
  const toParse = `<line x1="${backX + 6}" y1="${y1}" x2="482" y2="${y1}" stroke="${P.rule}" stroke-width="1.3" marker-end="url(#ah-ts)"/>`;
  // 重試：從解析結果上緣繞回發出呼叫
  const ty = 22;
  const err = `<path d="M 547 ${y1 - 15} L 547 ${ty + 8} Q 547 ${ty} 539 ${ty} L ${callX + 8} ${ty} Q ${callX} ${ty} ${callX} ${ty + 8} L ${callX} ${y1 - 8}"
      fill="none" stroke="${P.acc}" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#ah-acc-ts)"/>` +
    `<rect x="${W / 2 - 96}" y="${ty - 9}" width="192" height="18" fill="${P.paper}"/>` +
    label(W / 2, ty + 4, '失敗或格式不符 · 重試', { size: 10.5, color: P.acc, weight: 500 });
  const cap = label(W / 2, 166, '每次工具呼叫都是一次來回，敏感操作在此插入人工確認', { size: 11, color: P.dim, weight: 400 });
  return wrap(W, H, defs('ts') + laneLines + arrows + work + parse + toParse + err + cap);
}

// ── 12 · 小樣本試點 → 全量執行的階梯（第 17 頁）──────────
function pilotLadder() {
  const W = 720, H = 186;
  const base = 150, top = 44;
  const stages = [
    ['小樣本', '設計驗證', 26],
    ['加驗一輪', '策略微調', 40],
    ['全量', '執行', 106],
  ];
  const bw = 132, gap = 74;
  const x0 = 74;
  const bars = stages.map(([n, t, h], i) => {
    const x = x0 + i * (bw + gap);
    const y = base - h;
    const on = i === 2;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${on ? P.acc : P.off}" opacity="${on ? 1 : 0.3}"/>` +
      label(x + bw / 2, y - 26, n, { size: 20, color: on ? P.acc : P.mut }) +
      label(x + bw / 2, y - 10, t, { size: 10.5, color: P.dim, weight: 400 }) +
      (i < 2 ? `<line x1="${x + bw + 12}" y1="${base - 14}" x2="${x + bw + gap - 12}" y2="${base - 14}" stroke="${P.rule}" stroke-width="1.3" marker-end="url(#ah-pl)"/>` : '');
  }).join('');
  const baseline = `<line x1="52" y1="${base}" x2="${W - 40}" y2="${base}" stroke="${P.rule}" stroke-width="1.2"/>`;
  const scale = label(52, top - 18, '樣本規模', { size: 10.5, color: P.dim, weight: 400, anchor: 'start' });
  const cap = label(W / 2, 178, '策略先在小樣本上驗證，確認可行才付出全量成本', { size: 11, color: P.dim, weight: 400 });
  return wrap(W, H, defs('pl') + bars + baseline + scale + cap);
}

export const DIAGRAMS = {
  'arch-loop': archLoop(),
  'pipe-oneshot': pipeOneShot(),
  'pipe-iterative': pipeIterative(),
  'agent-fanout': agentFanout(),
  'strategies': strategies(),
  'agent-loop': agentLoop(),
  'verify-gates': verifyGates(),
  'cost-curve': costCurve(),
  'context-stack': contextStack(),
  'advantage-shapes': advantageShapes(),
  'boundary': boundary(),
  'tool-sequence': toolSequence(),
  'pilot-ladder': pilotLadder(),
};
