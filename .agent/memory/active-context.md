---
updated: 2026-03-27
---

- **MSW 注入機制 (Injection) 重構**
  - **架構更新**: 全面採用 `target` + `value` 結構，實作精確目標名稱比對。
  - **強韌性**: 注入過程使用 `_.cloneDeep` 確保 Mock Data 不受污染，並加入 Vue 實體檢查 (Warn and Skip)。
  - **直接注入 (Direct Injection)**: 面板實作主動 DOM 掃描，可透過 `__vue__` 二次偵測並直接注入，即使主頁面未掛載 Hook 亦可運作。
  - **邏輯隔離**: 修正 `FILL_FORM` 與 `activePayload` 的側寫衝突，確保注入與 API 攔截互不影響。

## 未竟之志
- 驗證「大數據量 (Stress Test)」在特定頁面下的效能反應。
- 檢查 `_SetUpEQP.js` 等分頁是否需調整為新版注入格式。
