# React基础

<a name="YV4wA"></a>
## 1.React JSX
React 使用 JSX 来替代常规的 JavaScript。JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。

```javascript
const element = <h1>Hello, world!</h1>;
```
<br />
<a name="1GE7j"></a>
### 1.1将元素渲染到 DOM 中
首先我们在一个 HTML 页面中添加一个 **id="example"** 的 **<div>**:<br />在此 div 中的所有内容都将由 React DOM 来管理，所以我们将其称之为 "根" DOM 节点。<br />要将React元素渲染到根DOM节点中，我们通过把它们都传递给 **ReactDOM.render()** 的方法来将其渲染到页面上：

```javascript
var myDivElement = <div className="foo" />;
ReactDOM.render(
    myDivElement,
    document.getElementById('example')
);
```

<a name="tm6r6"></a>
### 1.2 JavaScript 表达式
我们可以在 JSX 中使用 JavaScript 表达式。表达式写在花括号 **{}** 中。实例如下：

```javascript
ReactDOM.render(
    <div>
      <h1>{1+1}</h1>
    </div>
    ,
    document.getElementById('example')
);
```

在
JSX 中不能使用 **if
else** 语句，但可以使用 **conditional
(****三元运算)** 表达式来替代。以下实例中如果变量 **i** 等于 **1** 浏览器将输出 **true**, 如果修改 i 的值，则会输出 **false。**

```javascript
ReactDOM.render(
    <div>
      <h1>{i == 1 ? 'True!' : 'False'}</h1>
    </div>
    ,
    document.getElementById('example')
);
```

<a name="ZaZOQ"></a>
### 1.3 注释
注释需要写在花括号中，实例如下：

```javascript
ReactDOM.render(
    <div>
    <h1>用友春训</h1>
    {/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

<a name="wZ0Ii"></a>
### 1.4 数组
JSX 允许在模板中插入数组，数组会自动展开所有成员：

```javascript
var arr = [
  <h1>用友春训</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

<a name="UpNpw"></a>
## 2.React 组件
本章节我们将讨论如何使用组件使得我们的应用更容易来管理。<br />接下来我们封装一个输出 "Hello World！" 的组件，组件名为 HelloMessage：

```javascript
function HelloMessage(props) {
    return <h1>Hello World!</h1>;
}
 
const element = <HelloMessage />;
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

_注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。_
<a name="4WQwI"></a>
### 2.1组件定义
我们可以使用函数定义了一个组件

```javascript
function HelloMessage(props) {
    const {msg} = props;
    return <h1>{msg} </h1>;
}
你也可以使用 ES6 class 来定义一个组件:

class HelloMessage extends React.Component {
  render() {
    const {msg} = this.props;
    return <h1>{msg}</h1>;
  }
}
 
```

<a name="xKpxI"></a>
### 2.2 组件使用

```javascript
const element = <HelloMessage msg=" Hello World!"/>;
ReactDOM.render(
    element,
    document.getElementById('example')
);

```

<a name="d42Cn"></a>
### 2.3 复合组件
我们可以通过创建多个组件来合成一个组件，即把组件的不同功能点进行分离。以下实例我们实现了输出网站名字和网址的组件：

```javascript
function Name(props) {
    return <h1>姓名：{props.name}</h1>;
}
function Gender(props) {
    return <h1>性别：{props.gender}</h1>;
}
function Age(props) {
    return <h1>年龄：{props.age}</h1>;
}
function App() {
    return (
    <div>
        <Name name="小明" />
        <Gender gender="男 " />
        <Age age="18" />
    </div>
    );
}
 
ReactDOM.render(
     <App />,
    document.getElementById('example')
);
```

<a name="Y3sq2"></a>
## 3.React State(状态 )
React 把组件看成是一个状态机（State
Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。<br />React 里，只需更新组件的
state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。<br />以下实例创建一个名称扩展为 React.Component 的 ES6 类，在 render() 方法中使用 this.state 来修改当前的时间。<br />添加一个类构造函数来初始化状态 this.state，类组件应始终使用 props 调用基础构造函数。

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);
```

<a name="gIL1T"></a>
### 3.1 数据自顶向下流动
父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。<br />这就是为什么状态通常被称为局部或封装。
除了拥有并设置它的组件外，其它组件不可访问。<br />这通常被称为自顶向下或单向数据流。
任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。<br />如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。<br />为了表明所有组件都是真正隔离的，我们可以创建一个 App 组件，它渲染三个Clock：

```javascript
function FormattedDate(props) {
  return <h2>现在是 {props.date.toLocaleTimeString()}.</h2>;
}
 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}
 
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
 
ReactDOM.render(<App />, document.getElementById('example'));
```


以上实例中 FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入。<br />每个 Clock 组件都建立了自己的定时器并且独立更新。<br />在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。<br />我们可以在有状态组件中使用无状态组件，也可以在无状态组件中使用有状态组件。<br /> 
<a name="PE6NY"></a>
### 3.2 更新state
       组件中为我们提供了更新state的方法
setState

```javascript
setState(object nextState[, function callback])
```

参数说明：<br />**1. nextState**，将要设置的新状态，该状态会和当前的**state**合并<br />**2. callback**，可选参数，回调函数。该函数会在**setState**设置成功，且组件重新渲染后调用。合并nextState和当前state，并重新渲染组件。setState是React事件处理函数中和请求回调函数中触发UI更新的主要方法。<br /> <br />不能在组件内部通过this.state修改状态，因为该状态会在调用setState()后被替换。<br />setState()并不会立即改变this.state，而是创建一个即将处理的state。setState()并不一定是同步的，为了提升性能React会批量执行state和DOM渲染。<br />setState()总是会触发一次组件重绘，除非在shouldComponentUpdate()中实现了一些条件渲染逻辑

```javascript
class Counter extends React.Component{
  constructor(props) {
      super(props);
      this.state = {clickCount: 0};
      this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(function(state) {
      return {clickCount: state.clickCount + 1};
    });
  }
  render () {
    return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
  }
}
ReactDOM.render(
  <Counter />,
  document.getElementById('example')
```

实例中通过点击 h2 标签来使得点击计数器加 1。
<a name="k51MQ"></a>
## 4.React Props
state 和 props 主要的区别在于 **props** 是不可变的，而 state 可以根据与用户交互来改变。这就是为什么有些容器组件需要定义 state 来更新和修改数据。 而子组件只能通过 props 来传递数据。
<a name="b0ldA"></a>
### 4.1 使用 Props
以下实例演示了如何在组件中使用 props：

```javascript
function HelloMessage(props) {
    return <h1>Hello {props.name}!</h1>;
}
 
const element = <HelloMessage name="Runoob"/>;
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

实例中 name 属性通过 props.name
来获取。
<a name="y2f6N"></a>
### 4.2 默认 Props
你可以通过组件类的 defaultProps 属性为 props 设置默认值，实例如下：

```javascript
class HelloMessage extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
 
HelloMessage.defaultProps = {
  name: 'Runoob'
};
 
const element = <HelloMessage/>;
 
ReactDOM.render(
  element,
  document.getElementById('example')
);
```

<a name="3mxjD"></a>
### 4.3 State 和 Props
以下实例演示了如何在应用中组合使用 state 和
props 。我们可以在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上。在 render 函数中, 我们设置 name 和
site 来获取父组件传递过来的数据。

```javascript
class WebSite extends React.Component {
  constructor() {
      super();
      this.state = {
        name: "菜鸟教程",
        site: "https://www.runoob.com"
      }
    }
  render() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />
      </div>
    );
  }
}
class Name extends React.Component {
  render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}
