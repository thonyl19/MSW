import Vue from 'vue';
import { MSWChannel, serializeConfig, deserializeConfig } from './msw-channel.js';

const STORAGE_KEY = 'msw-enabled';
const getInitialEnabled = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === 'true';
};

const isSlaveWindow = typeof window !== 'undefined' && window.location.pathname.includes('msw-panel-window.html');

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
  loadedPages: [],
  isDetachedMode: false // 標記是否處於子視窗模式
});

export let mswMasterChannel = null;

// 輔助函式：安全尋找掛載的 MockPanel Vue 實例 (解決掛載點被替換導致找不到的問題)
const getMockPanelInstance = () => {
    if (typeof document === 'undefined') return null;
    const el = document.querySelector('.mock-panel-wrapper');
    if (!el || !el.__vue__) return null;
    
    // 如果根 __vue__ 本身就是 MockPanel
    if (el.__vue__.$options && el.__vue__.$options.name === 'MockPanel') {
        return el.__vue__;
    }
    
    // 否則，在子組件樹中遞迴尋找 MockPanel
    const findMockPanel = (vm) => {
        if (!vm) return null;
        if (vm.$options && vm.$options.name === 'MockPanel') return vm;
        if (vm.$children) {
            for (const child of vm.$children) {
                const found = findMockPanel(child);
                if (found) return found;
            }
        }
        return null;
    };
    return findMockPanel(el.__vue__);
};

// 主視窗的 BroadcastChannel 初始化與狀態同步
if (typeof window !== 'undefined' && !isSlaveWindow) {
    let isInternalUpdate = false;
    
    mswMasterChannel = new MSWChannel('master', (type, payload) => {
        if (type === 'PANEL_READY') {
            console.log('%c[MSW Store] 子視窗已連線，發送初始狀態。', 'color: #10b981;');
            mockConfig.isDetachedMode = true;
            mswMasterChannel.post('STATE_INIT', { state: serializeConfig(mockConfig) });
        } else if (type === 'STATE_CHANGED' && payload.state) {
            isInternalUpdate = true;
            const state = payload.state;
            mockConfig.isEnabled = state.isEnabled;
            mockConfig.apiDelay = state.apiDelay;
            mockConfig.apiStatus = state.apiStatus;
            mockConfig.activeSource = state.activeSource;
            
            if (state.values) {
                for (const key in state.values) {
                    Vue.set(mockConfig, key, state.values[key]);
                }
            }
            Vue.nextTick(() => {
                isInternalUpdate = false;
            });
        } else if (type === 'PANEL_CLOSED') {
            console.log('%c[MSW Store] 子視窗已關閉，還原內嵌面板。', 'color: #f59e0b;');
            mockConfig.isDetachedMode = false;
        } else if (type === 'TRIGGER_ACTION' && payload) {
            console.log(`%c[MSW Store] 收到來自子視窗的注入請求 → target: "${payload.target}"`, 'color: #7239ea; font-weight: bold;');
            
            const mockPanelInstance = getMockPanelInstance();

            if (payload.type === 'INJECT_VALUE') {
                if (mockPanelInstance && typeof mockPanelInstance.injectValue === 'function') {
                    mockPanelInstance.injectValue(payload.target, payload.data);
                }
            } else {
                if (mockPanelInstance && typeof mockPanelInstance.triggerAction === 'function') {
                    // 還原 Action 物件
                    const action = {
                        type: payload.type || 'FILL_FORM',
                        value: payload.data,
                        context: payload.context,
                        name: payload.caseName
                    };

                    // 如果原本包含 function 或是複合結構，從主視窗原始記憶體中取出真實的 callback
                    if (payload.groupName && payload.caseName) {
                        const activeSource = mockConfig.activeSource;
                        const source = mockConfig.sources[activeSource];
                        const group = source ? source.inject[payload.groupName] : null;
                        const originalValue = group ? group[payload.target] : null;

                        if (originalValue) {
                            if (typeof originalValue === 'function') {
                                action.value = originalValue;
                                action.context = group; // 函式上層為群組物件 (例如整個 inject 對象)
                            } else if (typeof originalValue === 'object' && originalValue[payload.caseName]) {
                                action.value = originalValue[payload.caseName];
                                action.context = originalValue; // 函式上層為 $data 或 $vm 等對象
                            }
                        }
                    }

                    const control = { target: payload.target };
                    mockPanelInstance.triggerAction(action, control);
                } else {
                    // 備用方案：直接更新 lastAction 觸發用 useFormInjection 的 watcher
                    Vue.set(mockConfig, 'lastAction', {
                        id: `detached_${Date.now()}`,
                        type: payload.type || 'FILL_FORM',
                        target: payload.target,
                        data: payload.data,
                        context: payload.context,
                        groupName: payload.groupName,
                        caseName: payload.caseName,
                        timestamp: Date.now()
                    });
                }
            }
        } else if (type === 'HOT_RELOAD') {
            console.log('%c[MSW Store] 收到來自子視窗的熱重載請求 🔄', 'color: #7239ea; font-weight: bold;');
            import('./mock-entry.js').then(m => m.reloadAllMocks());
        } else if (type === 'UPDATE_INJECT_DATA' && payload) {
            console.log(`%c[MSW Store] 收到子視窗 JSON 數據編輯套用請求 → target: "${payload.target}"`, 'color: #7239ea; font-weight: bold;');
            const { groupName, target, caseName, newData } = payload;
            const source = mockConfig.sources[mockConfig.activeSource];
            if (source && source.inject && source.inject[groupName] && source.inject[groupName][target]) {
                if (caseName) {
                    Vue.set(source.inject[groupName][target], caseName, newData);
                } else {
                    Vue.set(source.inject[groupName], target, newData);
                }
                
                // 在主視窗執行 DOM 注入
                const mockPanelInstance = getMockPanelInstance();
                if (mockPanelInstance && typeof mockPanelInstance.injectValue === 'function') {
                    const targetVal = caseName ? source.inject[groupName][target] : newData;
                    mockPanelInstance.injectValue(target, targetVal);
                }
            }
        }
    });

    // 監聽主視窗狀態變更並自動廣播
    new Vue().$watch(() => {
        return serializeConfig(mockConfig);
    }, (serialized) => {
        if (isInternalUpdate) return;
        mswMasterChannel.post('STATE_SYNC', { state: serialized });
    }, { deep: true });

    // 偵測子視窗是否意外關閉 (主動防禦機制)
    setInterval(() => {
        if (mockConfig.isDetachedMode) {
            if (window.mswStandaloneWindow && window.mswStandaloneWindow.closed) {
                console.log('%c[MSW Store] 偵測到子視窗已被關閉，主動還原內嵌面板。', 'color: #f59e0b;');
                mockConfig.isDetachedMode = false;
            }
        }
    }, 2000);
}


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
