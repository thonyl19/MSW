import Vue from 'vue';

const STORAGE_KEY = 'msw-enabled';
const getInitialEnabled = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === 'true';
};

/**
 * 2.1 狀態總線 (State Bus) 改進
 * 作為單一事實來源 (Single Source of Truth)
 */
export const mockConfig = Vue.observable({
  isEnabled: getInitialEnabled(),
  apiDelay: 0,
  apiStatus: 200, // 2.5 實施狀態碼攔截
  pageTitle: '通用測試',
  controls: [],
  
  // 2.6 表單/狀態動態注入 (Dynamic Data Injection)
  lastAction: null,    // { type: 'FILL_FORM', timestamp: Date.now(), data: {} }
  activePayload: null, // 用於直接覆蓋 API 回傳的 JSON (Data Stress)
  
  // 暫存組件映射 (供注入邏輯找到主畫面組件)
  _componentMap: {} 
});

// 監聽並持久化啟用狀態
new Vue().$watch(() => mockConfig.isEnabled, (val) => {
  localStorage.setItem(STORAGE_KEY, val);
});

export const _registerPage = (title, controls) => {
  // 如果已經有標題，則進行組合或更新
  if (mockConfig.pageTitle === '通用測試') {
    mockConfig.pageTitle = title;
  } else if (!mockConfig.pageTitle.includes(title)) {
    mockConfig.pageTitle += ` & ${title}`;
  }

  // 合併控制項 (依據 key 進行去重)
  const existingKeys = new Set(mockConfig.controls.map(c => c.key));
  const newControls = controls.filter(c => !existingKeys.has(c.key));
  
  mockConfig.controls = [...mockConfig.controls, ...newControls];
};
