# 非营销云框架使用方式

<a name="M3qcE"></a>
### 使用准备
- 要求容器外层增加id="yxyweb-support-container"
- 引入样式
```
<link href='http://u8custock-test.yyuap.com/styles/default/yxyweb-support-withReact.min.css' rel='stylesheet' type="text/css"/>
```

- 引入js
```
<script src='http://u8custock-test.yyuap.com/scripts/yxyweb-support-withReact.min.js'></script>
```

- <br />
<a name="4hcKx"></a>
### 使用说明

- 定义参照dom结构

```
 <div id='refer' ></div>
```

- 调用initSupport方法渲染参照

```javascript
getRefer=()=>{
    // modelName,model, dom, config
    const modelName = 'refer';
    const model = new cb.models.ReferModel({ cRefType:'aa_dutyclassref'});
    const dom = document.getElementById('refer');
    const config = {
      modelconfig:{
        cShowCaption:'测试参照'
      } 
    } 
    cb.utils.initSupport(modelName,model, dom, config);
  }
```

- initSupport参数说明
  - modelName:参照类型，可由以下几种类型
    - 'filter' 查询模块
    - 'refer' 常用的参照里面有树参照、表参照、树表参照
    - 'listrefer' 列表combox
    - 'treerefer' 树combox
  - model：参照对应的viewmodel
    - referModel参数说明。类型为object。

                  {<br />   cRefType:当前参照类型,<br />   multiple:是否可以多选<br />}

  - dom：当前参照对应的dom
  - config：传入referUI组件相关参数

             {<br />modelconfig: {<br />cShowCaption:参照的label信息<br />}<br />}


<a name="f7PEz"></a>
### 具体代码

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
    const dom = document.getElementById('refer');
    const config = {
      modelconfig:{
        cShowCaption:'测试参照'
      } 
    } 
    cb.utils.initSupport(modelName,model, dom, config);
  }
  render() {
   
    return <div >
            <div id='refer' ></div>
      
          </div>;
  }
}
```

