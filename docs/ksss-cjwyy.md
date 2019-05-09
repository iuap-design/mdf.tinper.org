# 创建微应用


我们对微模式做了三种区分：

- MPA 多页型微应用
- SPA 单体架构型微应用
- MDD 模型驱动型微应用

更多关于微应用的介绍及开发说明请前往[微应用开发进阶](https://www.yuque.com/ucf-web/book/wkf6qs)部分阅读。

<a name="433d87d0"></a>
## 快速创建

目前 ucf 脚手架里面包含MPA、SPA 两类微应用模板（MDD 模型驱动型微应用模板近期会更新支持），支持通过命令的方式快速创建。

```bash
# 切换根目录，执行以下命令，创建所需要的微应用
$ ucf new app
```



![ucf-new-app.gif](https://cdn.nlark.com/yuque/0/2019/gif/192735/1553065064713-257f63d7-ffc9-4b36-a53f-512d61a318ff.gif#align=left&display=inline&height=481&name=ucf-new-app.gif&originHeight=481&originWidth=671&size=74110&status=done&width=671)

<a name="eef2657a"></a>
## 修改配置并启动

然后打开启动配置`ucf.config.js`修改`bootList`字段如下：

```javascript
// 单独启动调试、构建
bootList: [
  "singletable-query"
]
```

也可以直接默认启动所有：

```javascript
bootList:true
```

重启该服务即可

```bash
npm start
```