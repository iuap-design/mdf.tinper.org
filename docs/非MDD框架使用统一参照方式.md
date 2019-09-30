<a name="8t9dU"></a>
# 使用方式
非MDD框架使用统一参照方式目前有两种，一种是script引入，第二种使用mdf-refer包

<a name="1SqYM"></a>
# （1）使用script引入
<a name="O5K6D"></a>
### 使用说明
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
# （2）使用mdf-refer包
mdf-refer参照，根据mdf包中的metaui-web-ncc和cube构建出参照。
<a name="Ctyt6"></a>
### 使用说明
需要MDD后台支持<br />前端按照uniform/xxx请求后，后台需要将uniform开头的请求ngix转发到MDD域，MDD后台处理uniform请求进行返回参照数据
<a name="u4Zbn"></a>
### 目录内容

- dist

包含index.js(2.5m)和index.css(550k)。包含所有需要的内容

- lib

包含index.js（10k）和index.css(550k)。只是将源码进行转义成es5语法
<a name="17Q9O"></a>
### <br />如何使用
1.引入antd的样式和引入参照

```html
<link href="http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/antd/antd.css" rel="stylesheet" type="text/css">
```

```javascript
import 'mdf-refer/lib/index.less'
import MdfRefer  from 'mdf-refer/lib/index.js'
```

2.首先创建model对象

```javascript
let model = new cb.models.MdfReferModel({
  cRefType:'ucf-org-center.org_assets_tree_ref',
  multiple:true,//指定多选
  displayname:'name',
  valueField:'id',
  text:'ybt01__智能公司',//设置初始值
});
```

3.还可以添加方法

```javascript
let config = {};
config.modelconfig ={
  afterOkClick:this.afterOkClick
}
```

4.调用参照
```javascript
<MdfRefer modelName={'refer'} model={model} config={config} >
```
<a name="7snf9"></a>
# 
<a name="OwAs3"></a>
### 代码演示
**
**
```javascript
/**
 *
 * @title mdf-refer基础使用
 * @description 
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MdfRefer,{cb} from 'mdf-refer'
class Demo3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:{},
            selectedKeys:[],
        }
        this.model = new cb.models.MdfReferModel({
            cRefType:'ucf-org-center.bd_adminorgtreeviewref',//refcode
            multiple:true,
            displayname:'name',
            valueField:'id',
        });
        
        this.config={
            modelconfig:{
                afterValueChange:this.afterOkClick
            }
        }
    }
    
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    componentWillReceiveProps(nextProps){
    }
    afterOkClick = (data) =>{
        console.log(data);
    }
    render () {
       
        return (
            <div  className='demo'>
                <label>组织树</label> 
                <MdfRefer 
                    modelName={'refer'} model={this.model}   config={this.config} 
                /> 
            </div>
         )
    }
}
export default Demo3;
```

<a name="6mX3Z"></a>
### API（1）
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| MdfReferModel | 初始化model方法，来自于cb.models。接收的参数如下 | function | - |
| （MdfReferModel<br />参数）cRefType | 指定参照的refCode | string | - |
| （MdfReferModel参数）multiple | 指定参照单选多选 | boolean | false |
| （MdfReferModel参数）displayname | 指定参照确定后展示的字段 | string | 'name' |
| （MdfReferModel参数）valueField | 指定参照数据的主键 | string | 'id' |
| （MdfReferModel参数）text | 指定参照的初始值，并且打开参照会按照此值搜索 | string | '' |
| config | 初始化model时，传入的config，一些绑定的方法可以在这里 。接收的参数如下 | object | {} |
| （config参数）modelconfig | 指定参照的其他属性 | object |  |
| (modelconfig参数)afterOkClick | 参照确定的回调函数,data是数组格式 | function(data) | - |
| (modelconfig参数)afterValueChange | 参照值改变的回调。data是对象，有value：参照选中的数据（多选是数组，单选是对象），oldValue：之前选中的值，obj={text:'',value:'',select:{}/[]} | function(data) | - |

<a name="9pnl4"></a>
### API（2）
这里还有一堆可以使用的方法，是在model（如何使用-第一步定义的model）上挂载着很多的方法。mdf-refer参照不同于其他参照组件，组件本身上不提供过多api，主要的操作方式在第一步创建的model对象上。<br />注意：mdf-refer定义的model是来在于cb.models.MdfReferModel，不同于mdf框架中cb.models.ReferModel。但是MdfReferModel继承cb.models.ReferModel，又支持个性方法定义和修改getTitleData、setTitleData的url等。<br />方法具体参考：<br />ViewModel事件汇总：[https://www.yuque.com/gpgy5k/ucf/wnageu](https://www.yuque.com/gpgy5k/ucf/wnageu)<br />BaseModel 基类：[https://www.yuque.com/gpgy5k/ucf/oi56rx](https://www.yuque.com/gpgy5k/ucf/oi56rx)<br />ContainerModel 基类[https://www.yuque.com/gpgy5k/ucf/vgqofc](https://www.yuque.com/gpgy5k/ucf/vgqofc)
<a name="XLtUx"></a>
### 级联场景
如：选择部门之后，过滤人员参照数据。使用model上setFilter方法

```javascript
 //备注：this.modelOrg是组织参照model，this.modelApplier是人员参照model
afterValueChange = (data) =>{
        let simpleVOs = [];
        let {value,oldValue} = data;
        //参照多选返回数组，单选返回对象
        if(Array.isArray(value)){
            value.forEach((item)=>{
                let  newObj = {};
                newObj.field = 'mainJobList.org_id';//员工所属组织属性code
                newObj.op = data.length === 1 ? 'eq' : 'in';
                newObj.value1 = item.id;
                simpleVOs.push(newObj)
            })
            this.modelApplier.setFilter({
                "isExtend":true,
                "simpleVOs":simpleVOs
            })
        }else if(Object.prototype.toString.call(value) === "[object Object]"){
            let  newObj = {};
            newObj.field = 'mainJobList.org_id';//员工所属组织属性code
            newObj.op = 'eq';
            newObj.value1 = value.id;
            simpleVOs.push(newObj);
            this.modelApplier.setFilter({
                "isExtend":true,
                "simpleVOs":simpleVOs
            })
        }else{
            //点叉号清空操作
            this.modelApplier.setFilter({})
        }   
    }
```

<a name="4evpJ"></a>
# 
<a name="buUod"></a>
# 使用统一参照接口
如果当前系统允许跨域调用，则可以在前端直接调用统一参照接口<br />由于框架内默认走的uniform接口，所以需要执行执行请求的url，而不适用默认接口地址。<br />方法如下：
```javascript
//忽略uniform
cb.rest.AppContext.ignoreuniform = true
//指定新的host + 二级路由
cb.rest.AppContext.serviceUrl = "https://xxx.xxxx.com/yourpath"


```