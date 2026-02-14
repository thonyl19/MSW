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
  mockConfig.pageTitle = title;
  mockConfig.controls = controls;
};

