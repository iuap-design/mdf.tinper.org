> 创建者：姚磊
> 创建时间：2019-05-12
> 修改者：勾成图
> 修改时间：2019-09-19


<a name="BoRWq"></a>
## 字段名称命名规则

<a name="7a8ZB"></a>
### 命名分类说明
| **命名分类** | **类型说明** | **示例** | **备注** |
| :---: | :---: | :---: | :---: |
| c开头 | varchar类型，普通字符串 | cBillNo | 单据编码 |
| i开头 | init类型(init/biginit/tinyinit)，0~65553 | iDefPrnTplId | 0，1，2 |
| b开头 | boolean类型，布尔值 | bMain | true/false，是否主表 |
| 其他 |  | templateType、tenant_id |  |


<a name="4bDbQ"></a>
### 命名规范
遵循小驼峰命名，极少部分采用“_”连接的命名方式。

<a name="WHWza"></a>
## 基础信息
<a name="FrmFo"></a>
### [bill_base] 单据表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 表单主表主键--自增 |
| 单据编码 | cBillNo | varchar(40) | 单据编号 |
| 单据名称 | cName | varchar(200) | 单据名称 |
| 关联单据类型编码 | cCardKey | varchar(100) | 跳转目标表单的单据编号(对于列表来说，此字段代表列表所对应的单据详情的cBillNo）<br />其值为要跳转目标表单的cBillNo |
| 子产品ID | cSubId | varchar(45) | 子产品ID |
| 单据默认显示模版 | iDefTplId | bigint(20) | 单据默认显示模版 |
| 单据默认打印模版 | iDefPrnTplId | bigint(20) | 单据默认打印模版 |
| 排序 | iOrder | int(11) | 排序号，从高往低排序 |
| 是否允许多模版 | bAllowMultiTpl | tinyint(1) | 是否允许多模版 |
| 单据识别条件 | cDefWhere | varchar(1000) | 单据识别条件 |
| 是否可以删除 | isDeleted | tinyint(1) | 逻辑删除标记 |
| 是否打印控制 | bPrintLimited | tinyint(1) | 是否打印控制 |
| 是否系统定义 | iSystem | tinyint(1) | bit型，0代表系统定义，其他再细分客户／行业等 |
| 数据权限 | cAuthId | varchar(45) | 权限号 |
| 类型 | cBillType | varchar(45) | 标识是单据，列表还是档案 |
| BeanID | cBeanId | varchar(100) | billservice,beanid—ufsystem的billregister的beanid |
| 过滤ID | cFilterId | varchar(100) | BillType为列表时列表的过滤ID  cFilterId |
| 是否行权限控制 | bRowAuthControl | bit(1) |  |
| 是否列权限控制 | bColumnAuthControl | bit(1) |  |
| bRowAuthObject | bRowAuthObject | bit(1) |  |
| bColumnAuthControlled | bColumnAuthControlled | bit(1) | 是否控制字段权限 |
| bRowAuthControlled | bRowAuthControlled | bit(1) | 是否控制记录权限 |
| cPersonDataSource | cPersonDataSource | varchar(100) |  |
| cCarry | cCarry | varchar(200) |  |
| authGroupKey | authGroupKey | varchar(100) |  |
| printBoPk | printBoPk | varchar(100) | 打印业务对象的主键 |
| 　 | pubts | timestamp | 时间戳-更新时也变化 |
| 　 | sysid | bigint(20) | 　 |
| 　 | tenant_id | bigint(20) | 　 |
| 　 | datasourcetype | varchar(100) | 　 |
| 　 | datasourcesql | varchar(2000) | 　 |
| 　 | batchoperate | bit(1) | 参照列表多选 |
| 　 | authType | varchar(40) | 　 |
| 　 | pkField | varchar(10) | 　 |
| 　 | parentField | varchar(10) | 　 |
| 　 | domain | varchar(20) | 　 |


<a name="fa5a76ff"></a>
### [billentity_base] 实体表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | int(11) | 主键 |
| 单据ID | iBillId | bigint(20) | 所属bill |
| 实体编码 | cCode | varchar(45) | group编码 |
| 实体名称 | cName | varchar(100) | Group名称 |
| 子产品ID | cSubId | varchar(45) | 子产品号 |
| 排序 | iOrder | int(11) | 排序号，从高到低排 |
| 是否可以删除 | isDeleted | tinyint(1) | 逻辑删除标记 |
| 数据源名称 | cDataSourceName | varchar(500) | 数据源名称，可能是一个表或者一个试图 |
| 主键名称 | cPrimaryKey | varchar(100) | cDsName主键名称 |
| 是否系统定义 | iSystem | tinyint(1) | bit型，0代表系统定义，其他再细分客户／行业等 |
| 是否主表 | bMain | tinyint(1) |  是否主表 |
| 子表外键 | cForeignKey | varchar(100) | 如果是子表，则该字段代表该子表中存的主表主键 |
| 主表数据源 | cParentCode | varchar(500) |  |
| 子表集合属性 | childrenField | varchar(50) |  |
| 类型 | cModelType | varchar(100) | 单据类型为FreeView时指定实体对应的ViewModel类型为GridModel |
| 是否为空 | bIsNull | tinyint(1) |  |
| 　 | printKey | varchar(50) |  |
| 　 | pubts | timestamp | 时间戳 |
| 　 | sysid | bigint(20) | 　 |
| 　 | tenant_id | bigint(20) | 　 |
| 　 | isprint | tinyint(1) | 是否打印相关 |
| 　 | queryJoin | varchar(800) | 　 |
| 　 | isTplExport | tinyint(1) | 　 |


<a name="8581d309"></a>
### [billtemplate_base] 模板表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 主键 |
| 单据ID | iBillId | bigint(20) | 所属bill |
| 模版名称 | cName | varchar(100) | 模版名称 |
| 排序 | iOrder | int(11) | 排序号，从高到低排 |
| 模版类型 | iTplMode | int(11) | 模版类型,0代表显示模版，1代表打印模版，2代表word模版 |
| 画布宽度 | iWidth | int(11) | 画布宽度 |
| 是否可以删除 | isDeleted | tinyint(1) | 逻辑删除标记 |
| 打印设置 | cPrintSetting | varchar(2000) | 打印设置 |
| 页眉 | cPageHeader | varchar(1000) | 页眉 |
| 页脚 | cPageFooter | varchar(1000) | 页脚 |
| 标题区宽度 | cTitleHeight | varchar(45) | 标题区高度 |
| 是否打印具体行 | iPrintTotal | int(11) | 是否打印具体行 00000000,第一位代表打印合计行，第二位代表打印小计行，第三位代表表体标题行 |
| 固定列数 | iFixedCols | int(11) | 固定列数 |
| 备注 | cMemo | varchar(1000) | 备注 |
| 模版标题 | cTitle | varchar(200) | 模版标题 |
| 网格风格 | iGridStyle | int(11) | 网格风格 |
| 行布局 | cRowLayout | varchar(2000) | 行布局 |
| 标题风格 | cTitleStyle | varchar(500) | 标题风格，比如字体，可以用xml或者json |
| cTotalColor | cTotalColor | varchar(45) | 表体合计行颜色 |
| cAmongColor | cAmongColor | varchar(45) | 隔行颜色 |
| cFixedColor | cFixedColor | varchar(45) | 固定行颜色 |
| 　 | pubts | timestamp | 时间戳 |
| 　 | sysid | bigint(20) | 　 |
| 　 | tenant_id | bigint(20) | 　 |
| 　 | templateType | varchar(20) | 模板类型，目前主要用于指定触屏模板类型；FilterList-过滤列表（主要用于触屏），BodyRefer-表体参照主要用于指定触屏，Modal-模态显示 |
|  |  |  |  |


<a name="LEEEM"></a>
## 模板层级
<a name="dbfd741e"></a>
### [billtplgroup_base] 模板分组表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** | 值枚举 |
| :---: | :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 主键 |  |
| 单据ID | iBillId | bigint(20) | 所属bill |  |
| 单据实体ID | iBillEntityId | bigint(20) | 所属billentity |  |
| 单据模板ID | iTplId | bigint(20) | 模版id |  |
| 模板分组编码 | cCode | varchar(45) | group编码 |  |
| 模板分组名称 | cName | varchar(100) | Group名称 |  |
| 子产品ID | cSubId | varchar(45) | 子产品号 |  |
| 排序 | iOrder | int(11) | 排序号，从高到低排 |  |
| 数据源名称 | cDataSourceName | varchar(100) | 数据源名称，可能是一个表或者一个试图 |  |
| 主键名称 | cPrimaryKey | varchar(100) | cDsName主键名称 |  |
| 是否可以删除 | isDeleted | tinyint(1) | 逻辑删除标记 |  |
| 是否系统定义 | iSystem | tinyint(1) | bit型，0代表系统定义，其他再细分客户／行业等 |  |
| 是否主表 | bMain | tinyint(1) |  是否主表 |  |
| 子表外键 | cForeignKey | varchar(100) | 如果是子表，则该字段代表该子表中存的主表主键 |  |
| 主表数据源 | cParentDataSource | varchar(45) | 主表数据源名称，如果是子表填此项，否则为null |  |
| 模板类型 | cType | varchar(45) | group标识类型，比如TabControl,Grid,Tree,Table等 |  |
| 上级模板分组ID | iParentId | bigint(20) | 父级billtplgroupid |  |
| 排列方式 | cAlign | varchar(45) | group的排列方式 | top、left、center |
| 显示列数 | iCols | int(11) |  |  |
| 排列方式 | cStyle | varchar(1000) |  |  |
| 图片 | cImage | varchar(100) | 图标 |  |
| 　 | pubts | timestamp | 时间戳 |  |
| 　 | sysid | bigint(20) | 　 |  |
| 　 | tenant_id | bigint(20) | 　 |  |


<a name="dab7dce0"></a>
### [bill_toolbar] 工具栏表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 单据编码 | billnumber | varchar(200) |  |
| 名字 | name | varchar(200) |  |
| 是否是主 | ismain | tinyint(1) |  |
| 父亲节点 | parent | varchar(200) |  |
| 布局 | align | varchar(100) |  |
| 子产品ID | subid | varchar(10) |  |
| 系统 | system | int(11) |  |
| 排序 | orderNum | int(11) |  |
| childrenField | childrenField | varchar(200) |  |
| tplmode | tplmode | int(11) |  |
| cStyle | cStyle | varchar(255) |  |
| 　 | pubts | timestamp | 　 |
| 　 | tenant_id | bigint(20) | 　 |
| 　 | templateType | varchar(20) | 模板类型，目前主要用于终端类型 |
| 　 | terminalType | varchar(20) | 终端类型 |


<a name="2085f4ed"></a>
### [billitem_base] 控件字段表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 主键 |
| 单据ID | iBillId | bigint(20) | 所属bill |
| 单据实体ID | iBillEntityId | bigint(20) | billentityid |
| 单据模板ID | iTplId | bigint(20) | 模版id |
| 模板分组ID | iBillTplGroupId | bigint(20) | 【重要属性】所属billtplgroup |
| 子产品ID | cSubId | varchar(45) | 子产品号 |
| 字段名称 | cFieldName | varchar(1000) | 【重要属性】带关联关系的字段名 |
| 字段别名 | cName | varchar(200) | 【重要属性】字段名 |
| 标题 | cCaption | varchar(200) | 名称 |
| 显示标题 | cShowCaption | varchar(200) | 【重要属性】运行时显示名称 |
| 排序 | iOrder | float(10,2) | 同容器内排序编号，填整型 |
| 最大长度 | iMaxLength | int(11) | 最大长度 |
| 字段类型 | iFieldType | int(11) | 字段类型 |
| 是否枚举 | bEnum | tinyint(1) | 是否枚举 |
| 枚举信息 | cEnumString | varchar(45) | 枚举信息 |
| 是否可以删除 | isDeleted | tinyint(1) | 逻辑删除标记 |
| 是否必选 | bMustSelect | tinyint(1) | 在数据收集时无论是否为DirtyData，都需要进行收集。注：前提是needCollect、needClear都不能为false |
| 是否隐藏 | bHidden | tinyint(1) | 是否隐藏 |
| 参照类型 | cRefType | varchar(45) | 参照类型 |
| 参照Id | cRefId | varchar(45) | 参照Id |
| 参照返回信息 | cRefRetId | varchar(6000) |  |
| 规则信息 | cDataRule | varchar(200) | 规则信息，可能是公式规则，或者规则系统中的规则，取规则编码 |
| 功能类型 | iFunctionType | int(11) | tinyint,一个字段标识可能的功能，<br />00000000<br />用八位二进制0，1代表8个功能<br />比如第一位代表业务通知，第二位代表UU消息，第三位代表智能输入，如果该字段三个功能都有则为00000111，为7。以此类推，是否关联查询也在此字段上标识 |
| 是否支持行拆分 | bSplit | tinyint(1) | 是否支持行拆分 |
| 是否扩展字段 | bExtend | tinyint(1) | 是否扩展字段 |
| 小数位数 | iNumPoint | int(11) | 小数点 |
| 是否可修改 | bCanModify | tinyint(1) | 是否可修改 |
| 数据来源类型 | cSourceType | varchar(45) | 数据来源类型 |
| 最大显示长度 | iMaxShowLen | int(11) | 最大显示长度 |
| 备注 | cMemo | varchar(45) | 备注 |
| 列宽 | iColWidth | int(11) | 列宽 |
| 汇总类型 | cSumType | varchar(45) | 汇总类型 |
| 对齐方式 | iAlign | tinyint(1) | 对齐方式 |
| 是否支持合计 | bNeedSum | tinyint(1) | 是否支持合计 |
| 是否显示 | bShowIt | tinyint(1) | 是否是显示字段 |
| 是否固定列 | bFixed | tinyint(1) | 是否是固定列 |
| 是否过滤字段 | bFilter | tinyint(1) | 是否过滤字段 |
| 默认值 | cDefaultValue | varchar(45) | 默认值 |
| 格式化串设置 | cFormatData | varchar(60) |  |
| 用户信息 | cUserId | varchar(45) | 用户信息 |
| Tab键的index | iTabIndex | int(11) | Tab键的index |
| 是否可以为空 | bIsNull | tinyint(1) | 是否可以为空 |
| 是否打印栏目标题 | bPrintCaption | tinyint(1) | 是否打印栏目标题 |
| 是否支持关联查询 | bJointQuery | tinyint(1) | 是否支持关联查询 |
| 是否打印金额大写 | bPrintUpCase | tinyint(1) | 是否打印金额大写 |
| 是否自定义项目 | bSelfDefine | tinyint(1) | 是否自定义项目 |
| 数据源名称 | cDataSourceName | varchar(500) | 数据源名称，可能是一个表或者一个视图，group上有就按照group上的值赋值，也可以自行赋值，为了考虑一个页签可能包含多个实体的情况 |
| 排序信息 | cOrder | varchar(45) | 排序信息，为null说明该字段不是排序字段 |
| 是否校验 | bCheck | tinyint(1) | 是否向后端发送校验请求 |
| 控制类型 | cControlType | varchar(45) | 控件类型 |
| 枚举类型 | cEnumType | varchar(45) | 枚举类型 |
| 参照返回值 | refReturn | varchar(50) |  |
| 权限设置是否显示 | bShowInRowAuth | bit(1) | 记录权限分配界面是否显示 |
| 权限ID | iRowAuthBillId | bigint(20) |  |
| 样式 | cStyle | varchar(1000) |  |
| 是否权限控制 | bRowAuthControlled | bit(1) |  |
| 自定义项类型 | cSelfDefineType | varchar(50) | 自定义项classId |
| bVmExclude | bVmExclude | tinyint(1) | 是否是从ViewModel中排列 |
| bRowAuthDim | bRowAuthDim | bit(1) |  |
| 　 | pubts | timestamp | 时间戳 |
| 　 | sysid | bigint(20) | 　 |
| 　 | tenant_id | bigint(20) | 　 |
| 　 | isprint | tinyint(1) | 　 |
| 　 | multiple | bit(1) | 标记参照是否多选 |
| 　 | isshoprelated | tinyint(1) | 是否门店相关 |
| 　 | depends | varchar(50) | 　 |
| 　 | iSystem | tinyint(1) | 　 |
| 　 | auth_level | smallint(6) | 　 |
| 　 | cDefineName | varchar(1000) | 　 |
| 　 | enterDirection | int(10) | 　 |
| 　 | isExport | tinyint(1) | 　 |
| 　 | makeField | varchar(200) | 　 |
| 属性不可修改 | bNotModify |  | 不可以修改优先级大于bCanModify |


<a name="93c11cd2"></a>
### [bill_toolbaritem] 工具栏控件表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 单据编码 | billnumber | varchar(100) | 所在的bill的编码 |
| 分组 | toolbar | varchar(100) | 【关键属性】所在的toolbar |
| 名称 | name | varchar(100) | 按钮的名称，编程代码使用 |
| 命令 | command | varchar(100) | 【关键属性】点击item时执行的bill_command中定义的名称 |
| 类型 | type | varchar(100) | 按钮的类型 |
| 类型 | style | int(11) |  |
| 标题 | text | varchar(200) | 按钮显示名称 |
| 参数 | parameter | varchar(200) | 执行command时携带的参数 |
| 图标 | imgsrc | varchar(400) | 图片按钮使用 |
| 上级菜单 | parent | varchar(100) | 下拉按钮时的二级按钮指定父按钮的name |
| 排序 | order | int(11) | 排序值 |
| 子产品ID | subid | varchar(10) | 子产品Id |
| 是否系统预制 | system | int(11) |  |
| 权限ID | authid | varchar(100) |  |
| 权限控制 | authcontrol | bit(1) | 权限相关字段 |
| 权限名称 | authname | varchar(200) | 权限相关字段 |
| bMerge | bMerge | bit(1) |  |
| icon | icon | varchar(20) | 图标按钮的icon |
| 　 | pubts | timestamp | 　 |
| 　 | sysid | bigint(20) | 　 |
| 　 | tenant_id | bigint(20) | 　 |
| 　 | auth_level | smallint(6) | 　 |


<a name="DD2nG"></a>
## 动作命令
<a name="a8d97131"></a>
### [bill_command] 单据命令表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 名称 | name | varchar(100) |  |
| 动作 | action | varchar(100) | Action名称 |
| 单据编码 | billnumber | varchar(200) | 当前单据编码 |
| 目标 | target | varchar(200) |  |
| 规则ID | ruleid | varchar(100) | 后台规则Id |
| URL | svcurl | varchar(1000) | 后台服务接口URL |
| http方法 | httpmethod | varchar(10) | http请求类型 |
| 子产品ID | subid | varchar(10) | 子产品Id |
| 是否系统预制 | system | int(11) |  |
| 参数 | parameter | varchar(200) | 命令参数 |
| authid | authid | varchar(50) | 权限相关字段 |
| 　 | pubts | timestamp | 　 |
| 　 | tenant_id | bigint(20) | 　 |


<a name="xELWU"></a>
## 查询模板及方案
<a name="WXGEQ"></a>
### [pb_meta_filters] 查询模板表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 过滤名称 | filterName | varchar(50) |  |
| 过滤描述 | filterDesc | varchar(500) |  |
| 子产品ID | subId | varchar(50) |  |
| 创建时间 | createTime | varchar(25) |  |
| 更新时间 | updateTime | varchar(26) |  |
| 是否升级 | isUpGrade | int(11) |  |
| 是否删除 | dr | int(11) |  |
|  | advanceSupport | int(11) |  |
| 扩展脚本地址 | behaviorObject | varchar(200) | 如：EC/EC_ec_express_filterVM.Extend.js |


<a name="iQnya"></a>
### [pb_meta_filter_item] 查询项表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 过滤ID | filtersId | int(11) |  |
| 字段名称 | itemName | varchar(1000) |  |
| 标题 | itemTitle | varchar(50) |  |
| 类型 | itemType | varchar(100) |  |
| 参照ID | referId | int(11) |  |
| 参照编码 | referCode | varchar(255) |  |
| 参照类型 | refType | int(11) |  |
| 参照返回值 | refReturn | varchar(64) |  |
| 比较符 | compareLogic | enum(0) |  |
| 小数位数 | iprecision | int(11) |  |
| 数据源 | dataSource | varchar(300) |  |
| 描述值 | descValue | int(11) |  |
| 是否常用条件 | isCommon | int(11) |  |
| 是否必输 | mustInput | int(11) |  |
| 是否区间条件 | rangeInput | int(11) |  |
| 是否多选 | multSelect | int(11) |  |
| 允许修改比较符 | allowUpdateCompare | int(11) |  |
| 是否或条件 | orLogic | int(11) |  |
| 缺省值1 | defaultVal1 | varchar(50) |  |
| 缺省值2 | defaultVal2 | varchar(50) |  |
| 分组 | groupName | varchar(50) |  |
| 是否系统预制 | isSys | int(11) |  |
| 创建时间 | createTime | varchar(25) |  |
| 是否删除 | updateTime | varchar(25) |  |
| 是否删除 | dr | int(11) |  |
| 枚举类型 | cEnumType | varchar(45) |  |
| 是否枚举 | bEnum | tinyint(4) |  |
|  | bAutoflt | tinyint(4) |  |
| 显示名称 | displayname | varchar(64) |  |
| 格式数据 | cFormatData | varchar(45) |  |
| 扩展字段 | extendField | varchar(100) |  |
| 权限级别 | auth_level | smallint(6) |  |
| 是否主组织 | isMasterOrg | bit(1) |  |
| 数据权限 | cDataRule | varchar(200) |  |
|  | attribute | varchar(60) |  |
| 多语资源ID | itemTitle_resid | varchar(200) | 多语 |


<a name="EWI23"></a>
### [pb_filter_solution] 查询方案表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 过滤ID | filtersId | int(11) |  |
| 方案名称 | solutionName | varchar(255) |  |
| 是否默认 | isDefault | int(11) |  |
| 是否公共 | isPublic | int(11) |  |
| 用户ID | userId | varchar(50) |  |
|  | orderId | int(11) |  |
| 终端类型 | terminalType | varchar(20) |  |
| 系统ID | sysid | bigint(20) |  |
| 多语资源ID | solutionName_resid | varchar(200) |  |
| 租户ID | tenant_id | varchar(50) |  |


<a name="CxHXy"></a>
### [pb_filter_solution_common] 查询方案项表
| **Excel中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) |  |
| 方案ID | solutionId | int(11) |  |
| 字段Id | itemName | varchar(255) |  |
| 字段名称 | itemId | bigint(20) |  |
| 标题 | itemTitle | varchar(50) |  |
| 参照类型 | refType | int(11) |  |
| 是否常用条件 | isCommon | int(11) |  |
| 是否区间条件 | rangeInput | int(11) |  |
| 是否多选 | multSelect | int(11) |  |
| 比较符 | compareLogic | enum(0) |  |
| 缺省值1 | defaultVal1 | varchar(5000) |  |
| 缺省值2 | defaultVal2 | varchar(5000) |  |
|  | orderId | float(10) |  |
|  | saveHistory | int(11) |  |
|  | checkRefer | int(11) |  |
|  | pb_filter_solution_commoncol | varchar(45) |  |
| 租户ID | tenant_id | varchar(50) |  |
|  | defineId | varchar(100) |  |
| 控件类型 | itemType | varchar(100) |  |
| 参照编码 | refercode | varchar(255) |  |
| 是否隐藏 | bhidden | bit(1) |  |
| 是否门店 | isshoprelated | tinyint(1) |  |
| 枚举类型 | cEnumType | varchar(40) |  |
| 是否枚举 | bEnum | tinyint(4) |  |
|  | bAutoflt | tinyint(4) |  |
| 数据权限 | cDataRule | varchar(200) |  |
| 多语资源ID | itemTitle_resid | varchar(200) |  |


