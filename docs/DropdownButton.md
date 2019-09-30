<a name="9e5ffa06"></a>
## [](https://www.yuque.com/gpgy5k/ucf/neuwsx#9e5ffa06)[](https://www.yuque.com/gpgy5k/ucf/xrqhr5#9e5ffa06)[](https://www.yuque.com/gpgy5k/ucf/sp6vps#9e5ffa06)[](https://www.yuque.com/gpgy5k/ucf/kpxakm#9e5ffa06)基本信息
| 组件名称 | DropdownButton |
| --- | --- |
| Version 版本 | - |
| 位置 | mdf-metaui-web/src/components/basic/dropdownbutton.jsx |
| 功能说明 | 下拉按钮 |
| 依赖 | Tinper中的Dropdown，Button组件 |

<a name="481feccf"></a>
## [](https://www.yuque.com/gpgy5k/ucf/neuwsx#481feccf)[](https://www.yuque.com/gpgy5k/ucf/xrqhr5#481feccf)[](https://www.yuque.com/gpgy5k/ucf/sp6vps#481feccf)[](https://www.yuque.com/gpgy5k/ucf/kpxakm#481feccf)如何使用

```javascript
<DropdownButton {...this.props} />
```

<a name="21f2fa80"></a>
## [](https://www.yuque.com/gpgy5k/ucf/neuwsx#21f2fa80)[](https://www.yuque.com/gpgy5k/ucf/xrqhr5#21f2fa80)[](https://www.yuque.com/gpgy5k/ucf/sp6vps#21f2fa80)[](https://www.yuque.com/gpgy5k/ucf/kpxakm#21f2fa80)组件 Props 接口文档

| props 分类 | props 名称 | props 值类型 | 值枚举 | 说明 |
| --- | --- | --- | --- | --- |
| Viewmodel Props | model.addListener | function |  | MVVM 中的模型对象 |
|  | model.removeListener | <br />function<br /> |  | MVVM 中的模型对象 |
|  | model.fireEvent | function |  | MVVM 中的模型对象 |
| UIMeta Props | cStyle | object |  | 组件的cStyle 属性和元数据中的cStyle属性会在组件中选择性的进行合并处理。 |
|  | cParameter | object |  |  |
|  | controls | array |  | 控件列表 |
|  | bHidden | boolean |  | 是否隐藏 |
|  | cItemName | string |  | 属性名称，该值与viewModel中allActions中的cItemName匹配按钮的事件 |
|  | isEcsuite | boolean |  |  |
|  | Toolbar_Ecsuite_ID | string |  |  |
|  | icon | string |  | 图标 |
|  | className | string |  | 类名 |
|  | value | string |  | 按钮文字 |
|  | iStyle | number |  | 判断显示icon，value或其他 |
| UI Props |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

<a name="a3d61cc7"></a>
### [](https://www.yuque.com/gpgy5k/ucf/neuwsx#a3d61cc7)[](https://www.yuque.com/gpgy5k/ucf/xrqhr5#a3d61cc7)[](https://www.yuque.com/gpgy5k/ucf/sp6vps#a3d61cc7)[](https://www.yuque.com/gpgy5k/ucf/kpxakm#a3d61cc7)
<a name="LASIc"></a>
## [](https://www.yuque.com/gpgy5k/ucf/neuwsx#LASIc)[](https://www.yuque.com/gpgy5k/ucf/xrqhr5#LASIc)[](https://www.yuque.com/gpgy5k/ucf/sp6vps#LASIc)[](https://www.yuque.com/gpgy5k/ucf/kpxakm#LASIc)UIMeta 示例
```json
{
  "value": "提交",
  "isEcsuite": false,
  "icon": "uf-submit",
  "className": "btn-submit"
}
```