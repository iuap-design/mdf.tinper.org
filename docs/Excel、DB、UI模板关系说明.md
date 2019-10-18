> 创建者：勾成图
> 创建时间：2019-7-17
> 修改者：
> 修改时间：


<a name="Ki8L4"></a>
# 1. Excel、DB、UI模板之间的关系

- excel每一个部分对应DB中的Table，发布时会将excel中的数据写入对应table
- excel每一列对应table的一个Colum
- 一个完整的模板是由这N个table共同来描述的
- bill_base表达单据bill，billentity_base表达单据对应的实体，billtemplate_base表达该bill的模板 
  - bill:billentity关系为1:N，
  - bill:billtemplate的关系为1:N(例如某些特殊场景下的表单的浏览态和编辑态)
  - cBillNo - 表单编码（请求模板元数据时的参数）
  - cSubId - 子产品ID
  - iDefTplId - 默认模板（当多模板时有用）
  - iDefPrnTplId - 默认打印
  - cBillType - 取值为Voucher、VoucherList等，影响前端运行时
  - cFileterId - 过滤器ID
  - bAllowMultiTpl - 是否允许多模板
- billtplgroup_base表达分组（容器）
  - iParentID表达父分组（容器），
  - iBillId表达该分组隶属哪个表单ID，    
  - iTplId表达该分组所在模板ID
- billitem_base表达分组（容器）内的子控件，
  - iBillId - 所属表单ID
  - iBillEntityId - 对应的模板里定义的Entity
  - iTplId - 所属模板
  - iBillTplGroup - 该子控件所在分组（容器）的ID
  - cSubId   - 子产品
- toolbar是一种特定类型容器，
  - parent - 该toolbar所在的分组容器编码
  - toolbaritem使用iparent来表达父亲
- toolbaritem
  - billnumber - 表单编码
  - toolbar- 该toolbaritem所在的toolbar编码

<a name="67d9e13e"></a>
# 2. 组织多卡片分析
<a name="25a68d79"></a>
### 需求：

1. 该页面由3个Card自上而下组成
1. 三个Card依次为基础组织（baseOrg）、行政组织（amdinOrg）、财富组织（financeOrg）
<a name="25d62f55"></a>
### 抽象：

1. 此需求实质上是一个1个（billno）模板上自上而下有3个Card，本质上是一个单据详情（Voucher）模板上有3个容器。
1. 这个三个容器对应的Entity彼此是由关系（1：1：1）的，因此可以使用通用CRUD来数据加载，因此模板类型为Voucher
<a name="d8e0ccc4"></a>
# 3. Excel对应的UI图层关系


![adminOrg.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271336/1554107925145-7ae19921-831c-4fbe-af4d-e354ae1d0b65.png#align=left&display=inline&height=757&name=adminOrg.png&originHeight=1158&originWidth=1141&search=&size=145001&status=done&width=746)

<a name="rZZpM"></a>
# 4. 返讲视频