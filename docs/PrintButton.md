<a name="9e5ffa06"></a>
## 基本信息
| 组件名称 | PrintButton |
| --- | --- |
| Version 版本 | - |
| 位置 | 对Print组件的封装 |
| 功能说明 | 打印按钮 |
| 依赖 |  |

<a name="481feccf"></a>
## 如何使用

```javascript
<PrintButton {...this.props} />
```

<a name="21f2fa80"></a>
## 组件 Props 接口文档

| props 分类 | props 名称 | props 值类型 | 值枚举 | 说明 |
| --- | --- | --- | --- | --- |
| Viewmodel Props | model.addListener | function |  | MVVM 中的模型对象 |
|  | model.removeListener | <br />function<br /> |  | MVVM 中的模型对象 |
|  | model.fireEvent | function |  | MVVM 中的模型对象 |
| UIMeta Props | cStyle | object |  | 组件的cStyle 属性和元数据中的cStyle属性会在组件中选择性的进行合并处理。 |
|  | cParameter | object |  |  |
|  | cItemName | string |  | 属性名称，该值与viewModel中allActions中的cItemName匹配按钮的事件 |
|  | icon | string |  | 图标 |
|  | className | string |  | 类名 |
|  | value | string |  | 按钮文字 |
| UI Props | onVisibleChange | function |  | 显示改变事件 |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

<a name="a3d61cc7"></a>
### 
<a name="LASIc"></a>
## UIMeta 示例
```json
{
  "icon": "uf-print",
  "className": "print-custom",
  "value": "打印"
}
```