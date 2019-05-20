# 构建前端工程

<a name="B1Oxx"></a>
## 前言
本文主要对 IUAP 应用平台开发中构建前端工程中的实践做简单说明，基于 ucf-web 微服务框架构建前端工程，会描述一般场景的**前端项目结构**、**脚手架搭建配置**、**依赖包的管理方式**、和**公共组件的维护办法**。<br />
<br />用友云平台战略项目交付团队<br />

<a name="AFgDc"></a>
## 第一章 构建前端工程

<a name="GHJzL"></a>
### 1.1 脚手架

现行的项目脚手架我们推荐使用 ucf-web 微前端框架，详细内容请查看使用手册 之 [快速上手](https://www.yuque.com/ucf-web/book/use) 目录下内容。

通常情况下 `ucf-cli` 会自动生成配置文件，详细的 API 在次不做累赘，不过我们需要更具实际情况做一些调整，同时有一些比较实用的插件。

- babel-plugin-import-bee：如果使用了 `tinper-bee` 组件库，我们可以启用定制的按需加载插件，默认的配置中没有启用，启用后主要体现在构建结束后的资源文件会变小。
- babel-plugin-react-intl：这个插件主要用于 `react-intl` 国际化方案的处理，在实际开发中不用人工抽取字符ID，启用后会生成对应的 json 文件，方便提供给翻译人员参考。
- 启用res_extra：启用资源优化会在构建后产出抽取的公共资源文件，以及优化一些静态资源文件，具体参考 [ucf-script配置 之 res_extra 说明](https://www.yuque.com/ucf-web/book/zfy8x1#res_extra)
- bootList：这个配置主要控制微服务启动加载的模块，和打包是打包的模块，通常我们操作那个模块加入那个模块。

ucf.config.js 配置：
```javascript
require('@babel/polyfill');
const path = require('path');

module.exports = (env, argv) => {
    return {
        // 启动所有模块，默认这个配置， 速度慢的时候使用另外的配置    
        context:"my-demo",
        // bootList: true,
        // 启动这两个模块，启动调试、构建  
        bootList: [
             'app'
        ],
        // 代理的配置
        proxy: [
            {
                "enable": true,
                "headers": {
                    "Referer": "http://127.0.0.1:8000"
                },
                "router": ["/api"],
                "url": "http://127.0.0.1:8000"
            },
           
        ],
        // 启用用sourceMap
        open_source_map: true,
        res_extra: true,
        // CSS loader 控制选项
        css: {
            modules: false
        },
        // 全局环境变量
        global_env: {
            GLOBAL_HTTP_BASE: JSON.stringify("/api"),
        },
        // 静态资源路径
        // static: 'ucf-common/src/static', // 别名配置
        //'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
        alias: {
            components: path.resolve(__dirname, "ucf-common/src/components"),
            utils: path.resolve(__dirname, "ucf-common/src/utils"),
            static: path.resolve(__dirname, "ucf-common/src/static"),
            styles: path.resolve(__dirname, "ucf-common/src/styles"),
            "ucf-common": path.resolve(__dirname, "ucf-common/")
        },
        babel_plugins: [
            [require.resolve("babel-plugin-import-bee"),
            {
                "libraryName": "tinper-bee"
            }],
          	//这里属于多语配置只会在处理多语的时候启用
            // [require.resolve("babel-plugin-react-intl"), {
            //     "messagesDir": "./intl/"
            // }]
        ],
        // 构建排除指定包
        externals: {},
        // 加载器Loader
        loader: [],
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}
```

<a name="9gnUO"></a>
### 1.2 依赖包（package.json）

实行统一管理原则，即：

  1. 禁止私自添加依赖工具，由技术管理员统一提供依赖包，和依赖版本。
  1. 固化业务依赖包，例如 UI 组件库必须固化到某一个版本，禁止私自升级版本。具体实现办法是去除package.json版本号前面的符号。
> 同时为防止规则僵化带来的开发进度受阻，实行谁使用谁验证的原则，即在没有通过审核或验证的情况下，实际的开发人员可以自己验证需要依赖的工具包，若符合业务即可通过管理员提交至 git 仓库。


package.json 配置:
```json
{
  "name": "my-demo",
  "version": "1.0.0",
  "description": "工程实例",
  "main": "",
  "scripts": {
    "dev": "npm start",
    "start": "ucf-scripts start --homepage=index.html",
    "build": "ucf-scripts build"
  },
  "devDependencies": {
    "babel-plugin-import-bee": "^2.1.0",
    "babel-plugin-react-intl": "^3.0.1",
    "ucf-scripts": "1.1.6"
  },
  "dependencies": {
    "@babel/polyfill": "7.2.5",
    "@babel/runtime": "7.3.1",
    "ac-attachment": "0.2.9",
    "async-validator": "1.10.0",
    "axios": "^0.18.0",
    "bee-affix": "1.0.15",
    "bee-anchor": "0.0.4",
    "bee-cascader": "2.0.3",
    "bee-complex-grid": "2.0.7",
    "bee-datepicker": "2.0.28",
    "classnames": "2.2.6",
    "core-js": "^2.6.1",
    "mirrorx": "^0.2.12",
    "moment": "^2.23.0",
    "prop-types": "15.7.2",
    "query-string": "5.1.1",
    "react": "16.8.2",
    "react-dom": "16.8.2",
    "react-intl": "^2.8.0",
    "ref-multiple-table": "1.1.4-beta",
    "ref-multiple-table-ui": "1.0.4",
    "ref-tree": "1.1.3-beta",
    "ref-tree-table": "1.1.3-beta",
    "shallowequal": "1.1.0",
    "tinper-bee": "2.0.7",
    "yyuap-bpm": "0.3.26",
    "yyuap-ref": "1.1.55"
  }
}

```

<a name="qsVcN"></a>
## 第二章 项目结构

通用工程结构：
```
├── docs                          # 开发业务说明文档目录
│   └── README.md
├── ucf-apps                      # 【目录名不可修改】微服务应用根目录，用于加载微服务
│   ├── demo-app-org              # 组织管理示例
│   └── demo-app-staff            # 
│   		├── src
│		   	└── README.md         		# 模块说明
├── ucf-common                    # 【目录名不可修改】公共组件、样式、图片、字体等静态资源存放
│   ├── src
│		│   └── Button
│		│   		├── index.js          # 
│		│   		├── index.less        # 
│		│   		└── README.md         # 通用组件使用说明，必须包含使用API
│   └── README.md                 # 描述公共组件库的简单说明，其中包含发布版本，以及包含的组件列表
├── ucf-publish                   # 【目录名不可修改】构建出来的静态资源
│   ├── demo-app-org              # 组织管理示例
│   └── demo-app-staff
├── ucf.config.js                 # ucf 核心配置文件
├── package.json                  # npm packages 依赖包
└── README.md                     # 工程说明，必须包含快速上手说明
```


<a name="5yoEc"></a>
## 第三章 公共组件（common）

组件目录结构：
```
目录结构
├── ucf-common                # 公共组件、公共方法目录
    ├── components						# 公共组件
    │		├── Button						# 示例组件：Button
    │  			├── index.js			# 默认出口文件
    │ 	  	├── index.less		# 默认样式文件
    │     	└── README.md			# 组件使用文档
    └── README.md							# common 说明文档
```

- ucf-common/components/Button/index.js 文件

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

在文件顶部描述组件功能或需求，以及编写人员的信息，可采用以下格式：

```javascript
/* [文件功能描述]
 * @Author: [作者名](联系方式)
 * @Date:   [创建时间]
 * @Last Modified by:   [作者名]
 * @Last Modified time: [最后修改时间]
 */
```

- 尽可能的使用 PropTypes 做组件的属性预判，业务组件中可不做处理，common 下的尽量使用。
- 使用 classnames 做样式（className）包装。
- 多人维护的组件例如业务参照组件必须在每个构造方法前写明功能、作者等信息。格式请参考[jsdco](https://github.com/jsdoc/jsdoc)

例如：

```javascript
/**
 * 一个组件
 * @constructs
 * @param {ReactComponent} component - 待包装的组件
 * @author 妞妞
 */
```


- 组件的命名规范可参考规则 [业务名] | [逻辑功能名] | [视觉效果名]，例如：

[业务名命]：OrderGridSreachPanel<br />[逻辑功能名]：SreachPanel<br />[视觉效果名]：ExpandFormPanel<br />采用优先级 [业务名] > [逻辑功能名] > [视觉效果名]

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
```javascript
		<Button />
```
## API [描述重要API]
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否
```

- ucf-common/components/README.md

该文档主要描述组件库的一些概览信息，记录历史版本等一些指导性说明<br />

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

**其他说明：若同一个业务组件的文件下需拆分组件可按照其对应的功能名命名，而非命名为 index.js**
