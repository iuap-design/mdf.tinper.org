# 运行时模板加载过程

<a name="91f67be4"></a>
## 模板检索
[TOC]<br /># 框架思想<br />- 使用react-router路由控制component，参见 `common/redux/routes.jsx`<br />   ```<br />       <Route exact path="/meta/:billtype/:billno" component={Components.DynamicView} /><br />       <Route path="/meta/:billtype/:billno/:billid" component={Components.DynamicView} /><br />   ```<br />- 使用react-redux的状态管理控制React组件渲染<br />   - DynamicView > PortalTabItem > Meta<br />- DynamicView发起meta请求后将setSate({ vm: vm, metaData: viewmeta })<br />- node端<br />   - viewhook生成ctx.store, 定义ctx.render<br />       - ctx.render的作用<br />           - ctx.body由ReactDOMServer.renderToString将Isomorph组件和Router编程字符串<br />           -<br />       - Isomorph组件<br />       <br />   - meta请求 ctx.store<br />##编程方式<br />- MVVM中的VM进行编程<br />- M和V交给框架和业务

# 前端UI渲染引擎<br />## 1. 第一次请求，meta/voucherlist/staff页面路由请求<br />- 第一阶段：viewhook，viewhook/index.jsx<br />   - 创建ctx.store，调用Isomorph.createStore<br />       - 代码位置：src/common/redux/store/configureStore.dev.jsx<br />       - 调用reateStore(reducerMap[entryPoint], initialState<br />   - 定义ctx.render方法，供第二阶段使用<br />- 第二阶段：路由router.get('/meta/:billtype/:billno',function(){...})<br />   - 调用viewhook时定义的render，第一次时构建的是只有loading的组件<br />   - 调用html方法，构建html，并赋值给ctx.body。第一次时构建的是只有loading的htm<br />   -<br />     <br />## 2. 第二次请求，meta请求<br />- 第一阶段：viewhook，viewhook/index.jsx<br />   - 创建ctx.store，调用Isomorph.createStore<br />       - 代码位置：src/common/redux/store/configureStore.dev.jsx<br />       - 调用reateStore(reducerMap[entryPoint], initialState<br />   - 定义ctx.render方法，供第二阶段使用<br />- 第二阶段：路由router.get('/meta',async function(ctx){await getMeta(ctx)})<br />```<br />   ctx.entryPoint = 'index';<br />   ctx.store = Isomorph.createStore(ctx.entryPoint)<br />   ctx.history = Isomorph.createHistory(ctx.store, ctx.path)<br />   ctx.render = function (pageInfo, internals = options.internals || true) {<br />     const render = internals<br />       ? ReactDOMServer.renderToString<br />       : ReactDOMServer.renderToStaticMarkup<br />     const RouterCom = routesMap[ctx.entryPoint];<br />     let markup = render(<Isomorph store={ctx.store}><br />       <RouterCom history={ctx.history} /><br />     </Isomorph>)<br />     if (options.beautify) {<br />       markup = beautify.html(markup)<br />     }<br />     ctx.type = 'html';<br />     ctx.body = html(Object.assign({ entryPoint: ctx.entryPoint }, pageInfo), markup, ctx.store.getState())<br />```<br />- src/client/index.jsx<br />### portalItem<br />```<br />   <protalItem><br />       <Meta><br />           <Container><br />   <br />```<br />### 关键api<br />- /common/helpers/Isomorph.jsx<br />```<br /> render() {<br />   const { store, history, routes, children } = this.props<br />   return (<br />     <Provider store={store}><br />       {/* <Router history={history} routes={routes} /> */}<br />       {children}<br />     </Provider><br />   )<br /> }<br />```<br />- /yxyweb/common/components/meta/util.jsx<br /> - parseContainer<br /> - parseControls

