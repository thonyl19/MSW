import { http, HttpResponse, delay } from 'msw';
import { handleCustomResponse, sendResponse } from './msw-utils.js';


export const handlers = [
  http.post('/User/Login', async () => {
    // 優先檢查是否有自定義回應
    const custom = handleCustomResponse(mockConfig);
    if (custom) return custom;

    // 處理特定的測試邏輯 (invalid_password)
    if (mockConfig.apiDelay > 0) await delay(mockConfig.apiDelay);
    if (mockConfig.loginStatus === 'invalid_password') {
      return new HttpResponse(JSON.stringify({ msg: '失敗' }), { status: 401 });
    }

    // 回傳預設成功回應
    return sendResponse({
      config: mockConfig,
      data: { success: true }
    });
  }),
];
