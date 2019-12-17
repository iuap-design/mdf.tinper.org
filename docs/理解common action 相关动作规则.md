| command name 命令说明 | action name动作说明 |  |  |  |
| --- | --- | --- | --- | --- |
| cmdAbandon | abandon | 取消 |  |  |
| cmdAdd | add | 新增 |  |  |
| cmdDelete | delete | 删除 |  |  |
| cmdEdit | edit | 单据编辑 |  |  |
| cmdSave | save | 单据保存 |  |  |
|  | deleteBatch | 删除规则，是物理删除。 |  |  |
| cmdList | list | 查询列表， |  |  |
| cmdRefresh | refresh | 刷新，执行查询动作 |  |  |
| cmdEnable | open | 启用 |  |  |
| cmdDisable | close | 停用 |  |  |
| cmdSaveAndAdd | saveandadd | 保存并新增 |  |  |
| cmdAddRowChild1 | addRow | 添加行数据 |  |  |
| cmdDeleteRowChild1 | deleteRow | 删除行数据 |  |  |
| cmdSubmit | submit  | 提交 |  |  |
| cmdUnsubmit | unsubmit | 撤回 |  |  |
| cmdWorkflow | workflow | 审批流 |  |  |
|  |  |  |  |  |
|  |  |  |  |  |


下面根据不同的单据类型对action进行说明。
<a name="GMjEu"></a>
## 列表页（voucherlist、treelist）

| 事件名称 | action名称 |
| --- | --- |
| 新增 | add |
| 删除 | batchdelete |
| 修改 | edit |
| 启动 | open |
| 停用 | close |
| 打印预览 | printpreview |
| 打印设计 | printdesign |
| 直接打印 | printnow |
| 审批 | workflow |
| 复制 | copy |
| 保存 | save |
| 取消 | abandon |
| 批量审批 | batchaudit |
| 批量弃审 | batchunaudit |
| 刷新 | refresh |
| 批量导出 | batchoutput |
| 批量导入 | batchimport |
| 上一个 | moveUp |
| 下一个 | movedown |
| 查询区搜索 | search |



<a name="tQm7b"></a>
## 行内编辑（editvoucherlist）
| 事件名称 | action名称 |
| --- | --- |
| 新增 | addrow |
| 删除 | batchdelete |
| 修改 | edit |
| 启动 | open |
| 停用 | close |
| 打印预览 | printpreview |
| 打印设计 | printdesign |
| 直接打印 | printnow |
| 审批 | workflow |
| 保存 | batchsubmit |
| 取消 | abandon |
| 刷新 | refresh |


<a name="yafVG"></a>
## 卡片页（voucher、treevoucher）
| 事件名称 | action名称 |
| --- | --- |
| 新增 | add |
| 删除 | delete |
| 修改 | edit |
| 启动 | open |
| 停用 | close |
| 打印预览 | printpreview |
| 打印设计 | printdesign |
| 直接打印 | printnow |
| 审批 | workflow |
| 保存并新增 | saveandadd |
| 保存 | save |
| 取消 | abandon |
| 刷新 | refresh |
| 跳转第一个卡片 | movefirst |
| 上一个卡片 | moveprev |
| 下一个卡片 | movenext |
| 跳转到最后一个 | movelast |
| 增行 | addRow |
| 删行 | deleteRow |


<a name="NTvgc"></a>
## 自由布局（freeview）

| 事件名称 | action名称 |
| --- | --- |
| 校验 | check |
| 表格单元格校验 | cellcheck |
| 获取表格列元素 | columnsetting |


<a name="5LiSX"></a>
## 选项卡 （option）
| 事件名称 | action名称 |
| --- | --- |
| 加载数据 | load |
| 保存 | save |
| 取消 | abandon |