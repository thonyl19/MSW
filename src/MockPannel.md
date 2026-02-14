# MockPanel 實作規格

`MockPanel` 是一個用於開發環境的測試控制面板，讓開發人員能即時切換 MSW (Mock Service Worker) 的模擬狀態與 API 回傳情境。

## 1. 基本資訊
- **組件名稱**：`MockPanel.vue`
- **技術棧**：Vue.js 2.x, CSS (Scoped), MSW
- **檔案位置**：`src/components/MockPanel.vue` (當前版本備份於 `MockPanel~20260213`)
- **外部依賴**：`src/store.js` 中的 `mockConfig`

## 2. 核心功能規格

### 2.1 面板狀態切換
- **最小化模式**：預設或點擊標題後，面板縮小為寬 150px、高 40px 的狀態，僅顯示標題與展開圖示。
- **展開模式**：點擊標題展開，顯示所有控制項，寬度固定為 280px。
- **動畫效果**：使用 CSS transition 實作寬度與高度的平滑過渡。

### 2.2 控制項配置
面板目前支援以下控制維度：

| 控制項目 | 綁定變數 (`mockConfig`) | 可選值與描述 |
| :--- | :--- | :--- |
| **Login API 狀態** | `loginStatus` | `success` (預設), `invalid_password` (401), `error` (500) |
| **資料列表 API 參數** | `arg` | `test` (成功回傳資料), `error` (500 錯誤) |
| **API 延遲 (Latency)** | `apiDelay` (Number) | `0ms`, `500ms`, `2000ms`, `5000ms` (逾時測試) |

### 2.3 視覺回饋 (Status Icons)
每個 API 控制項左側設有圓點圖示，根據目前選擇的狀態切換顏色：
- `success` / `test`: 綠色 (`#10b981`)
- `invalid_password`: 紅色 (`#ef4444`)
- `error`: 橘黃色 (`#f59e0b`)

## 3. 視覺設計規範 (UI Design)

### 3.1 佈局佈置
- **位置**：固定在頁面右下角 (`position: fixed; bottom: 20px; right: 20px`)。
- **層級**：高層級 (`z-index: 999999`)，確保不被其他組件遮擋。
- **色彩計畫**：
  - 背景：`#1e1e2d` (深藍黑)
  - 邊框：`#2b2b40`
  - 文字：主要白色 (`#ffffff`)，標籤灰色 (`#6c7293`)
  - 強調色 (Focus)：`#7239ea` (紫色)

### 3.2 樣式细节
- **邊框圓角**：8px
- **陰影**：`0 10px 30px rgba(0, 0, 0, 0.5)`
- **字體**：Segoe UI /系統預設字體

## 4. 實作細節 (Implementation Notes)

### 4.1 資料繫結
使用 `Vue.observable` 實作的 `mockConfig` 進行雙向繫結。當開發者在面板更改選項時，MSW 的 `handlers.js` 會根據該全域狀態決定回傳的 Response。

```javascript
// src/store.js
export const mockConfig = Vue.observable({
  apiDelay: 0,
  loginStatus: 'success',
  arg: 'test'
});
```

### 4.2 樣式封裝
使用 `<style scoped>` 確保面板樣式不會污染到主應用的網頁樣式。

## 5. 擴充建議
- **動態註冊**：目前控制項為靜態寫死，未來可結合 `store.js` 中的 `controls` 陣列實作動態生成表單控制項。
- **本地持久化**：可考慮將 `mockConfig` 存入 `localStorage`，重新整理頁面後保留測試狀態。
