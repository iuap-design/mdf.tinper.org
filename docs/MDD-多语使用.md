<a name="ace32fc8"></a>
## 我们采用的多语方案

1. 一套源码，通过多套静态资源进行加载。
1. 在静态资源、翻译文档中可以穿插变量、利用 Underscore 模版引擎的－template进行替换。
1. 在渲染之前还可以做自定义的规则渲染。

<a name="7d3e85cc"></a>
## 前端多语

<a name="fd421519"></a>
#### 1. 前端静态资源多语

1. 静态资源的多语，通过cli 工具提取中文，把中文替换成 api 的方式。
```javascript
转换前
    
    let _title = "我是变量的多余!";
    
    转换后
    
    let _title = `${lang.template("我是变量的多余!")}`;
```

2. 在使用时，通过http://ip:8080?_lang=zh_CN/zh_TW/en_US 进行多语切换、cookie均可。
2. 转换后的 目录及文件说明
> 注: 如果cli工具做的足够强大，可以维护一个工程，需要的时候直接执行 lang --sync 把文件都同步一遍即可。 否则可以先切换一个分支，开发多语的版本。


mdf 2.0的版本目录结构如下:

```javascript
packages
│
├─mdf-app
│    └── src
│        └── pack.js
├─mdf-cube
│      cub.js  cb.lang = lang;
│
└─
```

> 文件内容参考具体代码


4. 提供 cli 工具，命令如下。
| cli命令 | 功能 | 备注 |
| --- | --- | --- |
| lang init | 初始化，提取中文文件 |  |
| lang sync | 拷贝当前src文件,复制一份和src同级目录，并进行字符、多语替换 {lang.template("请输入您要查找的组织关键字…")} |  |
| lang export | 把提取的文件导出成excel文件 |  |


3. cli 工具需要支持三种类型的替换,通过 readline 读取判断当前变量的语意，必须是全自动化工具。

```javascript
let _title = "我是变量的多余!";
    
     <div title="你好,我是属性的多语">
            欢迎使用 MDD 模型驱动 !!! 
        <p>{_title}</p>
      </div>,
```

cli 转换后的代码

```javascript
let _title = {`${lang.template("我是变量的多余!")}`};
   
    <div 
    title={`${lang.template("我是变量的多余!")}`}
    >
       {lang.template("欢迎使用 MDD 模型驱动 !!! ")}
   <p>{_title}</p>
 </div>,
       
let _title = <FormattedMessage id="js.com.Ale.0001" defaultMessage="温馨提示" />;
```

<a name="765f277c"></a>
#### 1. 单据中多语录入

在单据中直接调用 ac-input-locale 组件。

> 目前该组件需要优化


```javascript
$ ynpm install ac-input-locale --save-dev

引入

import AcInputLocale from 'ac-input-locale';

样式引入

import 'ac-input-locale/dist/index.css';

https://tinper-acs.github.io/ac-input-locale/
```

<a name="c8e58a34"></a>
#### MDF 2.0 多语升级文档

1. 利用java文件提取中文、替换源码文件。抽取后check 一下。
1. 组织 pack.json 文件，包含需要的语种,放到mdf-app/src/web/pack.json 下。
1. mdf-app/src/web/client/index.jsx 文件中天下如下代码
```javascript
require('@babel/polyfill')
....

const cb = require('@mdf/cube/lib/cube')
cb.lang.init();
console.log(" ************************多语加载成功!***************************");
console.log(cb.lang.template("YS_FI_FP_0000032052"));
```

4. mdf-app/src/web/server/index.js
```javascript
if(process.env.LANG && process.env.LANG == 'true'){
```

