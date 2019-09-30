_编写：勾成图 有问题可联系勾成图_
<a name="vBxHi"></a>
# 1、涉及代码文件

- yxyweb/client/common/common.js
- voucherlist.js
- voucher
- XX_xx_xxxx_VM
- XX_xx_xxxx_VM.Extend
<a name="g6GSW"></a>
# 
<a name="OuwLs"></a>
# 2、生成代码VM
```javascript
cb.viewmodels.register('ST_st_storeout_VM', function (modelType) {	
  		//。。。。省略
      model.prototype.init = function () {
          var _this = this;
          //var biz = cb.biz.common.voucherlist;//如果是voucherlist会生成这行代码
          var billType = "voucher";
          var biz ;
          if(billType == 'option' || billType == 'freeview'){
              biz= cb.biz.common.voucher
          }else{
              biz= cb.biz.common.voucher
          }
        
          _this.get('btnSave').on('click',function(params){
              var args = cb.utils.extend(true, {}, {"cCommand":"cmdSave","cAction":"save","cSvcUrl":"/bill/save.do","cHttpMethod":"POST","cTarget":"footertoolbar","cItemName":"btnSave","cCaption":"保存","cShowCaption":"保存","cControlType":"primarybutton","iStyle":1,"bVmExclude":0,"iOrder":0,"key":"2898496","needClear":false}, { key: 'btnSave'},{ params: params });
            
              var self = this;
              args.disabledCallback = function () {
                self.setDisabled(true);
              }
              args.enabledCallback = function () {
                self.setDisabled(false);
              }
            
              biz.do('save',_this, args)
          });      

          this.biz = biz;
     };
  });
```

<a name="w6MBG"></a>
# 3、do方法
voucherlist.js<br />freeview.js<br />option.js<br />billmaker.js

```javascript
  do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
  },
```

<a name="xdhrZ"></a>
### voucher.js 和 do 
cb.biz.common.voucher的定义

```javascript
const voucher = function (){
    //此处省略2000行代码
}()

cb.namespace('biz.common')
cb.biz.common.voucher = voucher

export default voucher
```
其中do的定义如下：
```javascript
  do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
  },
```

<a name="nJPBy"></a>
# 4、Common todo
关键代码：

- self.action()[act.toLowerCase()]
- action(billNo, viewmodel, params, beforeAct, afterAct)

```javascript
export const todo = (self, act, viewmodel, params) => {
  if (act && self.action()[act.toLowerCase()]) {
    let data = {
      cancel: false,
      params: params
    };
    let Act = act.replace(/(\w)/, function (v) {
      return v.toUpperCase()
    }) //首字母大写
    console.log('Voucher-- ' + act + ' click');
    let beforeAct = (beforeActData, callback) => {
      return viewmodel.promiseExecute('before' + Act, beforeActData, function () {
        if (params && params.disabledCallback)
          params.disabledCallback();
        callback && callback();
      });
    }
    if (!viewmodel.execute('before' + Act + 'Execute', data) || data.cancel) return true;
    let billNo = getVmParams(viewmodel, 'billNo');
    let afterAct = (afterActData, callback) => {
      if (params && params.enabledCallback)
        params.enabledCallback();
      return viewmodel.promiseExecute('after' + Act, afterActData, function () {
        callback && callback(afterActData)
      });
    }
    let action = self.action()[act.toLowerCase()];
    action(billNo, viewmodel, params, beforeAct, afterAct);

  } else {
    if (viewmodel.hasEvent(act)) {
      viewmodel.execute(act, params);
      console.log('Voucher-- ' + act + ' click');
      return;
    }
    console.log('voucher->do——' + act + '方法不存在');
  }
};
```
<a name="boi1p"></a>
# 
<a name="xYrXV"></a>
# 5、具体的Action实现
<a name="cQk61"></a>
### voucher.js save

