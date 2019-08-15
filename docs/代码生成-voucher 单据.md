```javascript
console.info('%c <%=vmName%> js init', 'color:green');
    cb.viewmodels.register('<%=vmName%>', function (modelType) {

      var model = function (data) {
        cb.models.ContainerModel.call(this,data);
        this.init();
      };
      model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
      model.prototype.modelType = modelType;

      model.prototype.init = function () {
          var _this = this;
          var fields = {
            <%for(var i=0;i<fields.length;i++){%>
              <%var field = fields[i];%>
              '<%=field.name%>':<%=field.value%>,
            <%}%>
          };
          this.setData(fields);
          this.setDirty(false);
          
                                               
          var billType = "<%=cBillType%>" || 'voucher';
            var biz;
            if (billType == 'option' || billType == 'freeview') {
              biz = cb.biz.common[billType];
            } else {
              biz = cb.biz.common.voucher;
            }

            //common events start
            //actions
            <% if(allActions) { %>
              _this.allActions = <%= allActions%>;
            <% }%>
            <% if(actions) { %>
              <%for(var i=0;i<actions.length;i++){%>
                  <%var action = actions[i];%>
                  _this.get('<%=action.name%>').on('<%=action.event%>',function(params){
                    var args = cb.utils.extend(true, {}, <%=action.params%>, { key: '<%=action.name%>'},{ params: params });
                    <%if(action.needReduce){%>
                    var self = this;
                    args.disabledCallback = function () {
                      self.setDisabled(true);
                    }
                    args.enabledCallback = function () {
                      self.setDisabled(false);
                    }
                    <%}%>
                    biz.do('<%=action.cAction%>',_this, args)
                  });
              <%}%>
            <%}%>
            <% if(checkFields) { %>
              //check
              <%for(var i=0;i<checkFields.length;i++){%>
                  <%var checkField = checkFields[i];%>
                    _this.get('<%=checkField.name%>').on('afterValueChange',function(params){
                      if(params) params.key = '<%=checkField.name%>';
                      biz.do('check',_this, params);
                    });
              <%}%>
            <%}%>

            _this.on('columnSetting',function(params){
              biz.do('columnSetting',_this,params);
            });
            //common events end

            var girdModelKeys = <%=helper_filterModelKeys('GridModel',fields);%>
            if(girdModelKeys){
              girdModelKeys.forEach(function(key){
                var gridModel = _this.get(key);
                if(gridModel){
                  gridModel.on('afterCellValueChange',function(params){
                    if(params) params.childrenField = key;
                    biz.do('cellCheck',_this, params);
                  })
                }
              })
            }
                                               
     this.biz = biz;
      // this.initData();
    };
                                
      model.prototype.initData = function () {
        // if(cb.biz['<%=subId%>'] && cb.biz['<%=subId%>']['<%=extendVmName%>']){
        //   console.info('%c <%=extendVmName%> extendjs doAction', 'color:green');
        //   cb.biz['<%=subId%>']['<%=extendVmName%>'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = '<%=subId%>/<%=extendFileName%>';
        cb.require([extendFile], function (extend){
          console.info('%c <%=extendVmName%> extendjs doAction', 'color:green');
          extend.doAction("init", self);
          self.execute('extendReady',self);
        }, function(error){
          console.info('%c 未找到  ' + extendFile , 'font-size:12pt;color:#860786');
          console.info('%c extendVmName--><%=extendVmName%>','font-size:12pt;color:#860786')
          self.execute('extendReady',self);
        });
	    };

    return model;
  });
```