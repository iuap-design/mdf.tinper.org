<a name="C4ErA"></a>
## 方法
<a name="NvbT4"></a>
### validate()
说明：校验函数 合法性、必输项

<a name="z4ncC"></a>
### getDirtyData()
说明：获取脏数据

<a name="wunoA"></a>
### getDirtyRowIndexes()
说明：获取脏数据的行号集合

<a name="APGOZ"></a>
### getData()
说明：获取所有数据

<a name="gPNj8"></a>
### getColumns(fields)
说明：批量获取栏目信息<br />入参：fields为所需获取栏目的fieldname集合<br />可选参数，如不传，则获取所有栏目的信息

<a name="g5oMp"></a>
### getColumns(field)
说明：获取单列栏目的信息<br />入参：field为所需获取栏目的fieldname

<a name="JUeB5"></a>
### hasColumn(field)
说明：判断函数，判断是否包含该栏目<br />入参：field为所要判断栏目的fieldname<br />返回值：true or false

<a name="ahLkT"></a>
### setDirty(dirty)
说明：设置脏数据取值范围 默认为false为收集数据时只收集脏数据。<br />入参：dirty  类型Boolean   
<br />传入true则收集数据时不区别脏数据，为完整数据。    

<a name="zRdyR"></a>
### setReadOnly(value)
说明：设置grid属性为是否可编辑状态<br />入参：value    true or
false

<a name="9LdWu"></a>
### setFocusedRowIndex(index)
说明：设置焦点行<br />入参：index 需要设置的焦点行行号

<a name="HKUxy"></a>
### getCellValue(rowIndex,cellName)
说明：获取单元格value值<br />入参：rowIndex  行号<br />          cellName  列名（fieldname）

<a name="DYsJl"></a>
### setCellValue(rowIndex, cellName, value, check, blur)
说明：设置单元格value值<br />入参：rowIndex 行号<br />          cellName 
列名（fieldname）<br />          value 值<br />          check  boolean型  内部调用参数 可不传<br />          blur 为true时，单元格数据改变后变为不可编辑状态

<a name="bAShD"></a>
### getRowState(rowIndex,name)
说明：获取行状态<br />入参：rowIndex  行号<br />          name 状态名
```javascript
//获取行1的disabled状态
model. getRowState(1,’disabled’)
```
 
<a name="ZXUL0"></a>
### setRowState(rowIndex, name, value)
说明：设置当前行的状态，例如禁用、只读、样式<br />入参： rowIndex  行号
               <br />           name 状态名<br />           value 状态值
```javascript
//设置第一行为禁用状态
gridModel.setRowState(1,disabled,true); 
//设置第一行外层的className为"public_fixedDataTableRow_red".
gridModel.setRowState(1, 'className', 'red'); 
```

<a name="xmzQ8"></a>
### getColumnState(cellName, name)
说明：获取列状态<br />入参：cellName  列名(fieldname)<br />          name  状态名  
```javascript
model. getColumnState(2,’readOnly’)
```
 
<a name="RirZ1"></a>
### setColumnState(cellName, name, value)
说明：设置列状态<br />入参：cellName 列名(fieldname)<br />          name 状态名<br />          value 状态值
```javascript
//设置inventory列的readOnly状态为true
model. setColumnState(‘inventory’,’readOnly’,true)
```
     
<a name="FC4ZS"></a>
### setColumnValue(cellName, value, check)
说明：设置整列数据的值<br />入参：cellName 列名(fieldname)<br />          value  列值<br />          check  boolean型  内部调用参数 可不传

<a name="7ExSe"></a>
### getCellState(rowIndex, cellName, name)
说明：获取单元格状态<br />入参：rowIndex  行号
 <br />    cellName 
列名 <br />          name   状态名
```javascript
//获取第一行inventory列的readOnly状态的值
model. getCellState (1,’ inventory’,’readOnly’)
```
      
