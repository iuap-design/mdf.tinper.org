<a name="9e5ffa06"></a>
## 基本信息
| 组件名称 | ReferModal |
| --- | --- |
| 位置 | yxyweb/common/components/refer/ReferModal.jsx |
| 描述 | 参照数据操作窗口，用于参照数据的选择 |
| 依赖组件 | <br />1. antd [Modal](https://ant.design/components/modal-cn/#header)组件<br />1. 基础组件Row，Col<br />1. 功能组件TreeTable、SearchTree、ReferTable<br /> |
| model | ReferViewModel，定义在<br />/yxyweb/client/common/referViewModel.js中 |

<a name="21f2fa80"></a>
## 参数说明
<a name="props"></a>
### props
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| referType | String |  可能值：Tree|TreeTable|Table|TreeList，用来决定Modal中使用何种组件渲染数据<br />1. Tree（树形） 使用 SearchTree 组件<br />1. TreeTable（左树右表） 使用 SearchTree 和 ReferTable组件<br />1. Table（表）使用 ReferTable 组件<br />1. TreeList （树形表）使用 TreeTable组件<br /> |
| visible | Boolen | 控制ReferModal组件的显示隐藏 |
| title | String | ReferModal组件的title |
| close | Function | 关闭隐藏Modal的方法 |



<a name="state"></a>
### state
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| className | String | 根据 env.INTERACTIVE_MODE 属性来判断是否使用移动端口class（"refer-modal-touch"），当此属性的值为 touch 时使用移动端class |
| referType |  | 由props中的referType赋值，参见props.referType |
| visible |  | 由props中的visible赋值，参见props.visible |
| title |  | 由props中的title赋值，参见props.title |


<a name="a233bccd"></a>
### 组件Class关键api
| 名称 | 描述 |
| --- | --- |
| handleOk | 点击确定按钮回调，会调用 model 中的 okClick 方法 |
|  |  |


<a name="486f7fc7"></a>
### model关键api
| 名称 | 描述 |
| --- | --- |
| init  | 此方法中会初始化ReferModal中会用到的model，并且调用getRefMeta方法，获取元数据 |
| getRefMeta | 调用 pub/ref/getRefMeta 获取UI元数据 |
| initData | 获取数据 |

<a name="924c9ad3"></a>
## 组件UI元数据

```json
{
  "refEntity": {
    "id": 2000016,
    "code": "bd_orgref",
    "name": "行政组织参照",
    "description": "行政组织参照",
    "refType": "bd_orgref",
    "isOrgRel": false,
    "datasourceType": "meta",
    "cBillnum": "bd_orgref",
    "cSub_ID": "bd",
    "cEntityKeyFld": "id",
    "cTpltype": "TreeList",
    "cEntityNameFld": "name",
    "cRetFld": "id",
    "bMultiSel": true,
    "cRefFilterSql": "0",
    "bAuth": true,
    "cCheckFlds": "code,name",
    "bPage": true,
    "cDataGrid_FullName": "bd.adminOrg.AdminOrgVO",
    "cDataGrid_classFk": "id",
    "cDataClass_FullName": "bd.adminOrg.AdminOrgVO",
    "bDataClass_Rule": true,
    "bDataClass_RetEndData": true,
    "cDataClass_sortField": "id",
    "extendField": "{\"placeholder\":\"编码/名称\"}here id= 10001000',NULL);"
  },
  "gridMeta": {
    "viewmodel": {},
    "viewApplication": {
      "billid": 1001283665,
      "cBillName": "行政组织参照",
      "cBillType": "TreeArchive",
      "cBillNo": "bd_orgref",
      "bAllowMultiTpl": false,
      "cSubId": "bd",
      "cCardKey": "bd_org",
      "view": {
        "iTplId": 1339102,
        "cTemplateName": "行政组织参照模板",
        "iTplMode": 0,
        "iWidth": 10000,
        "cTemplateTitle": "行政组织",
        "containers": [
          {
          "groupId": 69421018,
          "cName": "TreeTable",
          "iOrder": 1,
          "bMain": true,
          "cCode": "bd_orgref",
          "cDataSourceName": "bd.adminOrg.AdminOrgVO",
          "cControlType": "TreeTable",
          "cGroupCode": "TreeTable_1",
          "cAlign": "right",
          "iCols": 0,
          "controls": []
          }
        ]
      },
      "extscripturls": []
    }
  }
}
```

<a name="9c4fb4c7"></a>
### 关键字段

| 名称 | 类型 | 描述 |
| --- | --- | --- |
|  |  |  |
|  |  |  |


