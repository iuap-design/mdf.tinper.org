# FIlterVIewModel代码分析

代码位置：yxyweb/common/components/Filter/index

constructor中

关键代码：cb.loader.initMetaCommonViewModel('FilterViewModel','filterViewModel',{})

```javascript
this.vm = cb.loader.initMetaCommonViewModel(
      'FilterViewModel',
      'filterViewModel',
      {
        suffix: configFilterId,
        filterId: filterId,
        condition: params.condition,
        cardKey: cardKey,
        isInPanel: this.state.isInPanel,
        isInDesign: this.state.isInDesign,
        solutionId: params.solutionId,
        viewid: _.get(props.model.getParams(), 'query.viewid'),
        bHasNullDate: props.model.getParams().bHasNullDate || false
      },
      this.props.model,
      ['filterClick']
    );
```

Cube.js代码<br />parent是当前单据的ViewModel，例如"RM_rm_motobeprcsdlist_VM"，即扩展代码中的viewmodel
```javascript
cb.loader.initMetaCommonViewModel = function (name, path, params, parent, events) {
  
  var cacheName = name;
  var suffix = params && params.suffix;
  if (suffix)
    cacheName += suffix;
  var vm = parent.getCache(cacheName);
  if (vm) {
    if (cb.utils.isArray(events)) {
      events.forEach(function (eventName) {
        vm.un(eventName);
        vm.on(eventName, function (data) {
          parent.execute(eventName, data);
        });
      });
    }
    cb.utils.extend(vm.getParams(), params);
    if (typeof vm.initData === 'function')
      vm.initData();
    return vm;
  }
  require('./' + path);
  vm = new cb.viewmodels[name](params ? { params: params } : null);
  vm.setCache('parentViewModel', parent);
  if (cb.utils.isArray(events)) {
    events.forEach(function (eventName) {
      vm.on(eventName, function (data) {
        parent.execute(eventName, data);
      });
    });
  }
  parent.setCache(cacheName, vm);
  return vm;
};
```

