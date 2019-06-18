# Node Server端整体架构

<a name="88afcd3e"></a>
# 1、Node 定位和意义
    目前我们更多把 Node 定位为 BFF（Backend For Frontend） 层实现，承担用户体验适配层职责。

- BFF 模式可以实现分层协助，整体分工明确；
- 后端通过 Java 等语言负责服务实现，理想情况下给前端提供的是基于领域模型的 RPC 接口；
- 前端则在 BFF 层直接调用服务端 RPC 接口拿到数据，按需加工消费数据，并实现人机交互；
- 前后端分层协作模式中，协作的边界是数据，后端提供数据服务接口，前端消费数据实现人机交互。

 <br />    基于 BFF 模式的研发，很适合拥有前端技术背景的全栈型工程师。这种模式的好处在于：

- 后端可以专注于业务领域，更多从领域模型的视角去思考问题，
- 前端页面视角的数据交给前端型全栈工程师，从而实现稳定的服务，解决易变的前端。
- 领域模型与页面数据是两种思维模式，通过 BFF 可以很好地解耦开，让彼此更专业高效。


<a name="97iSn"></a>
# 2、设计原则
**核心思想：**

- koa+middlewares，每一个middleware为一个相对独立职责的模块。
- 请求转发，解决跨域请求，对应koa-router各子路由
- 路由转发和数据处理，承担BFF职责，对应koa-router各子路由
- 代码生成（页面UI模板viewmodel代码+extend代码）
- 认证校验，对应Auth中间件
- 日志记录，对应log4js、koa-logger中间件
<a name="zYqQ0"></a>
# 3、架构图
![node.png](https://cdn.nlark.com/yuque/0/2019/png/271336/1554359036580-3ee28ddf-7fe1-4b9c-b231-22f0c406e35a.png#align=left&display=inline&height=410&name=node.png&originHeight=661&originWidth=1202&size=101245&status=done&width=746)
