# 解析组件流程

- 获取UI组件
<br />根据cControlType值，跟basic中的组件名称比较，一致的话则为当前组件内容。
<br />**注意**：文件名称都是小写
- 获取组件对应的Model
<br />通过containerModel的_get_data方法根据control.cItemName值获取当前组件对应的Model。
<br />注册model时的data传入进去，根据这个data的name属性值和control.cItemName匹配的.这块儿是在node端处理的。

```javascript
vmmeta.entities.forEach(function (val) {
   ......
         let key = item.cItemName;
         let field = {
           name: key
         };
         const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
         const model = ControlType2ModelType[ctrlType] || 'SimpleModel';
         field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
         field.modelType = model;
         fields.push(field);
  ......
 });
```

将获取的Model 作为属性传入到组件中

- UI和Model是如何绑定起来
  - 在ControlType2ModelType对象（在common/helpers/env这里定义）中，根据cControlType值获取所对应的Model一一对应起来，默认是SimpleModel
```json
ControlType2ModelType: {
    refer: 'ReferModel',
    treerefer: 'ReferModel',
    listrefer: 'ReferModel',
    select: 'ListModel',
    radio: 'ListModel',
    dropdown: 'ListModel',
    checkboxenum: 'ListModel'
  }
```