# 菜单点击打开页面的过程  <br />主要代码：Voucherlist.js    <br />从点击menu开始到加载过程：      <br />1. /yxyweb/common/components/basic/menu.jsx中Menu的onClick，执行this.onMenuClick的<br />2. 进入menu.jsx的onMenuClick方法，执行this.props.onSelect(selectedKeys, item)<br />3. 进入LeftMenu.jsx的onClick方法，执行this.props.treeactions.execHandler(selectedKeys[0])。<br />4. 进入tree.jsx的execHandler方法，执行handler(munuCode,......)<br />5. 进入LeftMenu.jsx的handleClick方法，执行`cb.loader.runCommandLine('menu',params,null,callback)`<br />6. 进入cube.js的cb.loader<br />   - 进入`cb.loader.runCommandLine`方法，执行`cb.loader.frommenu()`<br />   - 进入`cb.loader.fromMenu`方法，执行`this.byBillNo()`方法<br />   - 进入`cb.loader.byBillNo`方法，通过`var bill = require('./index')`，执行`bill["voucherlist"].init(billno,param,callback)`,（或`bill["vouvher"].init()`方法，将调用voucherlist或voucher.js的init方法<br />7. 进入voucherlist.js的init方法，这是 **核心代码**<br />   - 执行common.fetchMeta，发起'/meta'请求<br />   - 进入common.js的fetchMeta方法,请求后台meta<br />       - 通过cb.rest.DynamicProxy.create方法构建一个proxy，<br />       - 执行proxy.getMeta(postData, callback)，发起请求。<br />           - 再次进入cube.js的cb.rest.DynamicProxy.init()里定义的匿名function，<br />               - 调用Do方法,调用ajax方法<br />               - 进入ajax方法，调用cb.rest.ajax(url,options)<br />               - 进入cb.rest.ajax(url,options)，调用cb.rest.AjaxRequestManager.doRequest(options)<br />                   - 进入AjaxRequestManager的doRequest方法<br />                       - 通过cn.rest._getUrl构建完整的url(https://xxxx)<br />                       - 通过xmlHttpRequest.open发起请求<br />                       - 在xhr.onreadystatechange方法中等待请求回来，执行cb.rest.AjaxRquestManager.onreadystatechange方法<br />                           - 等待xhr.status === 200时，调用cb.rest.AjaxRequestManager.processAjaxResult方法<br />                               - 根据node返回值ajaxResult.code 进行不同的分支（200，900）<br />                               - ajaxResult.code === 200, callback.call(context, null, ajaxResult.data)<br />                               - ajaxResult.code === 900，cb.route.redirectLoginPage()<br />       <br />       - 执行callback, 回调<br />   - 回到fetchMeta方法的回调initCallback方法，这是 **核心代码**<br />       - 执行`common.initVM()`得到一个包装对象`{vm,view}`，即`var vmAndview = common.initVM()`;//vmAndview包含meta请求返回值的vm和viewmeta<br />       - 进入common.js的**initVM**方法<br />           - 通过`new Function(result.vm)`执行result.vm，在当前cb.viewmodels里注册了一个当前bill特有的类型，vm主要方法有：<br />               > - init<br />               > - initData<br />               > - 参见L343的代码common.js的func()    <br />               > - vm是node自动生成的代码        <br />           <br />           -  根据reuslt.vm的执行结果，`new cb.viewmodels['AA_xx_xxx_VM']`，得到vm实例化对象<br />               - 进入构造函数，调用基类的cb.models.ContainerNodel.call(this,data)<br />               - 执行this.init()<br />               - this.setData(fields)<br />               - this.setDirty(false)<br />               - _this.allActions[{...},{...}]，各种Action声明<br />               - 给各种按钮注册click事件,例如btnAdd，btnSave等<br />           <br />           - 并执行vm.setViewMeta(result.viewmeta),vm对象含viewMeta<br />               - 根据构建一个viewMeta对象，并调用vm.setViewMeta()建立关系，底层调用vm.setCache('viewMeta',viewMeta)<br />           - vm.id id++<br />           - storeVmInstance(billNo,vm)<br />           - vm.on('extendReady', function(){    })<br />           - window.yya = vm;<br />           - return {vm:vm, view:result.viewmeta};<br />       - initVM和回调执行完毕，返回一个vmAndview对象<br />   - 获取vmAndview，里面有vm和view<br />       - 调用vm.initData()再次进入VM.js<br />           - cb.require([extendFiel],function(){   }<br />               - 执行extend.doAction('init',self) 。进入扩展文件init方法<br />               - self.execute('extendReady',self)，进入common.js<br />8. 进入common.js，执行extendReady的回调（）<br />   - 执行extendCallback(vm, result.viewmeta)<br />9. 进入voucherlist.js中的initVM的回调<br />   - 执行vm.promiseExecute('afterLoadMeta', data, function(){ ..... })<br />   - 进入function(){},回调到cube.js的init回调<br />10. cube.js回调到vm.execute('afterinit')<br />11. 调用堆栈继续回溯......

