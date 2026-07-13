import './test-setup.js';
import test from 'node:test';
import assert from 'node:assert';

// Mock 輕量 DOM 節點來支援 Node 測試環境
class MockElement {
    constructor(tagName = 'div') {
        this.tagName = tagName.toUpperCase();
        this.id = '';
        this.style = {};
        this.children = [];
        this.classList = {
            classes: new Set(),
            add(c) { this.classes.add(c); },
            remove(c) { this.classes.delete(c); },
            contains(c) { return this.classes.has(c); }
        };
        this.textContent = '';
        this._innerHTML = '';
        this.open = false;
        this._parent = null;
        this.listeners = {};
        this.attrs = {};
        this.value = '';
    }

    setAttribute(name, val) {
        this.attrs[name] = String(val);
    }

    getAttribute(name) {
        return this.attrs[name] || null;
    }

    get parentElement() {
        return this._parent;
    }

    set parentElement(p) {
        this._parent = p;
    }

    addEventListener(event, callback, useCapture = false) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    dispatchEvent(event, eventData = {}) {
        const callbacks = this.listeners[event] || [];
        eventData.target = eventData.target || this;
        eventData.preventDefault = eventData.preventDefault || (() => {});
        callbacks.forEach(cb => cb(eventData));
        if (this.parentElement) {
            this.parentElement.dispatchEvent(event, eventData);
        }
    }

    get innerHTML() {
        return this._innerHTML;
    }

    set innerHTML(val) {
        this._innerHTML = val;
        // 當設定 innerHTML 時，我們需要根據主要元素簡單模擬子元件的 query
        if (val.includes('msw-json-toolbar')) {
            const toolbar = new MockElement('div');
            toolbar.id = 'msw-json-toolbar';
            
            const btnExp = new MockElement('button');
            btnExp.id = 'msw-btn-exp';
            
            const btnCol = new MockElement('button');
            btnCol.id = 'msw-btn-col';
            
            const btnCpy = new MockElement('button');
            btnCpy.id = 'msw-btn-cpy';
            
            const cpyTip = new MockElement('span');
            cpyTip.id = 'msw-cpy-tip';
            
            const searchInput = new MockElement('input');
            searchInput.id = 'msw-search-input';
            
            const searchCount = new MockElement('span');
            searchCount.id = 'msw-search-count';
            
            toolbar.appendChild(btnExp);
            toolbar.appendChild(btnCol);
            toolbar.appendChild(btnCpy);
            toolbar.appendChild(cpyTip);
            toolbar.appendChild(searchInput);
            toolbar.appendChild(searchCount);
            this.appendChild(toolbar);
        }
        if (val.includes('msw-json-view-root')) {
            const root = new MockElement('div');
            root.id = 'msw-json-view-root';
            // 模擬一些測試用的 JSON 項目節點
            const item1 = new MockElement('span');
            item1.textContent = '"ROUTE_NO"';
            
            const item2 = new MockElement('span');
            item2.textContent = '"DevTest_001"';
            
            const details = new MockElement('details');
            details.classList.add('msw-json-details');
            details.appendChild(item1);
            details.appendChild(item2);
            
            root.appendChild(details);
            this.appendChild(root);
        }
        if (val.includes('msw-drag-cls')) {
            const cls = new MockElement('span');
            cls.id = 'msw-drag-cls';
            this.appendChild(cls);
        }
        if (val.includes('msw-drag-tgl')) {
            const tgl = new MockElement('span');
            tgl.id = 'msw-drag-tgl';
            this.appendChild(tgl);
        }
        if (val.includes('msw-drag-hdr')) {
            const hdr = new MockElement('div');
            hdr.id = 'msw-drag-hdr';
            this.appendChild(hdr);
        }
        if (val.includes('msw-drag-rsz')) {
            const rsz = new MockElement('div');
            rsz.id = 'msw-drag-rsz';
            this.appendChild(rsz);
        }
    }

    appendChild(child) {
        child.parentElement = this;
        this.children.push(child);
        return child;
    }

    remove() {
        if (this.parentElement) {
            const idx = this.parentElement.children.indexOf(this);
            if (idx > -1) {
                this.parentElement.children.splice(idx, 1);
            }
        }
    }

