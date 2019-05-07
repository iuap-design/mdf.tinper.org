# 项目配置说明

<a name="ac8bdcb6"></a>
## 1. 特性

ucf-web 微前端工程主要是通过 `[ucf-scripts](https://github.com/iuap-design/ucf-web/tree/master/packages/ucf-scripts)` 工具去执行项目的运行和构建，它支持 ES 最新语法，包括注解、async、await等，并将less、babel7、webpack4、autoprefixer、postcss、代理、静态服务等最新的主流前端技术栈集合来实现项目的工程化能力。

<a name="898d6f2e"></a>
## 2. 配置文件

UCF微前端工程核心配置文件只有一个 `ucf.config.js` ，下面对配置文件具体说明。

> **文件中部分不使用的配置属性可以将其删除。**

**
```javascript
module.exports = () => {
    return {
      	context:"", // 上下文对象
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,

        // 启动这两个模块，不启动调试，关闭构建
        bootList: [
            "demo-app-org",
            "demo-app-staff"
        ],
        // babel presets
        babel_presets: [
            //require.resolve('@babel/preset-react')
        ],
        // babel plugins
        babel_plugins: [
            [require.resolve("babel-plugin-import-bee"),
            {
                "libraryName": "tinper-bee"
            }]
        ],
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    // 与下方url一致
                    "Referer": "http://iuap-meger-demo.test.app.yyuap.com"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap'
                ],
                // pathRewrite: {
                //     '^/api/old-path': '/api/new-path', // rewrite path
                //     '^/api/remove/path': '/path' // remove base path
                // },
                url: 'http://iuap-meger-demo.test.app.yyuap.com'
            }
        ],
      	// 静态托管服务
        static: 'ucf-common/src/static',
        // 是否展开静态引用资源
        res_extra: true,
        // 构建资源是否产出SourceMap，默认开启
        open_source_map: true,
      	// CSS loader 控制选项
        css: {
            modules: false
        },
        // 全局环境变量
        global_env: {
            GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo"),
        },
        // 别名配置
        alias: {
            //'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
        },
        // 构建排除指定包
        externals: {
            //'tinper-bee': 'TinperBee'
        },
      	// 加载器Loader
        loader: [],
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}
```

