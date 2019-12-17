<a name="ADWIW"></a>
## 前端ucf项目国际化介绍

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1573110169825-d09a2649-3049-461d-940d-7c84f5c8bdf4.png#align=left&display=inline&height=1199&name=image.png&originHeight=1199&originWidth=309&size=105257&status=done&width=309)

**1. 在工程目录的根目录下新建一个lang目录。**

**2.**[**下载java lang-tool**](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/mdd/lang-tool.zip)** 把文件都拷贝到项目根目录下。**

**3.进入到业务领域的根目录下把app.js 重命名为index.js，并且新建一个app.js。**

**4.app.js 文件中添加如下代码**<br />

```javascript
import lang from "ac-lang-cn";
const pack = require('components/lang/pack.js');//.default;
lang.init(pack, null);
console.log(" ************************多语加载成功!***************************");
require('./index');
```

**5.index.js 里面加如下代码**

```javascript
import {Locale} from "tinper-bee";
import lang ,{ Local } from "ac-lang-cn";

...

render(
	<Local Locale={Locale}>
		<Router>
			<Routes />
		</Router>
	</Local>, document.querySelector("#app"));

```
 <br />**6.在 xx/ucf-common/src/components/lang/pack.js  新建文件。内容如下**<br />

```javascript
module.exports={
  "zhcn": {
      "YS_FI_FP_000003484632": "大前端技术部",// 拷贝上面的json文件内容，复制到此即可
  },
  "zhtw": {
    "YS_FI_FP_000003484632": "大前端技術部",
  },
  "enus": {
    "YS_FI_FP_000003484632": "FED",
  }
}
```

**7.取步骤参考 抽取工具入门篇 [提取工具入门篇](https://www.yuque.com/gpgy5k/ucf/gt5yld),把提取完成资源文件(文件名为时间戳.Json),拷贝所有放到"zhcn":{} 括号里。**

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571731986681-840a1f59-69d9-46f4-b234-2b1f6cc917fd.png#align=left&display=inline&height=183&name=image.png&originHeight=183&originWidth=251&size=14892&status=done&width=251)

**8.访问 http://ip:3000/xx?locale=zh-CN/en-US**

**9.把pack.js 导出为excel**<br />**<br />  a. 安装导出工具[lang-cl](https://package.yonyoucloud.com/#/package/bGFuZy1jbGk=)i<br />

```
$ ynpm install lang-cli -g
```
  b. 把pack.js文件改成pack.json 文件，去掉文件内的**module.exports =** 即可。<br />  c. 在当前目录执行
```javascript
$ lang excel --json xx/lang/resource
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571732021277-01979d04-5143-4b56-a563-bf6fe45bd71f.png#align=left&display=inline&height=207&name=image.png&originHeight=207&originWidth=244&size=16561&status=done&width=244)<br />

> 就会在resource目录下生成excel文件。
> 发给翻译人员，进行翻译。 

d. 把翻译后的文件在换回来 
```javascript
 $ lang excel --excel  /Users/jony/workspaces/yonyou/project/new/imp-iot-alarm-fe/lang/resource/1571710782275.xlsx
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571732830698-d0e30f9c-d797-4609-927f-043b0a56f7c5.png#align=left&display=inline&height=160&name=image.png&originHeight=160&originWidth=997&size=43318&status=done&width=997)<br />
<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571734218477-91f46d1b-035e-4fd5-8b1f-4101afc29e30.png#align=left&display=inline&height=144&name=image.png&originHeight=144&originWidth=250&size=13785&status=done&width=250)

excel 格式如下

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571819361461-51c0fbeb-4b8f-4d59-9d83-4272cda7ecee.png#align=left&display=inline&height=173&name=image.png&originHeight=173&originWidth=785&size=43754&status=done&width=785)

6. 修改运维url


<br />需要在节点注册的url上加如下代码。<br />$YHT_APPTENANT/****.html?locale={locale}<br />
<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1572322653535-20ec9183-d65d-4e7c-81ec-dea5b57d0ace.png#align=left&display=inline&height=555&name=image.png&originHeight=555&originWidth=746&size=76382&status=done&width=746)

~~ over ~~