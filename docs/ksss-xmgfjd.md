# 项目规范解读

<a name="fc97649e"></a>
## 整体规范

以下为 UCF-WEB 中脚手架整体结构规范说明：

```bash
.
├── LICENSE												# 开源协议
├── README.md											# 项目脚手架说明
├── docs													# 开发业务说明文档目录
│   └── README.md
├── package.json									# npm packages 依赖包
├── ucf-apps											# 【目录名不可修改】微服务应用根目录，用于加载微服务
│   ├── demo-app-org							# 组织管理示例
│   └── demo-app-staff						# 同上不在阐述
├── ucf-common										# 【目录名不可修改】公共组件、样式、图片、字体等静态资源存放
│   ├── README.md									# 描述公共组件等说明
│   └── src
├── ucf-publish										# 【目录名不可修改】构建出来的静态资源
│   ├── demo-app-org							# 组织管理示例
│   └── demo-app-staff
└── ucf.config.js									# ucf 核心配置文件
```

<a name="4dfff12d"></a>
### 特别说明

一级文件夹归类说明（以下三个文件目录为框架内置，不可修改）：

| 目录 | 说明 |
| --- | --- |
| ucf-apps | 各个微应用子目录 |
| ucf-common | 项目级公共资源，如公共组件、样式、资源、函数库等。 |
| ucf-publish | 构建出来的静态资源文件，用于部署和集成 |


<a name="8e5d1149"></a>
## 两种微应用目录结构说明

遵循【功能优先】的原则，区分不同应用类型。

<a name="830f4dc5"></a>
### MPA 微应用目录

```bash
MPA
├── README.md
├── package.json
└── src
    ├── app.js
    ├── app.less
    ├── components
    │   ├── App
    │   │   ├── index.js
    │   │   └── index.less
    │   ├── OrgModal
    │   │   └── index.js
    │   └── SearchArea
    │       ├── index.js
    │       └── index.less
    ├── container.js
    ├── index.html
    ├── model.js
    └── service.js

5 directories, 13 files
```

<a name="c70a8c9b"></a>
### SPA 微应用目录

```
SPA
├── README.md
├── package.json
└── src
    ├── app.js
    ├── app.less
    ├── index.html
    └── routes
        ├── contact
        │   ├── components
        │   │   └── IndexView
        │   │       ├── index.js
        │   │       └── index.less
        │   ├── container.js
        │   ├── model.js
        │   └── service.js
        ├── home
        │   ├── components
        │   │   └── IndexView
        │   │       ├── index.js
        │   │       └── index.less
        │   ├── container.js
        │   ├── model.js
        │   └── service.js
        └── index.js

10 directories, 20 files
```


<a name="d5a6cbdf"></a>
## 详细说明

<a name="7bd6e4a0"></a>
### 默认支持 alias 别名
按照原有的开发规范，我们统一需要拆分出来的公共组件、样式、资源图片等资源，需要放到`ucf-common/src`文件夹下，可以在里面建立自己的文件夹归档，默认的已经划分为`components`、`static`、`styles`、`utils`等，对应的alias内置了一些默认别名如下：

| alias 别名 | 对应的实际路径 |
| --- | --- |
| ucf-apps | ucf-apps/ |
| ucf-common | ucf-common/src/ |
| components | ucf-common/src/components/ |
| static | ucf-common/src/static/ |
| utils | ucf-common/src/utils/ |

_**以上别名如果不够，可在 ucf.config.js 中的alias字段中进行扩展。**_<br />_
<a name="d66f83fa"></a>
### 构建后的资源规范（ucf-publish目录）

构建完成后的目录：

```bash
ucf-publish
├── demo-app-org
│   ├── index.css
│   ├── index.html
│   └── index.js
└── demo-app-staff
    ├── index.css
    ├── index.html
    └── index.js

2 directories, 6 files
```


微应用相关规范和介绍访问 [微应用类型](https://www.yuque.com/ucf-web/book/lxmpg1)
