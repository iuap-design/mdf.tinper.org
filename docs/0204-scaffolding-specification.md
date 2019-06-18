# 脚手架规范说明


<a name="vNcYF"></a>
## 整体说明

```bash
├── AA_零售Web端.bat
├── README.md
├── RunClient.bat
├── RunServer.bat
├── RunServerdemo.bat
├── docs
├── fast.bat
├── home
├── index.html
├── manifest.development.json				# dll，用于加快构建速度
├── manifest.production.json
├── node_modules
├── package-lock.json
├── package.json
├── pm2.json
├── src															# 业务代码目录，含Node端、web端及公共框架
├── static													# 托管的静态资源，无需编译
├── version.md
├── webpack.dev.config.js      			# 以下为基于webpack的配置文件
├── webpack.dll.config.js
├── webpack.package.config.js
└── webpack.prod.config.js
```



<a name="ESK6D"></a>
## 业务脚手架目录规范

```
.
├── client						# 领域业务代码（客户端部分）
│   ├── business
│   │       ├── AA
│   │       │   └── *.Extend.js             # 业务扩展JS逻辑
│   │       └── common
│   │           └── *.Extend.js             # 业务扩展公共JS逻辑
│   ├── index.jsx			# 为 partal 加载入口
│   └── styles
├── common						# 同构，公共代码
│   ├── components
│   ├── containers
│   ├── helpers
│   └── redux
├── server						# 领域业务代码（Node端部分）
│   ├── app.jsx				# app.jsx 为服务端主入口，使用koa2框架启动服务
│   ├── controllers		# node 业务controller
│   ├── env						# node 环境变量配置
│   ├── index.jsx			# node 启动入口，引用 app.jsx
│   └── middlewares		# node 中间件
└── yxyweb						# 公共框架代码，目前需要通过 Git 的方式直接将仓库代码下载到项目工程中
    ├── client
    ├── common
    ├── mobile
    └── server

17 directories, 3 files
```

<a name="xCPZs"></a>
## 框架目录规范

```
.
├── client
│   ├── common
│   │   ├── billmaker.js
│   │   ├── common.js
│   │   ├── cube.js													# cube sdk
│   │   ├── filterViewModel.js
│   │   ├── freeview.js
│   │   ├── index.js
│   │   ├── option.js
│   │   ├── platformManagementViewModel.js
│   │   ├── referViewModel.js
│   │   ├── roleViewModel.js
│   │   ├── voucher.js
│   │   └── voucherlist.js
│   ├── styles
│   │   └── default
│   ├── yxyweb-support-withReact.jsx				# 参照组件，api 版本
│   └── yxyweb-support-withoutReact.jsx
├── common
│   ├── components
│   │   ├── basic
│   │   ├── basic-test
│   │   ├── bill-design
│   │   ├── common
│   │   ├── grid
│   │   ├── grid-mobile
│   │   ├── grid-touch
│   │   ├── keyboard
│   │   ├── message-center
│   │   ├── meta
│   │   ├── meta-runner
│   │   ├── portal
│   ├── constants
│   │   └── ActionStatus.jsx
│   ├── helpers
│   │   ├── env.jsx
│   │   ├── formatDate.jsx
│   │   ├── polyfill.jsx
│   │   ├── prototype.jsx
│   │   └── util.jsx
│   └── redux
│       ├── addMessage.jsx
├── mobile
│   └── components
│       ├── BasicComponents
│       └── refer
└── server
    ├── controllers
    │   ├── common.jsx
    │   ├── filter.jsx
    │   ├── meta.jsx
    │   └── template.jsx
    ├── middlewares
    │   └── auth.jsx
    └── tpls
        ├── billmaker.jsx
        ├── common.jsx
        ├── index.jsx
        ├── voucher.jsx
        └── voucherList.jsx
```

