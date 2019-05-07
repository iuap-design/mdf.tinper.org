# 为什么要升级到 ucf-web

> 基于前端工程化的考虑，我们之前基于webpack工具链封装了前端工程化工具uba，并在此基础上整合成最佳实践的前端脚手架工程，我们将其命名为 tinper-react，并且广泛应用于三一重工、贵冶智能工厂、华新丽华、绿城集团、中兴通讯等大型企业应用和用友云系列产品矩阵当中。


<a name="9136b510"></a>
## ucf-web 和 tinper-react 有什么联系
ucf-web 是从 tinper-react 吸取经验、总结最佳实践、解决开发者提出的问题，并在 UCF 中台能力框架的指导下演进而来，它在技术选型上保证了和之前的 tinper-react 框架的延续性，并在易用性、规范化、标准化上得到了更好的实践。

<a name="a41768dc"></a>
## 1、升级开发体验，增强工程化能力

<a name="502652a1"></a>
### 1.1、简化项目依赖包数量，由原来的60个左右减少到10个左右

之前：

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
    "cssnano": "^4.1.7",
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
    "uba": "^2.3.11",
    "url-loader": "^1.1.2",
    "webpack-bundle-analyzer": "^3.0.3",
    "webpack-hot-middleware": "^2.24.3"
  },
  "dependencies": {
    "ac-attachment": "^0.2.2",
    "async-validator": "^1.10.0",
    "axios": "^0.18.0",
    "bee-autocomplete": "^1.0.4",
    "bee-checkbox": "^1.2.6",
    "bee-complex-grid": "^1.0.8",
    "bee-datepicker": "^1.3.8",
    "bee-dropdown": "^1.0.3",
    "bee-form": "^2.0.6",
    "bee-input-number": "^1.2.1",
    "bee-menus": "^1.0.8",
    "bee-pagination": "^1.1.14",
    "bee-search-panel": "^0.1.4",
    "bee-select": "^1.1.5",
    "bee-table": "^1.6.16",
    "bee-tooltip": "^1.0.13",
    "bee-upload": "^1.0.0",
    "classnames": "^2.2.5",
    "core-js": "^2.6.0",
    "mirrorx": "^0.2.12",
    "moment": "^2.23.0",
    "prop-types": "^15.6.2",
    "query-string": "^5.1.1",
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-transition-group": "^2.4.0",
    "ref-combobox": "0.0.2",
    "ref-multiple-table": "^0.1.12",
    "ref-tree": "^0.1.16",
    "tinper-bee": "1.6.5",
    "yyuap-bpm": "^0.3.26",
    "yyuap-ref": "^1.1.55"
  }
```

现在(dependencies里面的包会随着项目逐渐完善而会增多)：

```javascript
"devDependencies": {
    "ucf-scripts": "^1.0.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5",
    "@babel/runtime": "^7.3.1",
    "bee-complex-grid": "^1.0.11",
    "bee-form": "^2.0.7",
    "bee-table": "^1.6.33",
    "classnames": "^2.2.6",
    "mirrorx": "^0.2.12",
    "prop-types": "^15.6.2",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "tinper-bee": "^1.6.9",
    "ucf-request": "^1.0.0"
  }
```

<a name="ae5ad075"></a>
### 1.2、对配置文件做了精简，由原来的200多行精简到三四十行

原来的 uba.config.js：

```javascript
const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const webpack = require('webpack');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pathUrl = ''; //http://127.0.0.1:8080 设置host，可选
const context = '/iuap_walsin_fe';//工程节点名称
const contentBase = './build' + context;//打包目录
const staticConfig = {
  folder: "dll"
};


let entries = {};
let chunks = [];
let prodEntries = {};
let prodChunks = [];
let htmlEntrys = [];

const svrConfig = {
  historyApiFallback: false
};

