import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from './store.js';

export const handlers = [
  http.post('/User/Login', async () => {
    if (mockConfig.apiDelay > 0) await delay(mockConfig.apiDelay);
    if (mockConfig.loginStatus === 'invalid_password') {
      return new HttpResponse(JSON.stringify({ msg: '失敗' }), { status: 401 });
    }
    return HttpResponse.json({ success: true });
  }),
];