<a name="boGVF"></a>
## 状态配置
<a name="CbSo6"></a>
### [bill_status] 状态表
| **中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 自增主键，不需要预置 |
| 状态编码 | code | varchar(100) | 状态编码，由业务单据自定义，如blank\new等 |
| 状态名称 | name | varchar(100) | 名称，显示名称 |
| 状态组编码 | billnumber | varchar(200) | 状态组编码，可自定义公共状态组 |
| 按钮是否显示 | cmdvisible | int(11) | 工具栏按钮默认可见性 |
| 按钮是否可用 | cmdenable | int(11) | 工具栏按钮默认可用性 |
| 字段是否显示 | itemvisible | int(11) | 栏目默认可见性 |
| 字段是否可用 | itemenable | int(11) | 栏目默认可用（编辑）性 |
| 子产品编码 | subId | varchar(10) | 产品ID |
| 是否系统 | system | int(11) | 元数据分层项目ID，默认值0表示系统预置 |
| 时间戳 | pubts | timestamp | 时间戳，不需要预置 |


<a name="LdceP"></a>
### [bill_status_config] 状态与单据关系表
| **中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 自动编号 |
| 单据编码 | billnumber | varchar(100) | 表单号，对应bill_base表的cBillNo字段 |
| 状态组编码 | basedon | varchar(200) | 状态表中billnumber，对应的billnumber应在bill_status表和bill_status_profile表中预置有状态配置数据。 |
| 子产品编码 | subid | varchar(10) | 子产品 |
| 是否系统 | system | int(11) | 元数据分层项目ID，默认值0表示系统预置 |
| 时间戳 | pubts | timestamp | 时间戳，不需要预置 |


