import './test-setup.js';
import test from 'node:test';
import assert from 'node:assert';
import { setupServer } from 'msw/node';
import Vue from 'vue';
globalThis.Vue = Vue;
import { mockConfig } from 'msw-store';
import { useFormInjection } from '../src/mock-entry.js';




// 載入我們的業務 Mock 處理器 (會觸發 registerMock，並保存 activeHandlers)
await import('../src/pages/ZAC/_InspOper.js');

// 取得 _InspOper.js 定義的 handlers
const handlers = mockConfig.activeHandlers;

// 啟動 MSW Node 伺服器
const server = setupServer(...handlers);

test.before(() => server.listen({ onUnhandledRequest: 'bypass' }));
test.afterEach(() => {
    server.resetHandlers();
    mockConfig.arg = 'EDC查詢'; // 每個測試後重置為預設
});
test.after(() => server.close());

test('Example/Self/ListData 應在 mockConfig.arg 為 EDC查詢 時回傳預設的 EDC查詢 數據', async (t) => {
    mockConfig.arg = 'EDC查詢';
    
    const response = await fetch('http://localhost/Example/Self/ListData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    
    assert.strictEqual(response.status, 200);
    const json = await response.json();
    
    assert.ok(json);
    assert.strictEqual(json.Code, '000');
    assert.strictEqual(json.Data.gridData[0].LOT, 'AWO001-01');
    assert.strictEqual(json.Data.gridData[0].APPLICATION_NAME, 'CheckOut');
});

test('Example/Self/ListData 應在 mockConfig.arg 為 EDC查詢1 時動態回傳變更後的 EDC查詢1 數據', async (t) => {
    mockConfig.arg = 'EDC查詢1';
    
    const response = await fetch('http://localhost/Example/Self/ListData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    
    assert.strictEqual(response.status, 200);
    const json = await response.json();
    
    assert.ok(json);
    assert.strictEqual(json.Code, '000');
    assert.strictEqual(json.Data.gridData[0].LOT, 'AWO001-01');
    assert.strictEqual(json.Data.gridData[0].APPLICATION_NAME, 'CheckOut----'); // 這是 EDC查詢1 情境的變更值
});

test('WIP/LotEDC/ListLotEDC 應根據 mockConfig.arg 切換動態回傳正確的數據', async (t) => {
    mockConfig.arg = 'EDC查詢';
    let response = await fetch('http://localhost/WIP/LotEDC/ListLotEDC', {
        method: 'POST'
    });
    let json = await response.json();
    assert.strictEqual(json.Data.gridData[0].APPLICATION_NAME, 'CheckOut');
    
    mockConfig.arg = 'EDC查詢1';
    response = await fetch('http://localhost/WIP/LotEDC/ListLotEDC', {
        method: 'POST'
    });
    json = await response.json();
    assert.strictEqual(json.Data.gridData[0].APPLICATION_NAME, 'CheckOut----');
});

test('mockConfig 應正確加載並解析多群組 inject 巢狀結構與類型', (t) => {
    const source = mockConfig.sources['_IPQC_Form'];
    assert.ok(source);
    
    // 驗證第一層為 GroupName
    assert.ok(source.inject.Basic);
    assert.ok(source.inject.Case1);
    
    // 驗證第二層指定注入對象的路徑與值
    assert.ok(source.inject.Basic['Setting.CheckOutSet.OperInspInfo']);
    assert.strictEqual(source.inject.Case1['Setting.CheckOutSet.OperInspInfo.Insp_Match'], true);
    
    // 驗證 NCR_Hold 已改為 bool
    assert.strictEqual(source.inject.Case1['Setting.CheckOutSet.OperInspInfo.NCR_Hold'], true);
    
    assert.deepStrictEqual(
        source.inject.Case1['OperInspInfo.OperInspSet.Ext.SYSTEM_JUDGMENT'],
        { "True": "T", "False": "F" }
    );

    // 驗證新增的 Fn_Inject 回呼函式
    assert.strictEqual(typeof source.inject.Case1['Setting.CheckOutSet.OperInspInfo.Fn_Inject'], 'function');
});

// 新增測試：驗證 useFormInjection 當 action.data 是 function 時能正確執行，且能正確傳入 $data 與 $vm
test('useFormInjection should execute callback function if action.data is a function', (t) => {
    const mockInstance = {
        form: {
            testVal: 'Initial'
        },
        customProp: 'VmPropertyValue',
        $watch(fn, cb) {
            // 模擬 watch 回呼觸發
            this.trigger = cb;
            return () => {};
        }
    };
    mockInstance.$data = mockInstance; // 模擬 $data

    useFormInjection(mockInstance, 'form');

    let receivedData = null;
    let receivedVm = null;

    // 模擬觸發廣播
    const callbackFn = ($d, $data, $vm) => {
        $d.testVal = 'TriggeredViaWatcher';
        receivedData = $data;
        receivedVm = $vm;
        $data.form.extraVal = 'viaWatcherData';
    };

    mockInstance.trigger({
        type: 'FILL_FORM',
        target: 'form',
        data: callbackFn
    });

    assert.strictEqual(mockInstance.form.testVal, 'TriggeredViaWatcher');
    assert.strictEqual(mockInstance.form.extraVal, 'viaWatcherData');
    assert.ok(receivedData);
    assert.ok(receivedVm);
    assert.strictEqual(receivedData, mockInstance.$data);
    assert.strictEqual(receivedVm.customProp, 'VmPropertyValue');
});
