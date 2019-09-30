<a name="124fe5a0"></a>
###                                                                                     编写：勾成图 2019-09-10
<a name="Lgtr8"></a>
### 1. 框架主要技术栈说明

- Web 前端
  - react ^v15.4.2
  - react-dom
  - react-router
  - react-redux ^5.0.2
  - react-router-redux
  - redux ^3.6.0
  - redux-logger
  - redux-thunk
  - antd
  - antd-mobile
  - antd-template
  - art-template
  - async
  - axios
  - fixed-data-table-2
- Node Server
  - koa v2.0.0
  - koa-bodyparser
  - koa-compress
  - kao-logger
  - koa-router
  - koa-static
  - lodash
  - log4js
  - art-template
  - react
  - react-dom/server
  - react-redux
  - react-router
  - react-router-redux
  - react-router
  - redux
  - redux-thunk
  - redux-logger

- 工具层
  - webpack  ^V3.3.0
  - webpack-dev-server
  - webpack-hot-middleware
  - webpack-dev-middleware
  - babel v6.10.0
  - babel-preset-env
  - babel-preset-es2015
  - babel-preset-react
  - babel-cli
  - babel-core
  - babel--runtime
  - less
  - less-loader
  - html-webpack-plugin
  - cross-env
  - eslint



<a name="jYCtT"></a>
### 2. MDF框架详细技术栈

```json
{  
  "dependencies": {
    "@antv/g6": "^3.0.4",
    "antd": "2.12.6",
    "antd-mobile": "2.1.6",
    "art-template": "^3.0.3",
    "async": "^2.0.0",
    "axios": "^0.18.0",
    "classnames": "^2.2.5",
    "cookies-js": "^1.2.2",
    "dagre": "^0.8.4",
    "echarts-for-react": "^1.4.4",
    "es6-promise": "^3.2.1",
    "fixed-data-table-2": "^0.8.12",
    "immutable": "^3.8.1",
    "invariant": "^2.2.1",
    "isomorphic-fetch": "^2.2.1",
    "js-beautify": "^1.6.3",
    "keymirror": "^0.1.1",
    "koa": "^2.0.0",
    "koa-bodyparser": "^3.1.0",
    "koa-compress": "^2.0.0",
    "koa-logger": "^2.0.0",
    "koa-router": "^7.0.1",
    "koa-static": "^3.0.0",
    "lodash": "^4.17.4",
    "log4js": "^1.0.1",
    "mkdirp": "^0.5.1",
    "moment": "^2.17.1",
    "prop-types": "^15.5.10",
    "qrcode.react": "^0.8.0",
    "ramda": "^0.26.1",
    "react": "^15.4.2",
    "react-amap": "^1.0.1",
    "react-color": "^2.10.0",
    "react-copy-to-clipboard": "^5.0.1",
    "react-countup": "^3.0.3",
    "react-dom": "^15.4.2",
    "react-draggable-tags": "^0.3.5",
    "react-loadable": "^5.3.1",
    "react-multi-crops": "0.0.10",
    "react-redux": "^5.0.2",
    "react-router": "^3.0.2",
    "react-router-redux": "^4.0.7",
    "react-signature-canvas": "^1.0.1",
    "react-touch-screen-keyboard": "^0.3.15",
    "redux": "^3.6.0",
    "redux-logger": "^2.6.1",
    "redux-thunk": "^2.1.0",
    "request": "^2.81.0",
    "u8c-components": "latest",
    "uuid": "^3.0.1",
    "warning": "^3.0.0",
    "winston": "^2.2.0",
    "yardformdata": "^1.0.9"
  },
  "devDependencies": {
    "autoprefixer": "^6.3.7",
    "babel-cli": "^6.10.1",
    "babel-core": "^6.10.4",
    "babel-loader": "^6.2.4",
    "babel-plugin-import": "^1.2.1",
    "babel-plugin-module-resolver": "^2.7.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.9.1",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.11.1",
    "babel-preset-react-hmre": "^1.1.1",
    "babel-preset-stage-1": "^6.5.0",
    "babel-runtime": "^6.26.0",
    "case-sensitive-paths-webpack-plugin": "^2.0.0",
    "cross-env": "^2.0.0",
    "css-loader": "^0.23.1",
    "eslint": "^3.15.0",
    "eslint-plugin-react": "^6.9.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^0.9.0",
    "generate-asset-webpack-plugin": "^0.3.0",
    "html-webpack-plugin": "^2.30.1",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "nodemon": "^1.11.0",
    "postcss-loader": "^2.1.1",
    "rc-input-number": "3.6.7",
    "rc-tree": "1.7.1",
    "rc-tree-select": "1.10.7",
    "rimraf": "^2.5.4",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.8",
    "webpack": "^3.3.0",
    "webpack-bundle-analyzer": "^3.3.2",
    "webpack-dev-middleware": "^1.8.4",
    "webpack-dev-server": "^2.6.1",
    "webpack-hot-middleware": "^2.12.1"
  },
  "peerDependencies": {
    "babel-cli": ">=6.10.1"
  },
  "engines": {
    "node": ">=6.2.2",
    "npm": ">=3.10.3"
  }
}
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />