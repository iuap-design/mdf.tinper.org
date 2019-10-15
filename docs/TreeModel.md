<a name="eo0aB"></a>
## 方法
<a name="ALxAI"></a>
### setDataSource(proxyConfig, queryParams, callback)
**说明**：如果TreeModel中dataSourceMode为local则proxyConfig参数传递为真实数据。<br />否则proxyConfig参数传递服务请求地址，queryParams传递请求参数，callback传递回调函数。
```javascript
//dataSourceMode为local
model.setDataSource(TreeData)
//dataSourceMode不为local
model. setDataSource(‘bill/list.do’,{‘id’:1},function(result){})
```

<a name="Lqite"></a>
### addNode(node, parentKey)
**说明**：添加树节点方法<br />**入参**：node为要添加的节点<br />        parentKey为要添加的节点的父节点<br />**注意事项**：parentKey为可选参数，表示要添加的节点是根节点还是存在父节点
<a name="KKMZ5"></a>
### deleteNode(key)
**说明**：删除节点<br />**入参**：key为要删除的节点的key值
<a name="C4xzM"></a>
### updateNode(node)
**说明**：更新节点<br />**入参**：node为要更新的节点
<a name="52RHB"></a>
### select(selectedKeys)
**说明**：设置选中的树节点<br />**入参**：selectedKeys树节点的key值 可为数组
<a name="VIo3n"></a>
### getSelectedNodes()
**说明**：获取已选中的树节点
<a name="gWCRP"></a>
### getSelectedKeys()
**说明**：获取已选中树节点的key值
<a name="5WKT8"></a>
### check(checkedKeys)
**说明**：当树组件的checkable属性为true时，才会在树组件中显示选中框。该方法为设置勾选树节点<br />**入参**：checkedKeys需要勾选的树节点key值
<a name="SOMVo"></a>
### getCheckedNodes()
**说明**：获取已勾选的树节点
<a name="anB5g"></a>
### getCheckedKeys()
**说明**：获取已勾选的树节点的key值
<a name="fEjdz"></a>
## 事件
<a name="K0c1C"></a>
### beforeSetDataSource
**说明**：DataSource改变前事件，返回true则继续进行DataSource的改变，返回false则终止DataSource的改变
```javascript
viewmodel.get(propertyName).on(' beforeSetDataSource,function (data) {
                               return true;
                               });
```
 
<a name="z7D4f"></a>
### afterSetDataSource
**说明**：DataSource改变后事件
```javascript
viewmodel.get(propertyName).on(' afterSetDataSource,function (data) {});
```
 
<a name="pU6U1"></a>
### beforeSelect
**说明**：select选择前事件， 返回true则继续进行select的改变，返回false则终止select的改变
```javascript
//例：示例中的data为select选中数据
viewmodel.get(propertyName).on(' beforeSelect,function (data) {
                                return true;
                              });
```

<a name="uWupY"></a>
### afterSelect
**说明**：select选择后事件
```javascript
//例：示例中的data为select选中数据
viewmodel.get(propertyName).on(' afterSelect, function(data) {});
```
 
<a name="c6qWi"></a>
### beforeCheck
**说明**：点击选择框check选中前事件,返回true则继续进行check的改变，返回false则终止check的改变
```javascript
//例：示例中的data为check选中数据
viewmodel.get(propertyName).on(' beforeCheck,function (data) {
                               return true;
                               });
```
<a name="xRuEj"></a>
### afterCheck
**说明**：点击选择框check选中后事件
```javascript
//例：示例中的data为check选中数据
viewmodel.get(propertyName).on(' afterCheck,function (data) {});
```