# Voucher.js<br />- 调用common.initVM(err, meta, billNo, params, extendCallback)<br /> - 进入common.js， initVM = (err, result, billNo, params, extendCallback)<br />   ```<br />   export const initVM = (err, result, billNo, params, extendCallback) => {<br />     let func = new Function(result.vm);<br />     func();//执行meta里的vm代码<br />     let vm = new cb.viewmodels[result.viewmeta.vmName]();<br />   }<br />   ```<br /> - new viewmodel<br />    - 构造函数里调用this.init();<br />      - 构建一个fields对象，其中每一个子对象都是一个simpleModel，包含所有字段、按钮等<br />      - 执行this.setData(fields)<br />      - 执行this.setDirty(false)<br />      - 进入actions<br />        - this.allActions声明<br />        - 没有一个按钮注册（on）click事件<br />       - 声明initData()方法<br />         - require extendFile<br />         - require结束后，执行extend.doAction（'init', self）;<br />         - 执行self.execute('extendReady', self);<br />- 调用common.initVM 完毕，此时已经有vm<br /> - vm.promiseExecute('afterLoadMeta', function(){...})<br /> - vm.initData()<br /> - vm.on('refresh',callback)<br /> - vm.on('back', callback)







--------------------------------------      <br /># vscode node调试配置<br />```<br />{<br />   // Use IntelliSense to learn about possible attributes.<br />   // Hover to view descriptions of existing attributes.<br />   // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387<br />   "version": "0.2.0",<br />   "configurations": [<br />       {<br />           "type": "node",<br />           "request": "launch",<br />           "name": "Launch via NPM",<br />           "runtimeExecutable": "npm",<br />           "runtimeArgs": [<br />               "run",<br />               "debug:server"<br />           ],<br />           "port": 9229<br />       }<br />   ]<br />}<br />```<br />### 请求用户中心，node端--》server发起请求的url如下：<br />- 参数<br />   - bollno：ceshi_userlist<br />   - bIncludeViewModel: true<br />   - token: 465d7b374e594c6098a143513b696134<br />   - terminal: 1<br />```<br />http://127.0.0.1:8080/billmeta/getbill?billno=ceshi_userlist&bIncludeViewModel=true&token=465d7b374e594c6098a143513b696134&terminalType=1<br />```<br />### cube.js<br />- doRequest方法<br /> 所有请求都会走doRequest方法<br />-

