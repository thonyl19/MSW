# [Task 004]: 動態來源切換器 (Source Switcher)
- **Status**: Completed
- **Estimated Time**: 15 mins

## 1. Objective (目標)
- 在 `MockPanel.js` 實作動態的 Source 切換器。
- 依照檔案數量（1, 2, >2）切換 UI 展示模式（不顯示, Radio, Select）。
- 切換時需連動切換 `mockConfig.activeSource`。

## 2. Technical Context & Logistics
- 關鍵程式碼位置: [p:\MyKata\MSW\src\components\MockPanel.js](file:///p:/MyKata/MSW/src/components\MockPanel.js)
- 依賴項: [Task 001], [Task 003]
- 執行方式: 根據 `Object.keys(mockConfig.sources)` 的長度進行條件渲染。

## 3. Unit Test Baseline (驗證基準)
- [x] 單一來源時，切換器隱藏。
- [x] 雙來源時，顯示兩顆 Radio Buttons 並可點選切換。
- [x] 多來源時，顯示下拉選單並可正確選取。

## 4. Current_Context (執行現場快照)
- 代辦事項: 
    - [x] 實作切換元件的 Template。
    - [x] 加入切換時的 UI 觸發效果。
- 思路記錄: 
    - 使用 `radio-group` 與 `source-select` 兩套元件來實現動態展示模式。
- 剩餘 Bug: 

## 5. Execution Log (執行紀錄)
- Start Time: 2026-03-28 11:50
- End Time: 2026-03-28 11:58
- Results/Result Log Path: 
