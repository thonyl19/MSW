import Vue from 'vue';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.js';
import { mockConfig, _registerPage as registerPage, _registerComponent } from './store.js';
import MockPanel from './components/MockPanel.js';

export const worker = setupWorker(...handlers);

/**
 * 3.1 第一階段：更新 Mock 設定的 API
 */
export const updateConfig = (patch) => {
    Object.assign(mockConfig, patch);
};

/**
 * 2.6 元件映射與自動注入支援
 */
export const registerComponentToMock = (name, instance) => {
    _registerComponent(name, instance);
};

/**
 * 2.6 輔助函數：供主畫面元件快速掛載監聽器以實作「一鍵填表」
 * @param {Vue} instance Vue 元件實例
 * @param {string} formKey 元件內部的 data key (預設為 'form')
 */
export const useFormInjection = (instance, formKey = 'form') => {
    if (!instance) return;
    const unwatch = instance.$watch(() => mockConfig.lastAction, (action) => {
        if (action && action.type === 'FILL_FORM' && action.data) {
            console.log(`%c[MSW Injection] 自動填入數據至 ${formKey}`, 'color: #7239ea;', action.data);
            if (instance[formKey]) {
                Object.assign(instance[formKey], action.data);
            }
        } else if (action && action.type === 'RESET_FORM') {
            // 如果需要重置 logic 可在此實作
        }
    });
    return unwatch;
};

/**
 * 頁面 Mock 註冊入口
 */
export const registerMock = (options) => {
    const { title, controls, handlers: pageHandlers } = options;
    
    // 自動確保有自定義 JSON 選項
    const hasCustomJson = controls.some(c => c.key === 'customJson');
    if (!hasCustomJson) {
        controls.push({
            label: '自訂回應 JSON', 
            key: 'customJson',
            type: 'json',
            placeholder: '{"success": true, "data": {}}'
        });
    }

    // 1. 註冊 UI 面板
    registerPage(title, controls);
    
    // 2. 注入頁面專屬的重新定義 (優先權高於全域 handlers)
    if (pageHandlers && pageHandlers.length > 0) {
        worker.use(...pageHandlers);
    }
};

/**
 * 動態計算路徑
 */
const getPaths = () => {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
        if (s.src.includes('msw-loader.js')) {
            const url = new URL(s.src);
            const baseUrl = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
            const appRoot = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1) || '/';
            return { baseUrl, appRoot };
        }
    }

    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const virtualDirectory = segments.length > 0 ? segments[0] : '';
    const appRoot = `/${virtualDirectory}/`.replace(/\/+/g, '/');
    return { baseUrl: `${appRoot}MSW`, appRoot };
};

let isStarting = false;

const startWorker = async () => {
    if (isStarting) return;
    isStarting = true;

    const { baseUrl, appRoot } = getPaths();
    const swUrl = `${appRoot}/mockServiceWorker.js`.replace(/\/+/g, '/');

    try {
        await worker.start({ 
            serviceWorker: { 
                url: swUrl,
                options: { updateViaCache: 'none' }
            },
            scope: appRoot,
            onUnhandledRequest: 'bypass',
        });
        console.log(`%c[MSW] 攔截系統已啟動 (作用域: ${appRoot})`, 'color: cyan; font-weight: bold;');
    } catch (err) {
        console.error('[MSW] 啟動失敗', err);
    } finally {
        isStarting = false;
    }
};

const stopWorker = () => {
    worker.stop();
    console.log('%c[MSW] 攔截系統已停止 (切換至後端模式)', 'color: orange');
};

// 監聽啟用狀態切換
new Vue().$watch(() => mockConfig.isEnabled, (val) => {
    if (val) startWorker();
    else stopWorker();
});

// 初始啟動
if (mockConfig.isEnabled) {
    startWorker();
}

// 延遲掛載 UI，確保不與主程式爭搶 DOM
setTimeout(() => {
    const rootId = 'msw-panel-root';
    if (document.getElementById(rootId)) return;
    
    const root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
    new Vue({ render: h => h(MockPanel) }).$mount(root);
}, 100);
