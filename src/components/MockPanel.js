import { mockConfig } from '../store.js';

export default {
  name: 'MockPanel',
  template: `
  <div class="mock-panel-wrapper">
    <div v-if="displayMode === 'icon'" class="mock-floating-icon" @click="restorePanel" title="還原測試面板">🧪</div>
    <div v-else ref="panel" class="mock-panel-container" :class="{ 'is-minimized': displayMode === 'collapsed' }" :style="panelStyle">
      <div class="mock-panel-header" @mousedown="startDrag">
        <span class="header-icon">🧪</span>
        <span class="header-title">{{ config.pageTitle || '測試面板' }}</span>
        <div class="header-actions">
          <button class="action-btn" @click.stop="toggleCollapse">{{ displayMode === 'collapsed' ? '▲' : '▼' }}</button>
          <button class="action-btn" @click.stop="minimizeToIcon">🗗</button>
        </div>
      </div>
      <div v-show="displayMode === 'expanded'" class="mock-panel-content">
        <div class="mock-item main-switch">
          <label class="switch-container">
            <span class="switch-label">啟用 MSW 攔截</span>
            <input type="checkbox" v-model="config.isEnabled">
            <span class="slider"></span>
          </label>
        </div>
        <div class="divider"></div>
        <div v-for="control in config.controls" :key="control.key" class="mock-item" :class="{ 'is-disabled': !config.isEnabled }">
          <label>{{ control.label }}</label>
          <div :class="control.type === 'select' ? 'select-wrapper' : 'input-wrapper'">
            <template v-if="control.type === 'select'">
              <select v-model="config[control.key]" :disabled="!config.isEnabled">
                <option v-for="opt in control.options" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
              </select>
            </template>
            <template v-else-if="control.type === 'textarea'">
              <textarea v-model="config[control.key]" :placeholder="control.placeholder || '請輸入回應內容...'" :disabled="!config.isEnabled" rows="4"></textarea>
            </template>
          </div>
        </div>
        <div v-if="!hasControl('apiDelay')" class="mock-item" :class="{ 'is-disabled': !config.isEnabled }">
          <label>API 延遲 (Latency)</label>
          <div class="select-wrapper">
            <select v-model.number="config.apiDelay" :disabled="!config.isEnabled">
              <option :value="0">0ms (無延遲)</option>
              <option :value="500">500ms (一般)</option>
              <option :value="2000">2000ms (慢網路)</option>
              <option :value="5000">5000ms (逾時測試)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      config: mockConfig,
      displayMode: 'expanded',
      position: { top: null, left: null, bottom: 20, right: 20 },
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
    }
  },
  created() {
    this.injectStyles();
  },
  mounted() {
    const saved = sessionStorage.getItem('mock-panel-pos');
    if (saved) {
      try {
        const { top, left, mode } = JSON.parse(saved);
        this.position.top = top;
        this.position.left = left;
        this.displayMode = mode || 'expanded';
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
          width: 280px;
          background: rgba(30, 30, 45, 0.3);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          color: #ffffff;
          border-radius: 24px;
          font-family: 'Outfit', system-ui, -apple-system, sans-serif;
          z-index: 999999;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .mock-panel-container:hover{
          background: rgba(30, 30, 45, 0.7);
        }

        .mock-panel-container.is-minimized { width: 180px; }
        
        .mock-floating-icon {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 56px;
          height: 56px;
          background: rgba(114, 57, 234, 0.25);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(114, 57, 234, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999999;
          font-size: 26px;
          box-shadow: 0 8px 32px rgba(114, 57, 234, 0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .mock-floating-icon:hover { 
          transform: scale(1.1) rotate(10deg); 
          background: rgba(114, 57, 234, 0.4);
        }

        .mock-panel-header {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          cursor: grab;
          user-select: none;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mock-panel-header:active { cursor: grabbing; }
        
        .header-icon { font-size: 18px; filter: drop-shadow(0 0 8px rgba(114, 57, 234, 0.5)); }
        .header-title { flex: 1; font-size: 15px; font-weight: 600; color: #ffffff; margin-left: 12px; letter-spacing: 0.5px; }
        .header-actions { display: flex; gap: 8px; }
        
        .action-btn { 
          background: rgba(255, 255, 255, 0.1); 
          border: none; 
          color: rgba(255, 255, 255, 0.8); 
          cursor: pointer; 
          padding: 6px; 
          font-size: 10px; 
          border-radius: 8px; 
          display: flex; 
          align-items: center; 
          transition: all 0.2s;
        }
        .action-btn:hover { background: rgba(255, 255, 255, 0.2); color: #ffffff; }

        .mock-panel-content { padding: 15px 10px; }
        .mock-item { margin-bottom: 10px; transition: opacity 0.3s ease; }
        .mock-item.is-disabled { opacity: 0.3; pointer-events: none; filter: grayscale(1); }
        
        .mock-item label { 
          display: block; 
          font-size: 15px; 
          font-weight: 600; 
          text-transform: uppercase; 
          color: #ffffff; 
          letter-spacing: 1px;
        }
        
        /* Glass Controls */
        select, textarea { 
          width: 100%; 
          background: rgba(0, 0, 0, 0.2);
          color: #ffffff; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          padding: 7px; 
          border-radius: 12px; 
          font-size: 15px; 
          font-family: inherit; 
          transition: all 0.3s ease;
          outline: none;
        }
        
        /* Fix Option Readability */
        option {
          background-color: #2a2a3e; /* 固定的深色背景 */
          color: #ffffff !important;
          padding: 10px;
        }

        select { 
          padding-left: 1.5rem; 
          cursor: pointer; 
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        textarea { cursor: text; resize: vertical; min-height: 80px; line-height: 1.6; }
        
        select:focus, textarea:focus { 
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(114, 57, 234, 0.6); 
          box-shadow: 0 0 15px rgba(114, 57, 234, 0.2);
        }

        /* Switch Styles */
        .main-switch { 
          background: rgba(114, 57, 234, 0.15);
          padding: 14px 18px;
          border-radius: 16px;
          border: 1px solid rgba(114, 57, 234, 0.2);
          margin-bottom: 24px;
        }
        .switch-container { display: flex !important; align-items: center; justify-content: space-between; cursor: pointer; text-transform: none !important; color: #ffffff !important; font-size: 14px !important; margin-bottom: 0 !important; }
        .switch-container input { display: none; }
        .slider { position: relative; display: inline-block; width: 44px; height: 24px; background: rgba(255, 255, 255, 0.2); border-radius: 24px; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: .4s; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        input:checked + .slider { background: #7239ea; }
        input:checked + .slider:before { transform: translateX(20px); }

        .divider { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 0 -20px 24px -20px; }
 
 

        /* Scrollbar */
        textarea::-webkit-scrollbar { width: 6px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
        textarea::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
      `;
      document.head.appendChild(style);
    },
    hasControl(key) { return this.config.controls?.some(c => c.key === key); },
    toggleCollapse() { this.displayMode = this.displayMode === 'collapsed' ? 'expanded' : 'collapsed'; this.saveState(); },
    minimizeToIcon() { this.displayMode = 'icon'; this.saveState(); },
    restorePanel() { this.displayMode = 'expanded'; this.saveState(); },
    saveState() { sessionStorage.setItem('mock-panel-pos', JSON.stringify({ top: this.position.top, left: this.position.left, mode: this.displayMode })); },
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
