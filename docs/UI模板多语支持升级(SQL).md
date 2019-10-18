```sql

-- MySQL mdd UI模板多语支持升级

-- 升级 billitem_base
alter table billitem_base add cCaption_resid varchar(200);
alter table billitem_base add cShowCaption_resid varchar(200);

-- 升级 bill_toolbaritem
alter table bill_toolbaritem add text_resid varchar(200);

-- 升级 aa_enum
alter table aa_enum add enumname_resid varchar(200);

-- 升级 pb_filter_solution
alter table pb_filter_solution add solutionName_resid varchar(200);

-- 升级 pb_filter_solution_common
alter table pb_filter_solution_common add itemTitle_resid varchar(200);

-- 升级 pb_meta_filter_item
alter table pb_meta_filter_item add itemTitle_resid varchar(200);

-- 升级 pb_meta_filter_item_ext
alter table pb_meta_filter_item_ext add itemTitle_resid varchar(200);

-- 创建索引
ALTER TABLE `bill_toolbaritem` ADD INDEX idx_multlang_text (`tenant_id`, `text`);
ALTER TABLE `aa_enum` ADD INDEX idx_multlang_enumname (`enumname`);
ALTER TABLE `pb_filter_solution` ADD INDEX idx_multlang_solutionname (`tenant_id`,`solutionName`);
ALTER TABLE `pb_filter_solution_common` ADD INDEX idx_multlang_itemtitle (`tenant_id`,`itemTitle`);
ALTER TABLE `pb_meta_filter_item` ADD INDEX idx_multlang_itemtitle (`itemTitle`);
ALTER TABLE `pb_meta_filter_item_ext` ADD INDEX idx_multlang_itemtitle (`tenant_id`,`itemTitle`);

ALTER TABLE `billitem_base` ADD INDEX idx_multlang_caption (`tenant_id`, `cCaption`);
ALTER TABLE `billitem_base` ADD INDEX idx_multlang_showcaption (`tenant_id`, `cShowCaption`);

```