updated: 2026-03-27
---

# MSW Mock 專案 — 專案核心記憶 (Project Context)

## 1. 專案目的
提供一個獨立的 MSW (Mock Service Worker) 層，用於模擬 MES/WIP 系統的 API 回應，供前端開發與測試使用，不依賴後端環境。

## 2. 技術棧
- **MSW**: ^2.12.10 (Service Worker + HTTP interceptor)
- **esbuild**: ^0.27.3 (打包工具)
- **Vue 2**: ^2.6.14 (Mock 控制面板)
- **語言**: ES Module (`.js`)
- **字體**: Google Fonts **Outfit** (300, 400, 600)

## 3. 核心架構 (Core Architecture)
- **狀態管理**: `src/store.js`
  - 管理全域變數 `mockConfig`，決定攔截行為（延遲、狀態碼）與 UI 即時渲染狀態。
- **Mock 註冊與配置**: `src/mock-entry.js`
  - 提供 `registerMock` 與 `updateConfig` API，支援業務頁面動態註冊情景。
- **MSW 攔截層**: 
  - `msw-loader.js`: 初始化 MSW Worker。
  - `handlers.js`: 定義請求攔截的 URL 模式。
  - `msw-utils.js`: 提供 `sendResponse` 工廠函數，整合延遲與狀態碼設定。
- **互動控制面板**: `src/components/MockPanel.js`
  - 基於 Vue 2 的 **Premium Glassmorphism** 風格面板，支援拖拽、動態渲染 UI。
  - **直接注入模式 (Direct Injection)**: 主動遍歷 DOM 並透過 `__vue__` 屬性定位目標 Vue 實體，強制注入資料。
- **資料注入機制**:
  - `mock-entry.js` -> `useFormInjection()`: 提供組件「訂閱」模式，精確匹配 `target` 名稱。
  - **數據完整性**: 注入過程強制使用 `_.cloneDeep`，防止頁面雙向綁定污染 Mock Data。
  - **邏輯隔離**: 確保表單注入與 `activePayload` (API 回應覆寫) 互不干擾。

## 4. 目錄結構
```
src/
  components/          # Vue 組件 (如 MockPanel.js)
  pages/               # 業務分頁 Mock 邏輯
    _MultOper_MPI.js           # 攔截邏輯
    _MultOper_MPI.data.js      # 抽離的大型資料
    _SetUpEQP.js
    ...
  handlers.js          # 全域 handler 入口
  mock-entry.js        # 註冊入口與 API
  msw-utils.js         # 指標性工具函數
  store.js             # mockConfig 全域狀態
  msw-loader.js        # Worker 啟動器
.agent/
  memory/              # AG Memory Bank
  skills/              # AG Skills
  workflows/           # AG Workflows
```

## 5. UI/UX 與設計規範
- **視覺風格**: 
  - **毛玻璃 (Glassmorphism)**: `backdrop-filter: blur(20px) saturate(160%)`，細微白邊 `1px solid rgba(255, 255, 255, 0.08)`。
  - **高對比度**: 標籤 `white`, 狀態值使用紫色調 `#b794f4`。
- **互動特性**: 支援展開/收合/圖示化、側邊欄拖曳、座標持久化 (`sessionStorage`)。
  - **Select 優化**: 下拉選單支援「一鍵清除 (X)」功能，提升互動便利性。
- **Mock 資料**: 大型資料務必抽離至同名 `.data.js` 並以 `export` 方式提供。

## 6. 模組摘要清單
| 模組名稱 | 核心職責 | 關鍵依賴 |
|---|---|---|
| `store.js` | 全域狀態 (`mockConfig`) 管理 | `sessionStorage`, `Vue.observable` |
| `mock-entry.js` | 插件註冊入口、表單注入 API | `store.js`, `Vue.set`, `cloneDeep` |
| `MockPanel.js` | 互動控制面板、直接注入搜尋 | `mockConfig`, Vue, `reloadAllMocks`, `Direct Injection` |
| `msw-utils.js` | 回應生成與延遲工廠 | `msw`, `mockConfig` |
| `handlers.js` | URL 路由攔截定義 | `msw-utils.js` |
| `msw-loader.js` | Service Worker 啟動器、載入路徑記錄 | `msw`, `store.js` |

---
**7. 特殊機制: 熱重載 (Hot Reload)**
- **追蹤**: `msw-loader.js` 將每個 page 模組路徑存入 `mockConfig.loadedPages`。
- **刷新**: `mock-entry.js` -> `reloadAllMocks()` 會 fetch 原始碼，透過 Regex 強制對相對引用加上 `?t=TIMESTAMP` 後轉為 Blob URL 重新 Import，藉此繞過瀏覽器 ESM 快取，確保連動的 `.data.js` 同步更新。

---
**對接主專案 (Genesis_MVC)**:
- workerDirectory: `Q:\ZAC_Dev\Genesis_MVC\wwwroot`
