> 创建者：姚磊
> 创建时间：2019-10-17
> 修改者：
> 修改时间：


<a name="bnRyu"></a>
# 开发指导汇总
<a name="a0bc3cc6"></a>
## 一、多卡片显示和隐藏
**1、元数据的XML配置**<br />配置元数据为多个实体，实体之间的关系为一对一，此处不做配置的详细说明<br />此方式需要配置roleAMulti="0..n"

**2、UI元数据的Excel配置**<br />配置红框中的前3条数据为GroupContainer、Group、Div，代表基础组织卡片区域，后3条数据代表行政组织卡片区域，里面的属性不作详细明说<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1553308584352-ff07f3fb-4fe8-4751-b7a4-886215c8fb3b.png#align=left&display=inline&height=390&name=image.png&originHeight=390&originWidth=2092&search=&size=128222&status=done&width=2092)<br />
<br />Excel示例附件[组织多卡片.xlsm](https://www.yuque.com/attachments/yuque/0/2019/xlsm/271337/1553310451265-b5be207f-a9a5-4ac9-8ec9-eaf6ca436116.xlsm?_lake_card=%7B%22uid%22%3A%22rc-upload-1553310409712-3%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fxlsm%2F271337%2F1553310451265-b5be207f-a9a5-4ac9-8ec9-eaf6ca436116.xlsm%22%2C%22name%22%3A%22%E7%BB%84%E7%BB%87%E5%A4%9A%E5%8D%A1%E7%89%87.xlsm%22%2C%22size%22%3A162176%2C%22type%22%3A%22application%2Fvnd.ms-excel.sheet.macroenabled.12%22%2C%22ext%22%3A%22xlsm%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22uhDCQ%22%2C%22card%22%3A%22file%22%7D)

**3、指定子表编辑的数据**<br />由于处理 一主一子 关系时认为 一主一子 是 一主多子 的特殊情况，所以需要主动告诉模型当前是 一主一子 的情况，框架在进行操作时会特殊处理

主动告知方法：

```javascript
viewmodel.getGridModel().setState('defaultSelectedRowIndexes', true);
//或
viewmodel.get('bd_org_admin').setState('defaultSelectedRowIndexes', true);
viewmodel.get('<子表ViewModel的Key>').setState('defaultSelectedRowIndexes', true);
```

<br />**4、控制行政区域卡片隐藏**<br />下面代码中的bd_org_admin_head_page为行政区域最外的GroupContainer容器的cCode
```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
    var bd_bd_org_VM_Extend = {
        doAction: function (name, viewmodel) {
            if (this[name])
                this[name](viewmodel);
        },
        init: function (viewmodel) {
          	viewmodel.get('adminOrgVO').setState('defaultSelectedRowIndexes', true);
            viewmodel.get('financeOrgVO').setState('defaultSelectedRowIndexes', true);
						viewmodel.get('corporateOrgVO').setState('defaultSelectedRowIndexes', true);
            viewmodel.get('factoryOrgVO').setState('defaultSelectedRowIndexes', true);
						viewmodel.get('inventoryOrgVO').setState('defaultSelectedRowIndexes', true);
            viewmodel.get('salesOrgVO').setState('defaultSelectedRowIndexes', true);
						viewmodel.get('purchaseOrgVO').setState('defaultSelectedRowIndexes', true);
            
          	viewmodel.on("afterLoadData",function(){
                if (viewmodel.getParams().mode=="add") {
                    viewmodel.get('adminOrgVO').appendRow();
                    viewmodel.get('financeOrgVO').appendRow();
                    viewmodel.get('corporateOrgVO').appendRow();
                    viewmodel.get('factoryOrgVO').appendRow();
                    viewmodel.get('inventoryOrgVO').appendRow();
                    viewmodel.get('salesOrgVO').appendRow();
                    viewmodel.get('purchaseOrgVO').appendRow();
                }
            });
          
            viewmodel.execute('updateViewMeta', {
                code: 'bd_org_admin_head_page',
                visible: false
            });
        }
    }
    try {
        module.exports = bd_bd_org_VM_Extend;
    } catch (error) {

    }
    return bd_bd_org_VM_Extend;
});
```

**5、updateViewMeta方法说明**<br />用于更新容器的ViewMeta，除visible之外，还支持refresh和disabled

- visible：是否显示，true-显示 | flase-隐藏
- refresh：是否刷新，true-刷新 | flase-不刷新
- disabled：是否可用，true-可用 | flase-不可用

```javascript
viewmodel.execute('updateViewMeta', {
    code: 'bd_org_admin_head_page',
    visible: false,
  	refresh: true
});
```

<a name="9b06e717"></a>
## 二、自由单据使用 FreeView
**1、元数据的XML配置**<br />配置元数据为两个实体，实体之间的关系没有关系，此处不做配置的详细说明<br />
<br />**2、UI元数据的Excel配置**<br />注意事项：

- 如果实体需要用非SimpleModel的模型渲染，则需要在Excel中指定cModelType类型，如：下例会某个实体为Table，需要指定cModelType为GridModel
- 如果需要页面展示为左右两个表格，则需要指定其中一个表格的cAlign属性为left，框架会把标记为left的容器放在左边显示
- 需要指定bill_type表的cBillType为FreeView
- 需要注意配置表格中列表的列宽，如配置iColWidth为150，即表格列宽为150px
- 为左右表格的父容器设置iCols属性为2
- 在单据信息里配置默认过滤器，属性cFilterId

Excel示例附件 [对账二列表.xlsm](https://www.yuque.com/attachments/yuque/0/2019/xlsm/271337/1554204043214-8d665e50-7ed6-4edf-99bf-4477240c71d5.xlsm?_lake_card=%7B%22uid%22%3A%22rc-upload-1554183551555-5%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fxlsm%2F271337%2F1554204043214-8d665e50-7ed6-4edf-99bf-4477240c71d5.xlsm%22%2C%22name%22%3A%22%E5%AF%B9%E8%B4%A6%E4%BA%8C%E5%88%97%E8%A1%A8.xlsm%22%2C%22size%22%3A147375%2C%22type%22%3A%22application%2Fvnd.ms-excel.sheet.macroenabled.12%22%2C%22ext%22%3A%22xlsm%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22DjWxW%22%2C%22card%22%3A%22file%22%7D)

**3、扩展脚本编写**<br />使用setDataSource请求数据并灌入表格中，代码如下：

```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
    var bd_bd_rcc_VM_Extend = {
        doAction: function (name, viewmodel) {
            if (this[name])
                this[name](viewmodel);
        },
        init: function (viewmodel) {
            viewmodel.get('bd_rcc_base').setDataSource(
                { url: '/bill/list', method: 'POST' },
                { billnum: 'bd_rcc', condition: {} });
            viewmodel.get('bd_rcc_admin').setDataSource(
                { url: '/bill/list', method: 'POST' },
                { billnum: 'bd_rcc', condition: {} });
        }
    }
    try {
        module.exports = bd_bd_rcc_VM_Extend;
    } catch (error) {

    }
    return bd_bd_rcc_VM_Extend;
});
```

<a name="9ab3874f"></a>
## 三、表格滚动条、分页联动
**1、滚动条联动**<br />当一个表格滚动时，另一个表格同步滚动。实现这个功能需要两个方法，一个时表格滚动的监听事件，另一个是设置表格滚动位置。

```javascript
//滚动条事件监听
gridModel.on('verticalScroll',(position)=>{
	//设置滚动条的位置
  otherGridModel.setScrollTop(position);
})
```

**2、分页联动**<br />同步分页的pageSize、pageIndex。实现这个功能需要有分页pageInfoChange的监听事件、模型层设置分页的pageSize、pageIndex事件。   

```javascript
//分页监听事件
gridModel.on('pageInfoChange',(pageInfoChange)=>{
           
})
//设置分页pageIndex
gridModel.setPageIndex(nextPageIndex)

//设置分页的pageSize
gridModel.setPageSize(nextPageSize);
```
整体代码：

```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
   /**
    * 同步滚动效果
    * @param {*} gridModel 改变的表格
    * @param {*} otherGridModel 待同步的表格
    */
    function _scrollChange(gridModel,otherGridModel){
        gridModel.on('verticalScroll',(position)=>{
            otherGridModel.setScrollTop(position);
        })
    };
    /**
     * 同步分页效果
     * @param {Object} gridModel 改变的表格
     * @param {Object} otherGridModel 待同步的表格
     */
    function _pageChange(gridModel,otherGridModel){
        gridModel.on('pageInfoChange',(pageInfoChange)=>{

            const nextPageIndex = pageInfoChange.pageIndex;
            const nextPageSize = pageInfoChange.pageSize;
            const currentPageIndex = otherGridModel.getPageIndex();
            const currentPageSize = otherGridModel.getPageSize();
            //注意：这里需要判断是否相等，否则会无线运行下去
            if(nextPageIndex !== currentPageIndex){
                otherGridModel.setPageIndex(nextPageIndex);
            }
            if(nextPageSize !== currentPageSize){
                otherGridModel.setPageSize(nextPageSize);
            }
       })
    }
    var bd_bd_rcc_VM_Extend = {
        doAction: function (name, viewmodel) {
            if (this[name])
                this[name](viewmodel);
        },
        init: function (viewmodel) {
            const url = '/bill/list';
            const vmName = 'bd_rcc';

            let leftGrid = viewmodel.get('bd_rcc_base');
            let rightGrid = viewmodel.get('bd_rcc_admin');
            //请求数据
            leftGrid.setDataSource(
                {url:url,method:'POST'},
                {billnum:vmName});
            rightGrid.setDataSource(
                    {url:url,method:'POST'},
                    {billnum:vmName});
            // 滚动条联动
            _scrollChange(leftGrid,rightGrid);
            _scrollChange(rightGrid,leftGrid);
            // 分页联动
            _pageChange(leftGrid,rightGrid);
            _pageChange(rightGrid,leftGrid);
         
        }
    }
    try {
        module.exports = bd_bd_rcc_VM_Extend;
    } catch (error) {

    }
    return bd_bd_rcc_VM_Extend;
});
```

<a name="7167b92b"></a>
## 四、扩展CSS样式
**1、创建样式扩展文件并编写样式类**

- 创建样式src/client/styles/extend.less
- 在src/client/index.jsx中引用上面的样式文件
- 编写样式类
```css
.padding-60{
    padding: 60px !important;
}

.padding-left-30{
    padding-left: 30px !important;
}

.padding-right-30{
    padding-right: 30px !important;
}
```

**2、在Excel中对应的容器配置cStyle属性**<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1554204299639-973dc01f-ea7c-4966-96b4-d667e2d0d46d.png#align=left&display=inline&height=242&name=image.png&originHeight=242&originWidth=1514&search=&size=47370&status=done&width=1514)

**3、打开运行时界面查看运行效果**<br />**
<a name="4082c106"></a>
## 五、过滤器及方案配置
**1、单据信息表配置**<br />单据信息表中为单据配置默认过滤器，属性为cFilterId，值为pb_meta_filters表的主键

**2、配置过滤方案4张表**<br />配置pb_meta_filters、pb_meta_filter_item、pb_filter_solution、pb_filter_solution_common数据<br />pb_meta_filters：过滤器，配置过滤器，可以配置多个过滤器，单据中配置默认过滤器，目前框架也支持在运行时配置单据过滤器<br />pb_meta_filter_item：过滤项，过滤项字段必需是billitem_base中的字段且字段bFilter必需开启<br />pb_filter_solution：过滤方案，过滤的最大单位<br />pb_filter_solution_common：过滤方案公共<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1554343604723-ac5f49cc-d782-4598-910f-b41b66e8dcdb.png#align=left&display=inline&height=300&name=image.png&originHeight=600&originWidth=2156&search=&size=209568&status=done&width=1078)

<a name="9e5e4f90"></a>
## 六、表格|列表树使用
**1、元数据的XML配置**<br />XML示例附件[pc.productcls.xml.zip](https://www.yuque.com/attachments/yuque/0/2019/zip/271337/1554355860525-0b859afb-0057-4cb3-a220-5ccaa8dc4b49.zip?_lake_card=%7B%22uid%22%3A%22rc-upload-1554355729034-8%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fzip%2F271337%2F1554355860525-0b859afb-0057-4cb3-a220-5ccaa8dc4b49.zip%22%2C%22name%22%3A%22pc.productcls.xml.zip%22%2C%22size%22%3A1443%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22silbM%22%2C%22card%22%3A%22file%22%7D)

**2、UI元数据的Excel配置**<br />配置表格类型(cContorlType)为TreeTable<br />![](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1554342865449-38bfeee8-c831-49a4-97d9-bbca0f76af28.png#align=left&display=inline&height=86&originHeight=212&originWidth=1830&search=&status=done&width=746)

Excel示例附件[管理分类列表.xlsm](https://www.yuque.com/attachments/yuque/0/2019/xlsm/271337/1554343066450-066426a2-5de6-454c-be36-ca380e310d26.xlsm?_lake_card=%7B%22uid%22%3A%22rc-upload-1554342457121-4%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fxlsm%2F271337%2F1554343066450-066426a2-5de6-454c-be36-ca380e310d26.xlsm%22%2C%22name%22%3A%22%E7%AE%A1%E7%90%86%E5%88%86%E7%B1%BB%E5%88%97%E8%A1%A8.xlsm%22%2C%22size%22%3A167367%2C%22type%22%3A%22application%2Fvnd.ms-excel.sheet.macroenabled.12%22%2C%22ext%22%3A%22xlsm%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22Ow8wS%22%2C%22card%22%3A%22file%22%7D)

**3、框架更改**<br />更改文件：src/yxyweb/client/common/referViewModel.js<br />解决问题：

- 树表参照的配置
- 参照不支持树表模型
- 搜索到的结果不显示
- 搜索内容为空时，搜索全部数据
- 显示全部按钮不生效
- 搜索结果分页

**4、添加逻辑控制**<br />包含下级

<a name="e3f48cca"></a>
## 七、多页签参照 | 组合参照


<a name="0e7cf5ba"></a>
## 八、打开指定页面

**1、扩展脚本中打开指定单据**<br />**
```javascript
//云端导入
viewmodel.get('btnCloudImport').on('click', function () {
  let datas = viewmodel.getAllData();
  var serviceUrl = cb.rest.AppContext.serviceUrl;
  var url = serviceUrl + '/uniform/billmeta/tpllist?terminalType=1&token=';
  var params1 = {
    billno: 'bd_currencyCloudImportlist'
  };
  var proxy = cb.rest.DynamicProxy.create({
    settle: {
      url: url,
      method: "GET"
    }
  });
  proxy.settle(params1, function (err, result) {
    if (err) {
      cb.utils.alert(err.message, 'error');
      return;
    }
    if (result != undefined) {
      var mone = result[0];
      var params = {
        mode: 'add',
        id: mone
      };
      var data = {
        billtype: 'voucherList',
        billno: 'bd_currencyCloudImportlist',
        params: params
      };
      cb.loader.runCommandLine('bill', data, viewmodel)
    }
  });
});
```

**2、扩展脚本中打开指定菜单或组件**

```javascript
viewmodel.on('beforeEdit', function (args) {
  var gridData = viewmodel.getGridModel().getData();
  var id = gridData[args.params.params.index].id;
  var data = { params: { mode: "edit", dataSource: args, id: id, parentViewModel: viewmodel }, parentViewModel: viewmodel };
  viewmodel.communication({
    payload: {
      title: '编辑角色',
      type: 'platform',
      url: 'role',
      checkReturn: true,
      data: data
    }
  });
  return false;
});
```

**3、Dom元素中打开指定单据**

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import { SelfItem } from '../def-selfItem/SelfItem';
import DynamicView from 'yxyweb/common/components/portal/DynamicView';
process.env.__CLIENT__ && require('./itemMultiView.less');

const headers = { "Content-Type": "application/json" };
const hostUrl = process && process.env.NODE_ENV === "development" ? "http://localhost:3003" : "http://u8cdev-ext-fe.test.app.yyuap.com";

class itemMultiView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount = () => {
  }
  callback = (key) => {
    //console.log(key);
  }
  render() {
    const params={billtype:'voucherlist',billno:'attrextlist'}
    return (
      <div className="self-item-multiview-container">
        <Tabs onChange={this.callback} type="card">
            <TabPane tab="档案视角" key="1">
               <SelfItem />
            </TabPane>
            <TabPane tab="自定义视角" key="2">
               <DynamicView params={params}/>
            </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(itemMultiView);

```

<a name="1q862"></a>
## 九、设置列表无分页
默认列表为分页列表，如果想设置让列表不分页，可通过扩展脚本，设置GridModel的pagination属性为false

```javascript
viewmodel.getGridModel().setState('pagination', true);
```