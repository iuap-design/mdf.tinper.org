<a name="4a106f62"></a>
# json结构

```json
{
    "groupId": 79482,
    "cName": "账龄方案设置列表区域",
    "iOrder": 11,
    "bMain": true,
    "cCode": "arap_accountagelist",
    "cDataSourceName": "arap.accountage.AccountAgingPlanSetting",
    "cControlType": "Table",
    "cGroupCode": "arap_accountagelist_grid",
    "cAlign": "bottom",
    "iCols": 0,
    "containers": [
        {
            "groupId": 68897302,
            "parentId": 79482,
            "cName": "ListBody",
            "iOrder": 0,
            "cDataSourceName": "Toolbar",
            "cControlType": "Toolbar",
            "cGroupCode": "ListBody",
            "cAlign": "left",
            "iCols": 0,
            "controls": [
                {
                    "icon": "bianji1",
                    "cItemName": "btnEdit",
                    "cCaption": "编辑",
                    "cShowCaption": "编辑",
                    "cControlType": "button",
                    "iOrder": 6,
                    "iStyle": 0,
                    "enterDirection": 0,
                    "key": "68897302"
                }
            ],
            "key": "ContainerToolbarListBody",
            "parentKey": "Container79482"
        }
    ],
    "controls": [
        {
            "cItemName": "name",
            "cCaption": "名称",
            "cShowCaption": "名称",
            "iFieldType": 1,
            "bEnum": false,
            "bMustSelect": false,
            "bHidden": false,
            "bSplit": false,
            "bExtend": false,
            "bCanModify": true,
            "iMaxShowLen": 255,
            "iColWidth": 150,
            "iAlign": 1,
            "bNeedSum": false,
            "bShowIt": true,
            "bFilter": false,
            "iTabIndex": 15,
            "bIsNull": true,
            "bPrintCaption": true,
            "bJointQuery": true,
            "bPrintUpCase": false,
            "bSelfDefine": false,
            "cControlType": "Input",
            "iOrder": 5,
            "bMain": true,
            "id": 491337,
            "bVmExclude": 0,
            "iBillTplGroupId": 79482,
            "iBillId": 17616,
            "iBillEntityId": 10422,
            "iTplId": 9094,
            "cSubId": "CA",
            "iSystem": 1,
            "cName": "name",
            "cFieldName": "name",
            "authLevel": 5,
            "cDataSourceName": "arap.accountage.AccountAgingPlanSetting",
            "enterDirection": 4
        }
    ]
}
```

<a name="1d644644"></a>
# 字段说明

- Table
| 属性 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| cItemName | 数据data中的字段名 |  | viewmodel.get("cCode值")获取对应的GridModel |
| iCols | 所占容器宽度，默认是100% | number | 宽度值=100%/iCols,1即为100% |

- 列属性
| 属性 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| cCode | 当前表格code值，可以根据此code值获取对应的Model。可以理解为这个表格的id |  | viewmodel.get("cCode值")获取对应的GridModel |
| iCols | 所占容器宽度，默认是100% | number | 宽度值=100%/iCols,1即为100% |
| cShowCaption | 显示的列名称 | string |  |
| bHidden | 是否隐藏 | boolean |  |
| iColWidth | 列宽 | number | 默认是150 |
| bNeedSum | 是否需要合计 | boolean |  |
| controlType | 字段类型，当值为vouchermoney时，为凭证金额 |  |  |
| bFixed | 是否为固定列 | boolean | 默认都是非固定列 |

<a name="6defd2fd"></a>
# 复杂功能
| 功能 | vm中字段 | 表格中字段 | 备注 |
| --- | --- | --- | --- |
| 多选 | bBatchOperate | showCheckBox | 默认showCheckBox为true，即都包含多选功能 |
| 右上角columnSetting | groupSchemaId | showColumnSetting | 默认都为true，当groupSchemaId为true，showColumnSetting为false，此时不显示 |
| 分页 |  | isPagination | 默认为true，特殊场景子表、树表为false |


<a name="API"></a>
# API

- **setDataSource(data)**

设置表格数据

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| data | 表格数据 | array |  |

**

- **setScrollTop(scrollTop)**

设置表格纵向滚动条位置

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| scrollTop | 设置表格滚动条的位置 | number |  |


- **onVerticalScroll(scrollTop)**

  表格滚动时的回调函数

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| scrollTop | 表格滚动时纵向滚动位置 | number |  |


