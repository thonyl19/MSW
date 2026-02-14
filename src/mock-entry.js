import Vue from 'vue';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.js';
import { mockConfig, _registerPage as registerPage } from './store.js';
import MockPanel from './components/MockPanel.js';

export const worker = setupWorker(...handlers);

/**
 * 頁面 Mock 註冊入口
 * 同時處理 UI 控制項與 API 攔截邏輯
 */
export const registerMock = (options) => {
    const { title, controls, handlers: pageHandlers } = options;
    
    // 1. 註冊 UI 面板
    registerPage(title, controls);
    
    // 2. 注入頁面專屬的重新定義 (優先權高於全域 handlers)
    if (pageHandlers && pageHandlers.length > 0) {
        worker.use(...pageHandlers);
    }
};

const getServiceWorkerUrl = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const virtualDirectory = segments.length > 0 ? segments[0] : '';
    return `/${virtualDirectory}/mockServiceWorker.js`.replace(/\/+/g, '/');
};

const startWorker = () => {
    worker.start({ 
        serviceWorker: { 
            url: getServiceWorkerUrl() ,
            options: { updateViaCache: 'none' }
        },
        onUnhandledRequest: 'bypass',
    }).then(() => {
        console.log('%c[MSW] 攔截系統已啟動', 'color: cyan');
    }).catch(err => {
        console.error('[MSW] 啟動失敗', err);
    });
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

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({ render: h => h(MockPanel) }).$mount(root);

