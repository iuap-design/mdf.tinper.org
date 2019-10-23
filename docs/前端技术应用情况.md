<a name="124fe5a0"></a>
###                                                                                     编写：勾成图 2019-09-10
<a name="Lgtr8"></a>
### 1. 框架主要技术栈说明

- Web 前端
  - react ^v16.9.0
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
  - webpack 4.40.2
  - webpack-dev-server
  - webpack-hot-middleware
  - webpack-dev-middleware
  - babel v7.0.0
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
    "SvgIcon": "^1.0.0",
    "axios": "^0.19.0",
    "crypto-js": "^3.1.9-1",
    "css-format": "^1.0.0",
    "ignore-styles": "^5.0.1",
    "immutable": "^3.8.1",
    "isomorphic-fetch": "^2.2.1",
    "js-beautify": "^1.6.3",
    "koa": "^2.0.0",
    "koa-bodyparser": "^3.1.0",
    "koa-compress": "^2.0.0",
    "koa-logger": "^3.2.1",
    "koa-router": "^7.0.1",
    "koa-static": "^3.0.0",
    "moment": "^2.17.1",
    "qrcode.react": "^0.9.3",
    "react": "^16.9.0",
    "react-copy-to-clipboard": "^5.0.1",
    "react-dom": "^16.9.0",
    "react-multi-crops": "0.0.10",
    "react-redux": "^5.0.2",
    "react-router": "^3.2.1",
    "react-router-redux": "^4.0.7",
    "react-sortablejs": "^1.5.1",
    "redux": "^3.6.0",
    "redux-logger": "^2.10.2",
    "redux-thunk": "^2.1.0",
    "request": "^2.88.0",
    "sortablejs": "^1.10.0-rc3",
    "uuid": "^3.0.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0",
    "@babel/node": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.0.0",
    "@babel/plugin-proposal-decorators": "^7.0.0",
    "@babel/plugin-proposal-do-expressions": "^7.0.0",
    "@babel/plugin-proposal-export-default-from": "^7.0.0",
    "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
    "@babel/plugin-proposal-function-sent": "^7.0.0",
    "@babel/plugin-proposal-json-strings": "^7.0.0",
    "@babel/plugin-proposal-logical-assignment-operators": "^7.0.0",
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.0.0",
    "@babel/plugin-proposal-numeric-separator": "^7.0.0",
    "@babel/plugin-proposal-optional-chaining": "^7.0.0",
    "@babel/plugin-proposal-pipeline-operator": "^7.0.0",
    "@babel/plugin-proposal-throw-expressions": "^7.0.0",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
    "@babel/plugin-syntax-import-meta": "^7.0.0",
    "@babel/polyfill": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^6.3.7",
    "babel-loader": "^8.0.0",
    "babel-plugin-import": "^1.2.1",
    "babel-plugin-module-resolver": "^3.2.0",
    "case-sensitive-paths-webpack-plugin": "^2.0.0",
    "concurrently": "^4.1.2",
    "cross-env": "^2.0.0",
    "css-loader": "^3.2.0",
    "css-sourcemaps-webpack-plugin": "^1.0.3",
    "eslint": "^3.15.0",
    "eslint-plugin-react": "^6.9.0",
    "file-loader": "^4.2.0",
    "generate-asset-webpack-plugin": "^0.3.0",
    "history": "^3.3.0",
    "html-webpack-plugin": "^3.2.0",
    "ignore-map-loader": "0.0.1",
    "less": "^2.7.1",
    "less-loader": "^5.0.0",
    "mini-css-extract-plugin": "^0.8.0",
    "nodemon": "^1.11.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^2.1.1",
    "react-hot-loader": "^4.12.11",
    "redux-actions": "^2.6.5",
    "redux-devtools-extension": "^2.13.8",
    "source-map-loader": "^0.2.4",
    "speed-measure-webpack-plugin": "^1.3.1",
    "style-loader": "^0.13.1",
    "unused-files-webpack-plugin": "^3.4.0",
    "url-loader": "^2.1.0",
    "webpack": "4.40.2",
    "webpack-cli": "^3.3.7",
    "webpack-conditional-loader": "^1.0.12",
    "webpack-dev-middleware": "^3.7.0",
    "webpack-dev-server": "^3.8.0",
    "webpack-hot-middleware": "^2.12.1",
    "webpack-watch-changed": "^1.0.0"
  },
  "engines": {
    "node": ">=10.0.0",
    "npm": ">=6.0.0"
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