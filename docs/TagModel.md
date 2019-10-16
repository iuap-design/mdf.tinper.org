<a name="uyQcV"></a>
## 方法
<a name="RpJJb"></a>
### getDirtyData()
说明：获取脏数据
<a name="EGeUx"></a>
### getDirtyRowIndexes()
说明：获取脏数据行index的数组
<a name="ryW41"></a>
### getData()
说明：获取tagmodel数据
<a name="Tx2S2"></a>
### getAllData()
说明：获取所有数据
<a name="0ffKS"></a>
### setData(data)
说明：设置tagmodel数据<br />入参：data
```javascript
model.setData(data)
```
<a name="rmpb2"></a>
### clear()
说明：清除数据
<a name="kM7z4"></a>
### getShowValue()
说明：获取显示值(数组)
```javascript
model.getShowValue()
```
<a name="dTqru"></a>
### getShowValueCount()
说明：获取显示值个数

```javascript
model.getShowValueCount()
```

<a name="oN3lX"></a>
### setFilter(filter)
说明：filter 过滤

```javascript
model.setFilter(filter)
```
<a name="AtFg8"></a>
### getFilter()
说明：获取tagmodel过滤

```javascript
model.getFilter()
```

<a name="ZG0a6"></a>
### setCondition(condition)
说明：设置condition<br />入参：condition 条件

```javascript
model.setCondition(condition)
```

<a name="6ddG9"></a>
### getCondition()
说明：获取condition
```javascript
model.getCondition()
```
<a name="sIRlC"></a>
### getValue()
说明：获取tagmodel  value值

```javascript
model.getValue()
```

<a name="VLbeP"></a>
### deleteItem(index)
说明：删除对应index的value值<br />入参：index

```javascript
model.deleteItem(index)
```

<a name="VB4MU"></a>
### setCellValue(index,cellName,cellValue)
说明：设置value中某一列的值<br />入参：index(序号)cellName(列名)cellValue(值)

```javascript
model.setCellValue(index,cellName,cellValue)
```

<a name="A8hIO"></a>
### setCellValues(values)
说明：批量设置列值的接口<br />入参：values  数据类型：数组
```javascript
model.setCellValues([{index,cellName,cellValue},{index,cellName,cellValue}])
```
<a name="umK7e"></a>
### deleteItems(indexes)
说明：删除批量方法<br />入参：indexes(index的数组)

```javascript
model.deleteItems([0,1])
```

<a name="Kjxtb"></a>
### setMultiple(multiple)
说明：设置tagModel是否可以多选<br />入参：multiple Boolean类型 true多选  false单选

```javascript
model.setMultiple(multiple)
```

<a name="HzjwI"></a>
### setRefCode(code,cRefRetId)

说明：设置tagmodel中参照的refcode 及cRefRetId字段<br />
入参：code => refCode  ,cRefRetId => cRefRetId

```javascript
model.setRefCode(code,cRefRetId)
```
 
<a name="J32sV"></a>
### setFocusedRowIndex(index)
说明：设置焦点行<br />入参：index
```javascript
model.setFocusedRowIndex(index)
```

<a name="0ex00"></a>
### getRow(index)
说明：根据index获取行数据<br />入参：index

```javascript
model.getRow(index)
```
<a name="iIlXb"></a>
### getEditRowModel()
说明：获取行viewmodel<br />入参：无
```javascript
model.getEditRowModel()
```

<a name="DCsQT"></a>
## 事件
<a name="sfA2S"></a>
### beforeBrowse
说明：点击按钮弹出参照前事件,返回true则继续进行弹出参照操作，返回false则终止弹出。
```javascript
viewmodel.get(propertyName).on(' beforeBrowse, function () {return true;});
```

<a name="uHURC"></a>
### afterBrowse
说明：点击按钮弹出参照后事件
```javascript
viewmodel.get(propertyName).on(' afterBrowse, function () {});
```

<a name="y580l"></a>
### beforeValueChange
说明： 参照确定返回数据改变前事件,返回true则继续进行value的改变，返回false则终止value的改变

```javascript
//例：示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on(' beforeValueChange', function (data) {    return true;  });
```

<a name="Z3rzI"></a>
### afterValueChange
说明：参照确定返回数据改变后事件，允许对改变后的数据进行操作

```javascript
//例： 示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on('afterValueChange', function (data) {});
```