<a name="7650efbf"></a>
###### 目前，mdf框架支持ncc风格，并且针对ncc风格做了一些改动，包括添加和修改组件，修改viewmodel，修改样式，excel配置，扩展脚本配置等。根据不同区域，列出了特性修改和需要做的适配方案

<a name="7ec56668"></a>
##### 过滤区

<a name="a33a658c"></a>
###### 过滤区做了以下特性的修改：

1. 过滤区支持收起

    描述：<br />

  - 过滤区支持收起操作，并将已选查询条件简易信息展示出来，鼠标移动到该处会显示详细信息；
<a name="a390aff1"></a>
######     配置：

  - 无需配置，默认支持
2. 过滤区过滤项和按钮显示

   描述：<br />

  - 过滤区一行支持5个配置项，不提供修改，屏幕分辨率小于1440时，过滤项的宽度不在改变；
  - 增加清空按钮，点击清空按钮，已选项置空。Tips：已经设置disabled的过滤项不会置空；
<a name="a390aff1-1"></a>
######    配置：

  - 无需配置，默认支持
3. 过滤区是否主动加载列表
<a name="4a4e3b5a-2"></a>
###### 描述：
    首次加载页面默认不主动查询列表数据，可做配置修改<br />配置：

   默认不加载，可以在扩展脚本中修改该值
```
let params=viewmodel.getParams();
            //设置成false
   		  params.autoLoad=false;
   			viewmodel._set_data('params', params, true);
 ````
```

4. 高级查询

<a name="4a4e3b5a-3"></a>
###### 描述：

