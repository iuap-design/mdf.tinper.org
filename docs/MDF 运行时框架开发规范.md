
<a name="vNcYF"></a>
## 运行时框架目录规范

```bash
packages/mdf-app
├── docs
│   └── mdf-intro.md
├── manifest.development.json
├── manifest.production.json
├── package.json
├── pm2.json
├── src
│   ├── client
│   │   ├── business					# 业务扩展脚本(JS)
│   │   │   └── common
│   │   ├── index.jsx
│   │   └── styles            # 业务样式代码
│   │       └── default
│   ├── common
│   │   ├── extends				# 扩展UI元数据中的控件类型（React 组件方式)
│   │   │   ├── basic         # 基础控件扩展
│   │   │   ├── formatter     # 格式化
│   │   │   ├── home
│   │   │   ├── index.jsx
│   │   │   ├── meta          # 扩展容器组件
│   │   │   ├── modal         # 扩展模态框
│   │   │   ├── popover
│   │   │   ├── portal         # 扩展页面
│   │   │   └── toolbar
│   │   ├── config.env.js			 # 全局环境变量配置
│   │   ├── config.comp.js		 # 组件交互扩展入口registerMetaComp
│   │   ├── registerMetaComp.js # 注册扩展组件
│   │   ├── pages
│   │   │   └── demoRouter
│   │   └── redux
│   │       ├── Isomorph.jsx
│   │       ├── reducers.jsx
│   │       ├── routes.jsx
│   │       └── store
│   └── server									# Node Server 相关
│       ├── controllers
│       │   ├── amap.js
│       ├── env
│       │   └── index.jsx
│       ├── index.js
│       ├── middlewares
│       │   └── viewhook
│       └── router.js
├── static											# 无需编译的静态资源
│   ├── scripts
│   │   ├── font.js
│   │   ├── vendor.js
│   │   ├── vendor.js.map
│   │   ├── vendor.min.js
│   │   ├── vendor.min.js.map
│   │   └── yonyou-yyy.js
│   ├── styles
│   └── ueditor
│       
├── webpack.dev.config.js				# 基于Webpack的前端编译脚本
├── webpack.dll.config.js
├── webpack.package.config.js
└── webpack.prod.config.js

45 directories, 50 files
```




