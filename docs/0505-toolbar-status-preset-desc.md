# 工具栏、状态预置说明

<a name="VPuGw"></a>
## 1. 表单命令和工具栏
**表单命令**：服务接口数据<br />**表单工具栏**：工具栏UI元数据，工具栏按钮依赖某个表单命令

<a name="SYmTf"></a>
### 1.1. 表单命令预置
【bill_command表】

| Field | Type | Null | 说明 |
| --- | --- | --- | --- |
| id | bigint(20) | NO | 自增主键，不需要预置 |
| name | varchar(100) | NO | 标识名称，同一表单内唯一 |
| action | varchar(100) | NO | action名称 |
| billnumber | varchar(200) | NO | 表单号，对应bill_base表cBillNo字段 |
| ~~target~~ | ~~varchar(200)~~ | ~~YES~~ | ~~不需要~~ |
| ~~ruleid~~ | ~~varchar(100)~~ | ~~YES~~ | ~~不需要~~ |
| svcurl | varchar(1000) | YES | 服务URL，需要前端确定格式 |
| httpmethod | varchar(10) | YES | HttpMethod |
| subid | varchar(10) | YES | 子产品号 |
| system | int(11) | YES | 元数据分层项目ID，默认值0表示系统预置 |
| pubts | timestamp | NO | 时间戳，不需要预置 |

 
<a name="9wacj"></a>
### 1.2. 工具栏预置
【bill_toolbar表】

| Field | Type | Null | 说明 |
| --- | --- | --- | --- |
| id | bigint(20) | NO | 自增主键，不需要预置 |
| name | varchar(100) | NO | 标识名称，同一表单内唯一 |
| action | varchar(100) | NO | action名称 |
| name | varchar(200) | NO | 工具栏名称，用于区分同一表单内的不同工具栏，建议使用工具栏作用对象的名称，如实体名等 |
| ismain | tinyint(1) | YES | 是否是主工具栏，主工具栏通常指整个视图的工具栏，如表单或列表的工具栏，非主工具栏指子视图的工具栏，如表格工具栏，可选值0=否、1=是 |
| parent | varchar(200) | YES | 父容器ID，表格工具栏需要设置为模板分组ID（来源：billtplgroup_base.id） |
| childrenfield | varchar(200) | YES | 对应的数据源字段名，表格工具栏需要设置为实体的数据源属性名（来源：billentity_base.childrenField） |
| align | varchar(100) | NO | 工具栏对齐位置，可选值：<br />left\right\top\bottom\center |
| subid | varchar(10) | YES | 子产品号 |
| system | int(11) | YES | 元数据分层项目ID，默认值0表示系统预置 |
| pubts | timestamp | NO | 时间戳，不需要预置 |

<a name="Ivs3J"></a>
### 1.3. 工具栏按钮预置
【bill_toolbaritems表】

| Field | Type | Null | Key |
| --- | --- | --- | --- |
| id | bigint(20) | NO | 自增主键，不需预置 |
| billnumber | varchar(100) | NO | 表单号，对应bill_base表的cBillNo字段 |
| toolbar | varchar(100) | YES | 工具栏名称，对应bill_toolbar.name |
| name | varchar(100) | YES | 按钮标识名称 |
| command | varchar(100) | YES | 关联的命令，即Action，对应bill_command表的name字段 |
| type | varchar(100) | YES | 类型：button\menu\menuitem等，<br />具体支持的类型请前端确认 |
| style | int(11) | YES | 样式，显示为图标、文本、图标+文本等，<br />可暂不预置，需要前端确认 |
| text | varchar(200) | YES | 显示文本 |
| imgsrc | varchar(400) | YES | 图标资源路径或名称，需要前端确认 |
| parent | varchar(100) | YES | 父级按钮，如菜单项需要设置为父按钮的name |
| order | int(11) | YES | 顺序，显示顺序 |
| subid | varchar(10) | YES | 子产品 |
| system | int(11) | YES | 元数据分层项目ID，默认值0表示系统预置 |
| pubts | timestamp | NO | 时间戳，不需要预置 |

