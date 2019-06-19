# 扩展开发-打印

功能概述<br />      目前打印组件实现了打印预览、打印设计、直接打印功能。直接打印目前只支持WInodws系统。用户可以在excel中自定义打印按钮的布局。下面是以dropdown形式你实现的。![image.png](https://cdn.nlark.com/yuque/0/2019/png/192681/1560390193991-f4ca6df3-5fdb-4bdd-8663-88bdad57a68c.png#align=left&display=inline&height=200&name=image.png&originHeight=400&originWidth=936&size=46212&status=done&width=468)
<a name="rQ07z"></a>
### 使用方式
增加PRINT_META参数，将打印的公共参数提取出来。目前支持package.json、env扩展两种方式。package.json优先级高于env扩展，但是可读性稍微差些。
<a name="i0IXz"></a>
#### <br />增加PRINT_META参数
<a name="QxiO2"></a>
##### 修改package.json
在启动命令中增加PRINT_META相关的打印参数。

```javascript
debug:client": "cross-env  BABEL_ENV=development PRINT_META=\"{\\\"domainCode\\\":\\\"jcjm\\\",\\\"printPreviewUrl\\\":\\\"http://u8cprint.test.app.yyuap.com/u8cprint/design/getPreview\\\",\\\"printDesignUrl\\\":\\\"http://u8cprint.test.app.yyuap.com/u8cprint/design/getDesign\\\"}\" webpack-dev-server --progress --colors  --config webpack.dev.config.js",
```

具体PRINT_META参数配置说明如下：

| domainCode | 领域名称 |
| --- | --- |
| printPreviewUrl | 请求预览URL |
| printDesignUrl | 请求打印设计URL |

<a name="05vhw"></a>
##### env扩展
在'src/server/env/index.js'文件夹下增加PRINT_META变量,并将变量抛出。

```javascript
const PRINT_META = JSON.parse(process.env.PRINT_META) || {
  domainCode:'jcjm',
  printDomain:'https://u8cprint-daily.yyuap.com',
  printDownLoad:'https://cdn.yonyoucloud.com/iprint/用友云打印助手.exe'
}

const env = {
···
  PRINT_META:PRINT_META,
···
}

```
在'src/server/middlewares/viewhook/html.jsx'中定义环境变量window.__PRINT_META__

```javascript
const printMeta = env.PRINT_META;
.....
<script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)}
      window.__PRINT_META__ = ${JSON.stringify(printMeta)}
 </script>
```


<a name="lt7Qr"></a>
#### webpack配置
DefinePlugin中增加process.env.PRINT_META参数。


```javascript
new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.__CLIENT__': 'true',
      'process.env.PRINT_META':JSON.stringify(process.env.PRINT_META)
    ),
```


<a name="1Iiu0"></a>
#### excel配置
在Excel中配置[bill_command]，首先需要增加打印按钮，配置方式跟之前一样，除此之前还需要增加paramter、action参数配置。下面为具体的paramter配置说明
<a name="7JXeZ"></a>
#### bill_command

  - 打印预览
| 属性名称 | 含义 | 备注 |
| --- | --- | --- |
| printcode | 打印模板 | eg:"voucher_system_default_20190515" |
| tenantId | 租户id | 后端后期会自动处理 |
| serverUrl | 数据源请求的url |  |
| params | 请求数据的参数 | eg:{"metaurl":"bd.currencytenant.CurrencyTenantVO"} |
| meta | 1数据源是是元数据0否 | 默认是1，非必填 |


<br />整体配置如下：
```javascript
{"tenantId":"lfvukx6f","printcode":"voucher_system_default_20190515","params":{"metaurl":"bd.currencytenant.CurrencyTenantVO","serverUrl":"http://ucfbasedoc.test.app.yyuap.com/meta/attribute"}}
```


  - 打印设计




| 属性名称 | 含义 | 备注 |
| --- | --- | --- |
| printcode | 打印模板 | eg:"voucher_system_default_20190515_20190515" |
| tenantId | 租户id | 后端后期会自动处理，非必填 |
| meta | 1数据源是是元数据0否 | 默认是1，非必填 |


<br />整体配置如下：
```javascript
{"printcode":"voucher_system_default_20190515","tenantId":"lfvukx6f"}
```

<br />

  - 直接打印
| 属性名称 | 含义 | 备注 |
| --- | --- | --- |
| params | 请求数据的参数 | eg:{"metaurl":"bd.currencytenant.CurrencyTenantVO"} |
| templateCode | 打印模板 | eg:"voucher_system_default_20190515" |
| tenantId | 租户id | 后端后期会自动处理 |
| serverUrl | 数据源请求的url |  |


<br />整体配置如下：
```javascript
{"templateCode": "voucher_system_default_20190515","tenantId": "lfvukx6f",  "params": { "metaurl": "bd.currencytenant.CurrencyTenantVO" },"serverUrl":"http://ucfbasedoc.test.app.yyuap.com/meta/attribute"  }
```


<a name="53rfT"></a>
#### 
下面为bill_command这张表中action字段的具体说明

| 打印类型 | action |
| --- | --- |
| 打印设计 | printdesign |
| 打印预览 | printpreview |
| 立即打印 | printnow |

<a name="8A4zM"></a>
### 扩展API

- beforePrintpreview 打印预览之前的回调，用户可以动态的修改params参数

```javascript
bisViewModel.on('beforePrintpreview',(data)=>{
   let params = data.params;
   let cmdParameter = JSON.parse( params.cmdParameter);
   //动态的修改cmdParameter内容
   
   //最后将修改后的内容赋值给params；
   data.params.cmdParameter = JSON.stringify(cmdParameter);

})
```


- beforePrintdesign 打印设计之前的回调，用户可以动态的修改params参数
