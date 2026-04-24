export var _tmpData = {
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

export let _form = {
    EdcCfg: {"CatchKey":null,"Api":{"data":[{"Confidential":null,"Page":null,"edc_ver_para_sid":"GTI25102018093118160","parameter":"PAD 高度:左上------","tl":"5.5","ucl":10.5,"lcl":0.5,"usl":10.5,"lsl":0.5},{"Confidential":null,"Page":null,"edc_ver_para_sid":"GTI25110614204194981","parameter":"JK_API_TEST_EDP","tl":"11","ucl":21,"lcl":11,"usl":21,"lsl":11}],"ReturnCode":null,"trace_id":"843a2b0a-2cfe-4580-b209-c18dc83d9d1d","success":true,"message":null,"action":null},"rule":{"FROM_RULE_SID":"GTI25110516390364260","TotalWeight":1.1,"FC_EDC_TARGET":{"EDC_TARGET_SID":"GTI25110516390364260","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"ENABLE_FLAG":"T","CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-05 16:39:03","WIP_SCOPE":"Run","QUOTE_ONCE":"F","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2026-02-03 15:54:08","LINE_NO":"JK_LINE"},"FC_TARGETs":[{"RECIPE_SID":null,"P_SID":"GTI26020315541012239","FROM_RULE":"EDC","FROM_RULE_SID":"GTI25110516390364260","TARGET_OBJECT":"Operation","TARGET_SID":"GTI25110510554254406","TARGET_NO":"JK_LINE-OPR-00000008","TARGET_NAME":"JK_OPER_EDC","CREATE_USER":"Jake.Tu","CREATE_DATE":"2026-02-03 15:54:08","VERSION":0}]},"edc_Model":[{"ZZ_EDC_GROUP_CODE":{"SID":"GTI25110516290664007","GROUP_CODE":"JK_GROUP_01----","SAMPLE_TYPE":"清單","ITEM_RESOURCE":"JK_OPTION","MAXIMUM":"4"},"EdcSrcs":[{"edc_ver":{"EDC_VER_PARA_SID":"GTI25110614204094976","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"EDC_PARA_SID":"GTI25110515510062194","PARA_NO":"JK_LINE-EDP-00000004","PARAMETER":"JK_STR","DATATYPE":"S","TL":"NA","UCL":null,"LCL":null,"USL":null,"LSL":null,"CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-06 14:20:40","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-06 14:20:40","SAMPLESIZE":1,"THROW_SPC":"F","MUST_INPUT":"T","ITEM_SEQ":10,"DB_TABLE":null,"DISPLAY_POINT_NAME":null,"DB_COLUMN_NAME":null,"GROUP_CODE_SID":"GTI25110516290664007","GROUP_CODE":null,"DEFAULT_TL":null},"edc":{"LINE_NO":"JK_LINE","LUT_NAME":null,"DEFAULT_TL":null,"EDC_PARA_SID":"GTI25110515510062194","PARA_NO":"JK_LINE-EDP-00000004","PARAMETER":"JK_STR","DATATYPE":"S","DESCRIPTION":null,"TL":"NA","UCL":null,"LCL":null,"USL":null,"LSL":null,"ENABLE_FLAG":"T","QUOTE_ONCE":"F","CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-05 15:51:00","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-05 15:51:02","UNIT":null,"MUST_INPUT":"T","DISPLAY_TYPE":null,"DB_TABLE":null,"DB_COLUMN_NAME":null}},{"edc_ver":{"EDC_VER_PARA_SID":"GTI25110614204094977","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"EDC_PARA_SID":"GTI25110515512262203","PARA_NO":"JK_LINE-EDP-00000005","PARAMETER":"JK_NUM","DATATYPE":"N","TL":"10","UCL":null,"LCL":null,"USL":null,"LSL":null,"CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-06 14:20:40","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-06 14:20:40","SAMPLESIZE":1,"THROW_SPC":"F","MUST_INPUT":"T","ITEM_SEQ":20,"DB_TABLE":null,"DISPLAY_POINT_NAME":null,"DB_COLUMN_NAME":null,"GROUP_CODE_SID":"GTI25110516290664007","GROUP_CODE":null,"DEFAULT_TL":null},"edc":{"LINE_NO":"JK_LINE","LUT_NAME":null,"DEFAULT_TL":null,"EDC_PARA_SID":"GTI25110515512262203","PARA_NO":"JK_LINE-EDP-00000005","PARAMETER":"JK_NUM","DATATYPE":"N","DESCRIPTION":null,"TL":"10","UCL":null,"LCL":null,"USL":null,"LSL":null,"ENABLE_FLAG":"T","QUOTE_ONCE":"F","CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-05 15:51:22","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-05 15:51:24","UNIT":null,"MUST_INPUT":"T","DISPLAY_TYPE":null,"DB_TABLE":null,"DB_COLUMN_NAME":null}},{"edc_ver":{"EDC_VER_PARA_SID":"GTI25110614204194978","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"EDC_PARA_SID":"GTI25110515514562211","PARA_NO":"JK_LINE-EDP-00000006","PARAMETER":"JK_BOOL","DATATYPE":"B","TL":"T","UCL":null,"LCL":null,"USL":null,"LSL":null,"CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-06 14:20:41","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-06 14:20:41","SAMPLESIZE":1,"THROW_SPC":"F","MUST_INPUT":"T","ITEM_SEQ":30,"DB_TABLE":null,"DISPLAY_POINT_NAME":null,"DB_COLUMN_NAME":null,"GROUP_CODE_SID":"GTI25110516290664007","GROUP_CODE":null,"DEFAULT_TL":null},"edc":{"LINE_NO":"JK_LINE","LUT_NAME":null,"DEFAULT_TL":null,"EDC_PARA_SID":"GTI25110515514562211","PARA_NO":"JK_LINE-EDP-00000006","PARAMETER":"JK_BOOL","DATATYPE":"B","DESCRIPTION":null,"TL":"T","UCL":null,"LCL":null,"USL":null,"LSL":null,"ENABLE_FLAG":"T","QUOTE_ONCE":"F","CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-05 15:51:45","UPDATE_USER":"Admin","UPDATE_DATE":"2025-11-06 14:12:38","UNIT":null,"MUST_INPUT":"T","DISPLAY_TYPE":null,"DB_TABLE":null,"DB_COLUMN_NAME":null}},{"edc_ver":{"EDC_VER_PARA_SID":"GTI25110614204194979","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"EDC_PARA_SID":"GTI25110515571362225","PARA_NO":"JK_LINE-EDP-00000007","PARAMETER":"JK_OPTION","DATATYPE":"L","TL":"A","UCL":null,"LCL":null,"USL":null,"LSL":null,"CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-06 14:20:41","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-06 14:20:41","SAMPLESIZE":1,"THROW_SPC":"F","MUST_INPUT":"T","ITEM_SEQ":40,"DB_TABLE":null,"DISPLAY_POINT_NAME":null,"DB_COLUMN_NAME":null,"GROUP_CODE_SID":"GTI25110516290664007","GROUP_CODE":null,"DEFAULT_TL":null},"edc":{"LINE_NO":"JK_LINE","LUT_NAME":"JK_OPTION","DEFAULT_TL":null,"EDC_PARA_SID":"GTI25110515571362225","PARA_NO":"JK_LINE-EDP-00000007","PARAMETER":"JK_OPTION","DATATYPE":"L","DESCRIPTION":null,"TL":"A","UCL":null,"LCL":null,"USL":null,"LSL":null,"ENABLE_FLAG":"T","QUOTE_ONCE":"F","CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-05 15:57:14","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-05 15:57:14","UNIT":null,"MUST_INPUT":"T","DISPLAY_TYPE":null,"DB_TABLE":null,"DB_COLUMN_NAME":null}}],"FC_EDC_VER_PARAMETER_idx":{"GTI25110614204094976":{"TL":"NA","UCL":null,"LCL":null,"USL":null,"LSL":null,"DEFAULT_TL":null,"MUST_INPUT":"T","DATATYPE":"S","LUT_NAME":null,"PARAMETER":"JK_STR","RecValue":{}},"GTI25110614204094977":{"TL":"10","UCL":null,"LCL":null,"USL":null,"LSL":null,"DEFAULT_TL":null,"MUST_INPUT":"T","DATATYPE":"N","LUT_NAME":null,"PARAMETER":"JK_NUM","RecValue":{}},"GTI25110614204194978":{"TL":"T","UCL":null,"LCL":null,"USL":null,"LSL":null,"DEFAULT_TL":null,"MUST_INPUT":"T","DATATYPE":"B","LUT_NAME":null,"PARAMETER":"JK_BOOL","RecValue":{}},"GTI25110614204194979":{"TL":"A","UCL":null,"LCL":null,"USL":null,"LSL":null,"DEFAULT_TL":null,"MUST_INPUT":"T","DATATYPE":"L","LUT_NAME":"JK_OPTION","PARAMETER":"JK_OPTION","RecValue":{}}},"data":[{"SampleId":["A"],"GTI25110614204094976":["------"],"GTI25110614204094977":["10"],"GTI25110614204194978":["true"],"GTI25110614204194979":["A"]},{"SampleId":["B"],"GTI25110614204094976":["NA"],"GTI25110614204094977":["10"],"GTI25110614204194978":["true"],"GTI25110614204194979":["A"]},{"SampleId":["C"],"GTI25110614204094976":["NA"],"GTI25110614204094977":["10"],"GTI25110614204194978":["true"],"GTI25110614204194979":["A"]},{"SampleId":["D"],"GTI25110614204094976":["NA"],"GTI25110614204094977":["10"],"GTI25110614204194978":["true"],"GTI25110614204194979":["A"]}],"columns":[{"title":"Sample Id","data":"SampleId","type":null,"source":[""],"readOnly":true,"strict":null,"allowInvalid":null},{"title":"JK_STR","data":"GTI25110614204094976","type":null,"source":[""],"readOnly":true,"strict":null,"allowInvalid":null},{"title":"JK_NUM","data":"GTI25110614204094977","type":"numeric","source":[""],"readOnly":true,"strict":null,"allowInvalid":null},{"title":"JK_BOOL","data":"GTI25110614204194978","type":"checkbox","source":[""],"readOnly":true,"strict":null,"allowInvalid":null},{"title":"JK_OPTION","data":"GTI25110614204194979","type":"dropdown","source":["A","B","C","D","E","F","G","H","I","J"],"readOnly":true,"strict":true,"allowInvalid":false}]},{"ZZ_EDC_GROUP_CODE":{"SID":"GTI25110516290664008","GROUP_CODE":"JK_GROUP_FT","SAMPLE_TYPE":"FreeText","ITEM_RESOURCE":null,"MAXIMUM":"2"},"EdcSrcs":[{"edc_ver":{"EDC_VER_PARA_SID":"GTI25110614204194980","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"EDC_PARA_SID":"GTI25090910195063390","PARA_NO":"JK_LINE-EDP-00000001","PARAMETER":"JK_TEST","DATATYPE":"S","TL":"1","UCL":null,"LCL":null,"USL":null,"LSL":null,"CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-06 14:20:41","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-06 14:20:41","SAMPLESIZE":1,"THROW_SPC":"F","MUST_INPUT":"T","ITEM_SEQ":50,"DB_TABLE":null,"DISPLAY_POINT_NAME":null,"DB_COLUMN_NAME":null,"GROUP_CODE_SID":"GTI25110516290664008","GROUP_CODE":null,"DEFAULT_TL":null},"edc":{"LINE_NO":"JK_LINE","LUT_NAME":null,"DEFAULT_TL":null,"EDC_PARA_SID":"GTI25090910195063390","PARA_NO":"JK_LINE-EDP-00000001","PARAMETER":"JK_TEST","DATATYPE":"S","DESCRIPTION":"TEST","TL":"1","UCL":null,"LCL":null,"USL":null,"LSL":null,"ENABLE_FLAG":"T","QUOTE_ONCE":"F","CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-09-09 10:19:50","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-05 10:31:48","UNIT":null,"MUST_INPUT":"T","DISPLAY_TYPE":null,"DB_TABLE":null,"DB_COLUMN_NAME":null}}],"FC_EDC_VER_PARAMETER_idx":{"GTI25110614204194980":{"TL":"1","UCL":null,"LCL":null,"USL":null,"LSL":null,"DEFAULT_TL":null,"MUST_INPUT":"T","DATATYPE":"S","LUT_NAME":null,"PARAMETER":"JK_TEST","RecValue":{}}},"data":[{"SampleId":["Sample001"],"GTI25110614204194980":["1"]},{"SampleId":["Sample002"],"GTI25110614204194980":["1"]}],"columns":[{"title":"Sample Id","data":"SampleId","type":null,"source":[""],"readOnly":true,"strict":null,"allowInvalid":null},{"title":"JK_TEST","data":"GTI25110614204194980","type":null,"source":[""],"readOnly":true,"strict":null,"allowInvalid":null}]},{"ZZ_EDC_GROUP_CODE":{"SID":"GTI25110516290664009","GROUP_CODE":"JK_GROUP_LOT","SAMPLE_TYPE":"生產批","ITEM_RESOURCE":null,"MAXIMUM":null},"EdcSrcs":[{"edc_ver":{"EDC_VER_PARA_SID":"GTI25110614204194981","EDC_VER_SID":"GTI25110516290564005","EDC_SID":"GTI25110515580462236","EDC_NO":"JK_LINE-EDC-00000007","EDC_NAME":"JK_GROUP_CODE_TEST","VERSION":3,"EDC_PARA_SID":"GTI25100214461788028","PARA_NO":"JK_LINE-EDP-00000002","PARAMETER":"JK_API_TEST_EDP","DATATYPE":"N","TL":"11","UCL":21,"LCL":11,"USL":21,"LSL":11,"CREATE_USER":"Jake.Tu","CREATE_DATE":"2025-11-06 14:20:41","UPDATE_USER":"Jake.Tu","UPDATE_DATE":"2025-11-06 14:20:41","SAMPLESIZE":1,"THROW_SPC":"F","MUST_INPUT":"F","ITEM_SEQ":60,"DB_TABLE":null,"DISPLAY_POINT_NAME":null,"DB_COLUMN_NAME":null,"GROUP_CODE_SID":"GTI25110516290664009","GROUP_CODE":null,"DEFAULT_TL":null},"edc":{"LINE_NO":"JK_LINE","LUT_NAME":null,"DEFAULT_TL":null,"EDC_PARA_SID":"GTI25100214461788028","PARA_NO":"JK_LINE-EDP-00000002","PARAMETER":"JK_API_TEST_EDP","DATATYPE":"N","DESCRIPTION":"hello","TL":"10","UCL":20,"LCL":10,"USL":20,"LSL":10,"ENABLE_FLAG":"T","QUOTE_ONCE":"F","CREATE_USER":"API","CREATE_DATE":"2025-10-02 14:46:17","UPDATE_USER":"Admin","UPDATE_DATE":"2025-10-16 11:12:35","UNIT":"GTI20021416195301584","MUST_INPUT":"F","DISPLAY_TYPE":null,"DB_TABLE":null,"DB_COLUMN_NAME":null}}],"FC_EDC_VER_PARAMETER_idx":{"GTI25110614204194981":{"TL":"11","UCL":21,"LCL":11,"USL":21,"LSL":11,"DEFAULT_TL":null,"MUST_INPUT":"F","DATATYPE":"N","LUT_NAME":null,"PARAMETER":"JK_API_TEST_EDP","RecValue":{}}},"data":[{"SampleId":["Lot"],"GTI25110614204194981":["11"]}],"columns":[{"title":"Sample Id","data":"SampleId","type":null,"source":[""],"readOnly":true,"strict":null,"allowInvalid":null},{"title":"JK_API_TEST_EDP","data":"GTI25110614204194981","type":"numeric","source":[""],"readOnly":true,"strict":null,"allowInvalid":null}]}]}

}