# ucf-scripts 设计理念

<a name="e7071d15"></a>
## 使用之前

1. 传统的前端开发需要开发者去维护超多的npm包，并且还需要掌握每个包的版本变化
1. 运行时和开发时的包版本管理，目前的前端技术栈发展迅速，开发者很难每天关注哪个包更新了什么、哪些是比较稳定没有BUG，非常棘手
1. 没有一个很好统一管理的,里面过多的包维护起来有很大的风险
1. npm上的包更新频繁，即使比较老练的开发者，也难免在某一个版本出现问题，误操作更新后，不知退后哪一个版本

> 下面是一个常规的package.json的依赖包，可以看出，非常多难以维护

```javascript
  "devDependencies": {
    "autoprefixer": "^9.4.3",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "clean-webpack-plugin": "^1.0.0",
    "copy-webpack-plugin": "^4.6.0",
    "cross-env": "^5.2.0",
    "css-loader": "^1.0.1",
    "cssnano": "^4.1.8",
    "extract-text-webpack-plugin": "^2.1.2",
    "file-loader": "^2.0.0",
    "glob": "^7.1.3",
    "gulp": "^3.9.1",
    "gulp-fez-sftp": "^1.0.1",
    "gulp-ftp": "^1.1.0",
    "gulp-zip": "^4.1.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^4.1.0",
    "open-browser-webpack-plugin": "^0.0.5",
    "postcss-flexbugs-fixes": "^4.1.0",
    "postcss-loader": "^3.0.0",
    "redux-logger": "^3.0.6",
    "style-loader": "^0.23.1",
    "uba": "^2.3.12",
    "url-loader": "^1.1.2",
    "webpack-bundle-analyzer": "^3.0.3",
    "webpack-hot-middleware": "^2.24.3"
  }
```

<a name="843a8c1a"></a>
## 使用之后


1. 无需维护超多的包，只需要认准`ucf-scripts`一个即可
1. 设置自动升级会帮助开发者自动维护对应的开发时环境
1. 代码简洁，只需要关注运行时的包即可，剩下的交给`ucf-scripts`

可以看出我们的开发时需要的包仅需要一个，通过`scripts`命令来启动
> 使用之后，package.json 内的依赖包非常简洁，只需要维护运行时dependencies内的包即可

```javascript
  "devDependencies": {
    "ucf-scripts": "latest"
  }
```
> 配置启动命令脚本

```javascript
  "scripts": {
    "start": "ucf-scripts start",
    "build": "ucf-scripts build"
  }
```

<a name="9500fd89"></a>
## 设计核心

ucf-scripts通过node技术能力，使用express作为主要的服务端web提供者，通过webpack API使用方式加载配置文件，传递给webpack-dev-middleware作为中间件来开启服务，最终通过express web提供服务。<br /> ucf-scripts不光是可以在项目内依赖包形式存在，也可以npm安装到全局命令行使用，脱离项目依赖去运行，设计理想源自create-react-app，但是比它精简小巧。