class Link extends React.Component {
  render() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
}
 
ReactDOM.render(
  <WebSite />,
  document.getElementById('example')
);
```

<a name="bfR5P"></a>
### 4.3 Props 验证
Props 验证使用 **propTypes**，它可以保证我们的应用组件被正确使用，React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。<br />以下实例创建一个 Mytitle 组件，属性 title 是必须的且是字符串，非字符串类型会自动转换为字符串
：

```javascript
var title = "用友春训";
class MyTitle extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.title}</h1>
    );
  }
}
MyTitle.propTypes = {
  title: PropTypes.string
};
ReactDOM.render(
    <MyTitle title={title} />,
    document.getElementById('example')
);
```

更多验证器说明如下：
```javascript
MyComponent.propTypes = {
    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
   optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
 
    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,
 
    //  React 元素
    optionalElement: React.PropTypes.element,
 
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),
 
    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
 
    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),
 
    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
 
    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
 
    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
 
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,
 
    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,
 
    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  }
}
```

<a name="pwtqe"></a>
## 5.React 组件生命周期
组件的生命周期可分成三个状态：<br />·        
Mounting：已插入真实 DOM<br />·        
Updating：正在被重新渲染<br />·        
Unmounting：已移出真实 DOM<br />生命周期的方法有：<br />·        
**componentWillMount** 在渲染前调用,在客户端也在服务端。<br />·        
**componentDidMount** :
在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。<br />·        
**componentWillReceiveProps** 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。<br />·        
**shouldComponentUpdate** 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 <br />
可以在你确认不需要更新组件时使用。<br />·        
**componentWillUpdate**在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。<br />·        
**componentDidUpdate** 在组件完成更新后立即调用。在初始化时不会被调用。<br />·        
**componentWillUnmount**在组件从 DOM 中移除之前立刻被调用。<br />这些方法的详细说明，可以参考[官方文档](http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)。<br />以下实例在 Hello 组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒重新设置组件的透明度，并重新渲染：

```javascript
class Hello extends React.Component {
 
