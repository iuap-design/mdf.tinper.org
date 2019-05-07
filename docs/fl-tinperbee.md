# 使用 tinper-bee 组件库

ucf-web 内置组件库，无需单独安装，默认集成Tinper-Bee，如果想单独安装可以参考如下：

<a name="65125624"></a>
## 安装组件库

```bash
npm install tinper-bee --save
```

<a name="60110be2"></a>
## 使用组件库

```javascript
import { Button } from 'tinper-bee';

class App extends Component {
  handlerClick = (e) => {
    console.log(e);
  }
  render() {
  	return (<Button colors="success" onClick={this.handlerClick} >按钮</Button>)
  }
}
```


[`tinper-bee`](http://bee.tinper.org/)[ ](http://bee.tinper.org/)是一套基于 `React.js` 的开源组件库，它从丰富的企业级中后台应用场景中实战沉淀而来，为复杂应用的快速开发提供一致性 `UI` 解决方案。

更加详细的组件开发文档请访问：[http://bee.tinper.org/](http://bee.tinper.org/)

> 脚手架默认已经集成了该组件库


<a name="5ec85b7c"></a>
## 如何获取组件
> 推荐使用npm管理整个项目工程化


使用如下命令安装：

```bash
npm install tinper-bee --save
```

<a name="CDN"></a>
## CDN
组件也提供了CDN方式使用(不推荐)

CSS:

```html
<link href="//design.yonyoucloud.com/static/tinper-bee/[版本号]/assets/tinper-bee.css">
```

JS:

```html
<script src="//design.yonyoucloud.com/static/tinper-bee/[版本号]/build/tinper-bee.js"></script>
```

<a name="ecff77a8"></a>
## 使用

```jsx
import React,{ Component } from 'react';
import { Button,Panel } from 'tinper-bee';
import 'tinper-bee/assets/tinper-bee.css';
import './index.less';

export default class Example extends Component{
  constructor(props) {
   super(props);
 }
  render(){
    return (
    <Panel>
      hello world
      <Button colors="info">click me</Button>
    </Panel>)
  }
}
```


