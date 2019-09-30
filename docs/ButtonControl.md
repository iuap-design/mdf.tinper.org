<a name="9e5ffa06"></a>
## 基本信息
| 组件名称 | ButtonControl |
| --- | --- |
| Version 版本 | - |
| 位置 | yxyweb/common/components/basic/button.jsx |
| 功能说明 | 支持 debounce 双击； |
| 依赖 | Antd中的Button组件 |

<a name="481feccf"></a>
## 如何使用

```javascript
<ButtonControl {...this.props} />
```

<a name="21f2fa80"></a>
## 组件 Props 接口文档

| props 分类 | props 名称 | props 值类型 | 值枚举 | 说明 |
| --- | --- | --- | --- | --- |
| Viewmodel Props | model.addListener | function |  | MVVM 中的模型对象 |
|  | model.removeListener | <br />function<br /> |  | MVVM 中的模型对象 |
|  | model.fireEvent | function |  | MVVM 中的模型对象 |
| UIMeta Props | cStyle |  |  | 组件的cStyle 属性和元数据中的cStyle属性会在组件中选择性的进行合并处理。 |
|  | <br />cParameter<br /> |  |  |  |
|  | disabled |  |  |  |
|  | value |  |  |  |
|  | type |  |  |  |
|  | icon | string |  | 按钮前的图标 |
|  | iStyle |  |  |  |
|  | cShowCaption |  |  | 按钮显示的title |
|  | cControlType |  |  | 该值为button时，为按钮组件<br />primarybutton时，为红色按钮组件 |
|  | cItemName |  |  | 属性名称，该值与viewModel中allActions中的cItemName匹配按钮的事件 |
| UI Props | className |  |  |  |
|  | onClick | function |  | <br />click 事件的 handler<br /> |
|  | onVisibleChange |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

<a name="a3d61cc7"></a>
### 
<a name="LASIc"></a>
## UIMeta 示例
```json
{
  "icon": "bianji1",
  "cItemName": "btnEdit",
  "cCaption": "编辑",
  "cShowCaption": "编辑",
  "cControlType": "button",
  "iOrder": 6,
  "iStyle": 0,
  "enterDirection": 0,
  "key": "68897302"
}
```