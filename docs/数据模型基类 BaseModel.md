<a name="jmuLV"></a>
## 
<a name="22bV8"></a>
## BaseModel 基本设计

- 所有的 viewmodel 对象都是通过构造函数加原型的方式创建的一个类，通过对象实例化的方式进行调用
- basemodel 是所有viewmodel的一个基类，其作用相当于是js中的基类Object对象，其他的viewmodel对象会继承该基类并使用相关的api。
- basemodel 一般不会在外部被开发者使用，除非要 register 一个新的 viewmodel的时候。

```javascript
cb.models.register('BaseModel', function (modelType) {
  // BaseModel 构造函数
  var model = function (data) {
    var propertyNames = [];
    if (data)
      for (var propertyName in data)
        propertyNames.push(propertyName);
    // _data 是基类维护的数据对象
    // _get_data、_set_data、_del_data、_cls_data
    // 均是对_data的数据获取项、设置项、删除项、清空全部等操作
    var _data = cb.utils.extend({}, { listeners: [], propertyNames: propertyNames, events: {}, cache: {} }, data);

    this._get_data = function (key) {
      if (!key) return;
      return _data[key];
    };

    this._set_data = function (key, value, update) { };

    this._del_data = function (key) { };

    this._cls_data = function () { };
  };
  // BaseModel 原型属性
  model.prototype.modelType = modelType;
  // BaseModel 原型方法
  model.prototype.getData = function () { };
	// BaseModel 原型方法
  model.prototype.setState = function (name, value, ctrlName) { };
  
  ...
  
}
  
// 
```

BaseModel 内部实现可以分三个纬度来深度了解：

- 一个是对象内维护的数据源 _data，其他的公共方法和事件都是围绕这个data展开的；
- 第二个纬度就是公共api，包含对数据的增删改查等操作；
- 第三个就是事件机制，通过给数据进行事件的绑定和监听事件数据的动态管理。

<a name="I1b4x"></a>
## BaseModel 的作用

```javascript

// 比如注册 ReportModel 这个 viewmodel 类
// ReportModel 将在构造函数和原型两个维度继承 BaseModel，
cb.models.register('ReportModel', function (modelType) {
  var model = function (data) {
    cb.models.BaseModel.call(this, data);
  };
  
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
}
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/85184/1557283307991-e20d71e7-fcc9-4102-803c-b9a35ae4e8f8.png#align=left&display=inline&height=1228&name=image.png&originHeight=2456&originWidth=2512&search=&size=1841829&status=done&width=1256)
<a name="tIa1B"></a>
## 
<a name="9bnwY"></a>
### 对数据的管理


| 属性名称 | type | 示例 | 说明 |
| --- | --- | --- | --- |
| listeners | array | [] |  |
| propertyNames | array | ["cItemName,"iStyle", "needClear"] |  |
| events | object | {} | 事件队列，其中每个key都是数组。<br />events[name] = []

 |
| cache | object | {} | 缓存池，将挂载不同ViewModel的cache字段，如vm |
|  |  |  |  |
| isDirty | boolean | true | 标志位：是否脏数据 |
| originalData | boolean | false | 标志位：是否远程数据 |
| readOnly |  |  |  |
| proxy |  |  |  |
| cDefaultValue |  |  |  |
| value |  |  | SimpleModel 中的 setValue 方法将会对 value 设值。 |
| disabled |  |  |  |
| visible |  |  |  |
| checkMsg |  |  |  |
| checking |  |  |  |
| 其他 ViewModel 中维护的不同数据也将挂载到 _data |  |  |  |
| cShowCaption | string | "批量操作" |  |
| cCommand | string | "cmdBatchOp" |  |
| cControlType | string | "dropdownbutton" |  |
| key |  |  |  |
| treeFilter |  |  |  |
| condition |  |  |  |




<a name="9VcBv"></a>
### 对事件的管理


| API | 使用 |  |
| --- | --- | --- |
| addListener |  |  |
| removeListener |  |  |
| fireEvent |  |  |
| notifyListener |  |  |
| doPropertyChange | viewmodel.doPropertyChange(name, value, ctrlName) | name 为 'setDisabled'、"setState"等 API 名称， |
| on |  |  |
| un |  |  |
| hasEvent | viewmodel.hasEvent(name) | 判断 _data.events 事件队列中是否有某个事件 |
| execute | viewmodel.execute(name) | var events = this._get_data('events')[name];<br />....<br />    events.forEach() |
| promiseExecute |  |  |


<a name="ERYrQ"></a>
### 对状态的管理



| API | 使用 |  |
| --- | --- | --- |
| _get_data |  |  |
| _set_data | viewmodel.setState(name, value, update) | 往_data对象上新增属性值。其中update 为布尔值，true的时候会同时将该属性值新增到data.propertyNames 数组中 |
| _del_data |  |  |
| _cls_data |  |  |
| get |  | 和 _get_data 一致 |
| setState |  |  |
| <br />getData<br /> | viewmodel.getData() | 执行的_get_data('value')，没看到具体用处 |
| setParent |  |  |
| getParent |  |  |
| setName |  |  |
| getName |  |  |
| setDirty |  |  |
| getDirtyData |  |  |
| getData |  |  |
| setState |  |  |
| getState |  |  |
| setProxy |  |  |
| getProxy |  |  |
| setReadOnly |  |  |
| getReadOnly |  |  |
| setDisabled |  |  |
| getDisabled |  |  |
| setVisible |  |  |
| getVisible |  |  |
| setChecking |  |  |
| setCheckMsg |  |  |
| validate |  |  |
| setCache | viewmodel.setCache(key, value) | 从 _data.cache缓存池设值<br /> |
| getCache | viewmodel.getCache(key) | <br />从 _data.cache缓存池取数<br /> |
| clearCache | viewmodel.clearCache(key) | <br />从 _data.cache缓存池中delete某条数据<br /> |
| runGC | viewmodel.runGC() | 其实就是将 _data = null |


<a name="9w84l"></a>
### 建立双向绑定机制


<a name="8DjIe"></a>
##