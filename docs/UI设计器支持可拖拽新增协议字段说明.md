<a name="5BkiN"></a>
## 字段说明

| 字段名称 | 类型 | 示例 | 含义 |
| --- | --- | --- | --- |
| nid | String | "nid_15684724783" | 标识当前dom的唯一性id |
| uitype | String | "BillEntity" | 标识当前的UI组件类型 |


```json

<div nid={nid} uitype={uitype}></div>

```

<a name="6rF7V"></a>
## 协议示例

```json
# 传忠补充


```


<a name="oz9lS"></a>
## 开发调试

1. 基于 viewner 工程调试：[http://git.yonyou.com/yonyou-mdf/mdf-design-viewer](http://git.yonyou.com/yonyou-mdf/mdf-design-viewer)
1. viewner 工程引用最新版本的 @mdf/metaui-web 和 @mdf/baseui
1. 在[http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/commits/hpapass](http://git.yonyou.com/yonyou-mdf/yonyou-mdf-framework/commits/hpapass) 分支开发调试并发包
1. 调试的方式：npm run debug。（调试的时候需要调整targetPath）

<a name="rrYT0"></a>
## 版本发布

- @mdf/baseui 先 2.0.0-SNAPSHOT 版本，后续持续发布 2.0.0-SNAPSHOT.1等版本
- @mdf/metaui-web 发布 @mdf/metaui-web 的 3.0.0-SNAPSHOT 版本（引用@mdf/baseui 的 2.0.0-SNAPSHOT 版本）

<a name="lR56m"></a>
## 分工

- [@mdf/metaui-web](#) 姚鑫
- [@mdf/metaui-web](#)-ncc 姚鑫
- [@mdf/baseui](#) 华英杰
- [@mdf/theme](#) 华英杰
- tinper-bee 杨晨晨

<a name="hzsP7"></a>
## tinper-bee 组件对“自定义属性”的支持情况

目前统计到 MDF 中依赖了 35 个 tinper-bee BaseUI 组件，其中对自定义属性的支持情况如下：

总计：35 个

已支持的：35 个

不支持的：0 个

<a name="XFEpJ"></a>
## metaui-web拖拽进展

metaui-web 的nid和uitype替换进展<br />excel统计的进展[链接](https://docs.qq.com/sheet/DRERWZWxCYllOeVNz?tab=BB08J2&c=D13A0A0)
<a name="weVH7"></a>
### meta
根据util.jsx的parseContainer逻辑，总共需要处理41个文件，2文件未处理。nid和uitype总共添加了39个文件。<br />还有10个其他文件未处理。
<a name="0I0Bw"></a>
### **meta-running**
根据util.jsx的parseContainer逻辑，Meta.js已添加属性
<a name="BQiNp"></a>
### basic
根据util.jsx的parseContainer逻辑，basic文件夹添加17个文件
<a name="QgqwI"></a>
### filter
根据util.jsx的parseContainer逻辑，filter.js和index.js已添加属性
<a name="iQ3cb"></a>
### dimension-setting
根据util.jsx的parseContainer逻辑，DimensionSetting已添加属性
<a name="93ezG"></a>
### simple-filter
根据util.jsx的parseContainer逻辑，SimpleConvenientQuery.js已添加属性
<a name="5azQm"></a>
### **file-upload**
根据util.jsx的parseContainer逻辑，Fileupload.js已添加属性

<a name="jUgwb"></a>
## metaui-web-ncc拖拽进展
metaui-web-ncc 的nid和uitype替换进展<br />excel统计的进展[链接](https://docs.qq.com/sheet/DRERWZWxCYllOeVNz?c=D13A0A0&tab=60mwpa)
<a name="noxH9"></a>
### basic
根据util.jsx的parseContainer逻辑，所使用到的文件，basic文件夹添加5个文件
<a name="B5seP"></a>
### filter
根据util.jsx的parseContainer逻辑，所使用到的文件，filter.js已添加属性