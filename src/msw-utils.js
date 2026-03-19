import { HttpResponse, delay,passthrough } from 'msw';
/**
 * 處理自定義 JSON 的標準程序
 * 如果 config 中有 customJson，則解析並回傳 HttpResponse
 * 
 * @param {Object} config - 包含 customJson 的配置物件
 * @returns {HttpResponse | null} - 如果有自定義回應則回傳，否則回傳 null
 */
export const handleCustomResponse = (config) => {
    if (config && config.customJson) {
        try {
            const data = JSON.parse(config.customJson);
            return HttpResponse.json(data);
        } catch (e) {
            console.error('[MSW] Custom JSON parse error:', e);
            return HttpResponse.json({ 
                error: "無效的 JSON 格式",
                message: e.message 
            }, { status: 400 });
        }
    }
    return null;
};

/**
 * 更完整的標準回應輔助函數 (整合延遲、自定義 JSON、錯誤模擬)
 * 
 * @param {Object} params - 參數
 * @param {any} params.data - 預設回傳資料
 * @param {Object} params.config - mockConfig 物件
 * @param {number} [params.status=200] - 預設 HTTP 狀態碼
 * @returns {Promise<HttpResponse>}
 */
export const sendResponse = async ({ data, mockConfig, status = 200 ,isPassthrough = true }) => {
    // 1. 處理延遲
    switch (mockConfig.apiDelay) {
        case 0:
            break;
        case 500:
        case 2000:
        case 5000:
            await delay(mockConfig.apiDelay);
            break;
        case 'Code500':
            return new HttpResponse("Internal Server Error(測試 API 500)", { status: 500  });
    }
    
    // 2. 處理自定義 JSON 覆寫 (優先權最高)
    const custom = handleCustomResponse(mockConfig);
    if (custom) return custom;
    
    if (isPassthrough && data == null){
        console.groupCollapsed(
            `%c[passthrough]`, 
            'color: #908f91b8; font-weight: bold;'
        );
        console.log("mockConfig", mockConfig);
        console.groupEnd();
        return passthrough();
    } 

    // 3. 處理通用的錯誤切換
    if (mockConfig.arg === 'error') {
        return new HttpResponse(null, { status: 500 });
    }

    // 4. 回傳預設資料
    return HttpResponse.json(data, { status });
};
