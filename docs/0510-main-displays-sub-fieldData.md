# 主表显示子表字段数据

1. 在请求uniform/bill/list里加isSum  配置为true

目的：后端UIMetaUtils会根据isSuM来执行<br />

2. excel里配置列表的billitem_base里面配置【子实体】的属性列

形如 childEntity.fieldName，例如SODetail.name<br />目的：前端列表显示

3. billitem_base配置sql里的select field，即汇总列

cSumType为group_concat<br />目的：前端显示的形式

4. billitem_base配置sql的groupby列

cSumType为group<br />目的：查询数据时影响groupby
