import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from '../store.js';
import { registerMock } from '../mock-entry.js';
import { handleCustomResponse, sendResponse } from '../msw-utils.js';

// 此頁面專用的 Mock 攔截邏輯
const pageHandlers = [
    http.post('*/api/mpi/opertask_edc', async ({ request }) => {
        var data =  _tmpData.MPI_EDC;
        if (mockConfig.arg !=null){
            data = _tmpData[mockConfig.arg];
        }
        return sendResponse({ mockConfig, data });
    }),
];


// 同時註冊 UI 與 Handler
registerMock({
  title: 'EDC',
  controls: [
       
    {
        label: 'API', 
        key: 'API', 
        type: 'select',
        options: [
            { text: 'MPI_EDC', value: 'MPI_EDC' },
        ] 
    }
  ],
  handlers: pageHandlers
});

var _tmpData = {
    MPI_EDC:{
        "ID": "c53f8603-d173-4d49-a302-0ba703d0a760",
        "Success": true,
        "Message": null,
        "MessageList": [],
        "Redirect": null,
        "Data": {
            "rules": [
                {
                    "FROM_RULE_SID": "GTI26010914120811316",
                    "TotalWeight": 1.01,
                    "FC_EDC_TARGET": {
                        "EDC_TARGET_SID": "GTI26010914120811316",
                        "EDC_VER_SID": "GTI25102017515717578",
                        "EDC_SID": "GTI25031715305697084",
                        "EDC_NO": "EDCGROUP_Cutting_001",
                        "EDC_NAME": "切割_工程參數群組_001",
                        "VERSION": 2.0,
                        "ENABLE_FLAG": "T",
                        "CREATE_USER": "thony",
                        "CREATE_DATE": "2026-01-09T14:12:08",
                        "WIP_SCOPE": "Run",
                        "QUOTE_ONCE": "F",
                        "UPDATE_USER": "thony",
                        "UPDATE_DATE": "2026-01-09T14:12:08",
                        "LINE_NO": "TF"
                    },
                    "FC_TARGETs": [
                        {
                            "RECIPE_SID": null,
                            "P_SID": "GTI26010914120811317",
                            "FROM_RULE": "EDC",
                            "FROM_RULE_SID": "GTI26010914120811316",
                            "TARGET_OBJECT": "Part",
                            "TARGET_SID": "GTI25072113355877735",
                            "TARGET_NO": "TF-PNO-00000001",
                            "TARGET_NAME": "PKZ215000001A",
                            "CREATE_USER": "thony",
                            "CREATE_DATE": "2026-01-09T14:12:08",
                            "VERSION": 0.0
                        }
                    ]
                }
            ],
            "OperEdcCfg": {
                "CatchKey": null,
                "Api": {
                    "data": [
                        {
                            "Confidential": null,
                            "Page": null,
                            "edc_ver_para_sid": "GTI25102018093118160",
                            "parameter": "PAD 高度:左上",
                            "tl": "5.5",
                            "ucl": 10.5,
                            "lcl": 0.5,
                            "usl": 10.5,
                            "lsl": 0.5
                        },
                        {
                            "Confidential": null,
                            "Page": null,
                            "edc_ver_para_sid": "GTI25110614204194981",
                            "parameter": "JK_API_TEST_EDP",
                            "tl": "11",
                            "ucl": 21.0,
                            "lcl": 11.0,
                            "usl": 21.0,
                            "lsl": 11.0
                        }
                    ],
                    "ReturnCode": null,
                    "trace_id": "843a2b0a-2cfe-4580-b209-c18dc83d9d1d",
                    "success": true,
                    "message": null,
                    "action": null
                },
                "rule": {
                    "FROM_RULE_SID": "GTI26010914120811316",
                    "TotalWeight": 1.01,
                    "FC_EDC_TARGET": {
                        "EDC_TARGET_SID": "GTI26010914120811316",
                        "EDC_VER_SID": "GTI25102017515717578",
                        "EDC_SID": "GTI25031715305697084",
                        "EDC_NO": "EDCGROUP_Cutting_001",
                        "EDC_NAME": "切割_工程參數群組_001",
                        "VERSION": 2.0,
                        "ENABLE_FLAG": "T",
                        "CREATE_USER": "thony",
                        "CREATE_DATE": "2026-01-09T14:12:08",
                        "WIP_SCOPE": "Run",
                        "QUOTE_ONCE": "F",
                        "UPDATE_USER": "thony",
                        "UPDATE_DATE": "2026-01-09T14:12:08",
                        "LINE_NO": "TF"
                    },
                    "FC_TARGETs": [
                        {
                            "RECIPE_SID": null,
                            "P_SID": "GTI26010914120811317",
                            "FROM_RULE": "EDC",
                            "FROM_RULE_SID": "GTI26010914120811316",
                            "TARGET_OBJECT": "Part",
                            "TARGET_SID": "GTI25072113355877735",
                            "TARGET_NO": "TF-PNO-00000001",
                            "TARGET_NAME": "PKZ215000001A",
                            "CREATE_USER": "thony",
                            "CREATE_DATE": "2026-01-09T14:12:08",
                            "VERSION": 0.0
                        }
                    ]
                },
                "edc_Model": [
                    {
                        "ZZ_EDC_GROUP_CODE": {
                            "SID": "GTI25102017525117597",
                            "GROUP_CODE": "鑽孔孔徑",
                            "SAMPLE_TYPE": "生產批",
                            "ITEM_RESOURCE": null,
                            "MAXIMUM": null
                        },
                        "EdcSrcs": [
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316471934383",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597071",
                                    "PARA_NO": "EDC_Cutting_004",
                                    "PARAMETER": "鑽孔孔徑A",
                                    "DATATYPE": "N",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:19",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:19",
                                    "SAMPLESIZE": 4.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "F",
                                    "ITEM_SEQ": 4.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102017525117597",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597071",
                                    "PARA_NO": "EDC_Cutting_004",
                                    "PARAMETER": "鑽孔孔徑A",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            },
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316471934384",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597072",
                                    "PARA_NO": "EDC_Cutting_005",
                                    "PARAMETER": "鑽孔孔徑B",
                                    "DATATYPE": "N",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:19",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:19",
                                    "SAMPLESIZE": 4.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "F",
                                    "ITEM_SEQ": 5.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102017525117597",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597072",
                                    "PARA_NO": "EDC_Cutting_005",
                                    "PARAMETER": "鑽孔孔徑B",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            },
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316471934385",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597073",
                                    "PARA_NO": "EDC_Cutting_006",
                                    "PARAMETER": "鑽孔孔徑C",
                                    "DATATYPE": "N",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:19",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:19",
                                    "SAMPLESIZE": 4.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "F",
                                    "ITEM_SEQ": 6.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102017525117597",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597073",
                                    "PARA_NO": "EDC_Cutting_006",
                                    "PARAMETER": "鑽孔孔徑C",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            }
                        ],
                        "FC_EDC_VER_PARAMETER_idx": {
                            "GTI25111316471934383": {
                                "TL": "0",
                                "UCL": null,
                                "LCL": null,
                                "USL": null,
                                "LSL": null,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "F",
                                "DATATYPE": "N",
                                "LUT_NAME": null,
                                "PARAMETER": "鑽孔孔徑A"
                            },
                            "GTI25111316471934384": {
                                "TL": "0",
                                "UCL": null,
                                "LCL": null,
                                "USL": null,
                                "LSL": null,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "F",
                                "DATATYPE": "N",
                                "LUT_NAME": null,
                                "PARAMETER": "鑽孔孔徑B"
                            },
                            "GTI25111316471934385": {
                                "TL": "0",
                                "UCL": null,
                                "LCL": null,
                                "USL": null,
                                "LSL": null,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "F",
                                "DATATYPE": "N",
                                "LUT_NAME": null,
                                "PARAMETER": "鑽孔孔徑C"
                            }
                        },
                        "data": [
                            {
                                "SampleId": "Lot",
                                "GTI25111316471934383": null,
                                "GTI25111316471934384": null,
                                "GTI25111316471934385": null
                            }
                        ],
                        "columns": [
                            {
                                "title": "Sample Id",
                                "data": "SampleId",
                                "type": null,
                                "source": null,
                                "readOnly": true,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "鑽孔孔徑A",
                                "data": "GTI25111316471934383",
                                "type": "numeric",
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "鑽孔孔徑B",
                                "data": "GTI25111316471934384",
                                "type": "numeric",
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "鑽孔孔徑C",
                                "data": "GTI25111316471934385",
                                "type": "numeric",
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            }
                        ]
                    },
                    {
                        "ZZ_EDC_GROUP_CODE": {
                            "SID": "GTI25102017542817606",
                            "GROUP_CODE": "孔徑X",
                            "SAMPLE_TYPE": "清單",
                            "ITEM_RESOURCE": "TFPCSNoPosition",
                            "MAXIMUM": "20"
                        },
                        "EdcSrcs": [
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316472034386",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597074",
                                    "PARA_NO": "EDC_Cutting_007",
                                    "PARAMETER": "鑽孔孔徑D",
                                    "DATATYPE": "N",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:20",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:20",
                                    "SAMPLESIZE": 4.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "F",
                                    "ITEM_SEQ": 7.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102017542817606",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597074",
                                    "PARA_NO": "EDC_Cutting_007",
                                    "PARAMETER": "鑽孔孔徑D",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            },
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316472034387",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597075",
                                    "PARA_NO": "EDC_Cutting_008",
                                    "PARAMETER": "鑽孔孔徑E",
                                    "DATATYPE": "L",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:20",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:20",
                                    "SAMPLESIZE": 4.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "F",
                                    "ITEM_SEQ": 8.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": "TF-LUT-00000001",
                                    "GROUP_CODE_SID": "GTI25102017542817606",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": "111"
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": "GRD",
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597075",
                                    "PARA_NO": "EDC_Cutting_008",
                                    "PARAMETER": "鑽孔孔徑E",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "0",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            }
                        ],
                        "FC_EDC_VER_PARAMETER_idx": {
                            "GTI25111316472034386": {
                                "TL": "0",
                                "UCL": null,
                                "LCL": null,
                                "USL": null,
                                "LSL": null,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "F",
                                "DATATYPE": "N",
                                "LUT_NAME": null,
                                "PARAMETER": "鑽孔孔徑D"
                            },
                            "GTI25111316472034387": {
                                "TL": "0",
                                "UCL": null,
                                "LCL": null,
                                "USL": null,
                                "LSL": null,
                                "DEFAULT_TL": "111",
                                "MUST_INPUT": "F",
                                "DATATYPE": "L",
                                "LUT_NAME": "GRD",
                                "PARAMETER": "鑽孔孔徑E"
                            }
                        },
                        "data": [
                            {
                                "SampleId": "A",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "B",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "C",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "D",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "E",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "F",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "G",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "H",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "I",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "J",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "11",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "12",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "13",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "14",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "15",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "16",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "17",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "18",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "19",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            },
                            {
                                "SampleId": "20",
                                "GTI25111316472034386": null,
                                "GTI25111316472034387": "111"
                            }
                        ],
                        "columns": [
                            {
                                "title": "Sample Id",
                                "data": "SampleId",
                                "type": null,
                                "source": null,
                                "readOnly": true,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "鑽孔孔徑D",
                                "data": "GTI25111316472034386",
                                "type": "numeric",
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "鑽孔孔徑E",
                                "data": "GTI25111316472034387",
                                "type": "dropdown",
                                "source": [
                                    "VGE01-立磨3",
                                    "VGE02-立磨4",
                                    "VGJ01-立磨1",
                                    "VGJ02-立磨2",
                                    "VGJ03-立磨5",
                                    "VGJ04-立磨6"
                                ],
                                "readOnly": null,
                                "strict": true,
                                "allowInvalid": false
                            }
                        ]
                    },
                    {
                        "ZZ_EDC_GROUP_CODE": {
                            "SID": "GTI25102018062518131",
                            "GROUP_CODE": "GROUP",
                            "SAMPLE_TYPE": "FreeText",
                            "ITEM_RESOURCE": null,
                            "MAXIMUM": "1"
                        },
                        "EdcSrcs": [
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316471934380",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597068",
                                    "PARA_NO": "EDC_Cutting_001",
                                    "PARAMETER": "產品尺寸_長度",
                                    "DATATYPE": "N",
                                    "TL": "21",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": 21.2500,
                                    "LSL": 20.7500,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:19",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:19",
                                    "SAMPLESIZE": 1.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "T",
                                    "ITEM_SEQ": 1.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102018062518131",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597068",
                                    "PARA_NO": "EDC_Cutting_001",
                                    "PARAMETER": "產品尺寸_長度",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "21",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": 21.2500,
                                    "LSL": 20.7500,
                                    "ENABLE_FLAG": "F",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "MPIUser6",
                                    "UPDATE_DATE": "2025-04-08T16:12:42",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            },
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316471934381",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597069",
                                    "PARA_NO": "EDC_Cutting_002",
                                    "PARAMETER": "產品尺寸_寬度",
                                    "DATATYPE": "N",
                                    "TL": "11",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": 11.0600,
                                    "LSL": 10.9400,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:19",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:19",
                                    "SAMPLESIZE": 1.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "T",
                                    "ITEM_SEQ": 2.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102018062518131",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597069",
                                    "PARA_NO": "EDC_Cutting_002",
                                    "PARAMETER": "產品尺寸_寬度",
                                    "DATATYPE": "N",
                                    "DESCRIPTION": "",
                                    "TL": "11",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": 11.0600,
                                    "LSL": 10.9400,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            },
                            {
                                "edc_ver": {
                                    "EDC_VER_PARA_SID": "GTI25111316471934382",
                                    "EDC_VER_SID": "GTI25102017515717578",
                                    "EDC_SID": "GTI25031715305697084",
                                    "EDC_NO": "EDCGROUP_Cutting_001",
                                    "EDC_NAME": "切割_工程參數群組_001",
                                    "VERSION": 2.0,
                                    "EDC_PARA_SID": "GTI25031715305597070",
                                    "PARA_NO": "EDC_Cutting_003",
                                    "PARAMETER": "CNC",
                                    "DATATYPE": "S",
                                    "TL": null,
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "CREATE_USER": "Jake.Tu",
                                    "CREATE_DATE": "2025-11-13T16:47:19",
                                    "UPDATE_USER": "Jake.Tu",
                                    "UPDATE_DATE": "2025-11-13T16:47:19",
                                    "SAMPLESIZE": 1.0,
                                    "THROW_SPC": "F",
                                    "MUST_INPUT": "T",
                                    "ITEM_SEQ": 3.0,
                                    "DB_TABLE": null,
                                    "DISPLAY_POINT_NAME": null,
                                    "DB_COLUMN_NAME": null,
                                    "GROUP_CODE_SID": "GTI25102018062518131",
                                    "GROUP_CODE": null,
                                    "DEFAULT_TL": null
                                },
                                "edc": {
                                    "LINE_NO": null,
                                    "LUT_NAME": null,
                                    "DEFAULT_TL": null,
                                    "EDC_PARA_SID": "GTI25031715305597070",
                                    "PARA_NO": "EDC_Cutting_003",
                                    "PARAMETER": "CNC",
                                    "DATATYPE": "S",
                                    "DESCRIPTION": "",
                                    "TL": "",
                                    "UCL": null,
                                    "LCL": null,
                                    "USL": null,
                                    "LSL": null,
                                    "ENABLE_FLAG": "T",
                                    "QUOTE_ONCE": "F",
                                    "CREATE_USER": "Admin",
                                    "CREATE_DATE": "2025-03-17T15:30:55",
                                    "UPDATE_USER": "Admin",
                                    "UPDATE_DATE": "2025-03-17T15:30:55",
                                    "UNIT": "",
                                    "MUST_INPUT": "T",
                                    "DISPLAY_TYPE": "",
                                    "DB_TABLE": null,
                                    "DB_COLUMN_NAME": null
                                }
                            }
                        ],
                        "FC_EDC_VER_PARAMETER_idx": {
                            "GTI25111316471934380": {
                                "TL": "21",
                                "UCL": null,
                                "LCL": null,
                                "USL": 21.2500,
                                "LSL": 20.7500,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "T",
                                "DATATYPE": "N",
                                "LUT_NAME": null,
                                "PARAMETER": "產品尺寸_長度"
                            },
                            "GTI25111316471934381": {
                                "TL": "11",
                                "UCL": null,
                                "LCL": null,
                                "USL": 11.0600,
                                "LSL": 10.9400,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "T",
                                "DATATYPE": "N",
                                "LUT_NAME": null,
                                "PARAMETER": "產品尺寸_寬度"
                            },
                            "GTI25111316471934382": {
                                "TL": null,
                                "UCL": null,
                                "LCL": null,
                                "USL": null,
                                "LSL": null,
                                "DEFAULT_TL": null,
                                "MUST_INPUT": "T",
                                "DATATYPE": "S",
                                "LUT_NAME": null,
                                "PARAMETER": "CNC"
                            }
                        },
                        "data": [
                            {
                                "SampleId": "Sample001",
                                "GTI25111316471934380": null,
                                "GTI25111316471934381": null,
                                "GTI25111316471934382": null
                            }
                        ],
                        "columns": [
                            {
                                "title": "Sample Id",
                                "data": "SampleId",
                                "type": null,
                                "source": null,
                                "readOnly": true,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "產品尺寸_長度",
                                "data": "GTI25111316471934380",
                                "type": "numeric",
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "產品尺寸_寬度",
                                "data": "GTI25111316471934381",
                                "type": "numeric",
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            },
                            {
                                "title": "CNC",
                                "data": "GTI25111316471934382",
                                "type": null,
                                "source": null,
                                "readOnly": null,
                                "strict": null,
                                "allowInvalid": null
                            }
                        ]
                    }
                ]
            }
        },
        "Exception": null,
        "InnerResults": [],
        "Code": "000"
    }
}