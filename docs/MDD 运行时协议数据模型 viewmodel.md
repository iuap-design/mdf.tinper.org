<a name="1a63ac23"></a>
# 示例
**请求接口：**<br />[http://uretailmobile.yonyouup.com/uniform/billmeta/getbill?billno=aa_messagelist&bIncludeViewModel=true&terminalType=3&token=c326ca9afd58427488336e2803320678](http://uretailmobile.yonyouup.com/uniform/billmeta/getbill?billno=aa_messagelist&bIncludeViewModel=true&terminalType=3&token=c326ca9afd58427488336e2803320678)<br />注：请求前将[https://retail.yonyoucloud.com](https://retail.yonyoucloud.com/)试用账号获取到的token替换到上面的链接中

**接口返回值：**
```json
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"viewmodel": {
			"iBillId": 1000066578,
			"cBillName": "消息列表",
			"cBillNo": "aa_messagelist",
			"cFilterId": "3450016",
			"cBillType": "ArchiveList",
			"cSubId": "AA",
			"bBatchOperate": true,
			"entities": [{
				"cCode": "aa_messagelist",
				"cEntityName": "消息列表",
				"cType": "Bill",
				"cDataSourceName": "aa.message.Message",
				"cPrimaryKey": "id",
				"iBillEntityId": 93787,
				"bMain": true,
				"cControlType": "Table",
				"fields": [{
					"cFieldName": "tenant",
					"cItemName": "tenant",
					"cCaption": "租户ID",
					"cShowCaption": "租户ID",
					"iBillEntityId": 93787,
					"iBillTplGroupId": 3413458,
					"iTplId": 72934,
					"iMaxLength": 255,
					"iFieldType": 1,
					"bEnum": false,
					"bMustSelect": true,
					"bHidden": true,
					"bSplit": false,
					"bExtend": false,
					"bCanModify": true,
					"iMaxShowLen": 255,
					"iColWidth": 150,
					"bNeedSum": false,
					"bShowIt": false,
					"bFilter": false,
					"bIsNull": true,
					"bPrintCaption": false,
					"bJointQuery": false,
					"bPrintUpCase": false,
					"bSelfDefine": false,
					"cTplGroupName": "Table",
					"bMain": true,
					"cDataSourceName": "aa.message.Message",
					"cControlType": "Input",
					"bVmExclude": 0,
					"iOrder": 0,
					"isshoprelated": false,
					"iSystem": 1,
					"authLevel": 3,
					"isExport": false
				}],
        "key": "Entity.Toolbarst_storeoutlogistic_toolbar_data_edit",
				"parentKey": "st_storeoutlogistic_toolbar_data_edit"
			}],
			"actions": [{
				"cCommand": "cmdDelete",
				"cAction": "batchdelete",
				"cSvcUrl": "/bill/batchdelete.do",
				"cHttpMethod": "POST",
        "cTarget": "st_storeoutlogistic_toolbar_data_edit"
			}],
      "states": [{
				"cCode": "editonaudit",
				"cCondition": "data.verifystate \u003d\u003d 100 \u0026\u0026 mode \u003d\u003d \u0027edit\u0027",
				"items": [{
					"bVisible": true,
					"bEnable": true,
					"cName": "btnDelete",
					"cGroup": "toolbaritem"
				}]
			}]
		},
		"viewApplication": {}
	}
}
```
注：完整数据自行抓取

<a name="133e0974"></a>
# 顶级节点说明
| **属性** | **含义** | **说明** |
| :---: | :---: | :---: |
| viewmodel | 数据模型，发送给node端转译成可执行的js | _JsonObject_ |
| viewApplication | 表单view模型，node转译后原数据不改变，标签改为viewmete | _JsonObject_ |

<a name="4617418c"></a>
# 模型数据 viewmodel

```json
"viewmodel": {
    "iBillId": 1000066578,
    "cBillName": "消息列表",
    "cBillNo": "aa_messagelist",
    "cFilterId": "3450016",
    "cBillType": "ArchiveList",
    "cSubId": "AA",
    "bBatchOperate": true,
    "entities": [2],
    "actions": [2],
  	"states": [2]
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| iBillId | Integer | 单据ID | 1001282423 |
| cBillName | String | 名称 | 项目模板列表 |
| cBillNo | String | 单据编号 | projectlist |
| cFilterId | String | 过滤器ID | 3450016 |
| cBillType | String | 类型 | ArchiveList |
| cSubId | String | 子产品ID | AA |
| bBatchOperate | Boolean |  | true |
| entities | _JsonArray_ | 实体列表 | _JsonArray_ |
| actions | _JsonArray_ | 动作列表 | _JsonArray_ |
| states | _JsonArray_ | 状态列表 | _JsonArray_ |

<a name="a72ebeae"></a>
## 实体 entities

```json
{
		"cCode": "aa_messagelist",
    "cEntityName": "消息列表",
    "cType": "Bill",
    "cDataSourceName": "aa.message.Message",
    "cPrimaryKey": "id",
    "iBillEntityId": 93787,
    "bMain": true,
    "cControlType": "Table",
    "fields": [2],
  	"key": "Entity.Toolbarst_storeoutlogistic_toolbar_data_edit",
		"parentKey": "st_storeoutlogistic_toolbar_data_edit"
}
        
```


| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| cCode | String | 实体编码 | aa_messagelist |
| cEntityName | String | 实体名称 | 消息列表 |
| cType | String | 实体类型 | Bill，中间数据自动生成 |
| cDataSourceName | String | 数据源名称 | aa.message.Message |
| cPrimaryKey | String | 主键名称 | id |
| iBillEntityId | Integer | 单据实体主键 | 93787 |
| bMain | Boolean | 是否主表 | true |
| cControlType | String | 模板类型，容器类型 | Table |
| fields | _JsonArray_ | 属性列表 | _JsonArray_ |
| key | String |  | Entity.Toolbarst_storeoutlogistic_toolbar_data_edit |
| parentKey | String |  | st_storeoutlogistic_toolbar_data_edit |


<a name="cb0af344"></a>
### 属性 fields

```json
{
		"cFieldName": "tenant",
    "cItemName": "tenant",
    "cCaption": "租户ID",
    "cShowCaption": "租户ID",
    "iBillEntityId": 93787,
    "iBillTplGroupId": 3413458,
    "iTplId": 72934,
    "iMaxLength": 255,
    "iFieldType": 1,
    "bEnum": false,
    "bMustSelect": true,
    "bHidden": true,
    "bSplit": false,
    "bExtend": false,
    "bCanModify": true,
    "iMaxShowLen": 255,
    "iColWidth": 150,
    "bNeedSum": false,
    "bShowIt": false,
    "bFilter": false,
    "bIsNull": true,
    "bPrintCaption": false,
    "bJointQuery": false,
    "bPrintUpCase": false,
    "bSelfDefine": false,
    "cTplGroupName": "Table",
    "bMain": true,
    "cDataSourceName": "aa.message.Message",
    "cControlType": "Input",
    "bVmExclude": 0,
    "iOrder": 0,
    "isshoprelated": false,
    "iSystem": 1,
    "authLevel": 3,
    "isExport": false
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| cItemName | String | 名称 | orgid_name；  和 cName一样 容器是取cName，控件取cItemName |
| cCaption | String | 标题 | 所属组织 |
| cShowCaption | String | 显示标题 | 所属组织（可设置） |
| iMaxLength | Integer | 最大长度 | 100 |
| iFieldType | Integer | 字段类型 | 1；（废弃类型）已被controlType代替 |
| bEnum | Boolean | 是否枚举 | false |
| cEnumString | String | 枚举信息 | {"0":"未启用","1":"启用","2":"停用"} |
| bMustSelect | Boolean | 是否必选 | false；必收集信息 |
| bHidden | Boolean | 是否隐藏 | false； 系统字段，用于业务的隐藏管理 |
| bSplit | Boolean | 是否支持行拆分 | false |
| bExtend | Boolean | 是否扩展字段 | false；计算字段，用户自己扩展 UI层面 |
| bCanModify | Boolean | 是否可修改 | true；是否可编辑 |
| iMaxShowLen | Integer | 最大显示长度 | 255 |
| iColWidth | Integer | 列宽 | 150 |
| iAlign | Integer | 对齐方式 | 1；字段取值范围含义 （废弃类型）<br />1 left，2 center，3right |
| bNeedSum | Boolean | 是否支持合计 | false |
| cSumType | String | 汇总类型 | avg，count，group，max，sum，自定义 |
| bShowIt | Boolean | 是否显示 | true；用户字段，是否显示某个字段（true为勾选项） |
| bFilter | Boolean | 是否过滤 | true |
| cDefaultValue | String | 默认值 | 0；只有枚举类型才有 |
| bIsNull | Boolean | 是否可以为空 | true |
| bPrintCaption | Boolean | 是否打印栏目标题 | true |
| bJointQuery | Boolean | 是否支持关联查询 | false |
| bPrintUpCase | Boolean | 是否打印金额大写 | false |
| bSelfDefine | Boolean | 是否自定义项目 | false；实体字段，用户自定义 |
| cControlType | String | 控件类型 | Input |
| iOrder | Integer | 排序 | 1 |
| bMain | Boolean | 是否主表 | true |
| id | Integer | ID | 71226251 |
| bVmExclude | Boolean |  | "bVmExclude": 0：viewmodel和view中都有，1、viewmodel和view中没有， 2、viewmodel有，view没有<br />（举例：regionCode） |
| iBillTplGroupId | Integer | 模板分组ID | 69416434 |
| iBillId | Integer | 单据ID | 1001282423 |
| iBillEntityId | Integer | 单据实体ID | 2163145 |
| iTplId | Integer | 单据模板ID | 1337972 |
| cSubId | String | 子产品ID | AA |
| iSystem | Integer | 是否系统定义 | 0：非系统，1：系统；系统预制，给二开预留 |
| cName | String | 字段别名 | enable |
| cFieldName | String | 字段类型 | enable |
| authLevel | Integer |  | 3；（零售 权限级别）0：租户管理员 1：租户操作员  2：是客户管理员 3：客户操作员 4：商家管理员 5：商家操作员 |
| cDataSourceName | String | 数据源名称 | bd.project.ProjectVO |
| enterDirection | Integer | 切入方向 | 0 |
| cEnumType | String | 枚举类型 | bd_enable_type |
| enumArray | String | 枚举数组 | [{"nameType":"text","value":"未启用","key":"0"},{"nameType":"text","value":"启用","key":"1"},{"nameType":"text","value":"停用","key":"2"}] |

<a name="3ecfa348"></a>
## 动作 actions

```json
{
		"cCommand": "cmdDelete",
    "cAction": "batchdelete",
    "cSvcUrl": "/bill/batchdelete.do",
    "cHttpMethod": "POST",
		"cTarget": "st_storeoutlogistic_toolbar_data_edit"
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| cCommand | String | 命令名称 | cmdDelete |
| cAction | String | 动作名称 | batchdelete |
| cSvcUrl | String | 请求地址 | /bill/batchdelete.do |
| cHttpMethod | String | 请求方式 | POST |
| cTarget | String |  | st_storeoutlogistic_toolbar_data_edit |

<a name="882737d6"></a>
## 状态 states
状态存储在bill_status、bill_status_config、bill_status_profile三张表里

- bill_status：状态定义
- bill_status_config：状态和单据的关系
- bill_status_profile：个性状态定义

```json
{
  "cCode": "add",
  "cCondition": "data.verifystate \u003d\u003d 100 \u0026\u0026 mode \u003d\u003d \u0027edit\u0027",
  "items": []
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| cCode | String | 状态编码 | add |
| cCondition | String | 动作名称 | data.verifystate \\u003d\\u003d 100 \\u0026\\u0026 mode \\u003d\\u003d \\u0027edit\\u0027 |
| items | _JsonArray_ | 请求地址 |  |

<a name="b510a59f"></a>
### 状态项 items

```json
{
    "bVisible": false,
    "bEnable": false,
    "cName": "btnAudit",
    "cGroup": "toolbaritem"
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| bVisible | Boolean | 是否显示 | false |
| bEnable | Boolean | 是否可用 | false |
| cName | String |  | btnAudit |
| cGroup | String |  | toolbaritem |


<a name="4165f1ca"></a>
# 模板数据 viewApplication


表单viewApplication属性见：[链接](https://www.yuque.com/gpgy5k/ucf/ikpq0g)



