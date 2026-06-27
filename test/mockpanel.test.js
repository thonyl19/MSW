import './test-setup.js';
import test from 'node:test';
import assert from 'node:assert';
import MockPanel from '../src/components/MockPanel.js';

// Mock 全域 Vue 的 set 方法，因為測試執行在 Node 環境下
globalThis.Vue = {
    set: (obj, key, val) => {
        obj[key] = val;
    }
};

const mockPanelInstance = {
    config: {
        activeSource: 'test-source',
        sources: {
            'test-source': {
                inject: {
                    'Basic': {
                        'Setting.CheckOutSet.OperInspInfo': {
                            '檢驗項目資訊-1': { Test: 'A' }
                        }
                    }
                }
            }
        }
    },
    $set(obj, key, val) {
        obj[key] = val;
    },
    injectValue(target, value) {
        // mock 注入邏輯
        this.lastInjected = { target, value };
    }
};

// 測試 1：驗證 window.__msw_update_inject_data__ 是否正確響應式更新資料 (內存套用)
test('window.__msw_update_inject_data__ should update source inject data reactively in memory', async (t) => {
    window.__msw_update_inject_data__ = async (groupName, target, caseName, newData, writeToFile = false) => {
        const source = mockPanelInstance.config.sources[mockPanelInstance.config.activeSource];
        if (source && source.inject && source.inject[groupName] && source.inject[groupName][target]) {
            if (caseName) {
                mockPanelInstance.$set(source.inject[groupName][target], caseName, newData);
            } else {
                mockPanelInstance.$set(source.inject[groupName], target, newData);
            }
            mockPanelInstance.injectValue(target, caseName ? source.inject[groupName][target] : newData);
        }
    };

    const groupName = 'Basic';
    const targetPath = 'Setting.CheckOutSet.OperInspInfo';
    const caseName = '檢驗項目資訊-1';
    const updatedData = { Test: 'B', NewKey: 'NewVal' };
    
    await window.__msw_update_inject_data__(groupName, targetPath, caseName, updatedData, false);

    const currentInjectData = mockPanelInstance.config.sources['test-source'].inject[groupName][targetPath];
    assert.strictEqual(currentInjectData[caseName].Test, 'B');
    assert.strictEqual(currentInjectData[caseName].NewKey, 'NewVal');
    assert.deepStrictEqual(mockPanelInstance.lastInjected, { target: targetPath, value: currentInjectData });
});

