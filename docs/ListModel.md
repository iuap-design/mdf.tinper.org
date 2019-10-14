<a name="CuIYd"></a>
## 方法
<a name="E52S0"></a>
### clear()
**说明：**清除数据
```javascript
//例：
model.clear()
```

<a name="xh8dJ"></a>
### setDataSource(proxyConfig,
queryParams, callback)
**说明**：如果ListModel中dataSourceMode为local则proxyConfig参数传递为真实数据。<br />否则proxyConfig参数传递服务请求地址，queryParams传递请求参数，callback传递回调函数。
```javascript
//例：dataSourceMode为local
model. setDataSource(listData)
//dataSourceMode不为local
model. setDataSource(‘bill/list.do’,{‘id’:1},function(result){})
```

<a name="JcZQf"></a>
### select(selectedKeys)
**说明**：选中方法
```javascript
//入参：selectedKeys传递要选中的key值 [‘key1’,’key2’]
//例：
model.selete(selectedKeys);
```

<a name="Siq8g"></a>
### getSelectedNodes()
**说明：**获取已选中的数据
```javascript
//例：
var arrSelectList = model. getSelectedNodes()
```

<a name="QEqht"></a>
### getSelectedKeys()
**说明**：获取已选中的数据的key值
```javascript
//例：
var arrSelectKeys = model. getSelectedKeys ()
```

<a name="IycIf"></a>
### setValue(value,check)
**说明**：设置Value值<br />**入参**：value：为想要设置的值<br />           check：boolean型  可选型参数 内部调用参数 可不传
```javascript
//例：
model.setValue(value)
```
 
<a name="ZCauZ"></a>
### getValue()
**说明**：获取绑定Model组件的Value值
```javascript
//例：
model.getValue()
```


<a name="cWHun"></a>
## 事件
<a name="BcFbf"></a>
### beforeSetDataSource
**说明**：DataSource改变前事件,返回true则继续进行DataSource的改变，返回false则终止DataSource的改变
```javascript
//例：
viewmodel.get(propertyName).on(' beforeSetDataSource,
function (data) {
  return true;
});
```
       
<a name="iOaWr"></a>
### afterSetDataSource
 **说明**：DataSource改变后事件
```javascript
//例：
viewmodel.get(propertyName).on(' afterSetDataSource,function (data) {});
```

<a name="iWmEa"></a>
### beforeSelect
**说明**：select选择前事件,返回true则继续进行select的改变，返回false则终止select的改变
```javascript
//例：示例中的data为select选中数据
viewmodel.get(propertyName).on(' beforeSelect,function (data) {
                                return true;
                              });
```

<a name="3dyjw"></a>
### afterSelect
**说明**：select选择后事件
```javascript
//例：示例中的data为select选中数据
viewmodel.get(propertyName).on(' afterSelect,function (data) {});
```

<a name="h3y6g"></a>
### beforeValueChange
**说明**： Value改变前事件,返回true则继续进行value的改变，返回false则终止value的改变
```javascript
//示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on(' beforeValueChange',function (data) {
                                return true;
                              });
```
<a name="qZzNE"></a>
### afterValueChange
 **说明**： value改变后事件，允许对改变后的数据进行操作
```javascript
//例：示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on('afterValueChange',function (data) {});
```