---
autoSync: false
updated: 2026-03-26
---

# MSW Mock 專案 — 專案背景

## 專案目的
提供一個獨立的 MSW (Mock Service Worker) 層，用於模擬 MES/WIP 系統的 API 回應，
供前端開發與測試使用，不依賴後端環境。

## 技術棧
- **MSW**: ^2.12.10（Service Worker + HTTP interceptor）
- **esbuild**: ^0.27.3（打包工具）
- **Vue 2**: ^2.6.14（搭配主專案）
- **語言**: ES Module (`.js`)

## 核心目錄結構
```
src/
  handlers.js          # 全域 handler 入口
  mock-entry.js        # registerMock() / UI 控制面板邏輯
  msw-utils.js         # sendResponse() 等共用工具
  store.js             # mockConfig (全域狀態: lot, arg …)
  pages/               # 各頁面專屬的 Mock Handler + Data
    _MultOper_MPI.js           # 攔截邏輯 (MPI 多工序)
    _MultOper_MPI.data.js      # Mock 資料來源 (已抽離)
    _SetUpEQP.js
    _EDC.js
    _Self_Main.js
.agent/
  memory/              # AG Memory Bank
  skills/              # AG Skills 定義
  workflows/           # AG Workflow 定義
```

## 設計慣例
- 每個頁面 `.js` 透過 `registerMock()` 同時註冊 UI 控制與 handler。
- Mock 資料若量大，抽離至同名 `.data.js`，以 ES Module `export` 方式提供。
- `mockConfig` (store) 驅動 case 分支：`mockConfig.lot`、`mockConfig.arg` 等。
- Build 產物同步至主專案 `wwwroot`（見 `sync_MSW.bat`）。

## 對接主專案
- workerDirectory: `Q:\ZAC_Dev\Genesis_MVC\wwwroot`
- 主專案為 ASP.NET MVC (Genesis_MVC)
