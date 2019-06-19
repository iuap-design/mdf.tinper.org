# 模板级扩展开发

<a name="01dd0cb7"></a>
# 扩展开发文档

<a name="3844f60e"></a>
## 模板扩展脚本
使用excel生成界面后，某些特殊需求无法满足，如：参照联动，此时我们需要对当前界面进行扩展开发

<a name="c2a1b3f1"></a>
### 1.新建编辑扩展js

- 在 omc_test_web/src/client/business/模块缩写名(例如 AA) 目录下新建一个扩展js，命名规则为 AA_模版唯一标识_VM_Extend.js
> 注：模版唯一标识为excel内对应的cBillNo

- 代码结构如下：
```javascript
cb.define(['common/common_VM.Extend.js'], function (common) {
  	var XX_xxxx_VM_Extend = {
        doAction: function (name, viewmodel) {
          if (this[name]){
             this[name](viewmodel);
           }
         },
        init: function (viewmodel) {
          console.log(viewmodel);
        },
  	}
  	try {
  	  module.exports = XX_xxxx_VM_Extend;
  	} catch (error) {
  	  console.log(error);
  	}
  	return XX_xxxx_VM_Extend;
  });
```
> 注：其中common_VM.Extend.js为业务自定义公共扩展文件（非必须），需要首先引入。

> 声明的变量XX_xxxx_VM_Extend建议和文件名保持一致，init方法的viewmodel即为框架代码自动生成的
viewmodel对象。
> viewmodel可以通过相关api 获取当前页面UI组件所对应的viewmodel对象， 通常扩展业务逻辑一般都写在init函数内。api文档为https://www.showdoc.cc/89974793848004?page_id=511811072760623


<a name="2d86a22f"></a>
### 2.以省市参照联动扩展为例

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


<a name="c33ac4ef"></a>
### 3.线上用例

- 线上地址
  - 营销云线上地址 [https://retail.yonyoucloud.com/index.html](https://retail.yonyoucloud.com/index.html)
- 两种参照联动方式
  - 卡片的参照联动 参考  立即体验-- 食品/医药/家装/珠宝 --- 首页---数据中心---存量查询  里面的门店和仓库为参照联动
  - table表格内参照联动 参考 立即体验 --家装 --- 首页 -- 定价中心 -- 调价单 -- 新增 -- 增行 里面的商品编码和商品sku编码为参照联动

<a name="812b1a34"></a>
### 4.相关api参考文档

- 文档地址  [https://www.showdoc.cc/89974793848004?page_id=511811072760623](https://www.showdoc.cc/89974793848004?page_id=511811072760623)

<a name="04f10612"></a>
## 扩展非模板组件
<a name="e13ef20e"></a>
### 1.公共组件

- 在src/yxyweb/common/components目录下创建组件存放目录，并创建组件，可以参考同目录下的其它组件
- 将组件在src/yxyweb/common/components/portal/PortalTabItem.jsx中注册到PlatformComponents对象中
- 通过platform/<组件Key>访问
<a name="470d7330"></a>
### 2.业务组件

- src/common/components
- src/common/components/portal/index.jsx
- 通过platform/<组件Key>访问