import { registerPage } from '../store.js';
import '../mock-entry.js'; // 啟動 MSW 基礎設施

registerPage('作業管理測試', [
  { 
    label: 'ListData 狀態', 
    key: 'arg', 
    type: 'select', 
    options: [
      { text: '正常資料', value: 'default' },
      { text: '測試大資料', value: 'test' },
      { text: '連線錯誤', value: 'error' }
    ] 
  }
]);