let cb = {};<br />cb.lang = require('@mdf/cube/lib/lang');<br />cb.lang.setLanguage(require('../pack'),"zh-CN");<br />console.log(" server-多语加载成功!***");<br />console.log(cb.lang.template("YS_FI_FP_0000033576"));<br />global.cb = cb;<br />}<br />```

4. webpack.config
```javascript
new webpack.DefinePlugin({
   
  'process.env.__LANG__': process.env.LANG, 
}),
```

5. package.json  找到对应的 LANG=true 把需要的都加上
```json
"scripts": {
"_comment_main_start": "主要命令区域",
"start:web": "cross-env NODE_ENV=production SERVER_ENV=prod node bin/web/server/index.js",
"start:mobile": "cross-env NODE_ENV=production SERVER_ENV=prod node bin/mobile/server/index.js",
"debug:web": "concurrently "npm run debug:client" "npm run debug:server"",
"debug:web:ncc": "concurrently "npm run debug:client" "npm run debug:server:daily"",
"debug:mobile": "concurrently "npm run debug:mobile:client" "npm run debug:mobile:server"",
"build:web": "concurrently "npm run build:client" "npm run build:server"",
"build:mobile": "concurrently "npm run build:mobile:client" "npm run build:mobile:server"",
"_comment_main_end": "主要命令区域",
"comment_seperator": " = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ",
"_comment_other_start": "其它命令区域",
"start": "cross-env NODE_ENV=production SERVER_ENV=prod node bin/web/server/index.js",
"start:test": "cross-env NODE_ENV=production SERVER_ENV=test node bin/web/server/index.js",
"start:pre": "cross-env NODE_ENV=production SERVER_ENV=pre node bin/web/server/index.js",
"start:daily": "cross-env NODE_ENV=production SERVER_ENV=daily node bin/web/server/index.js",
"start:dev": "cross-env NODE_ENV=production SERVER_ENV=dev node bin/web/server/index.js",
"debug:client": "cross-env BABEL_ENV=development LANG=true NODE_ENV=development webpack-dev-server --progress --colors  --config webpack.config.js",
"debug:server": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=prod LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf  --inspect src/web/server/index.js",
"debug:server:daily": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=daily LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf  --inspect src/web/server/index.js",
"debug:server:test": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=test   LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf  --inspect src/web/server/index.js",
"debug:server:dev": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=dev     LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf  --inspect src/web/server/index.js",
"debug:mobile:client": "cross-env BABEL_ENV=development LANG=true MDF_TARGET=mobile webpack-dev-server --progress --profile --colors  --config webpack.config.js",
"debug:mobile:server": "cross-env BABEL_ENV=production NODE_ENV=development MDF_TARGET=mobile LANG=true  nodemon -w src/mobile/server -w src/mobile/common --exec babel-node --only=src,node_modules/@mdf  --inspect src/mobile/server/index.js",
"debug:mobile:server:daily": "cross-env BABEL_ENV=production NODE_ENV=development MDF_TARGET=mobile SERVER_ENV=daily LANG=true  nodemon -w src/mobile/server -w src/mobile/common --exec babel-node --only=src,node_modules/@mdf  --inspect src/mobile/server/index.js",
"build:mobile:client": "cross-env BABEL_ENV=production LANG=true NODE_ENV=production MDF_TARGET=mobile webpack --config webpack.config.js --colors --progress && echo '移动程序：编译完成'",
"build:mobile:server": "cross-env BABEL_ENV=production NODE_ENV=production MDF_TARGET=mobile babel src -d bin --ignore src/web/client,src/business && echo '后端程序：编译完成'",
"build:dll:dev": "cross-env NODE_ENV=development webpack --config webpack.dll.config.js",
"build:dll:prod": "cross-env NODE_ENV=production webpack --config webpack.dll.config.js",
"build:dll": "npm run build:dll:dev && npm run build:dll:prod",
"build:server": "cross-env BABEL_ENV=production NODE_ENV=production babel src -d bin --ignore src/web/client,src/business && echo '后端程序：编译完成'",
"build:client": "cross-env BABEL_ENV=production LANG=true NODE_ENV=production webpack --config webpack.config.js --colors --progress && echo '前端程序：编译完成'",
"prebuild": "npm run clean",
"clean": "rimraf ./bin",
"_comment_other_end": "其它命令区域"
}
```

```
5. @mdf 多语最新包      

```json

    "@mdf/baseui": "^2.2.2-lang.1760",
    "@mdf/cube": "lang",
    "@mdf/metaui-mobile": "^2.2.1",
    "@mdf/metaui-web": "^2.2.2-lang.1760",
    "@mdf/metaui-web-ncc": "lang",
    "@mdf/middlewares-auth": "^2.2.2-lang.1760",
    "@mdf/middlewares-log4js": "lang",
    "@mdf/plugin-meta": "lang",
    "@mdf/theme": "lang",
```