# 树卡支持浏览态、卡片子表编辑

<a name="rgvsu"></a>
## 1、Excel配置
配置[bill_base]的cBillType属性为TreeVoucher

<a name="DcM0x"></a>
## 2、更新yxyweb代码

<a name="NLKwm"></a>
## 3、修改代码
在DynamicView 86行代码后面添加

```javascript
data.params.metaType = billtype;
```
如下图：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/271337/1560416977220-0485c064-27f0-459f-a461-bf2199e4205e.png#align=left&display=inline&height=350&name=image.png&originHeight=350&originWidth=1594&size=105344&status=done&width=1594)

<a name="IsAQ8"></a>
## 4、访问地址
部门树卡<br />[https://u8corg-daily.yyuap.com/meta/treevoucher/bd_admindepttree](https://u8corg-daily.yyuap.com/meta/voucherlist/bd_admindepttree)

<a name="VSXeK"></a>
## 5、按钮状态
1、按钮状态配置请参考《[工具栏、状态预置](https://www.yuque.com/gpgy5k/ucf/yug94g)》文档<br />2、其它问题请写扩展代码控制
