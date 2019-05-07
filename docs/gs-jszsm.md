# 技术栈说明

ucf-web 微前端框架是工具与最佳实践融合，下面分两部分进行说明。

<a name="bbd80411"></a>
## ucf-web 中开发工具集

ucf-web 中的 ucf-scripts 工具默认基于 webpack 4.x 进行封装，并默认集成了以下工具集：

- webpack & webpack-dev-server
- webpack loader & plugin
  - http-proxy-middleware
  - css-loader\less-loader\babel-loader
- babel v7
- postcss相关插件（autoprefix、cssnano等）
- less
- ES5/6/7 语法支持

<a name="8aebb4e4"></a>
## ucf-web 中默认技术选型与最佳实践

ucf-web 中的微应用默认都在ucf-apps目录下，不同微应用开发遵循同一套技术栈

- 选择基于 React.js 作为底层渲染引擎
- 选择基于ES6+新语法特性
- 异步操作统一采用 async/await 方式
- 选择基于mirrorx作为应用状态解决方案，在redux、react-redux、react-router的基础上进行了简化封装
- 选择基于tinper-bee作为基础UI组件库


