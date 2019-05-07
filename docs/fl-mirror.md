# 关于 mirror

mirror是一个开源的应用状态解决方案。其主要作用是简化React、Redux开发的步骤。<br />传统的React-Redux开发，需要逐步定义action、reducer、component等相关东西，看起来比较冗长。mirror框架将这些操作进一步封装，使之使用起来更加简单。
<a name="8wwWU"></a>
## 1.为什么要用Mirror
一个典型的
React/Redux 应用看起来像下面这样：

- 一个 actions/ 目录用来手动创建所有的 action type（或者 action creator）；
- 一个 reducers/ 目录以及无数的 switch 来捕获所有的 action type；
- 必须要依赖 middleware 才能处理 异步 action；
- 明确调用 dispatch 方法来 dispatch 所有的 action；
- 手动创建 history 对象关联路由组件，可能还需要与 store 同步；
- 调用 history 上的方法或者 dispatch action 来手动更新路由；

存在的问题？太多的 [样板文件](https://github.com/reactjs/redux/blob/master/docs/recipes/ReducingBoilerplate.md) 以及繁琐甚至重复的劳动。<br />实际上，上述大部分操作都是可以简化的。比如，在单个 API 中创建所有的 action 和 reducer；比如，简单地调用一个函数来 dispatch 所有的同步和异步 action，且不需要额外引入 middleware；再比如，使用路由的时候只需要关心定义具体的路由，不用去关心 history 对象，等等。<br />这正是 Mirror 的使命，用极少数的 API 封装所有繁琐甚至重复的工作，提供一种简洁高效的更高级抽象，同时保持原有的开发模式。

 ![a.png](https://cdn.nlark.com/yuque/0/2019/png/257952/1548654673263-e3986345-1ae7-43c9-9209-710a1f5140c0.png#align=left&display=inline&height=402&name=a.png&originHeight=916&originWidth=1698&size=337980&status=done&width=746)
<a name="SeiN0"></a>
## 2.Mirror的安装及使用
<a name="6BU4O"></a>
### 2.1 Mirror的安装

```bash
$ npm i --save mirrorx
```

<a name="w2BxH"></a>
### 2.2 Mirror的使用

```javascript
import React from 'react'
import mirror, { actions, connect, render } from 'mirrorx'
// 声明 Redux state, reducer 和 action，
// 所有的 action 都会以相同名称赋值到全局的 actions 对象上，actions.[name]即可取到所有的action
//mirror.model抽取到model.js中
mirror.model({
    name: 'app',//相当于reducerName
    initialState: 0,//初始化state
    reducers: {//reducer事件处理，这里省略了action的type，type为[name]/[methodName]

       increment(state) { return state + 1 },
        decrement(state) { return state - 1 }
    },
    effects: {//异步方法声明,异步操作需要在完成后再调用reducers定义的同步方法才能进行页面渲染
        async incrementAsync() {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            })

            actions.app.increment()//actions会自动dispatch对应的action
        }

    }
})
export default connect((state) => {//连接组件和状态管理
    return {
        count: state.app
    }
})(App)

//组件中使用，抽取到components文件夹中
const App = (props) => {//组件定义
    return (
        <div>
            <h1>{props.count}</h1>

            {/* 调用 actions 上的方法来 dispatch action */}

            <button onClick={() => actions.app.decrement()} style={{margin:"5px"}}>-</button>

            <button onClick={() => actions.app.increment()} style={{margin:"5px"}}>+</button>

            {/* dispatch async action */}

            <button onClick={() => actions.app.incrementAsync()} style={{margin:"5px"}}>+ Async</button>
        </div>

    )

}

 
```

<a name="MEW6b"></a>
## 3.Mirror API
Mirror只封装了4个新的api，分别是：
<a name="72mvS"></a>
### 3.1 状态管理
mirror.model({name,
initialState, reducers, effects}):创建reducer和action，并作用于store。<br />mirror.hook((action,
getState) => {}):用于监视dispatch出去的action。相当于store.subscribe(listener)。<br />设置默认属性

```javascript
mirror.defaults({
    initialState:undefined,//初始化状态
    historyMode:browser,//history对象类型
    middlewares:[],//第三方插件
    addEffect:(effects) => (name, handler) => { effects[name] = handler }//自定义异步如何处理
})
```

<a name="WWgLA"></a>
### 3.2 路由管理
`actions.routing`:管理Router相关内容。它是一个对象，提供了如下5个方法来手动更新location：<br />·        
`push(location)` - 往 history 中添加一条记录，并跳转到目标 location。<br />·        
`replace(location)` - 替换 hisotry 中当前 location。<br />·        
`go` - 往前或者往后跳转 history 中的 location。<br />·        
`goForward` - 往前跳转一条 location 记录，等价于 `go(1)`。<br />·        
`goBack` - 往后跳转一条 location 记录，等价于 `go(-1)`。
<a name="Svsp2"></a>
### 3.3 渲染启动
`connect([mapStateToProps],
[mapDispatchToProps], [mergeProps], [options])`:连接`store`和`React`<br />`render([component],
[container], [callback])`:封装了`ReactDOM.render`，他会先创建`store`再进行渲染页面
<a name="PqjwC"></a>
## 4.附录关于Redux
<a name="hHaak"></a>
### 4.1 Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个
Store。<br />Redux 提供createStore这个函数，用来生成 Store。

```javascript
import { createStore } from 'redux';
const store = createStore(fn);
```

上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
<a name="s9iM5"></a>
### 4.2 State
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。<br />当前时刻的 State，可以通过store.getState()拿到。

```javascript
import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();
```
 <br />Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。
<a name="DHU0k"></a>
### 4.3 Action
State 的变化，会导致 View 的变化。但是，用户接触不到
State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。<br /> <br />Action 是一个对象。其中的type属性是必须的，表示
Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。
```javascript
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。<br /> <br />可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
<a name="exBtb"></a>
### 4.4 Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
```javascript
const ADD_TODO = '添加 TODO';
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux');
```

上面代码中，addTodo函数就是一个 Action Creator。
<a name="avdXP"></a>
### 4.5 store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。
```javascript
import { createStore } from 'redux';
const store = createStore(fn);
store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。<br />结合 Action
Creator，这段代码可以改写如下。

```javascript
store.dispatch(addTodo('Learn Redux'));
```

<a name="afYcr"></a>
### 4.6 Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。<br />Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
```javascript
const reducer = function (state, action) {
  // ...
  return new_state;

};
```

整个应用的初始状态，可以作为
State 的默认值。下面是一个实际的例子。
```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};
const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```

上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据
Action 的不同来实现。<br />实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```javascript
import { createStore } from 'redux';
const store = createStore(reducer);
```

为什么这个函数叫做
Reducer 呢？因为它可以作为数组的reduce方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。
```javascript
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];
const total = actions.reduce(reducer, 0); // 3
```

上面代码中，数组actions表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。
<a name="FNClI"></a>
### 4.7 纯函数
Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。<br />纯函数是函数式编程的概念，必须遵守以下一些约束。

  - 不得改写参数
  - 不能调用系统 I/O 的API
  - 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```javascript
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}
// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。
<a name="coDyl"></a>
### 4.8 store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```javascript
import { createStore } from 'redux';
const store = createStore(reducer);
store.subscribe(listener);
```

显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。<br />store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

```javascript
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
unsubscribe();
```

<a name="vfdAN"></a>
### 4.9 Store的实现
上一节介绍了 Redux 涉及的基本概念，可以发现 Store 提供了三个方法。

```javascript
store.getState()
store.dispatch()
store.subscribe()


import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);
```

createStore方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的。

```javascript
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```

上面代码中，window.STATE_FROM_SERVER就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖
Reducer 函数的默认初始值。<br />下面是createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };
  dispatch({});
  return { getState, dispatch, subscribe };
};
```

<a name="r8NzP"></a>
### 4.10 Reducer的拆分
Reducer 函数负责生成 State。由于整个应用只有一个
State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。<br />请看下面的例子。

```javascript
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};
```

面代码中，三种 Action
分别改变 State 的三个属性。

```javascript
ADD_CHAT：chatLog属性
CHANGE_STATUS：statusMessage属性
CHANGE_USERNAME：userName属性
```

这三个属性之间没有联系，这提示我们可以把 Reducer 函数拆分。不同的函数负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。
```javascript
const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action)
  }
}
```

上面代码中，Reducer 函数被拆成了三个小函数，每一个负责生成对应的属性。<br />这样一拆，Reducer 就易读易写多了。而且，这种拆分与 React 应用的结构相吻合：一个 React 根组件由很多子组件构成。这就是说，子组件与子 Reducer 完全可以对应。<br />Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

```javascript
import { combineReducers } from 'redux';
const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})
export default todoApp;
```

上面的代码通过combineReducers方法将三个子 Reducer 合并成一个大的函数。<br /> <br />这种写法有一个前提，就是
State 的属性名必须与子
Reducer 同名。如果不同名，就要采用下面的写法。

```javascript
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
// 等同于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

总之，combineReducers()做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子
Reducer，并将返回结果合并成一个大的
State 对象。<br />下面是combineReducer的简单实现。

```javascript
 const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
};
```

你可以把所有子
Reducer 放在一个文件里面，然后统一引入。

```javascript
import { combineReducers } from 'redux'
import * as reducers from './reducers'
const reducer = combineReducers(reducers)
```
 