<a name="O79Qq"></a>
### [bill_status_profile] 状态个性配置表
| **中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 自动编号 |
| 状态组编码 | billnumber | varchar(100) | 状态组编码，和bill_status.billnumber一致 |
| 状态 | status | varchar(100) | 状态码，外键关联bill_status.code |
| 对应项 | item | varchar(200) | 对象标识（实体字段名或按钮名称），外键关联billitem_base.cName（栏目）或<br />bill_toolbar_item.name（按钮） |
| 所属组 | group | varchar(100) | 组：按钮项的group=toolbaritem，栏目项的group=实体DataSrouceName |
| 是否显示 | visible | int(11) | 是否可见 |
| 是否可用 | enable | int(11) | 栏目是否可编辑、按钮是否可用 |
| 子产品编码 | subid | varchar(10) | 子产品 |
| 是否系统 | system | int(11) | 元数据分层项目ID，默认值0表示系统预置 |
| 时间戳 | pubts | timestamp | 时间戳，不需要预置 |


<a name="ei9q9"></a>
## 扩展
<a name="s4SRX"></a>
### [bill_customerdef] 扩展定义
| **中文描述** | **数据库字段** | **类型** | **描述** |
| :---: | :---: | :---: | :---: |
| 主键 | id | bigint(20) | 自动编号 |
| 单据编码 | cbillno | varchar(100) | 对应bill_base表的cBillNo字段 |
| 扩展脚本地址 | extscripturl | varchar(100) |  |
| 租户ID | tenant_id | bigint(20) |  |
| 时间戳 | pubts | timestamp | 时间戳，不需要预置 |