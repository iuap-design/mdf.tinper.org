# 前端开发规范

<br />本规范主要针对Web前端开发做出规范定义，指导开发人员按照规范来进行设计编码，使公司各领域产品的代码具有规范性、统一性、可读性。<br />用友云前端开发手册V1.0
<br />用友云平台大前端团队出品
<a name="lqxsZ"></a>
## 前言
<a name="e8XwO"></a>
### 适用范围
本规范适用于用友Web前端技术栈，主要面向用友云产品开发，软件服务序列由于已有技术框架不同，可以作为技术参考，不作为强制规范。
<a name="eiUCZ"></a>
### 目的
本规范主要针对 HTML/CSS/JavaScript 等前端开发语言的开发做出规范，指导Web前端开发人员按照规范来进行设计编码，使公司各领域产品的代码具有规范性，统一性，可读性。
<a name="LOibp"></a>
### 规范解释和审计
联系人：guoyff@yonyou.com      gct@yonyou.com

---
<a name="98klE"></a>
## 第一章 HTML 编程规约
<a name="MeV5u"></a>
### 1.1 代码格式
(1)【强制】缩进使用soft tab（4个空格）<br />正例：
```html
<ul>
    <li>first</li>
    <li>second</li>
</ul>

<select>
    <option value="1" selected>1</option>
</select>
```

【推荐】每行不得超过 120 个字符。<br />(2)【强制】嵌套的节点应该缩进；<br />(3)【强制】在属性上，使用双引号，不要使用单引号；<br />(4)【强制】属性名全小写，用中划线做分隔符；<br />(5)【强制】 不要在自动闭合标签结尾处使用斜线（HTML5 规范 指出他们是可选的）；<br />(6)【强制】不要忽略可选的关闭标签<br />正例：
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Page title</title>
    </head>
    <body>
        <img src="images/company_logo.png" alt="Company">

        <h1 class="hello-world">Hello, world!</h1>
    </body>
</html>

<select>
    <option value="1" selected>1</option>
</select>
```


(7) 【强制】boolean属性指不需要声明取值的属性，XHTML需要每个属性声明取值，但是HTML5并不需要<br />正例：
```html
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
    <option value="1" selected>1</option>
</select>
```


<a name="yhnkD"></a>
### 1.2 命名风格
(1)【强制】 class 必须单词全字母小写，单词间以 - 分隔。<br />(2)【推荐】 class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。<br />正例：
```html
<div class="sidebar"></div>
```


反例:
```html
<div class="left"></div>
```


(3)【强制】元素 id 必须保证页面唯一。<br />(4)【强制】同一页面，应避免使用相同的 name与 id。
<a name="Obp6o"></a>
### 1.3 HTML5 doctype
(1) 【推荐】在页面开头使用这个简单地doctype来启用标准模式，使其在每个浏览器中尽可能一致的展现；<br />(2) 【推荐】虽然doctype不区分大小写，但是按照惯例，doctype大写<br />正例：
```html
<!DOCTYPE html>
<html>
	...
</html>
```



<a name="kAhqV"></a>
### 1.4 lang 属性
【强制】根据HTML5规范： 应在html标签上加上lang属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。但 sitepoint 只是给出了语言的大类，例如中文只给出了zh，但是没有区分香港，台湾，大陆。而微软给出了一份更加详细的语言列表，其中细分了 zh-cn, zh-hk, zh-tw。<br />正例：
```html
<!DOCTYPE html>
<html lang="zh-cn">
    ...
</html>
```



<a name="qizwA"></a>
### 1.5 字符编码
【强制】通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常指定为'UTF-8'。
<a name="wb3CJ"></a>
### 1.6 资源引入顺序
【强制】根据HTML5规范, 通常在引入CSS和JS时不需要指明 type，因为 text/css 和 text/javascript 分别是他们的默认值。<br />正例：
```html
<style> ... </style> 
<script src="code_guide.js"></script> 
<script> ... </script>
```



<a name="q3ABS"></a>
### 1.7 IE兼容模式
【推荐】用 标签可以指定页面应该用什么版本的IE来渲染，不同 doctype 在不同浏览器下会触发不同的渲染模式。<br />正例：
```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    </head>
    ...
