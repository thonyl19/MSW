import Vue from 'vue';
export const mockConfig = Vue.observable({
  apiDelay: 0,
  pageTitle: '通用測試',
  controls: []
});

export const registerPage = (title, controls) => {
  mockConfig.pageTitle = title;
  mockConfig.controls = controls;
};