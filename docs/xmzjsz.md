# 项目最佳实践

<a name="UpRYt"></a>
## 前言
本文主要描述对 `ucf-web前端框架使用手册` 的指导阅读，属于项目最佳实践的快速概览，其他具体的项目管理办法会在后续逐步添加完善。<br />用友云平台战略项目交付团队
<a name="GvkWz"></a>
## 第一章 构建前端工程

<a name="Ysimi"></a>
### 1.1 脚手架

现行的项目脚手架我们推荐使用 ucf-web 微前端框架，详细内容请查看使用手册 之 [快速上手](https://www.yuque.com/ucf-web/book/use) 目录下内容。
<a name="KFevs"></a>
### 1.2 依赖包（package.json）

实行统一管理原则，即：

  1. 禁止私自添加依赖工具，由技术管理员统一提供依赖包，和依赖版本。
  1. 固化业务依赖包，例如 UI 组件库必须固化到某一个版本，禁止私自升级版本。具体实现办法是去除package.json版本号前面的符号。
> 同时为防止规则僵化带来的开发进度受阻，实行谁使用谁验证的原则，即在没有通过审核或验证的情况下，实际的开发人员可以自己验证需要依赖的工具包，若符合业务即可通过管理员提交至 git 仓库。



<a name="eki5J"></a>
## 第二章 代码规范

推荐使用[用友云前端开发手册](https://www.yuque.com/ucf-web/book/rdewg0)，在项目开发期间需严格遵守规范，这里着重强调[ReactJS的开发规范](https://www.yuque.com/ucf-web/book/rdewg0#hgugzi)，对于ReactJS的基础学习请阅读[ReactJS基础](https://www.yuque.com/ucf-web/book/dn1kbm)。

<a name="VcIqG"></a>
### 2.1 JavaScript

对于基础比较薄弱的开发人员，需严格执行[用友云前端开发手册第三章](https://www.yuque.com/ucf-web/book/rdewg0#1hbdov)和[第四章](https://www.yuque.com/ucf-web/book/rdewg0#iE0BQ)之约定，同时参考[ReactJS基础](https://www.yuque.com/ucf-web/book/dn1kbm)。<br />

<a name="fPAl0"></a>
#### 2.1.1 命名规范

  - 变量、方法遵守小驼峰。
  - 组件遵守ReactJS组件命名规约使用大驼峰。
  - 需识名达意，禁止使用弱命名或无意命名。

<a name="MSKxf"></a>
#### 2.1.2 修饰符使用 let & const

语义化约束，禁止平凡使用 const 修饰面量，方法体内部除明确在业务逻辑上不可修改，而不是没有修改操作的才可以使用 const 修饰。其他可使用的场景有：

1. 缓存 this
1. 设置外部常量
1. 函数化组件

<a name="ua8Qj"></a>
#### 2.1.3 组件定义

1. 组件通用写法

```javascript
/* 订单表格的查询面板[文件功能描述]
 * @Author: [作者名](联系方式)
 * @Date:  	[创建时间]
 * @Last Modified by:   [作者名]
 * @Last Modified time: [最后修改时间]
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import classnames from 'classnames';

//业务组件不强制要求使用状态声明
const propTypes = {
    back: PropTypes.bool,
    title: PropTypes.string.isRequired
};

const defaultProps = {
    back: false,
    title: ''
};

// 若存在状态判断的样式修改，强制要求使用 classnames 包做处理
const headerStyle = classnames({
    'title': true,
    'title-develop': true
});

// 命名规范可参考规则：[业务名] | [逻辑功能名] | [视觉效果名]
// [业务名]：OrderGridSreachPanel
// [逻辑功能名]：SreachPanel
// [视觉效果名]：ExpandFormPanel
// 采用优先级： [业务名] > [逻辑功能名] > [视觉效果名]
class SreachPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row className={headerStyle}>
            </Row>
        )
    }
}
SreachPanel.propTypes = propTypes;
SreachPanel.defaultProps = defaultProps;
export default SreachPanel;

```

2. 注意规范

- 需在文件开始描述组件功能或需求，以及编写人员的信息，可采用以下格式：

```javascript
/* [文件功能描述]
 * @Author: [作者名](联系方式)
 * @Date:  	[创建时间]
 * @Last Modified by:   [作者名]
 * @Last Modified time: [最后修改时间]
 */
```

- 尽可能的使用 `PropTypes` 做组件的属性预判，业务组件中可不做处理，common 下的尽量使用。
- 使用 `classnames` 做样式（className）包装。
- 组件的命名规范可参考规则：[业务名] | [逻辑功能名] | [视觉效果名]，例如：
  1. [业务名命]：OrderGridSreachPanel
  1. [逻辑功能名]：SreachPanel
  1. [视觉效果名]：ExpandFormPanel

采用优先级： [业务名] > [逻辑功能名] > [视觉效果名]<br />

<a name="SPAt4"></a>
#### 2.1.4 函数化组件

同通常对于需通过 export 的组件我们要求使用 function 修饰。对于组件上下文使用的函数化组件我们要求使用 const 修饰。

```javascript
  //场景1 需通过 export 的组件我们要求使用 function 修饰
  function Panel (props){
      return <div />
  }
  export { Panel };
 
 	//场景2 对于组件上下文使用的函数化组件我们要求使用 const 修饰。
  const Button = (props) => <div />
  class Panel extends Component {
  	render() {
      return <Button />
    }
  }
```

<a name="y0k1I"></a>
#### 2.1.5 通用组件（common）

```
目录结构
├── ucf-common
    ├── components
    │		├── Button	
    │  			├── index.js
    │ 	  	├── index.less
    │     	└── README.md
    └── README.md
```

- ucf-common/components/Button/index.js 文件

组件的js写法参考上一条

- ucf-common/components/Button/index.less 文件

```less
//采用上下文做约束，命名规范为
// .[项目名]-common-[组件名]

.baseorder-common-button{
}
```

- ucf-common/components/Button/README.md

```markdown
# 通用按钮组件 [需要描述组件名称]

>通用项目及按钮组件，可实现添加默认的点击效果 [描述组件功能]

## 使用示例 [描述使用示例]

<Button />

## API [描述重要API]
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否

```

- ucf-common/components/README.md

```markdown
# IUAP通用组件 [组件库适用项目描述]
> 此通用组件库适用 IUAP 项目，组件内部业务相关只适配当前工程[适应场景描述]

## 当前版本1.0 [若使用了版本控制需再次描述版本]
	- [新增] 按钮组件
  -	[修复] 一些错误
## 通用组件说明
	- Button 通用项目及按钮组件，可实现添加默认的点击效果请参考(Button Api)[./components/Button/README.md]
## 历史版本
	- 1.0 添加Button组件
  - 0.1 创建组件库
```

**其他说明：若同一个业务组件的文件下需拆分组件可按照其对应的功能名命名，而非命名为 index.js**<br />**
<a name="kvJFx"></a>
### 2.2 CSS

默认使用 *.less 格式，禁止使用 sass、stylu或其他格式，在一定情况下使用 *.css 格式。

```less
//采用上下文做约束，命名规范为
// .[项目名]-[模块名]-[组件名]

.baseorder-ordergrid-button{
}
```

<a name="atJBK"></a>
## 第三章 项目结构

请参考 ucf-web 微前端框架使用手册 之 [项目规范解读- MPA 微应用目录](https://www.yuque.com/ucf-web/book/gv978w#830f4dc5)<br />

<a name="Ls5E6"></a>
## 第四章 常见问题

请参考 ucf-web 微前端框架使用手册 之 [常见问题](https://www.yuque.com/ucf-web/book/cg726e)
