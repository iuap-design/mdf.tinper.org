> 创建者：姚磊

> 创建时间：2019-11-17
> 修改者：
> 修改时间：


<a name="t7BaX"></a>
### 基础属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :--- | :---: | :---: | :---: | :---: |
| cName | Text | 必输 | 单据名称 |  |
| cBillNo | Text | 必输 | 单据编码 |  |
| cCardKey | Text | null | 单据详情编码 |  |
| iDefTplId | Select | 必输 | 默认模板 | 当前单据定义的模板列表 |
| iDefPrnTplId | Text | null | 默认打印模板 |  |
| bAllowMultiTpl | Bool | true | 允许多模板 |  |
| cBillType | Select | 必输 | 单据类别 | [参考《单据类型枚举》](https://www.yuque.com/docs/share/ad64cdb4-58ca-4a00-a0e6-337d56963dbc#) |
| cFilterId | Select | null | 默认过滤器 | 当前单据定义的过滤器列表 |


<a name="zOtJ8"></a>
### 隐藏属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Text | 必输 | ID | 主键 |
| cSubId | Text | 必输 | 子产品ID | 默认取元数据中的Moddue |
| iOrder | Number | 0 | 排序 | 同一容器下的元素显示顺序，自动计算 |
| cDefWhere | Text | null | 单据识别条件 |  |
| pubts | DateTime | 当前时间 | 时间戳 |  |
| isDeleted | Bool | false | 是否删除 |  |
| bPrintLimited | Bool | false | 是否打印控制 |  |
| iSystem | Bool | true | 是否系统 | 设计字段为0，系统字段为1 |
| cAuthId | Text  | null | 权限ID |  |
| cBeanId | Text | null | BeanID |  |
| ~~bRowAuthControl~~ | ~~Bool~~ | ~~null~~ |  |  |
| ~~bColumnAuthControl~~ | ~~Bool~~ | ~~null~~ |  |  |
| ~~bRowAuthObject~~ | ~~Bool~~ | ~~null~~ |  |  |
| ~~bColumnAuthControlled~~ | ~~Bool~~ | ~~null~~ |  | ~~是否控制字段权限~~ |
| ~~bRowAuthControlled~~ | ~~Bool~~ | ~~false~~ | ~~是否权限控制~~ | ~~是否控制记录权限，废弃~~ |
| cPersonDataSource | Text | null |  |  |
| cCarry | Text | null |  |  |
| authGroupKey | Text | null | 权限组Key |  |
| printBoPk | Text | null | 打开业务对象 | 打印业务对象的主键 |
| sysid | Text | null | 系统ID | 租户模板用来关联系统模板的ID |
| tenant_id | Text | 0 | 租户ID |  |
| datasourcetype | Select | null | 数据源类型 |  |
| datasourcesql | Text | null | 数据源SQL |  |
| batchoperate | Bool | true | 是否批量操作 |  |
| authType | Text | null | 权限类型 |  |
| pkField | Text | null | 主键字段 |  |
| parentField | Text | null | 父字段 |  |
| domain | Text | null | 所属域 |  |
| isBpmInited | Bool | null | 是否流程初始化 |  |
| isSupportBpm | Bool | null | 是否支持流程 |  |
| label | Text | null | 标签 | 如：fixedUserdef |
| isCoded | Bool | false | 是否编码 |  |
| cName_resid | Text | null | 多语资源ID |  |
| i18ndoc | Text | 0 |  |  |