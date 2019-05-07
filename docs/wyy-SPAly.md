# 路由

目前提供了两种微应用模板【singleApp】、【spaApp】，这里所说的路由就是针对spaApp来讲的，首先切换到开发根目录执行命令：

```bash
# 按照提示输入微应用名称、选择spaApp即可
ucf new app
```

要明确路由对应的组件页面是哪个后，修改 `ucf-apps/demo/src/routes/index.js` 路由表

```jsx
import React from "react";
import { Route } from "mirrorx";
import { ConnectedHome } from "./home/container";
import { ConnectedContact } from "./contact/container";


export default () => (
    <div className="route-content">
        <Route exact path="/" component={ConnectedHome} />
        <Route exact path="/home" component={ConnectedHome} />
        <Route exact path="/contact" component={ConnectedContact} />
    </div>
);
```

可以看出，模板带了三个路由，分别是 `/` (默认首页) 、`home`、`contact` ，它们对应了三个组件，这三个组件实际上是三个页面级别的组件，然后在页面上进行组件拆分到routes文件夹里面，之间的文件归属关系如下：

```bash
routes
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

6 directories, 11 files
```

其中里面的 `IndexView` 就是默认首页组件存放，其余是拆分出来的组件，`container` 、`model` 、 `service` 和前篇介绍的开发方式是一样的。<br />合理的拆分组件、布局页面组件和路由之间的关系才能清晰好维护。
