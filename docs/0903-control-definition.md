# 设计器-控件定义

- **单据属性**
  - **iBillId**：单据ID，公共传输，不平铺到每个控件上
  - **cSubId**：子产品ID，公共传输，不平铺到每个控件上

<a name="d1d3b362"></a>
# 公共属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| bShowIt | Checkbox | true | 控件显隐 |  |
| cControlType | Input | 空 | 控件类型 |  |
| cShowCaption | Input | 空 | 控件标题 |  |
| iMaxLength | InputNumber | 255 | 最大长度 |  |
| bIsNull | Checkbox | false | 是否必填 |  |
| bCanModify | Checkbox | false | 是否只读 |  |
| iOrder | Label | 数值 | 排序 |  |


<a name="14ebe98f"></a>
# 布局分组
<a name="9f626eb3"></a>
## 表格布局 Table 

- 功能说明

控件用于页面表格布局。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cCode | Input | 空 | 模板分组编码 |  |
| cName | Input | 空 | 模板分组名称 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| cAlign | Select | center | 排列方式 |  |
| iCols | InputNumber | 0 | 显示列数 |  |
| cStyle | Input | 空 | 样式 |  |

- 其它属性（黑色不改变、绿色设计器生成、蓝色分部控件特定、红色不清楚含义）
  - **iBillId**：单据ID，新增时为空，修改时原封返回
  - **iBillEntityId**：单据实体ID，新增时为空，修改时原封返回
  - **iTplId**：单据模板ID，新增时为空，修改时原封返回
  - **cSubId**：子产品ID，新增时为空，修改时原封返回
  - **iOrder**：排序，根据子节点的顺序自动生成
  - **cDataSourceName**：数据源名称，原封返回
  - **cPrimaryKey**：主键名称，不清楚暂不处理
  - **iSystem**：是否系统定义，新增时默认为true，修改时原封返回
  - **bMain**：是否主表，新增时根据元数据推算，修改时原封返回
  - **cForeignKey**：子表外键，新增时为空，修改时原封返回
  - **cParentDataSource**：主表数据源，原封返回
  - ****cControlType**：控件类型，新增时根据元数据推算，修改时原封返回 == cType**
  - **iParentID**：上级模板分组ID，新增时为空，修改时原封返回
  - **cImage**：图片，不清楚暂不处理



<a name="e068ec98"></a>
## 卡片头部区域 CardHeader

- 功能说明

卡片的头部区域，一搬用于放置Toolbar和搜索区。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cCode | Input | 空 | 模板分组编码 |  |
| cName | Input | 空 | 模板分组名称 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| cAlign | Select | center | 排列方式 |  |
| iCols | InputNumber | 0 | 显示列数 |  |
| cStyle | Input | 空 | 样式 |  |

<a name="bc3178d8"></a>
## 列表头部区域 **ListHeader**

- 功能说明

列表的头部区域，一搬用于放置Toolbar和搜索区。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cCode | Input | 空 | 模板分组编码 |  |
| cName | Input | 空 | 模板分组名称 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| cAlign | Select | center | 排列方式 |  |
| iCols | InputNumber | 0 | 显示列数 |  |
| cStyle | Input | 空 | 样式 |  |


<a name="fd1dffc2"></a>
## 工具栏 Toolbar

- 功能说明

控件用于页面表格布局，Toolbar通常是其它容器的子节点，且Toolbar孩子节点只有Button

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cCode | Input | 空 | 模板分组编码 |  |
| cName | Input | 空 | 模板分组名称 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| cAlign | Select | center | 排列方式 | top || right || center |
| iCols | InputNumber | 0 | 显示列数 |  |
| cStyle | Input | 空 | 样式 |  |
|  |  |  |  |  |

<a name="b6551c91"></a>
## **搜索区域 ConvenientQuery**

- 功能说明

搜索区域，用于渲染查询方案，动态获取查询方案内容。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cCode | Input | 空 | 模板分组编码 |  |
| cName | Input | 空 | 模板分组名称 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| cAlign | Select | center | 排列方式 |  |
| iCols | InputNumber | 0 | 显示列数 |  |
| cStyle | Input | 空 | 样式 |  |

<a name="6fd61f9d"></a>
## 列表页签 **LineTabs**
**
<a name="bd1d8de5"></a>
## 分组 G**roup**
**
<a name="94dccaf6"></a>
## 分组容器 GroupContainer

<a name="a4577fd0"></a>
## 容器 D**iv**

<a name="795d5171"></a>
## 页脚区域 **Footer**

<a name="5b220ba8"></a>
# 表单分组
<a name="477378a6"></a>
## 文本 Input 

- 功能说明

