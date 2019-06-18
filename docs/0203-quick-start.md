# 快速上手


![image.png](https://cdn.nlark.com/yuque/0/2019/png/85184/1553049280145-9202481f-852d-427a-95de-9ce4d94cfaf2.png#align=left&display=inline&height=438&name=image.png&originHeight=876&originWidth=1314&size=219674&status=done&width=657)
<a name="IroXt"></a>
## 使用一体化脚手架代码（内置公共框架）启动

<a name="gc1Tc"></a>
### step1：拉代码并安装资源
```bash
git clone git@git.yonyou.com:yonyou-mdf/yonyou-mdf-fe-examples.git
cd yonyou-mdf-fe-examples && npm install
```
<a name="32ef34bd"></a>
### 
<a name="54Rsm"></a>
### step2：修改配置（对接的BFF、hosts）

- 修改package.json的script配置：
```
"scripts": {
	"debug:server": "cross-env BABEL_ENV=production NODE_ENV=development SRV_URL=http://ucfbasedoc.test.app.yyuap.com PRINT_SERVER=http://uretailserver.yonyouup.com/print_service nodemon -w src/server -w src/common --exec babel-node --inspect src/server/app.jsx",
}
```
<a name="bp6Rs"></a>
### 

- 本地 hosts文件修改：

```
# 以mac电脑为例：
vim /etc/hosts
```

新增配置，并保存退出

```
# 如：
127.0.0.1       guo.yyuap.com
```

<a name="eL2qU"></a>
### step3：启动前后端服务进行开发调试

```
npm run debug:client
npm run debug:server
```

<a name="P5Otj"></a>
### step4：登录环境，用于本地预存 token 等 cookie信息

- 访问：[http://u8c-test.yyuap.com/#/](http://u8c-test.yyuap.com/#/)
- user/password：u8c_vip@163.com     yonyou@1988

<a name="cvaA5"></a>
### step5：在测试环境找到对应功能节点，并拼凑可访问的 URL

- 如测试环境的节点（银行类别）：[http://ucfbasedoc-fe.test.app.yyuap.com/meta?terminalType=1&token=bttb737d48c-d407-4b52-b366-0504deb6b7c0__1557281189450&serviceCode=bank_u8c](http://ucfbasedoc-fe.test.app.yyuap.com/meta?terminalType=1&token=bttb737d48c-d407-4b52-b366-0504deb6b7c0__1557281189450&serviceCode=bank_u8c)
- 对应的单据信息：
  1. cBillNo: "bd_basedocbanklist"
  1. cBillType: "ArchiveList"
- 按 Node 层的URL规则拼成本地可访问的路径：[http://guo.yyuap.com:3003/meta/ArchiveList/bd_basedocbanklist](http://guo.yyuap.com:3003/meta/ArchiveList/bd_basedocbanklist)

<a name="MIQuK"></a>
## 使用业务脚手架代码+公共框架的方式启动

1、获取库存云&基础服务前端项目（业务层）
```bash
git clone git@git.yonyou.com:UStock/UStock-web.git
// 分支切换
git checkout u8cdev
cd UStock-web/UPC-Web
// 依赖安装
npm install
```

2、获取yxyweb前端工程（框架层）

```bash
cd src
// yxyweb 框架源码直接下载到src目录
git clone git@git.yonyou.com:yxyframework/yxyweb.git
```

<a name="0XWYK"></a>
### 开发态 Node 对接的后台服务及登录验证



<a name="142al"></a>
### 开发调试

```

// 开发时，启动后端 - 数据库地址 指向 http://10.10.2.59:8000
// java 后端服务：http://127.0.0.1:8000
npm run debug:server:devdb

// 开发时，启动前端
npm run debug:client
```

- 打开浏览器，访问：`[http://localhost:3003/login](http://localhost:3003/login)`；
- 输入测试账号登录：`[xiaojing@yonyou.com]() / 123456`；
- Node 层访问的对应后台服务地址为：[http://10.10.2.59:8000](http://10.10.2.59:8000/)。



<a name="gDLGj"></a>
## 代码调试
<a name="a0171eab"></a>
#### 如何在浏览器调试 Node 代码
1、从Chrome浏览器中呼出 Node 调试控制台：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/85184/1553052335389-3013967a-7593-4a0f-9a0c-6c018e580afe.png#align=left&display=inline&height=248&name=image.png&originHeight=496&originWidth=938&size=254597&status=done&width=469)

2、查看源码，打断点<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/85184/1553052399551-aa7b8fe1-ecc6-426a-8ed6-02f50477b61d.png#align=left&display=inline&height=1404&name=image.png&originHeight=1404&originWidth=2108&size=1882226&status=done&width=2108)

<a name="5be9697d"></a>
#### 如何在浏览器调试 React 
![image.png](https://cdn.nlark.com/yuque/0/2019/png/85184/1553052567898-2e8d3433-552c-49ef-9f0d-2c0d9cf7bea6.png#align=left&display=inline&height=714&name=image.png&originHeight=714&originWidth=1610&size=1023806&status=done&width=1610)
<a name="7be5f00a"></a>
### 资源编译和运行时启动

```
// 发布时，先编译前端资源
npm run build

// 发布后，启动 Node.js Server
npm start 
```

