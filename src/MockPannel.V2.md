# MockPanel V2 實作規格 (Advanced)

本文件定義 `MockPanel` 的進階版本（V2），主要針對多進入點打包需求進行最佳化，提升開發者體驗與介面靈活性。

## 1. 核心變更與目標
- **介面繼承**：承襲 `MockPanel~20260213` 的深色質感設計與狀態圓點標示。
- **動態驅動**：改由 `store.js` 中的 `controls` 陣列動態生成 UI，支援不同頁面註冊特定的 Mock 控制項。
- **互動升級**：支援自由**拖動**位置，以及縮小為**右上角固定圖示**的功能。

## 2. 功能規格與互動邏輯

### 2.1 自由拖曳 (Draggable)
- **觸發區域**：面板頂部的 `.mock-panel-header` 為拖曳把手。
- **實作行為**：
  - 滑鼠按下時計算偏移量，移動時透過 CSS `top` / `left` 或 `transform: translate()` 實時更新位置。
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
根據 `mockConfig.controls` 的資料結構渲染：
```javascript
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
```

### 3.2 樣式新規範 (CSS)
- **吸附圖示**：
  ```css
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
  ```
- **過渡動畫**：狀態切換需包含 `opacity` 與 `scale` 的過渡，避免突兀的視覺跳變。

## 4. 實作注意事項
1.  **位置持久化**：考慮將面板的 `top` / `left` 座標存儲於 `sessionStorage`，確保頁面重新整理後位置不重置。
2.  **層級管理**：確保 `z-index` 高於所有專案 UI，且全屏 Modal 也不會遮擋。
3.  **多路口適配**：由於是多進入點打包，需確保 Mock 相關代碼（Store & UI）在非 Mock 環境下被 Tree-shaking 剔除。

## 5. 待辦開發清單
- [ ] 實作 `v-draggable` 自定義指令或內部事件處理。
- [ ] 擴充 `data()` 中的 `displayMode` 狀態管理。
- [ ] 整合 `store.js` 的動態渲染邏輯。
- [ ] 實作右上角 Floating Icon 及其還原動畫。


## UI 設計風格
請參考 P:\MyKata\skills\skills\frontend-design\skill.md