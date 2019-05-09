# npm install 异常处理

<a name="856fc714"></a>
## 案例一：找不到 npm 命令导致无法 install
<a name="629d2cbc"></a>
### 场景描述
执行`npm install` 提示 npm 命令不存在，再执行 `node -v` 也提示失败，导致 npm install 安装包失败。
<a name="094c47ac"></a>
### 问题分析
这种问题一般是安装 node 的改了位置，需要配置环境变量。  
<a name="de842a6c"></a>
### 解决方案
1、最快的方式是卸载 Node，重新安装 Node，安装的时候不要做任何修改，一路默认安装；<br />2、新增 node 的全局环境变量配置。

<a name="69992ab6"></a>
## 案例二：由于安装时的权限问题导致install失败
<a name="4c07b53d"></a>
### 场景描述
![51453751-30991600-1d7c-11e9-8113-7e796c8557c8.png](https://cdn.nlark.com/yuque/0/2019/png/85184/1548397931757-55024065-dc24-444f-8011-55db00f776de.png#align=left&display=inline&height=347&name=51453751-30991600-1d7c-11e9-8113-7e796c8557c8.png&originHeight=560&originWidth=1205&size=86938&status=done&width=746)

<a name="094c47ac-1"></a>
### 问题分析
电脑登陆用户对项目文件没有权限。
<a name="de842a6c-1"></a>
### 解决方案
右击目录，选择属性-》选择安全，加上当前用户对目录的写权限和读权限等

<a name="7d8ceb54"></a>
## 案例三：由于网络问题无法install
<a name="4c07b53d-1"></a>
### 场景描述
执行 npm install 一直在等待中，半天没响应。
<a name="094c47ac-2"></a>
### 问题分析

- 由于你本地的电脑设置了代理或是翻墙了；
- 由于你电脑连接的网络速度比较慢。

_**误区提示：npm 安装失败后不要立马切换使用 cnpm下载，会出现其他问题；因为npm 和 cnpm 将package解析到node_modules 下的解析规则不一样，容易出现冲突；切换使用前务必将node_modules目录删除掉**_<br />**
<a name="de842a6c-2"></a>
### 解决方案
1、首先执行以下命令查看包下载的详细进度：`npm config set loglevel=http`<br />2、然后删除本地的 `node_modules` 目录，删掉 `package-lock.json` 文件；<br />3、配置淘宝镜像代理：`npm config set registry "https://registry.npm.taobao.org"`<br />4、最后重新执行安装 `npm install`

<a name="99998832"></a>
## 案例四：无法代理到应用平台的数据
<a name="4c07b53d-2"></a>
### 场景描述
前端的 node 开发服务起来了，但是登录后代理跳不过去。
<a name="094c47ac-3"></a>
### 问题分析
1、未登录，没有访问 `http://127.0.0.1/wbalone`；<br />2、uba.config.js 中的代理路径未修改，没有代理到目标服务器上面；

```javascript
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
```

<a name="de842a6c-3"></a>
### 解决方案
1、访问 `http://127.0.0.1/wbalone`进行登录；<br />2、修改 uba.config.js 中配置代理的 proxyConfig 字段。
<a name="2c055218"></a>
## 案例五：由于cache缓存导致的安装失败
<a name="629d2cbc-1"></a>
### 场景描述

- 当使用npm进行安装的时候，如果出现：cb() nerver called 的报错，
- npm install安装包很快，但是报Error信息了，这时可能是之前的缓存有问题，清楚缓存即可
<a name="de842a6c-4"></a>
### 解决方案
1. 先使用：npm cache verify<br />2. 在使用：npm cache clean -f<br />3. 可能需要：npm cache clean -—force

重新进行安装即可：`npm install`
