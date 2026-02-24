import Vue from 'vue';

const STORAGE_KEY = 'msw-enabled';
const getInitialEnabled = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === 'true';
};

export const mockConfig = Vue.observable({
  isEnabled: getInitialEnabled(),
  apiDelay: 0,
  pageTitle: '通用測試',
  controls: []
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


