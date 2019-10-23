MDF 模型驱动开发框架 V2.0 采用分层分包的插件化架构进行管理和维护，支持开发者通过扩展的方式新增插件包的方式来灵活响应产品需求，现将框架提供的官方模块功能进行如下说明：

| Package Name | Package Description | Dependencies  |
| :--- | :--- | ---: |
| mdf-app | 前端运行时框架（精简后的脚手架） | 其他所有的package |
|  [mdf-cube](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-cube) | Cube Core SDK （全局方法、工具函数、ViewModel 逻辑抽象和 common action） |  |
|  [mdf-metaui-mobile](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-metaui-mobile) | MetaUI 组件包（Mobile） |  |
|  [mdf-metaui-web](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-metaui-web) | MetaUI 组件包（Web）；后续考虑扩展组件市场建设？ |  |
|  [mdf-middlewares-auth](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-middlewares-auth) | BFF服务：权限验证中间件 |  |
|  [mdf-middlewares-log4js](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-middlewares-log4js) | BFF服务：日志中间件 |  |
|  [mdf-plugin-filter](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-plugin-filter) | BFF服务：查询方案 |  |
|  [mdf-plugin-meta](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-plugin-meta) | BFF服务：UI元数据、 前端JS代码生成 |  |
|  [mdf-theme-default](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-theme-default) | 主题包：默认U8X主题 |  |
|  [mdf-theme-ncc](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/tree/master/packages/mdf-theme-ncc) | 主题包：NCC风格 |  |
| ~~mdf-conf~~ | ~~环境变量配置？暂无，配置项目前在运行时框架的脚手架工程中~~ |  |