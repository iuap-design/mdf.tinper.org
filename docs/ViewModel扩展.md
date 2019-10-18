<a name="C1Q6l"></a>
## 基类 BaseModel


<a name="W0ugj"></a>
## 模块级 ViewModel
<a name="ZVnXy"></a>
### 如何使用

```javascript
// ViewModel 实例化
var tagReferModel = new cb.models.ReferModel({
  cRefType: 'aa_tagref',
  multiple: 'true'
});

// 调用 API
tagReferModel.setVisible(false)

// 绑定事件监听：加入商品标签的批量操作
viewmodel.on('addtag', function(args) {
  tagReferModel.setCache('args', args);
  tagReferModel.browse(true);
});
```

<a name="gwOTE"></a>
### 原理说明

以下为 ViewModel 的注册源码：

```javascript
cb.models = {};
cb.models.register = function (modelType, func) {
  cb.models[modelType] = func(modelType);
};
```

MDF提供了全局的模块级 VIewModel 注册方式，具体 API 信息如下：

| name | type | 描述 |
| --- | --- | --- |
| modelType | string | 自定义的模块类型，如 "ReferModel" |
| func | function |  |


<a name="khRGM"></a>
### 如何扩展（注册viewmodel）

```javascript
//myViewModel.js
cb.models.register('MyHelloWorld', function(modelType){
	var model = function(data){
    this._data = data;
  }
  model.prototype.modelType = modelType;
  model.prototype.say = function(){
  	console.log('Say Hello World to '+  + this._data + '!');
  };
  return model;
})
```

使用自定义的 viewmodel 

```javascript
var helloWorld = new cb.models['MyHelloWorld']('zhangsan');
hellWorld.say();// Say Hello World to zhangsan!

```

<a name="b3K54"></a>
### 特别说明：ViewModel 保留字

`BaseModel` 、SimpleModel、ListModel、ReferModel、TagModel、ReportModel、FilterModel、TreeModel、GridModel、ContainerModel

以上关键字作为MDF的保留实现ViewModel，MDF提供了上述viewModel的实现，请开发这避免使用这些关键字。
<a name="tahIZ"></a>
## 
<a name="covF2"></a>
## 容器级 ViewModel


<a name="wgeU7"></a>
### 如何使用

```javascript
var vm = new cb.viewmodels.ReferViewModel({ 
	params: { 
  	refCode: refCode, 
    multiple: multiple, 
    where: where 
   } 
});
```

<a name="kwUPG"></a>
### 原理说明

```javascript
cb.viewmodels = {};
cb.viewmodels.register = function (modelType, func) {
  cb.viewmodels[modelType] = func(modelType);
};

```

MDF提供了全局的模板级VIewModel注册方式，具体 API 信息如下：

| name | type | 描述 |
| --- | --- | --- |
| modelType | string | 自定义的模块类型，如 "ReferModel" |
| func | function |  |


<a name="UbAzg"></a>
### 如何扩展（注册 ViewModel）

```javascript
cb.viewmodels.register('MyCustomViewModel', function (modelType) {
  var model = function (data) {
    cb.models.ContainerModel.call(this, data);
    this.init();
  };
  //   FilterViewModel
  model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.init = function () {
    // todo something
  };

  model.prototype.initData = function () {


    if (typeof FilterViewModel_Extend == 'object')
      FilterViewModel_Extend.doAction("init_Extend", this);
  };

  return model;
});
```

<a name="btBqX"></a>
### 特别说明：ViewModel 保留字

`FilterViewModel` 、PlatformManagementVIewModel、ReferViewModel、RoleViewModel<br />以上关键字作为MDF的保留实现ViewModel，MDF提供了上述viewModel的实现，请开发这避免使用这些关键字。

<a name="rxTSg"></a>
## 模板级

此外，各领域实现的UI模板MDF都会为其生成一个UI模板级ViewModel，通过cb.viewmodels.register('xxxxxx', function(){...})<br />例如：店存入库列表模板代码自动生成代码如下：

```javascript
(function anonymous(
) {
      //voucherlist   
    console.info('%c ST_st_storeinlist_VM js init', 'color:green');
		cb.viewmodels.register('ST_st_storeinlist_VM', function (modelType) {

    	var model = function (data) {
        cb.models.ContainerModel.call(this,data);
        this.init();
      };
      model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
      model.prototype.modelType = modelType;
  		
  		//此处省略若干行代码......
  		
  		return model;
  });
})
```


<a name="7v2xO"></a>
##