# [T001]: 升級 Store 與註冊邏輯
- **Status**: Done
- **Estimated Time**: 15 mins

## 1. Objective (目標)
*   在 `mockConfig` 中新增 `loadedPages` 追蹤清單。
*   修改 `_registerPage`，使其具備「更新現有控制項（Update existing controls）」的能力，而不僅是單次註冊。

## 2. Technical Context & Logistics
*   關鍵程式碼位置: `p:\MyKata\MSW\src\store.js`
*   依賴項: 無
*   執行方式: 修正後透過 `registerMock` 測試。

## 3. Unit Test Baseline (驗收基準)
*   [ ] `mockConfig` 初始包含 `loadedPages: []`。
*   [ ] 首次註冊：`mockConfig.controls` 被填入。
*   [ ] 二次註冊（同 Key 但 Label 不同）：`controls` 對應項目的 Label 被更新。

---

# [T002]: 調整 Loader 記錄路徑
- **Status**: Done
- **Estimated Time**: 15 mins

## 1. Objective (目標)
*   在 `msw-loader.js` 載入 Module 前，將其最終解析出的 `finalSrc` 路徑存入 `mockConfig.loadedPages`。

## 2. Technical Context & Logistics
*   關鍵程式碼位置: `p:\MyKata\MSW\src\msw-loader.js`
*   依賴項: T001
*   執行方式: 在 HTML 載入頁面後，於 Console 檢查 `mockConfig.loadedPages` 是否有正確路徑。

## 3. Unit Test Baseline (驗收基準)
*   [ ] 當 `data-page="operation"` 時，`loadedPages` 包含 `operation.js` 的完整 URL。
*   [ ] 支援多逗點分隔的頁面路徑記錄。

---

# [T003]: 實作核心重填與重載邏輯
- **Status**: Done
- **Estimated Time**: 20 mins

## 1. Objective (目標)
*   在 `mock-entry.js` (或 `msw-utils.js`) 實作 `reloadAllMocks` 函數。
*   實作「源碼重寫 + Blob 注入」邏輯，確保依賴鍊被強制刷新。
*   負責調度 `worker.resetHandlers()` 與全域 Handler 重載。

## 2. Technical Context & Logistics
*   關鍵程式碼位置: `p:\MyKata\MSW\src\mock-entry.js`
*   依賴項: T001, T002
*   執行基礎: `fetch`, `Regex.replace`, `URL.createObjectURL`

## 3. Unit Test Baseline (驗收基準)
*   [ ] `reloadAllMocks()` 被呼叫後，`worker` 重新註冊了新的 Handler。
*   [ ] Regex 成功捕捉並替換 `./...js` 引用為帶時間戳的版本。

---

# [T004]: MockPanel UI 集成與熱重載測試
- **Status**: Done
- **Estimated Time**: 20 mins

## 1. Objective (目標)
*   在 `MockPanel.js` 標頭或基礎控制項增加「🔄 熱重載 (Hot Reload)」按鈕。
*   點擊按鈕時執行進度提示，並在完成後通知使用者。

## 2. Technical Context & Logistics
*   關鍵程式碼位置: `p:\MyKata\MSW\src\components\MockPanel.js`
*   依賴項: T003
*   執行方式: 手動點擊並觀察 Mock 數據是否即時更新。

## 3. Unit Test Baseline (驗收基準)
*   [ ] 修改 `.data.js` 的某個欄位值 -> 點選重載 -> API 請求返回更新後的值。
*   [ ] 重載後「登入」等全域功能仍正常運作（表示全域 Handler 已恢復）。