<a name="xl1mP"></a>
### setCellState(rowIndex, cellName, name, value)
说明：设置单元格状态<br />入参：rowIndex  行号<br />          cellName  列名(fieldname)<br />          name  状态名<br />          value  状态值
```javascript
//设置第1行inventory列的readOnly状态为true
model. setCellState(1,’ inventory’,’readOnly’,true)
```
 
<a name="jFM6k"></a>
### setColumns(columns, fieldNames)
说明：设置grid栏目<br />入参：columns  栏目集合<br />          fieldNames  fieldname集合(可不传)

<a name="7ypvK"></a>
### clear()
说明：清除全部数据

<a name="4qzKe"></a>
### setDataSource(proxyConfig, queryParams, callback)
说明：如果GridModel中dataSourceMode为local则proxyConfig参数传递为真实数据。<br />否则proxyConfig参数传递服务请求地址，queryParams传递请求参数，callback传递回调函数。
```javascript
//dataSourceMode为local
model. setDataSource(GridData)
//dataSourceMode不为local
model.setDataSource(‘bill/list.do’,{‘id’:1},function(result){})
```

<a name="ZcGhn"></a>
### load (proxyConfig, params, callback)
说明：调用方法同setDataSource方法中dataSourceMode不为local的情况

<a name="jF83w"></a>
### setPageSize(pageSize)
说明：设置grid分页的页大小<br />入参： pageSize  页大小

<a name="0QtXZ"></a>
### setPageIndex(pageIndex)
说明：设置grid分页中的页码<br />入参：pageIndex  页码

<a name="O3XrP"></a>
### getPageSize()
说明：获取当前grid分页的页大小

<a name="DZ6Ed"></a>
### select(rowIndexes)
说明：设置grid选中行<br />入参： rowIndexes  行号集合<br />示例： model.select([1,2,3])  设置grid选中行号为1,2,3行

<a name="Awj7R"></a>
### getPageIndex()
说明：获取grid分页中的当前页码

<a name="FI4Y3"></a>
### unselect(rowIndexes)
说明：设置grid取消选中的行<br />入参： rowIndexes  行号集合

<a name="TBWxg"></a>
### selectAll()
说明：选中所有行

<a name="mNpP6"></a>
### unselectAll()
说明：取消选中所有行

<a name="0xYFe"></a>
### getSelectedRows()
说明：获取grid中已选中行的数据

<a name="HW0wP"></a>
### getSelectedRowIndexes()
说明：获取grid中已选中行的行号

<a name="V9ebF"></a>
### getRows()
说明：获取grid中的所有行数据
<a name="oOQJC"></a>
### 
<a name="jq004"></a>
### updateRow(rowIndex, rowData)
说明：更新行数据<br />入参：rowIndex  行号<br />          rowData   行数据

<a name="JnMQB"></a>
### insertRow(rowIndex, rowData)
说明：grid插行功能<br />入参：rowIndex  行号<br />          rowData   行数据
```javascript
//在第三行下插入行，行数据为rowData
model.insertRow(3,rowData)
```

<a name="NJAdO"></a>
### insertRows(rowIndex, rowDatas)
说明：grid批量插行功能 <br />入参：rowIndex 行号<br />          rowDatas 行数据
```javascript
//在第三行下插入rowDatas.length行，数据为rowDatas
model.insertRow(3,rowDatas)
```

<a name="I8Ead"></a>
### appendRow(rowData)
说明：grid增行功能<br />入参： rowData  行数据

<a name="npzfn"></a>
### deleteRows(rowIndexes)
说明：grid 删行功能<br />入参：rowIndexes  行号集合
```javascript
//删除grid中第行号为1,2的行
model.deleteRows([1,2])
```
 
<a name="5MUBa"></a>
### getRowsByIndexes(rowIndexes)
说明：根据行号获取grid中数据<br />入参：rowIndexes  行号集合

<a name="z1NYq"></a>
### getRow(rowIndex)
说明：根据行号获取行数据<br />入参：rowIndex  单个行号

