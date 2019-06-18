# 表(table)参照的使用

<a name="BFUnV"></a>
## cTpltype: Table
<a name="sEDN3"></a>
## gridModel配置

```javascript
table: new cb.models.GridModel({
        showAggregates: false, //是否显示合计
        multiple: this.getParams().multiple,//是否多选
        dataSourceMode: 'remote',
        override: cb.rest.interMode === 'touch' ? false : true,
        pageInfo: {
          pageSize: pageSize,
          pageIndex: 1
        }
      })
```

- showAggregates
  - 由excel中bNeedSum字段控制，在表格中默认是true，当所有的列字段中bNeedSum都为false时，showAggregates会改成false
  - 由于表格内部不会计算showAggregates值，其值由外层传入。voucherList会在统一判断，、freeview没有做处理，因此在freeview中的表格都会显示合计和小计，如果不想显示，需要在扩展脚本中处理
<a name="tSPnR"></a>
## 表格生成过程
<a name="BntiL"></a>
### 请求meta信息

```javascript
{
    "code": 200,
    "message": "操作成功",
    "data": {
        "refEntity": {
            "id": 20061,
            "code": "aa_sendtranswayref",
            "name": "发运方式",
            "description": "发运方式",
            "refType": "aa_sendtranswayref",
            "isOrgRel": false,
            "datasourceType": "meta",
            "cBillnum": "aa_sendtranswayref",
            "cSub_ID": "AA",
            "cEntityKeyFld": "id",
            "cTpltype": "Table",
            "cEntityNameFld": "name",
            "cRetFld": "id",
            "bMultiSel": false,
            "cRefFilterSql": "0",
            "bAuth": false,
            "cCheckFlds": "code,name",
            "bPage": false,
            "cDataGrid_FullName": "aa.sendtrans.SendTransWay",
            "cDataGrid_classFk": "id",
            "cDataClass_FullName": "aa.sendtrans.SendTransWay",
            "bDataClass_Rule": false,
            "bDataClass_RetEndData": false,
            "cDataClass_sortField": "id",
            "extendField": "{\"placeholder\":\"编码/名称\"}"
        },
        "gridMeta": {
            "viewmodel": {
                "iBillId": 1000455798,
                "cBillName": "发运方式参照",
                "cBillNo": "aa_sendtranswayref",
                "cFilterId": "38336584",
                "cBillType": "ArchiveList",
                "cSubId": "AA",
                "bBatchOperate": true,
                "entities": [
                    {
                        "cCode": "aa_sendtranswayref",
                        "cEntityName": "发运方式",
                        "cType": "Bill",
                        "cDataSourceName": "aa.sendtrans.SendTransWay",
                        "cPrimaryKey": "id",
                        "iBillEntityId": 1106520,
                        "bMain": true,
                        "cControlType": "Table",
                        "fields": [
                            {
                                "cFieldName": "code",
                                "cItemName": "code",
                                "cCaption": "发运方式编码",
                                "cShowCaption": "发运方式编码",
                                "iBillEntityId": 1106520,
                                "iBillTplGroupId": 4376907,
                                "iTplId": 1100677,
                                "iFieldType": 1,
                                "bEnum": false,
                                "bMustSelect": false,
                                "bHidden": false,
                                "bCanModify": true,
                                "iColWidth": 100,
                                "bShowIt": true,
                                "bFilter": true,
                                "bIsNull": false,
                                "cTplGroupName": "Table",
                                "bMain": true,
                                "cDataSourceName": "aa.sendtrans.SendTransWay",
                                "cControlType": "Input",
                                "bVmExclude": 0,
                                "iOrder": 1,
                                "isshoprelated": false,
                                "iSystem": 1,
                                "authLevel": 5,
                                "isExport": true,
                                "isMasterOrg": false
                            }
                        ]
                    }
                ],
                "actions": []
            },
            "viewApplication": {
                "billid": 1000455798,
                "cBillName": "发运方式参照",
                "cBillType": "ArchiveList",
                "cBillNo": "aa_sendtranswayref",
                "bAllowMultiTpl": false,
                "cSubId": "AA",
                "cCardKey": "aa_sendtranswayref",
                "view": {
                    "iTplId": 1100677,
                    "cTemplateName": "发运方式显示模板",
                    "iTplMode": 0,
                    "iWidth": 10000,
                    "cTemplateTitle": "发运方式",
                    "containers": [
                        {
                            "groupId": 4376907,
                            "cName": "Table",
                            "iOrder": 3,
                            "bMain": true,
                            "cCode": "aa_sendtranswayref",
                            "cDataSourceName": "aa.sendtrans.SendTransWay",
                            "cControlType": "Table",
                            "cGroupCode": "Table_3",
                            "cAlign": "center",
                            "iCols": 0,
                            "controls": [
                                {
                                    "cItemName": "code",
                                    "cCaption": "发运方式编码",
                                    "cShowCaption": "发运方式编码",
                                    "iFieldType": 1,
                                    "bEnum": false,
                                    "bMustSelect": false,
                                    "bHidden": false,
                                    "bCanModify": true,
                                    "iColWidth": 100,
                                    "bShowIt": true,
                                    "bFilter": true,
                                    "iTabIndex": 0,
                                    "bIsNull": false,
                                    "cControlType": "Input",
                                    "iOrder": 1,
                                    "bMain": true,
                                    "id": 38337951,
                                    "bVmExclude": 0,
                                    "iBillTplGroupId": 4376907,
                                    "iBillId": 1000455798,
                                    "iBillEntityId": 1106520,
                                    "iTplId": 1100677,
                                    "cSubId": "AA",
                                    "iSystem": 1,
                                    "cName": "code",
                                    "cFieldName": "code",
                                    "authLevel": 5,
                                    "cDataSourceName": "aa.sendtrans.SendTransWay",
                                    "enterDirection": 4
                                }
                            ]
                        }
                    ]
                },
                "extscripturls": []
            }
        }
    }
}
```

- refEntity：参照实体，获取参照类型、过滤id、输入框的placeholder（在extendField设置）
- gridMeta 
  - viewApplication 模板
  - viewmodel    数据模型

根据gridMeta数据生成，表头数据，参考getColumnsData方法
<a name="IM0KW"></a>
## 表头信息

  - getRefMeta
    - getColumnsData
<a name="VCSZS"></a>
## 表体信息

  - initData

```javascript
 gridModel.setDataSource(proxy.config.getRefData, cb.utils.extend({ dataType: 'grid' }, param))
```
GridModel.setDataSource方法调用showPageInner方法，渲染表体信息，分页信息。<br />
<br />

<a name="VL1Uk"></a>
## 参考节点
基础建模-》供应商—》新增-》发运方式
<a name="lV9pG"></a>
## 
