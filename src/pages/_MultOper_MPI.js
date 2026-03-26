import { http, HttpResponse, delay, passthrough } from 'msw';
import { mockConfig } from '../store.js';
import { registerMock } from '../mock-entry.js';
import { handleCustomResponse, sendResponse } from '../msw-utils.js';
import { _tmpData, _case1, _case2 } from './_MultOper_MPI.data.js';


// 此頁面專用的 Mock 攔截邏輯
var _fn = {
    getSrc(key,name){
        switch (key) {
            case 'case1':
                return  _.get(_case1,name,null);
                break;
            case 'case2':
                return  _.get(_case2,name,null);
                break;
                
        }
        return null;
    }

}
// 此頁面專用的 Mock 攔截邏輯
const pageHandlers = [
    http.post('*/WIP/LotEDCOffline/OffLineRecEDC_LotInfo', async ({ request }) => {
        var r = _fn.getSrc(mockConfig.lot,"OffLineRecEDC_LotInfo");
        return sendResponse({ mockConfig, data: r });
    }),
    http.post('*/WIP/LotEDCOffline/RecordOperSelectedChanged', async ({ request }) => {
        const bodyText = await request.text();
        const params = new URLSearchParams(bodyText);

        const mockData = {"ID":"28291480-df49-45e9-b9b0-f468b0ac363d","Success":true,"Message":null,"MessageList":[],"Redirect":null,"Data":{"ddl_sub_record_oper_src":[],"checkEqpFlag":true,"ddl_eqp_src":[{"SID":"GTI25081514254128409","NO":"B001","NAME":"A001"}]},"Exception":null,"InnerResults":[],"Code":"000"};
        return sendResponse({ mockConfig, data: mockData });
    }),
    http.get('*/MES/WIPInfo/GetRouteInfo', async ({ request }) => {
        const url = new URL(request.url);
        const route_ver_sid = url.searchParams.get('route_ver_sid'); 
        var r = _fn.getSrc(mockConfig.lot,`GetRouteInfo.${route_ver_sid}`);
        return sendResponse({ mockConfig, data: r });
    }),
    http.get('*/MES/WIPInfo/QuerySubRouteOper', async ({ request }) => {
        const url = new URL(request.url);
        const routeVerSid = url.searchParams.get('routeVerSid'); 
        var r = _fn.getSrc(mockConfig.lot,`QuerySubRouteOper.${routeVerSid}`);
        return sendResponse({ mockConfig, data: r });
    }),

    http.post('*/WIP/WIP/LotEDCOffline/MPI_Save', async ({ request }) => {
        const bodyText = await request.text();
        const params = new URLSearchParams(bodyText);
        return sendResponse({ mockConfig, data: _tmpData.SubRecordOperSelectedChanged });
    }),

    http.post('*/WIP/LotEDCOffline/SubRecordOperSelectedChanged', async ({ request }) => {
        const bodyText = await request.text();
        const params = new URLSearchParams(bodyText);
        return sendResponse({ mockConfig, data: _tmpData.SubRecordOperSelectedChanged });
    }),
    http.post('*/api/mpi/opertask_edc', async ({ request }) => {
        const bodyText = await request.text();
        const params = new URLSearchParams(bodyText);

        if (mockConfig.arg === 'no_data') {
            return HttpResponse.json(_tmpData.OperEdcCfg_沒資料);
        }

        return sendResponse({ mockConfig, data: _tmpData.OperEdcCfg });
    }),
    http.get('*/api/ddl/EqpSetupInfo', async ({ request }) => {
    // 1. 取得 Query Parameters (GET 請求)
    const url = new URL(request.url);
    const eqpNo = url.searchParams.get('EqpNo') || 'Unknown';
    
    // 您可以根據參數做邏輯判斷或 Log 出來調試
    console.log(`%c[MSW] 攔截到機台查詢參數 No: ${eqpNo}`, 'color: #3b82f6');

    return sendResponse({
        mockConfig,
        data: {
            "RefKey": null,
            "SID": "GTI25081914131934225",
            "No": eqpNo, // 反映傳入的參數
            "Value": "GTI25081914131934225",
            "Display": `機台: ${eqpNo}`,
            "Status": "Run",
            "subItem": []
        }
    });
  }),
];


// 同時註冊 UI 與 Handler
registerMock({
  title: '_SetUpEQP',
  controls: [
    { 
      label: '測試批號', 
      key: 'lot', 
      type: 'select', 
      options: [
        { text: '無資料', value: 'no_data' },
        { text: 'JOSEPH_TEST_LAYER-02', value: 'case1' },
        { text: '一階/標準流程', value: 'case2' },
      ] 
    },
    { 
      label: '機台載入', 
      key: 'arg', 
      type: 'select', 
      options: [
        { text: '正常資料', value: 'default' },
        { text: '無資料', value: 'no_data' }
      ] 
    }
  ],
  handlers: pageHandlers
});