控件用于文本录入。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cFieldName | Input | 空 | 字段名称 | 只读 |
| cName | Input | 空 | 字段别名 | 只读 |
| cCaption | Input | 空 | 标题 | 只读 |
| cShowCaption | Input | 空 | 显示标题 |  |
| iMaxLength | InputNumber | 255 | 最大长度 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| bMustSelect | Checkbox | false | 是否必选 | 必收集标记 |
| bHidden | Checkbox | false | 是否隐藏 |  |
| bSplit | Checkbox | false | 是否支持行拆分 |  |
| bCanModify | Checkbox | true | 是否可修改 | 等同于readonly，disable通过JS扩展控制 |
| iMaxShowLen | InputNumber | 255 | 最大显示长度 |  |
| iColWidth | InputNumber | 1 | 列宽 | 表格需要设置宽度，卡片中的字段默认为1 |
| iAlign | Select | center | 对齐方式 |  |
| bShowIt | Checkbox | true | 是否显示 |  |
| bFilter | Checkbox | true | 是否过滤字段 | 是否可以作为过滤字段，目前没用 |
| bIsNull | Checkbox | false | 是否可以为空 |  |
| bJointQuery | Checkbox | false | 是否支持关联查询 | 跳转关联页面，有2个关联表，配置页面字段跳转的单据 |
| cStyle | Input | 空 | 样式 | 多行文本值为：{"type":"textarea"} |
| bVmExclude | Checkbox | false |  | 扩展定义，前后台约定数据和解析方式；0-标准，1-View和ViewModel都没实现，2-View没实现但ViewModel实现了 |
| cSumType | Select | 空 | 汇总类型 | avg，count，group，max，sum，自定义 |
| bFixed | Checkbox | false | 是否固定列 |  |
| bCheck | Checkbox | false | 是否校验 | 是否后台校验 |

- 其它属性（黑色不改变、绿色设计器生成、蓝色分部控件特定、红色不清楚含义）
  - **iBillId**：单据ID，新增时为空，修改时原封返回
  - **iBillEntityId**：单据实体ID，新增时为空，修改时原封返回
  - **iTplId**：单据模板ID，新增时为空，修改时原封返回
  - **iBillTplGroupId**：模板分组ID，新增时为空，修改时原封返回
  - **cSubId**：子产品ID，新增时为空，修改时原封返回
  - **iOrder**：排序，根据子节点的顺序自动生成
  - **iFieldType**：字段类型，不清楚暂不处理
  - **bEnum**：是否枚举，枚举控件特定，新增时根据元数据推算
  - **cEnumString**：枚举信息，枚举控件特定，枚举类型的属性
  - **cEnumType**：枚举类型，枚举控件特定
  - **cDefaultValue**：默认值，枚举控件特定
  - **cRefType**：参照类型，参照控件特定
  - **cRefId**：参照Id，参照控件特定
  - **cRefRetID**：参照返回信息，参照控件特定
  - **refReturn**：参照返回值，参照控件特定
  - **cDataRule**：规则信息，不清楚暂不处理（通过规则配置界面可以实现配置），暂时没用
  - **iFunctionType**：功能类型，不清楚暂不处理，暂时没用
  - **bExtend**：是否扩展字段，新增时根据元数据推算，修改时原封返回
  - **cSourceType**：数据来源类型，不清楚暂不处理，暂时没用
  - **cMemo**：备注，不清楚暂不处理，暂时没用
  - **iNumPoint**：小数位数，数值控件（数值、金额、价格）特定
  - **bNeedSum**：是否支持合计，数值控件（数值、金额、价格）特定
  - **cFormatData**：格式化串设置，日期控件特定
  - **cUserId**：用户信息，暂时没用
  - **iTabIndex**：Tab键的index，根据相应规则自动生成
  - **bSelfDefine**：是否自定义项目，新增时根据元数据推算，修改时原封返回
  - **cDataSourceName**：数据源名称，原封返回
  - **cControlType**：控件类型，新增时根据元数据推算，修改时原封返回
  - **cSelfDefineType**：自定义项类型，新增时根据元数据推算，修改时原封返回
  - **bPrintCaption**：是否打印栏目标题，暂时没用
  - **bPrintUpCase**：是否打印金额大写，暂时没用
  - **bShowInRowAuth**：权限设置是否显示，暂时没用
  - **iRowAuthBillId**：权限ID，暂时没用
  - **bRowAuthControlled**：是否权限控制，暂时没用
  - **bRowAuthDim**：暂时没用

<br />
<a name="0743435e"></a>
## 数值 InputNumber | Price | Money 

- 功能说明

