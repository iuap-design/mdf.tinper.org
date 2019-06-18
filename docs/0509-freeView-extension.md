# FreeView扩展

<a name="0b7bd0cd"></a>
# 1、核心思想
**MDD框架负责UI模板渲染，业务数据请求加载交给开发者。**
<a name="bqw68"></a>
### 具体含义为：

- 在扩展文件中使用api实现业务数据加载
  - 如果是列表，通过列表的GridModel的setDataSouce来加载数据
- UIMeta负责将页面渲染出来
- 使用extend.js调用平台API来做数据加载
- viewmodel将自动将数据更新到React组件

<a name="3NgIN"></a>
# 2、示例代码

```javascript
cb.define(['common/common_VM.Extend.js'], function(common) {
    var PU_pu_pursettlemanualmenu_VM_Extend = {
        doAction: function(name, viewmodel) {
            if (this[name])
                this[name](viewmodel);
        },
        init: function(viewmodel) {
            //console.log("sdfsdf");
            var bFilter = false;
			viewmodel.on("filterClick",function(data){
                if (bFilter) {
                    viewmodel.get('pu_pursettlemanualmenu_rd').setDataSource(
                        {url:'/bill/list',method:'POST'},
                        {billnum:'pu_pursettlemanualmenu_rd', condition: data.condition});
    
                    viewmodel.get('pu_pursettlemanualmenu_fp').setDataSource(
                        {url:'/bill/list',method:'POST'},
                        {billnum:'pu_pursettlemanualmenu_fp', condition: data.condition});
                }
                else {
                    bFilter = true;
                }
            });
            
            viewmodel.on("settle",function(args){
                var datard = viewmodel.get('pu_pursettlemanualmenu_rd').getSelectedRows();
                var datafp = viewmodel.get('pu_pursettlemanualmenu_fp').getSelectedRows();
                var data = {rd:datard,fp:datafp};
                
                var callback = viewmodel.getParams().callback;
                callback(data);
                viewmodel.communication({type:'return'});
            })
        }
    }
    try {
        module.exports = PU_pu_pursettlemanualmenu_VM_Extend;
    } catch (error) {

    }
    return PU_pu_pursettlemanualmenu_VM_Extend;
});



// WEBPACK FOOTER //
// ./src/client/business/PU/PU_pu_pursettlemanualmenu_VM.Extend.js
```

