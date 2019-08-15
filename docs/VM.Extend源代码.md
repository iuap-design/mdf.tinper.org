源代码：

```javascript
cb.define(function () {
  var AA_business_option_VM_Extend = {
    doAction: function (name, viewmodel) {
      if (this[name])
        this[name](viewmodel);
    },

    //判断是否有记账单据  
    hasAccountBills: function () {
      var promise = new cb.promise();
      var params = {};

      var hasAccountBills = cb.rest.DynamicProxy.create({
        settle: {
          url: '/billingretail/hasAccountBills',
          method: 'POST'
        }
      });


      hasAccountBills.settle(params, (err, result) => {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }

        if (result === undefined) {
          cb.utils.alert("查询记账单据异常！", 'error');
          return;
        }

        if (result != null && result != undefined && result !== '') {
          if (result == false || result == 'false') {
            cb.utils.alert('已执行过成本计算，不能修改！');
          } else {
            promise.resolve();
          }
        }
      });
      return promise;
    },

    init: function (viewmodel) {
      var self = this;
			/* 开单默认打印模板 */
      var billdefaulttypeModel = viewmodel.get('billdefaulttype');
      //billdefaulttypeModel.setState('dataSourceMode', 'remote');
      billdefaulttypeModel.setState('valueField', 'templatecode');
      billdefaulttypeModel.setState('textField', 'templatename');
			var proxy = cb.rest.DynamicProxy.create({
				get:{
					url: 'print/getTemplateByBo',
					method: 'GET'
				}
			});
			var param = {billno:'rm_retailvouch'};
			proxy.get(param,(err,result) => {
				if(err) return;
				if(result == undefined) return;
				if(result && result[0]){
					billdefaulttypeModel.setDataSource(result);
					var defaulttype = billdefaulttypeModel.getValue();
					if(!defaulttype){
						for(var i = result.length - 1; i >= 0;i--){
							if(result[i].isdefault == 'true' || result[i].isdefault == true)
							viewmodel.get('billdefaulttype').setValue(result[i].templatecode);
						}
					}
				}
			});
			
			/* 充值默认打印模板 */
			var storageTemplateModel = viewmodel.get('storageDefaultTemplate');
			storageTemplateModel.setState('valueField', 'templatecode');
			storageTemplateModel.setState('textField', 'templatename');
			var proxy = cb.rest.DynamicProxy.create({
				get:{
					url: 'print/getTemplateByBo',
					method: 'GET'
				}
			});
			var param = {billno:'rm_retailvouch'};
			proxy.get(param,(err,result) => {
				if(err) return;
				if(result == undefined) return;
				if(result && result[0]){
					storageTemplateModel.setDataSource(result);
					var defaulttype = storageTemplateModel.getValue();
					if(!defaulttype){
						for(var i = result.length - 1; i >= 0;i--){
							if(result[i].isdefault == 'true' || result[i].isdefault == true)
							viewmodel.get('storageDefaultTemplate').setValue(result[i].templatecode);
						}
					}
				}
			});

      var pointQuerySchemeModel = viewmodel.get('pointQueryScheme');
      pointQuerySchemeModel.setState('allowClear', false);
      pointQuerySchemeModel.setState('dataSourceMode', 'remote');
      pointQuerySchemeModel.setState('valueField', 'id');
      pointQuerySchemeModel.setState('textField', 'name');
      pointQuerySchemeModel.setDataSource({
        url: 'report/getGroupSchema',
        method: 'GET'
      }, {
        billnum: 'stock_stockanalysis'
      });
			
      var dailyInventoryDailyPlanModel = viewmodel.get('dailyInventoryDailyPlan');
      dailyInventoryDailyPlanModel.setState('allowClear', false);
      dailyInventoryDailyPlanModel.setState('dataSourceMode', 'remote');
      dailyInventoryDailyPlanModel.setState('valueField', 'id');
      dailyInventoryDailyPlanModel.setState('textField', 'name');
      dailyInventoryDailyPlanModel.setDataSource({
        url: 'report/getGroupSchema',
        method: 'GET'
      }, {
        billnum: 'stock_stockanalysis'
      });
			
      viewmodel.on("afterLoad", function (data) {
        ERPsyscheckoutdate
        var paymenttypevalue = viewmodel.get("enablemaling").getValue();
        var billprinttype = viewmodel.get("billprinttype").getValue();
        var ERPsyscheckoutdate = viewmodel.get("ERPsyscheckoutdate");
        if (ERPsyscheckoutdate != undefined)
          ERPsyscheckoutdate.setReadOnly(false); //为了测试方便临时修改
        if (billprinttype === "1")
          viewmodel.get("billingcopiesofprintcopies").setReadOnly(false);
        else
          viewmodel.get("billingcopiesofprintcopies").setReadOnly(true);

        if (!paymenttypevalue) {
          viewmodel.get("malingdefault").setReadOnly(true);
          viewmodel.get("malingcalobject").setReadOnly(true);
          viewmodel.get("malingprecision").setReadOnly(true);
          viewmodel.get("malingmode").setReadOnly(true);
        } else {
          viewmodel.get("malingdefault").setReadOnly(false);
          viewmodel.get("malingcalobject").setReadOnly(false);
          viewmodel.get("malingprecision").setReadOnly(false);
          viewmodel.get("malingmode").setReadOnly(false);
        }
				//出库批号自动指定时，批号自动出库规则才显示
        var autoDesignOutStockBatch = viewmodel.get('autoDesignOutStockBatch').getValue();
        viewmodel.get('batchAutoOutStockRule').setVisible(autoDesignOutStockBatch);
			
				
				//店内加工生单方式为汇总生单时，生成时点显示，生成时点为每日固定时点时，固定时点显示
				/* var storeProcessSheetStyle = viewmodel.get('storeProcessSheetStyle').getValue();
				var storeProcessMakeTimePoint = viewmodel.get('storeProcessMakeTimePoint').getValue();
				if(storeProcessSheetStyle == "1"){
					viewmodel.get('storeProcessMakeTimePoint').setVisible(true);
					if(storeProcessMakeTimePoint == "2"){
						viewmodel.get('storeProcessFixedTimePoint').setVisible(true);
					}else{
						viewmodel.get('storeProcessFixedTimePoint').setVisible(false);
					}
				}else{
					viewmodel.get('storeProcessMakeTimePoint').setVisible(false);
					viewmodel.get('storeProcessFixedTimePoint').setVisible(false);
				} */
				
			//倒冲材料出库控制	
			if (cb.utils.getBooleanValue(viewmodel.get('allownegstock').getValue())) {
				viewmodel.get('bMaterialAllowNegstock').setVisible(false);
			}else{
				viewmodel.get('bMaterialAllowNegstock').setVisible(true);
			}
      });
			
			/* 单据打印时,开单小票打印份数不可编辑 */
      viewmodel.get('billprinttype').on('afterValueChange', function (data) {
        if (data.value.value === "1")
          viewmodel.get("billingcopiesofprintcopies").setReadOnly(false);
        else
          viewmodel.get("billingcopiesofprintcopies").setReadOnly(true);
      });
			
			/* 出库批号自动指定时，批号自动出库规则才显示 */
      viewmodel.get('autoDesignOutStockBatch').on('afterValueChange', function (data) {
        if (data.value.value == "false") {
          viewmodel.get('batchAutoOutStockRule').setVisible(false);
        } else {
          viewmodel.get('batchAutoOutStockRule').setVisible(true);
        }
      });
			//店内加工生单方式为汇总生单时，生成时点显示，生成时点为每日固定时点时，固定时点显示
			/* viewmodel.get('storeProcessFixedTimePoint').setState('multiple', true);
			viewmodel.get('storeProcessSheetStyle').on('afterValueChange',function(data){
				if(data.value.value === "1"){
					viewmodel.get('storeProcessMakeTimePoint').setVisible(true);
					var storeProcessMakeTimePoint = viewmodel.get('storeProcessMakeTimePoint').getValue();
					if(storeProcessMakeTimePoint == "2"){
						viewmodel.get('storeProcessFixedTimePoint').setVisible(true);
					}else{
						viewmodel.get('storeProcessFixedTimePoint').setVisible(false);
					}
				}else{
					viewmodel.get('storeProcessMakeTimePoint').setVisible(false);
					viewmodel.get('storeProcessFixedTimePoint').setVisible(false);
				}
			})
			viewmodel.get('storeProcessMakeTimePoint').on('afterValueChange',function(data){
				if(data.value.value === "2"){
					viewmodel.get('storeProcessFixedTimePoint').setVisible(true);
				}else{
					viewmodel.get('storeProcessFixedTimePoint').setVisible(false);
				}
			}) */

      /* 允许抹零 */
      viewmodel.get('enablemaling').on('afterValueChange', function (data) {
        if (data.value.value == "false") {
          viewmodel.get("malingdefault").setReadOnly(true);
          viewmodel.get("malingcalobject").setReadOnly(true);
          viewmodel.get("malingprecision").setReadOnly(true);
          viewmodel.get("malingmode").setReadOnly(true);
        } else if (data.value.value == "true") {
          viewmodel.get("malingdefault").setReadOnly(false);
          viewmodel.get("malingcalobject").setReadOnly(false);
          viewmodel.get("malingprecision").setReadOnly(false);
          viewmodel.get("malingmode").setReadOnly(false);
        }
      });
			
      //可多选
      viewmodel.get('dailyReportCollectCondition').setState('multiple', true);

      //启用成本计算：默认否，可修改为是;无记账单据时可修改为"否"
      //最好加上判空
      if (viewmodel.get('isUseCostCalculation')) {
        viewmodel.get('isUseCostCalculation').on('beforeValueChange', function (data) {
          if (data.value.value == 'false') {
            return self.hasAccountBills();
          }
        });
      }

      //核算维度：仓库核算组、商品，单选，默认仓库核算组，无记账单据时可以修改
      //隐藏前需判空(pub_option_meta,bhdden=1)
      if (viewmodel.get('accountingDimension')) {
        viewmodel.get('accountingDimension').on('beforeValueChange', function (data) {
          return self.hasAccountBills();
        });
      }
	  
	  //允许负出库
      viewmodel.get('allownegstock').on('afterValueChange', function(data) {
			if (cb.utils.getBooleanValue(viewmodel.get('allownegstock').getValue())) {
				viewmodel.get('bMaterialAllowNegstock').setVisible(false);
			}else{
				viewmodel.get('bMaterialAllowNegstock').setVisible(true);
			}
			});	
    }
  }
  try {
    module.exports = AA_business_option_VM_Extend;
  } catch (error) {
  }
  return AA_business_option_VM_Extend;
});



// WEBPACK FOOTER //
// ./src/client/business/AA/AA_business_option_VM.Extend.js
```

