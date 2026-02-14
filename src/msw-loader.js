/**
 * MSW Loader - 自動化環境初始化 (安全性增強版)
 * 
 * 功用：
 * 1. 檢查 MSW 核心檔案是否存在，不存在則靜默退出 (避免產生 404 錯誤)
 * 2. 自動注入 Import Map (Vue, MSW)
 * 3. 根據 data-page 屬性自動啟動對應的 Mock 頁面
 * 
 * 使用方式：
 * <script src="~/MSW/msw-loader.js" data-page="operation"></script>
 */
(async function () {
    // 取得當前執行的 script 標籤
    const loaderScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();
    const pageScript = loaderScript.getAttribute('data-page');
    
    // 動態計算基礎路徑 (從 msw-loader.js 所在的目錄萃取)
    // 例如：如果 src 是 "http://.../ZACMES/MSW/msw-loader.js"，baseUrl 就會是 "http://.../ZACMES/MSW"
    // 利用 URL 物件來處理路徑最為精準
    const loaderUrl = new URL(loaderScript.src, window.location.href);
    const baseUrl = loaderUrl.pathname.substring(0, loaderUrl.pathname.lastIndexOf('/'));
    
    const coreUrl = `${baseUrl}/esm/msw-core.js`;


    /**
     * 安全檢查：確認核心檔案是否存在
     * 使用 fetch 檢查檔案，如果找不到 (404) 就不執行後續邏輯
     */
    try {
        const response = await fetch(coreUrl, { method: 'HEAD' });
        if (!response.ok) {
            console.warn(`%c[MSW Loader] 找不到核心檔案 (${coreUrl})，已自動跳過 MSW 初始化。`, 'color: #f59e0b;');
            return; // 檔案不存在，直接退出
        }
    } catch (e) {
        // 連網失敗或路徑錯誤，也直接退出
        return;
    }

    /**
     * 動態注入 Import Map
     * 這裡會判斷主體環境是否已有 window.Vue，如果有就直接復用
     */
    if (!document.querySelector('script[type="importmap"]')) {
        const im = document.createElement('script');
        im.type = 'importmap';
        
        // 判斷是否已有全域 Vue (例如透過 script 標籤載入的 UMD 版本)
        // 如果有，我們透過一個小的 Data URI 模組將其轉導給 ESM 使用
        const vueUrl = window.Vue 
            ? 'data:text/javascript;charset=utf-8,export default window.Vue;' 
            : 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';

        im.textContent = JSON.stringify({
            "imports": {
                "vue": vueUrl,
                "msw": coreUrl,
                "msw/browser": coreUrl
            }
        });
        document.head.appendChild(im);
        
        if (window.Vue) {
            console.log('%c[MSW Loader] 偵測到全域 Vue，已自動對接。', 'color: #10b981;');
        }
    }


    /**
     * 動態載入入口模組
     */
    if (pageScript) {
        const moduleScript = document.createElement('script');
        moduleScript.type = 'module';
        
        let finalSrc = '';
        if (pageScript.startsWith('~')) {
            finalSrc = pageScript.replace('~', baseUrl);
        } else if (pageScript.endsWith('.js')) {
            finalSrc = `${baseUrl}/pages/${pageScript}`;
        } else {
            finalSrc = `${baseUrl}/pages/${pageScript}.js`;
        }

        moduleScript.src = finalSrc;
        document.head.appendChild(moduleScript);
        
        console.log(`%c[MSW Loader] 已啟動頁面模組: ${pageScript}`, 'color: #7239ea; font-weight: bold;');
    }
})();

