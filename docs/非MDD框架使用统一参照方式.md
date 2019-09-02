<a name="8t9dU"></a>
# 使用说明
需要MDD后台支持<br />前端按照uniform/xxx请求后，后台需要将uniform开头的请求ngix转发到MDD域，MDD后台处理uniform请求进行返回参照数据
<a name="LtwBw"></a>
### 使用准备

- 1. 要求容器外层增加id="yxyweb-support-container"，用于在指定dom范围内样式发挥作用，目前并不影响逻辑部分
- 2. 引入样式

例如
```http
<link href='http://u8custock-test.yyuap.com/styles/default/yxyweb-support-withReact.min.css' rel='stylesheet' type="text/css"/>
```

- 3. 引入js

例如
```html
<script src='http://u8custock-test.yyuap.com/scripts/yxyweb-support-withReact.min.js'></script>
```

- <br />
<a name="4hcKx"></a>
### 使用说明

- 指定MDD参照控件要在哪一个dom容器渲染

```http
 <div id='yourRefer' ></div>
```

- 调用cb.utils.initSupport方法在指定dom处渲染MDD参照
```javascript
getRefer=()=>{
    // modelName, model, dom, config
    const modelName = 'refer';
    const model = new cb.models.ReferModel({ cRefType:'aa_dutyclassref'});
    const dom = document.getElementById('yourRefer');
    const config = {
      modelconfig:{
        cShowCaption:'测试参照'
      } 
    } 
    cb.utils.initSupport(modelName, model, dom, config);
  }
```

- initSupport参数说明
  - **modelName**:参照类型，可由以下几种类型
    - 'filter' 查询模块
    - 'refer' 常用的参照里面有树参照、表参照、树表参照
    - 'listrefer' 列表combox
    - 'treerefer' 树combox
  - **model**：参照对应的viewmodel
    - referModel参数说明。类型为object。

                  {<br />   cRefType:当前参照类型,<br />   multiple:是否可以多选<br />}

  - **dom**：当前参照对应的dom，通常是一个类如div的容器
  - **config**：传入referUI组件相关参数

             {<br />modelconfig: {<br />cShowCaption:参照的label信息<br />}<br />}


<a name="f7PEz"></a>
### 具体示例代码

```javascript
import React, { Component } from "react";
const cb = window.cb;
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.getRefer();
  }
  getRefer=()=>{
    // modelName,model, dom, config
    const modelName = 'refer';
    const model = new cb.models.ReferModel({ cRefType:'aa_dutyclassref'});
    const dom = document.getElementById('myRefer');
    const config = {
      modelconfig:{
        cShowCaption:'测试参照'
      } 
    } 
    cb.utils.initSupport(modelName, model, dom, config);
  }
  render() {
   
    return <div >
            <div id='myRefer' ></div>
      
          </div>;
  }
}
```
<a name="z20u9"></a>
# 
<a name="AQyuJ"></a>
# 使用统一参照接口
如果当前系统允许跨域调用，则可以在前端直接调用统一参照接口<br />由于框架内默认走的uniform接口，所以需要执行执行请求的url，而不适用默认接口地址。<br />方法如下：
```javascript
//忽略uniform
cb.rest.AppContext.ignoreuniform = true
//指定新的host + 二级路由
cb.rest.AppContext.serviceUrl = "https://xxx.xxxx.com/yourpath"


```