### CRUD<br />- 列表行编辑<br /> - btnEdit  VM中on注册<br /> - click<br /> - 编辑  <br /> - /bill/edit<br /> -<br /> <br />## 列表行编辑的请求<br />### 1<br />- Request URL:    <br />http://localhost:3003/meta?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Content-Type: application/json;charset=UTF-8<br /> - Cookie: token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Referer: http://localhost:3003/meta/voucherlist/ceshi_userlist<br />- Query String<br /> - terminalType: 1<br /> - token: bfcd181531984f6bb1cc025d1c8d7a17<br />- Request Payload:    <br />```<br />{<br />   "query": {},<br />   "billNo": "ceshi_userlist",<br />   "type": "bill"<br />}<br />```<br />- Response<br />```<br />{<br />   "code": 200,<br />   "data": {<br />       "viewmeta": {<br />           "billid": 1001281553,<br />           "cBillName": "用户模板列表",<br />           "cBillType": "ArchiveList",<br />           "cBillNo": "ceshi_userlist",<br />           "bAllowMultiTpl": false,<br />           "cSubId": "AA",<br />           "cCardKey": "ceshi_user",<br />           "view": {<br />               "iTplId": 1336796,<br />               "cTemplateName": "用户模板显示模板",<br />               "iTplMode": 0,<br />               "iWidth": 10000,<br />               "cTemplateTitle": "用户模板",<br />               "containers": [<br />                   {<br />                       "groupId": 69412145,<br />                       "cName": "ListHeader",<br />                       "iOrder": 1,<br />                       "bMain": true,<br />                       "cCode": "ceshi_userlist",<br />                       "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                       "cControlType": "ListHeader",<br />                       "cGroupCode": "ceshi_userlist_all",<br />                       "cAlign": "top",<br />                       "iCols": 0,<br />                       "containers": [<br />                           {<br />                               "groupId": 67251139,<br />                               "parentId": 69412145,<br />                               "cName": "ListHeader",<br />                               "iOrder": 0,<br />                               "cDataSourceName": "Toolbar",<br />                               "cControlType": "Toolbar",<br />                               "cGroupCode": "ListHeader",<br />                               "cAlign": "top",<br />                               "iCols": 0,<br />                               "controls": [<br />                                   {<br />                                       "icon": "plus-copy",<br />                                       "cItemName": "btnAdd",<br />                                       "cCaption": "新增",<br />                                       "cShowCaption": "新增",<br />                                       "cControlType": "primarybutton",<br />                                       "iOrder": 1,<br />                                       "iStyle": 0,<br />                                       "enterDirection": 0,<br />                                       "key": "67251139"<br />                                   }<br />                               ],<br />                               "key": "ContainerToolbarListHeader",<br />                               "parentKey": "Container69412145"<br />                           },<br />                           {<br />                               "groupId": 69412144,<br />                               "parentId": 69412145,<br />                               "cName": "ConvenientQuery",<br />                               "iOrder": 2,<br />                               "bMain": true,<br />                               "cCode": "ceshi_userlist",<br />                               "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                               "cControlType": "ConvenientQuery",<br />                               "cGroupCode": "ConvenientQuery_2",<br />                               "cAlign": "top",<br />                               "iCols": 0<br />                           }<br />                       ]<br />                   },<br />                   {<br />                       "groupId": 69412146,<br />                       "cName": "ListBody",<br />                       "iOrder": 3,<br />                       "bMain": true,<br />                       "cCode": "ceshi_userlist",<br />                       "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                       "cControlType": "Table",<br />                       "cGroupCode": "ceshi_userlist_head",<br />                       "cAlign": "center",<br />                       "iCols": 0,<br />                       "containers": [<br />                           {<br />                               "groupId": 67251140,<br />                               "parentId": 69412146,<br />                               "cName": "ListBody",<br />                               "iOrder": 0,<br />                               "cDataSourceName": "Toolbar",<br />                               "cControlType": "Toolbar",<br />                               "cGroupCode": "ListBody",<br />                               "cAlign": "left",<br />                               "iCols": 0,<br />                               "controls": [<br />                                   {<br />                                       "icon": "bianji1",<br />                                       "cItemName": "btnEdit",<br />                                       "cCaption": "编辑",<br />                                       "cShowCaption": "编辑",<br />                                       "cControlType": "button",<br />                                       "iOrder": 3,<br />                                       "iStyle": 0,<br />                                       "enterDirection": 0,<br />                                       "key": "67251140"<br />                                   },<br />                                   {<br />                                       "icon": "shanchu1",<br />                                       "cItemName": "btnDelete",<br />                                       "cCaption": "删除",<br />                                       "cShowCaption": "删除",<br />                                       "cControlType": "button",<br />                                       "iOrder": 4,<br />                                       "iStyle": 0,<br />                                       "enterDirection": 0,<br />                                       "key": "67251141"<br />                                   }<br />                               ],<br />                               "key": "ContainerToolbarListBody",<br />                               "parentKey": "Container69412146"<br />                           }<br />                       ],<br />                       "controls": [<br />                           {<br />                               "cItemName": "name",<br />                               "cCaption": "用户名",<br />                               "cShowCaption": "用户名",<br />                               "iMaxLength": 255,<br />                               "iFieldType": 1,<br />                               "bEnum": false,<br />                               "bMustSelect": false,<br />                               "bHidden": false,<br />                               "bCanModify": true,<br />                               "iMaxShowLen": 255,<br />                               "iColWidth": 150,<br />                               "bShowIt": true,<br />                               "bFilter": true,<br />                               "iTabIndex": 0,<br />                               "bIsNull": false,<br />                               "cControlType": "Input",<br />                               "iOrder": 1,<br />                               "bMain": true,<br />                               "id": 71217133,<br />                               "bVmExclude": 0,<br />                               "iBillTplGroupId": 69412146,<br />                               "iBillId": 1001281553,<br />                               "iBillEntityId": 2162257,<br />                               "iTplId": 1336796,<br />                               "cSubId": "AA",<br />                               "iSystem": 1,<br />                               "cName": "name",<br />                               "cFieldName": "name",<br />                               "authLevel": 3,<br />                               "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                               "enterDirection": 0<br />                           },<br />                           {<br />                               "cItemName": "tel",<br />                               "cCaption": "手机号",<br />                               "cShowCaption": "手机号",<br />                               "iMaxLength": 255,<br />                               "iFieldType": 1,<br />                               "bEnum": false,<br />                               "bMustSelect": false,<br />                               "bHidden": false,<br />                               "bCanModify": true,<br />                               "iMaxShowLen": 255,<br />                               "iColWidth": 150,<br />                               "bShowIt": true,<br />                               "bFilter": true,<br />                               "iTabIndex": 0,<br />                               "bIsNull": false,<br />                               "cControlType": "Input",<br />                               "iOrder": 2,<br />                               "bMain": true,<br />                               "id": 71217134,<br />                               "bVmExclude": 0,<br />                               "iBillTplGroupId": 69412146,<br />                               "iBillId": 1001281553,<br />                               "iBillEntityId": 2162257,<br />                               "iTplId": 1336796,<br />                               "cSubId": "AA",<br />                               "iSystem": 1,<br />                               "cName": "tel",<br />                               "cFieldName": "tel",<br />                               "authLevel": 3,<br />                               "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                               "enterDirection": 0<br />                           },<br />                           {<br />                               "cItemName": "age",<br />                               "cCaption": "年龄",<br />                               "cShowCaption": "年龄",<br />                               "iMaxLength": 255,<br />                               "iFieldType": 1,<br />                               "bEnum": false,<br />                               "bMustSelect": false,<br />                               "bHidden": false,<br />                               "bCanModify": true,<br />                               "iMaxShowLen": 255,<br />                               "iColWidth": 150,<br />                               "bShowIt": true,<br />                               "bFilter": false,<br />                               "iTabIndex": 6,<br />                               "bIsNull": true,<br />                               "cControlType": "Input",<br />                               "iOrder": 3,<br />                               "bMain": true,<br />                               "id": 71217135,<br />                               "bVmExclude": 0,<br />                               "iBillTplGroupId": 69412146,<br />                               "iBillId": 1001281553,<br />                               "iBillEntityId": 2162257,<br />                               "iTplId": 1336796,<br />                               "cSubId": "AA",<br />                               "iSystem": 1,<br />                               "cName": "age",<br />                               "cFieldName": "age",<br />                               "authLevel": 3,<br />                               "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                               "enterDirection": 0<br />                           },<br />                           {<br />                               "cItemName": "address",<br />                               "cCaption": "住址",<br />                               "cShowCaption": "住址",<br />                               "iMaxLength": 255,<br />                               "iFieldType": 1,<br />                               "bEnum": false,<br />                               "bMustSelect": false,<br />                               "bHidden": false,<br />                               "bCanModify": false,<br />                               "iMaxShowLen": 255,<br />                               "iColWidth": 150,<br />                               "iAlign": 1,<br />                               "bNeedSum": false,<br />                               "bShowIt": true,<br />                               "bFilter": false,<br />                               "bIsNull": true,<br />                               "cControlType": "Input",<br />                               "iOrder": 4,<br />                               "bMain": true,<br />                               "id": 71217136,<br />                               "bVmExclude": 0,<br />                               "iBillTplGroupId": 69412146,<br />                               "iBillId": 1001281553,<br />                               "iBillEntityId": 2162257,<br />                               "iTplId": 1336796,<br />                               "cSubId": "AA",<br />                               "iSystem": 1,<br />                               "cName": "address",<br />                               "cFieldName": "address",<br />                               "authLevel": 3,<br />                               "cDataSourceName": "ceshi.ceshiuser.CeshiuserClass",<br />                               "enterDirection": 0<br />                           }<br />                       ]<br />                   }<br />               ]<br />           },<br />           "extscripturls": [],<br />           "vmName": "AA_ceshi_userlist_VM",<br />           "extendFileName": "AA_ceshi_userlist_VM.Extend.js",<br />           "extendVmName": "AA_ceshi_userlist_VM_Extend"<br />       },<br />       "vm": "..."<br />   }<br />}<br />```<br />-----------------------------------------<br />### 2<br />- Request URL: http://localhost:3004/sockjs-node/info?t=1545380467693<br /> - Query String:  t: 1545380467693<br />- Response<br />```<br />{<br />   "websocket": true,<br />   "origins": [<br />       "*:*"<br />   ],<br />   "cookie_needed": false,<br />   "entropy": 1719416419<br />}<br />```<br />---------------------------------------<br />### 3<br />- Request URL:      http://localhost:3003/uniform/filterDesign/getFilterBase?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17&filterId=71217063<br /> - Content-Type: application/json;charset=utf-8<br /> - Cookie: token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Query String<br />   - terminalType: 1<br />   - token: bfcd181531984f6bb1cc025d1c8d7a17<br />   - filterId: 71217063<br />- Response<br />```<br />{<br />   "code": 200,<br />   "message": "操作成功",<br />   "data": {<br />       "id": 71217063,<br />       "filterName": "ceshi_userlist",<br />       "filterDesc": "用户模板过滤",<br />       "subId": "AA",<br />       "createTime": "2018-12-18 13:54:54",<br />       "isUpGrade": 0,<br />       "advanceSupport": 0,<br />       "dr": 0<br />   }<br />}<br />```<br />--------------------------<br />### 4 SolutionList<br />- Request URL:<br />http://localhost:3003/uniform/filterDesign/getSolutionList?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Content-Type: application/json;charset=utf-8<br /> - Cookie: token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - QueryString<br />   - terminalType: 1<br />   - token: bfcd181531984f6bb1cc025d1c8d7a17<br />- Response<br />```<br />{<br />   "code": 200,<br />   "message": "操作成功",<br />   "data": [<br />       {<br />           "id": 711840084,<br />           "filtersId": 71217063,<br />           "solutionName": "ceshi_userlist",<br />           "isDefault": 1,<br />           "isPublic": 1,<br />           "userId": 0,<br />           "orderId": 0<br />       }<br />   ]<br />}<br />```<br />-----------------------------------


