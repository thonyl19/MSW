import test from 'node:test';
import assert from 'node:assert';
import { runDiagnostics } from '../src/utils/diagnoser.js';

// 建立全域 DOM 模擬 (JSDOM 輕量 Mock)
globalThis.document = {
    querySelectorAll: () => {
        // 模擬一個 Vue 元件 DOM 節點
        const mockEl = {
            tagName: 'DIV',
            id: 'VueApp',
            className: 'test-container',
            __vue__: {
                $data: {
                    Setting: {
                        CheckOutSet: {
                            OperInspInfo: {}
                        }
                    }
                },
                $options: {
                    computed: {
                        isLoaded: () => true
                    }
                }
            }
        };
        return [mockEl];
    }
};

test('runDiagnostics should successfully scan DOM and log table', (t) => {
    const logs = [];
    const tables = [];
    const warns = [];

    // Mock console 方法
    const originalLog = console.log;
    const originalTable = console.table;
    const originalWarn = console.warn;

    console.log = (...args) => logs.push(args.join(' '));
    console.table = (data) => tables.push(data);
    console.warn = (...args) => warns.push(args.join(' '));

    try {
        runDiagnostics();

        // 斷言 1：驗證是否正確印出啟動日誌
        assert.ok(logs.some(l => l.includes('開始偵測頁面 Vue 結構')));

        // 斷言 2：驗證是否偵測到 1 個 Vue 實例並印出 table 數據
        assert.strictEqual(tables.length, 1);
        const report = tables[0][0];
        assert.strictEqual(report['DOM 掛載點 (Selector)'], 'div#VueApp.test-container');
        assert.deepStrictEqual(report['Vue data 屬性 (rootKeys)'], ['Setting']);
        assert.deepStrictEqual(report['Vue computed 屬性'], ['isLoaded']);

        // 斷言 3：驗證排查建議是否被正確印出
        assert.ok(logs.some(l => l.includes('排查與注入建議')));
        
    } finally {
        // 還原 console
        console.log = originalLog;
        console.table = originalTable;
        console.warn = originalWarn;
    }
});

test('runDiagnostics should log warn when no Vue instances found', (t) => {
    // 模擬沒有 Vue 的 DOM
    const originalQuerySelectorAll = globalThis.document.querySelectorAll;
    globalThis.document.querySelectorAll = () => [];

    const warns = [];
    const originalWarn = console.warn;
    console.warn = (...args) => warns.push(args.join(' '));

    try {
        runDiagnostics();
        assert.ok(warns.some(w => w.includes('頁面上沒有偵測到任何 Vue 實例')));
    } finally {
        console.warn = originalWarn;
        globalThis.document.querySelectorAll = originalQuerySelectorAll;
    }
});
