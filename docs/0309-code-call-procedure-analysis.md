# 代码调用过程分析


基于元数据的后端开发框架<br />
基于MVVM的前端开发框架

<a name="7db78f3b"></a>
## 前端加载

前端模板加载过程

<a name="51ae9800"></a>
### 时序图

模板加载接口调用过程时序图

```
visits->meta: 探视访问 req:token...
meta-->visits: 正常访问
meta->getFilterBase: 获取元数据 req:menuId...
getFilterBase-->visits: 返回viewmata、vm
getFilterBase->getSolutionList: 描述
getSolutionList->solutionFilters: 描述
solutionFilters->list: 描述
Note right of list: 描述
```

- visits<br />
GET URL：<br />
[https://retail.yonyoucloud.com/uniform/commonfuctions/visits?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd&menuCode=ST0104](https://retail.yonyoucloud.com/uniform/commonfuctions/visits?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd&menuCode=ST0104)<br />
返回结果：<br />
{"code":200,"message":"操作成功"}
- meta<br />
POST URL：<br />
[https://retail.yonyoucloud.com/meta?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd](https://retail.yonyoucloud.com/meta?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd)<br />
请求参数：<br />
{level: 2, tenant: 604466382606592, isShopRelated: false, name: "采购入库", code: "ST0104", isDeleted: 0,…}<br />
返回结果：<br />
viewmeta和vm
- getFilterBase<br />
GET URL：<br />
[https://retail.yonyoucloud.com/uniform/filterDesign/getFilterBase?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd&filterId=3587472](https://retail.yonyoucloud.com/uniform/filterDesign/getFilterBase?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd&filterId=3587472)<br />
返回结果：<br />
{"code":200,"message":"操作成功","data":{"id":3587472,"filterName":"st_purinrecordlist","filterDesc":"采购入库单过滤","subId":"ST","createTime":"2018-05-30 00:20:45","isUpGrade":0,"advanceSupport":0,"dr":0}}
- getSolutionList<br />
POST URL：<br />
[https://retail.yonyoucloud.com/uniform/filterDesign/getSolutionList?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd](https://retail.yonyoucloud.com/uniform/filterDesign/getSolutionList?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd)<br />
请求参数：<br />
{filterId: "3587472"}<br />
返回结果：<br />
{"code":200,"message":"操作成功","data":[{"id":2860404,"filtersId":3587472,"solutionName":"st_purinrecordlist","isDefault":1,"isPublic":1,"userId":0,"orderId":0}]}
- solutionFilters<br />
GET URL：<br />
[https://retail.yonyoucloud.com/uniform/filter/2860404/solutionFilters?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd&solutionid=2860404](https://retail.yonyoucloud.com/uniform/filter/2860404/solutionFilters?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd&solutionid=2860404)<br />
返回结果：<br />
{"code":200,"message":"操作成功","data":{"AllFilterModel":[{"filtersId":3587472,...}
- list<br />
POST URL：<br />
[https://retail.yonyoucloud.com/uniform/bill/list?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd](https://retail.yonyoucloud.com/uniform/bill/list?terminalType=1&token=6f50263ac8e74f48a0ea0ec28b2cd4cd)<br />
请求参数：<br />
{page: {pageSize: 10, pageIndex: 1}, billnum: "st_purinrecordlist", condition: {,…}, isDistinct: true}<br />
返回结果：<br />
{"code":200,"message":"操作成功","data":{"pageIndex":1,"pageSize":10,"recordCount":0,"recordList":[],"sumRecordList":[],"pageCount":0,"beginPageIndex":1,"endPageIndex":0}}


> 来源：[https://app.yinxiang.com/shard/s64/sh/7d87c5c4-bf5b-46b8-902f-2dded87fe0ca/106e4dc09e66df05def1dad40212c9ae](https://app.yinxiang.com/shard/s64/sh/7d87c5c4-bf5b-46b8-902f-2dded87fe0ca/106e4dc09e66df05def1dad40212c9ae)

