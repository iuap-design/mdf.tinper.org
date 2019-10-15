说明：所有model的基类
<a name="MB1FW"></a>
## 方法
<a name="5cIyg"></a>
### get(propertyName)
说明：根据子model属性名获取子model<br />入参：propertyName：子model属性名
```javascript
viewmodel.get(propertyName)
```
<a name="lF0k6"></a>
### addProperty(propertyName, value)
说明：新增子model<br />入参：propertyName：子model属性名；value：子model值
```javascript
viewmodel.addProperty(propertyName,value)
```
<a name="1YtvK"></a>
### removeProperty(propertyName)
说明：根据属性名移除子model<br />入参：propertyName：子model属性名
```javascript
viewmodel.removeProperty(propertyName)
```
<a name="nlGWA"></a>
### getData()
说明：获取基类数据
```javascript
viewmodel.getData()
```
<a name="mulXs"></a>
### getOriginalData()
说明：获取基类model中初始数据
```javascript
viewmodel.getOriginalData()
```
<a name="07Htq"></a>
### getNecessaryData()
说明：获取基类model中bMustSelect为true的数据
```javascript
viewmodel.getNecessaryData()
```
<a name="CLXFk"></a>
### setDirty(dirty)
说明：设置是否收集数据时只收集脏数据(true为收集所有数据，false为只收集脏数据)<br />入参：dirty：true or false
```javascript
viewmodel.setDirty()
```
<a name="VTjJ9"></a>
### validate()
说明：表单校验
<a name="v5oLn"></a>
### getDirtyData()
说明：获取脏数据(差异化数据)方法
```javascript
viewmodel.getDirtyData()
```
<a name="LDQpT"></a>
### loadData(data)
说明：加载数据方法<br />入参：data：需加载的数据
```javascript
viewmodel.loadData()
```
<a name="qOnN4"></a>
### loadDirtyData(data)
说明：加载脏数据方法<br />入参：data：需加载的数据
```javascript
viewmodel.loadDirtyData()
```
<a name="3pErX"></a>
### clear()
说明：清除数据方法
```javascript
viewmodel.clear()
```
<a name="gchFk"></a>
### collectData(all)
说明：收集数据方法(all为true收集所有数据，false为只收集脏数据)<br />入参：all：true or false
```javascript
viewmodel.collectData(all)
```
<a name="ZLAzA"></a>
### setReadOnly(value)
说明：设置只读属性readOnly方法<br />入参：value：true or false
<a name="uuBiy"></a>
### getGridModel(propertyName)
说明：根据属性名获取GridModel<br />入参：propertyName：子model属性名  如propertyName不传则默认取基类model中第一个GridModel
```javascript
viewmodel.getGridModel(propertyName)
```
<a name="5TbAM"></a>
### getTreeModel(propertyName)
说明：根据属性名获取TreeModel<br />入参：propertyName：子model属性名  如propertyName不传则默认取基类model中第一个TreeModel
```javascript
viewmodel.getTreeModel(propertyName)
```