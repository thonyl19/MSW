# msw-utils 分析報告

## Architecture
- **技術棧**: MSW (Mock Service Worker).
- **資料流**: 
  - 作為 MSW Handlers 的中間件/輔助層。
  - 接收動態配置 (`mockConfig`) 與 預設響應數據 (`data`)。
  - 根據配置執行 **延遲 (delay)** -> **自定義覆寫 (Custom JSON)** -> **透傳 (Passthrough)** -> **標準響應** 的處理。

## Key Components
- **handleCustomResponse(config)**:
  - **功能**: 解析 `mockConfig.customJson` 字串。
  - **輸出**: 成功則回傳 `HttpResponse.json`；失敗則回傳帶有 400 狀態碼的錯誤 JSON。
- **sendResponse({ data, mockConfig, status, isPassthrough })**:
  - **功能**: 核心回應發送器，整合了所有 Mock 行為。
  - **行為順序**:
    1. **延遲處理**: 支援數值延遲 (500ms, 2s, 5s) 與特殊指令 `'Code500'`。
    2. **自定義優先**: 若 UI 面板輸入了 `customJson`，優先回傳該內容。
    3. **透傳機制**: 若 `data` 為空且 `isPassthrough` 為真，則調用 MSW 的 `passthrough()` 讓請求流向後端。
    4. **預設響應**: 回傳封裝好的 `HttpResponse.json`。

## Conventions
- **錯誤處理**: `handleCustomResponse` 內建 `try-catch`，避免無效 JSON 導致整體 Mock 崩潰，並提供友善的錯誤訊息。
- **配置驅動**: 所有行為均依賴於傳入的 `mockConfig` 物件，體現了「UI 控制 Mock」的原則。
- **日誌追蹤**: 使用 `console.groupCollapsed` 標記 `passthrough` 行為，便於開發者在瀏覽器 Console 追蹤哪些路徑被 Mock 攔截、哪些流向後端。

## Critical Paths
- **延遲與超時模擬**: `await delay(...)` 若在 `MockPanel` 設置為 5000ms，需確保前端調用端有足夠的 Timeout 設定。
- **JSON 解析效能與安全**: `JSON.parse` 處理大體積或是非法格式的字串時的異常捕捉。
- **Passthrough 判定**: `isPassthrough && data == null` 是決定是否「退位」給真實 API 的關鍵邏輯。

## 關聯參考
- **[msw (npm module)](https://mswjs.io/)**: 引入 `HttpResponse`, `delay`, `passthrough`。
- **[MockPanel.js](file:///p:/MyKata/MSW/src/components/MockPanel.js)**: UI 端提供 `customJson` 與 `apiDelay` 配置。
- **[store.js](file:///p:/MyKata/MSW/src/store.js)**: 提供 `mockConfig` 的實體。
