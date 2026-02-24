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

/**
 * 動態計算路徑
 */
const getPaths = () => {
    // 優先從 msw-loader.js 的當前位置判斷
    // 如果找不到，則嘗試從 window.location 萃取虛擬目錄
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

