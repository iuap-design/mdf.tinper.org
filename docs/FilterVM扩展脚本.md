
```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
  var ST_st_storecheckpreparelist_filterVM_Extend = {
    doAction: function (name, viewmodel) {
      if (this[name])
        this[name](viewmodel);
    },
    init: function (viewmodel) {
      viewmodel.on("afterInit", function () {
        //单据日期默认值
        var currentDate = new Date().format('yyyy-MM-dd');
        var startDate = currentDate.substr(0,currentDate.length - 2) + '01';
        viewmodel.get('vouchdate').getFromModel().setValue(startDate);
        viewmodel.get('vouchdate').getToModel().setValue(currentDate);

        //仓库根据当前用户有权限的门店进行过滤
        viewmodel.get("warehouse_name").getFromModel().on('beforeBrowse', function (data) {
          var promise = new cb.promise();
          var store_ids = [];
          var userStores = cb.rest.AppContext.user.userStores;
          if (userStores != null && userStores != "" && userStores.length != 0) {
            for (var i = 0; i < userStores.length; i++) {
              store_ids.push(userStores[i].store);
            }
          }
          if (store_ids != null && store_ids != "" && store_ids.length != 0) {
            var proxy = cb.rest.DynamicProxy.create({
              settle: {
                url: "/bill/ref/getWarehousesFromStores",
                method: "POST"
              }
            });
            var params = {
              storeIds: store_ids,
            };
            proxy.settle(params, (err, result) => {
              if (err) {
                cb.utils.alert(err.message, 'error');
              }

              if (result === undefined || result.length == 0) {
                cb.utils.alert("没有查询到当前选择店铺的仓库！", 'error');
              } else {
                var conditionWarehouse = {
                  "isExtend": true,
                  simpleVOs: []
                };
                //门店下的仓库
                conditionWarehouse.simpleVOs.push({
                  field: 'id',
                  op: 'in',
                  value1: result
                });
                //门店仓
                conditionWarehouse.simpleVOs.push({
                  field: 'wStore',
                  op: 'eq',
                  value1: true
                });
                viewmodel.get('warehouse_name').getFromModel().setFilter(conditionWarehouse);
                promise.resolve();
              }
            });
          } else {
            cb.utils.alert("无门店权限！", 'error');
          }
          return promise;
        });


      });
    }

  }
  try {
    module.exports = ST_st_storecheckpreparelist_filterVM_Extend;
  } catch (error) {

  }
  return ST_st_storecheckpreparelist_filterVM_Extend;
});

```