<a name="ca8Je"></a>
## 事件
<a name="4M56I"></a>
### beforeCellValueChange
说明：grid单元格数据改变前事件,  返回true继续单元格数据改变，返回false终止单元格数据改变。
```javascript
//示例中data格式为{ rowIndex:‘行号’, cellName: ‘列名’, value: ‘新值’, oldValue: ‘旧值’}
viewmodel.get(propertyName).on(' beforeCellValueChange,function (data) {
    return true;
});
```

<a name="Fctm6"></a>
### afterCellValueChange
说明：grid单元格数据改变后事件
```javascript
//示例中data格式为{ rowIndex:‘行号’, cellName: ‘列名’, value: ‘新值’, oldValue: ‘旧值’}
viewmodel.get(propertyName).on(' afterCellValueChange,function (data) {});
```
  
<a name="yh0L5"></a>
### beforeRowStateChange
 说明：行状态改变前事件,返回true继续行状态改变，返回false终止改变
```javascript
//示例中data格式为{ rowIndex: ‘行号’, propertyName: ‘状态名’, value: ‘状态新值’, oldValue: ‘旧值’}
viewmodel.get(propertyName).on(' beforeRowStateChange',function (data) {
    return true;
});
```
 
<a name="jVASg"></a>
### afterRowStateChange
说明：行状态改变后事件
```javascript
//示例中data格式为{ rowIndex: ‘行号’, propertyName: ‘状态名’, value: ‘状态新值’, oldValue: ‘旧值’}
viewmodel.get(propertyName).on(' afterRowStateChange',function (data) {});
```

<a name="dpEB9"></a>
### beforeColumnStateChange
说明：列状态改变前事件, 返回true继续列状态改变，返回false终止状态改变
```javascript
//示例中data格式为{ cellName: ‘列名’, propertyName: ‘状态名’, value: ‘状态名’, oldValue: ‘旧值’}
viewmodel.get(propertyName).on(' beforeColumnStateChange',function (data) {
    return true;
});
```

<a name="gwWM0"></a>
### afterColumnStateChange
说明：列状态改变后事件
```javascript
//示例中data格式为{ cellName: ‘列名’, propertyName: ‘状态名’, value: ‘状态名’, oldValue: ‘旧值’}
viewmodel.get(propertyName).on(' afterColumnStateChange',function (data) {});
```

<a name="Clb6o"></a>
### beforeColumnValueChange
说明：列值改变前事件,返回true允许列值改变，返回false终止列值改变
```javascript
//示例中data格式为{ cellName: ‘列名’, value: ‘列值’}
viewmodel.get(propertyName).on(' beforeColumnValueChange',function (data) {
       return true;
});
```

<a name="YJ3kW"></a>
### afterColumnValueChange
说明：列值改变后事件
```javascript
//示例中data格式为{ cellName: ‘列名’, value: ‘列值’}
viewmodel.get(propertyName).on(' afterColumnValueChange',function (data) {});
```

<a name="RKVMO"></a>
### beforeCellStateChange
说明：单元格状态改变前事件,返回true则允许状态改变，返回false终止改变
```javascript
//示例中data格式为{ rowIndex: ‘行号’, cellName: ‘列名’, propertyName: ‘状态名’, value: ‘新值’, oldValue: ‘旧值’ }
viewmodel.get(propertyName).on(' beforeCellStateChange',function (data) {
    return true;
});
```

<a name="PY9cd"></a>
### afterCellStateChange
说明：单元格状态改变后事件
```javascript
//例：示例中data格式为{ rowIndex: ‘行号’, cellName: ‘列名’, propertyName: ‘状态名’, value: ‘新值’, oldValue: ‘旧值’ }
viewmodel.get(propertyName).on(' afterCellStateChange',function (data) {});
```

<a name="yWVYa"></a>
### beforeSetColumns
说明：设置grid栏目前事件,返回true为允许设置栏目，返回false终止设置
```javascript
//例：示例中columns格式为栏目数据格式
viewmodel.get(propertyName).on(' beforeSetColumns',function (columns) {
    return true;
});
```

