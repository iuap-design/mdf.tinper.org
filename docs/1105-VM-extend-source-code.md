# VM.extend源代码


```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
	var ST_st_storeout_VM_Extend = {

		doAction: function (name, viewmodel) {
			if (this[name]) {
				this[name](viewmodel);
			}
		},

		formatter: function (viewmodel) {
			viewmodel.get('OutStoreLogistics').setColumnState('logisticNo', 'formatter', (rowInfo, rowData) => {
				if (viewmodel.getParams().mode !== 'browse') return;
				return {
					formatterKey: 'Logistics',
					props: {
						com: rowData.deliverycorp_code,
						nu: rowData.logisticNo
					}
				};
			});
		},

		init: function (viewmodel) {
			var self = this;
			var detailsModel = viewmodel.get("details");

			if (cb.rest.interMode === 'touch' && viewmodel.getParams().mode !== 'browse') {
				common.touchFormatter(detailsModel, viewmodel, "quantity");
				detailsModel.on('afterSetColumns', function () {
					common.touchFormatter(detailsModel, viewmodel, "quantity");
				});
			}

			var logisticsModel = viewmodel.get("OutStoreLogistics");
			var bShowSn = false;
			// var hasBusinessWarehouse;
			//自动拣货wangtianjiao
			viewmodel.on('autoPick', function (args) {
				return common.onAutoPick(viewmodel);
			});

			//电子秤 称重
			common.elecBalanceWeigh(detailsModel, viewmodel, "quantity");
			// ====== 物流信息 ======
			self.formatter(viewmodel);
			common.snformatter(detailsModel, viewmodel);
			logisticsModel.on('afterSetColumns', function () {
				self.formatter(viewmodel);
				common.snformatter(detailsModel, viewmodel);
			});

			if (logisticsModel) {
				logisticsModel.on('afterCellValueChange', function (data) {
					var curRowIndex = data.rowIndex;

					if (data.cellName === 'deliverycorp_name') {
						logisticsModel.setCellValue(curRowIndex, 'logisticNo', null);
					}
				});
			}

			//初始化barcode wangyda
			common.initBarcodeModel(viewmodel);
			common.initSnCheckbox(viewmodel);
			//============================================================barcode related
			//扫码
			viewmodel.get("barcode").on('enter', function (data) {
				//字段对照
				var fields = {
					mainid: 'mainid',
					product: 'product',
					productcode: 'product_cCode',
					productname: 'product_cName',
					productsku: 'productsku',
					barcode: 'barcode',
					batchno: 'batchno',
					producedate: 'producedate',
					invaliddate: 'invaliddate',
					productskucode: 'productsku_cCode',
					//weight: 'weight',
					quantity: 'quantity',
					unit: 'unit',
					unitname: 'unitName',
					skuSalePrice: 'markPrice',
					isbatch: 'isBatchManage',
                    product_modelDescription: 'modelDescription',
					isexpirydatemanage: 'isExpiryDateManage',
					goodsposition:'goodsposition',
					goodsposition_cName:'goodsposition_cName'
				};
				// return common.onBarCodeEnter(data, viewmodel, fields,'details','storeOutDetailSNs');
				var snWarehouse = viewmodel.get('outWarehouse').getValue();
				var iSerialManage = viewmodel.get('outWarehouse_iSerialManage').getValue();
				return common.onBarCodeEnter(data, viewmodel, fields, 'details', 'storeOutDetailSNs', snWarehouse, iSerialManage,afterBarcodeEnter);
			});
			var afterBarcodeEnter = function(pData, rowIndex) {
				if (detailsModel) {
					if (pData != null && pData != undefined && pData['newRow']) //第一次扫码 newRow
					{
						//货位仓时，指定默认货位
						if(cb.utils.getBooleanValue(viewmodel.get("warehouse_isGoodsPosition").getValue())) {
						  var mydata ={
							"rowIndex":rowIndex,
							"value":{"productskus_id":pData.productskus[0].productsku,"cName":pData.cName}
						  };
						  common.setDefaultOutGoodsPosition(viewmodel, detailsModel, mydata);
						}
					} 
				}
			};
			//============================================================barcode related

			if (detailsModel) {
				//向后台传递行号
				detailsModel.setState('orderField', 'rowno');
				//单元格编辑之前判断该行商品是否启用批次管理和效期管理
				detailsModel.on('rowColChange', function (args) {
					var colKey = args.value.columnKey;

					if (colKey == 'product_cCode' || colKey == 'product_cName') {
						if (this.getParent().getAllData().srcBill != undefined) {
							return false;
						}
					}
					var row = detailsModel.getRow(args.value.rowIndex);
					if (row) {
						viewmodel.get("storeOutDetailSNs").setReadOnly(true);
					}

					return common.bacthnoAndExpiryDateManage(args, detailsModel);
				});
				//批次参照弹出前事件，看一下商品是否启用批次管理，如果未启用，那么不弹出批次参照
				detailsModel.on('beforeBrowse', function (args) {
					if (args.cellName == 'batchno') {
						var rows = detailsModel.getRows();
						var rowIndex = args.rowIndex;
						var row = rows[rowIndex];
						if (row.isBatchManage == true) {

						} else {
							return false;
						}
					}
				});

				detailsModel.on('beforeInsertRow', function (data) {
					var vouchdate = this.getParent().get("vouchdate").getValue();
					data.row['recorddate'] = vouchdate;
				});

				detailsModel.on('beforeInsertRowFromRefer', function (data) {
					var vouchdate = this.getParent().get("vouchdate").getValue();
					if (data.row['recorddate'] == null) { data.row['recorddate'] = vouchdate; }

					console.log('beforeInsertRowFromRefer');
					let selectedRow = viewmodel.get("details").getSelectedRows()[0];
					if (selectedRow) {
						let row = data.row;
						let key = 'srcBillRow';
						row[key] = selectedRow[key];
					}
				});

				//单元格值改变以后，如果是商品变了，就清空批次号、生效日期、失效日期
				// detailsModel.on('afterCellValueChange', function (data){
				// 	switch (data.cellName) {
				// 		case "product_cCode" : {
				// 			detailsModel.setCellValue(data.rowIndex, 'batchno', null);
				// 			detailsModel.setCellValue(data.rowIndex, 'producedate',  null);
				// 			detailsModel.setCellValue(data.rowIndex, 'invaliddate',  null);
				// 			//detailsModel.setCellValue(data.rowIndex, 'invaliddate',  null);
				// 			//detailsModel.setCellValue(data.rowIndex, 'invaliddate',  null);
				// 			break;
				// 		}
				// 	}
				// })
				//单元格值改变以后，如果是商品变了，就清空批次号、生效日期、失效日期、批次属性、商品自定义项
				//（sku自定义项是参照带出来的，商品清空就会跟着清空，不许需要在这里处理）
				detailsModel.on('afterCellValueChange', function (data) {
					switch (data.cellName) {
						case "productsku_cCode":
						case "productsku_cName":
						case "product_cName":
						case "product_cCode": {
							detailsModel.setCellValue(data.rowIndex, 'batchno', null);
							detailsModel.setCellValue(data.rowIndex, 'producedate', null);
							detailsModel.setCellValue(data.rowIndex, 'invaliddate', null);

							for (var i = 1; i <= 30; i++) {
								detailsModel.setCellValue(data.rowIndex, 'define' + i, null);
								// detailsModel.setCellValue(data.rowIndex, 'prodefine' + i, null);
							}
							
							if(cb.utils.getBooleanValue(viewmodel.get("warehouse_isGoodsPosition").getValue())) {
								common.setDefaultOutGoodsPosition(viewmodel, detailsModel, data);
							}
							break;
						}
						case "batchno":
							//add by shiying 2019-03-04 店存出批次参照，带出多批次的时候序列号属性同样带出
							if(data.value && data.value.productOfflineRetail_isSerialNoManage){
								detailsModel.setCellValue(data.rowIndex, 'isSerialNoManage', data.value.productOfflineRetail_isSerialNoManage);
							}
							break;
						//单元格值改变以后，如果是批号变了，就清空商品自定义项
						//（批次号、生效日期、失效日期、批次属性、sku自定义项是批次参照带出来的，批次就会跟着清空，不许需要在这里处理）
						// case "batchno": {
						// 	for (var i = 1; i <= 30; i++) {
						// 		detailsModel.setCellValue(data.rowIndex, 'prodefine' + i, null);
						// 	}
						// 	break;
						// }
					}
				});
			}
			//var srcbilldata = new Array();
			viewmodel.set("srcbilldata", new Array());
			viewmodel.on('afterEdit', function () {
				var mode = viewmodel.getParams().mode;
				if(mode == "add" || mode == "edit"){
					self.queryCentStoreGroup(cb.rest.AppContext.user.storeId, viewmodel);
				}

				var data = viewmodel.getAllData();
				if((mode == "edit") && (data.srcBill != null)){
					//add by shiying
					if (data.srcBillType == "1") {
						self.queryBusytype(1, viewmodel);
						viewmodel.get("inWarehouse_name").setReadOnly(true);
					} else if (data.srcBillType == "2") {
						//退货类型，仓库过滤成业务仓
						self.setWarehouseFilter(viewmodel);
						//业务类型，过滤成只可选退货类型
						self.queryBusytype(2, viewmodel);
					}

					self.querySrcBill(data.srcBill, viewmodel, data);
					//设置商品表体行不可删除
					var actionsStates = [];
					var detailsModel = viewmodel.get("details");
					var rows = detailsModel.getRows();
					viewmodel.get("code").setVisible(true);
					//有来源店间调拨 出库仓能参照，入库门店和入库仓不能修改
					//viewmodel.get("outWarehouse_name").setReadOnly(true);
					viewmodel.get("inStore_name").setReadOnly(true);
					viewmodel.get("inWarehouse_name").setReadOnly(true);
					viewmodel.get("srcBillNO").setReadOnly(true);
					viewmodel.get("status").setReadOnly(true);
					viewmodel.get("btnAudit").setVisible(false);
					viewmodel.get("btnAddRow").setVisible(false);
					viewmodel.get("btnDeleteRow").setDisabled(true);
					viewmodel.get("btnDeleteRow").setVisible(false);
					viewmodel.get("barcode").setVisible(false);
					if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(false);
					detailsModel.setColumnState('product_cName', 'readOnly', true);
					detailsModel.setColumnState('product_cCode', 'readOnly', true);
					detailsModel.setColumnState('free1', 'readOnly', true);
					detailsModel.setColumnState('free2', 'readOnly', true);
					detailsModel.setColumnState('free3', 'readOnly', true);
					detailsModel.setColumnState('free4', 'readOnly', true);
					detailsModel.setColumnState('free5', 'readOnly', true);
					detailsModel.setColumnState('free6', 'readOnly', true);
					detailsModel.setColumnState('free7', 'readOnly', true);
					detailsModel.setColumnState('free8', 'readOnly', true);
					detailsModel.setColumnState('free9', 'readOnly', true);
					detailsModel.setColumnState('free10', 'readOnly', true);
					detailsModel.setColumnState('invaliddate', 'readOnly', true);
					detailsModel.setColumnState('producedate', 'readOnly', true);
					detailsModel.setColumnState('unitName', 'readOnly', true);
				}
				var bustype_storeOutType = viewmodel.get("bustype_storeOutType").getValue();
				var srcBillType = viewmodel.get("srcBillType").getValue();

				if(bustype_storeOutType != 2){
					var inStore = viewmodel.get("inStore").getValue();
					var proxy = cb.rest.DynamicProxy.create({
						settle: {
							url: "/bill/ref/getWarehousesDetailFromStore",
							method: "POST"
						}
					});
					var params = {
						storeId: inStore,
					};
					proxy.settle(params, (err, result) => {
						if (err) {
							cb.utils.alert(err.message, 'error');
							return;
						}

						if (result === undefined) {
							cb.utils.alert("没有查询当前选择店铺的仓库！", 'error');
						} else {
							var arr = [];
							for (var i = 0; i < result.length; i++) {
								arr.push(result[i].id);
								if (result[i].isDefault == true) {
									viewmodel.get('inWarehouse').setValue(result[i].id);
									viewmodel.get('inWarehouse_name').setValue(result[i].name);
								}
							}
							//添加门店过滤条件只有周边门店
							var conditionWarehouse = {
								"isExtend": true,
								simpleVOs: []
							};
							conditionWarehouse.simpleVOs.push({
								field: 'id',
								op: 'in',
								value1: arr
							});
							viewmodel.get('inWarehouse_name').setFilter(conditionWarehouse);
						}
					});
				}else{
					if (srcBillType != "3") {
						viewmodel.get('inWarehouse_name').setState('bIsNull', false);
						viewmodel.get("inStore_name").setReadOnly(true);
						var inStore = cb.rest.AppContext.user.storeId;
						var proxy = cb.rest.DynamicProxy.create({
							settle: {
								url: "/bill/ref/getCentWarehouseGroup",
								method: "POST"
							}
						});
						var params = {
							storeId: inStore,
						};
						proxy.settle(params, (err, result) => {
							if (err) {
								cb.utils.alert(err.message, 'error');
								return;
							}

							// if (result === undefined) {// || result == null || result.length === 0
							if (!result || result.length === 0){
								cb.utils.alert("没有查询所属门店的周边门店业务仓库！", 'error');
								// hasBusinessWarehouse = false;
								viewmodel.setCache('hasBusinessWarehouse',false);
							} else {
								// hasBusinessWarehouse = true;
								viewmodel.setCache('hasBusinessWarehouse',true);

								//添加仓库过滤条件只有周边仓库
								var conditionWarehouse = {
									"isExtend": true,
									simpleVOs: []
								};
								conditionWarehouse.simpleVOs.push({
									field: 'id',
									op: 'in',
									value1: result
								});
								//LS-7137 bustype_storeOutType == 2 参照的应该是非门店仓
								conditionWarehouse.simpleVOs.push({
									field: 'wStore',
									op: 'eq',
									value1: '0'
								});
								viewmodel.get('inWarehouse_name').setFilter(conditionWarehouse);
							}
						});
					}
				}

				//wangtianjiao---start
				if (!cb.rest.AppContext.option.autoDesignOutStockBatch) {
					if (viewmodel.get("btnAutoPick")) {
						viewmodel.get("btnAutoPick").setVisible(false);
					}
				}
				//---end


				if (viewmodel.get('btnExport')) {
					viewmodel.get('btnExport').setVisible(false);
				}

				common.setBarcodeVisble(viewmodel);

				//是否显示序列号相关
				var detailsModel = viewmodel.get("details");
				common.showSnVisible(viewmodel, detailsModel);

				if (!cb.utils.isEmpty(viewmodel.get("srcBillNO").getValue())) {
					viewmodel.get('barcode').setVisible(false);
					viewmodel.get("btnAddRow").setVisible(false);
					if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(false);
				}
			});

			//隐藏自定义项
			viewmodel.on('beforeEdit', function () {
				common.hiddenDefineOnClick(viewmodel.get("details"),viewmodel);
			});

			// viewmodel.on("afterSave",function (data) {
			// 	if (data.err == null || data.err == undefined) {
			// 		viewmodel.execute('refresh');
			// 	}
			// });

			//生成店存出库单
			viewmodel.on('afterLoadData', function (data) {

				//隐藏自定义项
				common.hiddenDefine(viewmodel.get("details"),viewmodel.getParams().mode);

				// hasBusinessWarehouse = false;
				viewmodel.setCache('hasBusinessWarehouse', false);
				var srcBillType = viewmodel.get("srcBillType").getValue();
				//U订货退单
				if (srcBillType == "3") {
					if (viewmodel.get('btnSave')) {
						viewmodel.get('btnSave').setVisible(false);
					}
				}

				//wangtianjiao---start
				if (!cb.rest.AppContext.option.autoDesignOutStockBatch) {
					if (viewmodel.get("btnAutoPick")) {
						viewmodel.get("btnAutoPick").setVisible(false);
					}

				}
				//---end
				common.setBarcodeVisble(viewmodel);

				var detailsModel = viewmodel.get("details");
				//是否显示序列号相关
				common.showSnVisible(viewmodel, detailsModel);

				//未启用货位管理参数时所有单据隐藏货位字段
				common.goodsPositionVisible(viewmodel,detailsModel);

				var mode = viewmodel.getParams().mode;
				// var logisticsModel = viewmodel.get("OutStoreLogistics");
				if (mode == "browse") {
					if (viewmodel.get('btnExport')) {
						viewmodel.get('btnExport').setVisible(true);
					}
				} else {
					if (viewmodel.get('btnExport')) {
						viewmodel.get('btnExport').setVisible(false);
					}
				}

				logisticsModel.on('afterMount', function () {
					//编辑态
					if (mode == 'edit') {
						//设置商品表体行不可删除
						/*var actionsStates = [];
						var rows = detailsModel.getRows();
						for(var i = 0; i < rows.length ; i ++ ){
							var actionState = {};
							actionState["btnDeleteRow2"] = {visible:false};
							actionsStates.push(actionState);
						}
						logisticsModel.setActionsState(actionsStates);*/

					}
					else if (mode == 'add') {

					}
					//浏览态
					else {
						//设置商品表体行不可删除
						var actionsStates = [];
						var rows = detailsModel.getRows();
						for (var i = 0; i < rows.length; i++) {
							var actionState = {};
							if(actionState["btnDeleteRow2"])actionState["btnDeleteRow2"] = { visible: false };
							actionsStates.push(actionState);
						}

						logisticsModel.setActionsState(actionsStates);
					}
				});


				//新增态
				if (mode == "add") {
					//viewmodel.get('inWarehouse_name').setDisabled(data.inStore_name ? false : true);
					self.queryCentStoreGroup(cb.rest.AppContext.user.storeId, viewmodel);
					if(viewmodel.get("btnAddRow2"))viewmodel.get("btnAddRow2").setVisible(true);
					if(viewmodel.get("btnAddRow2"))viewmodel.get("btnAddRow2").setDisabled(false);
					if (data.srcBill != null) {

						if (data.srcBillType == "1") {
							self.queryBusytype(1, viewmodel);
							viewmodel.get("inWarehouse_name").setReadOnly(true);
						} else if (data.srcBillType == "2") {
							//退货类型，仓库过滤成业务仓
							self.setWarehouseFilter(viewmodel);
							//业务类型，过滤成只可选退货类型
							self.queryBusytype(2, viewmodel);
						}

						//设置商品表体行不可删除
						var actionsStates = [];
						var rows = detailsModel.getRows();

						//来源退货申请的，删除数量为0的数据-------------------
						if (data.srcBillType == "2") {
							var newRows = [];
							rows.forEach(function (item) {
								if (!isNaN(item.quantity) && Number(item.quantity) > 0) {
									newRows.push(item);
								}
							});
							detailsModel.setDataSource(newRows);
							rows = newRows;
						}
						//--------------------------------------------------

						let srcbilldata = viewmodel.get("srcbilldata");
						for (let a = 0; a < rows.length; a++) {
							let flag = 0;
							for (let b = 0; b < srcbilldata.length; b++) {
								if (srcbilldata[b].product_cCode == rows[a].product_cCode && srcbilldata[b].productsku == rows[a].productsku) {
									srcbilldata[b].quantity = srcbilldata[b].quantity + rows[a].quantity;
									flag = 1;
									break;
								}
							}
							if (flag == 0) {
								let row = new Object();
								row.product_cCode = rows[a].product_cCode;
								row.productsku = rows[a].productsku;
								row.quantity = rows[a].quantity;
								srcbilldata.push(row);
							}
						}
						/*rows.forEach(data =>{
							var actionState = {};
							actionState["btnDeleteRow"] = {visible:false};
							actionsStates.push(actionState);
						});
						detailsModel.setActionsState(actionsStates);*/

						//viewmodel.get("vouchdate").setReadOnly(true);
						viewmodel.get("code").setVisible(true);
						//viewmodel.get("outWarehouse_name").setReadOnly(true);
						viewmodel.get("inStore_name").setReadOnly(true);

						//viewmodel.get("operator_name").setReadOnly(true);
						viewmodel.get("srcBillNO").setReadOnly(true);
						viewmodel.get("status").setReadOnly(true);
						viewmodel.get("btnAudit").setVisible(false);
						viewmodel.get("btnAddRow").setVisible(false);
						viewmodel.get("barcode").setVisible(false);
						//if (!cb.rest.AppContext.option.serialManage) {
							if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(false);
						//}
						viewmodel.get("btnDeleteRow").setVisible(false);
						viewmodel.get("btnDeleteRow").setDisabled(true);



						detailsModel.setColumnState('product_cName', 'readOnly', true);
						detailsModel.setColumnState('product_cCode', 'readOnly', true);
						detailsModel.setColumnState('free1', 'readOnly', true);
						detailsModel.setColumnState('free2', 'readOnly', true);
						detailsModel.setColumnState('free3', 'readOnly', true);
						detailsModel.setColumnState('free4', 'readOnly', true);
						detailsModel.setColumnState('free5', 'readOnly', true);
						detailsModel.setColumnState('free6', 'readOnly', true);
						detailsModel.setColumnState('free7', 'readOnly', true);
						detailsModel.setColumnState('free8', 'readOnly', true);
						detailsModel.setColumnState('free9', 'readOnly', true);
						detailsModel.setColumnState('free10', 'readOnly', true);
						detailsModel.setColumnState('invaliddate', 'readOnly', true);
						detailsModel.setColumnState('producedate', 'readOnly', true);
						detailsModel.setColumnState('unitName', 'readOnly', true);
						// 					rows.forEach(function(rows,index){
						// 						detailsModel.setCellState(index, 'product_cName', 'disabled', true);
						// 						detailsModel.setCellState(index, 'product_cCode', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free1', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free2', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free3', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free4', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free5', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free6', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free7', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free8', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free9', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free10', 'disabled', true);
						// //						detailsModel.setCellState(index, 'recorddate', 'disabled', true);
						// 						detailsModel.setCellState(index, 'invaliddate', 'disabled', true);
						// 						detailsModel.setCellState(index, 'producedate', 'disabled', true);
						// 						//detailsModel.setCellState(index, 'quantity', 'disabled', true);
						// 						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'memo', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);

						// //						detailsModel.setCellState(index, 'batchno', 'disabled', true);
						// //						detailsModel.setCellState(index, 'rowno', 'disabled', true);
						// 					});
					}

				}
				//编辑态
				else if (mode == 'edit') {
					self.queryCentStoreGroup(cb.rest.AppContext.user.storeId, viewmodel);
					if(viewmodel.get("btnDeleteRow2"))viewmodel.get("btnDeleteRow2").setVisible(true);
					if(viewmodel.get("btnAddRow2"))viewmodel.get("btnAddRow2").setVisible(true);
					if(viewmodel.get("btnDeleteRow2"))viewmodel.get("btnDeleteRow2").setDisabled(false);
					if(viewmodel.get("btnAddRow2"))viewmodel.get("btnAddRow2").setDisabled(false);

					if (data.srcBill != null) {
						self.querySrcBill(data.srcBill, viewmodel, data);
						//设置商品表体行不可删除
						var actionsStates = [];
						var rows = detailsModel.getRows();
						/*						for(var i = 0; i < rows.length ; i ++ ){
													var actionState = {};
													actionState["btnDeleteRow"] = {visible:false};
													actionsStates.push(actionState);
												}

												detailsModel.setActionsState(actionsStates);*/

						//viewmodel.get("vouchdate").setReadOnly(true);
						viewmodel.get("code").setVisible(true);
						//viewmodel.get("outWarehouse_name").setReadOnly(true);//有来源的店间调拨出库仓可参照
						viewmodel.get("inStore_name").setReadOnly(true);
						viewmodel.get("inWarehouse_name").setReadOnly(true);
						//viewmodel.get("operator_name").setReadOnly(true);
						viewmodel.get("srcBillNO").setReadOnly(true);
						viewmodel.get("status").setReadOnly(true);
						viewmodel.get("btnAudit").setVisible(false);
						viewmodel.get("btnAddRow").setVisible(false);
						viewmodel.get("btnDeleteRow").setDisabled(true);
						viewmodel.get("btnDeleteRow").setVisible(false);
						viewmodel.get("barcode").setVisible(false);
						//if (!cb.rest.AppContext.option.serialManage) {
							if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(false);
						//}

						//viewmodel.get("btnDeleteRow").setDisabled(true);
						//viewmodel.get("btnDeleteRow").setVisible(false);

						detailsModel.setColumnState('product_cName', 'readOnly', true);
						detailsModel.setColumnState('product_cCode', 'readOnly', true);
						detailsModel.setColumnState('free1', 'readOnly', true);
						detailsModel.setColumnState('free2', 'readOnly', true);
						detailsModel.setColumnState('free3', 'readOnly', true);
						detailsModel.setColumnState('free4', 'readOnly', true);
						detailsModel.setColumnState('free5', 'readOnly', true);
						detailsModel.setColumnState('free6', 'readOnly', true);
						detailsModel.setColumnState('free7', 'readOnly', true);
						detailsModel.setColumnState('free8', 'readOnly', true);
						detailsModel.setColumnState('free9', 'readOnly', true);
						detailsModel.setColumnState('free10', 'readOnly', true);
						detailsModel.setColumnState('invaliddate', 'readOnly', true);
						detailsModel.setColumnState('producedate', 'readOnly', true);
						detailsModel.setColumnState('unitName', 'readOnly', true);

						// rows.forEach(function(rows,index){




						// 						detailsModel.setCellState(index, 'product_cName', 'disabled', true);
						// 						detailsModel.setCellState(index, 'product_cCode', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free1', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free2', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free3', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free4', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free5', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free6', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free7', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free8', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free9', 'disabled', true);
						// 						detailsModel.setCellState(index, 'free10', 'disabled', true);
						// //						detailsModel.setCellState(index, 'recorddate', 'disabled', true);
						// 						detailsModel.setCellState(index, 'invaliddate', 'disabled', true);
						// 						detailsModel.setCellState(index, 'producedate', 'disabled', true);
						// //						detailsModel.setCellState(index, 'quantity', 'disabled', true);
						// 						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'memo', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);
						// //						detailsModel.setCellState(index, 'unitName', 'disabled', true);

						// //						detailsModel.setCellState(index, 'batchno', 'disabled', true);
						// //						detailsModel.setCellState(index, 'rowno', 'disabled', true);
						// });
					}
				} else {
					if(viewmodel.get("btnAddRow2"))viewmodel.get("btnAddRow2").setVisible(false);
				}

				//非货位仓不允许参照
				if (viewmodel.get('warehouse_isGoodsPosition').getValue()) {
					viewmodel.get("details").setColumnState('goodsposition_cName', 'bCanModify', true);
				}else{
					viewmodel.get("details").setColumnState('goodsposition_cName', 'bCanModify', false);
				}
			});

			viewmodel.on('beforeAddRow', function (data) {
				if (data.params.cItemName == 'btnAddRowSN') {//序列号新增
					var detailsModel = viewmodel.get("details");
					return common.checkBeforeAddSn(detailsModel);
				}
			});

			viewmodel.on('fillsn', function (args) {
				var detailsModel = viewmodel.get("details");
				var snModel = viewmodel.get("storeOutDetailSNs");
				var qtyfieldname = "quantity";
				common.autofillsn(args, viewmodel, detailsModel, snModel, qtyfieldname);
			});

			//是否显示序列号信息
			viewmodel.on("modeChange", function (data) {
				common.bsnTabShow(data, viewmodel, 'st_storeout_body_page_sn', 'st_storeout_head_page', bShowSn);
			});

			viewmodel.on("showsn", function (data) {
				bShowSn = !bShowSn;
				if (!common.bsnTabShow(data, viewmodel, 'st_storeout_body_page_sn', 'st_storeout_head_page', bShowSn)) {
					bShowSn = !bShowSn;//恢复原值
				}
			});

			detailsModel.on("afterSelect", function (rowIndexes) {
				var row = detailsModel.getRow(rowIndexes);
				if (row && row.isSerialNoManage) {
					viewmodel.get("storeOutDetailSNs").setReadOnly(false);
				} else {
					viewmodel.get("storeOutDetailSNs").setReadOnly(true);
				}

				//补齐由于选择多批号后造成的表体出库日期为空的问题
				var vouchdate = this.getParent().get("vouchdate").getValue();
				var dataModel = viewmodel.get('details');
				var rows=dataModel.getRows();
				for(var i = 0; i < rows.length ; i ++ ){
					if (dataModel.getCellValue(i,'recorddate')==null)
					{
						dataModel.setCellValue(i,'recorddate', vouchdate);
					}
				}
			});

			//选择货位前需先选中仓库
			viewmodel.get('details').on('beforeBrowse', function (data) {
				if(data.cellName === 'goodsposition_cName'){
					if (!viewmodel.get('outWarehouse').getValue()) {
						cb.utils.alert('请先选择仓库！', 'warning');
						return false;
					}
				}
			});

			//选择批次带出有存量货位
			viewmodel.get('details').on('afterCellValueChange', function (data) {
				if(viewmodel.get('warehouse_isGoodsPosition').getValue()){
					if(data.cellName === 'batchno'){
						let detailsModel = viewmodel.get('details');
						let row = detailsModel.getRows()[data.rowIndex];
						let proxy = cb.rest.DynamicProxy.create({
							detail: {
								url: '/goodsposition/getGoodsPositionByBatchNo',
								method: 'POST'
								}
							});
						let parms = {
							productId: row['product'],
							quantity: row['quantity'],
							batchno: row['batchno']
						};
						proxy.detail(parms, (err, result) => {
							if(err) {
								cb.utils.alert(err.message, 'error');
								return;
							}
							if(result){
								detailsModel.setCellValue(data.rowIndex, 'goodsposition',  result.goodsposition);
								detailsModel.setCellValue(data.rowIndex, 'goodsposition_cName',  result.goodspositionName);
							}else{
								detailsModel.setCellValue(data.rowIndex, 'goodsposition',  null);
								detailsModel.setCellValue(data.rowIndex, 'goodsposition_cName',  null);
							}
						});
					}
				}
			});

			//选择序列号带出有存量货位
			// viewmodel.get('storeOutDetailSNs').on('afterCellValueChange', function (data) {
			// 	if(viewmodel.get('warehouse_isGoodsPosition').getValue()){
			// 		if(data.cellName === 'sn'){
			// 		let detailsModel = viewmodel.get('storeOutDetailSNs');
			// 		let selectedRow = viewmodel.get("details").getSelectedRows()[0];
			// 		let selectedRowIndex = viewmodel.get('details').getSelectedRowIndexes()[0];
			// 		let row = detailsModel.getRows()[data.rowIndex];
			// 		let proxy = cb.rest.DynamicProxy.create({
			// 			detail: {
			// 			url: '/goodsposition/getGoodsPositionBySN',
			// 			method: 'POST'
			// 			}
			// 			});
			// 		let parms = {
			// 			productId: selectedRow["product"],
			// 			quantity:selectedRow["quantity"],
			// 			goodsposition:selectedRow["goodsposition"],
			// 			sn: row['sn']
			// 		};
			// 		proxy.detail(parms, (err, result) => {
			// 			if(err) {
			// 			cb.utils.alert(err.message, 'error');
			// 			return;
			// 			}
			// 			if(!selectedRow["goodsposition"]){
			// 				if(result){
			// 					viewmodel.get("details").setCellValue(selectedRowIndex, 'goodsposition',  result.goodsposition);
			// 					viewmodel.get("details").setCellValue(selectedRowIndex, 'goodsposition_cName',  result.goodspositionName);
			// 					}else{
			// 					viewmodel.get("details").setCellValue(selectedRowIndex, 'goodsposition',  null);
			// 					viewmodel.get("details").setCellValue(selectedRowIndex, 'goodsposition_cName',  null);
			// 				}
			// 			}

			// 		});
			// 		}
			// 	}
			// });

			//清空货位时清空对应序列号
			viewmodel.get('details').on('afterCellValueChange', function (data) {
				if(viewmodel.get('warehouse_isGoodsPosition').getValue()){
					if(data.cellName === 'goodsposition_cName'){
					let rows = viewmodel.get('storeOutDetailSNs').getRowsCount();
						if(rows > 0){
							let deleteRows = new Array();
							for(var i = 0; i < rows; i++){
								deleteRows[i] = i;
							}
							viewmodel.get('storeOutDetailSNs').deleteRows(deleteRows);
						}
					}
				}
			});

			//选择序列号之前判断货位
			viewmodel.get('storeOutDetailSNs').on('beforeBrowse', function (data) {
			let selectedRow = viewmodel.get("details").getSelectedRows()[0];
			if (viewmodel.get('warehouse_isGoodsPosition').getValue()) {
				if(!selectedRow["goodsposition_cName"]){
				cb.utils.alert('货位仓选择序列号请先确定货位!', 'error');
				return false;
				}
			}
			});

			//切换仓库刷新货位参照是否可编辑
			viewmodel.get("outWarehouse_name").on('afterValueChange',function(data){

				//切换仓库删除序列号
				common.clearSnAfterWareChange(viewmodel,viewmodel.get('storeOutDetailSNs'));

				viewmodel.get("details").setColumnValue("goodsposition", null);
				viewmodel.get("details").setColumnValue("goodsposition_cName", null);
				if (viewmodel.get('warehouse_isGoodsPosition').getValue()) {
					viewmodel.get("details").setColumnState('goodsposition_cName', 'bCanModify', true);
				}else{
					viewmodel.get("details").setColumnState('goodsposition_cName', 'bCanModify', false);
				}
            });

            //非货位仓不允许参照
			// viewmodel.on('beforeAddRow', function (data) {
			// 	if (viewmodel.get('warehouse_isGoodsPosition').getValue()) {
			// 		viewmodel.get("details").setColumnState('goodsposition_cName', 'bCanModify', true);
			// 	}else{
			// 		viewmodel.get("details").setColumnState('goodsposition_cName', 'bCanModify', false);
			// 	}
			// });

			//保存之前，校验出库仓库和入库仓库不可以相同
			viewmodel.on('beforeSave', function (args) {



				//校验出库数量必须大于零
				var detailsModel = viewmodel.get("details");
				var rows = detailsModel.getRows();

				var outWarehouse = viewmodel.get("outWarehouse").getValue();
				var inWarehouse = viewmodel.get("inWarehouse").getValue();
				var outStore = viewmodel.get("outStore").getValue();
				var inStore = viewmodel.get("inStore").getValue();
				var bustype_storeOutType = viewmodel.get("bustype_storeOutType").getValue();
				var srcBillType = viewmodel.get("srcBillType").getValue();

				//货位仓校验货位必输
				let isGoodsPosition = viewmodel.get('warehouse_isGoodsPosition').getValue();
				if (isGoodsPosition) {
						for (let i = 0; i < rows.length; i++) {
								let row = rows[i];
								if (!row["goodsposition_cName"]) {
										cb.utils.alert('启用货位管理的仓库行的货位不能为空,请检查!', 'error');
										return false;
								}
						}
				}

				//非U订货退单
				if (srcBillType != "3") {
					if (bustype_storeOutType == "1") {
						if (inStore == undefined || inStore == "") {
							cb.utils.alert("业务类型为调拨出库时，入库门店不可为空！");
							return false;
						}
						if (inWarehouse == undefined || inWarehouse == "") {
							cb.utils.alert("业务类型为调拨出库时，入库仓库不可为空！");
							return false;
						}
					} else if (bustype_storeOutType == "2") {
						if (inWarehouse == undefined || inWarehouse == "") {
							cb.utils.alert("业务类型为退货出库时，入库仓库不可为空！");
							return false;
						}
					}
				}


				if (outWarehouse == inWarehouse) {
					cb.utils.alert("出库仓库和入库仓库不可以相同！");
					return false;
				}
				let checkrow = new Array();
				for (var i = 0; i < rows.length; i++) {
					let qty = Number(rows[i].quantity);//批次带出来的行上的数量是字符串类型
					if (qty <= 0) {
						cb.utils.alert("商品出库数量必须大于零！");
						return false;
					}
					let flag = 0;
					for (let b = 0; b < checkrow.length; b++) {
						if (checkrow[b].product_cCode == rows[i].product_cCode && checkrow[b].productsku == rows[i].productsku) {
							checkrow[b].quantity = checkrow[b].quantity + qty;
							flag = 1;
							break;
						}
					}
					if (flag == 0) {
						let row = new Object();
						row.product_cCode = rows[i].product_cCode;
						row.productsku = rows[i].productsku;
						row.quantity = qty;
						checkrow.push(row);
					}
				}


				let srcbilldata = viewmodel.get("srcbilldata");
				for (var i = 0; i < srcbilldata.length; i++) {
					for (let c = 0; c < checkrow.length; c++) {
						if (checkrow[c].product_cCode == srcbilldata[i].product_cCode && checkrow[c].productsku == srcbilldata[i].productsku) {
							if (checkrow[c].quantity > srcbilldata[i].quantity) {
								cb.utils.alert("商品出库数量不能大于调拨申请数量！商品编码为：" + checkrow[c].product_cCode + "，调拨申请数量为：" + srcbilldata[i].quantity);
								return false;
							}
						}
					}
				}

				var detailsModelName = 'details';
				var snModelName = 'storeOutDetailSNs';
				var qtyfildname = 'quantity';

				// var detailsModel = viewmodel.get("details");
				var iSerialManage = viewmodel.get('outWarehouse_iSerialManage').getValue();
				if (cb.rest.AppContext.option.serialManage && iSerialManage) {
					// var returnPromise = new cb.promise();
					let bflg = common.checkSnBeforeSave(args, detailsModelName, snModelName, qtyfildname,viewmodel);
					if (bflg == 1) {
						return false;//序列号重复
					}
					if (bflg == 2) {
						var returnPromise = new cb.promise();
						cb.utils.confirm('商品行数量与序列号不一致，是否修改单据商品数量！', function () {
							common.updateRowQtyBySnNum(args, detailsModelName, snModelName, qtyfildname);
							//修改了商品行数量如果是有来源的并且有序列号的再次去校验目前商品入库数量和调拨申请数量大小比较 start
							var newdatas = JSON.parse(args.data.data);
							var newrows = newdatas[detailsModelName];
							let newcheckrow = new Array();
							for (var i = 0; i < newrows.length; i++) {
								let newqty = Number(newrows[i].quantity);//批次带出来的行上的数量是字符串类型
								if (newqty <= 0) {
									cb.utils.alert("商品出库数量必须大于零！");
									return false;
								}
								let newflag = 0;
								for (let b = 0; b < newcheckrow.length; b++) {
									if (newcheckrow[b].product_cCode == newrows[i].product_cCode && newcheckrow[b].productsku == newrows[i].productsku) {
										newcheckrow[b].quantity = newcheckrow[b].quantity + newqty;
										newflag = 1;
										break;
									}
								}
								if (newflag == 0) {
									let newrow = new Object();
									newrow.product_cCode = newrows[i].product_cCode;
									newrow.productsku = newrows[i].productsku;
									newrow.quantity = newqty;
									newcheckrow.push(newrow);
								}
							}
							for (var i = 0; i < srcbilldata.length; i++) {
								for (let c = 0; c < newcheckrow.length; c++) {
									if (newcheckrow[c].product_cCode == srcbilldata[i].product_cCode && newcheckrow[c].productsku == srcbilldata[i].productsku) {
										if (newcheckrow[c].quantity > srcbilldata[i].quantity) {
											cb.utils.alert("商品出库数量不能大于调拨申请数量！商品编码为：" + newcheckrow[c].product_cCode + "，调拨申请数量为：" + srcbilldata[i].quantity + "，序列号数量为：" + newcheckrow[c].quantity);
											return false;
										}
									}
								}
							}
							//end

							return returnPromise.resolve();
						});
						return returnPromise;
					}
					return true;
				}





			});

			//选择仓库之前，如果没有选择入库门店，提示请先选择
			viewmodel.get("inWarehouse_name").on('beforeBrowse', function (data) {
				var bustype_name = viewmodel.get("bustype_name").getValue();
				if (bustype_name == null || bustype_name == "") {
					cb.utils.alert("请先选择业务类型！");
					return false;
				} else {
					var bustype_storeOutType = viewmodel.get("bustype_storeOutType").getValue();
					if (bustype_storeOutType == 1) {
						var inStore_name = viewmodel.get("inStore_name").getValue();
						if (inStore_name == null || inStore_name == "") {
							cb.utils.alert("调拨出库，请先选择入库门店！");
							return false;
						} else {
							viewmodel.get('inWarehouse_name').setDisabled(false);
						}
					}

				}

				let hasBusinessWarehouse = viewmodel.getCache('hasBusinessWarehouse');
				if (!hasBusinessWarehouse) {
					var bustype_storeOutType = viewmodel.get("bustype_storeOutType").getValue();

					if (bustype_storeOutType == "2") {
						cb.utils.alert("没有查询所属门店的周边门店业务仓库！", 'error');
						return false;
					}
				}

			});
			//选择门店前，要先选择业务类型
			viewmodel.get("inStore_name").on('beforeBrowse', function (data) {
				var bustype_name = viewmodel.get("bustype_name").getValue();
				if (bustype_name == null || bustype_name == "") {
					cb.utils.alert("请先选择业务类型！");
					return false;
				} else {
					viewmodel.get('inStore_name').setDisabled(false);
				}
			});

			//当业务类型是退货申请时，仓库过滤为周边门店业务仓
			viewmodel.get("bustype_name").on('afterValueChange', function (data) {

				var bustype_name = viewmodel.get("bustype_name").getValue();
				//业务类型切换，如果是有流程的话入库门店和入库仓不变 add by shiying
				if (cb.utils.isEmpty(viewmodel.get("srcBillNO").getValue())) {
					//没有流程的都清掉数据
					viewmodel.get("inStore").setValue(null);
					viewmodel.get("inStore_name").setValue("");
					viewmodel.get("inWarehouse_name").setValue("");
					viewmodel.get("inOrg_name").setValue("");
					viewmodel.get('inWarehouse_name').setState('bIsNull', true);
					viewmodel.get('inStore_name').setState('bIsNull', true);
				}
				//end
				/*if (viewmodel.get("srcBillNO").getValue() == "" || viewmodel.get("srcBillNO").getValue() == null) {
					if (bustype_name == "" || bustype_name == null) {
						if (viewmodel.get("srcBillNO").getValue() != null && viewmodel.get("srcBillNO").getValue() != "") {
							viewmodel.get("inStore_name").setValue("");
							viewmodel.get("inStore").setValue("");
							viewmodel.get("inWarehouse_name").setValue("");
							viewmodel.get("inWarehouse").setValue("");
							//viewmodel.get("inOrg").setValue("");
							//viewmodel.get("inOrg_name").setValue("");
						}
					}
				} */

				var bustype_storeOutType = viewmodel.get("bustype_storeOutType").getValue();
				var srcBillType = viewmodel.get("srcBillType").getValue();

				if (bustype_storeOutType == 2) {
					if (srcBillType != "3") {
						viewmodel.get('inWarehouse_name').setState('bIsNull', false);
						viewmodel.get("inStore_name").setReadOnly(true);
						var inStore = cb.rest.AppContext.user.storeId;
						var proxy = cb.rest.DynamicProxy.create({
							settle: {
								url: "/bill/ref/getCentWarehouseGroup",
								method: "POST"
							}
						});
						var params = {
							storeId: inStore,
						};
						proxy.settle(params, (err, result) => {
							if (err) {
								cb.utils.alert(err.message, 'error');
								return;
							}

							// if (result === undefined) {// || result == null || result.length === 0
							if (!result || result.length === 0){
								cb.utils.alert("没有查询所属门店的周边门店业务仓库！", 'error');
								// hasBusinessWarehouse = false;
								viewmodel.setCache('hasBusinessWarehouse',false);
							} else {
								// hasBusinessWarehouse = true;
								viewmodel.setCache('hasBusinessWarehouse',true);

								//添加仓库过滤条件只有周边仓库
								var conditionWarehouse = {
									"isExtend": true,
									simpleVOs: []
								};
								conditionWarehouse.simpleVOs.push({
									field: 'id',
									op: 'in',
									value1: result
								});
								//LS-7137 bustype_storeOutType == 2 参照的应该是非门店仓
								conditionWarehouse.simpleVOs.push({
									field: 'wStore',
									op: 'eq',
									value1: '0'
								});
								viewmodel.get('inWarehouse_name').setFilter(conditionWarehouse);
							}
						});
					}
				} else {
					//如果来源单据是空的 门店可参照
					if (cb.utils.isEmpty(viewmodel.get("srcBillNO").getValue())) {
						viewmodel.get('inStore_name').setState('bIsNull', false);
						viewmodel.get("inStore_name").setReadOnly(false);
					}
					//end
				}
			});


			// //新增行前事件
			// viewmodel.get("details").on("beforeInsertRowFromRefer", function (data) {
			//   let selectedRow = viewmodel.get("details").getSelectedRows()[0];
			//   if (selectedRow) {
			//     let row = data.row;
			//     let keys = Object.keys(selectedRow);
			//     for (let i = 0; i < keys.length; i++) {
			//       let key = keys[i];
			//       row[key] = selectedRow[key];
			//     }
			//   }
			// });

			//业务类型为退货申请,当入库仓库值发生改变的时候，给入库组织赋值
			viewmodel.get("inWarehouse_name").on('afterValueChange', function (data) {
				var bustype_storeOutType = viewmodel.get("bustype_storeOutType").getValue();
				if (bustype_storeOutType == 2) {
					viewmodel.get("inOrg").setValue(viewmodel.get("inWarehouse_org").getValue());
					viewmodel.get("inOrg_name").setValue(viewmodel.get("inWarehouse_org_name").getValue());
				}
			});

			//填写完门店名称后，添加仓库过滤
			viewmodel.get("inStore_name").on('afterValueChange', function (data) {
				if (viewmodel.get("inStore_name").getValue() == null || viewmodel.get("inStore_name").getValue() == "") {
					viewmodel.get("inWarehouse_name").setValue();
					viewmodel.get("inOrg").setValue();
					viewmodel.get("inOrg_name").setValue();
				}

				var inStore = viewmodel.get("inStore").getValue();
				var isDB = viewmodel.get('bustype_storeOutType').getValue();
				if (isDB == 1) {
					viewmodel.get("inOrg").setValue(viewmodel.get("inStore_org").getValue());
					viewmodel.get("inOrg_name").setValue(viewmodel.get("inStore_org_name").getValue());

					var proxy = cb.rest.DynamicProxy.create({
						settle: {
							url: "/bill/ref/getWarehousesDetailFromStore",
							method: "POST"
						}
					});
					var params = {
						storeId: inStore,
					};
					proxy.settle(params, (err, result) => {
						if (err) {
							cb.utils.alert(err.message, 'error');
							return;
						}

						if (result === undefined) {
							cb.utils.alert("没有查询当前选择店铺的仓库！", 'error');
						} else {
							var arr = [];
							for (var i = 0; i < result.length; i++) {
								arr.push(result[i].id);
								if (result[i].isDefault == true) {
									viewmodel.get('inWarehouse').setValue(result[i].id);
									viewmodel.get('inWarehouse_name').setValue(result[i].name);
								}
							}
							//添加门店过滤条件只有周边门店
							var conditionWarehouse = {
								"isExtend": true,
								simpleVOs: []
							};
							conditionWarehouse.simpleVOs.push({
								field: 'id',
								op: 'in',
								value1: arr
							});
							viewmodel.get('inWarehouse_name').setFilter(conditionWarehouse);
						}
					});

				} else {

				}
			});

		},

		// 查询该店铺所有周边门店
		queryCentStoreGroup: function (storeId, viewmodel) {
			var proxy = cb.rest.DynamicProxy.create({
				settle: {
					url: "/bill/ref/getCentStoreGroup",
					method: "POST"
				}
			});
			var params = {
				storeId: storeId,
			};
			proxy.settle(params, (err, result) => {
				if (err) {
					cb.utils.alert(err.message, 'error');
					return;
				}

				if (result === undefined || result == "") {
					//LS-7137
					//cb.utils.alert("未查到该门店周边门店组或周边门店组只有当前门店！", 'error');
					// hasBusinessWarehouse = false;
					viewmodel.setCache('hasBusinessWarehouse',false);
					//没有周边门店组，查出来为空
					//添加门店过滤条件只有周边门店
					var conditionStore = {
						"isExtend": true,
						simpleVOs: []
					};
					conditionStore.simpleVOs.push({
						field: 'id',
						op: 'in',
						value1: 10010
					});
					viewmodel.get('inStore_name').setFilter(conditionStore);

				} else {
					// hasBusinessWarehouse = true;
					viewmodel.setCache('hasBusinessWarehouse',true);
					//添加门店过滤条件只有周边门店
					var conditionStore = {
						"isExtend": true,
						simpleVOs: []
					};
					conditionStore.simpleVOs.push({
						field: 'id',
						op: 'in',
						value1: result
					});
					viewmodel.get('inStore_name').setFilter(conditionStore);
				}
			});
		},

		// 退货查询时，入库仓过滤只有业务仓
		setWarehouseFilter: function (viewmodel) {
			var inStore = cb.rest.AppContext.user.storeId;
			var proxy = cb.rest.DynamicProxy.create({
				settle: {
					url: "/bill/ref/getCentWarehouseGroup",
					method: "POST"
				}
			});
			var params = {
				storeId: inStore,
			};
			proxy.settle(params, (err, result) => {
				if (err) {
					cb.utils.alert(err.message, 'error');
					return;
				}

				if (result === undefined) {
					cb.utils.alert("没有查询所属门店的周边门店业务仓库！", 'error');
					// hasBusinessWarehouse = false;
					viewmodel.setCache('hasBusinessWarehouse',false);
				} else {
					viewmodel.setCache('hasBusinessWarehouse',true);
					// hasBusinessWarehouse = true;
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
					viewmodel.get('inWarehouse_name').setFilter(conditionWarehouse);
				}
			});
		},

		querySrcBill: function (srcbill, viewmodel, data) {

			var proxy = cb.rest.DynamicProxy.create({
				settle: {
					url: "/bill/ref/querySrcBill",
					method: "POST"
				}
			});
			var params = {
				type: data.srcBillType,
				srcbill: srcbill
			};
			proxy.settle(params, (err, result) => {
				if (err) {
					cb.utils.alert(err.message, 'error');
					return;
				}

				if (result === undefined) {
					cb.utils.alert("没有找到来源单据！", 'error');
				} else {
					//viewmodel.set("srcbilldata" , new Array());
					let srcbilldata = new Array();
					for (let a = 0; a < result.length; a++) {
						let flag = 0;
						for (let b = 0; b < srcbilldata.length; b++) {
							if (srcbilldata[b].product == result[a].product && srcbilldata[b].productsku == result[a].productsku) {
								srcbilldata[b].quantity = srcbilldata[b].quantity + result[a].quantity;
								flag = 1;
								break;
							}
						}
						if (flag == 0) {
							let row = new Object();
							//row.product_cCode = result[a].product_cCode;
							for (let c = 0; c < data.details.length; c++) {
								if (result[a].product == data.details[c].product) {
									row.product_cCode = data.details[c].product_cCode;
									break;
								}
							}
							row.product = result[a].product;
							row.productsku = result[a].productsku;
							row.quantity = result[a].quantity;
							srcbilldata.push(row);
						}
					}
					viewmodel.set("srcbilldata", srcbilldata);
				}
			});
		},

		// 查询业务类型，并复制默认类型
		queryBusytype: function (type, viewmodel) {
			var proxy = cb.rest.DynamicProxy.create({
				settle: {
					url: "/bill/ref/queryBusytype",
					method: "POST"
				}
			});
			var params = {
				type: type
			};
			proxy.settle(params, (err, result) => {
				if (err) {
					cb.utils.alert(err.message, 'error');
					return;
				}

				if (result === undefined) {
					cb.utils.alert("没有查询业务类型！", 'error');
				} else {
					//var arr = [];
					var type;
					for (var i = 0; i < result.length; i++) {
						//arr.push(result[i].id);
						if (result[i].isSystem == true || result[i].isDefault == true) {
							viewmodel.get('bustype_name').setValue(result[i].name);
							viewmodel.get('bustype').setValue(result[i].id);
							viewmodel.get('bustype_storeOutType').setValue(result[i].storeOutType);

							break;
						}
					}
					type = result[0].storeOutType;
					var conditionBusytype = {
						"isExtend": true,
						simpleVOs: []
					};
					conditionBusytype.simpleVOs.push({
						field: 'storeOutType',
						op: 'eq',
						value1: type
					});
					viewmodel.get('bustype_name').setFilter(conditionBusytype);
				}
			});

		}
	}

	try {
		module.exports = ST_st_storeout_VM_Extend;
	} catch (error) {

	}
	return ST_st_storeout_VM_Extend;
});



// WEBPACK FOOTER //
// ./src/client/business/ST/ST_st_storeout_VM.Extend.js
```

