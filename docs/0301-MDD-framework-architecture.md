# MDD框架整体架构

<a name="9hFWt"></a>
# 1、设计思想
整个MDD架构遵循以下大原则：

- 前端（client）遵循MVVM框架，开发者面向ViewModel编程
- 服务器端（node）由koa2的middlwares提供前后端分离
- 脚手架工程由Node Server运行时+运行时框架包（yxyweb）组成
- 提供不同层次的扩展（组件级、ViewModel级、页面模板级）

<a name="89d7e7e7"></a>
# 2. client架构
<a name="55c051ea"></a>
### 2.1 设计原则：
**核心思想：**

- MVVM+模型驱动开发
- viewModel为编程模型，所有可操作的对象均为viewmodel。小到一个组件、大到一个UI模板均为一个viewModel对象。
- XX_xx_xxx.VM.extend.js为扩展页面UI模板的扩展文件，即写扩展代码的地方。
- 在extend文件里只能通过当前页面的**viewModel**对象来获取和操作页面UI交互（View）和业务数据（Model）
<a name="51c67f6c"></a>
### 2.2 前端架构图
![client.png](https://cdn.nlark.com/yuque/0/2019/png/271336/1554358904708-3d173aa9-da7d-400d-aa86-7a13439a66ce.png#align=left&display=inline&height=413&name=client.png&originHeight=732&originWidth=1322&size=111553&status=done&width=746)
<a name="88afcd3e"></a>
# 

