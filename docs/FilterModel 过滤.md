<a name="vf1DR"></a>
## 方法
<a name="f7BLU"></a>
### getFromModel()
说明：获取过滤开始的 `model` 。

- `getFromModel` 是 `filterModel` 特有的 `API` ； 
- `filterModel` 在创建并初始化 `data` 的时候，会创建一个 `data.fromModel` 用于存储对应数据模型， `fromModel` 会根据不同的 `ctrlType` 创建不同的 `model` 类型。
- 所以，和其他的 `model` 通过 get() 方法获取 data上的数据不同的是， `filterModel`  单独提供了`getFromModel()  这个方法去取 `data.fromModel` 。

```javascript
model.getFromModel()
```

<a name="QYh5D"></a>
### getToModel()
说明：获取过滤结束model，只存在于区间类过滤 如开始-结束日期
```javascript
model.getToModel()
```

<a name="1dEjV"></a>
### getFromDisplayModel()
说明：获取过滤显示model
```javascript
model.getFromDisplayModel()
```

<a name="FIEq4"></a>
### getDirtyData()
说明：获取脏数据
```javascript
 model.getDirtyData()
```

<a name="B3HZe"></a>
### getData(dirty)
说明：获取数据<br />入参：dirty Boolean
```javascript
//dirty => true  脏数据  dirty => false 全部数据
model.getData(dirty)
```

<a name="z07M3"></a>
### setActionsState(actionState)
说明：设置行action的状态<br />入参：actionState 行按钮状态
```javascript
model.setActionsState({
  rowIndex：1，
  itemName："btnAdd",
  name:"visible",
  value: false
})
```
<br />