// 远程代理访问，可以配置多个代理服务：https://github.com/chimurai/http-proxy-middleware
const proxyConfig = [
  {
    enable: true,
    headers: {
      // 与下方url一致
      "Referer": "http://172.20.52.215:8888"
    },
    //要代理访问的对方路由
    router: [
      '/iuap_walsin_demo', '/wbalone', '/iuap-saas-message-center/', '/iuap-saas-filesystem-service/', '/eiap-plus/', '/newref/', '/print_service/', '/iuap-print/'
    ],
    url: 'http://172.20.52.215:8888'
  }
];

const globalEnvConfig = new webpack.DefinePlugin({
  __MODE__: JSON.stringify(process.env.NODE_ENV),
  GROBAL_HTTP_CTX: JSON.stringify("/iuap_walsin_demo"),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})

const MINIMIZE_FLAG = (process.env.NODE_ENV == "production") ? true : false;

//提取package里的包
function getVendors() {
  let pkg = require("./package.json");
  let _vendors = [];
  for (const key in pkg.dependencies) {
    _vendors.push(key);
  }
  return _vendors;
}
//优化配置，对于使用CDN作为包资源的引用从外到内的配置
const externals = {
  // 'axios': 'axios',
  // 'react': 'React',
  // 'react-dom': 'ReactDOM',
  //'tinper-bee': 'TinperBee'
}
//默认加载扩展名、相对JS路径模块的配置
const resolve = {
  extensions: [
    '.jsx', '.js', '.less', '.css', '.json'
  ],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    modules: path.resolve(__dirname, 'src/pages/'),
    routes: path.resolve(__dirname, 'src/routes/'),
    layout: path.resolve(__dirname, 'src/layout/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    static: path.resolve(__dirname, 'src/static/'),
    src: path.resolve(__dirname, 'src/')
  }
}
//开发和生产需要的loader
const rules = [{
  test: /\.js[x]?$/,
  exclude: /(node_modules)/,
  include: path.resolve('src'),
  use: [{
    loader: 'babel-loader'
  }]
}, {
  test: /\.less$/,
  exclude: /(node_modules)/,
  use: ExtractTextPlugin.extract({
    use: ['css-loader', 'postcss-loader', 'less-loader'],
    fallback: 'style-loader'
  })
}, {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
    }, 'postcss-loader'],
    fallback: 'style-loader'
  })
}, {
  test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
  //exclude: /favicon\.png$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8196,
      name: 'images/[name].[hash:8].[ext]',
      publicPath: pathUrl + context
    }
  }]
}, {
  test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[hash:8].[ext]',
      outputPath: 'fonts',
      publicPath: pathUrl + context + '/fonts/'
    }
  }]
}]


entries.vendors = prodEntries.vendors = ['babel-polyfill'].concat(getVendors());


glob.sync("./src/pages/**/app.js").forEach(path => {
  const chunk = path.split("./src/pages/")[1].split(".js")[0];
  entries[chunk] = [path, hotMiddlewareScript];
  chunks.push(chunk);
});

//开发环境的webpack配置
const devConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: path.resolve(__dirname, contentBase),
    filename: "[name].js",
    chunkFilename: 'js/[name].[hash:8].bundle.js',
    publicPath: context
  },
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendors",
      filename: "vendors/[name].js"
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    globalEnvConfig,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: resolve
}

glob.sync("./src/pages/**/index.html").forEach(path => {
  const chunk = path.split("./src/pages/")[1].split("/index.html")[0];

  const filename = chunk + "/index.html"
  const key = chunk + "/index";

  const htmlConf = {
    filename: filename,
    template: path,
    inject: false,
    hash: true,
    key: key,
    chunks: ['vendors', chunk + '/app'],
    favicon: './src/static/images/favicon.png'
  };
  htmlEntrys.push(filename);
  devConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
});



glob.sync("./src/pages/**/app.js").forEach(path => {
  const chunk = path.split("./src/pages/")[1].split(".js")[0];

  prodEntries[chunk] = [path];
  prodChunks.push(chunk);
});

