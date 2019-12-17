> 创建者：姚磊
> 创建时间：2019-11-17

> 修改者：
> 修改时间：


<a name="t7BaX"></a>
### 基础属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :--- | :---: | :---: | :---: | :---: |
| cName | Text | 必输 | 模板名称 |  |
| cTitle | Text | null | 模版标题 |  |
| iTplMode | Number | 0 | 模板状态 |  |
| iWidth | Number | 10000 | 画布宽度 |  |
| templateType | Select | null | 模板类型 | 模板类型，目前主要用于指定触屏模板类型 |
| cMemo | Text | null | 备注 |  |


<a name="zOtJ8"></a>
### 隐藏属性
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| id | Text | 必输 | ID | 主键 |
| iOrder | Number | 0 | 排序 | 同一容器下的元素显示顺序，自动计算 |
| iBillId | Text | 必输 | 单据ID |  |
| cTotalColor | Color | null | 表体合计行颜色 |  |
| cAmongColor | Color | null | 隔行颜色 |  |
| pubts | DateTime | 当前时间 | 时间戳 |  |
| isDeleted | Bool | false | 是否删除 |  |
| cPrintSetting | Text | null | 打印设置 |  |
| cPageHeader | Text | null | 页眉 |  |
| cPageFooter | Text  | null | 页脚 |  |
| cFixedColor | Color | null | 固定行颜色 |  |
| cTitleHeight | Text | null | 标题区高度 |  |
| iPrintTotal | Bool | null | 是否打印具体行 | 是否打印具体行<br />00000000,第一位代表打印合计行，第二位代表打印小计行，第三位代表表体标题行 |
| iFixedCols | Number | null | 固定列数 |  |
| iGridStyle | Number | null | 网格风格 |  |
| cRowLayout | Text  | null | 行布局 |  |
| cTitleStyle | Text | null | 标题风格 | 标题风格，比如字体，可以用xml或者json |
| sysid | Text | null | 系统ID | 租户模板用来关联系统模板的ID |
| tenant_id | Text | 0 | 租户ID |  |
| systemCode | Text | null | 系统编码 |  |