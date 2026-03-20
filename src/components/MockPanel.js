import { mockConfig } from '../store.js';

export default {
  name: 'MockPanel',
  template: `
  <div class="mock-panel-wrapper">
    <div v-if="displayMode === 'icon'" 
         class="mock-floating-icon" 
         :style="iconStyle"
         @click="restorePanel" 
         @mouseenter="startHoverTimer"
         @mouseleave="clearHoverTimer"
         title="還原測試面板">🧪</div>
    <div v-else ref="panel" class="mock-panel-container" :style="panelStyle">
      <div class="mock-panel-header" @mousedown="startDrag">
        <span class="header-icon">🧪</span>
        <div class="header-title-container">
            <span class="header-title">{{ config.pageTitle || '測試面板' }}</span>
            <span class="header-subtitle">MSW INTERACTIVE PANEL v2.0</span>
        </div>
        <div class="header-actions">
          <button class="action-btn" @click.stop="minimizeToIcon">🗗</button>
        </div>
      </div>
      <div class="mock-panel-body">
        <div class="mock-panel-content">
          <div class="mock-item main-switch">
            <label class="switch-container">
              <span class="switch-label">啟用 MSW 攔截</span>
              <input type="checkbox" v-model="config.isEnabled">
              <span class="slider"></span>
            </label>
          </div>

          <div class="divider"><span>基礎控制項 (Basic)</span></div>
          
          <!-- 全域 API 延遲控制 (Number Slider) -->
          <div class="mock-item" :class="{ 'is-disabled': !config.isEnabled }">
            <div class="label-row">
                <label>API 延遲 (ms)</label>
                <span class="value-badge">{{ config.apiDelay }}ms</span>
            </div>
            <input type="range" v-model.number="config.apiDelay" min="0" max="5000" step="100" class="numeric-slider">
          </div>

          <!-- 全域 API 狀態碼 (Select) -->
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
                <select v-model="config[control.key]" :disabled="!config.isEnabled">
                  <option v-for="opt in control.options" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
                </select>
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
                            @click="triggerAction(action, control.key)"
                            :disabled="!config.isEnabled">
                        {{ action.text }}
                    </button>
                </div>
              </template>
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
      position: { top: null, left: null, bottom: 20, right: 20 },
      iconAtTop: true,
      hoverTimer: null,
      dragging: false,
      rel: { x: 0, y: 0 }
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
    }
  },
  created() {
    this.injectStyles();
  },
  mounted() {
    const pathKey = `mock-pos-${window.location.pathname.replace(/\//g, '_')}`;
    const saved = sessionStorage.getItem(pathKey) || sessionStorage.getItem('mock-panel-pos');
    if (saved) {
      try {
        const { top, left, mode } = JSON.parse(saved);
        this.position.top = top;
        this.position.left = left;
        this.displayMode = mode || 'icon';
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
      if (document.getElementById('mock-panel-styles')) return;
      const style = document.createElement('style');
      style.id = 'mock-panel-styles';
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');

        .mock-panel-container {
          position: fixed;
          width: 320px;
          background: rgba(15, 15, 25, 0.7);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          color: #ffffff;
          border-radius: 20px;
          font-family: 'Outfit', system-ui, -apple-system, sans-serif;
          z-index: 999999;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 85vh;
        }

        .mock-floating-icon {
          position: fixed;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(114, 57, 234, 0.3), rgba(64, 37, 204, 0.4));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(114, 57, 234, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999999;
          font-size: 28px;
          box-shadow: 0 8px 32px rgba(114, 57, 234, 0.3);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease;
        }
        .mock-floating-icon:hover { transform: scale(1.15) rotate(12deg); background: rgba(114, 57, 234, 0.5); }

        .mock-panel-header {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          cursor: grab;
          user-select: none;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mock-panel-header:active { cursor: grabbing; }
        
        .header-icon { font-size: 20px; filter: drop-shadow(0 0 8px rgba(114, 57, 234, 0.6)); }
        .header-title-container { flex: 1; margin-left: 14px; display: flex; flex-direction: column; }
        .header-title { font-size: 16px; font-weight: 600; color: #ffffff; letter-spacing: 0.5px; }
        .header-subtitle { font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 2px; }
        
        .action-btn { background: rgba(255, 255, 255, 0.08); border: none; color: white; cursor: pointer; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .action-btn:hover { background: rgba(255, 255, 255, 0.15); transform: translateY(-1px); }

        .mock-panel-body { overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
        .mock-panel-body::-webkit-scrollbar { width: 5px; }
        .mock-panel-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .mock-panel-content { padding: 20px; }
        .mock-item { margin-bottom: 18px; transition: opacity 0.3s ease; }
        .mock-item.is-disabled { opacity: 0.25; filter: grayscale(1); pointer-events: none; }
        
        .mock-item label { display: block; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.6); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px; }
        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .label-row label { margin-bottom: 0; }
        .value-badge { background: rgba(114, 57, 234, 0.2); color: #b794f4; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; }

        .select-wrapper { position: relative; }
        select, textarea { 
          width: 100%; background: rgba(0, 0, 0, 0.3); color: #fff; border: 1px solid rgba(255, 255, 255, 0.1); 
          padding: 10px 14px; border-radius: 12px; font-size: 14px; transition: all 0.3s; outline: none; box-sizing: border-box;
        }
        select:focus, textarea:focus { border-color: rgba(114, 57, 234, 0.5); box-shadow: 0 0 12px rgba(114, 57, 234, 0.15); background: rgba(0, 0, 0, 0.4); }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 18px; }
        option { background: #1a1a2e; color: white; }

        .numeric-slider { -webkit-appearance: none; width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 5px; outline: none; margin: 10px 0; }
        .numeric-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: #7239ea; border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px rgba(114, 57, 234, 0.4); border: 2px solid #fff; }

        .main-switch { background: rgba(114, 57, 234, 0.1); padding: 15px; border-radius: 16px; border: 1px solid rgba(114, 57, 234, 0.2); }
        .switch-container { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
        .switch-container input { display: none; }
        .switch-label { font-size: 14px; color: #fff; font-weight: 500; }
        .slider { position: relative; display: inline-block; width: 44px; height: 24px; background: rgba(255, 255, 255, 0.15); border-radius: 24px; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: .4s; }
        input:checked + .slider { background: #7239ea; }
        input:checked + .slider:before { transform: translateX(20px); }
        
        .switch-container.tiny .slider { width: 34px; height: 18px; }
        .switch-container.tiny .slider:before { height: 12px; width: 12px; left: 3px; bottom: 3px; }
        .switch-container.tiny input:checked + .slider:before { transform: translateX(16px); }

        .divider { display: flex; align-items: center; margin: 24px 0 18px 0; }
        .divider span { font-size: 10px; color: rgba(255,255,255,0.3); font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; white-space: nowrap; margin-right: 15px; }
        .divider:after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }

        .action-button-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .mock-btn { background: rgba(114, 57, 234, 0.15); border: 1px solid rgba(114, 57, 234, 0.3); color: #fff; padding: 10px; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; }
        .mock-btn:hover:not(:disabled) { background: rgba(114, 57, 234, 0.3); transform: translateY(-1px); border-color: rgba(114, 57, 234, 0.5); }
        .mock-btn:active:not(:disabled) { transform: translateY(0); }
      `;
      document.head.appendChild(style);
    },
    getInputWrapperClass(control) {
      if (control.type === 'boolean' || control.type === 'switch') return 'switch-wrapper';
      return 'input-wrapper';
    },
    triggerAction(action, controlKey) {
        // 2.6 表單/狀態動態注入: 注入鏈路
        // 1. 選取情境 -> 寫入 activePayload
        if (action.payload) {
            mockConfig.activePayload = action.payload;
        }

        // 2. 觸發信號 -> 更新 lastAction
        const timestamp = Date.now();
        mockConfig.lastAction = {
            id: `${controlKey}_${timestamp}`,
            type: action.type || 'FILL_FORM',
            timestamp,
            data: action.data || action.payload,
            metadata: action.metadata || {}
        };
        
        console.log(`%c[MSW] 觸發動作: ${action.text}`, 'color: #7239ea; font-weight: bold;');
    },
    restorePanel() { this.displayMode = 'expanded'; this.clearHoverTimer(); this.saveState(); },
    minimizeToIcon() { this.displayMode = 'icon'; this.saveState(); },
    saveState() {
        const pathKey = `mock-pos-${window.location.pathname.replace(/\//g, '_')}`;
        const state = JSON.stringify({ top: this.position.top, left: this.position.left, mode: this.displayMode });
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
