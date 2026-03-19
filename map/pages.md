## Architecture
- **技術棧**: 以 [MSW (Mock Service Worker)](https://mswjs.io/) 為核心，整合 Vue 2.x 的響應式狀態管理。
- **資料流**:
  1. `store.js`: 使用 `Vue.observable` 定義全域 `mockConfig`，負責儲存 UI 控制狀態與攔截開關。
  2. `mock-entry.js`: 初始化 MSW Worker，並提供 `registerMock` 介面動態注入頁面級別的攔截器。
  3. `msw-utils.js`: 標準化多種回應模式（延遲、自定義 JSON、狀態碼模擬），並在無模擬資料時自動 `passthrough()` 原請求。
  4. 頁面腳本 (如 `_MultOper_MPI.js`): 定義具體的 `http` 攔截規則與測試資料集。

## Key Components
- **`registerMock(options)`**: 註冊入口。接收 `title` (面板標題), `controls` (UI 控制項配置), `handlers` (MSW 攔截函數)。
- **`sendResponse({ mockConfig, data, ... })`**: 核心輔助函數。依據 `mockConfig` 自動處理 `delay`、`error (500)`、`customJson` 覆寫以及回傳 JSON 資料。
- **`_fn.getSrc(key, name)`**: 頁面內部的資料切換器。依據側邊欄選取的 `case1/case2` 索引，從靜態模擬物件中動態檢索路徑資料。
- **`MockPanel.js`**: 動態生成 UI 的側邊欄組件，實時連動 `mockConfig`。

## Conventions
- **命名規範**:
  - `_case[N]` 或 `_tmpData`: 存放大型模擬 JSON 資料。
  - `pageHandlers`: 存放頁面專屬的 `http.[method]` 陣列。
  - `registerMock`: 統一於檔案末尾調用。
- **錯誤處理**:
  - 模擬 500: 在控制項中設置 `arg: 'error'` 觸發。
  - 自定義回應: 全域配置 `customJson` 支援內容直接覆寫。
  - 缺漏緩衝: 若資料為 `null` 且未定義錯誤，則執行 `passthrough()` 轉發原 API。

## Critical Paths
- **資料檢索路徑**: `_fn.getSrc` 中使用 `_.get` 配合參數拼接（如 `GetRouteInfo.${route_ver_sid}`）。若 API 參數名變更或拼字錯誤，將導致攔截失效。
- **註冊優先權**: 頁面級別的 `worker.use(...pageHandlers)` 會覆蓋全域 handlers，需確保 URL Matcher 匹配範圍準確（如使用 `*/api/...`）。
- **同步與時序**: `mockConfig` 是響應式的，修改 UI 後 MSW 的延遲效果 (`delay`) 會依據最新狀態執行，但已發出的請求不會受影響。
