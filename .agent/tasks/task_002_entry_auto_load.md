# [Task 002]: 入口點與資料自動偵測 (Auto-load)
- **Status**: Completed
- **Estimated Time**: 15 mins

## 1. Objective (目標)
- 修改 `src/mock-entry.js` 以實現 `[Page].js` ↔ `[Page].Data.js` 的自動聯動。
- 當註冊頁面時，自動嘗試動態導入對應的 Data 檔案，並將其 `_inject` 內容傳入 `store.js`。

## 2. Technical Context & Logistics
- 關鍵程式碼位置: [p:\MyKata\MSW\src\mock-entry.js](file:///p:/MyKata/MSW/src/mock-entry.js)
- 依賴項: [Task 001]
- 執行方式: 透過 Vite/Webpack 的動態導入 `import()` 實作。

## 3. Unit Test Baseline (驗證基準)
- [x] 若 `Page.Data.js` 存在且包含 `_inject`，`store.js` 的對應來源應獲取該資料。
- [x] 若 `Page.Data.js` 不存在，不應導致控制台報錯（使用 `try...catch`）。

## 4. Current_Context (執行現場快照)
- 代辦事項: 
    - [x] 在註冊函式中加入 `import()` 邏輯。
    - [x] 處理動態導入後的異步註冊同步化問題。
- 思路記錄: 
    - 利用 `loadedPages` 取得當前執行的路徑來推測 `.data.js` 的位置。
- 剩餘 Bug: 

## 5. Execution Log (執行紀錄)
- Start Time: 2026-03-28 11:35
- End Time: 2026-03-28 11:45
- Results/Result Log Path: 
