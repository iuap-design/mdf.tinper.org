# VM源代码

源代码如下：

```javascript
(function anonymous(
) {

      //option
      
    console.info('%c AA_business_option_VM js init', 'color:green');
    cb.viewmodels.register('AA_business_option_VM', function (modelType) {

      var model = function (data) {
        cb.models.ContainerModel.call(this,data);
        this.init();
      };
      model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
      model.prototype.modelType = modelType;

      model.prototype.init = function () {
          var _this = this;
          var fields = {
            
              
              'params':{},
            
              
              'ERPsyscheckoutdate':new cb.models.SimpleModel({"id":16,"cShowCaption":"结账日期","groupcode":"bo0101","ordernum":1,"maxlength":255,"fieldtype":"date","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"datepicker","cEnumType":"","pubts":"2018-08-21 17:48:07","ideleted":0,"cAlign":"right","cItemName":"ERPsyscheckoutdate","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'allownegstock':new cb.models.ListModel({"id":17,"cShowCaption":"允许负出库","groupcode":"bo0101","ordernum":5,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"allownegstock","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'bMaterialAllowNegstock':new cb.models.ListModel({"id":101,"cShowCaption":"倒冲材料允许负出库","groupcode":"bo0101","ordernum":7,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-05-09 22:24:48","ideleted":0,"cAlign":"right","cItemName":"bMaterialAllowNegstock","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'billCacheToApp':new cb.models.ListModel({"id":100,"cShowCaption":"单据设置缓存到APP端","groupcode":"bo0101","ordernum":10,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-04-13 10:05:41","ideleted":0,"cAlign":"right","cItemName":"billCacheToApp","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'storenoticedosage':new cb.models.ListModel({"id":18,"cShowCaption":"入库通知单影响可用量","groupcode":"bo0102","ordernum":1,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2018-03-15 20:23:41","ideleted":0,"cAlign":"right","cItemName":"storenoticedosage","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'autoDesignOutStockBatch':new cb.models.ListModel({"id":64,"cShowCaption":"出库批号自动指定","groupcode":"bo0102","ordernum":5,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"autoDesignOutStockBatch","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'batchAutoOutStockRule':new cb.models.ListModel({"id":65,"cShowCaption":"批号自动出库规则","groupcode":"bo0102","ordernum":10,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"先进先出\",\"2\":\"近效期先出\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"先进先出\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"近效期先出\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"bo_batchOutStockRule","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"batchAutoOutStockRule","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'accountqtystorecheck':new cb.models.ListModel({"id":19,"cShowCaption":"盘点显示账存数量","groupcode":"bo0102","ordernum":15,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"accountqtystorecheck","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'demandsalesrefcycle':new cb.models.SimpleModel({"id":20,"cShowCaption":"要货销量参考周期(天)","groupcode":"bo0102","ordernum":20,"maxlength":255,"fieldtype":"integer","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"inputnumber","cEnumType":"","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"demandsalesrefcycle","optionId":"business_option","isStoreAdjust":true,"bCanModify":true,"cStyle":"{\"iNumPoint\":0}"}),
            
              
              'isInventoryTakingStock':new cb.models.ListModel({"id":21,"cShowCaption":"到货未入库允许盘点","groupcode":"bo0102","ordernum":25,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"isInventoryTakingStock","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'checkInventorySheetGenerate':new cb.models.ListModel({"id":22,"cShowCaption":"盘点复核生成盈亏单","groupcode":"bo0102","ordernum":30,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"checkInventorySheetGenerate","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'pointQueryScheme':new cb.models.ListModel({"id":23,"cShowCaption":"交班库存查询方案","groupcode":"bo0102","ordernum":35,"maxlength":255,"fieldtype":"String","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"aa_billdefaulttype","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"pointQueryScheme","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'dailyInventoryDailyPlan':new cb.models.ListModel({"id":24,"cShowCaption":"日结库存查询方案","groupcode":"bo0102","ordernum":40,"maxlength":255,"fieldtype":"String","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"aa_billdefaulttype","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"dailyInventoryDailyPlan","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'CheckPlanProductToReality':new cb.models.ListModel({"id":81,"cShowCaption":"实盘单默认带入盘点计划商品","groupcode":"bo0102","ordernum":45,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"CheckPlanProductToReality","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'AutoFillRealityWithAccount':new cb.models.ListModel({"id":86,"cShowCaption":"实盘默认取账存数量","groupcode":"bo0102","ordernum":50,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-01-10 22:52:06","ideleted":0,"cAlign":"right","cItemName":"AutoFillRealityWithAccount","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'bCanModifySourePrice':new cb.models.ListModel({"id":96,"cShowCaption":"采购询到价后允许修改","groupcode":"bo0102","ordernum":55,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-04-11 16:51:26","ideleted":0,"cAlign":"right","cItemName":"bCanModifySourePrice","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'maxzerolim':new cb.models.SimpleModel({"id":25,"cShowCaption":"找零最大金额","groupcode":"bo0104","ordernum":1,"maxlength":255,"fieldtype":"String","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"inputnumber","cEnumType":"","pubts":"2018-08-21 17:48:07","ideleted":0,"cAlign":"right","cItemName":"maxzerolim","optionId":"business_option","isStoreAdjust":true,"bCanModify":true,"cStyle":"{\"iNumPoint\":2}"}),
            
              
              'OwesCustomerenter':new cb.models.ListModel({"id":67,"cShowCaption":"直营店赊销时客户必输","groupcode":"bo0104","ordernum":5,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"OwesCustomerenter","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'takethenextday':new cb.models.ListModel({"id":26,"cShowCaption":"日结后业务日期取值","groupcode":"bo0104","ordernum":10,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"系统日期\",\"2\":\"系统日期+1\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"系统日期\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"系统日期+1\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"bo_takethenextday","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"takethenextday","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'newbilldefcursor':new cb.models.ListModel({"id":27,"cShowCaption":"新开单据光标默认于","groupcode":"bo0104","ordernum":15,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"会员录入\",\"2\":\"商品录入\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"会员录入\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"商品录入\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"bo_newbilldefcursor","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"newbilldefcursor","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'returnseasonentry':new cb.models.ListModel({"id":28,"cShowCaption":"退货原因必输","groupcode":"bo0104","ordernum":20,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"returnseasonentry","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'displaymembercoupon':new cb.models.ListModel({"id":29,"cShowCaption":"显示会员优惠券","groupcode":"bo0104","ordernum":25,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"displaymembercoupon","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'ticketprint':new cb.models.ListModel({"id":30,"cShowCaption":"开单时打印小票","groupcode":"bo0104","ordernum":30,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"ticketprint","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'enablemaling':new cb.models.ListModel({"id":31,"cShowCaption":"允许抹零","groupcode":"bo0104","ordernum":35,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"enablemaling","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'malingdefault':new cb.models.ListModel({"id":32,"cShowCaption":"每单默认抹零","groupcode":"bo0104","ordernum":40,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"malingdefault","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'malingcalobject':new cb.models.ListModel({"id":33,"cShowCaption":"抹零计算对象","groupcode":"bo0104","ordernum":45,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"每行商品单价\",\"2\":\"整单应收总金额\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"每行商品单价\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"整单应收总金额\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"bo_malingcalobject","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"malingcalobject","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'malingprecision':new cb.models.ListModel({"id":34,"cShowCaption":"抹零计算精度","groupcode":"bo0104","ordernum":50,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"角\",\"2\":\"元\",\"3\":\"拾\",\"4\":\"佰\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"角\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"元\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"拾\",\"key\":\"3\"},{\"nameType\":\"text\",\"value\":\"佰\",\"key\":\"4\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"bo_malingprecision","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"malingprecision","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'malingmode':new cb.models.ListModel({"id":35,"cShowCaption":"抹零方式","groupcode":"bo0104","ordernum":55,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"四舍五入\",\"2\":\"向下取整\",\"3\":\"向上取整\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"四舍五入\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"向下取整\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"向上取整\",\"key\":\"3\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"bo_malingmode","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"malingmode","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'ordershipdate':new cb.models.SimpleModel({"id":36,"cShowCaption":"预订交货前N天提醒","groupcode":"bo0104","ordernum":60,"maxlength":255,"fieldtype":"integer","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"inputnumber","cEnumType":"","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"ordershipdate","optionId":"business_option","isStoreAdjust":true,"bCanModify":true,"cStyle":"{\"iNumPoint\":0}"}),
            
              
              'billprinttype':new cb.models.ListModel({"id":41,"cShowCaption":"开单打印类型","groupcode":"bo0104","ordernum":65,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"POS打印\",\"2\":\"单据打印\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"POS打印\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"单据打印\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"aa_billprinttype","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"billprinttype","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'billdefaulttype':new cb.models.ListModel({"id":42,"cShowCaption":"开单默认打印模板","groupcode":"bo0104","ordernum":70,"maxlength":255,"fieldtype":"String","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"Select","cEnumType":"","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"billdefaulttype","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'dailyReportMakeStyle':new cb.models.ListModel({"id":82,"cShowCaption":"零售日报生成方式","groupcode":"bo0104","ordernum":75,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"汇总\",\"2\":\"明细\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"汇总\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"明细\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_dailyReportMakeStyle","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"dailyReportMakeStyle","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'dailyReportCollectCondition':new cb.models.ListModel({"id":83,"cShowCaption":"零售日报汇总条件","groupcode":"bo0104","ordernum":80,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"业务日期\",\"2\":\"营业员\",\"3\":\"促销活动\",\"4\":\"表体自定义项\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"业务日期\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"营业员\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"促销活动\",\"key\":\"3\"},{\"nameType\":\"text\",\"value\":\"表体自定义项\",\"key\":\"4\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"aa_dailyReportCollectCondition","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"dailyReportCollectCondition","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'billingcopiesofprintcopies':new cb.models.SimpleModel({"id":57,"cShowCaption":"开单小票打印份数","groupcode":"bo0104","ordernum":85,"maxlength":255,"fieldtype":"integer","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"inputnumber","cEnumType":"","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"billingcopiesofprintcopies","optionId":"business_option","isStoreAdjust":true,"bCanModify":true,"cStyle":"{\"iNumPoint\":0}"}),
            
              
              'billgoodsreference':new cb.models.SimpleModel({"id":48,"cShowCaption":"开单的商品参照SKU用列表展现","groupcode":"bo0104","ordernum":90,"maxlength":255,"fieldtype":"Boolean","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"checkbox","cEnumType":"","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"billgoodsreference","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'samegoodsmerged':new cb.models.ListModel({"id":58,"cShowCaption":"开单合并规则","groupcode":"bo0104","ordernum":95,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"不合并\",\"2\":\"录入商品时\",\"3\":\"保存时\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"不合并\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"录入商品时\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"保存时\",\"key\":\"3\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","cEnumType":"retailMergeRule","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"samegoodsmerged","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'autopromotion':new cb.models.ListModel({"id":61,"cShowCaption":"自动弹出促销活动","groupcode":"bo0104","ordernum":100,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"autopromotion","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'NoFormerBackGetMemberPrice':new cb.models.ListModel({"id":69,"cShowCaption":"非原单退货取会员价","groupcode":"bo0104","ordernum":105,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"NoFormerBackGetMemberPrice","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'retailMustChooseEmployee':new cb.models.ListModel({"id":70,"cShowCaption":"开单必须选择营业员","groupcode":"bo0104","ordernum":110,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"retailMustChooseEmployee","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'executeProductAndSecKillProm':new cb.models.ListModel({"id":71,"cShowCaption":"自动执行商品和秒杀促销","groupcode":"bo0104","ordernum":115,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"executeProductAndSecKillProm","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'leagueStorePriceDimension':new cb.models.ListModel({"id":74,"cShowCaption":"加盟店取价维度","groupcode":"bo0104","ordernum":120,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"客户\",\"2\":\"组织\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"客户\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"组织\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_priceDimension","pubts":"2019-03-08 00:26:29","ideleted":0,"cAlign":"right","cItemName":"leagueStorePriceDimension","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'LowestPriceControl':new cb.models.ListModel({"id":87,"cShowCaption":"启用最低售价控制","groupcode":"bo0104","ordernum":125,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-03-08 00:26:28","ideleted":0,"cAlign":"right","cItemName":"LowestPriceControl","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'isUseStorageCard':new cb.models.ListModel({"id":97,"cShowCaption":"启用储值卡业务","groupcode":"bo0104","ordernum":150,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2019-04-12 23:03:26","ideleted":0,"cAlign":"right","cItemName":"isUseStorageCard","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'storageDefaultTemplate':new cb.models.ListModel({"id":98,"cShowCaption":"充值默认打印模板","groupcode":"bo0104","ordernum":155,"maxlength":255,"fieldtype":"String","bEnum":false,"bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"select","pubts":"2019-04-12 23:03:27","ideleted":0,"cAlign":"right","cItemName":"storageDefaultTemplate","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'storageCardUseStyle':new cb.models.ListModel({"id":99,"cShowCaption":"储值卡使用方式","groupcode":"bo0104","ordernum":160,"maxlength":255,"fieldtype":"String","bEnum":true,"cEnumString":"{\"1\":\"手工录入\",\"2\":\"刷卡\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"手工录入\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"刷卡\",\"key\":\"2\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_storageCardUseStyle","pubts":"2019-04-12 23:03:27","ideleted":0,"cAlign":"right","cItemName":"storageCardUseStyle","optionId":"business_option","isStoreAdjust":true,"bCanModify":true}),
            
              
              'isUseCostCalculation':new cb.models.ListModel({"id":75,"cShowCaption":"启用成本计算","groupcode":"bo0106","ordernum":1,"maxlength":255,"fieldtype":"Boolean","bEnum":true,"cEnumString":"{\"true\":\"是\",\"false\":\"否\"}","enumArray":"[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]","bmustselect":false,"bhidden":false,"bcheck":false,"cControlType":"radio","cEnumType":"aa_boolean","pubts":"2018-09-17 16:22:41","ideleted":0,"cAlign":"right","cItemName":"isUseCostCalculation","optionId":"business_option","isStoreAdjust":false,"bCanModify":true}),
            
              
              'btnSave':new cb.models.SimpleModel({"tenant_id":604466382606592,"sysid":531498,"auth_level":3,"cShowCaption":"确定","command":"cmdSave","subid":"AA","toolbar":"footertoolbar","bMerge":false,"system":0,"cControlType":"primarybutton","billnumber":"business_option","authcontrol":true,"id":2665635,"pubts":"2018-03-04 00:15:00","cItemName":"btnSave","iStyle":0,"order":1,"cCaption":"确定","needClear":false}),
            
              
              'btnCancel':new cb.models.SimpleModel({"tenant_id":604466382606592,"sysid":531499,"auth_level":3,"cShowCaption":"取消","command":"cmdAbandon","subid":"AA","toolbar":"footertoolbar","bMerge":false,"system":0,"cControlType":"button","billnumber":"business_option","authcontrol":true,"id":2665636,"pubts":"2018-03-04 00:15:00","cItemName":"btnCancel","iStyle":0,"order":2,"cCaption":"取消","needClear":false}),
            
          };
          this.setData(fields);
          this.setDirty(false);

  

            var billType = "option";
            var biz ;
            if(billType == 'option' || billType == 'freeview'){
              biz= cb.biz.common.option
            }else{
              biz= cb.biz.common.voucher
            }

            
    //common events start
    //actions
    
      _this.allActions = [{"subid":"AA","tenant_id":604466382606592,"system":0,"cAction":"save","cHttpMethod":"POST","billnumber":"business_option","parameter":"","cCommand":"cmdSave","cSvcUrl":"/option/updateOption.do","id":2665635,"pubts":"2018-03-04 00:15:00","target":"","sysid":531498,"auth_level":3,"cShowCaption":"确定","command":"cmdSave","toolbar":"footertoolbar","bMerge":false,"cControlType":"primarybutton","authcontrol":true,"cItemName":"btnSave","iStyle":0,"order":1,"cCaption":"确定","needClear":false},{"subid":"AA","tenant_id":604466382606592,"system":0,"cAction":"abandon","cHttpMethod":"GET","billnumber":"business_option","cCommand":"cmdAbandon","cSvcUrl":"/option/cancel.do","id":2665636,"pubts":"2018-03-04 00:15:00","sysid":531499,"auth_level":3,"cShowCaption":"取消","command":"cmdAbandon","toolbar":"footertoolbar","bMerge":false,"cControlType":"button","authcontrol":true,"cItemName":"btnCancel","iStyle":0,"order":2,"cCaption":"取消","needClear":false}];
    
    
      
          
          _this.get('btnSave').on('click',function(params){
            var args = cb.utils.extend(true, {}, {"subid":"AA","tenant_id":604466382606592,"system":0,"cAction":"save","cHttpMethod":"POST","billnumber":"business_option","parameter":"","cCommand":"cmdSave","cSvcUrl":"/option/updateOption.do","id":2665635,"pubts":"2018-03-04 00:15:00","target":"","sysid":531498,"auth_level":3,"cShowCaption":"确定","command":"cmdSave","toolbar":"footertoolbar","bMerge":false,"cControlType":"primarybutton","authcontrol":true,"cItemName":"btnSave","iStyle":0,"order":1,"cCaption":"确定","needClear":false}, { key: 'btnSave'},{ params: params });
            
            var self = this;
            args.disabledCallback = function () {
              self.setDisabled(true);
            }
            args.enabledCallback = function () {
              self.setDisabled(false);
            }
            
            biz.do('save',_this, args)
          });
      
          
          _this.get('btnCancel').on('click',function(params){
            var args = cb.utils.extend(true, {}, {"subid":"AA","tenant_id":604466382606592,"system":0,"cAction":"abandon","cHttpMethod":"GET","billnumber":"business_option","cCommand":"cmdAbandon","cSvcUrl":"/option/cancel.do","id":2665636,"pubts":"2018-03-04 00:15:00","sysid":531499,"auth_level":3,"cShowCaption":"取消","command":"cmdAbandon","toolbar":"footertoolbar","bMerge":false,"cControlType":"button","authcontrol":true,"cItemName":"btnCancel","iStyle":0,"order":2,"cCaption":"取消","needClear":false}, { key: 'btnCancel'},{ params: params });
            
            var self = this;
            args.disabledCallback = function () {
              self.setDisabled(true);
            }
            args.enabledCallback = function () {
              self.setDisabled(false);
            }
            
            biz.do('abandon',_this, args)
          });
      
    
    
      //check
      
    

    _this.on('columnSetting',function(params){
      biz.do('columnSetting',_this,params);
    });
    //common events end
  

            var girdModelKeys = []
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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_business_option_VM_Extend']){
        //   console.info('%c AA_business_option_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_business_option_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_business_option_VM.Extend.js';
        cb.require([extendFile], function (extend){
          console.info('%c AA_business_option_VM_Extend extendjs doAction', 'color:green');
          extend.doAction("init", self);
          self.execute('extendReady',self);
        }, function(error){
          console.info('%c 未找到  ' + extendFile , 'font-size:12pt;color:#860786');
          console.info('%c extendVmName-->AA_business_option_VM_Extend','font-size:12pt;color:#860786')
          self.execute('extendReady',self);
        });
	    };

    return model;
  });

  
    
})
```

