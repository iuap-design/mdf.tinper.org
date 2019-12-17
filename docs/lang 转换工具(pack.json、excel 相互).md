是一款编协助我们多语业务开发时候，资源本地化后，文件转换的小工具，后续希望可以通过分词来解决抽取问题。
> 支持node > 8以上 


<a name="e655a410"></a>
## 安装

```bash
$ ynpm install ac-lang-cli -g (目前为内网)
```

<a name="ecff77a8"></a>
## 使用

1. 把项目提取后的json文件转换成excel

```bash
$ lang excel --json [dir]     把多语格式的json文件，转换成可翻译的excel 文件  | -- 后为目标语言
```

> xx.json 文件格式


```json
{
  "YS_FI_FP_0000032496": "十二月",
}
```

```bash
$ lang excel --excel [dir] | 把翻译后的excel文件，再换回json文件  | -- 后为目标语言 |
```

2. 根据提示会在当前命令行目录下生成对应的文件，进行替换项目pack.js 即可(替换的时候注意js、json的转换)。

<a name="04082f00"></a>
## 常用命令 cli 工具，命令如下。
| cli命令 | 功能 | 备注 |
| --- | --- | --- |
| lang excel --json [dir] | 把多语格式的json文件，转换成可翻译的excel 文件 | -- 后为目标语言 |
| lang excel --excel [dir] | 把翻译后的excel文件，再换回json文件 | -- 后为目标语言 |


示例:demo

确认是否安装成功！

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571820919282-e1f8316f-53fa-4017-95cc-3d382086fb06.png#align=left&display=inline&height=59&name=image.png&originHeight=59&originWidth=306&size=7178&status=done&width=306)

把json 文件转成 excel 

```jsx
lang excel --json  /Users/jony/workspaces/yonyou/project/FC_OMC_WEB/lang/resources/2019_10_23_15_49_40.json
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571818790405-cfdd1449-d6e5-48ee-976c-46544d15871d.png#align=left&display=inline&height=55&name=image.png&originHeight=55&originWidth=940&size=19895&status=done&width=940)

把excel 文件转成 json

```javascript
lang excel --excel  /Users/jony/workspaces/yonyou/project/FC_OMC_WEB/lang/resources/1571818283216.xlsx 
```

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571818668938-8bd50f2a-e396-4268-b94b-bfa963f3687b.png#align=left&display=inline&height=62&name=image.png&originHeight=62&originWidth=922&size=21301&status=done&width=922)

目录结构如下:

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571818917722-11298ecb-5398-4f04-95ea-84ab88f808ac.png#align=left&display=inline&height=244&name=image.png&originHeight=244&originWidth=333&size=23818&status=done&width=333)

excel 格式如下

![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/319615/1571819361461-51c0fbeb-4b8f-4d59-9d83-4272cda7ecee.png#align=left&display=inline&height=173&name=image.png&originHeight=173&originWidth=785&size=43754&status=done&width=785)