<a name="SmX15"></a>
### afterSetColumns
说明：设置grid栏目后事件
```javascript
//例：示例中columns格式为栏目数据格式
viewmodel.get(propertyName).on(' afterSetColumns',function (columns) {});
```

<a name="TjQxI"></a>
### beforeSetDataSource
说明：设置grid数据前事件,返回true为允许设置grid数据，返回false为终止设置数据
```javascript
//例：示例中data为grid数据格式
viewmodel.get(propertyName).on(' beforeSetDataSource',function (data) {
     return true;
});
```

<a name="PaFXL"></a>
### afterSetDataSource
说明：设置grid数据后事件
```javascript
//例：示例中data为grid数据格式
viewmodel.get(propertyName).on(' afterSetDataSource',function (data) {});
```

<a name="lcP4d"></a>
### beforeSelect
说明：选中select前事件,返回true为允许选中，返回false为终止选中
```javascript
//例：示例中rowIndexes为行号，单行(整形)or多行(数组)
viewmodel.get(propertyName).on(' beforeSelect',function (rowIndexes) {
     return false;
});
```

<a name="ghFxn"></a>
### afterSelect
说明：选中select后事件
```javascript
//例：示例中rowIndexes为行号，单行(整形)or多行(数组)
viewmodel.get(propertyName).on(' afterSelect',function (rowIndexes) {});
```

<a name="poLWj"></a>
### beforeUnSelect
说明：取消选中select前事件,返回true为允许取消选中，返回false为终止取消选中
```javascript
//例：示例中rowIndexes为行号，单行(整形)or多行(数组)
viewmodel.get(propertyName).on(' beforeUnSelect',function (rowIndexes) {
    return false;
});
```

<a name="DqcSZ"></a>
### afterUnSelect
说明：选中select后事件
```javascript
//例：示例中rowIndexes为行号，单行(整形)or多行(数组)
viewmodel.get(propertyName).on(' afterUnSelect',function (rowIndexes) {});
```

<a name="QvutK"></a>
### beforeSelectAll
说明：全选前事件,返回true为允许全选，返回false为终止全选
```javascript
viewmodel.get(propertyName).on(' beforeSelectAll',function () {
    return  false;
});
```

<a name="P8WhH"></a>
### afterSelectAll
说明：全选后事件
```javascript
//例：示例中rows为选中行数据
viewmodel.get(propertyName).on(' afterSelectAll',function (rows) {});
```

<a name="q1OBf"></a>
### beforeUnSelectAll
说明：全消前事件,返回true为允许全消，返回false为终止全消
```javascript
viewmodel.get(propertyName).on(' beforeUnSelectAll',function () {
     return false;
});
```

<a name="CV4Mu"></a>
### afterUnSelectAll
说明：全消后事件
```javascript
viewmodel.get(propertyName).on(' afterUnSelectAll',function () {})
```

<a name="9bBZ2"></a>
### beforeInsertRow
说明：增行/插行前事件,返回true为允许增/插行，返回false为终止操作
```javascript
//例：示例中data格式为{ index: ‘增/插行行号’, row: ‘行数据’}
viewmodel.get(propertyName).on('beforeInsertRow',function (data) {
   return false;
});
```

<a name="i9G5Z"></a>
### afterInsertRow
说明：增行/插行后事件
```javascript
//例：示例中data格式为{ index: ‘增/插行行号’, row: ‘行数据’}
viewmodel.get(propertyName).on('afterInsertRow',function (data) {});
```

<a name="KEK3d"></a>
### beforeDeleteRows
说明：删行前事件,返回true为允许删行，返回false为终止操作
```javascript
//例：示例中rows为要删除的行数据
viewmodel.get(propertyName).on('beforeDeleteRow',function (rows) {
   return false;
});
```

<a name="NsVIZ"></a>
### afterDeleteRows
说明：删行后事件
```javascript
//例：示例中rows为已删除的行数据
viewmodel.get(propertyName).on('afterDeleteRow',function (rows) {});
```