> 创建者：姚磊
> 创建时间：2019-10-17
> 修改者：
> 修改时间：


<a name="sc83F"></a>
# UI组件扩展
     当框架中的组件满足不特定业务场景，用户可以自定义组件来复写、新增框架组件。可以通过框架提供扩展口进行对组件扩展。扩展组件分别在basic、formatter、home、meta、model、popover、portal、toolbar目录中index.jsx文件导出，如下：<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1571206388915-507821fa-a634-4908-bb46-7f69d0ecacbb.png#align=left&display=inline&height=317&name=image.png&originHeight=397&originWidth=338&search=&size=22284&status=done&width=270)

<a name="eNf7S"></a>
## 1 扩展口列表
| **目录** | **分类** | **备注** |
| :---: | :---: | :---: |
| basic | 基础组件 |  |
| meta | 业务组件 |  |
| modal | Modal组件 |  |
| formatter | 表格组件 |  |
| home | 页面组件 |  |
| portal | 门户组件 |  |
| popover | 弹出组件 |  |
| toolbar | 操作组件 |  |


<a name="SKMkK"></a>
## 2 以基础组件basic为例
用于扩展基础组件，InputNumber为例介绍。
<a name="mqPNF"></a>
### 2.1 组件定义
在basic目录下或其它目录下创建InputNumber.jsx。
```javascript
export default class InputNumberControl extends React.Component {
    constructor(props) {
      	super(props);
        ......
    }
    ......
    render() {
        const control = this.getControl();
        let style = this.state.visible ? {} : { display: "none" };
        let className = this.state.err + ' ' + this.state.className;
        return (
            <div style={style} className={className}>
                {control}
                <div className="ant-form-explain">{this.state.msg}</div>
        	</div>
        );
    }
}
        
```

<a name="td4u6"></a>
### 2.2 组件注册
在basic目录下的index.jsx文件中导出会自动注册。
```javascript
export InputNumber from './InputNumber';
```

<br />或通过setExtendComp运行时注册

```javascript
const { setExtendComp } = require('@mdf/cube/lib/extend');
const extendComp = require('../common/registerMetaComp').default;

setExtendComp(extendComp)
```

<a name="1eRe2"></a>
### 2.3 组件使用
方法一：在UI模板设计器上配置类型为InputNumber的字段，如下：<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1571212956438-6a3fb3c4-7c34-48d0-858c-91fcc6309f40.png#align=left&display=inline&height=68&name=image.png&originHeight=136&originWidth=572&search=&size=9166&status=done&width=286)<br />方法二：在excel中配置billitem_base的cControlType属性为InputNumber<br />

<a name="nkXul"></a>
### 2.4 运行时效果
![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1571213162155-4fa1ddb0-1d24-4b74-96b2-896f25cb29aa.png#align=left&display=inline&height=301&name=image.png&originHeight=602&originWidth=1616&search=&size=63889&status=done&width=808)

<a name="w9EuR"></a>
## 3 自定义一个二维码组件

<a name="2BNIX"></a>
### 3.1 组件的定义
 
首先在src/web/common/extends/basic增加InputQrCode文件

```javascript
import React from 'react';
import Label from '@mdf/metaui-web/lib/components/basic/label';
import QRCode from 'qrcode.react';
import {Input,Popover} from 'antd'
export default class InputQrcode extends React.Component {
  constructor(props) {
    super(props);
    ......
    this.state = Object.assign({
      visible: !props.bHidden,
      size: props.size || 110,
      value: props.defaultValue
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  
  baseControl(){
    const {value,size} = this.state;
    let content = (<QRCode value={value} size={size}/>)
    if(value){
      return <Popover placement="right" title={''} content={content} trigger="hover" overlayClassName='input-qrcode-img'>
          <a className='input-qrcode-name'>查看二维码</a>
      </Popover>
    }else{
      return <Input disabled="disabled" placeholder="未生成"/>
    }
  }
  render() {
    const {cShowCaption } = this.props;
    const {size} = this.state;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={<label>{cShowCaption}</label>}/> : this.baseControl());
    let style = this.state.visible ? {} : { display: "none" };
    return (
      <div style={style} className='basic-input-qrcode'>
        {control}
      </div>
    );
  }
}

```

<a name="RDvjt"></a>
### 3.2 组件的注册
注册方式都相同，参考inputNumber例子
<a name="zh1hE"></a>
### 3.3 组件使用
方法一：在UI模板设计器上配置类型为InputQrCode的字段，如下：<br />
<br />方法二：在excel中配置billitem_base的cControlType属性为InputQrCode
<a name="vCwLV"></a>
### 3.4 运行时效果
![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/192681/1573627420932-3a69246a-78a6-4063-a378-45b2f25a0b0c.png#align=left&display=inline&height=223&name=image.png&originHeight=669&originWidth=1730&search=&size=184366&status=done&width=576.6666666666666)