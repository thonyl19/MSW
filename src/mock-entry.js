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
    if (!instance) {
        console.error('[MSW] useFormInjection 呼叫失敗：未傳入有效的 Vue 實體');
        return;
    }

    // [DEBUG] 讓使用者能確認組件真的有跑進來註冊
    console.log(`%c[MSW] >>> 填表監控註冊成功！目標物件: instance.${formKey}`, 'color: #3b82f6; font-weight: bold;', instance[formKey]);

    const unwatch = instance.$watch(() => mockConfig.lastAction, (action) => {
        // [DEBUG] 這裡是注入動作觸發的入口
        if (action && action.type === 'FILL_FORM' && action.data) {
            
            // 1. 比對目標對象名稱 (嚴謹檢查)
            const target = action.target || 'form';
            
            // 如果目標不符，靜默跳過 (可能是有多個 formKey 在監聽)
            if (target !== formKey) return;

            // 🔍 進入偵錯點
            debugger; 

            // 2. 檢查 Vue 實體物件是否存在
            if (!(formKey in instance)) {
                console.warn(`%c[MSW Injection Error] 找不到對象屬性 '${formKey}' 在目前組件實體中。`, 'color: #ef4444; font-weight: bold;', instance);
                return;
            }

            console.log(`%c[MSW Injection] 準備注入數據至 ${formKey}...`, 'color: #7239ea; font-weight: bold;', action.data);
            
            try {
                // 3. 執行深度拷貝
                const cleanData = _.cloneDeep(action.data);
                
                /**
                 * 4. 執行注入 (強化響應性)
                 * 如果 Object.assign 沒反應，改用 Vue 2 推薦的物件替換方式
                 */
                const original = instance[formKey];
                
                // 方案 A: 局部覆蓋 (Vue.set 迴圈)
                Object.keys(cleanData).forEach(key => {
                    Vue.set(original, key, cleanData[key]);
                });

                // 方案 B: (備用) 如果需要整個物件替換，請改用 instance[formKey] = { ...original, ...cleanData };

                console.log(`%c[MSW Injection] ${formKey} 注入成功！`, 'color: #10b981; font-weight: bold;');
            } catch (err) {
                console.error(`[MSW Injection] 數據注入過程發生錯誤:`, err);
            }
        }
    });
    return unwatch;
};

/**
 * 頁面 Mock 註冊入口 [Task 002 升級]
 */
export const registerMock = async (options) => {
    const { title, controls, handlers: pageHandlers } = options;
    
    // 1. 偵測是否具備對應的 Data 檔案
    let injectData = {};
    try {
        // 取得當前執行的路徑來推測 .data.js 的位置
        const currentPath = mockConfig.loadedPages[mockConfig.loadedPages.length - 1];
        if (currentPath) {
            const dataPath = currentPath.replace('.js', '.data.js');
            const dataModule = await import(`${dataPath}${dataPath.includes('?') ? '&' : '?'}t=${Date.now()}`);
            if (dataModule && dataModule._inject) {
                injectData = dataModule._inject;
                console.log(`%c[MSW Auto-load] 已自動載入數據來源: ${title}.data.js`, 'color: #10b981;');
            }
        }
    } catch (e) {
        // 找不到 .data.js 是正常的，靜默跳過
    }

    // 2. 註冊 UI 面板與注入數據
    registerPage(title, controls, injectData);
    
    // 3. 注入頁面專屬的重新定義
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

/**
 * 核心熱重載邏輯 (T003)
 * @returns {Promise<void>}
 */
export const reloadAllMocks = async () => {
    console.log('%c[MSW] 啟動熱重載程序...', 'color: #7239ea; font-weight: bold;');
    const startTime = Date.now();

    try {
        // 1. 重置 MSW Handler 堆疊
        worker.resetHandlers();
        
        // 2. 恢復全域預設 Handlers (如 Login)
        worker.use(...handlers);

        // 3. 取得當前已載入的頁面連結
        const pages = [...mockConfig.loadedPages];
        const timestamp = Date.now();

        // 4. 進行深度重載：源碼重寫 + Blob 注入 (確保 .data.js 也會被載入新版)
        for (const pageUrl of pages) {
            console.log(`%c[MSW] 正在重新解析: ${pageUrl}`, 'color: #b794f4');
            
            // 抓取源碼 (加上 t 以確保抓到最新源碼)
            const response = await fetch(`${pageUrl}${pageUrl.includes('?') ? '&' : '?'}t=${timestamp}`);
            let code = await response.text();

            /**
             * 深度解析增強 (T003-Fix): 
             * 1. 支援 ../ 與 ./ 
             * 2. 將路徑轉換為絕對路徑，否則 Blob URL 會找不到依賴
             */
            code = code.replace(/from\s+['"](\.\.?\/[^'"]+\.js)['"]/g, (match, relPath) => {
                const baseUrl = new URL(pageUrl, window.location.href);
                const absPath = new URL(relPath, baseUrl).href;
                
                // 排除核心管理檔案，避免產生多個 Module 實例 (Singleton Violation)
                const coreFiles = ['store.js', 'mock-entry.js', 'msw-utils.js', 'handlers.js'];
                const isCore = coreFiles.some(f => absPath.endsWith(f));
                
                if (isCore) return `from '${absPath}'`; // 不加時間戳
                return `from '${absPath}${absPath.includes('?') ? '&' : '?'}t=${timestamp}'`;
            });

            // 建立動態 Blob 路徑並執行載入
            const blob = new Blob([code], { type: 'application/javascript' });
            const blobUrl = URL.createObjectURL(blob);
            
            await import(blobUrl);
            URL.revokeObjectURL(blobUrl);
        }

        const duration = Date.now() - startTime;
        console.log(`%c[MSW] 熱重載完成！(耗時: ${duration}ms)`, 'color: #10b981; font-weight: bold;');
    } catch (err) {
        console.error('[MSW] 熱重載過程發生錯誤', err);
        throw err;
    }
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
