<a name="uOue1"></a>
# parseContainer
_**注意：**_<br />_**规则1：不在**_MetaComponents_**范围内的container里不能同时具有containers和controls，代码如下**_<br />_**规则2：****在**_MetaComponents_**范围内的container，conainers和controls的遍历由该组件内部决定**_
```javascript
const leftComs = [], otherComs = [];
if (container.containers) {
		container.containers.forEach(item => {
         const component = parseContainer(item, viewModel, subContainerWidth || width, height, index, hasTree);
         switch (item.cAlign && item.cAlign.trim().toLocaleLowerCase()) {
            case 'left':
              leftComs.push(component);
              break;
            default:
              otherComs.push(widthClass ? <div className={widthClass}>{component}</div> : component);
              break;
          }
      });
} else if (container.controls) {
    const component = parseControls(container, viewModel, width);
    otherComs.push(component);
} else {
   return null;
}
```


1、检查Container的cControlType，可能会是undefined<br />2、根据cControlType返回同名组件

- ListHeader
- CardHead
- Toolbar
- table
- flatRowContainer
- CheckboxContainer
- TreeTabler
- TableControl
- rpttable
- total
- searchtree
- tabpage
- tab——h
- linetabs
- groupcontainer
- title
- footer
- fileupload
- modal
- convenienquery
- ecsuite
- listareamap
- hotareamapdesign
- hotareamapdisplay
- 其它（包含undefined）

3、根据container的containers或controls分别调用parseContainer或parseControls

- container.containers
  - 遍历，每一个子container调用parseContainer
  - 根据子container的cAlign是否是left来处理
  - 将每一个子container生成的组件加载leftComs或ortherComs
- container.controls
  - 调用parseControls
  - 将生成的组件加入ortherComs




4、根据leftComs来走不同的渲染

```javascript
      if (leftComs.length)
        return (
          <Row style={{ display: 'flex', height: '100%' }} className={className}>
            <div className="form-left Manual-calculation-left">{leftComs}</div>
            <div className="form-base  Manual-calculation">{otherComs}</div>
          </Row>
        );
      if (!className)
        return flag ? <Row className='clearfix'>{otherComs}</Row> : otherComs;
      return (
        <Row className={className}>
          {otherComs}
        </Row>
      );
```