    querySelectorAll(selector) {
        const results = [];
        const traverse = (node) => {
            if (selector.startsWith('.')) {
                const className = selector.substring(1);
                if (node.classList.contains(className)) {
                    results.push(node);
                }
            } else if (selector.startsWith('#')) {
                const id = selector.substring(1);
                if (node.id === id) {
                    results.push(node);
                }
            } else if (selector === 'span, div, summary') {
                if (['SPAN', 'DIV', 'SUMMARY'].includes(node.tagName)) {
                    results.push(node);
                }
            } else {
                if (node.tagName.toLowerCase() === selector.toLowerCase()) {
                    results.push(node);
                }
            }
            node.children.forEach(traverse);
        };
        this.children.forEach(traverse);
        return results;
    }

    scrollIntoView(options) {
        this.scrolled = options;
    }
}

const mockDoc = {
    body: new MockElement('body'),
    createElement(tagName) {
        return new MockElement(tagName);
    },
    getElementById(id) {
        const find = (node) => {
            if (node.id === id) return node;
            for (const child of node.children) {
                const res = find(child);
                if (res) return res;
            }
            return null;
        };
        return find(this.body);
    }
};

globalThis.document = {
    ...globalThis.document,
    body: mockDoc.body,
    createElement: (tag) => mockDoc.createElement(tag),
    getElementById: (id) => mockDoc.getElementById(id),
};

globalThis.navigator.clipboard = {
    txt: '',
    writeText(txt) {
        this.txt = txt;
        return Promise.resolve();
    }
};

// 導入以註冊 window.msw_win
import '../src/components/MockPanel.js';

test('msw_win should render collapsible tree and search inputs', async (t) => {
    const fakeData = {
        ROUTE_NO: 'DevTest_001'
    };

    // 呼叫 msw_win 註冊 DOM
    window.msw_win({}, fakeData, '測試視窗');

    const dialog = mockDoc.getElementById('msw-drag-dialog-unique');
    assert.ok(dialog, '應成功建立對話框');

    // 測試複製 JSON 功能
    const btnCpy = mockDoc.getElementById('msw-btn-cpy');
    assert.ok(btnCpy, '應找到複製按鈕');
    btnCpy.onclick();
    assert.strictEqual(globalThis.navigator.clipboard.txt, JSON.stringify(fakeData, null, 2), '複製資料應相符');

    // 測試展開與收合按鈕
    const btnExp = mockDoc.getElementById('msw-btn-exp');
    const btnCol = mockDoc.getElementById('msw-btn-col');
    const detailsList = dialog.querySelectorAll('.msw-json-details');
    
    assert.ok(btnExp && btnCol, '應找到展開與收合按鈕');
    
    btnCol.onclick();
    detailsList.forEach(el => assert.strictEqual(el.open, false, '收合全部時 open 應為 false'));

    btnExp.onclick();
    detailsList.forEach(el => assert.strictEqual(el.open, true, '展開全部時 open 應為 true'));

    // 測試關鍵字搜尋邏輯
    const searchInput = mockDoc.getElementById('msw-search-input');
    const searchCount = mockDoc.getElementById('msw-search-count');
    assert.ok(searchInput, '應找到搜尋輸入框');

    // 模擬使用者輸入關鍵字
    searchInput.oninput({ target: { value: 'DevTest_001' } });
    
    const matched = dialog.querySelectorAll('.msw-json-match');
    assert.ok(matched.length > 0, '應能成功標記搜尋匹配項目');
    assert.ok(matched[0].classList.contains('msw-json-match-active'), '第一個匹配項目應設定 active 類別');
    assert.ok(matched[0].scrolled, '匹配項目應驅動 scrollIntoView 進行平滑捲動');

    // 測試動態修改值與往回注入功能
    const editableSpan = new MockElement('span');
    editableSpan.classList.add('msw-json-value-editable');
    editableSpan.setAttribute('data-path', JSON.stringify(['ROUTE_NO']));
    editableSpan.setAttribute('data-type', 'string');
    editableSpan.textContent = 'DevTest_002';

    // 模擬將此 span 附加到 viewRoot 底下
    const viewRoot = mockDoc.getElementById('msw-json-view-root');
    viewRoot.appendChild(editableSpan);

    // 觸發 blur 事件以進行寫回與響應式更新
    editableSpan.dispatchEvent('blur');

    // 驗證原 fakeData 中的欄位值已被成功注入變更
    assert.strictEqual(fakeData.ROUTE_NO, 'DevTest_002', 'fakeData.ROUTE_NO 應被成功修改為 DevTest_002');
});
