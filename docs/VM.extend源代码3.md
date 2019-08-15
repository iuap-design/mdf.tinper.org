```javascript
cb.define([], function () {
  var ST_st_storeinlist_VM_Extend = {
    doAction: function (name, viewmodel) {
      if (this[name])
        this[name](viewmodel);
    },
    init: function (viewmodel) {
      let gridModel = viewmodel.getGridModel();
      gridModel.on('afterSetDataSource', () => {

        const rows = gridModel.getRows();
        const actions = gridModel.getCache('actions');
        const actionsStates = [];
        rows.forEach(data => {
          const actionState = {};
          actions.forEach(action => {
            actionState[action.cItemName] = { visible: true };
            if (data.status == "1") {
              if (action.cItemName == "btnEdit" || action.cItemName == "btnDelete" || action.cItemName == "btnAudit")
                actionState[action.cItemName] = { visible: false };
            }
            if (action.cItemName == "btnRevoke"){
              if (data.status == 1 && data.exchangestatus == 1) {//提交并且交换失败 wangyda
                actionState["btnRevoke"] = { visible: true };
              } else {
                actionState["btnRevoke"] = { visible: false };
              }
            }
          });
          actionsStates.push(actionState);
        });
        gridModel.setActionsState(actionsStates);
      });

      gridModel.on('jointQuery', function (args) {
				var params = {
					mode: 'edit',
					readOnly: true,
					id: args.rowData.srcbill
				};
				var data = {
					billtype: 'voucher',
					billno: 'st_storenotice',
					params: params
				};
				cb.loader.runCommandLine('bill', data, viewmodel);
			});
    }
  }
  try {
    module.exports = ST_st_storeinlist_VM_Extend;
  } catch (error) {

  }
  return ST_st_storeinlist_VM_Extend;
});



// WEBPACK FOOTER //
// ./src/client/business/ST/ST_st_storeinlist_VM.Extend.js
```