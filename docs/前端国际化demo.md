<a name="ADWIW"></a>
## 前端ucf项目国际化介绍

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571730563527-9cddb88a-029e-4ae9-b483-f29c25c04d05.png#align=left&display=inline&height=821&name=image.png&originHeight=805&originWidth=257&search=&size=52888&status=done&width=262)

1. 在工程目录的根目录下新建一个lang目录。
2. [下载java lang-tool](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/mdd/lang-tool.zip) 把文件都拷贝到lang目录下。
3. 在 imp-iot-alarm-fe/ucf-apps/dfm/eqp/tag/src/app.js 文件中加入如下代码

```javascript
import {Locale} from "tinper-bee";
import lang ,{ Local } from "ac-lang-cn";
const pack = require('components/lang/pack.js');//.default;
lang.init(pack, null);
console.log(" ************************多语加载成功!***************************");
import React from 'react';
import mirror, { render, Router } from 'mirrorx';
import Routes from './routes';

// 全局样式
import './app.less';

// 设置mirrorx 路由加载方式
mirror.defaults({
    historyMode: "hash"
});

render(
	<Local Locale={Locale}>
		<Router>
			<Routes />
		</Router>
	</Local>, document.querySelector("#app"));

```


4. 取步骤参考 抽取工具入门篇 [提取工具入门篇](https://www.yuque.com/gpgy5k/ucf/gt5yld)


<br />把提取完成资源文件(文件名为时间戳.Json)整理成pack.js文件放置于原目录，pack.js文件内容 下面下面步骤5<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571731986681-840a1f59-69d9-46f4-b234-2b1f6cc917fd.png#align=left&display=inline&height=183&name=image.png&originHeight=183&originWidth=251&search=&size=14892&status=done&width=251)<br />

5. pack 为资源文件。格式如下:



```javascript
module.exports={
  "zhcn": {
      "YS_FI_FP_000003484632": "大前端技术部",
  },
  "zhtw": {
    "YS_FI_FP_000003484632": "大前端技術部",
  }
  "enus": {
    "YS_FI_FP_000003484632": "FED",
  }
}
```


6. 访问 http://ip:3000/xx?locale=zh-CN/en-US

7. 把pack.js 导出为excel

  1. 安装导出工具[lang-cli](https://package.yonyoucloud.com/#/package/bGFuZy1jbGk=)

```javascript
$ ynpm install lang-cli -g
```

  1. 把pack.js文件改成pack.json 文件，去掉文件内的module.exports = 即可。
  1. 在当前目录执行

```
$ lang excel --json /Users/jony/workspaces/yonyou/project/new/imp-iot-alarm-fe/lang/resource
```

  1. 就会在resource目录下生成excel文件。

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571732021277-01979d04-5143-4b56-a563-bf6fe45bd71f.png#align=left&display=inline&height=207&name=image.png&originHeight=207&originWidth=244&search=&size=16561&status=done&width=244)

  1. 发给翻译人员，进行翻译。
  1. 把翻译后的文件在换回来



```javascript
 $ lang excel --excel  /Users/jony/workspaces/yonyou/project/new/imp-iot-alarm-fe/lang/resource/1571710782275.xlsx
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571732830698-d0e30f9c-d797-4609-927f-043b0a56f7c5.png#align=left&display=inline&height=160&name=image.png&originHeight=160&originWidth=997&search=&size=43318&status=done&width=997)<br />
<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571734218477-91f46d1b-035e-4fd5-8b1f-4101afc29e30.png#align=left&display=inline&height=144&name=image.png&originHeight=144&originWidth=250&search=&size=13785&status=done&width=250)



~~ over ~~