```javascript
const save = function (billNo, viewmodel, params, beforeAct, afterAct, caption) {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewmodel.allActions && viewmodel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'save';
      });
      Object.assign(params, configParams);
    }
    const invalidMsg = viewmodel.validate();
    if (invalidMsg) {
      cb.utils.alert('以下数据项校验失败：' + invalidMsg.join(','), 'error');
      return;
    }
    let mode = common.getMode(viewmodel)
    const action = common.getVmParams(viewmodel, 'action');
    let data = viewmodel.collectData()
    if (!data) {
      cb.utils.alert('未作任何修改')
      viewmodel.setReadOnly(true)
      common.setState(viewmodel)
      return
    }
    if (common.getVmParams(viewmodel, 'metatype') && common.getVmParams(viewmodel, 'metatype') == 'editablevoucherlist') {
      data = data[viewmodel.getGridModel().getName()]
    }
    if (mode == env.VOUCHER_STATE_ADD) {
      data['_status'] = cb.models.DataStates.Insert
      let parentId = common.getVmParams(viewmodel, 'parentId') //树表新建时的父类
      if (parentId != undefined) {
        let key = common.getVmParams(viewmodel, 'foreignKey') //档案的parentid
        if (key) {
          data[key] = parentId
        }
      }
    } else {
      data["_status"] = cb.models.DataStates.Update
    }

    let postData = Object.assign({
      billnum: billNo,
      data: JSON.stringify(data)
    }, params.defineParams);
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      let callback = function (err, res) {
        // if (err) {
        //   cb.utils.alert(err.message, 'error');
        //   return;
        // }
        let newData = res;
        let afterActData = {
          params,
          err: err,
          res: newData
        }
        if (!err) {
          cb.utils.alert(`${caption || '保存'}成功`, 'success')
          common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE);
          const currentAction = params.cAction.trim().toLocaleLowerCase();
          if (currentAction === 'saveandadd') {
            afterAct(afterActData, common.afterAct);
            return/*保存并新增*/
          }
          if (currentAction !== 'saveandaudit' && viewmodel.getParams().saveReturn !== false && (viewmodel.getParams().multitpl || viewmodel.getCache('entryMode') !== env.VOUCHER_STATE_BROWSE)) {
            if (cb.utils.isEmpty(viewmodel.get('id').getValue()) && res)
              viewmodel.get('id').setValue(res.id);
            afterAct(afterActData, common.afterAct);
            viewmodel.communication({ type: 'return', payload: viewmodel.get('id').getValue() });
            return;
          }
          // common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE)
          let oldData = viewmodel.collectData(true)
          let condition;
          let arrayKeys = []
          for (let key in res) {
            if (Array.isArray(res[key]) && viewmodel.get(key) && viewmodel.get(key).getDirtyRowIndexes && viewmodel.get(key).getDirtyRowIndexes() && viewmodel.get(key).getDirtyRowIndexes().length > 0) {
              arrayKeys.push(key)
              condition = {};
            }
          }

          arrayKeys.forEach((key) => {
            condition[key] = viewmodel.get(key).getDirtyRowIndexes()
          })
          newData = common.billMerge(oldData, res, condition)
          render(viewmodel, newData)
        }
        // let afterActData = {
        //   params,
        //   err: err,
        //   res: newData
        // }
        afterAct(afterActData, common.afterAct)
      }
      params.options = { mask: true };
      common.doProxy(params, callback, postData)
    })

  }
```

<a name="6u9DG"></a>
# 
<a name="VekRw"></a>
# 
<a name="VVMh8"></a>
# 
<a name="ysIa5"></a>
# 
<a name="HXiaV"></a>
### voucherlist add
```javascript
const add = (billNo, viewmodel, params, beforeAct, afterAct) => {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewmodel.allActions && viewmodel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'add';
      });
      Object.assign(params, configParams);
    }
    let billType = viewmodel.getParams() && viewmodel.getParams().billType
    if (billType) {
      if (_hasList(billType)) { //ArchiveList,TreeList,VoucherList,compare
        _addVoucher(billNo, viewmodel, params, beforeAct, afterAct)
      } else {
        _addCard(billNo, viewmodel, params, beforeAct, afterAct)
      }
    } else {
      console.error('未获得billType')
    }
  }
```



<a name="52sbt"></a>
# 6、Add Action扩展
场景：交易类型<br />想扩展meta请求
```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
    var bd_bd_translist_VM_Extend = {
        init: function (viewmodel) {
            let billTypeId = "test";
            viewmodel.on("beforeAdd", function (args) {
                args.params.query = { "billTypeId": billTypeId };//点击新增往meta请求添加参数
                return true; 
            });

            viewmodel.get('BillTypeVO').on('beforeSelect', function (data) {
                let billtype_id = data[0].path || "";
                
                return true;
            });

        }
    }
}

```
<a name="i9RY9"></a>
# 
<a name="kuDK6"></a>
# 
<a name="DH3pm"></a>
# 
<a name="nFSeP"></a>
# 
<a name="q5L0u"></a>
# 
<a name="vnT66"></a>
# 
<a name="7uV6Y"></a>
# 
<a name="2lFVY"></a>
# 
<a name="qkxPv"></a>
# 
<a name="KDRxV"></a>
# 
<a name="yR5HX"></a>
# 
<a name="GlS99"></a>
# 
<a name="p3qL7"></a>
# 
<a name="FTN5R"></a>
# 
<a name="Z2NJg"></a>
# 
<a name="3vIp0"></a>
# 
<a name="BmsNY"></a>
# 
<a name="V9Nl0"></a>
# Common doProxy

```javascript
export const doProxy = (params, callback, data) => {
  let proxy = cb.rest.DynamicProxy.create({
    doProxy: {
      url: params.cSvcUrl,
      method: params.cHttpMethod,
      options: params.options
    }
  });
  if (params.options && params.options.async === false) {
    const ajaxResult = proxy.doProxy(data);
    callback(ajaxResult.error, ajaxResult.result);
  } else {
    proxy.doProxy(data, callback);
  }
  // proxy.doProxy(data, function(err, suc) {
  //   if (err) {
  //     if (err.message) {
  //       alert(err.message);
  //     } else {
  //       alert(err.code);
  //     }
  //     cb.utils.loadingControl.end();
  //     return;
  //   }
  //   if (callback) callback(suc)
  // });
};
```