> 创建者：姚磊
> 创建时间：2019-09-27
> 修改者：
> 修改时间：


<a name="s9Xmg"></a>
### **功能说明**
标准参照<br />**
<a name="J0shL"></a>
### **属性列表**
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| cRefType | Refer | null | 参照编码 | 参照类型 |
| cRefRetId | JSON | null | 参照返回信息 | 参照返回信息，JSON |
| refReturn | Refer | Text | null | 参照回显值 | 参照返回值 |
| multiple | Bool | false | 允许多选 | 参照是否允许多选 |

**
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
1、获取弹出参照中的模型
```javascript
// 获取卡片中弹出参照的模型
viewmodel.get('field1').getCache('vm').getTreeModel();
// 获取表格中弹出参照的模型
viewmodel.get('table1').getEditRowModel().get('column1').getCache('vm').getTreeModel();

// 获取卡片中弹出参照的模型
viewmodel.get('field1').getCache('vm').getGridModel();
// 获取表格中弹出参照的模型
viewmodel.get('table1').getEditRowModel().get('column1').getCache('vm').getGridModel();


// 参照中模型初始化代码片段
var fields = {
    referInput: new cb.models.SimpleModel(),
    referButton: new cb.models.SimpleModel(),
    filter: new cb.models.SimpleModel(),
    reload: new cb.models.SimpleModel(),
    searchBox: new cb.models.SimpleModel(),
    tree: new cb.models.TreeModel({ 
        keyField: 'code', 
        titleField: 'name', 
        multiple: this.getParams().multiple 
    }),
    table: new cb.models.GridModel({
        showAggregates: false,
        multiple: this.getParams().multiple,
        dataSourceMode: 'remote',
        override: cb.rest.interMode === 'touch' ? false : true,
        pageInfo: { pageSize: pageSize, pageIndex: 1 }
    }),
    submit: new cb.models.SimpleModel(),
    cancel: new cb.models.SimpleModel(),
    switch: new cb.models.SimpleModel()
};
this.setData(fields);
```