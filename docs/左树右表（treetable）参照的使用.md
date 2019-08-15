<a name="zZf3Q"></a>
## cTpltype: TreeTable
<a name="ogjBj"></a>
## referViewModel中model定义

- treeModel
```javascript
  tree: new cb.models.TreeModel({ keyField: 'code', 
                                 titleField: 'name', 
                                 multiple: this.getParams().multiple }),
```
this.getParams()会有refCode, multiple, where信息

- gridModel 

```javascript
table: new cb.models.GridModel({
        showAggregates: false, //是否显示合计
        multiple: this.getParams().multiple,//是否多选
        dataSourceMode: 'remote',
        override: cb.rest.interMode === 'touch' ? false : true,
        pageInfo: {
          pageSize: pageSize,
          pageIndex: 1
        }
      })
```
具体参数请参考[表参照](https://www.yuque.com/gpgy5k/ucf/qu92n0)。
<a name="KZsXE"></a>
## 获取模态框中的tree组件、table组件，请参考[这里](https://www.yuque.com/gpgy5k/ucf/vs2ccq#ArvUN)



<a name="cmQ68"></a>
## 
<a name="DpR39"></a>
## 优化点

- 在左树右表中，multiple属性共用一份儿数据，这样表格和树要么都是多选要么都是单选，不灵活