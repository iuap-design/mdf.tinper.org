<a name="vf1DR"></a>
## 方法
<a name="f7BLU"></a>
### getFromModel()
说明：获取过滤开始model
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