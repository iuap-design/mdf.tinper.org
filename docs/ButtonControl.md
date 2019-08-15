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
## 参数说明

<a name="props"></a>
### props
| 属性 | 类型 | 说明 |
| --- | --- | --- |
| model | object | MVVM 中的模型对象 |
| cStyle |  | 组件的cStyle 属性和元数据中的cStyle属性会在组件中选择性的进行合并处理。 |
| <br />cParameter<br /> |  |  |
| disabled |  |  |
| value |  |  |
| type |  |  |
| shape | string | 设置按钮形状，可选值为 circle circle-outline 或者不设  |
| className |  |  |
| onClick | function | <br />click 事件的 handler<br /> |
| onVisibleChange |  |  |
| iStyle |  |  |
| delay |  |  |
| icon | string | <br />设置按钮的图标类型<br /> |

<a name="a3d61cc7"></a>
### model 模型API

描述 `this.props.model`  参数的 API 使用情况，并需要区分传入进来的是哪类模型对象，如 BaseModel、GridModel 等。这里需要链接到对应的 Model。

| API |  |  |  |
| --- | --- | --- | --- |
| addListener |  |  |  |
| <br />removeListener<br /> |  |  |  |
| fireEvent |  |  |  |

<a name="3fd673dc"></a>
## 组件 UI 元数据

单纯梳理UI元数据中是通过哪些字段来描述该组件，并逐步区分公共字段属性和组件专属字段属性。

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

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| icon | string | 按钮前的图标 |
| cShowCaption |  | 按钮显示的title |
| cControlType |  | 该值为button时，为按钮组件<br />primarybutton时，为红色按钮组件 |
| cItemName |  | 属性名称，该值与viewModel中allActions中的cItemName匹配按钮的事件 |


