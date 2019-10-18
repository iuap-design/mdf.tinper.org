参照与tag绑定Model类型
<a name="CIEdV"></a>
## 方法
<a name="e9xPz"></a>
### clear()
**说明**：清除数据
```javascript
//例：
model.clear()
```

<a name="SUvvz"></a>
### setFilter(filter)
**说明**：设置filter
```javascript
model.setFilter(filter)
```

<a name="TL7VR"></a>
### getFilter()
**说明**：获取filter
```javascript
model.getFilter()
```

<a name="HTzrm"></a>
### setCondition(condition)
**说明：**设置Condition
```javascript
model.setCondition(condition)
```

<a name="smk4m"></a>
### getCondition()
**说明：**获取Condition
```javascript
model.getCondition()
```

<a name="CBkKk"></a>
### setReturnFields(fields)
** 说明**：设置参照返回的携带字段
```javascript
//说明：设置参照返回携带字段,
//入参：fields   参照返回携带字段对象
model.setReturnFields(fields)
```

<a name="NkYpb"></a>
### setValue(value,check)
**说明：**设置Value值
```javascript
//入参：value：为想要设置的值
//     check：boolean型  内部调用参数 可不传
model.setValue(value)
```

<a name="micaC"></a>
### getValue()
**说明：**获取Value值
```javascript
model.getValue()
```

<a name="mtE9J"></a>
### getSelectedNodes()
**说明**：绑定组件为tag时，调用该方法获取参照选中返回数据
```javascript
model. getSelectedNodes()
```

<a name="4zMZ8"></a>
## 事件
<a name="mDgBj"></a>
### beforeBrowse
**说明**：点击按钮弹出参照前事件, 返回true则继续进行弹出参照操作，返回false则终止弹出
```javascript
viewmodel.get(propertyName).on(' beforeBrowse,function () {
    return true;
});
```

<a name="TXATh"></a>
### afterBrowse
**说明**：点击按钮弹出参照后事件
```javascript
viewmodel.get(propertyName).on(' afterBrowse,function () {});
```

<a name="WFmmF"></a>
### beforeValueChange
**说明：** 参照确定返回数据改变前事件, 返回true则继续进行value的改变，返回false则终止value的改变
```javascript
//例：示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on(' beforeValueChange',function (data) {
    return true;
});
```

<a name="AJWje"></a>
### afterValueChange
 **说明**：参照确定返回数据改变后事件，允许对改变后的数据进行操作
```javascript
//例：示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on('afterValueChange',function (data) {});
```

      <br />