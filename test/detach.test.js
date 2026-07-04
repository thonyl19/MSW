import './test-setup.js';
import test from 'node:test';
import assert from 'node:assert';
import { serializeConfig, deserializeConfig } from '../src/msw-channel.js';

// Mock Vue 提供狀態響應式功能，因為測試執行在 Node 環境下
globalThis.Vue = {
    set: (obj, key, val) => {
        obj[key] = val;
    },
    observable: (obj) => obj,
    nextTick: (fn) => fn()
};

// 測試 1：驗證 serializeConfig 序列化邏輯是否正確過濾 Function，改以 placeholder 標記
test('serializeConfig should strip functions and mark them with placeholder', () => {
    const config = {
        isEnabled: true,
        apiDelay: 100,
        apiStatus: 200,
        pageTitle: 'Test Page',
        activeSource: 'sourceA',
        loadedPages: ['page1.js'],
        controls: [{ key: 'testVal', type: 'text' }],
        sources: {
            sourceA: {
                controls: [{ key: 'testVal', type: 'text' }],
                inject: {
                    groupA: {
                        'path.to.target': {
                            staticVal: 'hello',
                            funcVal: ($d) => { console.log($d); }
                        },
                        'path.to.func': ($d) => { return $d; }
                    }
                }
            }
        },
        testVal: 'someValue'
    };

    const serialized = serializeConfig(config);

    // 驗證基本屬性被成功複製
    assert.strictEqual(serialized.isEnabled, true);
    assert.strictEqual(serialized.apiDelay, 100);
    assert.strictEqual(serialized.apiStatus, 200);
    assert.strictEqual(serialized.pageTitle, 'Test Page');
    assert.strictEqual(serialized.activeSource, 'sourceA');
    assert.deepStrictEqual(serialized.loadedPages, ['page1.js']);

    // 驗證自訂控制項值被成功提取
    assert.strictEqual(serialized.values.testVal, 'someValue');

    // 驗證注入結構中的 Function 已被標記為 { __isFunction: true }，防止 DataCloneError
    const targetInject = serialized.sources.sourceA.inject.groupA['path.to.target'];
    assert.strictEqual(targetInject.staticVal, 'hello');
    assert.deepStrictEqual(targetInject.funcVal, { __isFunction: true });

    const funcInject = serialized.sources.sourceA.inject.groupA['path.to.func'];
    assert.deepStrictEqual(funcInject, { __isFunction: true });
});

// 測試 2：驗證 deserializeConfig 能成功將序列化狀態還原至目標視窗的 config
test('deserializeConfig should restore state values and controls onto target config', () => {
    const serialized = {
        isEnabled: false,
        apiDelay: 200,
        apiStatus: 500,
        pageTitle: 'New Page',
        activeSource: 'sourceB',
        loadedPages: ['page2.js'],
        controls: [{ key: 'newVal', type: 'number' }],
        sources: {
            sourceB: {
                controls: [{ key: 'newVal', type: 'number' }],
                inject: {
                    groupB: {
                        'some.path': { val: 42 }
                    }
                }
            }
        },
        values: {
            newVal: 100
        }
    };

    const targetConfig = {
        isEnabled: true,
        apiDelay: 0,
        apiStatus: 200,
        pageTitle: '',
        controls: [],
        sources: {},
        activeSource: ''
    };

    deserializeConfig(serialized, targetConfig);

    // 驗證值成功還原與覆寫
    assert.strictEqual(targetConfig.isEnabled, false);
    assert.strictEqual(targetConfig.apiDelay, 200);
    assert.strictEqual(targetConfig.apiStatus, 500);
    assert.strictEqual(targetConfig.pageTitle, 'New Page');
    assert.strictEqual(targetConfig.activeSource, 'sourceB');
    assert.deepStrictEqual(targetConfig.loadedPages, ['page2.js']);
    assert.strictEqual(targetConfig.newVal, 100);
    assert.deepStrictEqual(targetConfig.sources.sourceB.inject.groupB['some.path'], { val: 42 });
});
