---
updated: 2026-03-27
---

# 當前工作狀態

- **MSW 熱重載 (Hot Reload) 實作與優化**
  - `mock-entry.js`: 修正 `Invalid base URL` 問題，支援全路徑解析（./ 與 ../），確保 Blob URL 環境下依賴鏈正確更新。
  - `MockPanel.js`: 為 Select 控制項實作「一鍵清除 (X)」按鈕與樣式。
  - 驗證成功：`_MultOper_MPI.js` 修改 Label 後，點擊重載可正確反映在 UI。

## 未竟之志
- 可考慮對 `_SetUpEQP.js`、`_EDC.js` 等其他頁面套用相同的資料抽離模式
