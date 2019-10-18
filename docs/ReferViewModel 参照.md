<a name="Zzy9T"></a>
## model获取
获取参照弹出框对应的referViewModel请参考[这里](https://www.yuque.com/gpgy5k/ucf/vs2ccq#ArvUN)
<a name="18taZ"></a>
## 事件

- afterOkClick 

 说明： 点击确认框后的回调事件<br /> 参数：data：在表参照、树表参照返回选中行数据，在树参照中返回当前选中的树节点<br />eg:

```javascript
referViewMode.on('afterOkClick',(data)=>{
		console.log('当前选中的数据'，data);
})
```

- getRefMetaReady

 说明：请求完参照的meta信息的回调事件<br />