### 5 Filter请求<br />- Request URL:<br />http://localhost:3003/uniform/filter/711840084/solutionFilters?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17&solutionid=711840084<br /> - Content-Type: application/json;charset=utf-8<br /> - Cookie: token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Query String<br />   - terminalType: 1<br />   - token: bfcd181531984f6bb1cc025d1c8d7a17<br />   - solutionid: 711840084<br />- Response<br />```<br />{<br />   "code": 200,<br />   "message": "操作成功",<br />   "data": {<br />       "isDefault": 1,<br />       "AllFilterModel": [<br />           {<br />               "filtersId": 71217063,<br />               "allowUpdateCompare": 0,<br />               "itemTitle": "名称",<br />               "precision": 0,<br />               "refType": 0,<br />               "cRefId": 0,<br />               "ctrlType": "Input",<br />               "multSelect": 0,<br />               "itemName": "name",<br />               "isCommon": 0,<br />               "rangeInput": 0,<br />               "id": 71213941,<br />               "compareLogic": "like",<br />               "mustInput": 0,<br />               "cShowCaption": "名称",<br />               "descValue": 0,<br />               "isSys": 1<br />           },<br />           {<br />               "filtersId": 71217063,<br />               "allowUpdateCompare": 0,<br />               "itemTitle": "手机号",<br />               "precision": 0,<br />               "refType": 0,<br />               "cRefId": 0,<br />               "ctrlType": "Input",<br />               "multSelect": 0,<br />               "itemName": "tel",<br />               "isCommon": 0,<br />               "rangeInput": 0,<br />               "id": 71213942,<br />               "compareLogic": "like",<br />               "mustInput": 0,<br />               "cShowCaption": "手机号",<br />               "descValue": 0,<br />               "isSys": 1<br />           }<br />       ],<br />       "solutionName": "ceshi_userlist",<br />       "id": 711840084,<br />       "CommonModel": [<br />           {<br />               "itemTitle": "名称",<br />               "orderId": 0,<br />               "refType": 0,<br />               "cRefId": 0,<br />               "cShowCaption": "名称",<br />               "ctrlType": "Input",<br />               "multSelect": 0,<br />               "token": 0,<br />               "itemId": 71213941,<br />               "itemName": "name",<br />               "isCommon": 1,<br />               "rangeInput": 0,<br />               "compareLogic": "like"<br />           },<br />           {<br />               "itemTitle": "手机号",<br />               "orderId": 0,<br />               "refType": 0,<br />               "cRefId": 0,<br />               "cShowCaption": "手机号",<br />               "ctrlType": "Input",<br />               "multSelect": 0,<br />               "token": 0,<br />               "itemId": 71213942,<br />               "itemName": "tel",<br />               "isCommon": 1,<br />               "rangeInput": 0,<br />               "compareLogic": "like"<br />           }<br />       ]<br />   }<br />}<br />```

