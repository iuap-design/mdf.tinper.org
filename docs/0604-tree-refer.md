# 树(tree)参照的使用

<a name="4ddcf6b7"></a>
# 树参照的使用
<a name="e4a3c0bb"></a>
## 模板参照中树的控制
目前营销云的框架没有提供针对参照编写扩展脚本的能力，目前只能通过参照所在单据获取参照中的TreeModel来控件树的行为。

- 获取参照中TreeModel的方法

```javascript
var deptReferModel = viewmodel.get('dept_id_name');
var treeModel = deptReferModel.getCache('vm').get('tree');
```

- 拦截TreeModel的beforeSelect事件

```javascript
treeModel.on('beforeSelect', function (args) {
  	if('满足选择条件') {
      	return true;
    } else {
      	alert('提示当前节点不可选');
  			return false;
    }
});
```

<a name="9ef137a1"></a>
### 部门参照实例
参照所在单据扩展脚本（positionlist）

```javascript

cb.define(['common/common_VM.Extend.js'], function (common) {
    var bd_position_VM_Extend = {
        doAction: function (name, viewmodel) {
            if (this[name])
                this[name](viewmodel);
        },
        init: function (viewmodel) {
            var deptReferModel = viewmodel.get('dept_id_name');
            var hasInited = false;
            deptReferModel.on('afterBrowse', function () {
                debugger
                var vm = deptReferModel.getCache('vm');
                if (vm && !hasInited) {
                    hasInited = true;
                    vm.get('tree').on('beforeSelect', function (args) {
                        return false;
                    });
                }
            })

        }
    }
    try {
        module.exports = bd_position_VM_Extend;
    } catch (error) {

    }
    return bd_position_VM_Extend;
});
```


<a name="1eb0513f"></a>
## TreeRefer中树的控制
_暂无_
