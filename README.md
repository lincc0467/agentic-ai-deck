# 智能體 AI 系統設計與應用 · 簡報改版

把一份 20 頁的純文字 PowerPoint，重新設計成三個方向的 HTML 簡報。全篇繁體中文（台灣用語），版面依 Path A 硬約束撰寫，可直接導出可編輯 PPTX。

> 🔒 **案例內容為示意**：第 14–16 頁的案例研究已去識別，數字為說明用途、非實際發布數據，投影片上均有標示。保留的是方法論與「未達標 → 診斷 → 翻盤」的敘事結構。

## 看成品

開 `index.html` 選一個方向，進入概覽牆後點任一頁進演示（← → 翻頁、ESC 回概覽）。

| 方向 | 設計來源 | 特徵 |
|---|---|---|
| **A · 敘事軸** | 秒數輪盤抽中 Sparkline 敘事波形（Nancy Duarte《Resonate》） | 冷調紙灰底 + 單一橙，一條階梯敘事軸貫穿全場，每頁標出所在位置 |
| **B · 暖白編輯部** | 現實參照：Anthropic 設計系統 | 暖白紙感 + 襯線標題 + 左右分欄，全頁只有一處高飽和色 |
| **C · 系統網格** | 最佳設計師：Otl Aicher（慕尼黑 1972） | 白底嚴格網格 + 色彩即編碼，章節與資料分類都靠顏色說話 |

最終採用方向 A，並補上 13 張解釋性圖解。

## 這是一套生成系統，不是 60 個手刻檔案

```
content.js          一份內容模型，三個方向共用（換掉它就是新簡報）
themes/theme-{a,b,c}.js   三套設計系統
diagrams.mjs        13 張圖解的 SVG 原始碼（改圖改這裡）
render-diagrams.mjs SVG → 3x PNG
build.mjs           生成 3 × 20 頁 + 概覽牆
shoot.mjs           逐頁截圖 + pageerror / 溢出檢查
```

```bash
npm install
node render-diagrams.mjs   # 產生圖解 PNG
node build.mjs             # 生成三套 deck
node shoot.mjs             # 截圖並驗證
```

## 兩個設計決策

**圖解怎麼跟可編輯 PPTX 共存**——PPTX 匯出路徑（Path A）禁用複雜 SVG，但簡報又需要圖解。作法是：圖以真 SVG 撰寫 → 渲染成 3x PNG → 用 `<img>` 嵌入（Path A 允許）。結果是頁面文字在 PPTX 裡仍可編輯，圖是圖片不可編輯；向量原始檔保留在 `diagrams.mjs`，要改圖改原始碼再重跑建置。

**版面不寫死行距**——行距由可用高度反推，並扣掉頁尾帶與頁碼軸。有圖的頁面條列改雙欄，把高度讓給圖。這兩點是為了避免行數變動時疊字，以及圖被壓成縮圖。

## 設計過程文件

- `design-spec.md` — 三個方向的共同輸入
- `direction-approved.md` — 方向定案與取捨記錄
- `visual-anchors.md` — 逐頁視覺主角盤點（純排版頁數需 ≤ ⅓）

## 產出

用 [huashu-design](https://github.com/alchaincyf/huashu-design) skill 製作，搭配本機的繁體中文與解釋性圖解覆蓋層。

字型為 Google Fonts 的 Noto Sans TC / Noto Serif TC / JetBrains Mono（OFL）。GitHub 與 OpenReview 標誌為各自所有者之商標，此處僅作說明用途。
