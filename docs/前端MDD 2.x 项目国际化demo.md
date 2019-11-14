**升级须知**<br />**

- **以下操作，需要在项目的日常开发分支上修改，步骤10以后的不要提交到主干分支。**
- **接着切换一个新的多语分支，然后把9步改成 MDF_LANG=true,10以后的步骤正常操作。**

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1573197287256-3701d186-041c-41da-b354-277b8fd248d4.png#align=left&display=inline&height=951&name=image.png&originHeight=951&originWidth=347&search=&size=82668&status=done&width=347)

1. **在工程目录的根目录下新建一个lang-tool目录。**

2. [**下载java lang-tool**](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/mdd/lang-tool.zip)** 把文件都拷贝到项目根目录下。**

3. **编辑 lang-tool/config/config.properties 文件 **

```javascript
groupCode=XXX									//需要修改成你自己的组(productline+domain+project,已下划线连接)

respath=/lang-tool/resource   //修改你本地的路径

type=js,jsx										//需要提取的文件类型

excludepath=html.jsx,html.js,pack.js	//需排除的文件

localres=true									//是否要连接服务中心
localflag=L										//和7行成对出现

```

```javascript
示例
产品线(ys,ncc,diwork...all代表所有)
productline=YS

领域(财务云，税务云，营销云，all代表所有)
domain=FED

项目标识（一般以代码工程来区分，按构建、打包和部署来做隔离维度）
project=SCAPM

使用者组，主要决定打包范围和数据版本范围的参数，不使用项目是因为多个项目可能属于一个组
groupCode=YS_FED_SCAPM
```
<br />

4. **新建 pack.js 文件，包含需要的语种,放到mdf-app/src/pack.js 下。**



```javascript
module.exports={
  "zhcn": {
  	  "YS_FI_FP_000003484632": "大前端技术部",
  },
  "zhtw": {
    "YS_FI_FP_000003484632": "大前端技術部",
  },
  "enus": {
    "YS_FI_FP_000003484632": "FED",
  }
}
```

5. **mdf-app/src/web/client/index.jsx 文件中添加如下代码**

```javascript
require('@babel/polyfill')

 ...

if(process.env.__LANG__ && process.env.__LANG__ == true){
    cb.lang.jsonp(0, 'YS_FED_FW,XX');
    cb.lang.init(require('../../pack'),null);
    console.log(" ************************多语加载成功!***************************");
    console.log(cb.lang.template("YS_FI_FP_000003484632"));
}
```

> 注意事项:
> 1. cb.lang.jsonp   表示是否需要调用统一的多语服务来请求资源。
>   1. 参数二 ： 租户信息，不传默认为系统，系统为0租户
>   1. 参数二 ： 需要从哪几个组里面加载资源。
> 
> 2. cb.lang.init 初始化多语框架。
>   1. 参数一：获取项目中的多语词条。
>   1. YS_FED_FW 默认为mdd的,加上自己的组即。
>   1. 参数二：是否要指定从哪里获取语种信息。null 默认是从cookie、url 、系统默认的顺序获取。
> 
> 3. cb.lang.template("YS_FI_FP_000003484632") 测试可翻译的词条


6. **mdf-app/src/web/client/client.jsx 文件中添加如下代码**

```javascript
import {Locale} from '@mdf/baseui/lib'

....

//改造 render 方法
const render = () => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if(Locale && process.env.__LANG__ && process.env.__LANG__ == true){
      ReactRender(Locale);
    }else{
      ReactRender(null);
    }
  })
}
const ReactRender = (Lang) => {
  if(Lang){ 
    ReactDOM.render(<Lang><Isomorph store={store} history={history} routes={routes} /></Lang>,rootElement)
  }else{
    ReactDOM.render(<Isomorph store={store} history={history} routes={routes} />,rootElement)
  }
}
```

7. **mdf-app/src/web/server/index.js**

```javascript
process.env.__THEMETYPE__ = packageJson.themeType

...

if (process.env.MDF_LANG && process.env.MDF_LANG == 'true') {
    let cb = {};
    cb.lang = require('@mdf/cube/lib/lang');
    cb.lang.setLanguage(require('../../pack'), "zh-CN");
    console.log(" ************************server-多语加载成功!***************************");
    console.log(cb.lang.template("YS_FI_FP_0000033576"));
    global.cb = cb;
}
```

> 注意事项:
> 1. setLanguage  服务器端获取语种信息
>   1. 参数二 ： 获取项目中的多语词条。
>   1. 参数二 ：设置默认语种。
> 
> 2. cb.lang.template("YS_FI_FP_000003484632") 测试可翻译的词条


8. **webpack.config**

```javascript
new webpack.DefinePlugin({
   
  'process.env.__LANG__': process.env.MDF_LANG, 
})
```

