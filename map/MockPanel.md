# MockPanel 分析報告

## Architecture
- **技術棧**: Vue.js (Vue 2), MSW (Mock Service Worker).
- **資料流**: 
  - **核心 Store**: 使用 `Vue.observable` 在 `src/store.js` 建立響應式狀態 `mockConfig`。
  - **UI 驅動**: `MockPanel.js` 直接綁定 `mockConfig`，任何 UI 變更即時反應到資料模型。
  - **攔截邏輯**: `mock-entry.js` 監聽 `mockConfig.isEnabled` 切換，決定是否啟動或停止 MSW Worker。
  - **樣式注入**: 透過 `injectStyles` 方法動態注入 Vanilla CSS，支援 Glassmorphism (玻璃擬態) 設計，不依賴外部 CSS 檔案。

## Key Components
- **MockPanel (Vue Component)**:
  - **Template**: 封裝了 `mock-floating-icon` (懸浮球) 與 `mock-panel-container` (主面板)。
  - **Display Modes**: 支援 `icon` (精簡小球)、`collapsed` (僅標題列)、`expanded` (完整控制項) 三種切換。
  - **Draggable Logic**: 實作 `startDrag`, `onDrag`, `stopDrag` 以支援面板在頁面上自由移動。
  - **State Persistence**: 透過 `sessionStorage` (`mock-panel-pos`) 記憶面板位置與顯示模式。
- **mockConfig (Observable Store)**:
  - 集中管理 `isEnabled` (啟動開關)、`apiDelay` (全域延遲)、`controls` (動態註冊的控制項陣列)。

## Conventions
- **命名規範**: 
  - CSS 命名統一使用 `mock-` 前綴 (例如 `.mock-item`, `.mock-panel-header`)，防止樣式污染。
  - 核心狀態存儲與操作函數 (如 `_registerPage`) 定義於 `store.js`。
- **狀態持久化**: 
  - 面板位置存於 `sessionStorage` (分頁獨立)。
  - 啟用狀態存於 `localStorage` (跨分頁持久)。

## Critical Paths
- **動態控制項渲染**: `v-for="control in config.controls"` 依據動態註冊的描述檔案產生 UI，是系統擴充性的核心。
- **拖動座標計算**: `onDrag` 方法需精確計算 `clientX/Y` 與偏移量，並配合 `window` 事件監聽確保流暢度。
- **樣式優先級**: 由於是後注入樣式，若主系統有 `!important` 樣式可能會造成遮蓋。
- **初始化順序**: `mock-entry.js` 使用 `setTimeout` 延遲掛載 UI，以避免在主程式 DOM 未就緒前注入導致錯誤。

## 關聯參考
- **[store.js](file:///p:/MyKata/MSW/src/store.js)**: 定義資料結構與註冊 API。
- **[mock-entry.js](file:///p:/MyKata/MSW/src/mock-entry.js)**: 負責實例化 Vue 並掛載至 `msw-panel-root`。
- **[msw-utils.js](file:///p:/MyKata/MSW/src/msw-utils.js)**: 可能包含輔助 handler 的工具函數 (視具體實作而定)。
