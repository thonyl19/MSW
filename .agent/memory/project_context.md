# 專案核心記憶 (Project Context: MSW Mock System)

## 核心架構 (Core Architecture)
- **狀態管理 (Single Source of Truth)**: `src/store.js`
  - 管理全域變數 `mockConfig`，此變數決定了 MSW 的攔截行為（如延遲、狀態碼）以及 UI 元件的即時渲染狀態。
- **Mock 註冊與配置**: `src/mock-entry.js`
  - 提供 `registerMock` 與 `updateConfig` API，支援各業務頁面動態註冊 Mock 情景並變更全域狀態。
- **MSW 攔截層**: `src/msw-loader.js`, `src/handlers.js`, `src/msw-utils.js`
  - `msw-loader.js`: 負責初始化 MSW Worker。
  - `handlers.js`: 定義請求攔截的 URL 模式。
  - `msw-utils.js`: 提供 `sendResponse` 等工廠函數，整合 `mockConfig` 的延遲與狀態碼設定。
- **互動控制面板**: `src/components/MockPanel.js`
  - 基於 Vue 2 開發的開發者面板，採 Glassmorphism 風格設計。支援拖拽、縮放為圖示、Session 狀態持久化以及動態控制項渲染。

## 關鍵功能與近期改良 (Key Features & Recent Improvements)
- **動作按鈕群組 (Action Button Group)**: 
  - 新增 `actions` 類型的控制項，允許在面板中定義一鍵觸發的按鈕（如：清空快取、重置表單）。
- **動態資料注入 (Dynamic Data Injection)**: 
  - 實作鏈路：`MockPanel.triggerAction` -> 更新 `mockConfig.activePayload` 與 `mockConfig.lastAction` -> `業務組件 (watchers)` 偵測到信號後自動填入資料。
  - 大幅提升邊際案例 (Edge Cases) 的回測效率。
- **狀態持久化 (Persistence)**: 
  - 面板座標與展開狀態會依據當前 `window.location.pathname` 儲存於 `sessionStorage`，確保在不同頁面間切換時能保持各自的 UI 配置。
- **進階回應控制**: 
  - 支援全域模擬 `401 Unauthorized`、`500 Error` 以及動態 API 延遲 (0~5000ms)。

## 模組摘要清單 (Module Summary)
| 模組名稱 | 核心職責 | 關鍵依賴 |
|---|---|---|
| `store.js` | 全域狀態 (`mockConfig`) 管理 | `sessionStorage` |
| `mock-entry.js` | 插件註冊入口與狀態 API | `store.js` |
| `MockPanel.js` | 互動式 UI 控制面板 | `mockConfig`, Vue, Google Fonts (Outfit) |
| `msw-utils.js` | 回應生成與延遲工廠 | `msw`, `mockConfig` |
| `handlers.js` | URL 路由攔截定義 | `msw-utils.js` |
| `msw-loader.js` | Service Worker 啟動器 | `msw` |