9. **package.json 启动命令中需要加载多语的都需要加上  MDF_LANG=false 加上**
> **在多语分支上需要把 MDF_LANG=true**
> 上线时候，需要检测启动命令，并且在package.json里面加上 **MDF_LANG 的设置。**

```json
"scripts": {
    "_comment_main_start": "================================主要命令区域================================",
    "start:web": "cross-env NODE_ENV=production SERVER_ENV=prod node bin/web/server/index.js",
    "start:mobile": "cross-env NODE_ENV=production SERVER_ENV=prod node bin/mobile/server/index.js",
    "debug:web": "concurrently \"npm run debug:client\" \"npm run debug:server\"",
    "debug:web:ncc": "concurrently \"npm run debug:client\" \"npm run debug:server:daily\"",
    "debug:mobile": "concurrently \"npm run debug:mobile:client\" \"npm run debug:mobile:server\"",
    "build:web": "concurrently \"npm run build:client\" \"npm run build:server\"",
    "build:mobile": "concurrently \"npm run build:mobile:client\" \"npm run build:mobile:server\"",
    "_comment_main_end": "================================主要命令区域================================",
    "_comment_seperator_": " = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ",
    "_comment_other_start": "================================其它命令区域================================",
    "start": "cross-env NODE_ENV=production SERVER_ENV=prod node bin/web/server/index.js",
    "start:test": "cross-env NODE_ENV=production SERVER_ENV=test node bin/web/server/index.js",
    "start:pre": "cross-env NODE_ENV=production SERVER_ENV=pre node bin/web/server/index.js",
    "start:daily": "cross-env NODE_ENV=production SERVER_ENV=daily node bin/web/server/index.js",
    "start:dev": "cross-env NODE_ENV=production SERVER_ENV=dev node bin/web/server/index.js",
    "debug:client": "cross-env BABEL_ENV=development MDF_LANG=true NODE_ENV=development webpack-dev-server --progress --colors  --config webpack.config.js",
    "debug:server": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=prod MDF_LANG=true MDF_LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf --inspect src/web/server/index.js",
    "debug:server:self": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=self   MDF_LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf --inspect src/web/server/index.js",
    "debug:server:daily": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=daily MDF_LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf --inspect src/web/server/index.js",
    "debug:server:test": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=test   MDF_LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf --inspect src/web/server/index.js",
    "debug:server:dev": "cross-env BABEL_ENV=production NODE_ENV=development SERVER_ENV=dev     MDF_LANG=true  nodemon -w src/web/server -w src/web/common --exec babel-node --only=src,node_modules/@mdf --inspect src/web/server/index.js",
    "debug:mobile:client": "cross-env BABEL_ENV=development MDF_LANG=true MDF_TARGET=mobile webpack-dev-server --progress --profile --colors  --config webpack.config.js",
    "debug:mobile:server": "cross-env BABEL_ENV=production NODE_ENV=development MDF_TARGET=mobile MDF_LANG=true  nodemon -w src/mobile/server -w src/mobile/common --exec babel-node --only=src,node_modules/@mdf --inspect src/mobile/server/index.js",
    "debug:mobile:server:daily": "cross-env BABEL_ENV=production NODE_ENV=development MDF_TARGET=mobile SERVER_ENV=daily MDF_LANG=true  nodemon -w src/mobile/server -w src/mobile/common --exec babel-node --only=src,node_modules/@mdf --inspect src/mobile/server/index.js",
    "build:mobile:client": "cross-env BABEL_ENV=production MDF_LANG=true NODE_ENV=production MDF_TARGET=mobile webpack --config webpack.config.js --colors --progress && echo '移动程序：编译完成'",
    "build:mobile:server": "cross-env BABEL_ENV=production NODE_ENV=production MDF_TARGET=mobile babel src -d bin --ignore src/web/client,src/business && echo '后端程序：编译完成'",
    "build:dll:dev": "cross-env NODE_ENV=development webpack --config webpack.dll.config.js",
    "build:dll:prod": "cross-env NODE_ENV=production webpack --config webpack.dll.config.js",
    "build:dll": "npm run build:dll:dev && npm run build:dll:prod",
    "build:server": "cross-env BABEL_ENV=production NODE_ENV=production babel src -d bin --ignore src/web/client,src/business && echo '后端程序：编译完成'",
    "build:client": "cross-env BABEL_ENV=production MDF_LANG=true NODE_ENV=production webpack --config webpack.config.js --colors --progress && echo '前端程序：编译完成'",
    "prebuild": "npm run clean",
    "webpack:stats": "cross-env NODE_ENV=production webpack --config webpack.config.js --profile --json > stats.json",
    "clean": "rimraf ./bin",
    "_comment_other_end": "================================其它命令区域================================"
  },
```

10. 配置最新的包
> 此代码不要合并主干分支。