//生产环境的webpack配置
const prodConfig = {
  // devtool: 'source-map',
  entry: prodEntries,
  output: {
    publicPath: pathUrl + context,
    path: path.resolve(__dirname, contentBase),
    chunkFilename: 'js/[name].bundle.js',
  },
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendors",
      filename: "vendors/[name].js"
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    globalEnvConfig,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new CleanWebpackPlugin(['build']),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ],
  resolve: resolve
}

glob.sync("./src/pages/**/index.html").forEach(path => {
  const chunk = path.split("./src/pages/")[1].split("/index.html")[0];

  const filename = chunk + "/index.html";
  const key = chunk + "/index";
  const realPath = prodConfig.output.publicPath + key + '.js';
  const realCssPath = prodConfig.output.publicPath + key + '.css';

  const htmlConf = {
    filename: filename,
    template: path,
    inject: false,
    hash: true,
    key: key,
    chunks: ['vendors', chunk + '/app'],
    favicon: './src/static/images/favicon.png',
    realPath: realPath,
    realCssPath: realCssPath,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  };

  prodConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
});


//最终向uba导出配置文件
module.exports = {
  devConfig,
  prodConfig,
  svrConfig,
  proxyConfig,
  staticConfig
};

```

现在的 ucf.config.js：
> 这个只是为了展示有这个能力，可以直接返回一个对象{}，并不是依赖所有功能节点


```javascript
require('@babel/polyfill');

module.exports = (env, argv) => {
    return {
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,
        // 启动这两个模块，启动调试、构建
        bootList: [
            "demo-app-org",
            "demo-app-staff"
        ],
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    "Referer": "http://iuap-meger-demo.test.app.yyuap.com"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap'
                ],
                url: 'http://iuap-meger-demo.test.app.yyuap.com'
            }
        ],
        // 构建资源的时候产出sourceMap，调试服务不会生效
        source_map: true,
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

<a name="1eb8825b"></a>
### 1.3、项目整体结构更加规范化，文件数量减少
之前的：

```bash
├── .babelrc
├── .gitignore
├── LICENSE
├── README.md
├── doc
├── gulpfile.js
├── mock
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
├── uba.config.js
└── uba.mock.js

4 directories, 10 files
```

现在的：

```bash
├── .gitignore
├── LICENSE
├── README.md
├── docs
├── package.json
├── ucf-apps
├── ucf-common
└── ucf.config.js

4 directories, 5 files
```

<a name="9135b00c"></a>
### 1.4、启动开发调试效率加快

原来的大型单页应用，整体页面有可能达到四五百个页面，甚至近千个，在前端开发和调试的速度较慢，目前支持以下优化：

- 支持将整个应用按功能或是按业务模块拆分为多个独立的单页应用，并支持将部分页面拆分为独立的单体页面。
- 支持按需启动指定的业务模块，按需打包指定的业务模块。

<a name="ee015c6e"></a>
## 2、易用性提升

<a name="1c81e4c9"></a>
### 2.1、文档更加系统化

在此之前，前端基础文档、框架介绍资料、典型案例培训文档得现写、配套的开发调试和部署等方式未做说明，文档化内容比较散乱，这次ucf-web 将文档内容也系统化的进行了整理。

<a name="54d24141"></a>
### 2.2、更加友好：支持快速创建标准的模板节点
之前是需要自己手动复制修改粘贴去新增节点，目前已经通过工具命令来快速创建模板，减少复杂繁琐操作，专注业务组件开发


<a name="b1d9c2e0"></a>
### 2.3、调试更加方便

目前已经集成了开发平台门户系统，只用于本地开发环境，可以很好的模拟出最终上线后的视觉要求，浏览器兼容性等问题，不再是只开发一部分页面，有效的降低了错误率。还增加了打开后帮助开发者访问指定的页面功能。