</html>
```


<a name="Yp9Zx"></a>
### 1.8 属性顺序
【推荐】属性应该按照特定的顺序出现以保证易读性：<br />class<br />id<br />name<br />data-*<br />src, for, type, href, value , max-length, max, min, pattern<br />placeholder, title, alt<br />aria-*, role<br />required, readonly, disabled<br />class是为高可复用组件设计的，所以应处在第一位；<br />id更加具体且应该尽量少使用，所以将它放在第二位。<br />正例：
```html
<a class="..." id="..." data-modal="toggle" href="#">Example link</a>

<input class="form-control" type="text">

<img src="..." alt="...">
```



<a name="XCllb"></a>
## 第二章 CSS 编程规约
<a name="18jEp"></a>
### 2.1 代码格式
(1) 【强制】必须采用 4 个空格为一次缩进。CSS 每个代码块相对于父代码库必须有缩进。且缩进均为4个空格<br />(2) 【推荐】声明排序 单个样式内属性声明 和 多个样式均按照字母顺序排列<br />正例：
```css
background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;
```


(3) 【强制】 CSS 属性声明必须以分号结尾。<br />(4) 【强制】CSS 属性名冒号后必须有一个空格。<br />正例：
```css
color : #ebc;
```


反例:
```css
color:#eebbcc;
```


(5) 【强制】最后的选择符与 { 之间必须有一个空格。<br />正例：

```css
#video {
  margin-top: 1em;
}

.author
{
  margin-top: 1em;
}
```


反例:
```css
#video{
  margin-top: 1em;
}
.author
{
  margin-top: 1em;
}
```


(6) 【强制】多个并列的选择符必须换行。<br />正例：
```css
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
```


反例:
```css
a:focus, a:active {
  position: relative; top: 1px;
}
```


(7) 【强制】CSS 规则之间必须以空白行分隔。<br />(8)  【强制】CSS 属性值中所有使用到引号的位置必须使用单引号。<br />正例：
```css
@import url('//www.google.com/css/maia.css');

