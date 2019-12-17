在不同的产品风格中，个别交互逻辑，UE效果跟框架中的略有不同，例如：自定义卡片页面保存后的跳转，表格高度是否撑满整个屏幕，自定义页面模型的action方法等。我们可以通过扩展配置项来设定特有的风格。这里的配置项不仅仅只一些控件个别属性扩展、还有模型层的扩展。
<a name="oPP9Z"></a>
## 1 增加配置项文件
在src/web/common/config.comp.js文件中设定业务需要的扩展配置的内容<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/192681/1573628612540-88909fcb-3bfe-4e53-9c29-52dbd0194a3a.png#align=left&display=inline&height=239&name=image.png&originHeight=718&originWidth=684&size=62211&status=done&width=228)

<a name="m3XWo"></a>
## 2 配置项内容定义
下面是目前支持的自定义项扩展内容，用户可以根据项目自定义设置

```javascript
export default {
    table:{
        showRowNo:true ,//显示表格行号，
        operationPos:'right',//固定列
        voucherShowCheckbox:true,//一主一子表格显示checkbox
        heightFull:true, //表格是否撑满
        appendRowSelect:false, //新增一行后，是否选中当前行
        rowheight:30,//表格行高
        headerHeight:35,//表头行高,
        showValidateAlert:true//ncc表格保存，表体中有必须项，需要有提示
    },
    allConfirm:true,//所有操作增加确认框提示,
    referViewModel: process.env.__CLIENT__ && require('./viewmodel/referViewModel'),//参照model新的引用路径
    filterViewModel: process.env.__CLIENT__ && require('./viewmodel/filterViewModel'),//参照model新的引用路径
    ConvenientQuery:{
        autoLoad:false//过滤组件第一次加载页面是否自动搜索
    },
    refer:{
        treeTable:{
            directSearch:false, //是否直接查询,默认直接查询的
        },
        table: {
            pageSize: 50,
            showPagination:false //参照表格不足50行,不显示分页栏
        },
        multipleCanDbClick: true//参照--多选场景支持双击选中
    },
    voucher:{
        treeCard:true,
        saveReturn:false,
        deleteReturn:'movenext'//卡片页面删除后跳转到哪个页面，正常是跳转到列表页面，movenext跳转到下一条卡片，moveprev跳转到上一条卡片
    },
    editvoucherlist: {
      pageSize: 50
    },
    theme:'ncc',//主题风格
}

```

<a name="8rjPK"></a>
## 3 将配置项扩展注入给框架
在项目的入口文件处注入

```javascript
const { setCompConfig, setExtendComp } = require('@mdf/cube/lib/extend')

const extendConfig = require('../common/config.comp').default;
setCompConfig(extendConfig)
```
<a name="HzZZO"></a>
## 4 典型示例
在表格中，将操作列固定在右侧固定列。<br />我们只需在src/web/common/config.comp.js文件中，定义table属性就可以。

```javascript
export default {
    table:{
        showRowNo:true ,//显示表格行号，
        operationPos:'right',//固定列
   }
}

```