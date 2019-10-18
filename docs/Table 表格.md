> 创建者：姚磊
> 创建时间：2019-09-27
> 修改者：
> 修改时间：


<a name="9Asm1"></a>
### **功能说明**
数据表格<br />**
<a name="J0shL"></a>
### **属性列表**
_无_<br />**
<a name="zD1eV"></a>
### 扩展属性 cStyle
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
|  |  |  |  |  |

**
<a name="gvqSo"></a>
### **事件列表**
**
<a name="bKkHe"></a>
### 实例
1、控制是否显示行号
```javascript
viewmodel.getGridModel().setState('showRowNo', true);
// 或
viewmodel.get('table1').setState('showRowNo', false);
```

2、控制是否显示列设置
```javascript
viewmodel.getGridModel().setState('showColumnSetting', true);
// 或
viewmodel.get('table1').setState('showColumnSetting', false);
```

3、控制是否显示分页
```javascript
viewmodel.getGridModel().setState('pagination', true);
// 或
viewmodel.get('table1').setState('pagination', false);
```

4、获取行/列模型
```javascript
// 获取当前编辑行模型
let tableEidtRowModel = viewmodel.get('table1').getEditRowModel();
// 获取当前编辑单元格模型
let tableEidtCellModel = viewmodel.get('table1').getEditRowModel().get('column1');
```