html {
  font-family: 'open sans', arial, sans-serif;
}
```


反例:
```
@import url("//www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
```



<a name="WGEWA"></a>
### 2.2 命名风格
(1)【强制】命名格式 ID 和 Class 命名中单词应该全部小写，单词之间使用 "-"中划线作为分隔符，如下所示。<br />正例：
```css
#video-id {}
.ads-sample {}
```


反例:
```css
#videoId {}
.demoimage {}
.error_status {}
```




(2)【强制】命名内容含义 ID 和 Class 应该按照元素功能命名，不应该按照元素表现命名，命名应该含义清晰。

(3)【推荐】简短原则ID 和 Class 命名应该在保持含义清晰的前提下尽可能简短，注意前提是清晰。如下所示。<br />正例：
```css
#nav {}
.author {}
```


反例:
```css
#navigation {}
.atr {}
```




(4)【强制】不添加冗余选择条件 不能「MUST NOT」把 ID 和 Class 选择符作为类型选择符的限定符， 这样做没必要，反而还影响性能。<br />正例：
```css
#example {}
.error {}
```


反例:
```css
ul#example {}
div.error {}
```




(5)【强制】简写原则CSS 属性应该尽可能使用简化方式书写，需注意简写时默认值的副作用，详细参考 [Shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)。<br />正例：
```css
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```


反例:
```css
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
color:#eebbcc;
```



(6)【强制】单位问题 CSS 属性中的 0 值不应该带单位。<br />(7)【强制】CSS 属性中数值介于-1到1之间的小数应该忽略开头的 0。<br />(8)【推荐】CSS 的色值应该尽可能使用简化写法。<br />正例：
```css
color: #ebc;
```

反例:
```css
color:#eebbcc;
```





<a name="lFYzE"></a>
### 2.3 注释
CSS规则段落之前应该添加注释说明。<br />正例：
```css
/* Header */

#adw-header {}

/* Footer */

#adw-footer {}

/* Gallery */

.adw-gallery {}
```



<a name="8PFId"></a>
## 第三章 JavaScript 编程规约
<a name="lnVZZ"></a>
### 3.1 代码格式
（1）【推荐】缩进：使用soft tab（4个空格）。<br />（2）【推荐】单行长度：不要超过 80，但如果编辑器开启 word wrap可以不考虑单行长度。
<a name="ului0"></a>
### 3.2 命名规范

1. 【强制】避免单个字符名，让你的变量名有描述意义。

2. 【推荐】当命名对象、函数和实例时使用驼峰命名规则

3. 【推荐】当命名构造函数或类时使用驼峰式大写

4. 【推荐】命名私有属性时前面加个下划线 `_`

5. 【推荐】当保存对 `this` 的引用时使用 `_this`.

<a name="ABAbA"></a>
### 3.3 对象定义
（1）【强制】使用字面值创建对象<br />（2）【强制】不要使用保留字 [reserved words](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Reserved_Words) 作为键
<a name="jZ3Cz"></a>
### 3.4 数组
（1）【推荐】使用字面值创建数组
```javascript
// bad
var items = new Array();

// good
var items = [];
```


（2）【强制】如果你不知道数组的长度，使用push<br />（3）【推荐】当你需要拷贝数组时使用slice
```javascript
var someStack = [];
// bad
someStack[someStack.length] = 'abracadabra';
// good
someStack.push('abracadabra');
```

（4）【推荐】使用slice将类数组的对象转成数组.
```javascript
var len = items.length,
   itemsCopy = [],
   i;
// bad
for (i = 0; i < len; i++) {
itemsCopy[i] = items[i];
}
// good
itemsCopy = items.slice();

function trigger() {
    var args = Array.prototype.slice.call(arguments);
    ...
}
```




<a name="DWT3f"></a>
### 3.5 字符串
（1）【推荐】对字符串使用单引号 ''<br />（2）【强制】超过80个字符的字符串应该使用字符串连接换行<br />·	注: 如果过度使用，长字符串连接可能会对性能有影响.

1. 【强制】编程时使用join而不是字符串连接来构建字符串，特别是IE

2. 【推荐】程序化生成字符串时，使用模板字符串代替字符串连接。

<a name="d55Ju"></a>
### 3.6 函数

1. 【推荐】使用函数声明代替函数表达式


说明：因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升。这条规则使得箭头函数可以取代函数表达式。<br />正例：`function foo() { }`<br />反例：`const foo = function () { };`

1. 【强制】永远不要在一个非函数代码块（if、while 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。


（3）【强制】永远不要把参数命名为 arguments。这将取代原来函数作用域内的 arguments 对象，可以选择 rest 语法 ... 替代。
<a name="f9RSH"></a>
### 3.7 属性
```javascript
// bad
function nope(name, options, arguments) {
// ...stuff...
}

// good
function yup(name, options, args) {
// ...stuff...
}
```

（1）【强制】使用‘ . ’来访问对象的属性。<br />（2）【推荐】当通过变量访问属性时使用中括号[]。
<a name="JMmaa"></a>
### 3.8 变量定义
（1）【推荐】使用 var 声明每一个变量。<br />（2）【参考】将所有的 const 和 let 分组。<br />（3）【参考】在你需要的地方给变量赋值，但请把它们放在一个合理的位置。<br />（4）【推荐】使用一个 var 以及新行声明多个变量，缩进4个空格。<br />（5）【参考】最后再声明未赋值的变量，当你想引用之前已赋值变量的时候很有用。<br />（6）【推荐】在作用域顶部声明变量，避免变量声明和赋值引起的相关问题。
<a name="vHq5e"></a>
### 3.9 条件表达式和等号
（1）【推荐】适当使用 === 和 !== 以及 == 和 !=.<br />（2）【参考】条件表达式的强制类型转换遵循以下规则：<br />a. 对象被计算为 true<br />b. Undefined 被计算为 false<br />c. Null 被计算为 false<br />d. 布尔值 被计算为 布尔的值<br />e. 数字 如果是 +0, -0, or NaN 被计算为 false , 否则为 true<br />f. 字符串 如果是空字符串 `''` 则被计算为 false, 否则为 true<br />（3）【推荐】使用快捷方式.
<a name="xyCeS"></a>
### 3.10 代码块

1. 【强制】给所有多行的块使用大括号

2. 【推荐】使用大括号包裹所有的多行代码块。

3. 【参考】如果通过 if和 else 使用多行代码块，把 else 放在 if 代码块关闭括号的同一行。

<a name="85wS2"></a>
### 3.11 类型转换
（1）【推荐】在语句的开始执行类型转换<br />（2）【推荐】对数字使用 `parseInt` 并且总是带上类型转换的基数.<br />（3）【推荐】.布尔值转换规范<br />正例：`const hasAge =!!age; 、 const hasAge = Boolean(age);`<br />反例：`const hasAge = new Boolean(age);`

<a name="Z4XtI"></a>
### 3.12 注释
（1）【强制】使用 /** ... */ 进行多行注释，包括描述，指定类型以及参数值和返回值<br />（2）【强制】使用 // 进行单行注释，在评论对象的上面进行单行注释，注释前放一个空行.<br />（3）【推荐】使用 // FIXME: 标注问题。<br />（4）【推荐】使用 // TODO: 标注问题的解决方式。

<a name="dsMOZ"></a>
### 3.13 空格
（1）【推荐】在逗号、分号、冒号后加空格<br />（2）【推荐】在操作符前后加空格<br />（3）【推荐】在大括号开始符之前<br />（4）【推荐】在大括号结束符和 else、while 或 catch 之间

<a name="BfDwq"></a>
### 3.14 逗号
（1）【强制】不要将逗号放前面<br />（2）【强制】不要加多余的逗号，这可能会在IE下引起错误，同时如果多一个逗号某些ES3的实现会计算多数组的长度。
<a name="Y90J7"></a>
### 3.15 分号
（1）【推荐】语句结束一定要加分号

<a name="LcgEZ"></a>
### 3.16 模块
（1）【强制】模块应该以 `!` 开始，这保证了如果一个有问题的模块忘记包含最后的分号在合并后不会出现错误。<br />（2）【推荐】这个文件应该以驼峰命名，并在同名文件夹下，同时导出的时候名字一致<br />（3）【推荐】加入一个名为noConflict()的方法来设置导出的模块为之前的版本并返回它	<br />（4）【推荐】总是在模块顶部声明 `'use strict';`

<a name="bBhju"></a>
### 3.17 解构

1. 【推荐】使用解构存取和使用多属性对象。

2. 【推荐】对数组使用解构赋值。const arr = [1, 2, 3, 4];





<a name="iE0BQ"></a>
## 第四章 React 编程规约
<a name="07DsQ"></a>
### 4.1 命名规范

1. 【推荐】文件夹命名：

  - 业务目录（业务目录的定义和划分，需要说明）：所有文件夹除组件文件夹外所有命名均为：全部采用小写方式， 以中划线分隔，如 my-project-name

  - 组件目录：采用大驼峰，每个英文单字首字母大写如 AccountModal


(2) 【强制】组件名称命名：采用大驼峰，每个英文单字首字母大写如 AccountModal<br />(3) 【推荐】组件目录下的文件命名：组件文件默认命名为 index.js，组件样式文件默认命名为 index.less<br />(4) 【强制】props 和state相关属性采用小驼峰规范命名。

<a name="pTjAm"></a>
### 4.2 注释

1. 【强制】单行注释使用 // 进行单行注释


在评论对象的上面进行单行注释，注释前放一个空行.不同注释代码间需要进行隔行<br />正例：
```javascript
// is current tab
var active = true;
```


反例:

```javascript
var active = true;  // is current tab
```


1. 【强制】函数注释采用 /** ... */包括描述，指定类型以及参数值和返回值


正例：
```javascript
/**
   * Book类，代表一个书本.
   * @constructor
   * @description
   * @param {string} title - 书本的标题.
   * @param {string} author - 书本的作者.
   * @returns {string|*}
   */
function make(tag) {
    // ...stuff...
    return element;
}
```



反例:
```javascript
// make() returns a new element
// based on the passed in tag name
//
// @param <String> tag
// @return <Element> element
function make(tag) {

  // ...stuff...

  return element;
}
```


(3) JSX 注释采用 `{/* ... */ }`
<a name="uRYqG"></a>
### 4.3 组件单一原则
一般地，一个文件只暴露一个组件，一个文件不允许超过 500 行代码。 遵循单一原则可以让我们的组件逻辑更简单，职责更明确，复用性更好。

<a name="WjYyS"></a>
### 4.4 组件标签闭合、属性换行
(1)【强制】无内容标签自闭合<br />正例：
```jsx
<Button />
<span />
```


反例:
```jsx
<Button></Button>
<span></span>
```


1. 【推荐】属性换行：一行超过三个属性则将属性换行

<a name="UlLjS"></a>
### 4.5 组件声明
(1) 无状态函数组件

正例：
```jsx
const Button = ({ text }) => (
    <button>{ text }</button>
 )
```



反例:
```jsx
class Button extends React.Component{
    render() {
	return (
	    <Button>{ this.props.text }</Button>
	)
    }
}
```


(2) 通过 React.Component 定义组件
<a name="4AymK"></a>
### 4.6 ref 使用
(1) 【推荐】通过 ref 获取组件原生 DOM 对象。<br />(2) 【推荐】不采用传入字符串的方式赋值 ref，需采用传入函数的方式来定义 ref。

<a name="ErVcG"></a>
### 4.7 使用 propTypes 校验组件接口类型
正例：
```jsx
import PropTypes from 'prop-types';

const propTypes = {
    disabled: PropTypes.bool
}

class Button extends React.Component{}

Button.propTypes = propTypes;
```


<a name="K0i4w"></a>
### 4.8 生命周期函数书写顺序

- constructor

- componentWillMount

- componentDidMount

- componentWillReceiveProps

- shouldComponentUpdate

- componentWillUpdate

- componentDidUpdate

- componentWillUnmount

<a name="nitnm"></a>
### 4.9 组件公共方法定义
【推荐】默认采用箭头函数定义组件内的公共方法。
<a name="pKeQZ"></a>
### 4.10 state 更新方式
【强制】采用 setState 修改 state，不允许出现类似 this.state.xx = xx； 的代码
<a name="1VsSY"></a>
### 4.11 组件资源引入顺序
正例：
```jsx
//组件 （1）
//①react组件   ② UI级组件
import React, {Component} from 'react';
import { Button, Message, Modal, Loading, getMarginStyle } from 'tinper-bee';
import Grid from 'bee-complex-grid';
import CommonModal from '../CommonModal';
import DeleteModal from "../DeleteModal";

// 导入工具类（2）
import {connect, actions} from 'mirrorx';
import {deepClone, success, Error} from 'utils';

// 导入样式 （3）
import 'bee-complex-grid/build/Grid.css';
import 'bee-pagination/build/Pagination.css'
import './index.less';
```



