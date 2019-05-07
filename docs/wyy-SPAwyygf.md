# SPA 微应用规范

<a name="ddcc6b34"></a>
## 项目目录规范释义

```
spaApp
├── README.md                       # 针对本模块说明文件
├── package.json                    # 描述本模块开发版本，不用于npm发包描述
└── src                             # 开发源码目录
    ├── app.js                      # 入口加载文件
    ├── app.less                    # 样式文件
    ├── index.html                  # 访问页面模板
    └── routes                      # 路由与组件存放
        ├── contact                 # 路由页面
        │   ├── components          # 拆分组件目录
        │   │   └── IndexView       # 首页目录
        │   │       ├── index.js    # 入口
        │   │       └── index.less  # 样式
        │   ├── container.js        # 容器类组件
        │   ├── model.js            # 模型类
        │   └── service.js          # 请求服务类
        ├── home                    # 同上
        │   ├── components
        │   │   └── IndexView
        │   │       ├── index.js
        │   │       └── index.less
        │   ├── container.js
        │   ├── model.js
        │   └── service.js
        └── index.js
```