控件用于数值录入。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cFieldName | Input | 空 | 字段名称 | 只读 |
| cName | Input | 空 | 字段别名 | 只读 |
| cCaption | Input | 空 | 标题 | 只读 |
| cShowCaption | Input | 空 | 显示标题 |  |
| iMaxLength | InputNumber | 255 | 最大长度 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| bMustSelect | Checkbox | false | 是否必选 | 必收集标记 |
| bHidden | Checkbox | false | 是否隐藏 |  |
| bSplit | Checkbox | false | 是否支持行拆分 |  |
| bCanModify | Checkbox | true | 是否可修改 | 等同于readonly，disable通过JS扩展控制 |
| iMaxShowLen | InputNumber | 255 | 最大显示长度 |  |
| iColWidth | InputNumber | 1 | 列宽 | 表格需要设置宽度，卡片中的字段默认为1 |
| iAlign | Select | center | 对齐方式 |  |
| bShowIt | Checkbox | true | 是否显示 |  |
| bFilter | Checkbox | true | 是否过滤字段 | 是否可以作为过滤字段，目前没用 |
| bIsNull | Checkbox | false | 是否可以为空 |  |
| bJointQuery | Checkbox | false | 是否支持关联查询 | 跳转关联页面，有2个关联表，配置页面字段跳转的单据 |
| cStyle | Input | 空 | 样式 |  |
| bVmExclude | Checkbox | false |  | 扩展定义，前后台约定数据和解析方式；0-标准，1-View和ViewModel都没实现，2-View没实现但ViewModel实现了 |
| cSumType | Select | 空 | 汇总类型 | avg，count，group，max，sum，自定义 |
| bFixed | Checkbox | false | 是否固定列 |  |
| bCheck | Checkbox | false | 是否校验 | 是否后台校验 |
| iNumPoint | InputNumber | 0 | 小数位数 |  |
| bNeedSum | Checkbox | true | 是否支持合计 |  |


<a name="db432c63"></a>
## 日期 DatePicker | TimePicker | TimeRangePicker

- 功能说明

控件用于日期选择。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cFieldName | Input | 空 | 字段名称 | 只读 |
| cName | Input | 空 | 字段别名 | 只读 |
| cCaption | Input | 空 | 标题 | 只读 |
| cShowCaption | Input | 空 | 显示标题 |  |
| iMaxLength | InputNumber | 255 | 最大长度 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| bMustSelect | Checkbox | false | 是否必选 | 必收集标记 |
| bHidden | Checkbox | false | 是否隐藏 |  |
| bSplit | Checkbox | false | 是否支持行拆分 |  |
| bCanModify | Checkbox | true | 是否可修改 | 等同于readonly，disable通过JS扩展控制 |
| iMaxShowLen | InputNumber | 255 | 最大显示长度 |  |
| iColWidth | InputNumber | 1 | 列宽 | 表格需要设置宽度，卡片中的字段默认为1 |
| iAlign | Select | center | 对齐方式 |  |
| bShowIt | Checkbox | true | 是否显示 |  |
| bFilter | Checkbox | true | 是否过滤字段 | 是否可以作为过滤字段，目前没用 |
| bIsNull | Checkbox | false | 是否可以为空 |  |
| bJointQuery | Checkbox | false | 是否支持关联查询 | 跳转关联页面，有2个关联表，配置页面字段跳转的单据 |
| cStyle | Input | 空 | 样式 |  |
| bVmExclude | Checkbox | false |  | 扩展定义，前后台约定数据和解析方式；0-标准，1-View和ViewModel都没实现，2-View没实现但ViewModel实现了 |
| cSumType | Select | 空 | 汇总类型 | avg，count，group，max，sum，自定义 |
| bFixed | Checkbox | false | 是否固定列 |  |
| bCheck | Checkbox | false | 是否校验 | 是否后台校验 |
| cFormatData | Select | 空 | 格式化串设置 |  |


<a name="0276aa6c"></a>
## 选择框 Select | Radio

- 功能说明

控件用于枚举选择。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cFieldName | Input | 空 | 字段名称 | 只读 |
| cName | Input | 空 | 字段别名 | 只读 |
| cCaption | Input | 空 | 标题 | 只读 |
| cShowCaption | Input | 空 | 显示标题 |  |
| iMaxLength | InputNumber | 255 | 最大长度 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| bMustSelect | Checkbox | false | 是否必选 | 必收集标记 |
| bHidden | Checkbox | false | 是否隐藏 |  |
| bSplit | Checkbox | false | 是否支持行拆分 |  |
| bCanModify | Checkbox | true | 是否可修改 | 等同于readonly，disable通过JS扩展控制 |
| iMaxShowLen | InputNumber | 255 | 最大显示长度 |  |
| iColWidth | InputNumber | 1 | 列宽 | 表格需要设置宽度，卡片中的字段默认为1 |
| iAlign | Select | center | 对齐方式 |  |
| bShowIt | Checkbox | true | 是否显示 |  |
| bFilter | Checkbox | true | 是否过滤字段 | 是否可以作为过滤字段，目前没用 |
| bIsNull | Checkbox | false | 是否可以为空 |  |
| bJointQuery | Checkbox | false | 是否支持关联查询 | 跳转关联页面，有2个关联表，配置页面字段跳转的单据 |
| cStyle | Input | 空 | 样式 |  |
| bVmExclude | Checkbox | false |  | 扩展定义，前后台约定数据和解析方式；0-标准，1-View和ViewModel都没实现，2-View没实现但ViewModel实现了 |
| cSumType | Select | 空 | 汇总类型 | avg，count，group，max，sum，自定义 |
| bFixed | Checkbox | false | 是否固定列 |  |
| bCheck | Checkbox | false | 是否校验 | 是否后台校验 |
| bEnum | Checkbox | 0 | 是否枚举 |  |
| cEnumString | Input | 空 | 枚举信息 |  |
| cEnumType | Select | true | 枚举类型 |  |
| cDefaultValue | Input |  | 默认值 |  |



