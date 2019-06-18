# VM.extend源代码


```javascript
cb.define([], function () {
	var ST_st_storeoutlist_VM_Extend = {
		doAction: function (name,viewmodel) {
			if(this[name])
				this[name](viewmodel);
		},
		//url:'bill/getLogisticsInfo.do',
		// method: 'POST'
		formatter: function (viewmodel) {
			viewmodel.getGridModel().setColumnState('logistics', 'formatter', (rowInfo, rowData) => {
			//   if(viewmodel.getParams().mode !== 'browse') return;
			  return {
				formatterKey: 'Logistics',
				props: {
					params: {
						billno: 'st_storeout',
						id: rowData.id
					}
				}
			  };
			});
		  },
		init: function (viewmodel) {
			var self = this;
			//根据单据状态，设置行上的按钮是否显示
			let gridModel = viewmodel.getGridModel();
			
			self.formatter(viewmodel);
			gridModel.on('afterSetColumns', function () {
			  self.formatter(viewmodel);
			});
			
		    gridModel.on('afterSetDataSource', () => {
				/*//仓库过滤条件只显示该门店仓库
				var storeid = cb.rest.AppContext.user.storeId;
				var proxy = cb.rest.DynamicProxy.create({
				  	settle: {
				  		url: "/bill/ref/getWarehousesFromStore",
				  		method: "POST" 
				  	} 
			 	});
			  	var params = {
				    storeId: storeid,
			  	};
			  	proxy.settle(params, (err, result) => {
			      	if (err) {
				        cb.utils.alert(err.message, 'error');
				        return;
			      	}
			
			      	if(result === undefined) {
			    	    cb.utils.alert("查询到门店仓库为空！", 'error');
			      	} else {
				      	//添加门店过滤条件只有周边门店
				      	var conditionWarehouse = {
				      		"isExtend": true,
									simpleVOs: []
				      	};
								conditionWarehouse.simpleVOs.push({
									field: 'id',
									op: 'in',
									value1: result
								});
				      	viewmodel.get('outWarehouse_name').setFilter(conditionWarehouse);
			      	}
		    	});*/
				
				
				const rows = gridModel.getRows();
				const actions = gridModel.getCache('actions');
				const actionsStates = [];
				rows.forEach(data => {
					const actionState = { };
					actions.forEach(action => {
						actionState[action.cItemName] = { visible: false };
						if (data.status == 0) {
							actionState["btnEdit"] = {visible:true};
							actionState["btnRowAudit"] = {visible:true};
							actionState["btnDelete"] = {visible:true};
						}
						
						if(data.status == 1 && data.exchangestatus == 1){//提交并且交换失败 wangyda
							actionState["btnRevoke"] = { visible: true };
						}else{
							actionState["btnRevoke"] = { visible: false };
						}
					});
					actionsStates.push(actionState);
				});
				gridModel.setActionsState(actionsStates);
			});
			
			//shiying-patch 店存出库单联查来源单据区分调拨申请和退货申请
			gridModel.on('jointQuery', function (args) {
				var params = {
					mode: 'edit',
					readOnly: true,
					id: args.rowData.srcbill
				};
				var srcbillno = args.rowData.srcbillno;
				var frontNO = srcbillno.substring(0,4);
				var billno = 'st_transferapply';//调拨申请
				if(frontNO == "THSQ"){
					billno  = 'st_returnapply';//退货申请
				}
				//st_returnapply 退货申请  THSQ
				//st_transferapply  调拨申请  DBSQ
				var data = {
					billtype: 'voucher',
					billno: billno,
					params: params
				};
				cb.loader.runCommandLine('bill', data, viewmodel);
			});
		}
	}

	try {		
		module.exports = ST_st_storeoutlist_VM_Extend;
	} catch (error) {

	}
	return ST_st_storeoutlist_VM_Extend;
});



// WEBPACK FOOTER //
// ./src/client/business/ST/ST_st_storeoutlist_VM.Extend.js
```

