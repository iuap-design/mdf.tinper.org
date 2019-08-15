<a name="XGrrv"></a>
# 作用

<a name="WtwsT"></a>
# 源码

```javascript
cb.define(function() {
    var common_VM_Extend = function() {
        var processRegionDisplay = function(rCodeModel, regionDisplayModel) {
            if (!rCodeModel || !regionDisplayModel.getState('dataSourceReady')) return;
            var rCode = rCodeModel.getValue();
            var value = [];
            var value2 = [];
            while (rCode != undefined && rCode != "") {
                value.push(rCode);
                var nodes = regionDisplayModel.getNodesByKeys(rCode);
                if (nodes != undefined && nodes.length > 0) {
                    rCode = nodes[0].parent;
                } else {
                    rCode = "";
                }
            }
            if (value.length > 0) {
                for (var i = 1; i <= value.length; i++) {
                    value2.push(value[value.length - i]);
                }
            }
            regionDisplayModel.setValue(value2);
        }
        var getRegionCodeModel = function(viewModel) {
            var model = viewModel.get('regionCode');
            if (model instanceof cb.models.FilterModel)
                model = model.getFromModel();
            return model;
        }
        var initRegionAndPosition = function(viewmodel) {
            var changeOnSelect = viewmodel.get('regionCode') ? false : true;
            var regionDisplayModel = new cb.models.TreeModel({
                keyField: 'id',
                titleField: 'name',
                dataSourceMode: 'remote',
                needCollect: false,
                changeOnSelect: changeOnSelect
            }); //, needConvert: true

            // 处理行政区划信息regionCode 地区代码 regionDisplay 地区代码展现
            viewmodel.addProperty('region', regionDisplayModel);
            regionDisplayModel.setDataSource({
                url: '/region/getAllregion',
                method: 'POST'
            });
            regionDisplayModel.on('afterSetDataSource', function(data) {
                regionDisplayModel.setState('dataSourceReady', true);
                processRegionDisplay(getRegionCodeModel(viewmodel), regionDisplayModel);
            });
            regionDisplayModel.on('afterValueChange', function(result) {
                var rCodeModel = getRegionCodeModel(viewmodel);
                var provinceModel = viewmodel.get('province');
                var cityModel = viewmodel.get('city');
                var areaModel = viewmodel.get('area');
                if (result && result.value.length) {
                    var mergername = result.value[result.value.length - 1].mergername;
                    var rCode = '';
                    rCode = result.value[result.value.length - 1].id; //根据result.value和regionDisplayModel的数值，计算rCode的数值
                    rCodeModel.setValue(rCode);
                    if (provinceModel && result.value[1])
                        provinceModel.setValue(result.value[1].name);
                    if (cityModel && result.value[2])
                        cityModel.setValue(result.value[2].name);
                    if (areaModel && result.value[3])
                        areaModel.setValue(result.value[3].name);
                } else {
                    rCodeModel.setValue(null);
                    if (provinceModel)
                        provinceModel.setValue(null);
                    if (cityModel)
                        cityModel.setValue(null);
                    if (areaModel)
                        areaModel.setValue(null);
                }
            });

            // 处理定位信息 position 定位   address 详细地址    latitude 纬度    longitude 经度
            var positionModel = new cb.models.SimpleModel({
                needCollect: false,
                bIsNull: true
            }); //显示控件为Map
            viewmodel.addProperty('position', positionModel);

            viewmodel.on('afterLoadData', function() {
                processRegionDisplay(getRegionCodeModel(viewmodel), regionDisplayModel);
                if (viewmodel.get('latitude')) {
                  var latitude = viewmodel.get('latitude').getValue();
                  var longitude = viewmodel.get('longitude').getValue();
                  var address = viewmodel.get('address').getValue();
                  positionModel.setValue({
                      latitude: latitude,
                      longitude: longitude,
                      address: address
                  });
                }
                var deliveryMethod = viewmodel.get('deliveryMethod') && viewmodel.get('deliveryMethod').getValue();
                deliveryMethod && positionModel.setState('deliveryMethod', deliveryMethod);
                var polygonPath = viewmodel.get('polygonPath') && viewmodel.get('polygonPath').getValue();
                polygonPath && positionModel.setState('polygonPath', JSON.parse(polygonPath));
                var circleRadius = viewmodel.get('circleRadius') && viewmodel.get('circleRadius').getValue();
                circleRadius && positionModel.setState('circleRadius', circleRadius);
            });
            if (viewmodel.get("deliveryMethod")) {
                viewmodel.get('deliveryMethod').on('afterValueChange', function(data) {
                    processRegionDisplay(getRegionCodeModel(viewmodel), regionDisplayModel);
                    var latitude = viewmodel.get('latitude').getValue();
                    var longitude = viewmodel.get('longitude').getValue();
                    var address = viewmodel.get('address').getValue();
                    positionModel.setValue({
                        latitude: latitude,
                        longitude: longitude,
                        address: address
                    });
                    var deliveryMethod = viewmodel.get('deliveryMethod') && viewmodel.get('deliveryMethod').getValue();
                    deliveryMethod && positionModel.setState('deliveryMethod', deliveryMethod);
                    if(deliveryMethod == 'polygon'){
                        var polygonPath = viewmodel.get('polygonPath') && viewmodel.get('polygonPath').getValue();
                        polygonPath && positionModel.setState('polygonPath', JSON.parse(polygonPath));
                    }
                    if(deliveryMethod == 'circle'){
                        var circleRadius = viewmodel.get('circleRadius') && viewmodel.get('circleRadius').getValue();
                        circleRadius && positionModel.setState('circleRadius', circleRadius);
                    }
                    // var polygonPath = viewmodel.get('polygonPath') && viewmodel.get('polygonPath').getValue();
                    // polygonPath && positionModel.setState('polygonPath', JSON.parse(polygonPath));
                    // var circleRadius = viewmodel.get('circleRadius') && viewmodel.get('circleRadius').getValue();
                    // circleRadius && positionModel.setState('circleRadius', circleRadius);
                });
            }
            if (viewmodel.get("circleRadius")) {
                viewmodel.get('circleRadius').on('afterValueChange', function(data) {
                    processRegionDisplay(getRegionCodeModel(viewmodel), regionDisplayModel);
                    var latitude = viewmodel.get('latitude').getValue();
                    var longitude = viewmodel.get('longitude').getValue();
                    var address = viewmodel.get('address').getValue();
                    positionModel.setValue({
                        latitude: latitude,
                        longitude: longitude,
                        address: address
                    });
                    var deliveryMethod = viewmodel.get('deliveryMethod') && viewmodel.get('deliveryMethod').getValue();
                    deliveryMethod && positionModel.setState('deliveryMethod', deliveryMethod);
                    var polygonPath = viewmodel.get('polygonPath') && viewmodel.get('polygonPath').getValue();
                    polygonPath && positionModel.setState('polygonPath', JSON.parse(polygonPath));
                    var circleRadius = viewmodel.get('circleRadius') && viewmodel.get('circleRadius').getValue();
                    circleRadius && positionModel.setState('circleRadius', circleRadius);
                });
            }
            positionModel.on('afterValueChange', function(args) {
                viewmodel.get('latitude').setValue(args.value.latitude);
                viewmodel.get('longitude').setValue(args.value.longitude);
                viewmodel.get('address').setValue(args.value.address);
                positionModel.setState('polygonPath', null);
            });
            positionModel.on('polygonPath', function(args) {
                viewmodel.get('polygonPath') && viewmodel.get('polygonPath').setValue(JSON.stringify(args));
            });
            positionModel.on('circleRadius', function(args) {
                viewmodel.get('circleRadius') && viewmodel.get('circleRadius').setValue(args);
            });
        }

        //自动拣货
        var onAutoPick = function(viewmodel) {
            //如果没有选择出库仓库提示先选仓库
            var billnum = viewmodel.getParams().billNo;
            if (billnum == 'st_purinrecord') {
                if (viewmodel.get("vouchtype").getValue() === '0') {
                    cb.utils.alert("采购类型的采购入库单无需自动拣货！");
                    return false;
                }
            }

            var warehouseName = 'outWarehouse';
            if (billnum == 'st_othoutrecord' || billnum == 'st_purinrecord' || billnum == 'st_storecheckreality' ||
                billnum == 'st_storecheck') {
                warehouseName = 'warehouse';
            } else if (billnum == 'st_returnapply') {
                warehouseName = 'outwarehouse';
            }
            var warehouse = viewmodel.get(warehouseName).getValue();
            if (warehouse == undefined || warehouse == null || warehouse == '') {
                cb.utils.alert("请先选择出库仓库！");
                return false;
            }
            //判断当前表体行是否有批次为空的行
            var detailsName = 'details';
            if (billnum == 'st_othoutrecord') {
                detailsName = 'othOutRecords';
            } else if (billnum == 'st_purinrecord') {
                detailsName = 'purInRecords';
            } else if (billnum == 'st_returnapply') {
                detailsName = 'returnApplys';
            }
            var gridModel = viewmodel.get(detailsName);
            var details = gridModel.getRows();
            var existsBlankBatchDetail = false;
            details.forEach(function(item, index) {
                    var isBatchManage = item.isBatchManage;
                    if (isBatchManage) {
                        var batchno = item.batchno;
                        if (batchno == null || batchno === '' || batchno == 'undefined') {
                            existsBlankBatchDetail = true;
                        }
                    }
                })
                //如果没有，报错说无需自动拣货
            if (!existsBlankBatchDetail) {
                cb.utils.alert("没有需要自动拣货的商品行！");
                return false;
            }
            //如果有，那么吧所有数据都传到后台去进行自动拣货
            var proxy = cb.rest.DynamicProxy.create({
                ensure: {
                    url: '/billingretail/autoPick',
                    method: 'POST'
                }
            });
            //			var data = viewmodel.collectData(true);
            gridModel.setDirty(true);
            var data = viewmodel.collectData();
            var params = {
                billnum: billnum,
                data: JSON.stringify(data)
            }
            proxy.ensure(params, function(err, result) {
                if (err) {
                    cb.utils.alert(err.message, 'error');
                    return;
                }
                if (result === undefined) {
                    cb.utils.alert("自动拣货失败！", 'error');
                    return;
                }

                viewmodel.setData(result.data);
                if (result.needNegativeOut && result.needNegativeOut.length > 0) {
                    var needNegativeOut = result.needNegativeOut;
                    for (var i = 0; i < needNegativeOut.length; i++) {
                        gridModel.setRowState(needNegativeOut[i], 'className', 'highlight-red');
                    }
                    var str = ''
                    var str2 = ''
                    if (result.unAutoPicked && result.unAutoPicked.length > 0) {
                        str = "" + result.unAutoPicked
                        str2 = '第' + str.substring(0, str.length) + '行中的商品没有可用的批号，请调整！'
                    }
                    var str3 = str2 + '以下商品存量不足，请调整！'
                    cb.utils.alert(str3, 'warning');
                } else if (result.returnMes) {
                    var str = ''
                    var str2 = ''
                    if (result.unAutoPicked && result.unAutoPicked.length > 0) {
                        str = "" + result.unAutoPicked
                        str2 = '第' + str.substring(0, str.length) + '行中的商品没有可用的批号，请调整！'
                    }
                    var str3 = str2 + result.returnMes

                    cb.utils.alert(str3, 'warning');
                } else if (result.unAutoPicked && result.unAutoPicked.length > 0) {
                    var str = "" + result.unAutoPicked
                    var str2 = '第' + str.substring(0, str.length) + '行中的商品没有可用的批号，请调整！'

                    cb.utils.alert(str2, 'warning');
                } else {
                    cb.utils.alert('操作成功', 'success');
                }
            });
        };

        var fieldVisble = function(data, gridModel) {
            if (data == 1) { //调拨类型的入库通知单，单价金额字段不可见
                gridModel.setColumnState('natUnitPrice', 'bShowIt', false);
                gridModel.setColumnState('natMoney', 'bShowIt', false);
                gridModel.setColumnState('natTaxUnitPrice', 'bShowIt', false);
                gridModel.setColumnState('natSum', 'bShowIt', false);
                gridModel.setColumnState('oriTax', 'bShowIt', false);
                gridModel.setColumnState('taxRate', 'bShowIt', false);
            } else if (cb.rest.AppContext.user.userType == 2 || cb.rest.AppContext.user.userType == 3) {
                gridModel.setColumnState('natUnitPrice', 'bShowIt', true);
                gridModel.setColumnState('natMoney', 'bShowIt', true);
                gridModel.setColumnState('natTaxUnitPrice', 'bShowIt', true);
                gridModel.setColumnState('natSum', 'bShowIt', true);
                gridModel.setColumnState('oriTax', 'bShowIt', true);
                gridModel.setColumnState('taxRate', 'bShowIt', true);
            }
        };

        var bacthnoAndExpiryDateManage = function(args, detailsModel) {
            var currentRow = detailsModel.getRow(args.value.rowIndex);
            //如果商品未启用批次管理，那么批次号不可编辑
            if (args.value.columnKey == 'batchno' || args.value.columnKey == 'define1' || args.value.columnKey == 'define2' || args.value.columnKey == 'define3' ||
                args.value.columnKey == 'define4' || args.value.columnKey == 'define5' || args.value.columnKey == 'define6' || args.value.columnKey == 'define7' ||
                args.value.columnKey == 'define8' || args.value.columnKey == 'define9' || args.value.columnKey == 'define10' || args.value.columnKey == 'define11' ||
                args.value.columnKey == 'define12' || args.value.columnKey == 'define13' || args.value.columnKey == 'define14' || args.value.columnKey == 'define15' ||
                args.value.columnKey == 'define16' || args.value.columnKey == 'define17' || args.value.columnKey == 'define18' || args.value.columnKey == 'define19' ||
                args.value.columnKey == 'define20' || args.value.columnKey == 'define21' || args.value.columnKey == 'define22' || args.value.columnKey == 'define23' ||
                args.value.columnKey == 'define24' || args.value.columnKey == 'define25' || args.value.columnKey == 'define26' || args.value.columnKey == 'define27' ||
                args.value.columnKey == 'define28' || args.value.columnKey == 'define29' || args.value.columnKey == 'define30') {
                //if (currentRow.isBatchManage == true || currentRow.isBatchManage == 'true') {
              if (cb.utils.getBooleanValue(currentRow.isBatchManage)) {
                    //        detailsModel.setCellState(args.value.rowIndex, 'batchno', 'bIsNull', false);
                    return true;
                } else {
                    return false;
                }
            }
            //如果商品未启用批次管理和效期管理，那么生效日期和失效日期不可编辑
            if (args.value.columnKey == 'producedate' || args.value.columnKey == 'invaliddate') {
                if (cb.utils.getBooleanValue(currentRow.isBatchManage)  && cb.utils.getBooleanValue(currentRow.isExpiryDateManage)) {
                    //        detailsModel.setCellState(args.value.rowIndex, 'producedate', 'bIsNull', false);
                    //        detailsModel.setCellState(args.value.rowIndex, 'invaliddate', 'bIsNull', false);
                    return true;
                } else {
                    return false;
                }
            }
        };

        var initBarcodeModel = function(viewmodel) {
            viewmodel.addProperty("barcode", new cb.models.SimpleModel({
                "cFieldName": "barcode",
                "cItemName": "barcode",
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": false,
                "bHidden": true,
                "bSplit": false,
                "bExtend": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "bNeedSum": false,
                "bShowIt": false,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": false,
                "cControlType": "Input"
            }));

        };

        var initSnCheckbox = function(viewmodel) {
            viewmodel.addProperty("sncheckbox", new cb.models.SimpleModel({
                "cFieldName": "sncheckbox",
                "cItemName": "sncheckbox",
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": false,
                "bHidden": true,
                "bSplit": false,
                "bExtend": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "bNeedSum": false,
                "bShowIt": false,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": false,
                "cControlType": "Checkbox"
            }));
        };

        var setBarcodeVisble = function(viewmodel) {
            if (viewmodel.get('barcode')) {
                var mode = viewmodel.getParams().mode;
                if (mode == 'add' || mode == 'edit') {
                    viewmodel.get('barcode').setVisible(true);
                } else {
                    viewmodel.get('barcode').setVisible(false);
                }
            }
            setSnCheckBoxVisible(viewmodel);
        };

        var setSnCheckBoxVisible = function(viewmodel) {
            if (viewmodel.get('sncheckbox')) {
                var mode = viewmodel.getParams().mode;
				debugger;
                if (mode == 'add' || mode == 'edit') {
                    viewmodel.get('sncheckbox').setVisible(true);
                } else {
                    viewmodel.get('sncheckbox').setVisible(false);
                }
            }
        };

        //序列号校验
        var checkSn = function(val, detailsModel, snModelName) {
            if (!snModelName) return true; //单据上不存在序列号孙表栏目
            let rows = detailsModel.getRows();
            for (let i = 0; i < rows.length; i++) {
                let sns = rows[i][snModelName];
                if (sns) {
                    let snRows = sns.filter(row => row._status != 'Delete');
                    for (let j = 0; j < snRows.length; j++) {
                        if (snRows[j].sn && val == snRows[j].sn) {
                            cb.utils.alert('序列号重复!', 'error');
                            return false;
                        }
                    }
                }
            }

            // let rows = snModel.getRows();
            // for (let i = 0; i < rows.length; i++) {
            // 	if (val == rows[i].sn) {
            // 		cb.utils.alert('序列号重复!');
            // 		return false;
            // 	}
            // }
            return true;
        };

        var appendSnRow = function(val, detailsModel, snModel, pData) {
            if (!val || !snModel) return;
            var rowObj = {};
            rowObj.sn = val;
            for (let i = 1; i <= 30; i++) {
                if (!pData) break;
                rowObj['define' + i] = pData['snCustomItems_define' + i];
            }

            snModel.appendRow(rowObj);
        };

        var checkBeforeAddSn = function(detailsModel) {
            var selectRowIndex = detailsModel.getSelectedRowIndexes()[0]; //获取商品选中行
            if (selectRowIndex == undefined) {
                cb.utils.alert('没有选中商品行，不能新增序列号,请检查!', 'warning');
                return false;
            }
            var selectedRow = detailsModel.getRow(selectRowIndex);
            if (selectedRow && !selectedRow.isSerialNoManage) {
                cb.utils.alert('当前选中行不是序列号管理的商品,请检查!', 'warning');
                return false;
            }
            return true;
        };


        //扫码
        var onBarCodeEnter = function(data, viewmodel, fields, detailModelName, snModelName, snWarehouse, iSerialManage, AfterBarcodeEnterCallback, isMaterial) {


            // debugger;
            //cb.utils.alert('barcode enter');
            var isSnChecked = false;
            var vouchtype = '';
            var billno = viewmodel.originalViewMeta.cBillNo;
            if (billno === 'st_purinrecord') {
                vouchtype = viewmodel.get("vouchtype").getValue(); //'0'采购 '1'退货
            }
            if (viewmodel.get('sncheckbox')) {
                isSnChecked = cb.utils.getBooleanValue(viewmodel.get('sncheckbox').getValue());
            }
            if (isSnChecked && !cb.utils.getBooleanValue(snWarehouse)) {

                let bNeedWarhouse = false;
                if (billno === 'st_purinrecord') {
                    if (vouchtype === '1') bNeedWarhouse = true;
                } else if (billno == 'st_othoutrecord' || billno == 'st_storeout' || billno == 'st_storein' || billno == 'st_storecheckreality') {
                    bNeedWarhouse = true;
                }

                if (bNeedWarhouse) {
                    cb.utils.alert('请先录入仓库', 'warning');
                    viewmodel.get("barcode").setValue(null);
                    return;
                }
            }
            var curMainId = viewmodel.get("id").getValue();
            var curInputValue = data ? data : viewmodel.get("barcode").getValue();
            curInputValue = curInputValue.trim();
            if (!viewmodel.getGridModels()) {
                return;
            }
            var getGridModelByName = function(name) {
                for (let i = 0; i < viewmodel.getGridModels().length; i++) {
                    console.log(viewmodel.getGridModels()[i].getName());
                    if (name === viewmodel.getGridModels()[i].getName()) {
                        return viewmodel.getGridModels()[i];
                    }
                }
                console.log('未找到对应的GridModel,请检查名称是否正确!');
            };

            var getDetailModel = function(detailName) {
                if (viewmodel.getGridModels().length == 1) { //只有一个Grid
                    return viewmodel.getGridModel();
                }

                if (!detailName) {
                    let billNo = viewmodel.originalViewMeta.cBillNo;
                    // let detailName = 'details';
                    // if (viewmodel.get('barcode').getParent() === viewmodel.getGridModels()[i].getParent()) {
                    if (billNo == 'st_othinrecord') {
                        detailName = 'othInRecords';
                    } else if (billNo == 'st_othoutrecord') {
                        detailName = 'othOutRecords';
                    } else { // if(billNo == 'st_storeout' || billNo == 'st_storecheckplan' || billNo == 'st_storetransfer') {
                        detailName = 'details';
                    }
                }

                let detailsModel = getGridModelByName(detailName);
                if (!detailsModel) {
                    console.log('未找到对应的GridModel,请检查名称是否正确!');
                } else {
                    return detailsModel;
                }
                // if(!detailsModel)detailsModel = viewmodel.getGridModels()[0];
            };

            //设置序列号信息
            var setSnData = function(pData, detailsModel, snModel) {
                if (cb.utils.getBooleanValue(pData.isSerialNoManage)) {
                    let sn = pData.sn;
                    appendSnRow(sn, detailsModel, snModel, pData);
                }
                // return true;
            }

            // var detailsModel = null;
            var qtyField = 'quantity';
            if (fields) qtyField = fields.quantity;
            // var detailsModel;
            var detailsModel = getDetailModel(detailModelName);
            var snModel = getGridModelByName(snModelName);
            if (isSnChecked) { //扫描序列号

                // if (!iSerialManage || viewmodel.originalViewMeta.cBillNo == 'st_storecheckreality') {//不严格管理的情况
                if (!cb.utils.getBooleanValue(iSerialManage)) { //不严格管理的情况
                    viewmodel.get("barcode").setValue(null);
                    if (!checkBeforeAddSn(detailsModel)) {
                        return false;
                    }
                    if (checkSn(curInputValue, detailsModel, snModelName)) {
                        appendSnRow(curInputValue, detailsModel, snModel);
                        // if(snModel.getRowsCount() >= getUpdateQty(curRowIndex, qtyField, barcodeQty)){//大于表体数量时,要同时增加数量
                        updateRowQty(detailsModel, curRowIndex, qtyField, 1);
                        // }
                    }
                    return;
                }
            }


            var newRow = function(mainid, data, quantity, fields) {
                // let pData = data.data.recordList[0];
                let pData = data.data[0];
				pData['newRow']=true;
                let isBatchManage = cb.utils.getBooleanValue(pData.isBatchManage);
                let isExpiryDateManage = cb.utils.getBooleanValue(pData.isExpiryDateManage);
                let isSerialNoManage = cb.utils.getBooleanValue(pData.isSerialNoManage);
                let accountWeight = null;
                let batchno = null;
                let producedate = null;
                let invaliddate = null;
                let weight = null;

                if (!isBatchManage) {
                    accountWeight = pData.productskus ? pData.productskus[0].sku_define1 : null;
                    weight = accountWeight;
                } else {
                    batchno = pData.productskus ? pData.productskus[0].batchno : pData.batchno;

                    if (null != batchno && batchno != undefined) {
                        producedate = pData.productskus ? pData.productskus[0].producedate : pData.producedate;
                        invaliddate = pData.productskus ? pData.productskus[0].invaliddate : pData.invaliddate;
                        let define1 = pData.productskus ? pData.productskus[0].batchno_define1 : null;

                        accountWeight = define1;
                        weight = define1;
                    }
                }
                if (!fields) {
                    fields = { //默认字段名称
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
                        weight: 'weight',
                        quantity: 'quantity',
                        unit: 'unit',
                        unitname: 'product_unitName', //'unitName',
                        // "accountWeight": 'accountWeight',
                        // "accountPrice": pData.productskus[0].skuSalePrice,
                        skuSalePrice: 'markPrice',
                        isbatch: 'isBatchManage',
                        isexpirydatemanage: 'isExpiryDateManage',
                        product_define_prefix: 'prodefine', //商品自定义项前缀
                        sku_define_prefix: 'skudefine', //sku自定义项前缀
                        batch_define_prefix: 'define',
                        isSerialNoManage: 'isSerialNoManage',
                        goodsposition:'goodsposition',
                        goodsposition_cName:'goodsposition_cName'
                    };
                }

                //规格
                if (!fields.product_modelDescription) fields.product_modelDescription = 'product_modelDescription';
                //规格型号
                if (!fields.product_modelDescription) fields.product_modelDescription = 'product_modelDescription';
                if (!fields.isSerialNoManage) fields.isSerialNoManage = 'isSerialNoManage';

                if (fields.product_define_prefix == undefined) fields.product_define_prefix = 'prodefine';
                if (fields.sku_define_prefix == undefined) fields.sku_define_prefix = 'skudefine';
                if (fields.batch_define_prefix == undefined) fields.batch_define_prefix = 'define';
                if (fields.propertiesValue == undefined) fields.propertiesValue = 'propertiesValue';


                var rowObj = {};

                var setRowCellValue = function(row, fieldName, value) {
                    if (fieldName) {
                        row[fieldName] = value;
                    } else {
                        console.log('field' + fieldName + 'is not exist!')
                    }
                }
                setRowCellValue(rowObj, fields.mainid, mainid);
                setRowCellValue(rowObj, fields.product, pData.productskus ? pData.productskus[0].product : pData.id);
                setRowCellValue(rowObj, fields.productcode, pData.cCode);
                setRowCellValue(rowObj, fields.productname, pData.cName);
                setRowCellValue(rowObj, fields.productsku, pData.productskus ? pData.productskus[0].skuId : null);
                setRowCellValue(rowObj, fields.barcode, pData.productskus ? pData.productskus[0].barCode : pData.barCode);
                setRowCellValue(rowObj, fields.batchno, batchno);
                setRowCellValue(rowObj, fields.producedate, producedate);
                setRowCellValue(rowObj, fields.invaliddate, invaliddate);
                setRowCellValue(rowObj, fields.productskucode, pData.productskus ? pData.productskus[0].skuCode : null);
                setRowCellValue(rowObj, fields.productskuname, pData.productskus ? pData.productskus[0].skuName : null);
                setRowCellValue(rowObj, fields.weight, weight);
                setRowCellValue(rowObj, fields.quantity, quantity);
                setRowCellValue(rowObj, fields.unit, pData.oUnitId);
                setRowCellValue(rowObj, fields.unitname, pData.unitName);
                setRowCellValue(rowObj, fields.storeOrderUnitKey, pData.storeOrderUnitKey); //要货单位
                setRowCellValue(rowObj, fields.storeOrderUnit, pData.storeOrderUnit); //要货单位
                setRowCellValue(rowObj, fields.orderConversionRate, pData.orderConversionRate); //要货单位换算率
                setRowCellValue(rowObj, fields.inputTax, pData.inputTax); //进项税率
                setRowCellValue(rowObj, fields.primeCosts, pData.primeCosts); //进货价格
                setRowCellValue(rowObj, fields.productskus_primeCosts, pData.productskus ? pData.productskus[0].primeCosts : pData.primeCosts); //sku进货价格
                setRowCellValue(rowObj, fields.skuSalePrice, pData.productskus ? pData.productskus[0].skuSalePrice : pData.skuSalePrice);
                // 个性化的数据
                if (billno == 'st_storecheck' || billno == 'st_storecheckplan') { //盘点单
                    setRowCellValue(rowObj, fields.accountWeight, accountWeight);
                    setRowCellValue(rowObj, fields.accountPrice, pData.productskus ? pData.productskus[0].skuSalePrice : null);
                }
                if (billno == 'st_demandapply') {
//                    setRowCellValue(rowObj, fields.storeOrderUnitKey1, pData.storeOrderUnitKey); //要货单位
//                    setRowCellValue(rowObj, fields.oUnitId, pData.oUnitId); //销售单位
                        if(pData.barcodeUnit){//扫码单位不为空，则取扫码单位
                            setRowCellValue(rowObj, fields.unit, pData.barcodeUnit);
                            setRowCellValue(rowObj, fields.unitname, pData.barcodeUnitName);
                        }else if(pData.storeOrderUnitKey){//如果要货单位不为空，则取要货单位
                            setRowCellValue(rowObj, fields.unit, pData.storeOrderUnitKey);
                            setRowCellValue(rowObj, fields.unitname, pData.storeOrderUnit);
                        }else{
                            // 取主计量单位
                            setRowCellValue(rowObj, fields.unit, pData.oUnitId);
                            setRowCellValue(rowObj, fields.unitname, pData.unitName);
                        }

						setRowCellValue(rowObj, fields.maxInventoryCount, pData.maxInventoryCount); //最大库存
						setRowCellValue(rowObj, fields.minInventoryCount, pData.minInventoryCount); //最���库存
						setRowCellValue(rowObj, fields.safeInventoryCount, pData.safeInventoryCount); //安全库存
						setRowCellValue(rowObj, fields.reorderPoint, pData.reorderPoint); //再订货点

						//增加几个erpCode
						setRowCellValue(rowObj, fields.productsku_erpCode, pData.productskus ? pData.productskus[0].productskus_erpCode : null);
						setRowCellValue(rowObj, fields.product_erpCode, pData.product_erpCode);
						setRowCellValue(rowObj, fields.demandUnitErpCode, pData.demandUnitErpCode);
						//end

                        //要货单位换算率
                        setRowCellValue(rowObj, fields.orderConversionRate, pData.orderConversionRate);
                        //要货单位主键
                        setRowCellValue(rowObj, fields.storeOrderUnitKey, pData.storeOrderUnitKey);
                        //主计量单位主键
                        setRowCellValue(rowObj, fields.oUnitId, pData.oUnitId);
                }
                setRowCellValue(rowObj, fields.isbatch, isBatchManage);
                setRowCellValue(rowObj, fields.isexpirydatemanage, isExpiryDateManage);
                setRowCellValue(rowObj, fields.product_modelDescription, pData.modelDescription);
                setRowCellValue(rowObj, fields.isSerialNoManage, isSerialNoManage);
                setRowCellValue(rowObj, fields.propertiesValue, pData.productskus[0].propertiesValue);
                setRowCellValue(rowObj, fields.goodsposition, pData.goodsposition);
                setRowCellValue(rowObj, fields.goodsposition_cName, pData.goodsposition_cName);

                if (pData.productskus) {
                    let dataProductsku = pData.productskus[0];
                    // ====== 自由项 ======
                    for (let i = 1; i <= 10; i++) {
                        let free = 'free' + i.toString();
                        rowObj[free] = dataProductsku[free] ? dataProductsku[free] : null;
                    }
                    // ====== 批次属性 ======
                    for (let i = 1; i <= 30; i++) {
                        let define = fields.batch_define_prefix + i.toString();
                        rowObj[define] = dataProductsku['batchno_' + define] ? dataProductsku['batchno_' + define] : null;
                    }
                    // ====== 商品自定义项 ======
                    for (let i = 1; i <= 30; i++) {
                        let prodefine = fields.product_define_prefix + i.toString();
                        // rowObj[prodefine] = pData['define' + i.toString()] ? dataProductsku['define' + i.toString()] : null;
                        rowObj[prodefine] = pData['define' + i.toString()] ? pData['define' + i.toString()] : null;
                    }
                    // ====== SKU自定义项 ======
                    for (let i = 1; i <= 60; i++) {
                        let skudefine = fields.sku_define_prefix + i.toString();
                        rowObj[skudefine] = dataProductsku['sku_define' + i.toString()] ? dataProductsku['sku_define' + i.toString()] : null;
                    }
                }

                return rowObj;
            }; //newRow end

            //查找商品行
            var findRowByProduct = function(detailsModel, product, pData) {
                var rowIndex = -1;
                var rows = detailsModel.getRows();
                var rowLength = rows.length;

                for (var i = 0; i < rowLength; i++) {
                    if (rows[i]._status == 'Delete') {
                        continue;
                    }

                    if (viewmodel.originalViewMeta.cBillNo == 'st_demandapply') {
                        if (detailsModel.getCellValue(i, fields.storeOrderUnitKey) != pData.storeOrderUnitKey) {
                            continue;
                        }
                    }

                    if (product == detailsModel.getCellValue(i, fields.product)) {
                        //仓库启用货位 货位有值且相同 或者货位无值时 认为是同一行
                        if (viewmodel.get('warehouse_isGoodsPosition') && viewmodel.get('warehouse_isGoodsPosition').getValue()) {
                            if((detailsModel.getCellValue(i, fields.goodsposition) && detailsModel.getCellValue(i, fields.goodsposition) == pData.goodsposition) || !detailsModel.getCellValue(i, fields.goodsposition)){
                                rowIndex = i;
                                break;
                            }
                        }else{
                            rowIndex = i;
                            break;
                        }
                    }
                }
                return rowIndex;
            };

            //查找sku行
            var findRow = function(detailsModel, productsku, isBatchManage, batchNo, pData) { //} = '_invalid_value_') {
                var rowIndex = -1;
                var rows = detailsModel.getRows();
                var rowLength = rows.length;

                for (var i = 0; i < rowLength; i++) {
                    if (rows[i]._status == 'Delete') {
                        continue;
                    }

                    if (viewmodel.originalViewMeta.cBillNo == 'st_purinrecord') {
                        if (pData.barcodeUnit) {
                            if (detailsModel.getCellValue(i, 'unit') != pData.barcodeUnit)
                                continue;
                        } else {
                            if (detailsModel.getCellValue(i, 'unit') != pData.purchaseUnit)
                                continue;
                        }
                    } else {
                        if (detailsModel.getCellValue(i, fields.unit) != pData.oUnitId) { //单位不相同认为不是同一行
                            continue;
                        }
                    }

                    if (productsku == detailsModel.getCellValue(i, fields.productsku)) {
                        if (isBatchManage) {
                            if (batchNo == detailsModel.getCellValue(i, fields.batchno)) {
                        //仓库启用货位 货位有值且相同 或者货位无值时 认为是同一行
                                if (viewmodel.get('warehouse_isGoodsPosition') && viewmodel.get('warehouse_isGoodsPosition').getValue()) {
                                    if((detailsModel.getCellValue(i, fields.goodsposition) && detailsModel.getCellValue(i, fields.goodsposition) == pData.goodsposition) || !detailsModel.getCellValue(i, fields.goodsposition)){
                                        rowIndex = i;
                                        break;
                                    }
                                }else{
                                    rowIndex = i;
                                    break;
                                }
                            }
                        } else {
                            if (detailsModel.getCellValue(i, fields.batchno) == undefined) {
                        //仓库启用货位 货位有值且相同 或者货位无值时 认为是同一行
                                if (viewmodel.get('warehouse_isGoodsPosition') && viewmodel.get('warehouse_isGoodsPosition').getValue()) {
                                    if((detailsModel.getCellValue(i, fields.goodsposition) && detailsModel.getCellValue(i, fields.goodsposition) == pData.goodsposition) || !detailsModel.getCellValue(i, fields.goodsposition)){
                                        rowIndex = i;
                                        break;
                                    }
                                }else{
                                    rowIndex = i;
                                    break;
                                }
                            }
                        }
                    }
                }

                return rowIndex;
            };

            //更新行上数量
            var updateRowQty = function(detailsModel, curRowIndex, qtyField, barcodeQty) {
                let newQuantity = getUpdateQty(curRowIndex, qtyField, barcodeQty);
                detailsModel.setCellValue(curRowIndex, qtyField, newQuantity, false, false);
            };

            var checkBeforeUpdateRowQty = function(result, qty) {
                // console.log('--checkBeforeUpdateRowQty--');
                // console.log(result);
                if (cb.utils.getBooleanValue(result.isJewelry)) { //珠宝行业
                    let codeType = result.codeType; //扫码类型:sku sku_barcode batchno product product_barcode zjm
                    let specids = result.data[0].productskus[0].specIds; //商品规格
                    let bIsNegtive = false;
                    if (viewmodel.originalViewMeta.cBillNo == 'st_purinrecord') {
                        if (viewmodel.get("vouchtype").getValue() == "1") {
                            bIsNegtive = true; //数量为 负数
                        } else {
                            bIsNegtive = false;
                        }
                    }

                    if ((codeType == 'sku' || codeType == 'sku_barcode') && specids && specids != "") {
                        if ((qty > 1 && !bIsNegtive) || (qty < -1 && bIsNegtive)) {
                            cb.utils.alert('已存在相同sku商品行!', 'error');
                            return false;
                        }
                    }

                    if (codeType == 'batchno' && cb.utils.getBooleanValue(result.data[0].isBatchManage) && result.data[0].define2 == '是') { //批次号 且为 回收品
                        if ((qty > 1 && !bIsNegtive) || (qty < -1 && bIsNegtive)) {
                            cb.utils.alert('已存在该批次号的商品行!', 'error');
                            return false;
                        }
                    }

                    return true;
                }
                return true;
            };

            //新增行
            var appendNewRow = function(mainid, data, quantity = 1) {
                if (viewmodel.originalViewMeta.cBillNo == 'st_purinrecord') {
                    if (viewmodel.get("vouchtype").getValue() == "1") {
                        quantity = -1 * quantity;
                    }
                }
                detailsModel.appendRow(newRow(mainid, data, quantity, fields));
                //debugger;
                // if()效期管理 并且 生产日期 或 有效期至 有一个为空
                //
                if (cb.utils.getBooleanValue(data.data[0].isExpiryDateManage) && data.data[0].productskus[0]) {
                    if (data.data[0].productskus[0].producedate == undefined && data.data[0].productskus[0].invaliddate != undefined)
                        detailsModel.setCellValue(detailsModel.getRowsCount() - 1, 'invaliddate', data.data[0].productskus[0].invaliddate, true)
                    else if (data.data[0].productskus[0].producedate != undefined && data.data[0].productskus[0].invaliddate == undefined)
                        detailsModel.setCellValue(detailsModel.getRowsCount() - 1, 'producedate', data.data[0].productskus[0].producedate, true)
                }

            };

            var getUpdateQty = function(curRowIndex, qtyField, barcodeQty) {
                if (!barcodeQty) barcodeQty = 1;
                if (viewmodel.originalViewMeta.cBillNo == 'st_purinrecord') {
                    if (viewmodel.get("vouchtype").getValue() == "1") {
                        barcodeQty = -1 * barcodeQty;
                    }
                }
                let newQuantity = null;
                let tempQty = detailsModel.getCellValue(curRowIndex, qtyField);
                if (null == tempQty || tempQty === undefined) {
                    newQuantity = barcodeQty;
                } else {
                    // newQuantity = parseInt(tempQty) + barcodeQty;
                    newQuantity = parseFloat(tempQty) + barcodeQty;
                }
                return newQuantity;
            };

            var updateCurrentRow = function(curRowIndex, mainid, data) {
                var row = newRow(mainid, data, 1, fields);
                detailsModel.updateRow(curRowIndex, row);
            };

            // detailsModel = getDetailModel(detailName);


            var queryProductProxy = cb.rest.DynamicProxy.create({
                settle: {
                    //url: '/bill/ref/getProducts.do',
                    url: '/bill/ref/getBarcodeResult.do',
                    method: 'POST'
                }
            });
            var params = {
                isReturn: 0,
                keyword: curInputValue,
                billnum: billno,
                codeType: isSnChecked ? 'snOnly' : '',
                snWarehouse: snWarehouse,
                iSerialManage: iSerialManage,
                vouchType: vouchtype, //目前采购入库使用
            };

            if (curInputValue && detailsModel) {
                queryProductProxy.settle(params, (err, result) => {
                    if (err) {
                        cb.utils.alert(err.message, 'error');
                        return;
                    }
                    let billno = viewmodel.originalViewMeta.cBillNo;
                    if (result === undefined || JSON.stringify(result) == "{}") {
                        if (isSnChecked) { //严格管理并且选择<序列号>CheckBox

                            if (billno == 'st_othinrecord' || (billno == 'st_purinrecord' && vouchtype == '0')) { //入库类单据
                                if (!checkBeforeAddSn(detailsModel)) {
                                    return false;
                                }
                                if (checkSn(curInputValue, detailsModel, snModelName)) {
                                    appendSnRow(curInputValue, detailsModel, snModel);
                                    let selRowIndex = detailsModel.getSelectedRowIndexes()[0];
                                    let rowQty = detailsModel.getCellValue(selRowIndex, qtyField);
                                    if (!rowQty) rowQty = 0;
                                    if (snModel.getRows().length > rowQty) {
                                        updateRowQty(detailsModel, selRowIndex, qtyField, 1);
                                    }

                                }
                                return;
                            } else {
                                if (billno == 'st_storecheckreality')
                                    cb.utils.alert("序列号[" + curInputValue + "]不存在！", 'error')
                                else
                                    cb.utils.alert("序列号[" + curInputValue + "]不存在,或序列号为已出库状态！", 'error')
                            }
                        } else {
                            cb.utils.alert("没有条码为[" + curInputValue + "]的商品！", 'error');
                        }
                        return;
                    } else {
                        if (billno == 'st_othinrecord' || (billno == 'st_purinrecord' && vouchtype == '0')) { //入库类单据
                            if (result.codeType == 'sn' && result.data && result.data.length > 0) {
                                cb.utils.alert('序列号[' + curInputValue + ']为在库状态,请检查!', 'error');
                                return;
                            }
                        }
                        if (result.codeType == 'sn' && !snWarehouse) {
                            if (billno == 'st_othoutrecord' || billno == 'st_storeout' || billno == 'st_storein' || billno == 'st_storecheckreality') {
                                cb.utils.alert('请先录入仓库', 'warning');
                                return;
                            }
                        }
                    }

                    // let pData = result.data.recordList[0];
                    let pData = result.data[0];
                    var curRowIndex;
                    // if (viewmodel.originalViewMeta.cBillNo == 'st_demandapply' || pData.productskus == undefined) {
                    if (billno == 'st_storecheckreality') {
                      if (isMaterial == 0) {
                        if (pData.isMaterial == 1 || pData.isMaterial == '1' || pData.isMaterial == true || pData.isMaterial == 'true') {
                          cb.utils.alert('录入的[' + curInputValue + ']是材料类商品!', 'error');
                          return ;
                        }
                      } else {
                        if (pData.isMaterial == 0 || pData.isMaterial == '0' || pData.isMaterial == false || pData.isMaterial == 'false') {
                          cb.utils.alert('录入的[' + curInputValue + ']是非材料类商品!', 'error');
                          return;
                        }
                      }
                    }
                  
                    debugger
                    if(billno == 'st_purchaseorder')
                    {
                        if (!pData.isOfflineStoreSelfMining)
                        {
                            cb.utils.alert("采购订单不能增加非自采商品!", 'error');
                            return;
                        }
                    }

                    if (pData.productskus == undefined) {
                        curRowIndex = detailsModel.getSelectedRowIndexes()[0];
                        // debugger;
                        // let productid = pData.products["0"].id;
                        let productid = pData.id;
                        let isBatchManage = pData.isBatchManage;
                        let resultSku = pData.productskus["0"].skuId;
                        let batchno = isBatchManage ? pData.productskus[0].batchno : undefined; //"_invalid_value_";

                        var targetRow = findRowByProduct(detailsModel, productid, pData);
                        if (targetRow != -1) {
                            curRowIndex = targetRow;
                            updateRowQty(detailsModel, curRowIndex, qtyField, pData.quantity);
                        } else {
                            appendNewRow(curMainId, result, pData.quantity);
                            curRowIndex = detailsModel.getRows().length - 1;
                        }
                    } else {
                        let isBatchManage = cb.utils.getBooleanValue(pData.isBatchManage);
                        let resultSku = pData.productskus["0"].skuId;
                        let batchno = isBatchManage ? pData.productskus[0].batchno : undefined; //"_invalid_value_";

                        curRowIndex = detailsModel.getSelectedRowIndexes()[0];
                        var targetRow = findRow(detailsModel, resultSku, isBatchManage, batchno, pData);
                        // curRowIndex = updateOrAppendRow(detailsModel, targetRow, fields.quantity);
                        if (targetRow != -1) {
                            if (viewmodel.originalViewMeta.cBillNo == 'st_storecheckplan') {
                                cb.utils.alert('已经存在相同的商品行!', 'error');
                            } else {
                                curRowIndex = targetRow;

                                let newQuantity = getUpdateQty(curRowIndex, qtyField, pData.quantity);
                                if (checkBeforeUpdateRowQty(result, newQuantity)) {
                                    if (checkSn(pData.sn, detailsModel, snModelName)) {
                                        detailsModel.select(curRowIndex); //选中行
                                        var rowQty = detailsModel.getCellValue(curRowIndex, qtyField);
                                        if (rowQty === undefined || rowQty === null || rowQty === '' || rowQty === 0) {
                                            //detailsModel.setCellValue(curRowIndex, qtyField, newQuantity);
                                            rowQty = 1;
                                        }
                                        setSnData(pData, detailsModel, snModel);
                                        if (result.codeType == 'sn') {
                                            if (snModel.getRows().length > rowQty) {
                                                // if (snModel.getRows().length >= newQuantity) {
                                                updateRowQty(detailsModel, curRowIndex, qtyField, pData.quantity);
                                                // updateRowQty(detailsModel, curRowIndex, qtyField, newQuantity);
                                            }
                                            // setSnData(pData, detailsModel, snModel);
                                        } else {
                                            updateRowQty(detailsModel, curRowIndex, qtyField, pData.quantity);
                                        }

                                    }
                                }
                            }
                        } else {
                            if (checkSn(pData.sn, detailsModel, snModelName)) {
                                appendNewRow(curMainId, result, pData.quantity);
                                curRowIndex = detailsModel.getRows().length - 1;
                                detailsModel.select(curRowIndex); //选中行
                                setSnData(pData, detailsModel, snModel);
                            }
                        }
                    }

                    if (AfterBarcodeEnterCallback) AfterBarcodeEnterCallback(pData, curRowIndex);
                });
            }
            viewmodel.get("barcode").setValue(null);
        };

        var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
        var oMultiDiff = {
            "19969": "DZ",
            "19975": "WM",
            "19988": "QJ",
            "20048": "YL",
            "20056": "SC",
            "20060": "NM",
            "20094": "QG",
            "20127": "QJ",
            "20167": "QC",
            "20193": "YG",
            "20250": "KH",
            "20256": "ZC",
            "20282": "SC",
            "20285": "QJG",
            "20291": "TD",
            "20314": "YD",
            "20340": "NE",
            "20375": "TD",
            "20389": "YJ",
            "20391": "CZ",
            "20415": "PB",
            "20446": "YS",
            "20447": "SQ",
            "20504": "TC",
            "20608": "KG",
            "20854": "QJ",
            "20857": "ZC",
            "20911": "PF",
            "20504": "TC",
            "20608": "KG",
            "20854": "QJ",
            "20857": "ZC",
            "20911": "PF",
            "20985": "AW",
            "21032": "PB",
            "21048": "XQ",
            "21049": "SC",
            "21089": "YS",
            "21119": "JC",
            "21242": "SB",
            "21273": "SC",
            "21305": "YP",
            "21306": "QO",
            "21330": "ZC",
            "21333": "SDC",
            "21345": "QK",
            "21378": "CA",
            "21397": "SC",
            "21414": "XS",
            "21442": "SC",
            "21477": "JG",
            "21480": "TD",
            "21484": "ZS",
            "21494": "YX",
            "21505": "YX",
            "21512": "HG",
            "21523": "XH",
            "21537": "PB",
            "21542": "PF",
            "21549": "KH",
            "21571": "E",
            "21574": "DA",
            "21588": "TD",
            "21589": "O",
            "21618": "ZC",
            "21621": "KHA",
            "21632": "ZJ",
            "21654": "KG",
            "21679": "LKG",
            "21683": "KH",
            "21710": "A",
            "21719": "YH",
            "21734": "WOE",
            "21769": "A",
            "21780": "WN",
            "21804": "XH",
            "21834": "A",
            "21899": "ZD",
            "21903": "RN",
            "21908": "WO",
            "21939": "ZC",
            "21956": "SA",
            "21964": "YA",
            "21970": "TD",
            "22003": "A",
            "22031": "JG",
            "22040": "XS",
            "22060": "ZC",
            "22066": "ZC",
            "22079": "MH",
            "22129": "XJ",
            "22179": "XA",
            "22237": "NJ",
            "22244": "TD",
            "22280": "JQ",
            "22300": "YH",
            "22313": "XW",
            "22331": "YQ",
            "22343": "YJ",
            "22351": "PH",
            "22395": "DC",
            "22412": "TD",
            "22484": "PB",
            "22500": "PB",
            "22534": "ZD",
            "22549": "DH",
            "22561": "PB",
            "22612": "TD",
            "22771": "KQ",
            "22831": "HB",
            "22841": "JG",
            "22855": "QJ",
            "22865": "XQ",
            "23013": "ML",
            "23081": "WM",
            "23487": "SX",
            "23558": "QJ",
            "23561": "YW",
            "23586": "YW",
            "23614": "YW",
            "23615": "SN",
            "23631": "PB",
            "23646": "ZS",
            "23663": "ZT",
            "23673": "YG",
            "23762": "TD",
            "23769": "ZS",
            "23780": "QJ",
            "23884": "QK",
            "24055": "XH",
            "24113": "DC",
            "24162": "ZC",
            "24191": "GA",
            "24273": "QJ",
            "24324": "NL",
            "24377": "TD",
            "24378": "QJ",
            "24439": "PF",
            "24554": "ZS",
            "24683": "TD",
            "24694": "WE",
            "24733": "LK",
            "24925": "TN",
            "25094": "ZG",
            "25100": "XQ",
            "25103": "XH",
            "25153": "PB",
            "25170": "PB",
            "25179": "KG",
            "25203": "PB",
            "25240": "ZS",
            "25282": "FB",
            "25303": "NA",
            "25324": "KG",
            "25341": "ZY",
            "25373": "WZ",
            "25375": "XJ",
            "25384": "A",
            "25457": "A",
            "25528": "SD",
            "25530": "SC",
            "25552": "TD",
            "25774": "ZC",
            "25874": "ZC",
            "26044": "YW",
            "26080": "WM",
            "26292": "PB",
            "26333": "PB",
            "26355": "ZY",
            "26366": "CZ",
            "26397": "ZC",
            "26399": "QJ",
            "26415": "ZS",
            "26451": "SB",
            "26526": "ZC",
            "26552": "JG",
            "26561": "TD",
            "26588": "JG",
            "26597": "CZ",
            "26629": "ZS",
            "26638": "YL",
            "26646": "XQ",
            "26653": "KG",
            "26657": "XJ",
            "26727": "HG",
            "26894": "ZC",
            "26937": "ZS",
            "26946": "ZC",
            "26999": "KJ",
            "27099": "KJ",
            "27449": "YQ",
            "27481": "XS",
            "27542": "ZS",
            "27663": "ZS",
            "27748": "TS",
            "27784": "SC",
            "27788": "ZD",
            "27795": "TD",
            "27812": "O",
            "27850": "PB",
            "27852": "MB",
            "27895": "SL",
            "27898": "PL",
            "27973": "QJ",
            "27981": "KH",
            "27986": "HX",
            "27994": "XJ",
            "28044": "YC",
            "28065": "WG",
            "28177": "SM",
            "28267": "QJ",
            "28291": "KH",
            "28337": "ZQ",
            "28463": "TL",
            "28548": "DC",
            "28601": "TD",
            "28689": "PB",
            "28805": "JG",
            "28820": "QG",
            "28846": "PB",
            "28952": "TD",
            "28975": "ZC",
            "29100": "A",
            "29325": "QJ",
            "29575": "SL",
            "29602": "FB",
            "30010": "TD",
            "30044": "CX",
            "30058": "PF",
            "30091": "YSP",
            "30111": "YN",
            "30229": "XJ",
            "30427": "SC",
            "30465": "SX",
            "30631": "YQ",
            "30655": "QJ",
            "30684": "QJG",
            "30707": "SD",
            "30729": "XH",
            "30796": "LG",
            "30917": "PB",
            "31074": "NM",
            "31085": "JZ",
            "31109": "SC",
            "31181": "ZC",
            "31192": "MLB",
            "31293": "JQ",
            "31400": "YX",
            "31584": "YJ",
            "31896": "ZN",
            "31909": "ZY",
            "31995": "XJ",
            "32321": "PF",
            "32327": "ZY",
            "32418": "HG",
            "32420": "XQ",
            "32421": "HG",
            "32438": "LG",
            "32473": "GJ",
            "32488": "TD",
            "32521": "QJ",
            "32527": "PB",
            "32562": "ZSQ",
            "32564": "JZ",
            "32735": "ZD",
            "32793": "PB",
            "33071": "PF",
            "33098": "XL",
            "33100": "YA",
            "33152": "PB",
            "33261": "CX",
            "33324": "BP",
            "33333": "TD",
            "33406": "YA",
            "33426": "WM",
            "33432": "PB",
            "33445": "JG",
            "33486": "ZN",
            "33493": "TS",
            "33507": "QJ",
            "33540": "QJ",
            "33544": "ZC",
            "33564": "XQ",
            "33617": "YT",
            "33632": "QJ",
            "33636": "XH",
            "33637": "YX",
            "33694": "WG",
            "33705": "PF",
            "33728": "YW",
            "33882": "SR",
            "34067": "WM",
            "34074": "YW",
            "34121": "QJ",
            "34255": "ZC",
            "34259": "XL",
            "34425": "JH",
            "34430": "XH",
            "34485": "KH",
            "34503": "YS",
            "34532": "HG",
            "34552": "XS",
            "34558": "YE",
            "34593": "ZL",
            "34660": "YQ",
            "34892": "XH",
            "34928": "SC",
            "34999": "QJ",
            "35048": "PB",
            "35059": "SC",
            "35098": "ZC",
            "35203": "TQ",
            "35265": "JX",
            "35299": "JX",
            "35782": "SZ",
            "35828": "YS",
            "35830": "E",
            "35843": "TD",
            "35895": "YG",
            "35977": "MH",
            "36158": "JG",
            "36228": "QJ",
            "36426": "XQ",
            "36466": "DC",
            "36710": "JC",
            "36711": "ZYG",
            "36767": "PB",
            "36866": "SK",
            "36951": "YW",
            "37034": "YX",
            "37063": "XH",
            "37218": "ZC",
            "37325": "ZC",
            "38063": "PB",
            "38079": "TD",
            "38085": "QY",
            "38107": "DC",
            "38116": "TD",
            "38123": "YD",
            "38224": "HG",
            "38241": "XTC",
            "38271": "ZC",
            "38415": "YE",
            "38426": "KH",
            "38461": "YD",
            "38463": "AE",
            "38466": "PB",
            "38477": "XJ",
            "38518": "YT",
            "38551": "WK",
            "38585": "ZC",
            "38704": "XS",
            "38739": "LJ",
            "38761": "GJ",
            "38808": "SQ",
            "39048": "JG",
            "39049": "XJ",
            "39052": "HG",
            "39076": "CZ",
            "39271": "XT",
            "39534": "TD",
            "39552": "TD",
            "39584": "PB",
            "39647": "SB",
            "39730": "LG",
            "39748": "TPB",
            "40109": "ZQ",
            "40479": "ND",
            "40516": "HG",
            "40536": "HG",
            "40583": "QJ",
            "40765": "YQ",
            "40784": "QJ",
            "40840": "YK",
            "40863": "QJG"
        };
        var getMnemonicCode = function(str) {
            if (typeof(str) != "string")
                throw new Error(-1, "门店名称类型不合法!");
            var arrResult = new Array();
            //将字符串转码后转为数组
            for (var i = 0, len = str.length; i < len; i++) {
                var ch = str.charAt(i);
                arrResult.push(checkCh(ch));
            }
            return mkRslt(arrResult);
        }

        var checkCh = function(ch) {
            var uni = ch.charCodeAt(0);
            //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
            if (uni > 40869 || uni < 19968) {
                return ch; //dealWithOthers(ch);
            }
            //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
            return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
        }

        var mkRslt = function(arr) {
            var arrRslt = [""];
            for (var i = 0, len = arr.length; i < len; i++) {
                var str = arr[i];
                var strlen = str.length;
                if (strlen == 1) {
                    for (var k = 0; k < arrRslt.length; k++) {
                        arrRslt[k] += str;
                    }
                } else {
                    var tmpArr = arrRslt.slice(0);
                    arrRslt = [];
                    for (k = 0; k < strlen; k++) {
                        //复制一个相同的arrRslt
                        var tmp = tmpArr.slice(0);
                        //把当前字符str[k]添加到每个元素末尾
                        for (var j = 0; j < tmp.length; j++) {
                            tmp[j] += str.charAt(k);
                        }
                        //把复制并修改后的数组连接到arrRslt上
                        arrRslt = arrRslt.concat(tmp);
                    }
                }
            }
            return arrRslt;
        }
        var autofillsn = function(args, viewmodel, detailsModel, snModel, qtyfildname) {
            //自动指定序列号
            var detailSelectRowIndexs = detailsModel.getSelectedRowIndexes()[0]; //获取商品选中行
            if (detailSelectRowIndexs == undefined) {
                cb.utils.alert('没有选中商品行，无法批量指定,请检查!', 'warning');
                return false;
            }
            var detailSelectRows = detailsModel.getRow(detailSelectRowIndexs); //商品行数据

            var snSelectedRowIndexs = snModel.getSelectedRowIndexes()[0] //序列号选中行index
            if (snSelectedRowIndexs == undefined) {
                cb.utils.alert('没有选中序列号行，无法批量指定,请检查!', 'warning');
                return false;
            }
            var selectedRows = snModel.getRow(snSelectedRowIndexs); //序列号行数据
            var snModelRows = snModel.getRowsCount();

            if (!detailsModel.getCellValue(detailSelectRowIndexs, qtyfildname)) return false;
            var productquantity = Math.abs(parseInt(detailsModel.getCellValue(detailSelectRowIndexs, qtyfildname))); //商品数量取整取绝对值
            var makesncount = productquantity - snModel.getRowsCount(); //计算生成序列号的量
            if (makesncount <= 0) return false;
            if (selectedRows.sn == undefined || selectedRows.sn == null || selectedRows.sn == "") {
                cb.utils.alert('没有获取到当前序列号，无法自动指定,请检查!', 'warning');
                return false;
            }

            var sSn = selectedRows.sn;
            var firstnumpos = -1;
            var lastnumpos = -1;
            var reg = /^[0-9]+.?[0-9]*$/;
            for (var i = sSn.length - 1; i >= 0; i--) {
                //找到从右向左第一个数值结束位
                if (reg.test(sSn.charAt(i)) && lastnumpos == -1 && firstnumpos == -1) lastnumpos = i;
                //找到从右向左数值前的第一个非数值
                if (!reg.test(sSn.charAt(i)) && firstnumpos == -1 && lastnumpos > i && lastnumpos != -1) firstnumpos = i;
            }
            if (firstnumpos == -1 && lastnumpos == -1) {
                cb.utils.alert('录入的序列号中不存在数值数据，无法自动指定,请检查!', 'warning');
                return false;
            }
            firstnumpos = firstnumpos + 1; //得出从右向左第一个数值开始位

            var prefix = sSn.substring(0, firstnumpos); //前缀
            var postfix = sSn.substring(lastnumpos + 1, sSn.length); //后缀
            var serialnumber = sSn.substring(firstnumpos, lastnumpos + 1);
            for (var i = 0; i < makesncount; i++) {
                var rowObj = {};
                var rowserialnumber = PrefixInteger(parseInt(serialnumber) + i + 1, serialnumber.length)
                var rowsn = prefix + rowserialnumber + postfix;
                rowObj["sn"] = rowsn;
                snModel.appendRow(rowObj);
            }
            return true;
        };
        var PrefixInteger = function(num, length) {
            return (Array(length).join('0') + num).slice(-length);
        };
        var bsnTabShow = function(data, viewmodel, sntabname, headtabname, bShowSn) {
            if (!cb.rest.AppContext.option.serialManage) {
                viewmodel.execute('updateViewMeta', { code: sntabname, visible: false });
            } else {
                if (bShowSn) {
                    let detailsModel = viewmodel.get(data.childrenField);
                    if (detailsModel) {
                        let rowIndex = findSnRowIndex(detailsModel);
                        if (rowIndex == -1) {
                            cb.utils.alert('不存在序列号管理的商品行!');
                            return false;
                        }
                    }
                    viewmodel.execute('updateViewMeta', { code: sntabname, visible: true });
                    viewmodel.execute('updateViewMeta', { code: headtabname, visible: false });
                    if (viewmodel.get("sncheckbox")) { viewmodel.get("sncheckbox").setValue(true); }
                    if (viewmodel.get('btnShowSn')) viewmodel.get('btnShowSn').setState('className', 'no-border-radius m-l-10 xuliehao-haborder');
                } else {
                    viewmodel.execute('updateViewMeta', { code: sntabname, visible: false });
                    viewmodel.execute('updateViewMeta', { code: headtabname, visible: true });
                    if (viewmodel.get("sncheckbox")) { viewmodel.get("sncheckbox").setValue(false); }
                    if (viewmodel.get('btnShowSn')) viewmodel.get('btnShowSn').setState('className', 'no-border-radius m-l-10 xuliehao-onborder');
                }
                return true;
            }
        };

        var updateRowQtyBySnNum = function(args, detailModelName, snModelName, qtyfieldname) {
            // var detailsModel = viewmodel.get(detailModelName);
            // var rows = detailsModel.getRows();
            var datas = JSON.parse(args.data.data);
            var rows = datas[detailModelName];
            if (!rows) return;
            // var rows = detailsModel.getRows();
            for (let j = 0; j < rows.length; j++) {
                let row = rows[j];
                if (!cb.utils.getBooleanValue(row.isSerialNoManage)) continue;
                let sns = row[snModelName];
                let qty = row[qtyfieldname];
                if (sns) {
                    let snRows = sns.filter(row => row._status != 'Delete');
                    if (qty != snRows.length) qty = snRows.length;
                } else {
                    qty = 0;
                }
                row[qtyfieldname] = qty;
                // detailsModel.setCellValue(j, qtyfieldname, qty, false, false);
            }

            // var datas = JSON.parse(args.data.data);
            datas[detailModelName] = rows;
            args.data.data = JSON.stringify(datas);

        };
        //序列号保存前校验
        // var checkSnBeforeSave = function(args,viewmodel,detailsModelName,snModelName,qtyfildname,returnPromise){
        var checkSnBeforeSave = function(args, detailsModelName, snModelName, qtyfildname, viewmodel) {
    
            // var checkSnBeforeSave = function (detailsModel, snModelName, qtyfildname) {
            if (!cb.rest.AppContext.option.serialManage) return true;

            var dicRows = {}; //校验是否重复使用
            let bflg = 0;

            if (viewmodel) {
                let detailsModel = viewmodel.get(detailsModelName);
                let drows = detailsModel.getRows();
                for (let i = 0; i < drows.length; i++) {
                    let drow = drows[i];
                    if (!drow.isSerialNoManage || drow._status == 'Delete' || drow.isSerialNoManage == "0") continue;
                    if (!drow[snModelName]) {
                        cb.utils.alert('存在未录入序列号的序列号商品行,请检查!', 'error');
                        bflg = 1;
                        return bflg;
                    }
                    if (drow[snModelName].sn == '') {
                        cb.utils.alert('序列号商品行的序列号不能为空,请检查!', 'error');
                        bflg = 1;
                        return bflg;
                    }

					//采购入库单序列号
					let dqty = drow[qtyfildname];
                    let purinbillno = viewmodel.originalViewMeta.cBillNo;
                    let snRows1 = drow[snModelName].filter(row => row._status != 'Delete');
                    
					let absQty = 0;
					if (!snRows1 || snRows1.length == 0) {
                        cb.utils.alert('存在未录入序列号的序列号商品行,请检查!', 'error');
                        bflg = 1;
                        return bflg;
                    }
                    for (let j = 0; j < snRows1.length; j++) {
                        if (!snRows1[j].sn || snRows1[j].sn == '') {
                            cb.utils.alert('序列号商品行的序列号不能为空,请检查!', 'error');
                            bflg = 1;
                            return bflg;
                        }
                        if (dicRows[snRows1[j].sn]) {
                            cb.utils.alert('存在重复的序列号[' + snRows1[j].sn + '],请检查!', 'error');
                            bflg = 1;
                            return bflg; //有重复就直接返回
                        }
                        dicRows[snRows1[j].sn] = true;
                    }
                   

                    if (purinbillno == 'st_purinrecord' && viewmodel.get("vouchtype").getValue() == '1' || purinbillno == 'rm_retailvouch' && viewmodel.get("iNegative").getValue() == '2') {
                        absQty = -1 * dqty;
                    } else {
                        absQty = dqty;
                    }

                    if (absQty != snRows1.length) {
                        //序列号行数不等于行上数量
                        bflg = 2; //最后返回值
						return bflg;
                    }
                }
				return bflg;
            }

            // let rows = detailsModel.getRows();
            var datas = JSON.parse(args.data.data);
            var rows = datas[detailsModelName];

            if (!rows) return bflg; //行数据未修改,直接返回
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (!cb.utils.getBooleanValue(row.isSerialNoManage) || row._status == 'Delete'  || row.isSerialNoManage == "0") continue;
                let sns = row[snModelName];
				let qty = row[qtyfildname];
				if(!qty) continue;//行数据未修改,继续
                if (sns) {
                    let snRows = sns.filter(row => row._status != 'Delete');
                    if (!snRows || snRows.length == 0) {
                        cb.utils.alert('存在未录入序列号的序列号商品行,请检查!', 'error');
                        bflg = 1;
                        return bflg;
                    }
                    for (let j = 0; j < snRows.length; j++) {
                        if (!snRows[j].sn || snRows[j].sn == '') {
                            cb.utils.alert('序列号商品行的序列号不能为空,请检查!', 'error');
                            bflg = 1;
                            return bflg;
                        }
                        if (dicRows[snRows[j].sn]) {
                            cb.utils.alert('存在重复的序列号[' + snRows[j].sn + '],请检查!', 'error');
                            bflg = 1;
                            return bflg; //有重复就直接返回
                        }
                        dicRows[snRows[j].sn] = true;
                    }
                    let cmpQty = 0;
                    let billno = viewmodel.originalViewMeta.cBillNo;
                    if (billno == 'st_purinrecord' && viewmodel.get("vouchtype").getValue() == '1') {
                        cmpQty = -1 * qty;
                    } else {
                        cmpQty = qty;
                    }
                    if (cmpQty != snRows.length) {
                        //序列号行数不等于行上数量
                        bflg = 2; //最后返回值
                    }

                } else {
                    cb.utils.alert('序列号商品行未录入序列号,请检查!', 'error');
                    bflg = 1;
                    return bflg;
                }
            }
            return bflg;
            // return 0;

        };

        var showSnVisible = function(viewmodel, detailsModel) {
            if (!cb.rest.AppContext.option.serialManage) {
                if (viewmodel.get('btnShowSn')) viewmodel.get('btnShowSn').setVisible(false);
				debugger;
                if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(false);
                detailsModel.setColumnState('isSerialNoManage', 'visible', false);
            } else {
                var mode = viewmodel.getParams().mode;
                if (viewmodel.get('btnShowSn')) viewmodel.get('btnShowSn').setVisible(true);
                if (viewmodel.get('sncheckbox')) {
                    debugger;
					if (mode == 'add' || mode == 'edit') {
                        if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(true);
                    } else {
                        if (viewmodel.get('sncheckbox')) viewmodel.get('sncheckbox').setVisible(false);
                    }
                }

                detailsModel.setColumnState('isSerialNoManage', 'visible', true);
                //默认选中第一行 序列号行
                var snRow = findSnRowIndex(detailsModel);
                if (snRow != -1) { detailsModel.select(snRow); }
            }
        };

        var snformatter = function(gridModel, viewModel) {
            var self = this;
            gridModel.setColumnState('isSerialNoManage', 'formatter', function(rowInfo, rowData) {
                var isSerialNoManage = cb.utils.getBooleanValue(rowData.isSerialNoManage);
                var className = '';
                var msg = '';
                if (isSerialNoManage == true) {
                    className = 'leaking-plate-red';
                    msg = '序';
                }

                return {
                    override: true,
                    html: '<span class="' + className + '">' + msg + '</span>'
                }
            });
        };


        var findSnRowIndex = function(detailsModel) {
            if (!detailsModel) {
                console.log('findSnRowIndex--error');
                return -2;
            }
            var rows = detailsModel.getRows();
            for (let i = 0; i < rows.length; i++) {
                if (cb.utils.getBooleanValue(rows[i].isSerialNoManage)) {
                    return i;
                }
            }
            return -1;
        };

        var clearPriceMoneyCellValue = function(detailsModel, data) {
            if (data.value == "" || data.value == null) {
                detailsModel.setCellValue(data.rowIndex, 'oriTaxUnitPrice', null);
                detailsModel.setCellValue(data.rowIndex, 'oriMoney', null);
                detailsModel.setCellValue(data.rowIndex, 'oriUnitPrice', null);
                detailsModel.setCellValue(data.rowIndex, 'oriSum', null);
                detailsModel.setCellValue(data.rowIndex, 'oriTax', null);
                detailsModel.setCellValue(data.rowIndex, 'natUnitPrice', null);
                detailsModel.setCellValue(data.rowIndex, 'natTaxUnitPrice', null);
                detailsModel.setCellValue(data.rowIndex, 'natMoney', null);
                detailsModel.setCellValue(data.rowIndex, 'natSum', null);
                detailsModel.setCellValue(data.rowIndex, 'natTax', null);                                      
            }
        };
        var clearQtyCellValue = function(detailsModel, data) {
            if (data.value == "" || data.value == null) {
                detailsModel.setCellValue(data.rowIndex, 'subQty', null);
                detailsModel.setCellValue(data.rowIndex, 'qty', null);
            }
        };
        

        var touchFormatter = function(detailsModel, viewModel, qtyField) {
            if (!qtyField) {
                qtyField = "quantity";
            }
            detailsModel.setColumnState(qtyField, 'formatter', function(rowInfo, rowData) {
                var quantity = parseFloat(rowData[qtyField]);
                var text = isNaN(quantity) ? '' : quantity.toFixed(cb.rest.AppContext.option.quantitydecimal);
                return {
                    override: true,
                    html: '<span class="touchBilling_touchFQuantity">' + text + '</span>',
                    props: {
                        onClick: function() {
                            viewModel.communication({
                                type: 'modal',
                                payload: {
                                    key: 'ModifyQuantity',
                                    data: {
                                        model: detailsModel.getEditRowModel().get(qtyField)
                                    }
                                }
                            });
                        }
                    }
                }
            });
        };

        var elecBalanceWeigh = function(gridModel, viewModel, qtyField) {
            if (!qtyField) {
                qtyField = "quantity";
            }
            var elecBalanceModel = new cb.models.SimpleModel({ needClear: false });
            viewModel.addProperty('elecbalance', elecBalanceModel);

            elecBalanceModel.on('afterValueChange', function(args) {
                // args.value, args.oldValue
                viewModel.setCache('globalWeight', args.value);
                var focusedRowIndex = gridModel.getFocusedRowIndex();
                if (focusedRowIndex != -1) {
                    var qty = gridModel.getCellValue(focusedRowIndex, qtyField);
                    if (cb.utils.isEmpty(qty)) {
                        qty = 0;
                    }
                    if (qty == 0) {
                        var globalWeight = viewModel.getCache('globalWeight');
                        if (isNaN(globalWeight)) {
                            cb.utils.alert('重量不合法', 'error');
                        } else if (globalWeight < 0) {
                            cb.utils.alert('重量不合法', 'error');
                        } else {
                            gridModel.setCellValue(focusedRowIndex, qtyField, globalWeight);
                            //持续称重
                            if (elecBalanceModel.get('keepWeigh')) {
                                viewModel.clearCache('globalWeight');
                            }
                        }
                    }
                }
            });

            elecBalanceModel.on('reweigh', function(args) {
                var focusedRowIndex = gridModel.getFocusedRowIndex();
                if (focusedRowIndex != -1) {
                    var globalWeight = args;
                    if (isNaN(globalWeight)) {
                        cb.utils.alert('重量不合法', 'error');
                    } else if (globalWeight < 0) {
                        cb.utils.alert('重量不合法', 'error');
                    } else {
                        gridModel.setCellValue(focusedRowIndex, qtyField, globalWeight);
                    }
                }
            });

            gridModel.on('afterInsertRow', function(args) {
                if (args.row.enableWeigh) {
                    gridModel.setCellValue(args.index, qtyField, 0);
                    if (viewModel.getCache('globalWeight')) {
                        var globalWeight = viewModel.getCache('globalWeight');
                        if (isNaN(globalWeight)) {
                            cb.utils.alert('重量不合法', 'error');
                        } else if (globalWeight < 0) {
                            cb.utils.alert('重量不合法', 'error');
                        } else {
                            gridModel.setCellValue(args.index, qtyField, globalWeight);
                            //持续称重
                            if (elecBalanceModel.get('keepWeigh')) {
                                viewModel.clearCache('globalWeight');
                            }
                        }
                    }
                } else {
                  /*delete by jinzh1  数量字段  不在为空自动设为1*/
                    // var qty  = gridModel.getCellValue(args.index, qtyField);
                    // if (cb.utils.isEmpty(qty)) {
                    //     gridModel.setCellValue(args.index, qtyField, 1);
                    // }
                }
            });
        };

        /* 是否显示孙表会员等级页签 jiacy */
        var bMLTabShow = function(viewmodel, suntabname, headtabname, bShowML) {
        if (bShowML) {
        	viewmodel.execute('updateViewMeta', { code: suntabname, visible: true });
        	viewmodel.execute('updateViewMeta', { code: headtabname, visible: false });
        	if (viewmodel.get('btnShowML')) viewmodel.get('btnShowML').setState('className', 'no-border-radius m-l-10 xuliehao-haborder');
        	} else {
        		viewmodel.execute('updateViewMeta', { code: suntabname, visible: false });
        			viewmodel.execute('updateViewMeta', { code: headtabname, visible: true });
        			if (viewmodel.get('btnShowML')) viewmodel.get('btnShowML').setState('className', 'no-border-radius m-l-10 xuliehao-onborder');
        		}
        	return true;
        };

				/* 设置定价策略默认值 jiacy */
				var selectPriceStrategy = function(priceStrategy,viewmodel){
					if(priceStrategy && priceStrategy === 'ap_UnitePrice')
					{
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_org', visible: false });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_region', visible: false });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_store', visible: false });
					}
					if(priceStrategy && priceStrategy === 'ap_OrgPrice')
					{
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_org', visible: true });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_region', visible: false });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_store', visible: false });
					}
					if(priceStrategy && priceStrategy === 'ap_StorePrice')
					{
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_org', visible: false });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_region', visible: false });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_store', visible: true });
					}
					if(priceStrategy && priceStrategy === 'ap_OrgAndRegionPrice')
					{
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_org', visible: true });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_region', visible: true });
						viewmodel.execute('updateViewMeta', { code:'ap_adjustprice_body_page_store', visible: false });
					}
				};

				/* 点击调价单卡片的删除、审核、编辑按钮，判断是否有权限 jiacy */
				var HasBtnAuth = function(viewmodel,status){
					var promise = new cb.promise();
					var id = viewmodel.get('id').getValue();
					var proxy = cb.rest.DynamicProxy.create({
						get:{
							url: 'priceBillService/hasCardEditAuth',
							method: 'GET'}
					});
					var param = {item: id,status: status};
					proxy.get(param, (err,result) => {
						if (err) {
							cb.utils.alert(err.message, 'error');
							return;
						}
						if(result === undefined || result == "" || result == null) {
							promise.resolve();
							return;
						}
						cb.utils.alert(result);
						return;
					});
					return promise;
				};

				/* 序列号是否能编辑 jiacy */
				var bSNEdit = function(data,detailModel){
				  var curRowData = detailModel.getRow(data.value.rowIndex);
				  if(data.value.columnKey == 'serialNo'){
					  if(cb.utils.getBooleanValue(curRowData.isSerialNoManage)){
							//detailModel.setCellValue(data.value.rowIndex,'isEnableSerialNo',true)
						  return true;
					  }else{
						  return false;
					  }
				  }
                };
        
        //未启用货位管理参数时所有单据隐藏货位字段
        var goodsPositionVisible = function(data,detailModel){
            if (cb.rest.AppContext.option.goodsPositionManage == true) {
                detailModel.setColumnState('goodsposition_cName', 'bShowIt', true);
            } else {
                detailModel.setColumnState('goodsposition_cName', 'bShowIt', false);
            }
        };

        //切换仓库删除序列号
        var clearSnAfterWareChange = function(data,detailSnModel){
            let rows = detailSnModel.getRowsCount();
            if(rows > 0){
              let deleteRows = new Array();
              for(var i = 0; i < rows; i++){
                deleteRows[i] = i;
              }
              detailSnModel.deleteRows(deleteRows);
            }
        };
        
        //编辑态 新增态时 隐藏稻香村自定义项29,30
        var hiddenDefine = function(detailModel, mode) {
            if(detailModel.getColumn("bodyItem!define29")!=null && detailModel.getColumn("bodyItem!define29")!= undefined && detailModel.getColumn("bodyItem!define29")!=''){
                if(detailModel.getColumn("bodyItem!define29").cShowCaption == "零售单价"){
                    if(mode == "add" || mode == "edit"){
                        detailModel.setColumnState('bodyItem!define29', 'bShowIt', false);
                        detailModel.setColumnState('bodyItem!define30', 'bShowIt', false);
                    }else{
                        detailModel.setColumnState('bodyItem!define29', 'bShowIt', true);
                        detailModel.setColumnState('bodyItem!define30', 'bShowIt', true);
                    }
                }
            }
            
        };

        //点击编辑时 隐藏稻香村自定义项29,30
        var hiddenDefineOnClick = function(detailModel, viewModel) {
            if(detailModel.getColumn("bodyItem!define29")!=null && detailModel.getColumn("bodyItem!define29")!= undefined && detailModel.getColumn("bodyItem!define29")!=''){
                if(detailModel.getColumn("bodyItem!define29").cShowCaption == "零售单价"){
                    detailModel.setColumnState('bodyItem!define29', 'bShowIt', false);
                    detailModel.setColumnState('bodyItem!define30', 'bShowIt', false);
                    }
            }
        };
        //录入商品时自动携带默认货位
        var setDefaultInGoodsPosition = function (viewmodel, detailsModel, data) {
            var queryGoodsPositonProxy = cb.rest.DynamicProxy.create({
                settle: {
                    url: 'goodsposition/getDefaultInPosition.do',
                    method: 'POST'
                }
            });
            var whid;
            var productid;
            var productname;
            if (viewmodel.get('warehouse')) {
                whid = viewmodel.get('warehouse').getValue();
            }
            if (data.value) {
                productid = data.value.id;
                productname = data.value.cName;
            }
            var param = {
                warehouse: whid,
                product: productid,
            };
            if (param.product != null && param.warehouse != null) {
                queryGoodsPositonProxy.settle(param, (err, result) => {
                    if (err) {
                        cb.utils.alert(err.message, 'error');
                        return;
                    }
                    if (result === undefined || JSON.stringify(result) == "{}") {
                        return cb.utils.alert("商品[" + productname + "]没有指定默认货位！请录手工入货位！", 'error');
                    } else {
                        detailsModel.setCellValue(data.rowIndex, 'goodsposition', result.position);
                        detailsModel.setCellValue(data.rowIndex, 'goodsposition_cName', result.name);
                        return;
                    }
                });
            }
        };
        //录入商品时自动携带出库货位货位(非批次管理商品录入时调用，批改管理时，录入批次号时取默认货位)
        var setDefaultOutGoodsPosition = function (viewmodel, detailsModel, data) {
            var billnum = viewmodel.getParams().billNo;
            var rows = detailsModel.getRows();
            var rowIndex = data.rowIndex;
            var row = rows[rowIndex];
            var queryGoodsPositonProxy = cb.rest.DynamicProxy.create({
                settle: {
                    url: 'goodsposition/getDefaultOutPosition.do',
                    method: 'POST'
                }
            });
            var whid;
            var productskuid;
            var sbatchno;
            var productname;
            var whFieldName;
            if (billnum == 'st_storeout') {//店存出库单，取出库仓库
                whFieldName = 'outWarehouse';
            } else {
                whFieldName = 'warehouse';
            }
            if (viewmodel.get(whFieldName)) {
                whid = viewmodel.get(whFieldName).getValue();
            }
            if (data.value) {
                if (row.isBatchManage) {
                    productskuid = row.productsku;
                    productname = row.product_cName;
                    sbatchno = row.batchno;
                } else {
                    productskuid = data.value.productskus_id;
                    productname = data.value.cName;
                }
            }
            var param = {
                warehouse: whid,
                productsku: productskuid,
                batchno: sbatchno
            };
            if (param.productsku != null && param.warehouse != null) {
                queryGoodsPositonProxy.settle(param, (err, result) => {
                    if (err) {
                        cb.utils.alert(err.message, 'error');
                        return;
                    }
                    if (result === undefined || JSON.stringify(result) == "{}") {
                        return cb.utils.alert("商品[" + productname + "]没有指定默认货位！请录手工入货位！", 'error');
                    } else {
                        detailsModel.setCellValue(data.rowIndex, 'goodsposition', result.position);
                        detailsModel.setCellValue(data.rowIndex, 'goodsposition_cName', result.name);
                        return;
                    }
                });
            }
        };
        return {
            clearQtyCellValue: clearQtyCellValue,
            clearPriceMoneyCellValue: clearPriceMoneyCellValue,
            touchFormatter: touchFormatter,
            elecBalanceWeigh: elecBalanceWeigh,
            initRegionAndPosition: initRegionAndPosition,
            onAutoPick: onAutoPick,
            bacthnoAndExpiryDateManage: bacthnoAndExpiryDateManage,
            getMnemonicCode: getMnemonicCode,
            initBarcodeModel: initBarcodeModel,
            initSnCheckbox: initSnCheckbox,
            onBarCodeEnter: onBarCodeEnter,
            setBarcodeVisble: setBarcodeVisble,
            autofillsn: autofillsn,
            fieldVisble: fieldVisble,
            bsnTabShow: bsnTabShow,
            snformatter: snformatter,
            checkBeforeAddSn: checkBeforeAddSn,
            checkSnBeforeSave: checkSnBeforeSave,
            updateRowQtyBySnNum: updateRowQtyBySnNum,
            showSnVisible: showSnVisible,
            findSnRowIndex: findSnRowIndex,
            bMLTabShow: bMLTabShow,
            bSNEdit:bSNEdit,
            selectPriceStrategy:selectPriceStrategy,
            HasBtnAuth:HasBtnAuth,
            goodsPositionVisible:goodsPositionVisible,
            clearSnAfterWareChange:clearSnAfterWareChange,
            hiddenDefine:hiddenDefine,
            hiddenDefineOnClick:hiddenDefineOnClick,
			setDefaultInGoodsPosition: setDefaultInGoodsPosition,
            setDefaultOutGoodsPosition: setDefaultOutGoodsPosition
        }
    }();
    try {
        module.exports = common_VM_Extend;
    } catch (error) {}
    return common_VM_Extend;
});



// WEBPACK FOOTER //
// ./src/client/business/common/common_VM.Extend.js
```