<a name="DhDiW"></a>
## 
<a name="ifiCr"></a>
## 2. 状态
状态包含栏目状态和工具栏按钮状态
<a name="ezgv6"></a>
### 2.1. 表单状态预置
【bill_status表】，预置表单包含哪些状态类型

| Field | Type | Null | Key |
| --- | --- | --- | --- |
| id | bigint(20) | NO | 自增主键，不需要预置 |
| code | varchar(100) | NO | 状态编码，由业务单据自定义，如blank\new等 |
| name | varchar(100) | NO | 名称，显示名称 |
| billnumber | varchar(200) | NO | 表单号，对应bill_base表的cBillNo字段 |
| cmdvisible | int(11) | YES | 工具栏按钮默认可见性 |
| cmdenable | int(11) | YES | 工具栏按钮默认可用性 |
| itemvisible | int(11) | YES | 栏目默认可见性 |
| itemenable | int(11) | YES | 栏目默认可用（编辑）性 |
| subId | varchar(10) | YES | 产品ID |
| system | int(11) | YES | 元数据分层项目ID，默认值0表示系统预置 |
| pubts | timestamp | NO | 时间戳，不需要预置 |

<a name="wMOZP"></a>
### 2.2. 栏目和按钮状态预置
【bill_status_profile表】，预置表单栏目和按钮在某一状态下的UI状态属性

| Field | Type | Null | Key |
| --- | --- | --- | --- |
| id | bigint(20) | NO | 自动编号 |
| billnumber | varchar(100) | NO | 表单号，对应bill_base表的cBillNo字段 |
| status | varchar(100) | NO | 状态码，外键关联bill_status.code |
| item | varchar(200) | NO | 对象标识（实体字段名或按钮名称），外键关联billitem_base.cName（栏目）或<br />bill_toolbar_item.name（按钮） |
| group | varchar(100) | NO | 组：按钮项的group=toolbaritem，栏目项的group=实体DataSrouceName |
| visible | int(11) | YES | 是否可见 |
| enable | int(11) | YES | 栏目是否可编辑、按钮是否可用 |
| subid | varchar(10) | NO | 子产品 |
| system | int(11) | YES | 元数据分层项目ID，默认值0表示系统预置 |
| pubts | timestamp | NO | 时间戳，不需要预置 |

<a name="hLODA"></a>
### 2.3. 状态基础模板预置
【bill_status_config表】，预置表单状态配置以哪个状态模板为基础，如，可以预置通用表单的状态配置，作用具体业务表单的模板。该表为可选预置

| Field | Type | Null | Key |
| --- | --- | --- | --- |
| id | bigint(20) | NO | 自动编号 |
| billnumber | varchar(100) | NO | 表单号，对应bill_base表的cBillNo字段 |
| basedon | varchar(200) | YES | 模板billNumber，对应的billNumber应在bill_status表和bill_status_profile表中预置有状态配置数据。 |
| subid | varchar(10) | NO | 子产品 |
| system | int(11) | YES | 元数据分层项目ID，默认值0表示系统预置 |
| pubts | timestamp | NO | 时间戳，不需要预置 |

<a name="hFGga"></a>
### 2.4. 状态模板、默认值、配置的合并处理
根据状态配置，表单运行时的状态集合由以下几部分根据优先级顺序合并：

- 表单的特定配置
- 表单的默认配置
- 模板的特定配置
- 模板的默认配置

 <br />**状态类型合并**<br />例如表单A基于模板B设置状态，其中bill_status表中：

- 模板B定义有状态：新增、编辑、修改
- 表单A定义有状态：新增、审核

则运行时合并后，表单A具有以下状态：新增、编辑、修改、审核，其中新增状态使用表单A定义的属性覆盖模板B定义的新增状态属性。<br /> <br />**按钮、栏目状态配置优先级**<br />例如表单A基于模板B设置状态，某一按钮或栏目Item，其状态值确定优先级为：

1. 优先取bill_status_profile表billNumber=A的Item记录
1. 步骤1无记录时，取bill_status_profile表billNumber=B的Item记录
1. 步骤2无记录时，取bill_status表billNumber=A的相应默认值
1. 步骤3无记录时，取bill_status表billNumber=B的相应默认值

 
