# 快速初始化

<a name="39da6755"></a>
## 创建项目

- 首先确定我们当前开发目录，在根目录自动创建`ucf-project`工程，执行如下：

```bash
ucf init ucf-project
```

![](https://cdn.nlark.com/yuque/0/2019/gif/192735/1548558921099-eeefc558-150a-4cfa-aab6-4406900dd50e.gif#align=left&display=inline&height=504&originHeight=504&originWidth=671&size=0&status=done&width=671)

- 如果你只是想初始化工程，在当前目录已经有`git`仓库的情况下，进入你存在版本控制文件夹后，执行如下：

> ucf init 会在你运行的根目录下平铺所有ucf工程文件，它不会向上面那样帮助我们创建一个单独的文件夹


```bash
ucf init
```

![](https://cdn.nlark.com/yuque/0/2019/gif/192735/1548558448433-3ad4d520-6220-4a15-a81c-53b658532ef6.gif#align=left&display=inline&height=504&originHeight=504&originWidth=671&size=0&status=done&width=671)

<a name="269f35f8"></a>
## 依赖安装
在运行微前端工程之前，需要我们安装依赖包，可以使用[npm](https://www.npmjs.com/)、[cnpm](http://npm.taobao.org/)，在园区内网还可以使用[ynpm](https://package.yonyoucloud.com)

```bash
# 切换到我们刚才创建好的工程ucf-project目录下
npm install

# 淘宝国内镜像源
cnpm install

# 用友内网镜像源
ynpm install
```

![](https://cdn.nlark.com/yuque/0/2019/gif/192735/1548572629142-e3ff2ca1-9e5f-447f-a926-1c6c30eb5e48.gif#align=left&display=inline&height=504&originHeight=504&originWidth=671&size=0&status=done&width=671)


<a name="4c763bb6"></a>
## 运行
安装好我们的依赖包后，开始运行前端服务，如下：

```bash
# 开启调试服务
npm start
```

![](https://cdn.nlark.com/yuque/0/2019/gif/192735/1548573820996-949ce7b6-18b8-4aa3-8302-d353df9fa3eb.gif#align=left&display=inline&height=504&originHeight=504&originWidth=671&size=0&status=done&width=671)

<a name="0796f2ff"></a>
### 如何访问

> 访问的路径实际上就是ucf-apps文件夹内的名字，需要配合bootList进行设置


- 访问模式一：直接访问

启动完成后按照提示访问即可！[](http://127.0.0.1:3000/#/singletable-query)[http://127.0.0.1:3000/#/singletable-query](http://127.0.0.1:3000/#/singletable-query)

- 访问模式二：集成到应用平台后访问

也可以访问本地开发portal环境：[http:127.0.0.1:3000](http:127.0.0.1:3000)（访问密码：admin/123qwe，user/123qwe，demo/123qwe）。

**_注：访问模式一即通过URL的方式直接查看对应页面效果；_**<br />**_注：但为了__方便集中挂载管理，以及调试集成后效果，__单独应用或节点功能往往会被集成到应用平台的门户导航框架中，所以提供第二种访问方式。_**

<a name="02d9819d"></a>
### 提示

**默认启动端口是3000，如果被占用的话，工具会随机使用无占用端口进行开启服务，注意查看启动日志**

<a name="383aa405"></a>
## 资源构建

ucf 工程上线之前的前端构建如下：

```bash
# 开始构建前端静态资源到 ucf-publish
npm run build
```

![](https://cdn.nlark.com/yuque/0/2019/gif/192735/1548574422727-57777768-235c-4595-bd15-802ee039d850.gif#align=left&display=inline&height=504&originHeight=504&originWidth=671&size=0&status=done&width=671)

