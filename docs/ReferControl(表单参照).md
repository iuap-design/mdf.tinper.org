<a name="9e5ffa06"></a>
## 基本信息
| 名称 |  ReferControl |
| --- | --- |
| 位置 | yxyweb/common/components/basic/refer.jsx |
| 描述 | 用于表单中参照类型参数的输入采集 |
| 依赖组件 | <br />1. antd中[Input]()、[Icon](https://ant.design/components/icon-cn/)<br />1. 基础组件Label、Row、Col<br />1. 功能组件ReferModal<br /> |
| model | ReferModel 在cube.js中定义 |

<a name="21f2fa80"></a>
## 参数说明
<a name="props"></a>
### props
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| cShowCaption | String | <br />1. label 显示的文本内容，且用来控制是否是用Label组件<br />1. 与readOnly、bIsNull字段共同控制label是否显示必填的 *<br /> |
| bJointQuery | Boolean | 控制label是否可以点击触发 jointQuery事件 |
| cRefType | String | 初始化ReferModel的时候时需要用的的参数，存储在model实例中，用来在初始化referViewModel ，是referViewModel中调用 /ref/getRefMeta 接口的refCode参数 |
|  |  |  |

<a name="state"></a>
### state
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| bIsNull | Boolean | 此字段来自于props.bIsNull，与readOnly、cShowCaption字段共同控制label是否显示必填的 * |
| readOnly | Boolean | 此字段从refModel中通过 |
| modalVisible | Boolean | 控制ReferModal组件的显示隐藏 |
| referType | String | 用来缓存 referViewModel 中的 cTplType 参数 |
| vm | object | 用来缓存 referViewModel 的实例，即 ReferModal 的 model 属性 |

<a name="a233bccd"></a>
### 组件Class关键api

| 名称 | 描述 |
| --- | --- |
| onClick | 此方法中如果model不存在，会初始化一个新的ReferModel实例，然后调用 model 中的 browse 方法 |
| open | 接收一个对象作为参数  { vm: this, referType: data.cTplType } 其中vm为 ReferModal 的 model，referType参数见 stare 中的referType参数，将接受到的数据存入state中并且设置referModal显示，让后将数据传入ReferModal组件中 |
|  |  |

<a name="486f7fc7"></a>
### model关键api
| 名称 | 描述 |
| --- | --- |
| browse | 此方法派发beforeBrowse事件，并在其回调函数中最终调动 cb.loader.initRefer 方法初始化 ReferViewModel 的实例，然后调用Refer组件中的open方法，并将初始化好的model，以及referType传入该方法 self.doPropertyChange('open', { vm: this, referType: data.cTplType }) |
|  |  |
|  |  |


<a name="924c9ad3"></a>
## 组件UI元数据

```json
{
  authLevel: 3
  bCanModify: false
  bEnum: false
  bExtend: false
  bFilter: true
  bHidden: false
  bIsNull: false
  bJointQuery: false
  bMain: true
  bMustSelect: false
  bNeedSum: false
  bPrintCaption: true
  bPrintUpCase: false
  bSelfDefine: false
  bShowIt: true
  bSplit: false
  bVmExclude: 0
  cCaption: "名称"
  cControlType: "Refer"
  cDataSourceName: "bd.adminOrg.BaseOrgVO"
  cFieldName: "name"
  cItemName: "name"
  cName: "name"
  cRefRetId: "{"BaseOrgVO": "code"}"
  cRefType: "bd_orgref"
  cShowCaption: "名称"
  cSubId: "bd"
  enterDirection: 4
  iAlign: 1
  iBillEntityId: 2163824
  iBillId: 1001283507
  iBillTplGroupId: 69419496
  iColWidth: 1
  iFieldType: 1
  iMaxLength: 100
  iMaxShowLen: 100
  iOrder: 317
  iSystem: 1
  iTplId: 1338922
  id: 71248717
}
```
<a name="34cdf6b7"></a>
### 关键字段介绍
| 名称 | 类型 | 描述 |
| --- | --- | --- |
| cShowCaption | String | 字段显示名称 |
| cRefType | String | 初始化ReferModel的时候时需要用的的参数，存储在model实例中，用来在初始化referViewModel ，是referViewModel中调用 /ref/getRefMeta 接口的refCode参数 |