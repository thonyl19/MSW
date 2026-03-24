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
  - 基於 Vue 2 開發的開發者面板，採 **Premium Glassmorphism** 風格設計。支援拖拽、縮放為圖示、Session 狀態持久化以及根據 `mockConfig.controls` 動態渲染 UI。

## UI/UX 設計規範 (UI Design Specifications)
為確保後續開發維持 V2 高品質視覺體驗，必須遵循以下規範：
- **視覺風格 (Visual Style)**:
  - **毛玻璃質感 (Glassmorphism)**: 容器需具備 `backdrop-filter: blur(20px) saturate(160%)` 與細微白邊 `1px solid rgba(255, 255, 255, 0.08)`。
  - **字體 (Typography)**: 統一採用 Google Fonts **Outfit** (300, 400, 600)，禁止使用系統預設字體。
  - **高對比度**: 標籤顏色維持 `rgba(255,255,255,1)`，數值狀態使用紫色調 `Value Badge` (`#b794f4`)。
- **互動邏輯 (Interaction Logic)**:
  - **多態顯示**: 支援「展開」、「收合」與「圖示化 (Floating Icon)」三種模式。圖示化模式需固定於視窗右上方。
  - **流暢過渡 (Transitions)**: 佈局位置變動使用 `cubic-bezier(0.19, 1, 0.22, 1)`，並搭配 `scale(1.15)` 等微動效。
  - **拖動功能**: 頂部 Header 為拖曳把手，需包含邊界判定與座標持久化 (`sessionStorage`)。
- **佈局密度**: 採用緊湊佈局（如 `padding: 0px 5px`），確保在高頻操作下不佔據過多垂直空間。

## 關鍵功能與近期改良 (Key Features & Recent Improvements)
- **動作按鈕群組 (Action Button Group)**: 
  - 新增 `actions` 類型的控制項，允許在面板中定義一鍵觸發的按鈕（如：清空快取、重置表單）。
- **動態資料注入 (Dynamic Data Injection - 2.6)**: 
  - 實作鏈路：`MockPanel.triggerAction` -> 更新 `mockConfig.activePayload` 與 `mockConfig.lastAction` -> `useFormInjection` 輔助函數 -> `業務組件` 自動填入資料。
  - **關鍵 API**: `mock-entry.js` -> `useFormInjection(instance, formKey)` 提供給主畫面 Vue 元件使用的監聽介面。
  - 大幅提升跨場景表單 (Form Validation) 的回歸測試效率。
- **狀態持久化 (Persistence)**: 
  - 面板座標與展開狀態會依據當前 `window.location.pathname` 儲存於 `sessionStorage`，確保在不同頁面間切換時能保持各自的 UI 配置。
- **進階回應控制**: 
  - 支援全域模擬 `401 Unauthorized`、`500 Error` 以及動態 API 延遲 (0~5000ms)。

## 模組摘要清單 (Module Summary)
| 模組名稱 | 核心職責 | 關鍵依賴 |
|---|---|---|
| `store.js` | 全域狀態 (`mockConfig`) 管理 | `sessionStorage`, `Vue.observable` |
| `mock-entry.js` | 插件註冊入口、組件映射與表單注入 API | `store.js` |
| `MockPanel.js` | 互動式 UI 控制面板 (含 Action Button Group) | `mockConfig`, Vue, Google Fonts (Outfit) |
| `msw-utils.js` | 回應生成與延遲工廠 | `msw`, `mockConfig` |
| `handlers.js` | URL 路由攔截定義 | `msw-utils.js` |
| `msw-loader.js` | Service Worker 啟動器與 Import Map 自動對接 | `msw` |
