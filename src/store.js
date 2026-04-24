import Vue from 'vue';

const STORAGE_KEY = 'msw-enabled';
const getInitialEnabled = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === 'true';
};

/**
 * [Task 005] Persistence Helpers
 */
export const saveCatch = () => {
    const path = window.location.pathname;
    const catchData = {
        isEnabled: mockConfig.isEnabled,
        apiDelay: mockConfig.apiDelay,
        apiStatus: mockConfig.apiStatus,
        activeSource: mockConfig.activeSource,
        values: {},
        lastAction: mockConfig.lastAction
    };

    // 收集所有已註冊來源的控制項數值
    Object.keys(mockConfig.sources).forEach(sourceName => {
        const controls = mockConfig.sources[sourceName].controls;
        controls.forEach(c => {
            if (mockConfig[c.key] !== undefined) {
                catchData.values[c.key] = mockConfig[c.key];
            }
        });
    });

    sessionStorage.setItem(`msw-catch-${path}`, JSON.stringify(catchData));
    console.log(`%c[MSW Store] Snapshot Saved: ${path}`, 'color: #10b981;');
};

export const loadCatch = () => {
    const path = window.location.pathname;
    const saved = sessionStorage.getItem(`msw-catch-${path}`);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            // 批量還原基礎設定
            mockConfig.isEnabled = data.isEnabled ?? mockConfig.isEnabled;
            mockConfig.apiDelay = data.apiDelay ?? mockConfig.apiDelay;
            mockConfig.apiStatus = data.apiStatus ?? mockConfig.apiStatus;
            
            // 如果快照有紀錄 activeSource，且該來源已存在，則切換
            if (data.activeSource && mockConfig.sources[data.activeSource]) {
                mockConfig.activeSource = data.activeSource;
                mockConfig.controls = mockConfig.sources[data.activeSource].controls;
            }

            // 還原動態控制項數值
            if (data.values) {
                Object.keys(data.values).forEach(key => {
                    Vue.set(mockConfig, key, data.values[key]);
                });
            }

            console.log(`%c[MSW Store] Snapshot Loaded: ${path}`, 'color: #3b82f6;');
            return data;
        } catch (e) {
            console.error('[MSW Store] Failed to load snapshot', e);
        }
    }
    return null;
};

/**
 * 2.1 狀態總線 (State Bus) 改進 [Task 001 升級]
 */
export const mockConfig = Vue.observable({
  isEnabled: getInitialEnabled(),
  apiDelay: 0,
  apiStatus: 200,
  pageTitle: '通用測試',
  controls: [],
  
  // [Task 001] 多來源支援
  sources: {},      // { 'SourceA': { controls: [], inject: {} } }
  activeSource: '', // 當前作用的來源名稱
  
  lastAction: null,
  activePayload: null,
  _componentMap: {},
  loadedPages: []
});

// 監聽並持久化啟用狀態
new Vue().$watch(() => mockConfig.isEnabled, (val) => {
  localStorage.setItem(STORAGE_KEY, val);
});

export const _registerPage = (title, controls, inject = {}) => {
  // [Task 001] 註冊新來源
  Vue.set(mockConfig.sources, title, { controls, inject });
  
  // 如果是第一個來源，設為預設
  if (!mockConfig.activeSource) {
    mockConfig.activeSource = title;
    mockConfig.controls = controls;
    mockConfig.pageTitle = title;
  } else if (!mockConfig.pageTitle.includes(title)) {
    mockConfig.pageTitle += ` & ${title}`;
  }

  // 初始化控制項預設值
  controls.forEach(c => {
    if (mockConfig[c.key] === undefined && c.value !== undefined) {
      Vue.set(mockConfig, c.key, c.value);
    }
  });

  // [Task 005] 註冊時主動嘗試還原快照 (Proactive Restore)
  const snapshot = loadCatch();
  if (snapshot && snapshot.activeSource === title) {
    mockConfig.controls = controls; // 確保當前顯示的是該來源
  }
};

export const _registerComponent = (name, instance) => {
  Vue.set(mockConfig._componentMap, name, instance);
  console.log(`%c[MSW Store] 已掛載主畫面元件: ${name}`, 'color: #10b981;');
};
