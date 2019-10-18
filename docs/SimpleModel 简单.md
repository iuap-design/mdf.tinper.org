<a name="7whrU"></a>
## 方法
<a name="nl0xy"></a>
### getValue()
**说明**：获取绑定Model的组件Value值
```javascript
// 例：
model.getValue()
```

<a name="cabnD"></a>
### setValue(value,check)
**说明**：设置Value值<br />**入参**：value：为想要设置的值<br />         check：boolean型  可选型参数 内部调用参数 可不传
```javascript
//例：
model.setValue(value)
```
 
<a name="FbK8t"></a>
### clear()
**说明**：清除当前数据<br />**入参**：无
```javascript
//例：
model.clear()
```

<a name="6Hqg8"></a>
## 事件
<a name="pIWZf"></a>
### beforeValueChange
**说明**： Value改变前事件
```javascript
//例：示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on(' beforeValueChange',
function (data) {
    return true;
});
//返回true则继续进行value的改变，返回false则终止value的改变
```

<a name="KG1h1"></a>
### afterValueChange
 **说明**： value改变后事件，允许对改变后的数据进行操作
```javascript
//例：示例中data格式为{ value: value, oldValue: oldValue }
viewmodel.get(propertyName).on('afterValueChange',function (data) {});
```

 <br />