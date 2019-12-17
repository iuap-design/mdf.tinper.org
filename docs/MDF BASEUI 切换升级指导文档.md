<a name="JYiM4"></a>
## 工程项目升级方法
 <br />**一、修改****webpack.config.js ，增加以下两处配置（大概20行、263行处）**

```javascript
process.env.__BASEUI__ = true


new webpack.DefinePlugin({
  
  ...
  
  'process.env.__BASEUI__': JSON.stringify(process.env.__BASEUI__)
})

```


**二、修改src/web/client/styles/index.js**<br />修改条件判断语句，把默认样式升级为tinper<br />ys          import '@mdf/theme-default/dist/index.less'<br />ncc        import '@mdf/theme-ncc/dist/index.less'

```javascript
// comments used by webpack-conditional-loader, do not remove

// #if !process.env.__BASEUI__ && process.env.__THEMETYPE__ === 'ncc'
  import '@mdf/theme/theme-ncc/index.less'
// #endif

// #if !process.env.__BASEUI__ && process.env.__THEMETYPE__ !== 'ncc'
  import '@mdf/theme/theme-default/index.less'
// #endif

// #if process.env.__BASEUI__ && process.env.__THEMETYPE__ === 'ncc'
  import '@mdf/theme-ncc/dist/index.less'
// #endif

// #if process.env.__BASEUI__ && process.env.__THEMETYPE__ !== 'ncc'
  import '@mdf/theme-default/dist/index.less'
// #endif
```


**三、****修改src/web/client/index.jsx**<br />修改如下代码，启动 client 端会报错。

```javascript
// 修改前
extendConfig.iconfont && require('@mdf/theme/theme-ncc/font_ncc/iconfont');

// 修改后
extendConfig.iconfont && require('@mdf/theme-default/dist/newfont/iconfont');
```



**四、**webpack.config.js 文件<br />如果有重复的字体url-loader 配置了，如下，需要删除其一。无重复，则无需删除。

```javascript
{
      test: /\.(woff|eot|ttf)\??.*$/,
      loader: 'url-loader',
      options: {
        name: 'fonts/[name].[md5:hash:hex:7].[ext]'
      },
      include: [
        origin,
        path.resolve('static/styles/images'),
      ]
}
```


**五、package.json 确认版本是否是最新版本。(目前为snapshot)**<br />将原来依赖的主题包 [@mdf/theme](#) 改为 [@mdf/theme-default](#) （ncc风格项目为 [@mdf/theme-ncc](#) ）

**1219稳定版本(推荐使用)**

```javascript
"@mdf/cube": "dev-1219-lang",
"@mdf/metaui-web": "dev-1219-lang",
"@mdf/middlewares-auth": "snapshot",
"@mdf/middlewares-log4js": "^2.2.9",
"@mdf/plugin-meta": "dev-1219-lang",
"@mdf/theme-default": "snapshot",
"@yonyou/mdf-refer": "dev-1219-lang",
```

**日常开发版本**

```javascript

"@mdf/cube": "snapshot",
"@mdf/metaui-web": "snapshot",
"@mdf/middlewares-auth": "snapshot",
"@mdf/middlewares-log4js": "snapshot",
"@mdf/plugin-meta": "snapshot",
"@mdf/theme-default": "snapshot",
"@yonyou/mdf-refer": "snapshot",
```