```jsx
 "devDependencies": {
    "@mdf/baseui": "locale",
    "@mdf/cube": "locale", 
    "@mdf/metaui-web": "locale",
    "@mdf/middlewares-auth": "locale",
    "@mdf/plugin-meta": "locale"
}
```

 <br />11. 删除项目中的  node_modules 重新执行 ynpm i 

12. 代码中文提取。[如有疑问请参考详细步骤](http://tinper.org/mdf/%E6%8F%90%E5%8F%96%E5%B7%A5%E5%85%B7%E5%85%A5%E9%97%A8%E7%AF%87)

```jsx
$ cd lang-tool
```

mac 系统可执行 cli 工具，一次可以跑多个文件夹，命令如下:
> java_path="xx/lang-tool"  // 工具目录
> resource_path="xx/src"    //需要提取的代码目录
> cli 可以复制多次，批量执行多个目录和不同代码(自由发挥)


```jsx
$ sh cli.sh
```

其他系统<br />

```jsx
java -jar  D:/lang-tool/ucf-multilang-1.0.5-SNAPSHOT.jar -path E:xx/project -configpath  D:/lang-tool
```


13. 此时会在/lang-tool/resource 生成提取后的json文件。

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1573196324185-fb2ac7ac-1c3d-457a-bcb9-1e21d7337025.png#align=left&display=inline&height=81&name=image.png&originHeight=81&originWidth=289&search=&size=11264&status=done&width=289)

14. 拷贝当前json(可先拿出去格式化一下)的内容，放置到pack.js(步骤4)文件中，替换zhcn 后面的json，作为内容。如图

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1573196507205-6f88b22b-f064-43e8-983d-075f98952b25.png#align=left&display=inline&height=322&name=image.png&originHeight=322&originWidth=595&search=&size=99440&status=done&width=595)<br />

15. 检查步骤5中的的 jsonp 是否设置正确

> cb.lang.jsonp(0, 'YS_FED_FW,UCFSTAFE'); //第二个参数是我们需要修改的。
> 第二个参数是 lang-tool/config/config.properties中的groupCode的值),并且确认已经把资源抽取到服务中心。
> 更多请参考步骤5


16. 启动测试 url上加 ?locale=zh-CN , 进行测试

**【未配json 忽略】**如果配置了json，会有如下接口请求，而且再次刷新后，资源会直接缓存。

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1573197087876-ef6d424c-fa92-47da-9e78-0d90ab4ba268.png#align=left&display=inline&height=350&name=image.png&originHeight=350&originWidth=1512&search=&size=135455&status=done&width=1512)

17. 上线测试环境时需要


<br />$YHT_APPTENANT/****.html?locale={locale}

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1572322486344-d764515c-0f14-4e3f-9c83-5ea5cc32e6bf.png#align=left&display=inline&height=849&name=image.png&originHeight=849&originWidth=1142&search=&size=82870&status=done&width=1142)


<br />~~ over ~~ 

以下步骤是可选步骤，为本地文档翻译步骤，如果想走服务中心可以直接去服务中心修改词条。<br />[多语服务中心](http://workbench.yyuap.com/multilang-fe/#/dev)

18. **把pack.js 导出为excel**

**

- 安装导出工具[lang-cl](https://package.yonyoucloud.com/#/package/bGFuZy1jbGk=)i

```
$ ynpm install lang-cli -g
```

-   把pack.js文件改成pack.json 文件，去掉文件内的**module.exports =** 即可。
-    在当前目录执行
```javascript
$ lang excel --json xx/lang/resource
```
![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571732021277-01979d04-5143-4b56-a563-bf6fe45bd71f.png#align=left&display=inline&height=207&name=image.png&originHeight=207&originWidth=244&search=&size=16561&status=done&width=244)

> 就会在resource目录下生成excel文件。
> 发给翻译人员，进行翻译。 

- 把翻译后的文件在换回来 
```javascript
 $ lang excel --excel  /Users/jony/workspaces/yonyou/project/new/imp-iot-alarm-fe/lang/resource/1571710782275.xlsx
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571732830698-d0e30f9c-d797-4609-927f-043b0a56f7c5.png#align=left&display=inline&height=160&name=image.png&originHeight=160&originWidth=997&search=&size=43318&status=done&width=997)<br />
<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571734218477-91f46d1b-035e-4fd5-8b1f-4101afc29e30.png#align=left&display=inline&height=144&name=image.png&originHeight=144&originWidth=250&search=&size=13785&status=done&width=250)

excel 格式如下

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571819361461-51c0fbeb-4b8f-4d59-9d83-4272cda7ecee.png#align=left&display=inline&height=173&name=image.png&originHeight=173&originWidth=785&search=&size=43754&status=done&width=785)


<br />~~ over ~~