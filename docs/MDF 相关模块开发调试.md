<a name="xHcwA"></a>
## 说明

MDF2.0 框架采用 monorepo 的方式进行维护，使用lerna进行分包的管理机制。

<a name="FDAs0"></a>
## 机制

由于模块间的依赖解耦还不够理想，框架中各子模块进行调试的时候需要运行单独的调试脚本（每个子模块工程中有一个debug.js 以及对应的.babelrc配置文件）

```css
/**
 * 调试代码输出脚本
 */
const path = require('path');
const { spawn } = require('child_process');
// 修改 targetPackage 为输出位置
const targetPackage = "../mdf-app/node_modules/@mdf/cube/lib";

const targetLib = path.resolve('.', targetPackage);

let _argv = ['-w', '-s', 'inline', 'src', '-d', targetPackage];

let babel = spawn('babel', _argv);
babel.stdout.on('data', function (chunk) {
    console.clear();
    console.log('MDF DEBUG WATCH -> ', chunk.toString());
    console.log('MDF LIB TARGET  -> ', targetLib);
});
babel.on('close', function (code) {
    console.log('babel -> close code : ' + code);
});
babel.on('exit', function (code) {
    console.log(code);
});
```


<a name="DqsWE"></a>
## 开发调试指南
（以mdf-cube模块为例）

```css
cd yonyou-mdf-framework/packages/mdf-cube
ynpm install
npm run debug
```


<a name="I1Mhl"></a>
### 修改debug.js，将资源构建到业务工程中

场景：

- `ucf-amc-front`  为 `NC资产云` 前端工程，而我们希望调试 `yonyou-mdf-framework` 核心框架中的   `mdf-metaui-web` 这个 `package` ，那么可以修改 `packages/mdf-metaui-web/debug.js` ，修改如下： 
```json
// 修改 targetPackage 为输出位置
const targetPackage = "../../../ucf-amc-front/node_modules/@mdf/metaui-web/lib";
// const targetPackage = "../mdf-app/node_modules/@mdf/metaui-web/lib";

```

<a name="MX6hk"></a>
## Package发布指南
> （以mdf-cube模块为例）



<a name="mfAzV"></a>
### （1）执行构建
构建出 `lib` target资源，为发布做准备。

```css
npm run lib
```

<a name="njPjM"></a>
### （2）修改版本号
修改 `package.json` 中的 `version` 版本号，改第三位 2.0.x。

<a name="UAjMQ"></a>
### （3）执行发布

然后执行发布命令：

```css
ynpm publish
```

`ynpm` 是基于 `nexus oss`  搭建的用友内部 `Node` 镜像服务，服务器是购买的阿里云线上机器，如需发包权限，请找 `wangshih@yonyou.com`  申请。