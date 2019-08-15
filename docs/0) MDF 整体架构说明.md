<a name="9hFWt"></a>
# 一、前后端一体化的模型驱动方案 UCF-MDD

基于元数据的模型驱动解决方案是由以下几个方面组成：

- 存储层的统一元数据、业务数据
- 在业务服务层，有基于业务服务的相关后台SDK，包括UIMeta SDK、Rule SDK、Meta SDK等，通过这层会输出前后端交互的统一多端协议（标准JSON格式）。
- 在Web渲染层，中间加有基于 Node.js 的 BFF 服务，生成模板单据对应的通用CRUD逻辑代码，并实现一些基本的服务代理、验证等工作。
- 在前端展现层，则是完成基于UI元数据的解析渲染，并组装对应的React UI组件，最终在浏览器上呈现。

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/85184/1562745428657-d27f41e0-7753-4403-bd93-323e7faf37dc.png#align=left&display=inline&height=800&name=image.png&originHeight=1760&originWidth=1823&size=435192&status=done&width=828.6363456761545)
<a name="Xopk7"></a>
# 

<a name="89d7e7e7"></a>
# 二、Client 端架构
<a name="55c051ea"></a>
### 2.1 设计原则
**核心思想：**

- MVVM+模型驱动开发
- viewModel为编程模型，所有可编程操作的对象均为viewmodel。小到一个组件、大到一个UI模板均为一个viewModel对象。
- XX_xx_xxx.VM.extend.js为扩展页面UI模板的扩展文件，即写扩展代码的地方。
- 在extend文件里只能通过当前页面的**viewModel**对象来获取和操作页面UI交互（View）和业务数据（Model）
- Web和Mobile采用同一套ViewModel，故此Web、移动、大屏等多端的编程模型相同。
<a name="51c67f6c"></a>
### 2.2 前端架构图
![client.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271336/1554358904708-3d173aa9-da7d-400d-aa86-7a13439a66ce.png#align=left&display=inline&height=413&name=client.png&originHeight=732&originWidth=1322&size=111553&status=done&width=746)
<a name="88afcd3e"></a>
# 
<a name="pUBsr"></a>
# 三、基于 Node.js 的 BFF 服务架构

<a name="lAaxC"></a>
## 3.1 Node.js 定位和意义
 <br /> 目前我们更多把 Node 定位为 BFF（Backend For Frontend） 层实现，承担用户体验适配层职责。

- BFF 模式可以实现分层协助，整体分工明确；
- 后端通过 Java 等语言负责服务实现，理想情况下给前端提供的是基于领域模型的 RPC 接口；
- 前端则在 BFF 层直接调用服务端 RPC 接口拿到数据，按需加工消费数据，并实现人机交互；
- 前后端分层协作模式中，协作的边界是数据，后端提供数据服务接口，前端消费数据实现人机交互。

基于 BFF 模式的研发，很适合拥有前端技术背景的全栈型工程师。这种模式的好处在于：

- 后端可以专注于业务领域，更多从领域模型的视角去思考问题，
- 前端页面视角的数据交给前端型全栈工程师，从而实现稳定的服务，解决易变的前端。
- 领域模型与页面数据是两种思维模式，通过 BFF 可以很好地解耦开，让彼此更专业高效。


<a name="RwWpW"></a>
## 3.2 设计原则
**核心思想：**

- koa+middlewares，每一个middleware为一个相对独立职责的模块。
- 请求转发，解决跨域请求，对应koa-router各子路由
- 路由转发和数据处理，承担BFF职责，对应koa-router各子路由
- 代码生成（页面UI模板viewmodel代码+extend代码）
- 认证校验，对应Auth中间件
- 日志记录，对应log4js、koa-logger中间件

<a name="G69OH"></a>
## 3.3 架构图
![node.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271336/1554359036580-3ee28ddf-7fe1-4b9c-b231-22f0c406e35a.png#align=left&display=inline&height=410&name=node.png&originHeight=661&originWidth=1202&size=101245&status=done&width=746)