> 创建者：姚磊
> 创建时间：2019-12-06
> 修改者：
> 修改时间：


<a name="s9Xmg"></a>
### **功能说明**
公式组件，公式作为业务数据存储时使用此控件

使用公式组件需要修改脚手架/src/web/common/registerMetaComp.js文件中代码（添加公式组件引用）如下：
```javascript
import Formula from '@mdf/metaui-web/lib/components/basic/formula';

const CONTROL_TYPE = {
    Formula: 'Formula'
}

/**
 * ys 扩展
 */
let extendComp = {
    'basic': {
        [CONTROL_TYPE.Formula.trim().toLowerCase()]: Formula
    }
}
export default extendComp;
```
**
<a name="J0shL"></a>
### **属性列表**
_无_<br />**
<a name="zD1eV"></a>
### 扩展属性 cStyle
| **属性** | **类型** | **默认值** | **含义** | **备注** |
| :---: | :---: | :---: | :---: | :---: |
| requestParams | String | null | 请求参数 | {"userVar": {"isRefresh": true}} |
| leftPannel | String | null | 左侧面板 | ["math", "string", "custom"] |
| rightPannel | String | null | 右侧面板 | ["context", "meta", "userVar", "userConst"] |

**
<a name="gvqSo"></a>
### **事件列表**
**
<a name="bKkHe"></a>
### 实例