- 添加ncc风格的高级查询组件，添加预置方案，支持方案的更改，新建，和删除功能，不支持设置默认方案 。
- 高级查询候选条件配置，候选条件支持树形嵌套，对于空节点，在候选过滤项中的extendField中配置{"parentTitle":"关联资产.资产卡片”}，用来配置节点名称

<a name="224e2ccd"></a>
###### 配置
无需配置，默认支持

5. 过滤区数据处理

<a name="4a4e3b5a-4"></a>
###### 描述：

- 过滤区和高级查询区提供‘handleSchemeData’方法，用于处理查询方案数据，可在扩展脚本中配置
- 高级查询区设置方案时，提供'afterschemeListChange'支持过滤项关联设置

<a name="a390aff1-3"></a>
###### 配置：

- 数据处理配置：

```
viewmodel.on('handleSchemeData', (id, data, callback) => {
 			// id是查询方案id data是查询方案数据 callback是回调函数，把修改的data传回去即可
 			// 由于查询方案是租户级的 需要控制查询方案中组织的可见性
 			if (data && data.length > 0) {
 				let orgs = cb.rest.AppContext.orgs; // 有权限的组织主键
 				data.map((filterItem) => {
 					let value1 = filterItem && filterItem.value1; // 查询项的值
 					let filterCode = filterItem && filterItem.itemName; // 查询项的名称
 					if (filterCode == itemCode) {
 						// 如果是资产组织 处理
 						let realValue = '';
 						let valueField = 'value1';
 						if (value1 == null || value1 == undefined || value1.length == 0) {
 							value1 = filterItem && filterItem.defaultVal1;
 							valueField = 'defaultVal1';
 						}
 						// 获取的值是字符串形式：value1,value2,value3
 						let values = value1 && value1.split(',');
 						if (values) {
 							values.map((value) => {
 								if (value != '#mainorg#') {
 									if (orgs.includes(value)) {
 										realValue = `${realValue},${value}`;
 									}
 								} else {
 									realValue = `${realValue},${value}`;
 								}
 							});
 							// 回写有权限的组织
 							realValue = realValue.substring(1);
 							filterItem[valueField] = realValue;
 						}
 					}
 				});
 			}
 			// 回调
 			callback(data);
 		});
```

- 过滤项关联配置
```
viewmodel.on('afterschemeListChange',          function(list) {
			let filterModal = viewmodel.get('filterModal');
			if (filterModal && list.length > 0) {
				list.forEach((item) => {
					let schemeModel = filterModal.get(item.id);
					if (schemeModel) {
						let orgModel = schemeModel.get(itemCode) && schemeModel.get(itemCode).getFromModel();
						if (orgModel) {
							let orgIds = cb.rest.AppContext.orgs;
							orgModel.on('beforeBrowse', function(data) {
								var conditionBustype = {
									isExtend: true,
									simpleVOs: []
								};
								conditionBustype.simpleVOs.push({
									field: 'id',
									op: 'in',
									value1: orgIds
								});
								orgModel.setTreeFilter(conditionBustype);
							});
						}
						if (otherOrg && otherOrg.length > 0) {
							for (let i = 0; i < otherOrg.length; i++) {
								let otherModel =
									schemeModel.get(otherOrg[i]) && schemeModel.get(otherOrg[i]).getFromModel();
								otherModel &&
									otherModel.on('beforeBrowse', function(data) {
										let orgIds = cb.rest.AppContext.orgs;
										var conditionBustype = {
											isExtend: true,
											simpleVOs: []
										};
										conditionBustype.simpleVOs.push({
											field: 'id',
											op: 'in',
											value1: orgIds
										});
										otherModel.setTreeFilter(conditionBustype);
									});
							}
						}
					}
				});
			}
		     });
```

<a name="d9f6c4cf"></a>
##### 参照

1. 支持模糊搜索

<a name="4a4e3b5a-5"></a>
###### 描述：

- 参照输入框直接输入搜索项，支持模糊匹配

<a name="a390aff1-4"></a>
###### 配置：

- 无需配置，默认支持

2. 支持函数配置

<a name="4a4e3b5a-6"></a>
###### 描述：

- 参照可配置函数，用于快速设置参照值

<a name="a390aff1-5"></a>
###### 配置：

- excel参照配置项的extendFeild中，做一下类似配置

```
{"usefunc":true,"sysfunc":[{"code":"mainorg","name":"默认主组织"}]}
```

- 需要在扩展文件中做配置，类似一下代码

```
initContext: function(viewmodel) {
   		if (
   			JSON.stringify(cb.rest.AppContext.user) != '{}' &&
   			cb.rest.AppContext.user != null &&
   			cb.rest.AppContext.user != undefined
   		) {
   			return;
   		}
   		let params = {
   			cSvcUrl: '/billext/getcontext',
   			options: { async: false }
   		};

   		let data = {
   			billnum: 'common',
   			data: {}
   		};
   		let callback = (err, suc) => {
   			if (!suc) return false;
   			let { user, tenant } = suc;
   			if (JSON.stringify(user) != '{}' && user != null && user != undefined) {
   				cb.rest.AppContext.user = user;
   				// 业务日期
   				cb.rest.AppContext.user.busiDate = this.getBusiDate();
   				// 默认主组织
   				cb.rest.AppContext.mainorg = user.userMainOrg;
   				// 有权限组织主键
   				cb.rest.AppContext.orgs = user.orgs;
   				// 有权限的组织对象
   				cb.rest.AppContext.orgObjs = user.userAssetOrgs;
   				// 默认操作员
   				cb.rest.AppContext.operator = cb.rest.AppContext.user;
   				// 默认业务员
   				cb.rest.AppContext.busioperator = {};
   				cb.rest.AppContext.busioperator.id = user.psnId;
   				cb.rest.AppContext.busioperator.name = user.psnName;
   				cb.rest.AppContext.busioperator.code = user.psnCode;
   			}
   			if (JSON.stringify(tenant) != '{}' && tenant != null && tenant != undefined) {
   				cb.rest.AppContext.tenant = tenant;
   			}
   		};
   		this.doProxy(params, callback, data);
   	},
```

3. 支持已选

<a name="4a4e3b5a-7"></a>
###### 描述：

- 参照弹框中添加已选项

<a name="a390aff1-6"></a>
###### 配置：

- 无需配置，默认支持

4. 多选树参照添加更多选项

<a name="4a4e3b5a-8"></a>
###### 描述：

- 多选树参照添加更多选用，用于相同层级节点展开收起，选中功能；

<a name="a390aff1-7"></a>
###### 配置：

- 无需配置，默认支持

5. 树参照和树表参照支持包含下级配置 （后端同学同样需要特殊处理）

<a name="4a4e3b5a-9"></a>
###### 描述：

- 支持勾选时是否包含下级配置

<a name="a390aff1-8"></a>
###### 配置：

- 参照配置项的extendFeild中添加{"includeChildren":true}

6. 参照支持显示停用配置（后端同学同样需要特殊处理）

<a name="4a4e3b5a-10"></a>
###### 描述：

- 是否显示已经停用项

<a name="a390aff1-9"></a>
###### 配置：

- 参照配置项的extendField中添加{"isShowDisabledData":true}

7. 树参照支持执行时包含下级配置（后端同学同样需要特殊处理）

<a name="4a4e3b5a-11"></a>
###### 描述：

- 执行时包含下级，后台筛选数据时会包含下级节点

<a name="a390aff1-10"></a>
###### 配置：

- 参照配置项的extendField中添加{"isRunWithChildren":true}

8. 树参照支持只勾选末级节点配置

<a name="4a4e3b5a-12"></a>
###### 描述：

- 执行时包含下级，后台筛选数据时会包含下级节点

<a name="a390aff1-11"></a>
###### 配置：

- 参照配置项的extendField中添加{"onlyLeafCanSelect":true}

9. 参照添加全屏显示

<a name="4a4e3b5a-13"></a>
###### 描述：

- 参照默认添加全屏展示

<a name="a390aff1-12"></a>
###### 配置：

- 无需配置，默认支持

10. 参照添加刷新按钮

<a name="4a4e3b5a-14"></a>
###### 描述：

- 参照弹框默认添加刷新按钮

<a name="a390aff1-13"></a>
###### 配置：

- 无需配置，默认支持

11. 参照添加双击选中

<a name="4a4e3b5a-15"></a>
###### 描述：

参照默认添加了双击选中功能。

<a name="a390aff1-14"></a>
###### 配置：

无需配置，默认支持

<a name="a0a31788"></a>
##### 列表页标题

新增列表页标题组件listPageHeader

<a name="3bdd08ad"></a>
###### 描述

新增列表页标题组件listPageHeader，支持页面图标，页面名称，配置；

<a name="a390aff1-15"></a>
###### 配置：

需要在excele的[billtplgroup_base]中配置listPageHeader组件，在lisPageHeader中配置左右toolbar

<a name="13a05e9c"></a>
##### 快速查询区

单表页面添加快速查询区，替代普通过滤区

<a name="3bdd08ad-1"></a>
###### 描述

快速查询区用于快速对列表页面过滤，过滤项值改变出发对列表数据的过滤；

<a name="224e2ccd-1"></a>
###### 配置

需要在excel的listPageHeader中配置simpleconvenientquery组件

<a name="96adc17b"></a>
##### 单表去除分页控件

<a name="3bdd08ad-2"></a>
##### 描述

```
单表表体，默认查询50条数据，不足50条数据无分页空间
```

<a name="224e2ccd-2"></a>
##### 配置

```
无需配置，默认支持
```

<a name="893465f2"></a>
##### 表格添加最大化按钮

<a name="3bdd08ad-3"></a>
##### 描述

增加子表的放大缩小功能；

<a name="224e2ccd-3"></a>
##### 配置

无需配置，默认支持