> 创建者：姚磊
> 创建时间：2019-11-17

> 修改者：
> 修改时间：


<a name="t7BaX"></a>
### 基础属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :--- | :---: | :---: | :---: | :---: |
| cCode | Text | 必输 | 实体编码 |  |
| cParentCode | Text | null | 父实体编码 |  |
| cName | Text | 必输 | 实体名称 |  |
| cDataSourceName | Text | 必输 | 数据源名称 |  |
| bMain | Bool | true | 是否主表 |  |
| cPrimaryKey | Text | null | 主键 |  |
| cForeignKey | Text | null | 子表外键 |  |
| childrenField | Text | null | 子表集合属性 |  |
| cModelType | Select | null | 模型类型 |  |


<a name="zOtJ8"></a>
### 隐藏属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Text | 必输 | ID | 主键 |
| cSubId | Text | 必输 | 子产品ID | 默认取元数据中的Moddue |
| iOrder | Number | 0 | 排序 | 同一容器下的元素显示顺序，自动计算 |
| pubts | DateTime | 当前时间 | 时间戳 |  |
| isDeleted | Bool | false | 是否删除 |  |
| iBillId | Text | 必输 | 单据ID | 所属单据标识 |
| iSystem | Bool | true | 是否系统 | 设计字段为0，系统字段为1 |
| bIsNull | Bool | true | 允许为空 | 是否可为空 |
| sysid | Text | null | 系统ID | 租户模板用来关联系统模板的ID |
| tenant_id | Text | 0 | 租户ID |  |
| isprint | Bool | true | 允许打印 | 是否允许成为打印项，云打印此属性不生效 |
| queryJoin | JSON | null | 关联查询 | 如：[{"name":"manageClass","join":".deleted=0"},{"name":"shopProduct","join":"@orgKey='@orgId' && @customerKey=@customers"}] |
| printKey | Text | null | 打印Key |  |
| isTplExport | Bool | true | 允许导出 |  |
| label | Text | null | 标签 | 如：fixedUserdef |
| defaultValKey | Text | null | 默认值Key | 如：product_cCode |