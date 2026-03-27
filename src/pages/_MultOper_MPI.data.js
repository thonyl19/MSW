export var _Save={
    default:{
        "ID": "97bacf41-7cc2-476d-97fe-0101059fd02c",
        "Success": true,
        "Message": null,
        "MessageList": [
            
        ],
        "Redirect": null,
        "Data": {
            "Api_Pre": {
            "trace_id": "843a2b0a-2cfe-4580-b209-c18dc83d9d1d",
            "success": true,
            "message": "",
            "action": ""
            }
        },
        "Exception": null,
        "InnerResults": [
            
        ],
        "Code": "000"
    },
    Pre_ok:{
        "ID": "97bacf41-7cc2-476d-97fe-0101059fd02c",
        "Success": true,
        "Message": null,
        "MessageList": [
            
        ],
        "Redirect": null,
        "Data": {
            "Api_Pre": {
            "trace_id": "843a2b0a-2cfe-4580-b209-c18dc83d9d1d",
            "success": true,
            "message": "(測試)Api 回應 success:true ,但有錯誤訊息",
            "action": ""
            }
        },
        "Exception": null,
        "InnerResults": [
            
        ],
        "Code": "000"
    },
    Pre_err:{
        "ID": "04ca0c89-33e3-4cdd-b5b5-b27de9d3f846",
        "Success": false,
        "Message": "EdcOffline.Pre 發生錯誤",
        "MessageList": [
            
        ],
        "Redirect": null,
        "Data": {
            "Api_Pre": {
            "trace_id": "843a2b0a-2cfe-4580-b209-c18dc83d9d1d",
            "success": false,
            "message": "(測試)Api 回應 success:false",
            "action": ""
            }
        },
        "Exception": null,
        "InnerResults": [
            
        ],
        "Code": "999"
    },
}
export var _tmpData = {
    OperEdcCfg:{
    "ID": "d7cb2612-0c0c-4a97-845f-38b71e3b948f",
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
},
    OperEdcCfg_沒資料:{
    "ID": "b2cf21f6-ed2a-49bc-bd8c-c47dc9ba1e82",
    "Success": true,
    "Message": null,
    "MessageList": [],
    "Redirect": null,
    "Data": {
        "data": {
            "LOT": "JK_GENERAL_TEST-13",
            "LOT_SID": "GTI25112014470069252",
            "LOT_STATUS": null,
            "EQP_SID": [],
            "OPER_SID": "GTI25110417054928470",
            "PARTNO_SID": "GTI25091712344069023",
            "PART_NO": "JK_LINE-PNO-00000005",
            "ROUTE_VER_SID": null,
            "LINE": [
                "JK_LINE"
            ],
            "ROUTE_VER_OPER_SID": "GTI25111314012929297"
        },
        "rules": [],
        "OperEdcCfg": {}
    },
    "Exception": null,
    "InnerResults": [],
    "Code": "000"
},

    SubRecordOperSelectedChanged:{"ID":"d327399f-ec1e-4eca-b1d5-16de241e966c","Success":true,"Message":null,"MessageList":[],"Redirect":null,"Data":{"checkEqpFlag":true,"ddl_eqp_src":[{"SID":"GTI25081514254128409","NO":"B001","NAME":"A001"}]},"Exception":null,"InnerResults":[],"Code":"000"},
    lotInfo:{"ID":"e7a8e2d9-7930-402f-978b-20dd86245fea","Success":true,"Message":null,"MessageList":[],"Redirect":null,"Data":{"ddl_curr_oper_val":"GTI25110510554254406","ddl_curr_oper_src":[],"ddl_record_oper_src":[{"RefKey":null,"SID":"GTI25110510571854619","No":"JK_LINE-ROU-00000006","Value":"GTI25110510571854619","Display":"JK_EDC_TEST","StatusSid":null,"Status":null,"FromNum":0.0,"INum":0.0,"INum1":0.0,"INum2":0.0,"INum3":0.0,"Attr01":"R","Attr02":"GTI25112014174368401","Attr03":"GTI25112014183168411","subItem":[],"subItemExt":[],"is_空subItem錯誤":false,"LineNo":null},{"RefKey":null,"SID":"GTI25111313580228553","No":"JK_LINE-ROU-00000005","Value":"GTI25111313580228553","Display":"JK_UNIT_TEST","StatusSid":null,"Status":null,"FromNum":0.0,"INum":0.0,"INum1":0.0,"INum2":0.0,"INum3":0.0,"Attr01":"R","Attr02":"GTI25112014174368401","Attr03":"GTI25112014183168412","subItem":[],"subItemExt":[],"is_空subItem錯誤":false,"LineNo":null}],"form":{"LOT":"JK_GENERAL_TEST-13","WO":"JK_GENERAL_TEST","OPER_SID":"GTI25110510554254406","ROUTE_VER_OPER_SID":null,"SUB_ROUTE_VER_OPER_SID":null,"UNIT":"PCS","QUANTITY":"10.000","EQP_SID":null,"COMMENT":null,"IsMustSelectedEqp":false,"Has_sub_record_oper":false}},"Exception":null,"InnerResults":[],"Code":"000"}
}

