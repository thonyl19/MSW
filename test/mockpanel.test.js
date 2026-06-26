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
                                "檢驗項目資訊-1": { test: 123 }
                            }
                        },
                        "Case1": {
                            'Setting.CheckOutSet.OperInspInfo.Insp_Match': true,
                            'Setting.CheckOutSet.OperInspInfo.NCR_Hold': [true, false],
                            'Setting.CheckOutSet.OperInspInfo.OperInspSet.Ext.SYSTEM_JUDGMENT': { "True": "T", "False": "F" }
                        }
                    }
                }
            }
        }
    };

    const result = MockPanel.computed.structuredInjects.call(fakeCtx);

    // 1. 驗證 Basic 分組 (object 類型)
    const basicItems = result.Basic;
    assert.strictEqual(basicItems.length, 1);
    assert.strictEqual(basicItems[0].path, 'Setting.CheckOutSet.OperInspInfo');
    assert.strictEqual(basicItems[0].type, 'object');
    assert.deepStrictEqual(basicItems[0].options, [
        { name: '檢驗項目資訊-1', data: { test: 123 } }
    ]);

    // 2. 驗證 Case1 分組
    const case1Items = result.Case1;
    assert.strictEqual(case1Items.length, 3);

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
    assert.deepStrictEqual(objItem.options, [
        { name: 'True', data: 'T' },
        { name: 'False', data: 'F' }
    ]);
});