### 6 业务数据请求<br />- Request URL: http://localhost:3003/uniform/bill/list?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Content-Type: application/json;charset=UTF-8<br /> - Cookie: token=bfcd181531984f6bb1cc025d1c8d7a17<br /> - Request Payload<br />```<br />{<br />   "page": {<br />       "pageSize": 10,<br />       "pageIndex": 1<br />   },<br />   "billnum": "ceshi_userlist",<br />   "condition": {<br />       "commonVOs": [<br />           {<br />               "itemName": "schemeName",<br />               "value1": "ceshi_userlist"<br />           },<br />           {<br />               "itemName": "isDefault",<br />               "value1": false<br />           }<br />       ],<br />       "filtersId": "71217063",<br />       "solutionId": 711840084<br />   }<br />}<br />```<br />- Response<br />```<br />{<br />   "code": 200,<br />   "message": "操作成功",<br />   "data": {<br />       "pageIndex": 1,<br />       "pageSize": 10,<br />       "recordCount": 8,<br />       "recordList": [<br />           {<br />               "address": "北京朝阳",<br />               "name": "张三",<br />               "tel": 18610166654,<br />               "id": 1,<br />               "pubts": "2018-11-29 11:41:47",<br />               "age": 34<br />           },<br />           {<br />               "address": "北京朝阳",<br />               "name": "李四",<br />               "tel": 18610166654,<br />               "id": 987346174120192,<br />               "pubts": "2018-11-29 11:40:30",<br />               "age": 20<br />           },<br />           {<br />               "address": "北京西城",<br />               "name": "小张",<br />               "tel": 18710101010,<br />               "id": 987346898899200,<br />               "pubts": "2018-11-29 11:41:14",<br />               "age": 30<br />           },<br />           {<br />               "address": "北京东城",<br />               "name": "小李",<br />               "tel": 18010101010,<br />               "id": 987354339086592,<br />               "pubts": "2018-11-29 11:49:28",<br />               "age": 20<br />           },<br />           {<br />               "address": "北京",<br />               "name": "小赵1",<br />               "tel": 18100000001,<br />               "id": 987357560508672,<br />               "pubts": "2018-11-29 11:52:26",<br />               "age": 20<br />           },<br />           {<br />               "address": "北京顺义",<br />               "name": "张1",<br />               "tel": 18810101010,<br />               "id": 987484657422592,<br />               "pubts": "2018-11-29 14:01:47",<br />               "age": 21<br />           },<br />           {<br />               "address": "北京顺义",<br />               "name": "张1",<br />               "tel": 18810101010,<br />               "id": 987485046280448,<br />               "pubts": "2018-11-29 14:01:49",<br />               "age": 21<br />           },<br />           {<br />               "address": "北京海淀",<br />               "name": "李1",<br />               "tel": 18100000000,<br />               "id": 1014338573832448,<br />               "pubts": "2018-12-18 13:18:34",<br />               "age": 12<br />           }<br />       ],<br />       "pageCount": 1,<br />       "beginPageIndex": 1,<br />       "endPageIndex": 1<br />   }<br />}<br />```















、、、、、、、、、、、、、、、、、、、、一下作废<br />```<br />http://localhost:3003/uniform/billmeta/tpllist?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17&billno=ceshi_user<br />```

```<br />http://127.0.0.1:8080/billmeta/getbillcommands?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17&billno=ceshi_user"<br />```<br />```<br />"http://127.0.0.1:8080/bill/detail?terminalType=1&token=bfcd181531984f6bb1cc025d1c8d7a17&billnum=ceshi_user&id=1"<br />```