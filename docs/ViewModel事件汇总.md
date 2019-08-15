<a name="9iuck"></a>
# 1、execute 和fireEvent
一句话：fireEvent是对execute进行了benfore和after同名事件名的包装方法。<br />例如有一个事件名叫onchange使用fireEvent和execute来触发onchange时，差异在

- execute onchange  仅仅触发订阅了onchange的回调队列
- fireEvent onchange 依次触发了beforeonchange、onchange、afteronchange的回调队列

源代码如下：
```javascript
model.prototype.fireEvent = function (eventName, args) {
    if (!this.execute('before' + eventName, args)) return;
    this.execute(eventName, args);
    this.execute('after' + eventName, args);
};
```
_代码注意点：_

- _重点在于理解代码为什么要判断before时，return？_
- _何种场景会使用before来return？_

_理解了以上问题，就理解了fireEvent。_


```javascript
model.prototype.execute = function (name) {
    if (!name) return;
    var events = this._get_data('events')[name];
    if (!events) return true;
    var result = true;
    var args = Array.prototype.slice.call(arguments, 1);
    events.forEach(function (event) {
      if (result === false) return;
      var returnData;
      if (cb.rest.nodeEnv === 'development') {
        returnData = event.callback.apply(event.context || this, args);
      } else {
        try {
          returnData = event.callback.apply(event.context || this, args);
        } catch (e) {
          console.error('execute[' + name + '] exception: ' + e.stack);
        }
      }
      result = returnData instanceof cb.promise ? returnData : (returnData === false ? false : result);
    }, this);
    return result;
};
```

_代码注意点：_

- _为什么有一个result？_
- _为什么在forEach时，先判断一下result？_

_理解了以上问题，就理解了execute。_

<a name="Hz7Jf"></a>
# Voucher
afterLoadData
<a name="rHXbc"></a>
# VoucherList
afterLoadData<br />firstQueryDone<br />updateTreeRefer<br />back

<a name="JwVEH"></a>
# 2、单据ViewModel的事件

- 自定义事件
- <br />
- beforeSetStates
  - 返回false，会使得框架的setStates无效
- afterSetStates