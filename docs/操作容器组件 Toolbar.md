> 创建者：姚磊
> 创建时间：2019-09-27
> 修改者：
> 修改时间：


<a name="t7BaX"></a>
### 基础属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| name | Text | 必输 | 名称 |  |
| align | Select | top | 对齐方式 | top-顶部对齐，left-左对齐，right-右对齐，bottom-底部对齐，center-居中对齐 |
| childrenField | Text | null | 子表集合属性 |  |
| cStyle | JSON | null | 样式及扩展 | 样式和扩展属性 |


<a name="OIUwL"></a>
### 扩展属性 cStyle
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| classname | Text | null | 样式类名 |  |
|  |  |  |  |  |


<a name="zOtJ8"></a>
### 隐藏属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Text | 必输 | ID | 主键 |
| subid | Text | 必输 | 子产品ID | 默认取元数据中的Moddue |
| billnumber | Text | 必输 | 单据编码 | 后台逻辑处理 |
| orderNum | Number | 0 | 排序 | 同一容器下的元素显示顺序，自动计算 |
| parent | Bool | true | 上级容器 | 父容器的Code |
| ismain | Bool | true | 是否主表 |  |
| tplmode | Select | null |  |  |
| templateType | Select | null | 模板类型 |  |
| terminalType | Select | null | 终端类型 |  |
| system | Bool | true | 是否系统 | 设计字段为0，系统字段为1 |
| pubts | DateTime | 当前时间 | 时间戳 |  |
| tenant_id | Text | 0 | 租户ID |  |