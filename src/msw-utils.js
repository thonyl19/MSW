import { HttpResponse, delay, passthrough } from 'msw';

/**
 * 處理自定義 JSON 的標準程序
 */
export const handleCustomResponse = (config) => {
    if (config && config.customJson) {
        try {
            const data = typeof config.customJson === 'string' ? JSON.parse(config.customJson) : config.customJson;
            return HttpResponse.json(data);
        } catch (e) {
            return HttpResponse.json({ 
                error: "無效的 JSON 格式",
                message: e.message 
            }, { status: 400 });
        }
    }
    return null;
};

/**
 * 2.5 具體模擬實作與效果 (Case Scenarios)
 */
export const sendResponse = async ({ data, mockConfig, status = 200, isPassthrough = true }) => {
    // 1. 回應逾時 (TIMEOUT): 實作
    if (mockConfig.apiDelay > 0) {
        await delay(mockConfig.apiDelay);
    } else if (mockConfig.apiDelay === 'TIMEOUT') {
        await delay(30000); // 模擬長掛
    }

    // 2. 伺服器崩潰 (500 ERROR): 實作
    if (mockConfig.apiDelay === 'Code500' || mockConfig.apiStatus === 500) {
        return new HttpResponse("Internal Server Error (模擬伺服器崩潰 500)", { status: 500 });
    }

    // 3. 授權失效 (401 UNAUTHORIZED): 實作
    if (mockConfig.apiStatus === 401) {
        return HttpResponse.json({ error: 'unauthorized', message: 'Token Expired' }, { status: 401 });
    }

    // 4. 自定義回應覆寫
    const custom = handleCustomResponse(mockConfig);
    if (custom) return custom;
    
    // 5. 巨量/異常資料 (DATA STRESS)
    const finalData = mockConfig.activePayload || data;

    if (isPassthrough && finalData == null) {
        return passthrough();
    } 

    return HttpResponse.json(finalData, { status });
};
