# [Task 003]: 面板 UI 重構 (Tabs & Layout)
- **Status**: Completed
- **Estimated Time**: 20 mins

## 1. Objective (目標)
- 重構 `src/components/MockPanel.js` 的模板，實現 Tabs 分頁（MSW / Inject）。
- 頂部固定區加入 Reload, Switch, Minimize, Catch/Clear 按鈕。
- 面板寬度調整為 420px，並使用動態 `<style>` 代入樣式。

## 2. Technical Context & Logistics
- 關鍵程式碼位置: [p:\MyKata\MSW\src\components\MockPanel.js](file:///p:/MyKata/MSW/src/components\MockPanel.js)
- 依賴項: [Task 001]
- 執行方式: 調整 Vue 模板與 CSS 區塊。

## 3. Unit Test Baseline (驗證基準)
- [x] 介面具備可切換的 MSW 與 Inject 標籤。
- [x] 樣式正確代入，且支援寬度自動適配。
- [x] `Inject` 分頁內的資料按 `target` 分組，且折疊功能正常。

## 4. Current_Context (執行現場快照)
- 代辦事項: 
    - [x] 建立 `activeTab` 變數。
    - [x] 修改 CSS 的 `.mock-panel-container` 寬度 (420px)。
    - [x] 重構頂部 Header 結構 (新增 Switch, Catch, Clear 按鈕)。
- 思路記錄: 
    - 引入 `groupedInjectData` 與 `groupOpen` 來實現 Inject 標籤的階層展開。
- 剩餘 Bug: 

## 5. Execution Log (執行紀錄)
- Start Time: 2026-03-28 11:35
- End Time: 2026-03-28 11:50
- Results/Result Log Path: 
