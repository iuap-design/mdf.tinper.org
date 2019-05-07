# MPA 微应用规范

<a name="dbd98ab0"></a>
## 目录规范释义

```
singleApp
├── README.md                 # 针对本模块说明文件
├── package.json              # 描述本模块开发版本，不用于npm发包描述
└── src                       # 开发源码目录
    ├── app.js                # 入口加载文件
    ├── app.less              # 样式文件
    ├── components            # 拆分组件文件夹
    │   ├── App               # 业务功能组件
    │   │   ├── index.js      # 组件
    │   │   └── index.less    # 组件样式
    │   ├── OrgModal          # 业务功能组件
    │   │   └── index.js      # 组件
    │   └── SearchArea        # 业务功能组件
    │       ├── index.js      # 组件
    │       └── index.less    # 组件样式
    ├── container.js          # 容器类组件
    ├── index.html            # 访问页面模板
    ├── model.js              # 模型类
    └── service.js            # 请求服务类
```

