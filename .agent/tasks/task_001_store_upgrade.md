# [Task 001]: Store 層級升級 (Multi-source & Catch)
- **Status**: Completed
- **Estimated Time**: 20 mins

## 1. Objective (目標)
- 重構 `src/store.js` 以支援多個來源 (sources) 的註冊與管理。
- 引入 `activeSource` 屬性來追蹤當前選取的 Data 檔案。
- 實作手動 Catch 的狀態快照邏輯。

## 2. Technical Context & Logistics
- 關鍵程式碼位置: [p:\MyKata\MSW\src\store.js](file:///p:/MyKata/MSW/src/store.js)
- 依賴項: 無
- 執行方式: 透過 `MockPanel.js` 調用 `mockConfig` 的方法。

## 3. Unit Test Baseline (驗證基準)
- [x] `mockConfig.sources` 應能同時存放多組獨立的 `controls` 與 `inject` 資料。
- [x] 執行 `saveCatch()` 後，當前 URL 下的狀態能正確寫入 `sessionStorage`。
- [x] 預期輸出: 狀態物件應包含為每個 Source 分別記憶的動態控制項數值。

## 4. Current_Context (執行現場快照)
- 代辦事項: 
    - [x] 調整 `_registerPage` 接收 `inject` 參數。
    - [x] 建立全域 `saveCatch` 與 `loadCatch` helper。
- 思路記錄: 
    - 使用 `Vue.set` 維持 `sources` 物件的響應性。
    - `mockConfig.controls` 作為相容性引用，指向當前 `activeSource` 的 controls。
- 剩餘 Bug: 

## 5. Execution Log (執行紀錄)
- Start Time: 2026-03-28 11:28
- End Time: 2026-03-28 11:35
- Results/Result Log Path: 
