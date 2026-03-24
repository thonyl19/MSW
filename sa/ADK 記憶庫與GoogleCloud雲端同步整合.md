# ADK 記憶庫與 Google Cloud 雲端同步整合規劃說明

> [!IMPORTANT]
> **文件狀態**: 評估提案 (Draft for Evaluation)  
> **關聯組件**: `.agent/skills/adk-memory-bank-initializer`, Vertex AI Memory Bank API

## 1. 規劃背景 (Background)

目前的 ADK (Agent Development Kit) 記憶管理主要依賴本地端的 Markdown 檔案（如 `project-context.md`、`active-context.md`、`progress.md`）。雖然這對單次對話回合非常有效，但存在以下局限性：
1. **跨 Session 斷層**：當對話歷史過長或 Agent 背景重設時，容易遺失最近的技術細節。
2. **多 Agent 協作限制**：若有多個 Agent 同時作業，本地檔案的同步與鎖定機制較為繁瑣。
3. **缺乏長期事實提煉**：僅靠 Markdown 的追加 (Append) 會導致 Token 隨時間快速膨脹。

**整合目標**：將本地 ADK 檔案結構對接到 Google Cloud Vertex AI 的託管式 **Memory Bank** 服務，實現「本地輕量快取、雲端長期事實」的理想路徑。

---

## 2. 整合架構與具體做法 (The How)

### 2.1 記憶層級映射 (Mapping)
我們將 ADK 檔案內容映射到 Vertex AI 雲端記憶的 `Topic` 與 `Entity` 中：

| ADK 本地檔案 | Vertex AI Memory Topic | 存儲類型 | 觸發時機 |
|---|---|---|---|
| `project-context.md` | `Global_Infrastructure` | `Static Fact` | 主要架構變動或模組新增時 |
| `active-context.md` | `Current_Task_Context` | `Volatile Fact` | 每個工作階段完成、任務轉移時 |
| `progress.md` | `Project_Milestones` | `Session State` | 功能實作驗收 (Done) 時 |

### 2.2 同步鏈路 (Sync Chain)
1. **擷取 (Extract)**：根據當前對話歷史，使用 LLM 自動識別關鍵變動（決策、API 定義、代碼重構）。
2. **本地更新 (Local Update)**：同步寫入 `.agent/memory` 目錄，作為開發者可讀的快照。
3. **雲端推送 (Cloud Push)**：調用 `GenerateMemories` API，將摘要片段傳送至 Vertex AI。
4. **自動更新其餘記憶 (Fact Refinement)**：利用 Vertex AI 內建的語意分析，自動偵測雲端現有記憶與新摘要的衝突，並進行更新（非重複追加）。

---

## 3. 具體效果與預期收益 (Expected Effects)

### 3.1 跨 Session 的「永續記憶」(Long-term Persistence)
即使開發者開啟全新的對話視窗或重設 Agent 环境，Agent 只要讀取雲端 Memory Bank，即可瞬間「記起」過去三個月的所有重大架構決定與技術細節，徹底解決「 Agent 健忘」的問題。

### 3.2 顯著提升 RAG (檢索增強) 的精準度
透過 Google Cloud 的 Similarity Search，Agent 能更精準地定位與當前任務相關的過往決策。例如：
- *效果範例*：「幫我重構 Data Injection」-> Agent 自動從雲端檢索出上個月討論過的 `mockConfig` 擴展規範，而不是重新問一遍格式。

### 3.3 Token 消耗優化 (Cost Optimization)
- **雲端壓縮**：Vertex AI 會自動進行事實提煉，將冗長的討論壓縮為簡短的事實（Entities）。
- **按需加載**：不需要每回合都將整個 `project_context.md` 塞入 Context，而是由 Agent 按需透過 `RetrieveMemories` 獲取必要資訊。

### 3.4 團隊協作與權限管理
- **全局同步**：支持多人團隊多個 Agent 實例共享同一份專案事實，確保開發的一致性。
- **安全隔離**：利用 Google Cloud IAM 與 `user_id` 綁定，確保敏感的商業邏輯記憶不外流。

---

## 4. 後續執行步驟建議 (Next Steps for Evaluation)

1. **API 接口驗證**：確認目前 Google Cloud Project 的 Vertex AI Agent Engine 權限與 Memory Bank 是否已啟用。
2. **本地 Payload 模板測試**：手動執行一次 `/sync-memory`，並觀察產生的 Vertex AI JSON 格式是否完整。
3. **成本評估**：估算每日頻寬與存儲費用（通常低於大模型推理費用，具備高性價比）。

---
**本文件由 ADK-Initializer 根據規劃範式生成。**
