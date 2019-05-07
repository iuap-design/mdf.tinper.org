# model 定义

<a name="8e1b944f"></a>
## 背景

在我们传统的开发模式中，没有用到复杂的状态管理，只是应用了组件内部State以及对外Props属性，相对于简单的应用开发是可以满足的，当遇到复杂的应用后，组件内部的状态过多，维护的也就越复杂，组件之间的“信息”传递也就会困难，稍不注意就会出现问题，这也是开发者头疼的事情。Redux、Mobx等状态管理解决方案的出现在技术上解决了开发者的难题，但上手门槛、概念多、样板式代码等问题也随着暴露，**“当年的屠龙少年，自己变成了一条龙”。**<br />**
<a name="fdb22dbd"></a>
## mirrorx -- 更简单清晰的解决方案

基于以上实践考虑，我们在ucf-web中选择引入 mirrorx 模型框架来解决这个困扰的问题，它不是横空出世的新物种，它只是在 Redux 之上的衍生解决方案，继承了Redux的单一数据源、数据不可变、纯函数执行等三大原则的优势，并解决了概念多、样板式代码、状态树维护难等问题。

使用 mirrorx ，主要工作在于如何定义 model 模型文件。

<a name="d3c1f5d8"></a>
## 定义model

一个基本的model如下这个样子：

```javascript
/**
 * 数据模型类
 */

export default {
    name: "app",
    initialState: {
      
    },
    reducers: {
        updateState(state, data) {
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
      
    }
};

```

可以看出仅仅只有4个字段，下面来详细解读一下4个字段具体使用含义。

<a name="name"></a>
### name
> 顾名思义，模型的名称，每一个业务对应一个模型通过该字段的定义来找到对应的方法。


要创建 model，必须要指定 name，且为一个合法字符串。name 很好理解，就是 model 的名称，这个名称会用于后面创建的 Redux store 里的命名空间。

假设定义了一个这样的 model：

```javascript

export default {
  name: 'app'
};
```

那么最后创建的 Redux store 会是这样的结构：

```javascript
store.getState();
// {app: null}
```


可以看到，model 的 `name` 就是其 state 在根 store 下的命名空间（当然，`name` 对全局 `actions` 也非常重要，见下文）。<br />另外，需要注意的是，上面创建的 store，其 `app` 这个 state 的值是 `null`，假如你想要一个不同的、更有意义的值，那么你就需要指定一个 `initialState`。
> 注意：Mirror 使用了 [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)，因此你**不可以**使用 `routing` 作为 model 的 name



<a name="initialState"></a>
### initialState

`initialState` 也很容易理解，表示 model 的初始 state。在创建标准的 `Redux reducer` 时，它就表示这个 reducer 的 `initialState`。

常规组件内部的state应该在这里修改写在`initialState`里面，这个值不是必需的，而且可以为任意值。如果没有指定 `initialState`，那么它的值就是 `null`

创建 model：

```javascript
export default {
  name: 'app',
+ initialState: {
+   num : 0
+ }
};
```

得到的 store：

```javascript
store.getState();
// { app: { num : 0 } }
```

<a name="reducers"></a>
### reducers

Mirror app 所有的 `Redux reducer` 都是在 `reducers` 中定义的，`reducers` 对象中的方法本身会用于创建 `reducer`，方法的名字会用于创建 `action type`。Mirror 的原则是，**一个 reducer 只负责一个 action**，所以你不需要关心你要处理的 action 具体的 type 是什么。

reducers里面的方法是同步的，并且是纯函数

```javascript
export default {
  name: 'app',
	initialState: {
		num : 0
	},
+ reducers: {
+   add(state, data) {
+     return state + data
+   }
+ }
};
```

<a name="effects"></a>
### effects

所谓的 `effects` 就是 [Redux 的异步 action（async actions）](http://redux.js.org/docs/advanced/AsyncActions.html)。在函数式编程中，[`effect`](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch3.md#side-effects-may-include) 表示所有会与函数外部发生交互的操作。在 Redux 的世界里，异步 action 显然是 `effect`。<br />`effect` 不会直接更新 Redux state，通常是在完成某些异步操作（比如 AJAX 请求）之后，再调用其他的“同步 action” 来更新 state。<br />和 `reducers` 对象类似，你在 `effects` 中定义的所有方法都会以相同名称添加到 `actions.<modelName>` 上，调用这些方法便会调用 `effects` 你定义的那些方法。

```javascript
export default {
  name: 'app',
	initialState: {
		num : 0
	},
  reducers: {
    add(state, data) {
      return state + data
    }
  },
+ effects: {
+   async myEffect(data, getState) {
+     const res = await Promise.resolve(data)
+     actions.app.add(res)
+   }
+ }
};
```
执行上述代码，`actions.app` 就会拥有两个方法：`actions.app.add` 和 `actions.app.myEffect`。<br />调用 `actions.app.myEffect`，就会调用 `effects.myEffect`，简单得不能再简单。

在 effects 中定义的方法接收两个形参：

1. `data` - 调用 `actions.<modelName>` 上的方法时所传递的 data，可选。
1. `getState` - 实际上就是 `store.getState`，返回当前 action 被 dispatch 前的 store 的数据，同样是可选的。

<a name="a23f13b8"></a>
## model 注册到 store

```
import mirror from 'mirrorx'
import model from './model.js'

mirror.model(model)

```

<a name="7912c42f"></a>
## model 与 UI 组件双向绑定

```
import mirror, { connect } from 'mirrorx'

import model from './model.js'
mirror.model(model)

import App from './container.js'
const ConnectedApp = connect(state => state.app)(App)

export default ConnectedApp
```

