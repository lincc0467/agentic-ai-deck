// 共用內容模型 —— 三個設計方向讀同一份，確保比較的是設計不是文案。
// 文案已在地化為繁體中文台灣用語；原檔第 19 頁的簡體「仅」已修正。

export const CHAPTERS = [
  { id: 'c1', no: '01', name: '概念與差異', blurb: '定義、四大特徵、<br>與傳統 AI 的六項對比' },
  { id: 'c2', no: '02', name: '架構與方法', blurb: '閉環系統，<br>五個關鍵設計步驟' },
  { id: 'c3', no: '03', name: '案例研究',   blurb: '文獻知識蒸餾，<br>一次未達標與一次翻盤' },
  { id: 'c4', no: '04', name: '洞見與局限', blurb: '最佳實踐、成本與<br>可靠性的真實代價' },
];

export const PAGES = [
  // ── 1 封面 ──────────────────────────────────────────────
  {
    type: 'cover', ch: null,
    title1: '智能體 AI',
    title2: '系統設計與應用',
    sub: '從單次推理的傳統 AI，到會規劃、會執行、會自我修正的自主決策系統',
  },

  // ── 2-6 概念與差異 ──────────────────────────────────────
  {
    type: 'bullets', ch: 'c1',
    title: '什麼是智能體 AI',
    lead: '具有自主決策、規劃與執行能力的智慧系統。四大特徵不是四個並列的形容詞，是同一個迴圈上的四個位置',
    diagram: 'agent-loop',
    diagramOnly: true,
    items: [
      { k: '自主性　Autonomy', v: '無需人工介入即可完成任務' },
      { k: '目標導向　Goal-oriented', v: '有明確的目標與改進方向' },
      { k: '反應性　Reactive', v: '對環境變化即時回應' },
      { k: '主動性　Proactive', v: '主動採取行動，而非被動等待' },
    ],
    footer: '現實例子：程式碼生成 AI · 資料分析助手 · 決策支援系統 · 自動化客服',
  },
  {
    type: 'split', ch: 'c1',
    title: '傳統 AI 與智能體 AI 的差異',
    diagrams: { left: 'pipe-oneshot', right: 'pipe-iterative' },
    left: {
      label: '傳統 AI', tone: 'off',
      items: ['單次推理（One-shot）', '被動回應使用者輸入', '固定的處理流程', '輸入 → 模型 → 輸出', '有限的上下文理解', '幻覺問題嚴重'],
    },
    right: {
      label: '智能體 AI', tone: 'on',
      items: ['迭代式推理（Iterative）', '主動規劃與執行', '靈活的自適應流程', '多步驟任務分解與執行', '持續學習與改進', '透過驗證降低幻覺'],
    },
  },
  {
    type: 'bullets', ch: 'c1',
    title: '智能體 AI 的核心優勢',
    lead: '前兩項優勢本身就是兩種形狀：一個扇出再收攏，一個繞回來',
    diagram: 'advantage-shapes',
    items: [
      { k: '複雜任務處理', v: '任務分解 → 各個擊破 → 最後整合' },
      { k: '自我修正能力', v: '偵測錯誤 → 自動修正 → 逐步改進' },
      { k: '可解釋性更高', v: '思維鏈展示每一步推理' },
      { k: '即時適應', v: '依環境回饋動態調整策略' },
    ],
  },
  {
    type: 'bullets', ch: 'c1', numbered: true,
    title: '智能體 AI 能解決的問題',
    lead: '八類任務，這是前五類',
    items: [
      { k: '複雜資訊抽取', v: '從海量文件中提取結構化知識' },
      { k: '知識庫建構', v: '自動蒐集、整理、驗證專家知識' },
      { k: '程式碼分析與生成', v: '理解程式碼、產出最佳化建議' },
      { k: '自動化工作流', v: '多步驟業務流程自動化' },
      { k: '即時決策系統', v: '在不確定的環境中做出最佳決策' },
    ],
  },
  {
    type: 'bullets', ch: 'c1', numbered: true, startNo: 6,
    title: '智能體 AI 能解決的問題（續）',
    items: [
      { k: '專家系統', v: '將領域專家知識轉化為可執行系統' },
      { k: '多模態分析', v: '結合文字、影像、音訊等多種資訊' },
      { k: '科研加速', v: '自動文獻綜述、資料分析、假設驗證' },
    ],
    kicker: '共同特點',
    footer: '從「處理單個問題」到「解決完整任務」',
  },

  // ── 7-13 架構與方法 ─────────────────────────────────────
  {
    type: 'flow', ch: 'c2',
    title: '智能體 AI 的核心架構',
    lead: '不是一條直線，是一個會回頭的閉環',
    diagram: 'arch-loop',
    steps: [
      { label: '目標定義', detail: '要解決什麼、成功長什麼樣' },
      { label: '推理引擎', detail: '感知 → 規劃 → 決策' },
      { label: '執行層', detail: '呼叫工具 → 驗證回饋' },
      { label: '目標達成', detail: '未達成則回到目標定義' },
    ],
    notes: [
      { k: '閉環系統', v: '執行 → 監控 → 驗證 → 調整' },
      { k: '多工具整合', v: '資料查詢、程式碼執行、API 呼叫' },
    ],
  },
  {
    type: 'steps', ch: 'c2',
    title: '設計智能體 AI 的五個關鍵步驟',
    lead: '接下來五頁，每一步展開講',
    steps: [
      { no: '01', name: '定義目標\n與範圍' },
      { no: '02', name: '任務分解\n與策略' },
      { no: '03', name: '建構推理\n引擎' },
      { no: '04', name: '整合工具\n與 API' },
      { no: '05', name: '驗證與\n回饋循環' },
    ],
  },
  {
    type: 'bullets', ch: 'c2', stepNo: '01',
    title: '定義目標與範圍',
    diagram: 'boundary',
    items: [
      { k: '清晰定義 Agent 的目標', v: '要解決什麼問題？成功標準是什麼？' },
      { k: '劃定責任邊界', v: 'Agent 能做什麼，哪些場景必須人工介入' },
      { k: '辨識關鍵資料來源與工具', v: '需要哪些資料？要接哪些外部工具或 API？' },
      { k: '評估可行性與風險', v: '技術可行性 · 成本預估 · 失敗風險' },
    ],
  },
  {
    type: 'bullets', ch: 'c2', stepNo: '02',
    title: '任務分解與策略',
    items: [
      { k: '將複雜任務拆成子任務', v: '辨識任務相依關係，平行化彼此獨立的部分' },
      { k: '設計任務執行策略', v: '三種基本形狀，可組合套用' },
      { k: '定義失敗復原機制', v: '重試邏輯 · 備選方案 · 人工審批' },
    ],
    diagram: 'strategies',
  },
  {
    type: 'bullets', ch: 'c2', stepNo: '03',
    title: '建構推理引擎',
    diagram: 'context-stack',
    items: [
      { k: '選擇合適的 LLM 模型', v: '在成本、延遲、能力匹配之間取捨' },
      { k: '設計 Prompt 與 Context 管理', v: 'Context 是疊起來的，不是並列的三件事' },
      { k: '實作思維鏈（Chain of Thought）', v: '讓 Agent 顯式推理每一步，提高可解釋性與準確性' },
    ],
  },
  {
    type: 'bullets', ch: 'c2', stepNo: '04',
    title: '整合工具與 API',
    lead: '典型工具組合：GitHub 程式碼讀取 · PDF 文件解析 · 論文搜尋',
    diagram: 'tool-sequence',
    items: [
      { k: '定義 Agent 可用的工具集', v: '資料查詢 · 資料處理 · 外部 API · 驗證工具' },
      { k: '實作工具呼叫介面', v: 'Function calling · 錯誤處理 · 結果解析' },
      { k: '加入執行權限控制', v: '敏感操作需人工確認 · 操作日誌稽核' },
    ],
  },
  {
    type: 'bullets', ch: 'c2', stepNo: '05',
    title: '驗證與回饋循環',
    lead: '「驗證」不是一個動作，是有順序的三道關卡',
    diagram: 'verify-gates',
    items: [
      { k: '實作品質檢查機制', v: '格式驗證 · 完整性檢查 · 事實一致性驗證' },
      { k: '建構回饋循環', v: '偵測錯誤 → 自動修正 → 使用者回饋 → 改進' },
      { k: '效能指標定義', v: '準確度、召回率、執行時間、成本效率' },
    ],
  },

  // ── 14-16 案例研究 ──────────────────────────────────────
  {
    type: 'case', ch: 'c3',
    title: '文獻專家知識蒸餾系統',
    lead: '示意案例 · 數字為說明用途，非實際發布數據',
    diagram: 'agent-fanout',
    blocks: [
      { label: '專案背景', items: ['目標：從大量研究論文中提取結構化專家知識', '挑戰：資訊分散、格式不統一、需要深度理解'] },
      { label: '任務分解', items: ['Phase 1　小樣本設計與驗證', 'Phase 2　全量蒸餾，分批執行'] },
    ],
  },
  {
    type: 'turn', ch: 'c3',
    title: 'Round 1 未達標，Round 2 翻盤',
    lead: '示意案例 · 數字為說明用途',
    before: {
      label: 'Round 1　驗證未達標', score: '60', unit: '%', note: '低於 80% 目標',
      items: ['關鍵結構欄位缺失', '參數擷取不完整', '缺少 GitHub 程式碼讀取'],
    },
    after: {
      label: 'Round 2　戰略改進', score: '85', unit: '%', note: '超過 80% 目標',
      items: ['強化 Agent 指令：必須讀 GitHub 程式碼', '增加透明度：標註信心度（高 / 中 / 低）', '主動搜尋：Appendix · OpenReview · GitHub Issues'],
    },
    sources: [
      { src: 'github.svg', name: 'GitHub' },
      { src: 'openreview.png', name: 'OpenReview' },
    ],
  },
  {
    type: 'stat', ch: 'c3',
    title: '四個 Agent 並行一個工作日，把整批論文變成可複用的知識庫',
    short: '最終成果',
    lead: '示意案例 · 下列數字為說明用途，非實際發布數據',
    stats: [
      { value: '100', unit: '+ 篇', label: '論文全量處理', group: '規模', hero: true },
      { value: '500', unit: '+ 個', label: '輸出檔案', group: '規模' },
      { value: '10', unit: '+ 種', label: '架構模式', group: '產出' },
      { value: '100', unit: '+ 項', label: '識別技巧', group: '產出' },
      { value: '85', unit: '%', label: '驗證通過率', group: '品質' },
      { value: '4', unit: '個', label: '平行 Agent 數', group: '品質' },
      { value: '1', unit: '工作日', label: '全量處理時間', group: '效率' },
      { value: '可複用', unit: '', label: '沉澱為知識模式', group: '效率', text: true },
    ],
  },

  // ── 17-20 洞見與局限 ────────────────────────────────────
  {
    type: 'bullets', ch: 'c4', numbered: true,
    title: '關鍵洞見與最佳實踐',
    lead: '最貴的一課：策略沒驗證就全量執行',
    diagram: 'pilot-ladder',
    items: [
      { k: '迭代驗證很重要', v: '先用小樣本驗證策略，再全量執行' },
      { k: 'Agent 指令需精心設計', v: '優先級明確（必須 vs 可選）· 透明度追蹤' },
      { k: '平行執行效率高', v: '四個 Agent 平行處理，整批任務數小時內完成' },
    ],
  },
  {
    type: 'bullets', ch: 'c4',
    title: '局限與挑戰',
    lead: '四項代價，設計前就該算進去',
    diagram: 'cost-curve',
    items: [
      { k: '成本　Cost', v: 'LLM API 呼叫成本高，多步驟推理會放大成本' },
      { k: '延遲　Latency', v: '迭代式推理需多次呼叫，回應變慢' },
      { k: '可靠性　Reliability', v: 'LLM 仍有幻覺問題，需要強驗證機制' },
      { k: '可解釋性　Explainability', v: '黑盒決策，難以理解 Agent 為何這樣選' },
    ],
  },
  {
    type: 'bullets', ch: 'c4',
    title: '未來方向',
    items: [
      { k: '多 Agent 協作', v: '多個 Agent 共同解決複雜問題、協商與協調' },
      { k: '長期記憶與學習', v: 'Agent 從過往經驗中學習、持續改進' },
      { k: '自適應工具生成', v: 'Agent 自動建立新工具，而非僅呼叫現有工具' },
      { k: '可信與可解釋的 AI', v: '提高決策透明度與可追蹤性' },
    ],
  },
  {
    type: 'closing', ch: 'c4',
    title: '總結與行動計畫',
    keyLabel: '核心要點',
    key: '智能體 AI　=　自主規劃　+　迭代執行　+　品質驗證',
    actionLabel: '下一步行動',
    actions: [
      '確定要用智能體 AI 解決的具體問題',
      '設計並驗證 Agent 架構',
      '小規模驗證（10-20 個樣本）',
      '全量部署與監控',
    ],
  },
];
