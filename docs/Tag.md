<a name="9e5ffa06"></a>
## 基本信息
| 组件名称 | Tag |
| --- | --- |
| Version 版本 | - |
| 位置 | mdf-metaui-web/src/components/basic/tag.jsx |
| 功能说明 | 标签 |
| 依赖 | Tinper中的Tag组件 |

<a name="481feccf"></a>
## 如何使用

```javascript
<Tag {...this.props} />
```

<a name="21f2fa80"></a>
## 组件 Props 接口文档

| props 分类 | props 名称 | props 值类型 | 值枚举 | 说明 |
| --- | --- | --- | --- | --- |
| Viewmodel Props | model.addListener | function |  | MVVM 中的模型对象 |
|  | model.removeListener | <br />function<br /> |  | MVVM 中的模型对象 |
|  | model.fireEvent | function |  | MVVM 中的模型对象 |
| UIMeta Props | cStyle |  |  | 组件的cStyle 属性和元数据中的cStyle属性会在组件中选择性的进行合并处理。 |
|  | bIsNull | boolean |  | 是否为Null |
|  | color | string |  | 颜色 |
|  | refReturn |  |  |  |
|  | bCanModify | boolean |  | 是否可以修改 |
|  | readOnly | boolean |  | 是否只读 |
|  | bHidden | boolean |  | 是否隐藏 |
|  | focus | boolean |  | 是否聚焦 |
| UI Props | referClick | function |  | 引用点击事件 |
|  | onClose | function |  | 关闭事件 |
|  | afterOkClick | function |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

<a name="a3d61cc7"></a>
### 
<a name="LASIc"></a>
## UIMeta 示例
```json
{
  "bIsNull": false,
  "color": "#13C2C2",
  "readOnly": false,
  "bHidden": false
}
```