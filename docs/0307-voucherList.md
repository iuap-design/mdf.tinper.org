# VoucherList加载过程

菜单入口,点击打开页面的过程<br />

- 主要代码：Voucherlist.js
- 从点击menu开始到加载过程：

<a name="LJkzh"></a>
## 1、参数准备阶段

1. /yxyweb/common/components/**basic**/menu.jsx中Menu的**onClick**，执行**this.onMenuClick**
```javascript
render() {
    return (
      <Menu onClick={(item, key, keyPath) => this.onMenuClick(item, key, keyPath)} >
        {subMenuNodes}
      </Menu>
    );
  }
```


2. 进入menu.jsx的onMenuClick方法，执行this.props.onSelect(selectedKeys, item)

```javascript
onMenuClick(item) {
    let selectedKeys = [];
    selectedKeys.push(item.key);
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, item);
    if (this.props.model)
      this.props.model.select(selectedKeys);
  }
```


3. 进入**protal**/**LeftMenu.jsx**的onClick方法，执行**this.props.treeactions.execHandler(selectedKeys[0])**。
> 说明：selectedKeys[0]  == ["ST0102"]

4. 进入yxyweb/common/**redux**/tree.jsx的execHandler方法，执行handler(munuCode,......)
> 注意：此处的tree.jsx不是components/basic/tree.jsx

5. 进入**portal**/**LeftMenu.jsx**的**handleClick**方法，执行**`cb.loader.runCommandLine('menu',params,null,callback)`**
> 注意：1、此处有一个callback的定义

```javascript
   let callback = (returnData) => {
      if (filterCondition) {
        var vm = returnData.content.vm;
        vm.getParams().condition = filterCondition;
        if (!keepFilter)
          vm.getParams().filterId = null;
      }
      tabsactions.addItem(returnData);
    };
```
> 
> 2、此时的params如下：

```json
{
    "level": 2,
    "tenant": 604466382606592,
    "isShopRelated": true,
    "name": "店存入库",
    "code": "ST0102",
    "isDeleted": 0,
    "isEnd": true,
    "authCode": "st_storeinlistlist",
    "terminalType": "1",
    "parentCode": "ST01",
    "orderNum": 20,
    "isSystem": true,
    "_walkStatus": "Allow",
    "metaKey": "st_storeinlist",
    "subId": "ST",
    "pubts": "2018-03-04 00:15:02",
    "disabled": false,
    "authLevel": 3,
    "metaType": "voucherlist",
    "viewType": "meta",
    "userClick": true,
    "menuId": "ST0102"
}
```


<a name="m9tmq"></a>
## 2、请求过程

1. 进入cube.js的cb.loader
  - 进入`cb.loader.runCommandLine`方法，执行`cb.loader.frommenu()`
  - 进入`cb.loader.fromMenu`方法，执行`this.byBillNo()`方法
  - 进入`cb.loader.byBillNo`方法，通过`var bill = require('./index')`，执行`bill["voucherlist"].init(billno,param,callback)`,（或`bill["vouvher"].init()`方法，将调用voucherlist或voucher.js的init方法


    - runCommandLine方法解释：
>     1. 此时viewmodel为null
>     1. cb.loader.runCommandLine的源码如下：

```javascript
cb.loader.runCommandLine = function (commend, data, viewmodel, callback) {
  switch (commend) {
    case 'menu': {
      cb.loader.fromMenu(data, viewmodel, callback);
      break;
    }
    case 'bill': {
      cb.loader.byBillNo(data, viewmodel, callback);
      break;
    }
  }
}
```


2. 进入voucherlist.js的init方法，这是 **核心代码**
  - 执行common.fetchMeta，发起'/meta'请求
  - 进入common.js的fetchMeta方法,请求后台meta
    - 通过cb.rest.DynamicProxy.create方法构建一个proxy，
    - 执行proxy.getMeta(postData, callback)，发起请求。
      - 再次进入cube.js的cb.rest.DynamicProxy.init()里定义的匿名function，
        - 调用Do方法,调用ajax方法
        - 进入ajax方法，调用cb.rest.ajax(url,options)
        - 进入cb.rest.ajax(url,options)，调用cb.rest.AjaxRequestManager.doRequest(options)
          - 进入AjaxRequestManager的doRequest方法
            - 通过cn.rest._getUrl构建完整的url([https://xxxx](https://xxxx))
            - 通过xmlHttpRequest.open发起请求
            - 在xhr.onreadystatechange方法中等待请求回来，执行cb.rest.AjaxRquestManager.onreadystatechange方法
              - 等待xhr.status === 200时，调用cb.rest.AjaxRequestManager.processAjaxResult方法
                - 根据node返回值ajaxResult.code 进行不同的分支（200，900）
                - ajaxResult.code === 200, callback.call(context, null, ajaxResult.data)
                - ajaxResult.code === 900，cb.route.redirectLoginPage()
    - 执行callback, 回调
  - 回到fetchMeta方法的回调initCallback方法，这是 **核心代码**
    - 执行`common.initVM()`得到一个包装对象`{vm,view}`，即`var vmAndview = common.initVM()`;//vmAndview包含meta请求返回值的vm和viewmeta
    - 进入common.js的**initVM**方法
      - 通过`new Function(result.vm)`执行result.vm，在当前cb.viewmodels里注册了一个当前bill特有的类型，vm主要方法有：
>         - init
>         - initData
>         - 参见L343的代码common.js的func()
>         - vm是node自动生成的代码

      - 根据reuslt.vm的执行结果，`new cb.viewmodels['AA_xx_xxx_VM']`，得到vm实例化对象
        - 进入构造函数，调用基类的cb.models.ContainerNodel.call(this,data)
        - 执行this.init()
        - this.setData(fields)
        - this.setDirty(false)
        - _this.allActions[{...},{...}]，各种Action声明
        - 给各种按钮注册click事件,例如btnAdd，btnSave等
      - 并执行vm.setViewMeta(result.viewmeta),vm对象含viewMeta
        - 根据构建一个viewMeta对象，并调用vm.setViewMeta()建立关系，底层调用vm.setCache('viewMeta',viewMeta)
      - vm.id id++
      - storeVmInstance(billNo,vm)
      - vm.on('extendReady', function(){    })
      - window.yya = vm;
      - return {vm:vm, view:result.viewmeta};
    - initVM和回调执行完毕，返回一个vmAndview对象
  - 获取vmAndview，里面有vm和view
    - 调用vm.initData()再次进入VM.js
      - cb.require([extendFiel],function(){   }
        - 执行extend.doAction('init',self) 。进入扩展文件init方法
        - self.execute('extendReady',self)，进入common.js
8. 进入common.js，执行extendReady的回调（）
  - 执行extendCallback(vm, result.viewmeta)
9. 进入voucherlist.js中的initVM的回调
  - 执行vm.promiseExecute('afterLoadMeta', data, function(){ ..... })
  - 进入function(){},回调到cube.js的init回调
10. cube.js回调到vm.execute('afterinit')
10. 调用堆栈继续回溯......

<a name="Voucher.js"></a>
# 
