<a name="Wdkuk"></a>
## Node 层生成的 ViewModel

```javascript
console.info('%c AA_aa_custcategorylist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_custcategorylist_VM', function(modelType) {

    var model = function(data) {
        cb.models.ContainerModel.call(this, data);
        this.init();
    };
    model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
    model.prototype.modelType = modelType;

  	model.prototype.init = function(){
    	var _this = this;
      var fields = {}
      
      this.setData(fields);
      this.setDirty(false);
			
      _this.allActions = []
      
      
    }
  
  	model.prototype.initData = function(){
    
    }
  
  return model
}
```