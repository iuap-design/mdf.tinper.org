<a name="vuNhZ"></a>
## 背景及需求

之前为了实现服务端无状态、兼容无cookie的情况，会在请求后端接口时，会在url的param参数中明文携带了token参数。

本次执行渗透性测试中对这种不安全代码进行了全面扫描，为保证兼容，MDF前端公共框架内部做了兼容升级处理，增加移除Token开关，即当环境变量配置文件中`excludeToken` 参数为 `true` 时，则将 `url` 中的 `token` 参数去掉，不做配置则保留携带参数。待本次验证后，框架层将默认全部废弃参数中携带token的写法。

由于各领域业务工程依赖MDF框架相关的package，故本次升级验证需要各业务工程同步升级，以下为操作指导。

<a name="ooRvn"></a>
## 解决方案及指导步骤

**第一步：**在config.env.js中增加excludeToken:true。

```
export default {
  ...
  excludeToken:true,
  ...

}
```

（备注：client/index.js注入环境变量，之前脚手架中已经注入过环境变量。）

```
const { setEnvConfig, setCompConfig, setExtendComp } = require('@mdf/cube/lib/extend')
const envConfig = require('../common/config.env').default;
setEnvConfig(envConfig)
```

**第二步：daily环境验证，**修改package.json中@mdf/cube、@mdf/plugin-meta 的版本号为snapshot。

```javascript
 "dependencies": {
    "@mdf/cube": "snapshot",
    "@mdf/plugin-meta": "snapshot"
 }
```

**第三步：预发布环境验证，**修改package.json中@mdf/cube、@mdf/plugin-meta 的版本号为对应的具体版本号，目前暂未发布框架的1219稳定版。