export var _case1 = {
    OffLineRecEDC_LotInfo:{
    "ID": "440bf8ba-3b65-4227-a8e9-0a15b58f691d",
    "Success": true,
    "Message": null,
    "MessageList": [],
    "Redirect": null,
    "Data": {
        "ddl_curr_oper_val": "GTI25092609482676057",
        "ddl_curr_oper_src": [],
        "ddl_record_oper_src": [
            {
                "RefKey": null,
                "SID": "GTI25092610415177196",
                "No": "TF-ROU-00000027",
                "Value": "GTI25092610415177196",
                "Display": "TF三階流程-B1-V2",
                "StatusSid": null,
                "Status": null,
                "FromNum": 0,
                "INum": 0,
                "INum1": 0,
                "INum2": 0,
                "INum3": 0,
                "Attr01": "R",
                "Attr02": "GTI25103109414778886",
                "Attr03": "GTI25103109424178898",
                "subItem": [],
                "subItemExt": [],
                "is_空subItem錯誤": false,
                "LineNo": null
            },
            {
                "RefKey": null,
                "SID": "GTI25103109393878872",
                "No": "TF-ROU-00000031",
                "Value": "GTI25103109393878872",
                "Display": "TF三階流程-B1-V2-2",
                "StatusSid": null,
                "Status": null,
                "FromNum": 0,
                "INum": 0,
                "INum1": 0,
                "INum2": 0,
                "INum3": 0,
                "Attr01": "R",
                "Attr02": "GTI25103109414778886",
                "Attr03": "GTI25103109424178899",
                "subItem": [],
                "subItemExt": [],
                "is_空subItem錯誤": false,
                "LineNo": null
            }
        ],
        "form": {
            "LOT": "JOSEPH_TEST_LAYER-02",
            "WO": "JOSEPH_TEST_LAYER",
            "OPER_SID": "GTI25092609482676057",
            "ROUTE_VER_OPER_SID": null,
            "SUB_ROUTE_VER_OPER_SID": null,
            "UNIT": "PCS",
            "QUANTITY": "20.000",
            "EQP_SID": null,
            "COMMENT": null,
            "IsMustSelectedEqp": false,
            "Has_sub_record_oper": false
        }
    },
    "Exception": null,
    "InnerResults": [],
    "Code": "000"
},
    GetRouteInfo:{
        "GTI25092610415177196": [{"id":"001","ROUTE_VER_OPER_SID":"GTI25092610430277229","ROUTE_VER_SID":"GTI25092610415177196","ROUTE_SID":"GTI25092610415177195","ROUTE_NO":"TF-ROU-00000027","ROUTE":"TF三階流程-B1-V2","VERSION":1.0,"OPER_CATEGORY":"O","OPER_SEQ":"001","OPER_SID":"GTI25092609482676057","OPERATION_NO":"TF-OPR-00000029","OPERATION":"PSEUDO-02","IS_START":"T","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:43:02","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:43:02","children":[],"leaf":true,"PARENT_ROUTE_VER_SID":"","OPERATION_TYPE":"STD01","OPERATION_TYPE_NAME":"標準進出站","ROUTE_CATEGORY":"O"},{"id":"002","ROUTE_VER_OPER_SID":"GTI25092610430277230","ROUTE_VER_SID":"GTI25092610415177196","ROUTE_SID":"GTI25092610415177195","ROUTE_NO":"TF-ROU-00000027","ROUTE":"TF三階流程-B1-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"002","OPER_SID":"GTI25092610384877073","OPERATION_NO":"TF-ROU-00000025","OPERATION":"TF二階流程-A2-V2","IS_START":"F","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:43:02","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:43:02","OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","children":[{"id":"002001","ROUTE_VER_OPER_SID":"GTI25092610395377106","ROUTE_VER_SID":"GTI25092610384877073","ROUTE_SID":"GTI25092610384877072","ROUTE_NO":"TF-ROU-00000025","ROUTE":"TF二階流程-A2-V2","VERSION":1.0,"OPER_CATEGORY":"O","OPER_SEQ":"001","OPER_SID":"GTI25092609482676057","OPERATION_NO":"TF-OPR-00000029","OPERATION":"PSEUDO-02","IS_START":"T","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:39:53","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:39:53","hasChildren":false,"leaf":true,"children":[],"OPERATION_TYPE":"STD01","OPERATION_TYPE_NAME":"標準進出站","ROUTE_CATEGORY":"O","PARENT_ROUTE_VER_SID":""},{"id":"002002","ROUTE_VER_OPER_SID":"GTI25092610395377107","ROUTE_VER_SID":"GTI25092610384877073","ROUTE_SID":"GTI25092610384877072","ROUTE_NO":"TF-ROU-00000025","ROUTE":"TF二階流程-A2-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"002","OPER_SID":"GTI25072118015282697","OPERATION_NO":"TF-ROU-00000013","OPERATION":"11NON-負光阻M1.","IS_START":"F","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:39:53","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:39:53","hasChildren":true,"leaf":false,"children":[],"OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","ROUTE_CATEGORY":"R","PARENT_ROUTE_VER_SID":""},{"id":"002003","ROUTE_VER_OPER_SID":"GTI25092610395377108","ROUTE_VER_SID":"GTI25092610384877073","ROUTE_SID":"GTI25092610384877072","ROUTE_NO":"TF-ROU-00000025","ROUTE":"TF二階流程-A2-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"003","OPER_SID":"GTI25072118015082616","OPERATION_NO":"TF-ROU-00000004","OPERATION":"F1NON-M1飛針.","IS_START":"F","IS_END":"T","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:39:53","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:39:53","hasChildren":true,"leaf":false,"children":[],"OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","ROUTE_CATEGORY":"R","PARENT_ROUTE_VER_SID":""}],"leaf":false,"ROUTE_CATEGORY":"R","hasChildren":true},{"id":"003","ROUTE_VER_OPER_SID":"GTI25092610430277231","ROUTE_VER_SID":"GTI25092610415177196","ROUTE_SID":"GTI25092610415177195","ROUTE_NO":"TF-ROU-00000027","ROUTE":"TF三階流程-B1-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"003","OPER_SID":"GTI25092610402877137","OPERATION_NO":"TF-ROU-00000026","OPERATION":"TF二階流程-A3-V2","IS_START":"F","IS_END":"T","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:43:02","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:43:02","OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","children":[{"id":"003001","ROUTE_VER_OPER_SID":"GTI25092610412477165","ROUTE_VER_SID":"GTI25092610402877137","ROUTE_SID":"GTI25092610402877136","ROUTE_NO":"TF-ROU-00000026","ROUTE":"TF二階流程-A3-V2","VERSION":1.0,"OPER_CATEGORY":"O","OPER_SEQ":"001","OPER_SID":"GTI25092609482676057","OPERATION_NO":"TF-OPR-00000029","OPERATION":"PSEUDO-02","IS_START":"T","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:41:24","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:41:24","hasChildren":false,"leaf":true,"children":[],"OPERATION_TYPE":"STD01","OPERATION_TYPE_NAME":"標準進出站","ROUTE_CATEGORY":"O","PARENT_ROUTE_VER_SID":""},{"id":"003002","ROUTE_VER_OPER_SID":"GTI25092610412477166","ROUTE_VER_SID":"GTI25092610402877137","ROUTE_SID":"GTI25092610402877136","ROUTE_NO":"TF-ROU-00000026","ROUTE":"TF二階流程-A3-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"002","OPER_SID":"GTI25072118015382745","OPERATION_NO":"TF-ROU-00000016","OPERATION":"B10ON-Via1.","IS_START":"F","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:41:24","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:41:24","hasChildren":true,"leaf":false,"children":[],"OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","ROUTE_CATEGORY":"R","PARENT_ROUTE_VER_SID":""},{"id":"003003","ROUTE_VER_OPER_SID":"GTI25092610412477167","ROUTE_VER_SID":"GTI25092610402877137","ROUTE_SID":"GTI25092610402877136","ROUTE_NO":"TF-ROU-00000026","ROUTE":"TF二階流程-A3-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"003","OPER_SID":"GTI25072118015382713","OPERATION_NO":"TF-ROU-00000014","OPERATION":"12NON-負光阻M2","IS_START":"F","IS_END":"T","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:41:24","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:41:24","hasChildren":true,"leaf":false,"children":[],"OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","ROUTE_CATEGORY":"R","PARENT_ROUTE_VER_SID":""}],"leaf":false,"ROUTE_CATEGORY":"R","hasChildren":true}] ,
        "GTI25103109393878872":null

    },
    QuerySubRouteOper:{
        "GTI25092610384877073":{"ID":"dadddb9e-edd3-46c7-8af8-83af62817619","Success":true,"Message":null,"MessageList":[],"Redirect":null,"Data":[{"id":"002001","ROUTE_VER_OPER_SID":"GTI25092610395377106","ROUTE_VER_SID":"GTI25092610384877073","ROUTE_SID":"GTI25092610384877072","ROUTE_NO":"TF-ROU-00000025","ROUTE":"TF二階流程-A2-V2","VERSION":1.0,"OPER_CATEGORY":"O","OPER_SEQ":"001","OPER_SID":"GTI25092609482676057","OPERATION_NO":"TF-OPR-00000029","OPERATION":"PSEUDO-02","IS_START":"T","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:39:53","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:39:53","hasChildren":false,"leaf":true,"children":[],"OPERATION_TYPE":"STD01","OPERATION_TYPE_NAME":"標準進出站","ROUTE_CATEGORY":"O","PARENT_ROUTE_VER_SID":""},{"id":"002002","ROUTE_VER_OPER_SID":"GTI25092610395377107","ROUTE_VER_SID":"GTI25092610384877073","ROUTE_SID":"GTI25092610384877072","ROUTE_NO":"TF-ROU-00000025","ROUTE":"TF二階流程-A2-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"002","OPER_SID":"GTI25072118015282697","OPERATION_NO":"TF-ROU-00000013","OPERATION":"11NON-負光阻M1.","IS_START":"F","IS_END":"F","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:39:53","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:39:53","hasChildren":true,"leaf":false,"children":[],"OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","ROUTE_CATEGORY":"R","PARENT_ROUTE_VER_SID":""},{"id":"002003","ROUTE_VER_OPER_SID":"GTI25092610395377108","ROUTE_VER_SID":"GTI25092610384877073","ROUTE_SID":"GTI25092610384877072","ROUTE_NO":"TF-ROU-00000025","ROUTE":"TF二階流程-A2-V2","VERSION":1.0,"OPER_CATEGORY":"R","OPER_SEQ":"003","OPER_SID":"GTI25072118015082616","OPERATION_NO":"TF-ROU-00000004","OPERATION":"F1NON-M1飛針.","IS_START":"F","IS_END":"T","CREATE_USER":"Admin","CREATE_DATE":"2025-09-26 10:39:53","UPDATE_USER":"Admin","UPDATE_DATE":"2025-09-26 10:39:53","hasChildren":true,"leaf":false,"children":[],"OPERATION_TYPE":"SUB-ROUTE","OPERATION_TYPE_NAME":"子流程","ROUTE_CATEGORY":"R","PARENT_ROUTE_VER_SID":""}],"Exception":null,"InnerResults":[],"Code":"000"}
    }
}
//一階/標準流程
export var _case2 = {
    OffLineRecEDC_LotInfo:{"ID":"bcde7623-644b-4294-a5f3-02f29cf7f6d3","Success":true,"Message":null,"MessageList":[],"Redirect":null,"Data":{"ddl_curr_oper_val":"GTI25072111165543308","ddl_curr_oper_src":[{"RefKey":null,"SID":"GTI25072111165543308","No":"TF-OPR-00000001","Value":"GTI25072111165543308","Display":"I0001-備料","StatusSid":null,"Status":null,"FromNum":0.0,"INum":0.0,"INum1":0.0,"INum2":0.0,"INum3":0.0,"Attr01":"O","Attr02":"GTI25072118015282671","Attr03":"GTI25072118015282678","subItem":[],"subItemExt":[],"is_空subItem錯誤":false,"LineNo":null}],"ddl_record_oper_src":[{"RefKey":null,"SID":"GTI25072111165543308","No":"TF-OPR-00000001","Value":"GTI25072111165543308","Display":"I0001-備料","StatusSid":null,"Status":null,"FromNum":0.0,"INum":0.0,"INum1":0.0,"INum2":0.0,"INum3":0.0,"Attr01":"O","Attr02":"GTI25072118015282671","Attr03":"GTI25072118015282678","subItem":[],"subItemExt":[],"is_空subItem錯誤":false,"LineNo":null},{"RefKey":null,"SID":"GTI25072111165643322","No":"TF-OPR-00000016","Value":"GTI25072111165643322","Display":"INM001-來料刷洗檢查","StatusSid":null,"Status":null,"FromNum":0.0,"INum":0.0,"INum1":0.0,"INum2":0.0,"INum3":0.0,"Attr01":"O","Attr02":"GTI25072118015282671","Attr03":"GTI25072118015282679","subItem":[],"subItemExt":[],"is_空subItem錯誤":false,"LineNo":null},{"RefKey":null,"SID":"GTI25072111165643330","No":"TF-OPR-00000024","Value":"GTI25072111165643330","Display":"SPT002-濺鍍","StatusSid":null,"Status":null,"FromNum":0.0,"INum":0.0,"INum1":0.0,"INum2":0.0,"INum3":0.0,"Attr01":"O","Attr02":"GTI25072118015282671","Attr03":"GTI25072118015282680","subItem":[],"subItemExt":[],"is_空subItem錯誤":false,"LineNo":null}],"form":{"LOT":"LAYER-ROU_一階跳二階測試-03","WO":"LAYER-ROU_一階跳二階測試","OPER_SID":"GTI25072111165543308","ROUTE_VER_OPER_SID":null,"SUB_ROUTE_VER_OPER_SID":null,"UNIT":"PCS","QUANTITY":"10.000","EQP_SID":null,"COMMENT":null,"IsMustSelectedEqp":false,"Has_sub_record_oper":false}},"Exception":null,"InnerResults":[],"Code":"000"},
    //API 不會有資料,特此備註 
    GetRouteInfo:{}

}


export var _form = {
 form1:{"LOT":"JOSEPH_TEST_LAYER-02","WO":"JOSEPH_TEST_LAYER","OPER_SID":"GTI25092609482676057","ROUTE_VER_OPER_SID":"GTI25092610430277229","SUB_ROUTE_VER_OPER_SID":null,"UNIT":"PCS","QUANTITY":"20.000","EQP_SID":null,"COMMENT":null,"IsMustSelectedEqp":false,"Has_sub_record_oper":false}

}