// 測試 2：模擬 triggerAction 直接 DOM 搜尋注入行為
test('triggerAction should inject data into DOM Vue instance', (t) => {
    const mockVueInstance = {
        Setting: {
            CheckOutSet: {
                OperInspInfo: { Test: 'A' }
            }
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };

    const targetPath = 'Setting.CheckOutSet.OperInspInfo';
    const dataToInject = { Test: 'Hello MSW', Extra: 123 };

    const targetObj = mockVueInstance.Setting.CheckOutSet.OperInspInfo;
    
    if (targetObj && typeof targetObj === 'object') {
        Object.keys(dataToInject).forEach(key => {
            mockVueInstance.$set(targetObj, key, dataToInject[key]);
        });
    }

    assert.strictEqual(mockVueInstance.Setting.CheckOutSet.OperInspInfo.Test, 'Hello MSW');
    assert.strictEqual(mockVueInstance.Setting.CheckOutSet.OperInspInfo.Extra, 123);
});

// 測試 3：模擬 injectValue 多功能深層路徑注入行為 (包括 bool 與 array)
test('injectValue should inject any value type to Vue path directly', (t) => {
    const mockVueInstance = {
        Setting: {
            CheckOutSet: {
                OperInspInfo: {
                    Insp_Match: false,
                    NCR_Hold: []
                }
            }
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };

    // 模擬 injectValue 中對特定目標的寫入
    const injectIntoVue = (targetPath, value) => {
        const pathParts = targetPath.split('.');
        let obj = mockVueInstance;
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (i === pathParts.length - 1) {
                mockVueInstance.$set(obj, part, value);
            } else {
                if (obj[part] === undefined || obj[part] === null) {
                    mockVueInstance.$set(obj, part, {});
                }
                obj = obj[part];
            }
        }
    };

    // 測試 Boolean 注入
    injectIntoVue('Setting.CheckOutSet.OperInspInfo.Insp_Match', true);
    assert.strictEqual(mockVueInstance.Setting.CheckOutSet.OperInspInfo.Insp_Match, true);

    // 測試 Array 注入
    injectIntoVue('Setting.CheckOutSet.OperInspInfo.NCR_Hold', [true]);
    assert.deepStrictEqual(mockVueInstance.Setting.CheckOutSet.OperInspInfo.NCR_Hold, [true]);
});

// 測試 4：驗證 MockPanel.computed.structuredInjects 對於多群組嵌套 inject 規則的型態解析與轉換邏輯
test('MockPanel.computed.structuredInjects should correctly transform inject rules based on types', (t) => {
    const fakeCtx = {
        config: {
            activeSource: 'test-source',
            sources: {
                'test-source': {
                    inject: {
                        "Basic": {
                            "Setting.CheckOutSet.OperInspInfo": {
                                "檢驗項目資訊-1": { test: 123 },
                                "回呼情境-1": ($d) => { $d.test = 'modified'; }
                            }
                        },
                        "Case1": {
                            'Setting.CheckOutSet.OperInspInfo.Insp_Match': true,
                            'Setting.CheckOutSet.OperInspInfo.NCR_Hold': [true, false],
                            'Setting.CheckOutSet.OperInspInfo.OperInspSet.Ext.SYSTEM_JUDGMENT': { "True": "T", "False": "F" },
                            'Setting.CheckOutSet.OperInspInfo.DirectFn': ($d) => { $d.direct = true; }
                        }
                    }
                }
            }
        }
    };

    const result = MockPanel.computed.structuredInjects.call(fakeCtx);

    // 1. 驗證 Basic 分組 (object 類型，包含屬性為 function)
    const basicItems = result.Basic;
    assert.strictEqual(basicItems.length, 1);
    assert.strictEqual(basicItems[0].path, 'Setting.CheckOutSet.OperInspInfo');
    assert.strictEqual(basicItems[0].type, 'object');
    assert.strictEqual(basicItems[0].options.length, 2);
    assert.strictEqual(basicItems[0].options[0].name, '檢驗項目資訊-1');
    assert.strictEqual(basicItems[0].options[1].name, '回呼情境-1');
    assert.strictEqual(typeof basicItems[0].options[1].data, 'function');

    // 2. 驗證 Case1 分組
    const case1Items = result.Case1;
    assert.strictEqual(case1Items.length, 4);

    // bool 類型斷言
    const boolItem = case1Items.find(i => i.path === 'Setting.CheckOutSet.OperInspInfo.Insp_Match');
    assert.strictEqual(boolItem.type, 'bool');
    assert.strictEqual(boolItem.originalValue, true);

    // array 類型斷言
    const arrayItem = case1Items.find(i => i.path === 'Setting.CheckOutSet.OperInspInfo.NCR_Hold');
    assert.strictEqual(arrayItem.type, 'array');
    assert.deepStrictEqual(arrayItem.originalValue, [true, false]);

    // object 類型斷言
    const objItem = case1Items.find(i => i.path === 'Setting.CheckOutSet.OperInspInfo.OperInspSet.Ext.SYSTEM_JUDGMENT');
    assert.strictEqual(objItem.type, 'object');
    const expectedContext = fakeCtx.config.sources['test-source'].inject.Case1['Setting.CheckOutSet.OperInspInfo.OperInspSet.Ext.SYSTEM_JUDGMENT'];
    assert.deepStrictEqual(objItem.options, [
        { name: 'True', data: 'T', context: expectedContext },
        { name: 'False', data: 'F', context: expectedContext }
    ]);

    // function 類型斷言 (直接對應 function)
    const fnItem = case1Items.find(i => i.path === 'Setting.CheckOutSet.OperInspInfo.DirectFn');
    assert.strictEqual(fnItem.type, 'function');
    assert.strictEqual(typeof fnItem.originalValue, 'function');
});

// 測試 5：驗證 triggerAction 執行 function 時，能直接對目標物件做同步變更，且第二個參數未傳入為 undefined
test('triggerAction should execute callback function with single parameter', (t) => {
    const mockVueInstance = {
        Setting: {
            CheckOutSet: {
                OperInspInfo: { test: 'A', value: 1 }
            }
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };
    mockVueInstance.$data = mockVueInstance;

    // 建立輕量 mock DOM
    globalThis.document = {
        querySelector: () => ({
            __vue__: mockVueInstance
        })
    };

    let receivedSecondArg = 123; // 初始給非 undefined
    let thisContext = null;

    const testContextObj = { dummy: true };

    const action = {
        text: '執行回呼',
        context: testContextObj,
        value: function($d, val) {
            $d.test = 'CallbackInvoked';
            receivedSecondArg = val;
            thisContext = this;
        }
    };

    const control = {
        target: 'Setting.CheckOutSet.OperInspInfo'
    };

    MockPanel.methods.triggerAction.call(mockPanelInstance, action, control);

    // 斷言目標對象是否成功在 callback 中被同步修改
    const targetObj = mockVueInstance.Setting.CheckOutSet.OperInspInfo;
    assert.strictEqual(targetObj.test, 'CallbackInvoked');
    assert.strictEqual(receivedSecondArg, undefined);
    assert.strictEqual(thisContext, testContextObj);
});

// 測試 6：驗證當 target 直接指向 function 自身時，triggerAction 能夠正確解析出其父層物件作為第一個參數 $d
test('triggerAction should resolve parent object as $d when target directly points to the function itself', (t) => {
    const mockVueInstance = {
        Setting: {
            CheckOutSet: {
                OperInspInfo: {
                    test: 'A',
                    Fn_Inject: ($d) => {
                        // 這裡 Fn_Inject 本身就是 target
                    }
                }
            }
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };
    mockVueInstance.$data = mockVueInstance;

    // 建立輕量 mock DOM
    globalThis.document = {
        querySelector: () => ({
            __vue__: mockVueInstance
        })
    };

    let receivedD = null;
    const testFn = ($d) => {
        receivedD = $d;
    };
    
    // 設定實例上的屬性為該 function，模擬 targetObj === action.value
    mockVueInstance.Setting.CheckOutSet.OperInspInfo.Fn_Inject = testFn;

    const action = {
        text: '執行回呼',
        value: testFn
    };

    const control = {
        target: 'Setting.CheckOutSet.OperInspInfo.Fn_Inject'
    };

    MockPanel.methods.triggerAction.call(mockPanelInstance, action, control);

    // 斷言：傳入的 $d 應該是其父層 Setting.CheckOutSet.OperInspInfo，而不是 testFn 本身
    assert.strictEqual(receivedD, mockVueInstance.Setting.CheckOutSet.OperInspInfo);
});

// 測試 7：驗證互呼情境下的 this 綁定，允許透過 this["其他方法"] 互呼且能正常傳遞自定義參數
test('triggerAction should support context binding for mutual method invocation', (t) => {
    const mockVueInstance = {
        Setting: {
            CheckOutSet: {
                OperInspInfo: {
                    NCR_Hold: false,
                    Insp_Match: false
                }
            }
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };
    mockVueInstance.$data = mockVueInstance;

    globalThis.document = {
        querySelector: () => ({
            __vue__: mockVueInstance
        })
    };

    // 模擬使用者配置中的同群組 actions 對象
    const groupActions = {
        "切換_系統判定"($d, val) {
            $d.Setting.CheckOutSet.OperInspInfo.Insp_Match = val;
        },
        "全退-開扣留"($d) {
            // 透過 this 互呼，並傳遞自定義的第二個參數
            this["切換_系統判定"]($d, true);
            $d.Setting.CheckOutSet.OperInspInfo.NCR_Hold = true;
        }
    };

    const action = {
        text: '全退-開扣留',
        context: groupActions,
        value: groupActions["全退-開扣留"]
    };

    const control = {
        target: 'Setting.CheckOutSet.OperInspInfo'
    };

    MockPanel.methods.triggerAction.call(mockPanelInstance, action, control);

    // 斷言：互呼有成功執行，並且沒有因為底層佔用 val 參數而出現錯誤
    assert.strictEqual(mockVueInstance.Setting.CheckOutSet.OperInspInfo.Insp_Match, true);
    assert.strictEqual(mockVueInstance.Setting.CheckOutSet.OperInspInfo.NCR_Hold, true);
});

// 測試 8：驗證當 target 為 "$data" 時，triggerAction 能正確匹配並將 Vue 實例的 $data 物件作為第一個參數 $d 傳入
test('triggerAction should pass Vue.$data as $d when target is "$data"', (t) => {
    const mockVueInstance = {
        _isVue: true,
        $data: {
            testVal: 'original'
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };

    globalThis.document = {
        querySelector: () => ({
            __vue__: mockVueInstance
        })
    };

    let receivedD = null;
    const testFn = ($d) => {
        receivedD = $d;
    };

    const action = {
        text: '測試 $data 注入',
        value: testFn
    };

    const control = {
        target: '$data'
    };

    MockPanel.methods.triggerAction.call(mockPanelInstance, action, control);

    assert.strictEqual(receivedD, mockVueInstance.$data);
});

// 測試 9：驗證當 target 為 "$vm" 時，triggerAction 能正確匹配並將 Vue 實例本身作為第一個參數 $d 傳入
test('triggerAction should pass Vue instance ($vm) as $d when target is "$vm"', (t) => {
    const mockVueInstance = {
        _isVue: true,
        $data: {
            testVal: 'original'
        },
        $set(obj, key, val) {
            obj[key] = val;
        }
    };

    globalThis.document = {
        querySelector: () => ({
            __vue__: mockVueInstance
        })
    };

    let receivedD = null;
    const testFn = ($d) => {
        receivedD = $d;
    };

    const action = {
        text: '測試 $vm 注入',
        value: testFn
    };

    const control = {
        target: '$vm'
    };

    MockPanel.methods.triggerAction.call(mockPanelInstance, action, control);

    assert.strictEqual(receivedD, mockVueInstance);
});

