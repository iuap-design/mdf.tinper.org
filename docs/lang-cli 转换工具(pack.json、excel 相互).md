<a name="61a3ec66"></a>
## 介绍

是一款编协助我们多语业务开发时候，资源本地化后，文件转换的小工具，后续希望可以通过分词来解决抽取问题。

<a name="e655a410"></a>
## 安装

```bash
$ ynpm install lang-cli -g (目前为内网)

$ mkdir app && cd app

$ lang-cli init
```

<a name="ecff77a8"></a>
## 使用

1. 把项目中的pack.js 文件改成 packa.json 文件(注意修改一下export), mdd 中直接导入zh-cn.json 即可。

```bash
$ lang excel --json [dir]     把多语格式的json文件，转换成可翻译的excel 文件  | -- 后为目标语言
```

> packa.json 文件格式


```json
{
  "zhcn":
  {
    "YS_FI_FP_0000032496": "十二月",
  }
  "enus":
  {
    "YS_FI_FP_0000032496": "十二月_en",
  }
  ....
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


<a name="8552ddb4"></a>
# todo List (未开发)
| cli命令 | 功能 | 备注 |
| --- | --- | --- |
| lang init | 初始化，提取中文文件 |  |
| lang sync | 拷贝当前src文件,复制一份和src同级目录，并进行字符、多语替换 {lang.template("请输入您要查找的组织关键字…")} |  |
| lang export | 把提取的文件导出成excel文件 |  |