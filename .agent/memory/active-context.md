---
updated: 2026-03-27
---

# 當前工作狀態

## 最近完成的工作
- **MSW 熱重載 (Hot Reload) 實作 (T001~T004)**
  - `store.js`: 支援 `loadedPages` 追蹤與控制項「地毯式更新」。
  - `msw-loader.js`: 載入時自動記錄模組完整 URL。
  - `mock-entry.js`: `reloadAllMocks` 實作源碼重寫 + Blob 注入機制，解決 Dependency Chain (如 `.data.js`) 快取問題。
  - `MockPanel.js`: 標頭加入熱重載按鈕與旋轉動畫。
- **`_MultOper_MPI.js` 資料抽離與優化**
  - 整合 user 提供的資料模組化更新。

## 未竟之志
- 可考慮對 `_SetUpEQP.js`、`_EDC.js` 等其他頁面套用相同的資料抽離模式
