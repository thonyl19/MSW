import Vue from 'vue';
import { mockConfig, saveCatch, loadCatch } from '../store.js';

export default {
  name: 'MockPanel',
  template: `
  <div class="mock-panel-wrapper">
    <!-- Floating Icon -->
    <div v-if="displayMode === 'icon'" 
         class="mock-floating-icon" 
         :style="iconStyle"
         @click="restorePanel" 
         @mouseenter="startHoverTimer"
         @mouseleave="clearHoverTimer"
         title="還原測試面板">🧪</div>
    
    <!-- Expanded Panel -->
    <div v-else ref="panel" class="mock-panel-container" :style="panelStyle">
      <!-- Header Area -->
      <div class="mock-panel-header" @mousedown="startDrag">
        <span class="header-icon">🧪</span>
        <div class="header-title-container">
            <span class="header-title">{{ config.pageTitle || '測試面板' }}</span>
            <span class="header-subtitle">MSW PANEL v3.5 / {{ config.activeSource }}</span>
        </div>
        <div class="header-actions">
          <button class="action-btn" @click.stop="handleCatch" title="手動儲存快照 (Catch)">💾</button>
          <button class="action-btn" @click.stop="handleClearCache" title="清除快照資料">🧹</button>
          <button class="action-btn reload-btn" 
                  :class="{ 'is-spinning': isReloading }" 
                  @click.stop="handleHotReload" 
                  title="熱重載 Mock 數據">🔄</button>
          <button class="action-btn" @click.stop="minimizeToIcon">🗗</button>
        </div>
      </div>

      <!-- Control Menu (Switch & Tabs) -->
      <div class="mock-panel-menu">
        <div class="menu-top-row">
            <div class="mock-item main-switch">
              <label class="switch-container">
                <span class="switch-label">攔截: {{ config.isEnabled ? 'ON' : 'OFF' }}</span>
                <input type="checkbox" v-model="config.isEnabled">
                <span class="slider"></span>
              </label>
            </div>
            
            <!-- [Task 004] Source Switcher -->
            <div v-if="sourceList.length > 1" class="source-switcher">
                <template v-if="sourceList.length === 2">
                    <div class="radio-group">
                        <label v-for="name in sourceList" :key="name" class="radio-label" :class="{ active: config.activeSource === name }">
                            <input type="radio" :value="name" v-model="config.activeSource" @change="updateSource(name)">
                            <span>{{ name }}</span>
                        </label>
                    </div>
                </template>
                <template v-else>
                    <select v-model="config.activeSource" @change="updateSource(config.activeSource)" class="source-select">
                        <option v-for="name in sourceList" :key="name" :value="name">{{ name }}</option>
                    </select>
                </template>
            </div>
        </div>

        <div class="mock-tabs">
          <div class="tab-item" :class="{ active: activeTab === 'msw' }" @click="activeTab = 'msw'">MSW</div>
          <div class="tab-item" :class="{ active: activeTab === 'inject' }" @click="activeTab = 'inject'">Inject</div>
        </div>
      </div>

      <div class="mock-panel-body">
        <div class="mock-panel-content">
          <!-- MSW Tab Content -->
          <div v-show="activeTab === 'msw'">
            <div class="divider"><span>基礎控制項 (Basic)</span></div>
            
            <div class="mock-item" :class="{ 'is-disabled': !config.isEnabled }">
              <div class="label-row">
                  <label>API 延遲 (ms)</label>
                  <span class="value-badge">{{ config.apiDelay }}ms</span>
              </div>
              <input type="range" v-model.number="config.apiDelay" min="0" max="5000" step="100" class="numeric-slider">
            </div>

            <div class="mock-item" :class="{ 'is-disabled': !config.isEnabled }">
              <label>API 狀態碼模擬</label>
              <div class="select-wrapper">
                <select v-model.number="config.apiStatus" :disabled="!config.isEnabled">
                  <option :value="200">200 OK</option>
                  <option :value="401">401 Unauthorized</option>
                  <option :value="403">403 Forbidden</option>
                  <option :value="500">500 Server Error</option>
                </select>
              </div>
            </div>

            <div class="divider"><span>動態業務控制 (Dynamic)</span></div>

            <div v-for="control in config.controls" :key="control.key" class="mock-item" :class="{ 'is-disabled': !config.isEnabled }">
              <label v-if="control.type !== 'actions'">{{ control.label }}</label>
              <div :class="getInputWrapperClass(control)">
                <template v-if="control.type === 'select'">
                  <div class="select-group">
                    <select v-model="config[control.key]" :disabled="!config.isEnabled">
                      <option v-for="opt in control.options" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
                    </select>
                    <button v-if="config[control.key] && config.isEnabled" 
                            class="select-clear-btn" 
                            @click="config[control.key] = ''"
                            title="清除選擇">×</button>
                  </div>
                </template>
                <template v-else-if="control.type === 'json' || control.type === 'textarea'">
                  <textarea v-model="config[control.key]" :placeholder="control.placeholder || '請輸入內容...'" :disabled="!config.isEnabled" rows="3"></textarea>
                </template>
                <template v-else-if="control.type === 'boolean' || control.type === 'switch'">
                  <label class="switch-container tiny">
                    <input type="checkbox" v-model="config[control.key]" :disabled="!config.isEnabled">
                    <span class="slider"></span>
                  </label>
                </template>
                <template v-else-if="control.type === 'slider'">
                  <input type="range" v-model.number="config[control.key]" :min="control.min || 0" :max="control.max || 100" :step="control.step || 1" :disabled="!config.isEnabled" class="numeric-slider">
                </template>
                <template v-else-if="control.type === 'actions'">
                  <div class="action-button-group">
                      <button v-for="action in control.list" :key="action.text" 
                              class="mock-btn" 
                              @click="triggerAction(action, control)"
                              :disabled="!config.isEnabled">
                          {{ action.text }}
                      </button>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Inject Tab Content -->
          <div v-show="activeTab === 'inject'">
            <div class="inject-actions-bar">
                <span class="diagnose-icon-btn" @click="runDiagnostics" title="檢測頁面 Vue 結構">🩺</span>
            </div>
            
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="搜尋 Group、路徑或情境..." class="search-input">
                <span v-if="searchQuery" class="clear-search" @click="searchQuery = ''">×</span>
            </div>

            <div v-if="Object.keys(filteredStructuredInjects).length === 0" class="empty-state">目前無符合搜尋條件的 Injection 資料</div>
            <div v-else>
              <div v-for="(items, groupName) in filteredStructuredInjects" :key="groupName" class="inject-target-group">
                <div class="group-header" @click="toggleGroup(groupName)">
                  <span class="arrow" :class="{ rotated: groupOpen[groupName] }">▶</span>
                  <span class="target-name">{{ groupName }}</span>
                </div>
                
                <div v-show="groupOpen[groupName]" class="group-cases new-structure">
                  <!-- 第二層：Path 及其下的對應型態 UI -->
                  <div v-for="item in items" :key="item.path" class="inject-path-item" :class="{ 'is-bool-item': item.type === 'bool' }">
                    <div class="path-title" :title="item.path">
                      {{ getShortTargetName(item.path) }}
                      <span class="path-full-tooltip">{{ item.path }}</span>
                    </div>
                    
                    <div class="path-control-wrapper">
                      <!-- 1. bool 類型 -->
                      <template v-if="item.type === 'bool'">
                        <label class="switch-container tiny">
                          <input type="checkbox" 
                                 :checked="getDynamicStateValue(groupName, item.path)" 
                                 @change="setDynamicStateValue(groupName, item.path, $event.target.checked)">
                          <span class="slider"></span>
                        </label>
                      </template>
                      
                      <!-- 2. array 類型 -->
                      <template v-else-if="item.type === 'array'">
                        <div class="array-checkbox-group">
                          <label v-for="val in item.originalValue" :key="String(val)" class="checkbox-label-inline">
                            <input type="checkbox" 
                                   :value="val" 
                                   :checked="isTargetArrayChecked(groupName, item.path, val)"
                                   @change="toggleArrayValue(groupName, item.path, val, $event.target.checked)">
                            <span>{{ String(val) }}</span>
                          </label>
                        </div>
                      </template>
                      
                      <!-- 3. object 類型 (按鈕卡片列表) -->
                      <template v-else-if="item.type === 'object'">
                        <div class="case-item-list">
                          <div v-for="opt in item.options" :key="opt.name" 
                               class="case-item" 
                               :title="typeof opt.data === 'function' ? '點擊執行回呼: ' + opt.name : '點擊注入: ' + opt.name"
                               @click="doInject(item.path, opt.data, opt.name)">
                            <div class="case-item-left">
                              <span class="case-icon">{{ typeof opt.data === 'function' ? '⚡' : '📥' }}</span>
                              <span class="case-name">{{ opt.name }}</span>
                            </div>
                            <span v-if="typeof opt.data !== 'function'" class="case-edit-btn" @click.stop="openJsonEditor(groupName, item.path, opt.name, opt.data)" title="編輯此情境數據">📝</span>
                          </div>
                        </div>
                      </template>

                      <!-- 4. function 類型 (單一按鈕) -->
                      <template v-else-if="item.type === 'function'">
                        <div class="case-item-list">
                          <div class="case-item is-function-trigger" 
                               title="點擊執行回呼函式"
                               @click="doInject(item.path, item.originalValue, '執行回呼')">
                            <div class="case-item-left">
                              <span class="case-icon">⚡</span>
                              <span class="case-name">執行回呼</span>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      config: mockConfig,
      displayMode: 'icon',
      activeTab: 'msw',
      searchQuery: '',
      position: { top: null, left: null, bottom: 20, right: 20 },
      iconAtTop: true,
      hoverTimer: null,
      dragging: false,
      rel: { x: 0, y: 0 },
      isReloading: false,
      groupOpen: { form: true },
      dynamicState: {}
    };
  },
  computed: {
    panelStyle() {
      if (this.position.top !== null) {
        return { top: `${this.position.top}px`, left: `${this.position.left}px`, bottom: 'auto', right: 'auto' };
      }
      return { bottom: `${this.position.bottom}px`, right: `${this.position.right}px` };
    },
    iconStyle() {
      return this.iconAtTop 
        ? { top: '20px', bottom: 'auto', right: '20px' }
        : { top: 'auto', bottom: '20px', right: '20px' };
    },
    sourceList() {
        return Object.keys(this.config.sources);
    },
    structuredInjects() {
        const source = this.config.sources[this.config.activeSource];
        const rawInjects = source ? (source.inject || {}) : {};
        const result = {};
        
        Object.keys(rawInjects).forEach(groupName => {
            const groupContent = rawInjects[groupName] || {};
            const items = [];
            
            Object.keys(groupContent).forEach(path => {
                const value = groupContent[path];
                let type = 'object';
                let options = [];
                
                if (typeof value === 'boolean') {
                    type = 'bool';
                } else if (Array.isArray(value)) {
                    type = 'array';
                } else if (typeof value === 'function') {
                    type = 'function';
                } else if (typeof value === 'object' && value !== null) {
                    type = 'object';
                    options = Object.keys(value).map(name => ({
                        name,
                        data: value[name]
                    }));
                }
                
                items.push({
                    path,
                    type,
                    originalValue: value,
                    options
                });
            });
            
            if (items.length > 0) {
                result[groupName] = items;
            }
        });
        return result;
    },
    filteredStructuredInjects() {
        const query = this.searchQuery.toLowerCase().trim();
        if (!query) return this.structuredInjects;
        
        const result = {};
        Object.keys(this.structuredInjects).forEach(groupName => {
            const items = this.structuredInjects[groupName];
            const matchingItems = items.filter(item => {
                const pathMatch = item.path.toLowerCase().includes(query);
                const groupMatch = groupName.toLowerCase().includes(query);
                const optionMatch = item.options.some(opt => opt.name.toLowerCase().includes(query));
                return pathMatch || groupMatch || optionMatch;
            });
            
            if (matchingItems.length > 0) {
                result[groupName] = matchingItems;
                this.$set(this.groupOpen, groupName, true);
            }
        });
        return result;
    }
  },
  created() {
    this.injectStyles();

    // 註冊全域 callback 供 JSON 編輯子視窗呼叫
    window.__msw_update_inject_data__ = async (groupName, target, caseName, newData, writeToFile = false) => {
        console.log(`%c[MSW Editor] 收到變更套用。群組: "${groupName}", 路徑: "${target}" -> "${caseName}"`, 'color: #7239ea; font-weight: bold;');
        
        const source = this.config.sources[this.config.activeSource];
        if (source && source.inject && source.inject[groupName] && source.inject[groupName][target]) {
            if (caseName) {
                this.$set(source.inject[groupName][target], caseName, newData);
            } else {
                this.$set(source.inject[groupName], target, newData);
            }
            
            // 立即以內存方式注入頁面
            const targetVal = caseName ? source.inject[groupName][target] : newData;
            this.injectValue(target, targetVal);
            
            // 如果使用者選擇寫入檔案
            if (writeToFile) {
                try {
                    const response = await fetch('/__msw_write_file__', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            source: this.config.activeSource,
                            groupName,
                            target,
                            caseName,
                            data: newData
                        })
                    });
                    if (response.ok) {
                        console.log('%c[MSW Editor] 實體檔案寫入成功，準備熱重載...', 'color: #10b981;');
                        await this.handleHotReload();
                    } else {
                        throw new Error(`Server responded with ${response.status}`);
                    }
                } catch (err) {
                    console.warn('%c[MSW Editor] 無法自動寫入檔案，啟用 Fallback 提示...', 'color: #f59e0b;', err);
                    const formattedJson = JSON.stringify(newData, null, 4);
                    window.prompt(
                        `[Fallback 提示] 本機 Dev Server 未啟動，無法自動寫入檔案。\n請複製下方 JSON 內容，手動覆寫到 ${this.config.activeSource}.data.js 中的對應位置：`,
                        formattedJson
                    );
                }
            }
        } else {
            console.error('[MSW Editor] 找不到對應的 inject 設定對象。');
        }
    };
    // 1. 初始化控制項預設值 (若全局 State 尚未建立)
    Object.keys(this.config.sources).forEach(title => {
        this.config.sources[title].controls.forEach(c => {
            if (this.config[c.key] === undefined && c.value !== undefined) {
                this.$set(this.config, c.key, c.value);
            }
        });
    });

    // 2. 延遲載入快照以確保來源已註冊
    setTimeout(() => {
        const snapshot = loadCatch();
        if (snapshot && snapshot.lastAction) {
            console.log('%c[MSW Panel] Re-triggering last action...', 'color: #10b981;');
            this.triggerAction({ 
                text: 'Recovered Action', 
                value: snapshot.lastAction.data 
            }, { 
                target: snapshot.lastAction.target 
            });
        }
    }, 500);

    this.initDynamicState();
  },
  mounted() {
    const pathKey = `mock-pos-${window.location.pathname.replace(/\//g, '_')}`;
    const saved = sessionStorage.getItem(pathKey) || sessionStorage.getItem('mock-panel-pos');
    if (saved) {
      try {
        const { top, left, mode, activeTab } = JSON.parse(saved);
        this.position.top = top;
        this.position.left = left;
        this.displayMode = mode || 'icon';
        if (activeTab) this.activeTab = activeTab;
      } catch (e) {}
    }
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
  },
  methods: {
    injectStyles() {
      const styleId = 'mock-panel-styles';
      if (document.getElementById(styleId)) return;
      
      // 動態計算 CSS 路徑 (基於組件自身位置)
      const cssUrl = new URL('./MockPanel.css', import.meta.url).href;
      
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = cssUrl;
      document.head.appendChild(link);
    },
    updateSource(name) {
        this.config.activeSource = name;
        this.config.controls = this.config.sources[name].controls;
        this.initDynamicState();
        console.log(`%c[MSW] Active Source Changed: ${name}`, 'color: #7239ea; font-weight: bold;');
    },
    initDynamicState() {
        const state = {};
        const injects = this.structuredInjects;
        Object.keys(injects).forEach(groupName => {
            state[groupName] = {};
            injects[groupName].forEach(item => {
                if (item.type === 'bool') {
                    state[groupName][item.path] = item.originalValue;
                } else if (item.type === 'array') {
                    state[groupName][item.path] = [];
                }
            });
        });
        this.dynamicState = state;
    },
    getInputWrapperClass(control) {
      return (control.type === 'boolean' || control.type === 'switch') ? 'switch-wrapper' : 'input-wrapper';
    },
    async handleHotReload() {
      if (this.isReloading) return;
      this.isReloading = true;
      try {
        const { reloadAllMocks } = await import('../mock-entry.js');
        await reloadAllMocks();
      } catch (e) {
      } finally {
        setTimeout(() => { this.isReloading = false; }, 500);
      }
    },
    handleCatch() { saveCatch(); },
    handleClearCache() { 
        const path = window.location.pathname;
        sessionStorage.removeItem(`msw-catch-${path}`);
        window.location.reload(); 
    },
    toggleGroup(target) {
        this.$set(this.groupOpen, target, !this.groupOpen[target]);
    },
    doInject(target, data, name) {
        this.triggerAction({ text: name, value: data }, { target });
    },
    triggerAction(action, control) {
        const target = control.target || 'form';
        const data = action.value || {};

        console.log(`%c[MSW Panel] doInject 觸發 → target: "${target}"`, 'color: #f59e0b; font-weight: bold;', data);

        // ── 路徑 A：直接 DOM 搜尋注入 ──────────────────────────────
        try {
            const searchRoots = ['#app', '#VueApp','#WipForm', '.app-container', 'body > div'];
            let targetInstance = null;
            const rootKey = target.split('.')[0];

            for (const selector of searchRoots) {
                const el = document.querySelector(selector);
                if (el && el.__vue__) {
                    const findInTree = (v) => {
                        if (v[rootKey] !== undefined) return v;
                        for (const child of v.$children) {
                            const found = findInTree(child);
                            if (found) return found;
                        }
                        return null;
                    };
                    targetInstance = findInTree(el.__vue__);
                    if (targetInstance) {
                        console.log(`%c[MSW Panel] DOM 搜尋成功 → 找到 rootKey: "${rootKey}"`, 'color: #10b981; font-weight: bold;', targetInstance);
                        break;
                    }
                }
            }

            if (targetInstance) {
                let targetObj = _.get(targetInstance, target);
                if (targetObj === undefined || targetObj === null) {
                    let obj = targetInstance;
                    const pathParts = target.split('.');
                    for (let i = 0; i < pathParts.length; i++) {
                        const part = pathParts[i];
                        if (i === pathParts.length - 1) {
                            this.$set(obj, part, {});
                        } else {
                            if (obj[part] === undefined || obj[part] === null) {
                                this.$set(obj, part, {});
                            }
                            obj = obj[part];
                        }
                    }
                    targetObj = _.get(targetInstance, target);
                }

                if (typeof action.value === 'function') {
                    console.log(`%c[MSW Panel] 執行函式回呼於 "${target}"`, 'color: #10b981;', targetObj);
                    action.value(targetObj);
                    console.log(`%c[MSW Panel] 函式執行完成！`, 'color: #10b981; font-weight: bold;');
                } else if (targetObj && typeof targetObj === 'object') {
                    console.log(`%c[MSW Panel] 直接注入到 "${target}"`, 'color: #10b981;', targetObj);
                    Object.keys(data).forEach(key => {
                        this.$set(targetObj, key, _.cloneDeep(data[key]));
                    });
                    console.log(`%c[MSW Panel] 注入完成！`, 'color: #10b981; font-weight: bold;');
                } else {
                    // 路徑不存在，遞迴建立父結構
                    console.warn(`%c[MSW Panel] "${target}" 路徑不存在，嘗試建立...`, 'color: #f59e0b;');
                    let obj = targetInstance;
                    const pathParts = target.split('.');
                    for (let i = 0; i < pathParts.length; i++) {
                        const part = pathParts[i];
                        if (i === pathParts.length - 1) {
                            this.$set(obj, part, _.cloneDeep(data));
                        } else {
                            if (obj[part] === undefined || obj[part] === null) {
                                this.$set(obj, part, {});
                            }
                            obj = obj[part];
                        }
                    }
                    console.log(`%c[MSW Panel] 路徑建立並注入完成！`, 'color: #10b981; font-weight: bold;');
                }
            } else {
                console.warn(`%c[MSW Panel] 未找到包含 rootKey "${rootKey}" 的 Vue 實例！`, 'color: #ef4444; font-weight: bold;');
                console.warn('[MSW Panel] 請確認主頁面元件已呼叫 useFormInjection(this, \'' + target + '\') 或主頁面 data 中包含 ' + rootKey);
            }
        } catch (err) {
            console.error('[MSW Panel] triggerAction 發生錯誤:', err);
        }

        // ── 路徑 B：透過 useFormInjection watcher 廣播 ─────────────
        const actionKey = control.key || control.target || 'unknown';
        Vue.set(mockConfig, 'lastAction', { 
            id: `${actionKey}_${Date.now()}`, 
            type: action.type || 'FILL_FORM', 
            target, 
            timestamp: Date.now(), 
            data 
        });
        console.log(`%c[MSW Panel] lastAction 已更新 (廣播給 useFormInjection watcher)`, 'color: #3b82f6;', mockConfig.lastAction);
    },
    async runDiagnostics() {
        try {
            const { runDiagnostics } = await import('../utils/diagnoser.js');
            runDiagnostics();
        } catch (err) {
            console.error('[MSW Diagnoser] 無法加載診斷模組:', err);
        }
    },
    openJsonEditor(groupName, target, caseName, data) {
        const editorWin = window.open('', '_blank', 'width=600,height=550,scrollbars=yes,resizable=yes');
        if (!editorWin) {
            alert('彈窗被瀏覽器阻擋，請允許此網站的彈窗！');
            return;
        }
        editorWin.document.write(`
  <html>
    <head>
      <title>編輯情境數據 - ${caseName}</title>
      <style>
        body { background: #151521; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; margin: 0; }
        .container { display: flex; flex-direction: column; height: 100vh; box-sizing: border-box; padding-bottom: 40px; }
        h3 { margin-top: 0; font-size: 16px; color: #b794f4; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
        .path-display { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 15px; word-break: break-all; background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; }
        textarea { flex: 1; min-height: 320px; background: #0f0f18; color: #a6e3a1; border: 1px solid rgba(114, 57, 234, 0.3); font-family: monospace; font-size: 14px; padding: 12px; border-radius: 8px; box-sizing: border-box; outline: none; transition: border-color 0.2s; }
        textarea:focus { border-color: #7239ea; }
        .btn-group { display: flex; justify-content: flex-end; margin-top: 15px; gap: 10px; }
        button { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px; transition: all 0.2s; }
        .btn-save-ram { background: rgba(114, 57, 234, 0.15); color: #b794f4; border: 1px solid rgba(114, 57, 234, 0.3); }
        .btn-save-ram:hover { background: rgba(114, 57, 234, 0.3); }
        .btn-save-file { background: #7239ea; color: #ffffff; box-shadow: 0 4px 12px rgba(114,57,234,0.3); }
        .btn-save-file:hover { background: #5d25cd; }
        .btn-cancel { background: rgba(255,255,255,0.1); color: #ffffff; }
        .btn-cancel:hover { background: rgba(255,255,255,0.2); }
        .error-msg { color: #f38ba8; margin-top: 10px; font-size: 13px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <h3>📝 編輯情境數據 - ${caseName}</h3>
        <div class="path-display">目標路徑: <strong>${target}</strong></div>
        <textarea id="jsonText" spellcheck="false">${JSON.stringify(data, null, 2)}</textarea>
        <div id="error" class="error-msg"></div>
        <div class="btn-group">
          <button class="btn-cancel" onclick="window.close()">取消</button>
          <button class="btn-save-ram" onclick="applyChanges(false)">立即套用 (僅內存)</button>
          <button class="btn-save-file" onclick="applyChanges(true)">覆寫檔案並重載 (API)</button>
        </div>
      </div>
      <script>
        function applyChanges(writeToFile) {
          const text = document.getElementById('jsonText').value;
          try {
            const parsed = JSON.parse(text);
            if (window.opener && !window.opener.closed) {
              window.opener.__msw_update_inject_data__('${groupName}', '${target}', '${caseName}', parsed, writeToFile);
            }
            window.close();
          } catch(e) {
            document.getElementById('error').innerText = "JSON 格式錯誤: " + e.message;
          }
        }
      </script>
    </body>
  </html>
        `);
        editorWin.document.close();
    },
    getShortTargetName(target) {
        if (!target) return '';
        const parts = target.split('.');
        return parts[parts.length - 1];
    },
    injectValue(target, value) {
        console.log(`%c[MSW Inject] 動態值注入 → target: "${target}"`, 'color: #f59e0b; font-weight: bold;', value);
        try {
            const searchRoots = ['#app', '#VueApp', '.app-container', 'body > div'];
            let targetInstance = null;
            const rootKey = target.split('.')[0];

            for (const selector of searchRoots) {
                const el = document.querySelector(selector);
                if (el && el.__vue__) {
                    const findInTree = (v) => {
                        if (v[rootKey] !== undefined) return v;
                        for (const child of v.$children) {
                            const found = findInTree(child);
                            if (found) return found;
                        }
                        return null;
                    };
                    targetInstance = findInTree(el.__vue__);
                    if (targetInstance) {
                        console.log(`%c[MSW Inject] DOM 搜尋成功 → 找到 rootKey: "${rootKey}"`, 'color: #10b981; font-weight: bold;', targetInstance);
                        break;
                    }
                }
            }

            if (targetInstance) {
                const pathParts = target.split('.');
                let obj = targetInstance;
                for (let i = 0; i < pathParts.length; i++) {
                    const part = pathParts[i];
                    if (i === pathParts.length - 1) {
                        this.$set(obj, part, _.cloneDeep(value));
                    } else {
                        if (obj[part] === undefined || obj[part] === null) {
                            this.$set(obj, part, {});
                        }
                        obj = obj[part];
                    }
                }
                console.log(`%c[MSW Inject] 成功將值注入至 "${target}"`, 'color: #10b981; font-weight: bold;');
            } else {
                console.warn(`%c[MSW Inject] 未找到包含 rootKey "${rootKey}" 的 Vue 實例，無法同步！`, 'color: #ef4444; font-weight: bold;');
            }
        } catch (err) {
            console.error('[MSW Inject] 注入時發生錯誤:', err);
        }
    },
    getDynamicStateValue(groupName, path, defaultValue = false) {
        if (!this.dynamicState[groupName]) {
            this.$set(this.dynamicState, groupName, {});
        }
        if (this.dynamicState[groupName][path] === undefined) {
            const items = this.structuredInjects[groupName] || [];
            const item = items.find(i => i.path === path);
            this.$set(this.dynamicState[groupName], path, item ? item.originalValue : defaultValue);
        }
        return this.dynamicState[groupName][path];
    },
    setDynamicStateValue(groupName, path, value) {
        if (!this.dynamicState[groupName]) {
            this.$set(this.dynamicState, groupName, {});
        }
        this.$set(this.dynamicState[groupName], path, value);
        this.injectValue(path, value);
    },
    isTargetArrayChecked(groupName, path, val) {
        if (!this.dynamicState[groupName]) {
            this.$set(this.dynamicState, groupName, {});
        }
        if (!Array.isArray(this.dynamicState[groupName][path])) {
            this.$set(this.dynamicState[groupName], path, []);
        }
        return this.dynamicState[groupName][path].includes(val);
    },
    toggleArrayValue(groupName, path, val, checked) {
        if (!this.dynamicState[groupName]) {
            this.$set(this.dynamicState, groupName, {});
        }
        if (!Array.isArray(this.dynamicState[groupName][path])) {
            this.$set(this.dynamicState[groupName], path, []);
        }
        const arr = this.dynamicState[groupName][path];
        if (checked) {
            if (!arr.includes(val)) arr.push(val);
        } else {
            const idx = arr.indexOf(val);
            if (idx > -1) arr.splice(idx, 1);
        }
        this.injectValue(path, arr);
    },
    restorePanel() { this.displayMode = 'expanded'; this.saveState(); },
    minimizeToIcon() { this.displayMode = 'icon'; this.saveState(); },
    saveState() {
        const pathKey = `mock-pos-${window.location.pathname.replace(/\//g, '_')}`;
        const state = JSON.stringify({ top: this.position.top, left: this.position.left, mode: this.displayMode, activeTab: this.activeTab });
        sessionStorage.setItem(pathKey, state);
        sessionStorage.setItem('mock-panel-pos', state);
    },
    startHoverTimer() {
      this.clearHoverTimer();
      this.hoverTimer = setTimeout(() => { this.iconAtTop = !this.iconAtTop; }, 1000);
    },
    clearHoverTimer() { if (this.hoverTimer) { clearTimeout(this.hoverTimer); this.hoverTimer = null; } },
    startDrag(e) {
      if (this.displayMode === 'icon') return;
      const rect = this.$refs.panel.getBoundingClientRect();
      this.dragging = true;
      this.rel = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    onDrag(e) {
      if (!this.dragging) return;
      let newLeft = e.clientX - this.rel.x;
      let newTop = e.clientY - this.rel.y;
      const panelWidth = this.$refs.panel.offsetWidth;
      const panelHeight = this.$refs.panel.offsetHeight;
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - panelWidth));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - panelHeight));
      this.position.left = newLeft;
      this.position.top = newTop;
    },
    stopDrag() { if (this.dragging) { this.dragging = false; this.saveState(); } }
  }
};
