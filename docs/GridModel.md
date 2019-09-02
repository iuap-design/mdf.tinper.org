<a name="wAjYa"></a>
### API
**setRowState(rowIndex,name,value)**<br />描述：设置当前行的状态，例如禁用、只读、样式<br />参数说明

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| rowIndex | number | 需要设置的行号 |
| name | string | 设置行的属性名称 |
| value | string | 设置具体属性值 |

例子：

```javascript
//设置第一行为禁用状态
gridModel.setRowState(1,disabled,true); 
//设置第一行外层的className为"public_fixedDataTableRow_red".
gridModel.setRowState(1, 'className', 'red'); 
```