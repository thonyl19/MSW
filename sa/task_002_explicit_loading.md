# task_002_explicit_loading: 實作前端依據 MSW 模式顯式指定加載 YAML
- **Status**: Pending
- **Estimated Time**: 30 mins

## 1. Objective (目標)
- 將 POC 擴展為通用模組或 Service。仿效當前 MSW 的「前端指定載入」模式：使用者（或開發者）在需要導覽的畫面上，主動呼叫 `AssistantGuide.load('/assistant/yaml/my_page_tour.yaml')`，然後觸發導覽。

## 2. Technical Context & Logistics
- 邏輯抽取：將 `jsyaml.load` 與 `axios` 請求封裝（如果專案原本已有 fetch 或 axios 工具則重複利用）。
- 容錯機制：若 YAML 解析錯誤或檔案不存在需不拋出破壞性異常，而是透過 console.warn 或輕量提示阻斷。

## 3. Unit Test Baseline (驗收基準)
- [ ] Vue 組件或 Frontend 邏輯可自由變更/帶入參數指定不同的 YAML 檔路徑。
- [ ] 請求對應 .yaml 後，成功執行其步驟內容。

## 4. Current_Context (執行現場快照)
- 代辦事項: 
- 思路記錄/變數快照: 
- 剩餘 Bug/重構建議: 

## 5. Execution Log (執行紀錄)
- Start Time: 
- End Time: 
- Results/Result Log Path: 
