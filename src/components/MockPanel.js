import Vue from 'vue';
import { mockConfig, saveCatch, loadCatch } from '../store.js';

// 註冊全域公用彈窗接口
window.msw_win = function ($d, data, title = '資料查看') {
    if (!$d) {
        console.warn('[MSW] msw_win 必須傳入當前 Vue 實例 ($d)');
        return;
    }
    
    // 輔助 HTML 跳脫
    function escapeHtml(str) {
        if (typeof str !== 'string') return str;
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // 遞迴渲染 JSON 樹狀結構
    function renderJsonHtml(val, key = null, isLast = true) {
        const type = typeof val;
        let html = '';
        const keySpan = key !== null ? `<span style="color: #b794f4; user-select: text;">"${key}"</span>: ` : '';
        
        if (val === null) {
            html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span style="color: #ff79c6;">null</span>${isLast ? '' : ','}</div>`;
        } else if (Array.isArray(val)) {
            if (val.length === 0) {
                html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span style="color: #8be9fd;">[]</span>${isLast ? '' : ','}</div>`;
            } else {
                html = `
                    <details open class="msw-json-details" style="padding-left: 15px; margin: 2px 0;">
                        <summary style="cursor: pointer; outline: none; list-style: none; user-select: none; color: #8be9fd; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                            <span style="display: inline-block; width: 10px; transition: transform 0.2s; transform: rotate(90deg);" class="msw-arrow">▶</span>
                            <span>${keySpan}<span style="color: #8be9fd;">[</span></span> <span style="font-size: 11px; color: #6272a4; font-weight: normal; margin-left: 8px;">// ${val.length} items</span>
                        </summary>
                        <div class="msw-json-indent" style="border-left: 1px dashed rgba(255,255,255,0.15); padding-left: 10px; margin-left: 5px;">
                            ${val.map((item, idx) => renderJsonHtml(item, null, idx === val.length - 1)).join('')}
                        </div>
                        <div style="padding-left: 14px; color: #8be9fd; user-select: text;">]${isLast ? '' : ','}</div>
                    </details>
                `;
            }
        } else if (type === 'object') {
            const keys = Object.keys(val);
            if (keys.length === 0) {
                html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span style="color: #f1fa8c;">{}</span>${isLast ? '' : ','}</div>`;
            } else {
                html = `
                    <details open class="msw-json-details" style="padding-left: 15px; margin: 2px 0;">
                        <summary style="cursor: pointer; outline: none; list-style: none; user-select: none; color: #f1fa8c; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                            <span style="display: inline-block; width: 10px; transition: transform 0.2s; transform: rotate(90deg);" class="msw-arrow">▶</span>
                            <span>${keySpan}<span style="color: #f1fa8c;">{</span></span> <span style="font-size: 11px; color: #6272a4; font-weight: normal; margin-left: 8px;">// ${keys.length} keys</span>
                        </summary>
                        <div class="msw-json-indent" style="border-left: 1px dashed rgba(255,255,255,0.15); padding-left: 10px; margin-left: 5px;">
                            ${keys.map((k, idx) => renderJsonHtml(val[k], k, idx === keys.length - 1)).join('')}
                        </div>
                        <div style="padding-left: 14px; color: #f1fa8c; user-select: text;">}${isLast ? '' : ','}</div>
                    </details>
                `;
            }
        } else if (type === 'string') {
            html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span style="color: #50fa7b;">"${escapeHtml(val)}"</span>${isLast ? '' : ','}</div>`;
        } else if (type === 'number') {
            html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span style="color: #ffb86c;">${val}</span>${isLast ? '' : ','}</div>`;
        } else if (type === 'boolean') {
            html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span style="color: #ff79c6;">${val}</span>${isLast ? '' : ','}</div>`;
        } else {
            html = `<div style="padding-left: 20px; user-select: text;">${keySpan}<span>${escapeHtml(String(val))}</span>${isLast ? '' : ','}</div>`;
        }
        
        return html;
    }

    // 移除已存在的舊視窗
    const oldWin = document.getElementById('msw-drag-dialog-unique');
    if (oldWin) oldWin.remove();

    // 建立 Dialog 容器
    const dialog = document.createElement('div');
    dialog.id = 'msw-drag-dialog-unique';
    dialog.isFullscreen = false;
    dialog.prevBounds = {};
    dialog.style.cssText = `
        position: fixed;
        z-index: 999999;
        top: 15%;
        left: 25%;
        width: 650px;
        height: 480px;
        display: flex;
        flex-direction: column;
        background: #151521;
        border: 2px solid #7239ea;
        border-radius: 10px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    const btnStyle = `
        background: #242438;
        border: 1px solid #7239ea;
        color: #b794f4;
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        outline: none;
    `;

    // 內部 HTML 結構
    dialog.innerHTML = `
        <style>
            .msw-json-details > summary::-webkit-details-marker {
                display: none;
            }
            .msw-json-details > summary {
                list-style: none;
            }
            .msw-json-details:not([open]) > summary .msw-arrow {
                transform: rotate(0deg) !important;
            }
            #msw-search-input:focus {
                border-color: #a5e844 !important;
            }
            .msw-json-match {
                background: rgba(241, 250, 140, 0.25) !important;
                border-radius: 2px;
            }
            .msw-json-match-active {
                background: rgba(255, 184, 108, 0.45) !important;
                border-radius: 2px;
                box-shadow: 0 0 4px #ffb86c;
            }
        </style>
        <div id="msw-drag-hdr" style="padding: 12px 18px; background: #1e1e2f; cursor: move; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); user-select: none;">
            <span style="font-weight: bold; color: #b794f4; font-size: 14px;">🔍 ${title}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span id="msw-drag-tgl" style="cursor: pointer; color: #b794f4; font-weight: bold; font-size: 16px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s;" title="最大化" onmouseenter="this.style.background='rgba(183, 148, 244, 0.2)'" onmouseleave="this.style.background='transparent'">🗖</span>
                <span id="msw-drag-cls" style="cursor: pointer; color: #ef4444; font-weight: bold; font-size: 16px; padding: 2px 8px; border-radius: 4px; transition: background 0.2s;" title="關閉" onmouseenter="this.style.background='rgba(239, 68, 68, 0.2)'" onmouseleave="this.style.background='transparent'">✕</span>
            </div>
        </div>
        <div id="msw-json-toolbar" style="padding: 6px 12px; background: #11111b; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; gap: 8px; align-items: center;">
            <button id="msw-btn-exp" style="${btnStyle}" onmouseenter="this.style.background='#7239ea'; this.style.color='#fff';" onmouseleave="this.style.background='#242438'; this.style.color='#b794f4';">📂 展開全部</button>
            <button id="msw-btn-col" style="${btnStyle}" onmouseenter="this.style.background='#7239ea'; this.style.color='#fff';" onmouseleave="this.style.background='#242438'; this.style.color='#b794f4';">📁 收合全部</button>
            <button id="msw-btn-cpy" style="${btnStyle}" onmouseenter="this.style.background='#7239ea'; this.style.color='#fff';" onmouseleave="this.style.background='#242438'; this.style.color='#b794f4';">📋 複製 JSON</button>
            <span id="msw-cpy-tip" style="color: #50fa7b; font-size: 12px; margin-left: 8px; display: none; font-weight: bold;">已複製!</span>
            <div style="flex: 1;"></div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <input id="msw-search-input" placeholder="搜尋關鍵字..." style="background: #11111b; border: 1px solid #7239ea; color: #f8f8f2; border-radius: 4px; padding: 4px 8px; font-size: 12px; outline: none; width: 140px; font-family: inherit; transition: border-color 0.2s;" />
                <span id="msw-search-count" style="color: #6272a4; font-size: 11px; display: none; min-width: 40px; text-align: right; user-select: none;">0/0</span>
            </div>
        </div>
        <div style="flex: 1; padding: 12px; overflow: auto; background: #0f0f18;">
            <div id="msw-json-view-root" style="margin: 0; background: #1e1e2f; color: #f8f8f2; padding: 15px; border-radius: 6px; border: 1px solid #444; font-family: 'Consolas', 'Fira Code', monospace; font-size: 13px; line-height: 1.5; word-break: break-all; text-align: left;">${renderJsonHtml(data, null, true)}</div>
        </div>
        <div id="msw-drag-rsz" style="position: absolute; right: 0; bottom: 0; width: 18px; height: 18px; cursor: se-resize; background: linear-gradient(135deg, transparent 8px, #7239ea 8px); border-bottom-right-radius: 8px;"></div>
    `;

    document.body.appendChild(dialog);

    // 取得元件控制對象
    const header = document.getElementById('msw-drag-hdr');
    const toggleBtn = document.getElementById('msw-drag-tgl');
    const closeBtn = document.getElementById('msw-drag-cls');
    const resizer = document.getElementById('msw-drag-rsz');

    // 註冊工具列事件
    document.getElementById('msw-btn-exp').onclick = () => {
        dialog.querySelectorAll('.msw-json-details').forEach(el => el.open = true);
    };
    document.getElementById('msw-btn-col').onclick = () => {
        dialog.querySelectorAll('.msw-json-details').forEach(el => el.open = false);
    };
    document.getElementById('msw-btn-cpy').onclick = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
            const tip = document.getElementById('msw-cpy-tip');
            tip.style.display = 'inline';
            setTimeout(() => {
                tip.style.display = 'none';
            }, 1500);
        }).catch(err => {
            console.error('複製失敗: ', err);
        });
    };

    // 註冊搜尋邏輯
    let matches = [];
    let currentMatchIndex = -1;
    const searchInput = document.getElementById('msw-search-input');
    const searchCount = document.getElementById('msw-search-count');
    const viewRoot = document.getElementById('msw-json-view-root');

    function performSearch(query) {
        // 清除舊有標記
        dialog.querySelectorAll('.msw-json-match, .msw-json-match-active').forEach(el => {
            el.classList.remove('msw-json-match', 'msw-json-match-active');
        });
        matches = [];
        currentMatchIndex = -1;
        searchCount.style.display = 'none';

        if (!query) return;

        const q = query.toLowerCase();
        const elements = viewRoot.querySelectorAll('span, div, summary');
        elements.forEach(el => {
            if (el.children.length === 0 || (el.tagName === 'SUMMARY' && el.querySelector('.msw-arrow'))) {
                let text = el.textContent;
                if (text.toLowerCase().includes(q)) {
                    matches.push(el);
                    el.classList.add('msw-json-match');
                }
            }
        });

        if (matches.length > 0) {
            searchCount.style.display = 'inline';
            navigateSearch(0);
        } else {
            searchCount.style.display = 'inline';
            searchCount.textContent = '0/0';
            searchCount.style.color = '#ef4444';
        }
    }

    function navigateSearch(index) {
        if (matches.length === 0) return;
        
        if (currentMatchIndex >= 0 && currentMatchIndex < matches.length) {
            matches[currentMatchIndex].classList.remove('msw-json-match-active');
        }

        currentMatchIndex = (index + matches.length) % matches.length;
        const activeEl = matches[currentMatchIndex];
        activeEl.classList.add('msw-json-match-active');

        // 展開所有父 details
        let parent = activeEl.parentElement;
        while (parent && parent !== viewRoot) {
            if (parent.tagName === 'DETAILS') {
                parent.open = true;
            }
            parent = parent.parentElement;
        }

        searchCount.textContent = `${currentMatchIndex + 1}/${matches.length}`;
        searchCount.style.color = '#6272a4';

        // 滾動到可見位置
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    searchInput.oninput = (e) => {
        performSearch(e.target.value.trim());
    };

    searchInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (matches.length > 0) {
                navigateSearch(currentMatchIndex + (e.shiftKey ? -1 : 1));
            }
        }
    };

    // 關閉事件
    closeBtn.onclick = () => dialog.remove();

    // 全螢幕 / 還原切換邏輯
    toggleBtn.onclick = function () {
        if (!dialog.isFullscreen) {
            // 記錄當前視窗位置尺寸
            dialog.prevBounds = {
                top: dialog.style.top,
                left: dialog.style.left,
                width: dialog.style.width,
                height: dialog.style.height
            };
            // 設為全螢幕
            dialog.style.top = '0px';
            dialog.style.left = '0px';
            dialog.style.width = '100vw';
            dialog.style.height = '100vh';
            dialog.style.borderRadius = '0px';
            
            // 隱藏縮放控制手把、鎖定拖曳 cursor
            resizer.style.display = 'none';
            header.style.cursor = 'default';
            
            // 切換按鈕圖示與懸浮文字
            toggleBtn.innerText = '🗗';
            toggleBtn.title = '向下還原';
            dialog.isFullscreen = true;
        } else {
            // 還原視窗位置尺寸
            dialog.style.top = dialog.prevBounds.top;
            dialog.style.left = dialog.prevBounds.left;
            dialog.style.width = dialog.prevBounds.width;
            dialog.style.height = dialog.prevBounds.height;
            dialog.style.borderRadius = '10px';
            
            // 顯示縮放手把、恢復拖曳 cursor
            resizer.style.display = 'block';
            header.style.cursor = 'move';
            
            // 切換按鈕圖示與懸浮文字
            toggleBtn.innerText = '🗖';
            toggleBtn.title = '最大化';
            dialog.isFullscreen = false;
        }
    };

    // 拖曳邏輯 (Drag)
    header.onmousedown = function (e) {
        if (dialog.isFullscreen) return; // 全螢幕時禁用拖曳
        if (e.target.id === 'msw-drag-cls' || e.target.id === 'msw-drag-tgl') return;
        e.preventDefault();
        const startX = e.clientX - dialog.offsetLeft;
        const startY = e.clientY - dialog.offsetTop;
        
        function onMouseMove(moveEvent) {
            dialog.style.left = (moveEvent.clientX - startX) + 'px';
            dialog.style.top = (moveEvent.clientY - startY) + 'px';
        }
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        });
    };

    // 縮放邏輯 (Resize)
    resizer.onmousedown = function (e) {
        if (dialog.isFullscreen) return; // 全螢幕時禁用縮放
        e.preventDefault();
        const startWidth = dialog.offsetWidth;
        const startHeight = dialog.offsetHeight;
        const startX = e.clientX;
        const startY = e.clientY;
        
        function onMouseMove(moveEvent) {
            const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
            const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
            dialog.style.width = newWidth + 'px';
            dialog.style.height = newHeight + 'px';
        }
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        });
    };
};

export default {
  name: 'MockPanel',
  inject: {
    mswChannel: {
      default: null
    }
  },
  props: {
    isDetached: {
      type: Boolean,
      default: false
    }
  },
  template: `
  <div v-show="isDetached || !config.isDetachedMode" class="mock-panel-wrapper">
    <!-- Floating Icon -->
    <div v-if="!isDetached && displayMode === 'icon'" 
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
          <!-- Relocated Diagnose Button in Header Actions (Only shows on Inject Tab) -->
          <button v-if="activeTab === 'inject'" class="action-btn diagnose-action-btn" @click.stop="runDiagnostics" title="檢測頁面 Vue 結構">🩺</button>
          <button v-if="!isDetached" class="action-btn" @click.stop="detachPanel" title="獨立子視窗模式">🗔</button>
          <button v-if="!isDetached" class="action-btn" @click.stop="minimizeToIcon">🗗</button>
        </div>
      </div>

      <!-- Control Menu (Switch & Tabs) -->
      <div class="mock-panel-menu">
        <div class="menu-top-row">
            <div class="main-switch">
              <span class="switch-label">攔截</span>
              <label class="switch-container">
                <input type="checkbox" v-model="config.isEnabled">
                <span class="slider"></span>
              </label>
            </div>
            
            <!-- Tab Switcher (Pill style radio group) -->
            <div class="tab-switcher">
                <div class="radio-group">
                    <label class="radio-label" :class="{ active: activeTab === 'msw' }" @click="activeTab = 'msw'">
                        <span>MSW</span>
                    </label>
                    <label class="radio-label" :class="{ active: activeTab === 'inject' }" @click="activeTab = 'inject'">
                        <span>Inject</span>
                    </label>
                </div>
            </div>
        </div>
      </div>

      <!-- Scrollable Panel Body -->
      <div class="mock-panel-body">
        <!-- 1. MSW Tab Pane (Scrolls Internally) -->
        <div id="mswPane" class="tab-pane" :class="{ active: activeTab === 'msw' }">
          <!-- Fallback Source Switcher inside MSW Tab if multiple pages exist -->
          <div v-if="sourceList.length > 1" class="mock-item">
            <label>切換資料來源</label>
            <div class="select-wrapper">
              <select v-model="config.activeSource" @change="updateSource(config.activeSource)">
                <option v-for="name in sourceList" :key="name" :value="name">{{ name }}</option>
              </select>
            </div>
          </div>

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

        <!-- 2. Inject Tab Pane (Only options list scrolls, search stays fixed) -->
        <div id="injectPane" class="tab-pane" :class="{ active: activeTab === 'inject' }">
          <!-- Fixed Search Input (Scoped inside Inject Tab Pane) -->
          <div class="search-container">
              <input type="text" v-model="searchQuery" placeholder="搜尋 Group、路徑或情境..." class="search-input">
              <span v-if="searchQuery" class="clear-search" @click="searchQuery = ''">×</span>
          </div>
          
          <!-- Scrollable Options List -->
          <div class="inject-list-scroll">
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
                               @click="doInject(item.path, opt.data, opt.name, opt.context, groupName)">
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
                               @click="doInject(item.path, item.originalValue, '執行回呼', item.context, groupName)">
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
      if (this.isDetached) return {};
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
                let context = null;
                
                if (typeof value === 'boolean') {
                    type = 'bool';
                } else if (Array.isArray(value)) {
                    type = 'array';
                } else if (typeof value === 'function') {
                    type = 'function';
                    context = groupContent;
                } else if (typeof value === 'object' && value !== null) {
                    type = 'object';
                    options = Object.keys(value).map(name => ({
                        name,
                        data: value[name],
                        context: value
                    }));
                }
                
                items.push({
                    path,
                    type,
                    originalValue: value,
                    options,
                    context
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
      if (this.isDetached) {
        this.displayMode = 'expanded';
      }
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
              
              // 如果是獨立子視窗，需要發送 BroadcastChannel 訊息通知 Master 同步此 JSON 的 RAM 變更
              if (this.isDetached && this.mswChannel) {
                  this.mswChannel.post('UPDATE_INJECT_DATA', {
                      groupName,
                      target,
                      caseName,
                      newData,
                      writeToFile
                  });
              }

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
      if (this.isDetached) {
        this.displayMode = 'expanded';
        return;
      }
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
        if (this.isDetached && this.mswChannel) {
          this.mswChannel.post('HOT_RELOAD');
        } else {
          const { reloadAllMocks } = await import('../mock-entry.js');
          await reloadAllMocks();
        }
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
    doInject(target, data, name, context, groupName) {
        this.triggerAction({ text: name, value: data, context, groupName }, { target });
    },
    triggerAction(action, control) {
        const target = control.target || 'form';
        const data = action.value || {};

        if (this.isDetached && this.mswChannel) {
            console.log(`%c[MSW Detached Panel] 轉發 doInject 至主視窗 → target: "${target}"`, 'color: #7239ea; font-weight: bold;');
            this.mswChannel.post('TRIGGER_ACTION', {
                target,
                data: typeof action.value === 'function' ? null : action.value,
                context: null, // context 內含 Functions 無法序列化，改由主視窗從本地 RAM 內恢復
                groupName: action.groupName,
                caseName: action.name || action.text
            });
            return;
        }

        console.log(`%c[MSW Panel] doInject 觸發 → target: "${target}"`, 'color: #f59e0b; font-weight: bold;', data);

        // ── 路徑 A：直接 DOM 搜尋注入 ──────────────────────────────
        try {
            const searchRoots = ['#app', '#VueApp','#vueApp', '.app-container', 'body > div'];
            let targetInstance = null;
            const rootKey = target.split('.')[0];

            for (const selector of searchRoots) {
                const el = document.querySelector(selector);
                if (el && el.__vue__) {
                    const findInTree = (v) => {
                        if (rootKey === '$vm' || rootKey === '$data') return v;
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
                let targetObj;
                if (target === '$vm') {
                    targetObj = targetInstance;
                } else if (target === '$data') {
                    targetObj = targetInstance.$data;
                } else {
                    targetObj = _.get(targetInstance, target);
                }

                if (target !== '$vm' && target !== '$data' && (targetObj === undefined || targetObj === null)) {
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
                    
                    // 修正：如果 target 指向的就是這個 function 本身，我們應該取得它的父級物件作為第一個參數 $d
                    let callbackTargetObj = targetObj;
                    if (targetObj === action.value) {
                        const parts = target.split('.');
                        if (parts.length > 1) {
                            const parentPath = parts.slice(0, -1).join('.');
                            callbackTargetObj = _.get(targetInstance, parentPath);
                        } else {
                            callbackTargetObj = targetInstance.$data;
                        }
                    }
                    
                    action.value.call(action.context || null, callbackTargetObj);
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
            data: action.value,
            context: action.context
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
        if (this.isDetached && this.mswChannel) {
            console.log(`%c[MSW Detached Panel] 轉發 injectValue 至主視窗 → target: "${target}"`, 'color: #7239ea; font-weight: bold;');
            this.mswChannel.post('TRIGGER_ACTION', {
                target,
                data: value,
                type: 'INJECT_VALUE'
            });
            return;
        }
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
    minimizeToIcon() { if (this.isDetached) return; this.displayMode = 'icon'; this.saveState(); },
    saveState() {
        if (this.isDetached) return;
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
      if (this.isDetached || this.displayMode === 'icon') return;
      const rect = this.$refs.panel.getBoundingClientRect();
      this.dragging = true;
      this.rel = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    onDrag(e) {
      if (this.isDetached || !this.dragging) return;
      let newLeft = e.clientX - this.rel.x;
      let newTop = e.clientY - this.rel.y;
      const panelWidth = this.$refs.panel.offsetWidth;
      const panelHeight = this.$refs.panel.offsetHeight;
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - panelWidth));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - panelHeight));
      this.position.left = newLeft;
      this.position.top = newTop;
    },
    stopDrag() { if (this.dragging) { this.dragging = false; this.saveState(); } },
    detachPanel() {
      if (confirm('是否開啟獨立子視窗模式？\n啟用後，測試面板將會移至獨立的瀏覽器分頁中。')) {
        const { baseUrl } = this.getPaths();
        const win = window.open(`${baseUrl}/msw-panel-window.html`, 'MSW_MockPanel_Window', 'width=750,height=650,scrollbars=yes,resizable=yes');
        if (!win) {
          alert('開啟子視窗失敗，請確認是否已被瀏覽器阻擋彈出視窗功能！');
        } else {
          window.mswStandaloneWindow = win;
          this.config.isDetachedMode = true;
        }
      }
    },
    getPaths() {
      const scripts = document.getElementsByTagName('script');
      for (let s of scripts) {
        if (s.src.includes('msw-loader.js')) {
          const url = new URL(s.src);
          const baseUrl = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
          const appRoot = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1) || '/';
          return { baseUrl, appRoot };
        }
      }
      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean);
      const virtualDirectory = segments.length > 0 ? segments[0] : '';
      const appRoot = `/${virtualDirectory}/`.replace(/\/+/g, '/');
      return { baseUrl: `${appRoot}MSW`, appRoot };
    }
  }
};
