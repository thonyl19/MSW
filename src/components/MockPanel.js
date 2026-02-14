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
        <div v-for="control in config.controls" :key="control.key" class="mock-item">
          <label>{{ control.label }}</label>
          <div class="select-wrapper">
            <span v-if="control.type === 'select'" class="status-icon" :class="config[control.key]"></span>
            <select v-if="control.type === 'select'" v-model="config[control.key]">
              <option v-for="opt in control.options" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
            </select>
          </div>
        </div>
        <div v-if="!hasControl('apiDelay')" class="mock-item">
          <label>API 延遲 (Latency)</label>
          <div class="select-wrapper">
            <select v-model.number="config.apiDelay">
              <option :value="0">0ms (無延遲)</option>
              <option :value="500">500ms (一般)</option>
              <option :value="2000">2000ms (慢網路)</option>
              <option :value="5000">5000ms (逾時測試)</option>
            </select>
          </div>
        </div>
        <div class="mock-footer"><small>MSW 運作中 (No-Build Mode)</small></div>
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
        .mock-panel-container {
          position: fixed;
          width: 280px;
          background-color: #1e1e2d;
          color: #a2a3b7;
          border-radius: 12px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.6);
          font-family: 'Outfit', 'Segoe UI', system-ui, -apple-system, sans-serif;
          z-index: 999999;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: width 0.3s ease, height 0.3s ease;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .mock-panel-container.is-minimized { width: 180px; }
        .mock-floating-icon {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 52px;
          height: 52px;
          background: #1e1e2d;
          border: 1px solid #7239ea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999999;
          font-size: 24px;
          box-shadow: 0 8px 24px rgba(114, 57, 234, 0.3);
          opacity: 0.6;
          transition: all 0.3s;
        }
        .mock-floating-icon:hover { opacity: 1; transform: scale(1.1) rotate(15deg); }
        .mock-panel-header {
          padding: 12px 16px;
          background: linear-gradient(90deg, #2b2b40 0%, #1e1e2d 100%);
          display: flex;
          align-items: center;
          cursor: grab;
          user-select: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .header-title { flex: 1; font-size: 14px; font-weight: 600; color: #ffffff; margin-left: 10px; }
        .header-actions { display: flex; gap: 8px; }
        .action-btn { background: transparent; border: none; color: #6c7293; cursor: pointer; padding: 4px; font-size: 12px; border-radius: 4px; display: flex; align-items: center; }
        .mock-panel-content { padding: 20px; }
        .mock-item { margin-bottom: 18px; }
        .mock-item label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; color: #6c7293; }
        .select-wrapper { position: relative; display: flex; align-items: center; }
        select { width: 100%; background-color: #24243e; color: #ffffff; border: 1px solid #3f4254; padding: 8px 12px 8px 34px; border-radius: 6px; font-size: 13px; appearance: none; cursor: pointer; }
        .status-icon { position: absolute; left: 12px; width: 10px; height: 10px; border-radius: 50%; background-color: #444; }
        .status-icon.success, .status-icon.test { background-color: #10b981; }
        .status-icon.error { background-color: #f59e0b; }
        .mock-footer { margin-top: 15px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px; font-size: 10px; color: #444b66; }
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
