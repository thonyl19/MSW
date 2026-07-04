import Vue from 'vue';

const CHANNEL_NAME = 'msw-broadcast-channel';

/**
 * 遞迴序列化注入物件，將 Function 轉換為預留屬性，避免 BroadcastChannel 傳輸失敗
 */
function serializeInject(val) {
    if (typeof val === 'function') {
        return { __isFunction: true };
    }
    if (Array.isArray(val)) {
        return val.map(serializeInject);
    }
    if (val !== null && typeof val === 'object') {
        const res = {};
        for (const k in val) {
            if (Object.prototype.hasOwnProperty.call(val, k)) {
                res[k] = serializeInject(val[k]);
            }
        }
        return res;
    }
    return val;
}

/**
 * 將主視窗的 mockConfig 序列化為可安全傳輸的 JSON 物件
 */
export function serializeConfig(config) {
    const serialized = {
        isEnabled: config.isEnabled,
        apiDelay: config.apiDelay,
        apiStatus: config.apiStatus,
        pageTitle: config.pageTitle,
        activeSource: config.activeSource,
        loadedPages: [...(config.loadedPages || [])],
        controls: JSON.parse(JSON.stringify(config.controls || [])),
        sources: {},
        values: {}
    };

    // 序列化 sources (排除/標記 function)
    if (config.sources) {
        for (const key in config.sources) {
            if (Object.prototype.hasOwnProperty.call(config.sources, key)) {
                const src = config.sources[key];
                serialized.sources[key] = {
                    controls: JSON.parse(JSON.stringify(src.controls || [])),
                    inject: serializeInject(src.inject || {})
                };
            }
        }
    }

    // 收集所有自訂控制項的當前值
    const excludeKeys = [
        'isEnabled', 'apiDelay', 'apiStatus', 'pageTitle', 'controls', 
        'sources', 'activeSource', 'lastAction', 'activePayload', 
        '_componentMap', 'loadedPages'
    ];
    for (const key in config) {
        if (Object.prototype.hasOwnProperty.call(config, key) && !excludeKeys.includes(key)) {
            serialized.values[key] = config[key];
        }
    }

    return serialized;
}

/**
 * 將序列化的資料還原至目標 config 物件中
 */
export function deserializeConfig(serialized, targetConfig) {
    if (!serialized || !targetConfig) return;

    targetConfig.isEnabled = serialized.isEnabled;
    targetConfig.apiDelay = serialized.apiDelay;
    targetConfig.apiStatus = serialized.apiStatus;
    targetConfig.pageTitle = serialized.pageTitle;
    targetConfig.activeSource = serialized.activeSource;
    targetConfig.loadedPages = serialized.loadedPages || [];

    // 更新 controls
    targetConfig.controls = serialized.controls || [];

    // 更新 sources (使用 Vue.set 保證響應式)
    if (serialized.sources) {
        for (const key in serialized.sources) {
            Vue.set(targetConfig.sources, key, serialized.sources[key]);
        }
    }

    // 更新自訂控制項數值
    if (serialized.values) {
        for (const key in serialized.values) {
            Vue.set(targetConfig, key, serialized.values[key]);
        }
    }
}

/**
 * MSW 跨視窗 BroadcastChannel 通訊封裝
 */
export class MSWChannel {
    constructor(role, onMessage) {
        this.role = role; // 'master' (主視窗) 或 'slave' (子視窗)
        this.onMessage = onMessage;
        this.channel = typeof window !== 'undefined' && window.BroadcastChannel
            ? new BroadcastChannel(CHANNEL_NAME)
            : null;

        if (this.channel) {
            this.channel.onmessage = (event) => {
                const { type, payload, sender } = event.data || {};
                // 僅接收來自不同角色的訊息，避免自發自收
                if (sender !== this.role) {
                    this.onMessage(type, payload);
                }
            };
        }
    }

    /**
     * 發送訊息
     */
    post(type, payload = {}) {
        if (this.channel) {
            this.channel.postMessage({
                type,
                payload,
                sender: this.role
            });
        }
    }

    /**
     * 關閉頻道
     */
    destroy() {
        if (this.channel) {
            this.channel.close();
        }
    }
}
