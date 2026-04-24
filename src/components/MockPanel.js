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

          <!-- Inject Tab Content (Task 005: Search) -->
          <div v-show="activeTab === 'inject'">
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="搜尋目標或情境..." class="search-input">
                <span v-if="searchQuery" class="clear-search" @click="searchQuery = ''">×</span>
            </div>

            <div v-if="!hasFilteredInjectData" class="empty-state">目前無符合搜尋條件的 Injection 資料</div>
            <div v-else>
              <div v-for="(cases, target) in filteredInjectData" :key="target" class="inject-target-group">
                <div class="group-header" @click="toggleGroup(target)">
                  <span class="arrow" :class="{ rotated: groupOpen[target] }">▶</span>
                  <span class="target-name">Target: {{ target }}</span>
                </div>
                <div v-show="groupOpen[target]" class="group-cases">
                  <div v-for="(data, name) in cases" :key="name" 
                       class="case-item" 
                       @click="doInject(target, data, name)"
                       :title="'點擊注入: ' + name">
                    <span class="case-icon">📥</span>
                    <span class="case-name">{{ name }}</span>
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
      groupOpen: { form: true }
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
    injectData() {
        const source = this.config.sources[this.config.activeSource];
        return source ? (source.inject || {}) : {};
    },
    filteredInjectData() {
        const query = this.searchQuery.toLowerCase().trim();
        if (!query) return this.injectData;

        const filtered = {};
        Object.keys(this.injectData).forEach(target => {
            const cases = this.injectData[target];
            const matchingCases = {};
            const targetMatches = target.toLowerCase().includes(query);
            
            Object.keys(cases).forEach(name => {
                if (targetMatches || name.toLowerCase().includes(query)) {
                    matchingCases[name] = cases[name];
                }
            });

            if (Object.keys(matchingCases).length > 0) {
                filtered[target] = matchingCases;
                // 自動展開符合的內容
                this.$set(this.groupOpen, target, true);
            }
        });
        return filtered;
    },
    hasFilteredInjectData() {
        return Object.keys(this.filteredInjectData).length > 0;
    }
  },
  created() {
    this.injectStyles();
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
        console.log(`%c[MSW] Active Source Changed: ${name}`, 'color: #7239ea; font-weight: bold;');
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
        this.$nextTick(() => {
            try {
                const searchRoots = ['#app', '.app-container', 'body > div'];
                let targetInstance = null;
                for (const selector of searchRoots) {
                    const el = document.querySelector(selector);
                    if (el && el.__vue__) {
                        const findInTree = (v) => {
                            if (v[target]) return v;
                            for (const child of v.$children) {
                                const found = findInTree(child);
                                if (found) return found;
                            }
                            return null;
                        };
                        targetInstance = findInTree(el.__vue__);
                        if (targetInstance) break;
                    }
                }
                if (targetInstance) {
                    Object.keys(data).forEach(key => {
                        this.$set(targetInstance[target], key, _.cloneDeep(data[key]));
                    });
                }
            } catch (err) {}
        });
        const actionKey = control.key || control.target || 'unknown';
        mockConfig.lastAction = { 
            id: `${actionKey}_${Date.now()}`, 
            type: action.type || 'FILL_FORM', 
            target, 
            timestamp: Date.now(), 
            data 
        };
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