  constructor(props) {
      super(props);
      this.state = {opacity: 1.0};
  }
 
  componentDidMount() {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  }
 
  render () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
}
```

<a name="1Lycb"></a>
## 6.React Refs
React 支持一种非常特殊的属性 **Ref** ，你可以用来绑定到 render() 输出的任何组件上。<br />这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。<br /> 
<a name="0ONN7"></a>
### 6.1 使用方法
给ref属性传入function来获取

```javascript
<input ref={(el) => this. myInput = el;}/>
```

 <br />你可以通过使用 this 来获取当前 React 组件，或使用 ref 来获取组件的引用，实例如下：

```javascript
class MyComponent extends React.Component {
  handleClick = () => {
  
     // 使用原生的 DOM API 获取input 的value值
this.myAgeInput.value();
  }
  render() {
    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
    return (
      <div>
        <input type="text" ref={el => this.myAgeInput = el;} />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick)}
        />
      </div>
    );
  }
```

<a name="Etzp4"></a>
## 7.React 事件处理以及表单
React 元素的事件处理和 DOM 元素类似。但是有一点语法上的不同:<br />l   React 事件绑定属性的命名采用驼峰式写法，而不是小写。<br />l   如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)

```javascript
 function ActionLink() {
      function handleClick(e) {
                e.preventDefault();
                console.log('链接被点击');
      }
 
     return (
        <a href="#" onClick={handleClick}>
          点我
        </a>
     );
}
```

 <a name="xOi2t"></a>
### 7.1 事件处理函数中的this
       你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。<br />      你可以使用两种方法解决：<br />1.     
箭头函数
```javascript
class LoggingButton extends React.Component { 
  handleClick = () => {
    console.log('this is:', this);
  }
 
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
 

    2.bind方法

class LoggingButton extends React.Component { 
  handleClick {
    console.log('this is:', this);
  }
 
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Click me
      </button>
    );
  }
}
```
<br /><a name="6zACK"></a>
### 7.2 向事件处理程序传递参数
通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

<a name="tqzYR"></a>
### 7.3 表单以及表单事件
       HTML
表单元素与 React 中的其他 DOM 元素有所不同,因为表单元素生来就保留一些内部状态。<br />在 HTML 当中，像 <input>, <textarea>, 和
<select> 这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState() 方法进行更新。<br /> <br />下面实例中我们设置了输入框
input 值 **value =
{this.state.data}**。在输入框值发生变化时我们可以更新 state。我们可以使用 **onChange** 事件来监听 input 的变化，并修改 state。

```javascript
class HelloMessage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: 'Hello Runoob!'};
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  render() {
    var value = this.state.value;
    return <div>
            <input type="text" value={value} onChange={this.handleChange} /> 
            <h4>{value}</h4>
           </div>;
  }
}
 
```

<a name="kL0LE"></a>
## 8.React条件渲染
在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。<br />React 中的条件渲染和
JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。<br /> <br />先来看两个组件:

```javascript
function UserGreeting(props) {
  return <h1>欢迎回来!</h1>;
}
 
function GuestGreeting(props) {
  return <h1>请先注册。</h1>;
}
```

我们将创建一个 Greeting 组件，它会根据用户是否登录来显示其中之一：

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

<a name="1tJIq"></a>
### 8.1 组件变量
你可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。<br />在下面的例子中，我们将要创建一个名为 LoginControl 的有状态的组件。<br />它会根据当前的状态来渲染 **<LoginButton
/>** 或 **<LogoutButton />**，它也将渲染前面例子中的 **<Greeting
/>**。

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);    this.state = {isLoggedIn: false};
  }
  handleLoginClick = () => {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick  = () => {
     this.setState({isLoggedIn: false});
  }
 
  render() {
    const isLoggedIn = this.state.isLoggedIn;
 
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
 
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

 <a name="SJ42z"></a>
### 8.2 三目运算符
条件渲染的另一种方法是使用 JavaScript 的条件运算符:
condition ? true : false。我们修改8.1中事例的render方法

```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

<a name="ct4V0"></a>
### 8.3 阻止组件渲染
在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。<br />在下面的例子中，**<WarningBanner />** 根据属性 warn 的值条件渲染。如果 warn 的值是 false，则组件不会渲染：

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
 
  return (
    <div className="warning">
      警告!
    </div>
  );
}
 
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
 
  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
 
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? '隐藏' : '显示'}
        </button>
      </div>
    );
  }
}
```


