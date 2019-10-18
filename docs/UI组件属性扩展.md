> 创建者：姚磊
> 创建时间：2019-10-17
> 修改者：
> 修改时间：


<a name="wPn6l"></a>
# UI组件属性扩展
可以通过在cStyle属性增加新的属性来实现UI组件属性级扩展。
<a name="zovE5"></a>
## 1 UI元数据配置
以InputNumber为例<br />方法一：在设计器的属性栏配置样式及扩展属性的值为{"placeholder":"采购单位换算率"}，如下：<br />![image.png](http://design.yonyoucloud.com/static/yuque/0/2019/png/271337/1571209402799-df3c628e-49b3-4834-b074-df520e62eaef.png#align=left&display=inline&height=72&name=image.png&originHeight=144&originWidth=566&search=&size=15681&status=done&width=283)

方法二：在excel中配置billitem_base的cStyle属性为{"placeholder":"采购单位换算率"}<br />

<a name="lGIZt"></a>
## 2 组件处理逻辑
组件从cStyle中获取placeholder的配置更新到state上。
```javascript
// inputnumber.jsx代码片段
constructor(props) {
    ......
    if (cStyle) {try {config = JSON.parse(cStyle); } catch (e) {} }
    this.state = Object.assign({
        ......
        placeholder:props.placeholder,
        ......
    }, config);
}
```