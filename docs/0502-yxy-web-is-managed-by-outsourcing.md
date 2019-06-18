# yxyweb以发包形式管理

以发包的形式管理yxyweb，使用户只需关注业务代码，减少打包体积，方便用户操作。开发者需要在脚手架中修改webpack、babel相关配置。下面聊聊从node_modules中引入yxyweb具体操作。
<a name="wcYBH"></a>
## 脚手架具体配置修改
<a name="IPdke"></a>
### webapck修改
增加node_modules下yxyweb包解析<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192681/1560823187463-53563341-3adf-4f61-94d4-5df9e4bde045.png#align=left&display=inline&height=184&name=image.png&originHeight=368&originWidth=1586&size=83550&status=done&width=793)
<a name="FlXGK"></a>
### babel修改
在module-resolver中修改alias属性，去掉yxyweb、将SvgIcon引入方式换成"./node_modules/yxyweb/common/components/common/SvgIcon.js"。<br />原babelrc修改<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192681/1560822948702-b6c966ab-c7bd-437f-bae3-09f6581cdfe8.png#align=left&display=inline&height=332&name=image.png&originHeight=664&originWidth=1986&size=86768&status=done&width=993)<br />修改后的babelrc<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192681/1560823008002-2b8d72f6-5b7b-4adf-93ac-d71c6ce2512a.png#align=left&display=inline&height=325&name=image.png&originHeight=650&originWidth=2090&size=76817&status=done&width=1045)
<a name="0JbeQ"></a>
### node服务
在node服务启动命令babel-node需要增加参数指的node_modules解析

![image.png](https://cdn.nlark.com/yuque/0/2019/png/192681/1560823322964-7d5a8421-3fd7-439a-a496-b9aff2f5a60d.png#align=left&display=inline&height=72&name=image.png&originHeight=144&originWidth=1976&size=305254&status=done&width=988)<br />最终配置
```javascript
 "debug:server": "cross-env BABEL_ENV=production NODE_ENV=development SRV_URL=http://upc-server.test.app.yyuap.com PRINT_SERVER=http://uretailserver.yonyouup.com/print_service nodemon -w src/server -w src/common --exec babel-node --only='/node_modules/yxyweb/,/src' --inspect src/server/app.jsx",
```
<a name="yShvw"></a>
## package.json
yxyweb依赖项已经抽出到自己的dependencies中，因此需要将项目中重复的依赖去掉。最终项目中dependencies是下面这样

```javascript
"dependencies": {
    "axios": "^0.18.0",
    "es6-promise": "^3.2.1",
    "immutable": "^3.8.1",
    "invariant": "^2.2.1",
    "log4js": "^1.0.1",
    "qrcode.react": "^0.8.0",
    "react": "^15.4.2",
    "react-copy-to-clipboard": "^5.0.1",
    "react-dom": "^15.4.2",
    "react-redux": "^5.0.2",
    "react-router": "^3.0.2",
    "react-router-redux": "^4.0.7",
    "react-touch-screen-keyboard": "^0.3.15",
    "redux-logger": "^2.6.1",
    "request": "^2.81.0",
    "winston": "^2.2.0",
    "yardformdata": "^1.0.9",
    "yxyweb": "^0.0.10"
  },
```

<a name="KodG8"></a>
## 注意事项
yxyweb和业务代码中数据、组件会相互依赖，因此确保依赖外部包版本一致。eg:immutable、react等