<a name="bb97945d"></a>
## 参照 Refer | TreeRefer | ListRefer | Tag

- 功能说明

控件用于参照选择。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Label | 随机数 | 主键 | 只读，新增时为空 |
| cFieldName | Input | 空 | 字段名称 | 只读 |
| cName | Input | 空 | 字段别名 | 只读 |
| cCaption | Input | 空 | 标题 | 只读 |
| cShowCaption | Input | 空 | 显示标题 |  |
| iMaxLength | InputNumber | 255 | 最大长度 |  |
| isDeleted | Checkbox | false | 是否可以删除 |  |
| bMustSelect | Checkbox | false | 是否必选 | 必收集标记 |
| bHidden | Checkbox | false | 是否隐藏 |  |
| bSplit | Checkbox | false | 是否支持行拆分 |  |
| bCanModify | Checkbox | true | 是否可修改 | 等同于readonly，disable通过JS扩展控制 |
| iMaxShowLen | InputNumber | 255 | 最大显示长度 |  |
| iColWidth | InputNumber | 1 | 列宽 | 表格需要设置宽度，卡片中的字段默认为1 |
| iAlign | Select | center | 对齐方式 |  |
| bShowIt | Checkbox | true | 是否显示 |  |
| bFilter | Checkbox | true | 是否过滤字段 | 是否可以作为过滤字段，目前没用 |
| bIsNull | Checkbox | false | 是否可以为空 |  |
| bJointQuery | Checkbox | false | 是否支持关联查询 | 跳转关联页面，有2个关联表，配置页面字段跳转的单据 |
| cStyle | Input | 空 | 样式 |  |
| bVmExclude | Checkbox | false |  | 扩展定义，前后台约定数据和解析方式；0-标准，1-View和ViewModel都没实现，2-View没实现但ViewModel实现了 |
| cSumType | Select | 空 | 汇总类型 | avg，count，group，max，sum，自定义 |
| bFixed | Checkbox | false | 是否固定列 |  |
| bCheck | Checkbox | false | 是否校验 | 是否后台校验 |
| cRefType | Select | 0 | 参照类型 |  |
| cRefId | Select | 空 | 参照Id |  |
| cRefRetID | Input | true | 参照返回信息 |  |
| refReturn | Input | 空 | 参照返回值 |  |

<a name="961e07a1"></a>
## 多级联动 Cascader 

<a name="cdd03e09"></a>
## 图片 Picture

cStyle属性为：{"className":"product_name","rangeValue":"app_Img_folder,app_Img_imgName"}

<a name="8b0b484e"></a>
## 开关 Switch

<a name="0570c5c6"></a>
## 附件 Attachment

<a name="18dcf32b"></a>
## 地图 Map

<a name="7d2725a9"></a>
## ~~图标 Icon~~

<a name="5c6b9782"></a>
## 标题 Title

<a name="cde554ac"></a>
## 头像 Avatar

<a name="cbe4fe98"></a>
# 操作分组

<a name="b4bf67e6"></a>
## 按钮 Button | PrimaryButton | PrintButton

- 功能说明

按钮控件。

- 属性列表
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| icon | Input | 空 | 图标 | 前期先用Input录入 |
| cItemName | Input | 空 | 别名 | 只读 |
| cCaption | Input | 空 | 标题 | 只读 |
| cShowCaption | Input | 空 | 显示标题 |  |
| iStyle | Select |  | 按钮类型 | 0-图标加文字，1-文字，2-图标 |
| cStyle | Input | 空 | 样式 |  |
| enterDirection | Select | 空 | 切入方向 |  |

- 其它属性（黑色不改变、绿色设计器生成、蓝色分部控件特定、红色不清楚含义）
  - ****cControlType****：控件类型，新增时根据元数据推算，修改时原封返回 == type
  - **iOrder**：排序，根据子节点的顺序自动生成

<a name="1e8f5767"></a>
# 默认动作&规则
