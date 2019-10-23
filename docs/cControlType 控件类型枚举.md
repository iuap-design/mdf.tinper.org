> 创建者：姚磊

> 创建时间：2019-05-12
> 修改者：
> 修改时间：


<a name="J3baX"></a>
## 容器类组件

| 控件分类 | cControlType | **含义** | **说明** |
| :---: | :---: | :---: | :---: |
| 容器型组件 | TableContainer | 表格容器 | 表格容器 |
| 容器型组件 | Table | 表体区域 | 包括containers和controls，containers中通常放置Toolbar |
| 容器型组件 | CardHeader | 卡片头部区域 | 容器 |
| 容器型组件 | ListHeader | 列表头部区域 | 容器，包括过滤方案 |
| 容器型组件 | MainTitle | 主标题区域 | 通常放置Title |
| 容器型组件 | Title | 标题 | 有特殊样式的Label |
| 容器型组件 | StatusBar | 状态栏 | 无子控件 |
| 容器型组件 | ProcessGroup | 进度组 | 无子控件 |
| 容器型组件 | Toolbar | 工具栏 | 操作按钮组，应存在于其它容器内，且子控件必需是按钮 |
| 容器型组件 | CardTabs | 卡片页签 | 卡片页签控件 |
| 容器型组件 | GroupContainer | 分组容器 | 支持展开和收起 |
| 容器型组件 | Group | 分组 | 渲染逻辑有分组标题 |
| 容器型组件 | LineTabs | 列表页签 | 列表页签控件 |
| 容器型组件 | TabPage | 页面页签 | 无渲染，其渲染逻辑和CardTabs相同 |
| 容器型组件 | Container | 容器 | DIV |
| 容器型组件 | Footer | 页脚 | 恒显示在下面 |
| 容器型组件 | FileUpload | 文件上传 | 文件上传控件，控件位置：src/yxyweb/common/components/file-upload |
| 容器型组件 | RptTableContainer | 报表表格容器 | 报表表格容器 |
| 容器型组件 | RptTable | 报表表格 | 报表表格 |
| 容器型组件 | TotalContainer | 汇总区域 | 汇总区域 |
| 容器型组件 | ConvenientQuery | 过滤区域 | 控件位置：src/yxyweb/common/components/filter |
| 容器型组件 | TableControl | 表格控件 | 表格控件 |
| 容器型组件 | Sign | 标记 | 标记状态图片 |
| 容器型组件 | TreeTableContainer | 树表容器 | 树表容器 |
| 容器型组件 | Tree | 树 | 树控件 |
| 容器型组件 | SearchTree | 搜索树 | 无子控件 |
| 容器型组件 | CheckboxContainer | 复选框容器 | 复选框容器 |
| 容器型组件 | FlatRowContainer | 水平行容器 | 水平行容器 |
| 容器型组件 | TitleTips | 标题Tips | 标题Tips |
| 容器型组件 | Div | 容器 | 无渲染，走通用渲染逻辑 |
| 容器型组件 | View | 容器 | 无渲染，走通用渲染逻辑 |
| 容器型组件 | Header | 容器 | 无渲染，走通用渲染逻辑 |
| 容器型组件 | CardCommonToolbar | 卡片公用工具栏 | 无渲染，猜测无用 |
| 容器型组件 | HighLight | 高亮线 | 无渲染，猜测无用 |
| 容器型组件 | HiddenContainer | 隐藏容器 | 无渲染，猜测无用 |
| 容器型组件 | Member |  |  |
| 容器型组件 | VoucherDetail |  |  |
| 容器型组件 | Card |  |  |
| 容器型组件 | CreditGathering |  |  |
| 容器型组件 | Modal |  |  |
| 容器型组件 | ReportSelect |  |  |

<a name="9d689446"></a>
### 
<a name="LO3wf"></a>
## 表单类组件


| 控件分类 | cControlType | **含义** |
| :---: | :---: | :---: |
| 基础组件 | Input | 文本 |
| 基础组件 | InputNumber | 数字 |
| 基础组件 | Price | 价格 |
| 基础组件 | Money | 金额 |
| 基础组件 | Select | 选择框 |
| 基础组件 | Radio | 单选 |
| 基础组件 | Cascader | 多级联动 |
| 基础组件 | DatePicker | 日期选择 |
| 基础组件 | TimePicker | 时间选择 |
| 基础组件 | TimeRangePicker | 区间选择 |
| 基础控件 | Map | 地图 |
| 基础控件 | Attachment | 附件 |
| 基础控件 | Checkbox | 复选框 |
| 表格 | Column | 表格列 |
| 基础控件 | Icon | 图标 |
| 基础控件 | Title | 标题 |
| 基础控件 | Avatar | 头像 |

<a name="65855958"></a>
### 
<a name="af4Zo"></a>
## 参照类组件

| 控件分类 | cControlType | **含义** |
| :---: | :---: | :---: |
| 基础组件 | Refer | 参照 |
| 基础控件（部门参照） | TreeRefer | 树参照 |
| 基础控件（门店等级） | ListRefer | 列表参照 |
| 基础控件（支付宝设置） | Tag | 标签参照 |

<a name="JkQGk"></a>
## 
<a name="bwVJJ"></a>
## Toolbar 操作类组件

> Toolbar.jsx


| 控件分类 | cControlType | **说明** | 备注 |
| :---: | :---: | :---: | :---: |
| 基础组件-操作类 | Button | 普通操作按钮 |  |
| 基础组件-操作类 | PrimaryButton | 定制按钮 |  |
| 基础组件-操作类 | PrintButton | 打印按钮 | 对应渲染的是Print组件 |
| 基础组件-操作类 | DropdownButton | 下拉按钮 |  |
| 基础组件-操作类 | DropdownButtonGroup | 下拉分组按钮 |  |
| 基础组件-操作类 | Dropdown | 下拉组件 |  |
| 基础组件-操作类 | SumSettingButton | 合计设置 | SumAreaSetting |
| 基础组件-操作类 | MenuPublishButton |  | PublishMenu |
| 基础组件-操作类 | SummarySetting |  |  |
| 基础组件-操作类 | DraftButton |  | Draftbutton |
|  | PrintTemplate | 打印模板按钮 |  |
|  | DataTempButton |  | Templatebutton |
|  | Input |  | Input |
|  | Checkbox |  | CheckBox |
|  | Spliter |  |  |
|  | Icon |  |  |
|  | PageTitle | 页面标题 |  |
|  | PageIcon | 页面icon | PageIcon |
|  | PageCode |  |  |
|  | Tag |  | Tag |
|  | 其他通过注册方式进来的扩展操作类组件 |  |  |