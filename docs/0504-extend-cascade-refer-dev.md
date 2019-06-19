# 扩展开发-级联参照开发

<a name="6tTb2"></a>
# 1.以省市参照联动扩展为例
- 新建一个文件名为AA_enterprise_VM.Extend.js放到omc_test_web/src/client/business/AA下
- 里面init函数内代码如下：
```javascript
init: function (viewmodel) {
    // 在城市参照弹出之前，获取省参照的value，通过setFilter将value存放到过滤条件中（在城市参照获取城市列表时，会通过getFilter()获取value，作为过滤参数传到服务端）
    viewmodel.get("bankcity").on('beforeBrowse', function (data) {
        var provinceValue;
        if(!viewmodel.get("bankprovince").getValue()){
            cb.utils.alert("请选择开户省");
            return false;
        }else{
          	provinceValue = viewmodel.get("bankprovince").getValue();
        }
        var condition = {
            "isRefreshData": true,
            "parentId":provinceValue,
            "province":provinceValue
        };
        this.setFilter(condition);
    });
    // 如果省参照的值有改变，就将城市参照的值清空
    viewmodel.get("bankprovince").on('afterValueChange', function (data) {
      	viewmodel.get("bankcity").setValue(null);
    });
}
```
> 注："bankcity"为城市选择参照的字段名称（excel表中对应的cFieldName）
> "bankprovince" 为省选择参照的字段名称，provinceValue为获取的省选择参照的id。
> 模版内所有字段名称可在 omc_test_web/autogenerate/viewmodel/AA 下自动生成的对应的渲染模版js文件内找到
> "beforeBrowse"为城市选择参照，参照model弹出前的方法
> viewmodel对应的方法均可在https://www.showdoc.cc/89974793848004?page_id=511811072760623内找到
