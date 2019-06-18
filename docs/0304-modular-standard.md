# 模块化规范说明

<a name="b3HCx"></a>
# 1. ViewModel模块说明
<a name="mHvSJ"></a>
## 1.1 声明/注册方法
MDF提供了全局的代码级VIewModel注册方式。即cb.models.register(modelType, func)

- modelType

自定义的模块类型

- func

实例化modelType时的构造函数
<a name="vNNlt"></a>
## 1.2 源代码
```javascript
cb.models = {};
cb.models.register = function (modelType, func) {
  cb.models[modelType] = func(modelType);
};
```


<a name="SefRz"></a>
## 2. 示例
<a name="S6yn8"></a>
### 2.1 注册示例代码

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


<a name="1gTbW"></a>
### 2.2 使用代码

```javascript
var helloWorld = new cb.models['MyHelloWorld']('zhangsan');
hellWorld.say();// Say Hello World to zhangsan!

```

<a name="d6Ipz"></a>
## 3. 框架ViewModel
<a name="HnqKx"></a>
### 3.1 保留字
BaseModel、SimpleModel、ListModel、ReferModel、TagModel、ReportModel、FilterModel、TreeModel、GridModel、ContainerModel

以上关键字作为MDF的保留实现ViewModel，请开发这避免使用这些关键字。
