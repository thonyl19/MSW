# MockPanel V2 實作規格 (Advanced)

本文件定義 \MockPanel\ 的進階版本（V2），主要針對多進入點打包需求進行最佳化，提升開發者體驗與介面靈活性。

## 1. 核心變更與目標
- **介面繼承**：承襲 \MockPanel~20260213\ 的深色質感設計與狀態圓點標示。
- **動態驅動**：改由 \store.js\ 中的 \controls\ 陣列動態生成 UI，支援不同頁面註冊特定的 Mock 控制項。
- **互動升級**：支援自由**拖動**位置，以及縮小為**右上角固定圖示**的功能。

## 2. 功能規格與互動邏輯

### 2.1 自由拖曳 (Draggable)
- **觸發區域**：面板頂部的 \.mock-panel-header\ 為拖曳把手。
- **實作行為**：
  - 滑鼠按下時計算偏移量，移動時透過 CSS \	op\ / \left\ 或 \	ransform: translate()\ 實時更新位置。
  - 需處理視窗範圍邊界判斷，防止面板被拖出瀏覽器可見範圍。

### 2.2 多態顯示模式
面板應具備三種狀態：
1.  **展開 (Expanded)**：顯示完整的 API 控制項列表與標題。
2.  **收合 (Collapsed)**：僅顯示標題列，固定於當前位置。
3.  **圖示化 (Floating Icon)**：（新功能）
    - 面板淡化並縮小成一個圓形圖示（例如：🧪 或 ⚙️）。
    - 此圖示自動吸附至視窗**右上方** (Fixed position)。
    - 具備半透明感 (Opacity: 0.6)，滑鼠懸停時恢復不透明。

### 2.3 狀態切換邏輯
- **點擊縮放鈕**：在展開與收合間切換。
- **點擊最小化鈕 (新增)**：進入「圖示化」模式。
- **點擊圖示**：還原至上一次的面板狀態與位置。

## 3. 視覺與技術規範

### 3.1 動態元件生成 (Dynamic Components)
根據 \mockConfig.controls\ 的資料結構渲染：
\\\javascript
// 範例資料結構
{
  key: 'loginStatus',
  label: 'POST /api/login',
  type: 'select',
  options: [
    { text: 'Success', value: 'success' },
    { text: 'Server Error', value: 'error' }
  ]
}
\\\

### 3.2 樣式新規範 (CSS)
- **吸附圖示**：
  \\\css
  .floating-icon {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #1e1e2d;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  \\\
- **過渡動畫**：狀態切換需包含 \opacity\ 與 \scale\ 的過渡，避免突兀的視覺跳變。

## 4. 實作注意事項
1.  **位置持久化**：考慮將面板的 \	op\ / \left\ 座標存儲於 \sessionStorage\，確保頁面重新整理後位置不重置。
2.  **層級管理**：確保 \z-index\ 高於所有專案 UI，且全屏 Modal 也不會遮擋。
3.  **多路口適配**：由於是多進入點打包，需確保 Mock 相關代碼（Store & UI）在非 Mock 環境下被 Tree-shaking 剔除。

## 5. 待辦開發清單
- [ ] 實作 \-draggable\ 自定義指令或內部事件處理。
- [ ] 擴充 \data()\ 中的 \displayMode\ 狀態管理。
- [ ] 整合 \store.js\ 的動態渲染邏輯。
- [ ] 實作右上角 Floating Icon 及其還原動畫。

## 6. 樣式改良守則 (Style Improvement Rules) - 基於 \MockPanel.js\
為確保日後 UI 調整仍能維持高品質視覺體驗，必須遵循以下樣式原則：

1.  **Typography (字體設計)**: 
    - 統一採用 Google Fonts 中的 \Outfit\ (300, 400, 600)。
    - 禁止使用預設字體，除非作為 \system-ui\ 的 fallback。
2.  **Fluid Transitions (流動過渡動畫)**:
    - 對於佈局位置變動（如 \	op\, \ottom\），應使用 \cubic-bezier(0.19, 1, 0.22, 1)\ 等進階貝氏曲線，禁止僅使用 \linear\。
    - 入場與切換狀態應搭配 \scale(1.15)\ 與 \
otate\ 等微動效提升互動感。
3.  **High Contrast Readability (高對比可讀性)**:
    - 所有業務標籤 (Labels) 的顏色應維持 \
gba(255,255,255,1)\。
    - 區段分隔線 (Dividers) 字體建議設定為 \15px\ 以上，並使用顯著的 \letter-spacing\。
4.  **Premium Glassmorphism (毛玻璃質感)**:
    - 容器背板必須具備 \ackdrop-filter: blur(20px) saturate(160%)\。
    - 需搭配 \1px\ 底透明度的白邊 (border: 1px solid rgba(255, 255, 255, 0.08)) 營造精密感。
5.  **Compact Component Density (精簡佈局密度)**:
    - 主開關 (\.main-switch\) 等高頻操作件應盡量緊湊（例如：\padding: 0px 5px\），避免過大的外距佔據過多垂直空間。
6.  **Visual Hierarchy (視覺層次)**:
    - 使用 \alue-badge\ 顯示數值狀態（如 200ms），顏色選用具代表性的紫色調 (\#b794f4\)。

## UI 設計風格
請參考 P:\MyKata\skills\skills\frontend-design\skill.md