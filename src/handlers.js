import { http, HttpResponse, delay } from 'msw';
import { handleCustomResponse, sendResponse } from './msw-utils.js';
import { mockConfig } from './store.js';

export const handlers = [
  http.post('/User/Login', async () => {
    // 優先檢查是否有自定義回應
    const custom = handleCustomResponse(mockConfig);
    if (custom) return custom;

    // 處理特定的測試邏輯 (invalid_password)
    if (mockConfig.apiDelay > 0) await delay(mockConfig.apiDelay);
    
    // 模擬 401
    if (mockConfig.loginStatus === 'invalid_password' || mockConfig.apiStatus === 401) {
      return new HttpResponse(JSON.stringify({ msg: '失敗', code: 401 }), { status: 401 });
    }

    // 回傳預設成功回應
    return sendResponse({
      mockConfig: mockConfig,
      data: { success: true, token: 'mock-token-123' }
    });
  }),
];
