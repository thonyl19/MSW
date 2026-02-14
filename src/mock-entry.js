import Vue from 'vue';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.js';
import MockPanel from './components/MockPanel.js';

const worker = setupWorker(...handlers);
const getServiceWorkerUrl = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const virtualDirectory = segments.length > 0 ? segments[0] : '';
    return `/${virtualDirectory}/mockServiceWorker.js`.replace(/\/+/g, '/');
};

worker.start({ 
    serviceWorker: { 
        url: getServiceWorkerUrl() ,
        options: { updateViaCache: 'none' }
    },
    onUnhandledRequest: 'bypass',
}).then(() => {
    console.log('%c[MSW] 攔截系統已啟動 (No-Build Mode)', 'color: cyan');
}).catch(err => {
    console.error('[MSW] 啟動失敗', err);
});

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({ render: h => h(MockPanel) }).$mount(root);