<a name="fc74e653"></a>
# 单据模型定义

---


<a name="1f352d87"></a>
## 单据信息（viewApplication）

```json
"viewApplication":{
    "billid":1001282423,
    "cBillName":"项目模板列表",
    "cBillType":"ArchiveList",
    "cBillNo":"projectlist",
    "bAllowMultiTpl":false,
    "cSubId":"AA",
    "cCardKey":"project",
    "view":Object{...},
    "extscripturls":Array[0]
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| billid | Integer | 单据ID【Excel中无】 | 1001282423 |
| cBillName | String | 名称【Excel中无】 | 项目模板列表 |
| cBillType | String | 类型【Excel中无】 | ArchiveList |
| cBillNo | String | 单据编号 | projectlist; 可以理解为name |
| bAllowMultiTpl | Boolean | 是否允许多模版 | false; 如果为true，则有可选模板，数据会重新获取 |
| cSubId | String | 子产品ID （业务含义） | AA; AA_billno=xxx?extend  扩展 |
| cCardKey | String | 单据类型 | project; 卡片模板的id，用于打开卡片模板页面 |
| batchoperate | Boolean | 是否多选 | 通常用于参照，标记参照是否支持多选 |
| view | JSONObject | 视图根【Excel中无】 | _JOSN_ |
| extscripturls | JSONArray | 扩展脚本地址【Excel中无】 | _JSONArray_ |

<a name="b9ff691f"></a>
### 单据分类（cBillType）

| **cBillType ****值** | **说明** |
| :---: | :---: |
| VoucherList | _单据列表_<br /> |
| ArchiveList | 档案列表 |
| TreeList | 树表 |
| Report | 报表 |
| TreeArchive | 左树右卡 |
| TreeVoucher |  |
| Archive | 卡片 |
| Voucher | 单据 |
| EditableVoucherList | 可编辑列表 |
| Option | 选项卡 |
| Compare | 对照，树卡表 |
| BillMaker |  |
| FreeeView |  |



<a name="8702214f"></a>
## 模板信息（view）

```json
"view":{
    "iTplId":1337972,
    "cTemplateName":"项目模板显示模板",
    "iTplMode":0,
    "iWidth":10000,
    "cTemplateTitle":"项目模板",
    "containers":Array[2]
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| iTplId | Integer | 单据模板ID | 1337972 |
| cTemplateName | String | 模板名称【Excel中无】 | 项目模板显示模板 |
| iTplMode | Integer | 模板类型 | 0； 终端类型对应的模板，0和2是pc，3是移动 |
| iWidth | Integer | 画布宽度 | 10000；auto100%的含义 |
| cTemplateTitle | String | 模板标题【Excel中无】 | 项目模板 |
| containers | JSONArray | 布局【Excel中无】 | _Array_ |


<a name="ef6d96ac"></a>
## 容器控件数组（containers）

<a name="75bc9d34"></a>
### 分组容器（Table | ListHeader | ConvenientQuery ...）

```json
{
    "groupId":5262030,
    "parentId":5261902,
    "cName":"序列号数据区",
    "iOrder":26,
    "bMain":false,
    "cCode":"st_storeout_sn",
    "cDataSourceName":"st.storeout.StoreOutDetailSN",
    "cControlType":"Table",
    "cGroupCode":"st_storeout_body_page_sn_data",
    "childrenField":"storeOutDetailSNs",
    "cAlign":"center",
    "iCols":0,
    "containers":Array[1],
    "controls":Array[1]
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| groupId | Integer | 模板分组ID | 5262030，标记分组，表单项通过此字段关联分组表 |
| parentId | Integer | 父模板分组ID | 5261902 |
| cName | String | 模板分组名称 | 序列号数据区，无实际意义 |
| iOrder | Integer | 排序 | 26 |
| bMain | Boolean | 是否主表 | false; 主view的意思 |
| cCode | String | 模板分组编码 | st_storeout_sn |
| cDataSourceName | String | 数据源名称 | st.storeout.StoreOutDetailSN |
| cControlType | String | 控件类型 | Table，容器控件，取值参考下文《[容器控件](#1a02b8d6)》 |
| cGroupCode | String | 分组编码【Excel中无】 | st_storeout_body_page_sn_data，父容器模板分组编码; 可理解为cParentGroupCode，和parentId成对，理解为容器名字，用于找容器 |
| childrenField | String |  | storeOutDetailSNs; 作为key对应子应用实体映射数据 |
| cAlign | String | 排列方式 | center |
| iCols | Integer | 显示列数 | 0；代表列数，最高取5 |
| containers | JSONArray | 布局数组【Excel中无】 | _Array_ |
| controls | JSONArray | 控件数组【Excel中无】 | _Array_ |


<a name="124cd316"></a>
### 操作容器（Toolbar）
操作容器通常是分组容器的子控件

```json
{
    "groupId":2898498,
    "parentId":521927,
    "cName":"Browstoolbar",
    "iOrder":0,
    "cDataSourceName":"Toolbar",
    "cControlType":"Toolbar",
    "cGroupCode":"Browstoolbar",
    "cAlign":"right",
    "iCols":0,
    "controls":Array[7],
    "key":"ContainerToolbarBrowstoolbar",
    "parentKey":"Container521927"
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| groupId | Integer | 模板分组ID | 2898498，标记分组，表单项通过此字段关联分组表 |
| parentId | Integer | 父模板分组ID | 521927 |
| cName | String | 模板分组名称 | Browstoolbar，无实际意义 |
| iOrder | Integer | 排序 | 0 |
| cDataSourceName | String | 数据源名称 | Toolbar |
| cControlType | String | 控件类型 | Toolbar，操作控件，取值参考下文《[操作控件](#65855958)》 |
| cGroupCode | String | 模板分组编码 | Browstoolbar，操作按钮项通过此字段关联分组表 |
| cAlign | String | 排列方式 | right |
| iCols | Integer | 显示列数 | 0 |
| controls | JSONArray | 控件【Excel中无】 | _Array_ |
| key | String |  | ContainerToolbarBrowstoolbar |
| parentKey | String | <br /> | Container521927 |



<a name="f0960563"></a>
## 表单控件数组（controls）

<a name="7d9201a2"></a>
### 操作控件（Button | PrimaryButton）

```json
{
    "icon":"bianji1",
    "cItemName":"btnEdit",
    "cCaption":"编辑",
    "cShowCaption":"编辑",
    "cControlType":"button",
    "iOrder":3,
    "iStyle":0,
    "enterDirection":0,
    "key":"67257082"
}
```

| **属性** | **类型** | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| icon | String | 图标 | bianji1 |
| cItemName | String | 名称 | btnEdit |
| cCaption | String | 标题 | 编辑 |
| cShowCaption | String | 显示标题 | 编辑 |
| cControlType | String | 控件类型 | Button |
| iOrder | Integer | 排序 | 3 |
| iStyle | Integer | 样式 | 0；0图标加文字，1纯文字，2纯图标 |
| enterDirection | Integer | 切入方向 | 0；光标走向，2向下，4向右 |
| key | String |  | 67257082 |

<a name="42794cff"></a>
### 表单控件（Input | Refer | Select ...）

```json
{
    "cItemName":"logisticNo",
    "cCaption":"物流单号",
    "cShowCaption":"物流单号",
    "iMaxLength":255,
    "iFieldType":1,
    "bMustSelect":false,
    "bHidden":false,
    "bSplit":false,
    "bExtend":false,
    "bCanModify":true,
    "iMaxShowLen":255,
    "iColWidth":200,
    "iAlign":1,
    "bNeedSum":false,
    "bShowIt":true,
    "bFilter":true,
    "bIsNull":true,
    "bPrintCaption":true,
    "bJointQuery":false,
    "bPrintUpCase":false,
    "bSelfDefine":false,
    "cControlType":"Input",
    "iOrder":571,
    "bMain":false,
    "id":3048676,
    "bVmExclude":0,
    "iBillTplGroupId":521939,
    "iBillId":1000051922,
    "iBillEntityId":70362,
    "iTplId":58111,
    "cSubId":"ST",
    "iSystem":1,
    "cName":"logisticNo",
    "cFieldName":"logisticNo",
    "authLevel":3,
    "cDataSourceName":"st.storeout.OutStoreLogistic",
    "enterDirection":4,
    "cEnumType":""
}
{
    "cItemName":"quantity",
    "cCaption":"数量",
    "cShowCaption":"数量",
    "iMaxLength":255,
    "iFieldType":1,
    "bMustSelect":true,
    "bHidden":false,
    "bSplit":false,
    "bExtend":false,
    "bCanModify":true,
    "iMaxShowLen":255,
    "iColWidth":100,
    "iAlign":1,
    "bNeedSum":false,
    "bShowIt":true,
    "bFilter":true,
    "cFormatData":"{"decimal":"<%option.quantitydecimal%>"}",
    "bIsNull":false,
    "bPrintCaption":true,
    "bJointQuery":false,
    "bPrintUpCase":false,
    "bSelfDefine":false,
    "cControlType":"InputNumber",
    "iOrder":394,
    "bMain":false,
    "id":3048501,
    "bVmExclude":0,
    "iBillTplGroupId":521937,
    "iBillId":1000051922,
    "iBillEntityId":70361,
    "iTplId":58111,
    "cSubId":"ST",
    "iSystem":1,
    "cName":"quantity",
    "cFieldName":"quantity",
    "authLevel":3,
    "cDataSourceName":"st.storeout.StoreOutDetail",
    "enterDirection":4,
    "cEnumType":""
}
{
    "cItemName":"producedate",
    "cCaption":"生产日期",
    "cShowCaption":"生产日期",
    "iMaxLength":255,
    "iFieldType":1,
    "bMustSelect":false,
    "bHidden":false,
    "bSplit":false,
    "bExtend":false,
    "bCanModify":false,
    "iMaxShowLen":255,
    "iColWidth":100,
    "iAlign":1,
    "bNeedSum":false,
    "bShowIt":true,
    "bFilter":true,
    "bIsNull":true,
    "bPrintCaption":true,
    "bJointQuery":false,
    "bPrintUpCase":false,
    "bSelfDefine":false,
    "cControlType":"DatePicker",
    "iOrder":498,
    "bMain":false,
    "id":3048603,
    "bVmExclude":0,
    "iBillTplGroupId":521937,
    "iBillId":1000051922,
    "iBillEntityId":70361,
    "iTplId":58111,
    "cSubId":"ST",
    "iSystem":1,
    "cName":"producedate",
    "cFieldName":"producedate",
    "authLevel":3,
    "cDataSourceName":"st.storeout.StoreOutDetail",
    "enterDirection":4,
    "cEnumType":""
}
{
    "cItemName":"deliverycorp_name",
    "cCaption":"物流公司",
    "cShowCaption":"物流公司",
    "iMaxLength":255,
    "iFieldType":1,
    "bMustSelect":true,
    "bHidden":false,
    "bSplit":false,
    "bExtend":false,
    "bCanModify":true,
    "iMaxShowLen":255,
    "iColWidth":150,
    "iAlign":1,
    "bNeedSum":false,
    "bShowIt":true,
    "bFilter":true,
    "bIsNull":true,
    "bPrintCaption":true,
    "bJointQuery":false,
    "bPrintUpCase":false,
    "bSelfDefine":false,
    "cControlType":"Refer",
    "cRefType":"aa_deliverycorp",
    "cRefRetId":"{"deliverycorp":"id"}",
    "iOrder":570,
    "bMain":false,
    "id":3048675,
    "bVmExclude":0,
    "iBillTplGroupId":521939,
    "iBillId":1000051922,
    "iBillEntityId":70362,
    "iTplId":58111,
    "cSubId":"ST",
    "iSystem":1,
    "cName":"deliverycorp_name",
    "cFieldName":"deliverycorp.name",
    "authLevel":3,
    "cDataSourceName":"st.storeout.OutStoreLogistic",
    "enterDirection":4,
    "cEnumType":""
}
{
    "cItemName":"enable",
    "cCaption":"状态",
    "cShowCaption":"状态",
    "iMaxLength":100,
    "iFieldType":1,
    "bEnum":true,
    "cEnumString":"{"0":"未启用","1":"启用","2":"停用"}",
    "bMustSelect":false,
    "bHidden":false,
    "bSplit":false,
    "bExtend":false,
    "bCanModify":true,
    "iMaxShowLen":255,
    "iColWidth":100,
    "iAlign":1,
    "bNeedSum":false,
    "bShowIt":true,
    "bFilter":true,
    "cDefaultValue":"0",
    "bIsNull":true,
    "bPrintCaption":true,
    "bJointQuery":false,
    "bPrintUpCase":false,
    "bSelfDefine":false,
    "cControlType":"select",
    "iOrder":7,
    "bMain":true,
    "id":71226254,
    "bVmExclude":0,
    "iBillTplGroupId":69416434,
    "iBillId":1001282423,
    "iBillEntityId":2163145,
    "iTplId":1337972,
    "cSubId":"AA",
    "iSystem":1,
    "cName":"enable",
    "cFieldName":"enable",
    "authLevel":3,
    "cDataSourceName":"bd.project.ProjectVO",
    "enterDirection":0,
    "cEnumType":"bd_enable_type",
    "enumArray":"[{"nameType":"text","value":"未启用","key":"0"},{"nameType":"text","value":"启用","key":"1"},{"nameType":"text","value":"停用","key":"2"}]"
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
| bVmExclude | Integer |  | "bVmExclude": 0：viewmodel和view中都有收集，1、viewmodel没有，view中有不收集， 2、viewmodel有，view没有不收集<br />（举例：regionCode） |
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
| cRefType | String | 参照类型 | aa_deliverycorp |
| cRefId | String | 参照ID | 无用 |
| cRefRetID | String | 参照返回信息 | {"parent":"id"}，参照表和当前表的字段对应关系，把id赋值给parent，可以配置多对 |
| refReturn | String | 参照返回值 | code，确定回显到参照控件上的值 |
| multiple | Boolean | 参照是否多选 | 标记参照是否多选 |

<a name="cd948961"></a>
## 控件类型
<a name="1a02b8d6"></a>
### 容器控件
containers子容器取值范围（即cControlType取值）

| **控件** | **含义** | **说明** |
| :---: | :---: | :---: |
| TableContainer | 表格容器 | 表格容器 |
| Table | 表体区域 | 包括containers和controls，containers中通常放置Toolbar |
| CardHeader | 卡片头部区域 | 容器 |
| ListHeader | 列表头部区域 | 容器，包括过滤方案 |
| MainTitle | 主标题区域 | 通常放置Title |
| Title | 标题 | 有特殊样式的Label |
| StatusBar | 状态栏 | 无子控件 |
| ProcessGroup | 进度组 | 无子控件 |
| Toolbar | 工具栏 | 操作按钮组，应存在于其它容器内，且子控件必需是按钮 |
| CardTabs | 卡片页签 | 卡片页签控件 |
| GroupContainer | 分组容器 | 支持展开和收起 |
| Group | 分组 | 渲染逻辑有分组标题 |
| LineTabs | 列表页签 | 列表页签控件 |
| TabPage | 页面页签 | 无渲染，其渲染逻辑和CardTabs相同 |
| Container | 容器 | DIV |
| Footer | 页脚 | 恒显示在下面 |
| FileUpload | 文件上传 | 文件上传控件，控件位置：src/yxyweb/common/components/file-upload |
| RptTableContainer | 报表表格容器 | 报表表格容器 |
| RptTable | 报表表格 | 报表表格 |
| TotalContainer | 汇总区域 | 汇总区域 |
| ConvenientQuery | 过滤区域 | 控件位置：src/yxyweb/common/components/filter |
| TableControl | 表格控件 | 表格控件 |
| Sign | 标记 | 标记状态图片 |
| TreeTableContainer | 树表容器 | 树表容器 |
| Tree | 树 | 树控件 |
| SearchTree | 搜索树 | 无子控件 |
| CheckboxContainer | 复选框容器 | 复选框容器 |
| FlatRowContainer | 水平行容器 | 水平行容器 |
| TitleTips | 标题Tips | 标题Tips |
| Div | 容器 | 无渲染，走通用渲染逻辑 |
| View | 容器 | 无渲染，走通用渲染逻辑 |
| Header | 容器 | 无渲染，走通用渲染逻辑 |
| CardCommonToolbar | 卡片公用工具栏 | 无渲染，猜测无用 |
| HighLight | 高亮线 | 无渲染，猜测无用 |
| HiddenContainer | 隐藏容器 | 无渲染，猜测无用 |
| Member |  |  |
| VoucherDetail |  |  |
| Card |  |  |
| CreditGathering |  |  |
| Modal |  |  |
| ReportSelect |  |  |

<a name="9d689446"></a>
### 表单控件
controls子控件取值范围（即cControlType取值）

| **控件** | **含义** | **说明** |
| :---: | :---: | :---: |
| Input | 文本 | 基础控件 |
| InputNumber | 数字 | 基础控件 |
| Price | 价格 | 基础控件 |
| Money | 金额 | 基础控件 |
| Select | 选择框 | 基础控件 |
| Radio | 单选 | 基础控件 |
| Cascader | 多级联动 | 基础控件 |
| DatePicker | 日期选择 | 基础控件 |
| TimePicker | 时间选择 | 基础控件 |
| TimeRangePicker | 区间选择 | 基础控件 |
| Refer | 参照 | 基础控件 |
| TreeRefer | 树参照 | 基础控件（部门参照） |
| ListRefer | 列表参照 | 基础控件（门店等级） |
| Tag | 标签参照 | 基础控件（支付宝设置） |
| Map | 地图 | 基础控件 |
| Attachment | 附件 | 基础控件 |
| Checkbox | 复选框 | 基础控件 |
| Column | 表格列 | 表格 |
| Icon | 图标 | 基础控件 |
| Title | 标题 | 基础控件 |
| Avatar | 头像 | 基础控件 |

<a name="65855958"></a>
### 操作控件
Toolbar子控件取值范围（即cControlType取值）

| **控件** | **含义** | **说明** |
| :---: | :---: | :---: |
| Button | 按钮 | 基础控件 |
| PrimaryButton | 定制按钮 | 基础控件 |
| PrintButton | 打印按钮 | 基础控件 |
| DropdownButton |  |  |
| Dropdown |  |  |
| SumSettingButton |  |  |
| MenuPublishButton |  |  |
| SummarySetting |  |  |
| DraftButton |  |  |

<a name="a7f9d5fb"></a>
## 总体结构示例
<a name="4edb8252"></a>
### 店存出库单列表 （**st_storeoutlist**）
**1、结构图**


![](http://design.yonyoucloud.com/static/yuque/0/2019/png/271336/1564628702655-55386d6f-8f87-4498-a2d5-3135efeef16c.png)
**2、渲染图**<br />**<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1552028496763-a23b2d06-aed7-4ef5-945a-edab23790c14.png#align=left&display=inline&height=572&name=image.png&originHeight=572&originWidth=1480&size=137743&status=done&width=1480)**<br />**
<a name="9711b2a7"></a>
### 店存出库单 （**st_storeout**）
**1、结构图**
![](http://design.yonyoucloud.com/static/yuque/0/2019/png/271336/1564628702836-66c8f161-233f-4e97-bf95-642ad1015598.png)**2、渲染图**<br />**![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1552027897822-f3217a3a-7ac6-4f2b-ac36-cc08fe7a4146.png#align=left&display=inline&height=428&name=image.png&originHeight=850&originWidth=1482&size=78859&status=done&width=746)<br />**

<a name="4a41324c"></a>
### **门店等级（****aa_storelevel****）**
**1、结构图**

![](http://design.yonyoucloud.com/static/yuque/0/2019/png/271336/1564628702871-8c8d2a34-46d0-4d6e-9d46-b074bc70647d.png)
**2、渲染图**<br />**<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1552099739051-502fe592-81cc-4edd-87f2-6f4b00d525fe.png#align=left&display=inline&height=296&name=image.png&originHeight=296&originWidth=689&size=20972&status=done&width=689)**
<a name="8dee006e"></a>
### **收款单（**rm_gatheringvouch**）**
**
<a name="59441350"></a>
### 收款单列表（rm_gatheringvouchlist）


<a name="31cb8c11"></a>
## 问题清单

- 1、cCode和cGroupCode关系和区别，为什么Table有cCode而Toolbar没有？

```json
{
    "groupId":5262030,
    "parentId":5261902,
    "cName":"序列号数据区",
    "iOrder":26,
    "bMain":false,
    "cCode":"st_storeout_sn",
    "cDataSourceName":"st.storeout.StoreOutDetailSN",
    "cControlType":"Table",
    "cGroupCode":"st_storeout_body_page_sn_data",
    "childrenField":"storeOutDetailSNs",
    "cAlign":"center",
    "iCols":0,
    "containers":[
        {
            "groupId":3087986,
            "parentId":5262030,
            "cName":"st_storeout_toolbar_sn_data_edit",
            "iOrder":0,
            "cDataSourceName":"Toolbar",
            "cControlType":"Toolbar",
            "cGroupCode":"st_storeout_toolbar_sn_data_edit",
            "childrenField":"storeOutDetailSNs",
            "cAlign":"right",
            "iCols":0,
            "cStyle":"{"fixedwidth":150}",
            "controls":Array[1],
            "key":"ContainerToolbarst_storeout_toolbar_sn_data_edit",
            "parentKey":"Container5262030"
      	}
    ],
    "controls":Array[1]
}
```

- 2、bHidden是否隐藏 和 bShowIt是否显示 的区别？
- 3、Button和PrimaryButton的区别？
- 4、key和parentKey含义？