<a name="5ea25418"></a>
## 3. API
| 配置项 | 说明 | 默认值 | 可选值 | 备注 |
| --- | --- | --- | --- | --- |
| bootList | 启动、构建入口配置，true表示所有模块全部启用，数组参数按需模块使用 | true | `true`,`['app-name','app-demo']` | 一般默认开启所有模块的调试和构建，低配置机器或者只需要开发一块模块的话可以选择性的去配置单独启动 |
| proxy | 开发调试阶段的代理服务配置 | [] | `enable:true`是否有效代理,false表示关闭. `headers:{}`设置代理请求的消息头. `router:['/iuap','wbalone']`. `url:'proxy.example.com'`. 本地请求代理对方服务器地址. `pathRewrite:{}`URL重写服务. `opts:{}`如内置配置无法满足需求，需要单独设置原生配置 [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware#options). | 数组节点可以配置多条代理服务，通过`enable`来控制启用哪个，针对一些服务器校验头信息例如：`Referer`等就需要设置，其他常规的设置工具已经内置，代理路由`router`表示设置的几个路由访问后会代理到对方服务器上，`url`就是对方服务器地址 |
| global_env | 程序内公共变量 | null | 同webpack4 { key : value } | 接收K、V格式如：{GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo")} |
| alias | 别名 | null | 同webpack4 {key : value} | 接收K、V格式如：{'ucf-apps': path.resolve(__dirname, 'ucf-apps/')} |
| externals | 排除指定的包用外部变量代理提升打包性能 | null | 同webpack4 { key : value } | 接收K、V格式如：{'tinper-bee': 'TinperBee'} |
| loader | 内置加载器无法处理需要单独去设置处理 | [] | 同webpack4 loader |  |
| devPlugins | 开发环境加载的插件 | [] | 同webpack4 plugin | 开发阶段使用的插件 |
| buildPlugins | 生产环境加载的插件 | [] | 同webpack4 plugin | 生产阶段使用的插件 |
| open_source_map | 构建资源生产环境的时候产出sourceMap | true | true,false | 只是在build的时候才会生效 |
| css | css loader的options | undefined | - | 具体参考https://www.npmjs.com/package/css-loader |
| context | 上下文对象 | - | - | 在项目后添加此路径 |
| static | 静态托管服务 | - | - | 加载本地http服务 |
| res_extra | 展开静态打包资源 | false | true,false | 优化vendor、提取images、fonts等 |
| babel_presets | babel presets | undefined |  | babel-presets相关 |
| babel_plugins | babel plugin | undefined |  | babel 使用的插件 |
| scan_root | 自定义文件夹作为扫描微应用入口 | undefined |  | 原则上是按照./自定义目录/*/src/app.js扫描 |
| dist_root | 输出自定义文件夹 | undefined |  | - |

<a name="6cc7906a"></a>
## 4. 详细说明
<a name="context"></a>
### context
脚手架输出的上下文字段

```bash
/ucf-publish/context/demo1/index.js
```

<a name="bootList"></a>
### bootList
启动控制器，用于设置启动哪些微应用，可以单独启动某一处，也可以启动所有

```javascript
// 启动所有的微应用
bootList: true
```

```javascript
// 单独启动demo1、demo2
bootList: [
  "demo1",
  "demo2"
]
```

<a name="proxy"></a>
### proxy
用于设置开发阶段的代理服务（生产构建发布无效），基于 [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) 二次开发，可以使用默认参数快速使用，也可以使用原生`options`参数传入给中间件

```javascript
// 基础使用代理
proxy: [
  {
    // 启用、禁用该条规则
    enable: true,
    // 请求代理服务的消息头
    headers: {
      "Referer": "https://mock.yonyoucloud.com"
    },
    //本地路由代理到远端
    router: [
      '/mock'
    ],
    url: 'https://mock.yonyoucloud.com'
  }
]
```

启动调试服务后，本机开启：[http://127.0.0.1:3000/mock](http://127.0.0.1:3000/mock) 代理服务。例如访问：[http://127.0.0.1:3000/mock/843/basic](http://127.0.0.1:3000/mock/843/basic) 服务，代理会访问对方的主机服务为：[https://mock.yonyoucloud.com/mock/843/basic](https://mock.yonyoucloud.com/mock/843/basic)


实际上开发过程中，我们使用的代理服务并不是那么顺利，有的时候后端的接口会随时改变，那么前端就要对接着改变，这样无疑是增大了前端工作量，针对这类问题，代理服务也有对应的对策，继续往下看

```javascript
// 使用pathRewrite来改写我们请求的代理路由
proxy: [
  {
    // 启用、禁用该条规则
    enable: true,
    // 请求代理服务的消息头
    headers: {
      "Referer": "https://mock.yonyoucloud.com"
    },
    pathRewrite: {
      '^/mock/api' : '/new/api'
    },
    //本地路由代理到远端
    router: [
      '/mock'
    ],
    url: 'https://mock.yonyoucloud.com'
  }
]
```

可以看出，增加`pathRewrite`字段，`key`代表是我们本地要访问的代理路由，`value`是远端服务器被解析转换的路由，这样当我们访问了[http://127.0.0.1:3000/mock/api/842/action](http://127.0.0.1:3000/mock/api/842/action)后，会被解析为[https://mock.yonyoucloud.com/new/api/842/action](https://mock.yonyoucloud.com/new/api/842/action)<br />当访问正确后控制台会显示如下信息：

```bash
[HPM] Rewriting path from "/mock/api" to "/new/api"
[HPM] GET /mock/api ~> https://mock.yonyoucloud.com
[HPM] Rewriting path from "/mock/api" to "/new/api"
[HPM] GET /mock/api ~> https://mock.yonyoucloud.com
[HPM] Rewriting path from "/mock/api" to "/new/api"
[HPM] GET /mock/api ~> https://mock.yonyoucloud.com
[HPM] Rewriting path from "/mock/api" to "/new/api"
[HPM] GET /mock/api ~> https://mock.yonyoucloud.com
```

除了上面快速使用外，如达不到你的开发要求，可以使用原生中间件参数来传递，具体如下：

```javascript
// 使用opts字段来转换原生参数
proxy: [
  {
    // 启用、禁用该条规则
    enable: true,
    // 开启 http-proxy-middleware 中间件参数设置
    opts : {
      // 这里按照 https://www.npmjs.com/package/http-proxy-middleware#http-proxy-options 中options编写
    }
  }
]
```

<a name="babel_presets"></a>
### babel_presets
自定义传入让UCF加载babel presets

```javascript
// 让babel使用@babel/preset-typescript
babel_presets: [
  require.resolve('@babel/preset-typescript')
]
```

<a name="babel_plugins"></a>
### babel_plugins
自定义传入让UCF加载babel plugin

```javascript
// 启用组件库按需加载插件
babel_plugins: [
  [require.resolve("babel-plugin-import-bee"),
   {
     "libraryName": "tinper-bee"
   }]
]
```

<a name="static"></a>
### static
静态http服务，用作本地不参与import加载的资源使用，类似webpack-dev-server里的contentBase，仅仅用于开发调试，请使用正确导入资源使用

```javascript
{
	static: 'ucf-common/src/static'
}
```

<a name="res_extra"></a>
### res_extra
释放静态资源并且优化js、css

```javascript
// true 优化、false 不优化单独构建在独立文件
res_extra: false
```

开启该选项后，构建资源对比：

```bash
ucf-publish
└── demo-app-org
    ├── index.css
    ├── index.html
    └── index.js

1 directory, 3 files
```

当开启参数后：

```bash
ucf-publish
├── assets
│   └── fonts
│       ├── iconfont.2b12aa52.eot
│       ├── iconfont.454e95d8.svg
│       ├── iconfont.bed8b35e.ttf
│       └── iconfont.ee989690.woff
└── demo-app-org
    ├── index.css
    ├── index.html
    └── index.js

3 directories, 7 files
```

可以看出区别，产出了`assets`静态提取文件夹，如果是两个以上的微应用的话，效果如下：

```bash
ucf-publish
├── assets
│   └── fonts
│       ├── iconfont.2b12aa52.eot
│       ├── iconfont.454e95d8.svg
│       ├── iconfont.bed8b35e.ttf
│       └── iconfont.ee989690.woff
├── demo-app-org
│   ├── index.css
│   ├── index.html
│   └── index.js
├── demo-app-org2
│   ├── index.css
│   ├── index.html
│   └── index.js
├── vendor.css
└── vendor.js

4 directories, 12 files
```

当微应用大于两个以上，会发现做了`splitChunk`优化，提取了`vendor.css`、`vendor.js`、`assets`文件夹

<a name="open_source_map"></a>
### open_source_map
开启构建后的SourceMap功能，只针对生产构建环境有效

```javascript
open_source_map: true
```


```bash
ucf-publish
└── demo-app-org
    ├── index.css
    ├── index.html
    ├── index.js
    └── index.js.map

1 directory, 4 files
```

<a name="css"></a>
### css
传递[css-loader](https://www.npmjs.com/package/css-loader)的options

```javascript
// 开启css modules
// 更多options查询https://www.npmjs.com/package/css-loader#options
css: {
  modules: true
}
```


<a name="global_env"></a>
### global_env
项目内全局环境变量

```javascript
// 注入一个GROBAL_HTTP_CTX值为/iuap_demo
GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo")

...

// 程序内使用
const url = `${GROBAL_HTTP_CTX}/repo`
```

<a name="alias"></a>
### alias
项目依赖别名，可以把一个路径设置为别名包的形式

```javascript
alias: {
  'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
}
```

在代码中可以这样使用：

```javascript
// 使用alias
import { Apps } from 'ucf-apps';


...

// 没有使用alias
import { Apps } from '../../ucf-apps';
```

脚手架中内置了一些常用的别名，如下：

```javascript
alias: {
  'ucf-apps': path.resolve('.', 'ucf-apps/'),
    'ucf-common': path.resolve('.', 'ucf-common/src/'),
      components: path.resolve('.', 'ucf-common/src/components/'),
        static: path.resolve('.', 'ucf-common/src/static/'),
          utils: path.resolve('.', 'ucf-common/src/utils/')
}
```

<a name="externals"></a>
### externals
优化构建速度、体积，可以把我们指定的包进行排除，不参与打包构建，使用外部全局变量代替

```javascript
// 不使用npm下的node_modules/tinper-bee组件打包
// key字段代表项目内from 'tinper-bee'，value代表外部的变量
externals: {
  'tinper-bee': 'TinperBee',
  'jQuery': 'window.jQuery'
}
```

打包构建的时候会发现UCF不会把这俩包打包到我们的js里，而是使用外部的变量

<a name="loader"></a>
### loader
传入webpack4的loader参数

```javascript
// 添加TypeScript支持
loader: [{
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  ]
}]
```

<a name="devPlugins"></a>
### devPlugins
调试模式的插件传入

```javascript
// 调试模式添加进度条加载插件

const webpack = require('webpack');
...
devPlugins: [
	new webpack.ProgressBar()
]
```

<a name="buildPlugins"></a>
### buildPlugins
生产模式的插件传入

```javascript
const webpackBundleReport = require('webpack-bundle-report')
buildPlugins: [
	new webpackBundleReport()
]
```

<a name="scan_root"></a>
### scan_root
自定义扫描微应用的文件夹，默认使用`ucf-apps`，如果你想设置自己的目录使用该参数

```javascript
// 使用自己项目内apps作为主要扫描
scan_root: 'apps';
```

扫描规则是`./${scan_root}/*/src/app.js`为有效的微应用，其他不匹配规则视为普通目录
> 注：规则匹配使用[glob](https://www.npmjs.com/package/glob)


<a name="dist_root"></a>
### dist_root
自定义输出目录，默认使用`ucf-publish`，可以设置任意系统位置

```javascript
// 设置当前根目录 dist 为输出目录
dist_root: 'dist'
```

还可以输出到指定不同级别的目录下：

```javascript
// 输出到Java开发环境下指定位置
dist_root: '../../../JavaWeb/Maven/webapp/src/static'
```

---

<a name="3337c28d"></a>
## 5. 常见问题
<a name="500bbc48"></a>
### 组件库的按需加载
当你的项目只用到了部分组件，你想要更小的打包体积的时候，我们提供了按需加载的能力

```javascript
import { Button } from 'tinper-bee';        // 这样会把整个组件库全部打包加载进来
// 转换为：
import Button from 'tinper-bee/lib/Button'; // 单独使用组件，按需使用
```

如何在UCF中使用：

```bash
# 安装babel插件
# 查看插件 https://www.npmjs.com/package/babel-plugin-import-bee

npm install babel-plugin-import-bee -D 
```

配置

```javascript
babel_plugins: [
    [require.resolve("babel-plugin-import-bee"),
    {
        "libraryName": "tinper-bee",
        "libraryDirectory": "lib"
    }]
]
```


<a name="584210b4"></a>
### 启动时默认打开指定页面

通过配置npm启动命令来实现调试运行后自动开启浏览器<br />`packages.json` scripts 命令行传入`--homepage`

```bash
  "scripts": {
    "start": "ucf-scripts start --homepage=demo-app-org",
    "build": "ucf-scripts build"
  }
```

<a name="fdd7a7f2"></a>
### proxy 代理

一般使用按照下面配置就可以使用代理服务：

```javascript
proxy: [
  {
    enable: true,
    headers: {
      "Referer": "http://iuap-meger-demo.test.app.yyuap.com"
    },
    pathRewrite:{},
    //要代理访问的对方路由
    router: [
      '/iuap'
    ],
    url: 'http://iuap-meger-demo.test.app.yyuap.com'
  }
]
```

也可以直接传入原始参数，基于 `http-proxy-middleware` 封装，参数一致，通过下面配置 `opts` 开启原始参数：

```javascript
proxy: [
  {
    opts: {
      target: 'http://www.example.org', // target host
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
      pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/api/remove/path': '/path' // remove base path
      },
      router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3000': 'http://localhost:8000'
      }
    }
  }
]
```

<a name="834c58bd"></a>
### 按需启动

默认可以使用 `bootList:true` 来加载所有微服务应用，如果仅仅加载一个或多个模块设置如下：

```javascript
// 单独启动模块
bootList: [
  "demo-app-org",
  "demo1",
  "demo2"
]
```

这样设置后的话，`ucf-web` 就会查找 `ucf-apps` 下的 `demo-app-org` 单独去运行或构建，设置该项可以大大提高启动和构建速度。

<a name="68d8fed7"></a>
### 运行出错找不到包
这类问题应该是在npm 安装、卸载的时候删除了需要的包，卸载后再安装即可

```bash
// 卸载完全版本
npm un ucf-scripts -D


// 安装全新版本
npm i ucf-scripts@latest -D
```

<a name="n3UmB"></a>
### 自定义传入Cookies
一般登录信息的Cookies都是服务器端登录自动跳转写入到我们代理本地的，但是有特殊情况，如后端给了固定有效的Cookies信息，需要我们前端在代理服务写入，如下：

```javascript
// 自定义Cookies

proxy: [
  {
    // 启用
    enable: true,
    // Header
    headers: {
      "Referer": "https://mock.yonyoucloud.com",
      // 传入自己有效的Cookies
      "cookie": "yht_username=test;yht_usertoken=token"
    },
    // 要代理访问的对方路由
    router: [
      '/mock'
    ],
    // 对方代理主机
    url: 'https://mock.yonyoucloud.com'
  }
]
```

