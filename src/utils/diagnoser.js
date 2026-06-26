/**
 * MSW 頁面 Vue 結構診斷工具 (動態載入)
 */
export const runDiagnostics = () => {
    console.log('%c[MSW Diagnoser] 開始偵測頁面 Vue 結構...', 'color: #7239ea; font-weight: bold; font-size: 14px;');
    try {
        const allElements = Array.from(document.querySelectorAll('*'));
        const vueElements = allElements.filter(el => el.__vue__);
        
        if (vueElements.length === 0) {
            console.warn('%c[MSW Diagnoser] ⚠️ 頁面上沒有偵測到任何 Vue 實例！', 'color: #ef4444; font-weight: bold;');
            return;
        }

        const reports = vueElements.map(el => {
            const vm = el.__vue__;
            const id = el.id ? `#${el.id}` : '';
            const classes = el.className ? `.${el.className.split(' ').filter(c => c && !c.startsWith('mock-')).slice(0, 2).join('.')}` : '';
            const selector = el.tagName.toLowerCase() + id + classes;
            
            return {
                'DOM 掛載點 (Selector)': selector,
                'Vue data 屬性 (rootKeys)': Object.keys(vm.$data || {}),
                'Vue computed 屬性': Object.keys(vm.$options.computed || {})
            };
        });

        console.log(`%c[MSW Diagnoser] 偵測到 ${reports.length} 個 Vue 實例。詳細報告如下：`, 'color: #10b981; font-weight: bold;');
        console.table(reports);
        
        console.log('%c💡 排查與注入建議：', 'color: #f59e0b; font-weight: bold;');
        console.log('1. 如果使用「直接 DOM 搜尋注入」，請確認 Mock Panel 的 searchRoots 中包含對應的「DOM 掛載點」。');
        console.log('2. 您的 inject 設定中，目標路徑的 rootKey 必須是「Vue data 屬性 (rootKeys)」中所列出的其中一個屬性名稱（例如：Setting）。');
    } catch (err) {
        console.error('[MSW Diagnoser] 偵測過程中發生錯誤:', err);
    }
};
