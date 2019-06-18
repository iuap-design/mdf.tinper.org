# 设计器-前端框架说明


<a name="1d477f81"></a>
## 工程配置

- 1、工程地址<br />
[git@git.yonyou.com]():yonyou-mdf/yonyou-mdf-design.git
- 2、安装启动
  - 构建<br />
npm install
  - 构建<br />
npm build
  - 启动<br />
npm start
- 3、页面地址
  - 模板设计器<br />
http://yaoleib.yyuap.com:3000/?billno=staff&role=tenantManage&nexusName=员工管理信息&moduleName=社会化建模&funnodeName=基础档案&locale=zh_CN

<a name="d102923e"></a>
## 工程目录

- 页面逻辑
<br />设计器代码都在 `static` 下
```bash
├── other                                       # 脚手架相关的文件和目录
  ├── src
  │   ├── index.html                              # 入口页面
  │   └── index.js
  └── static
      └── design
          ├── css                                 # 页面样式
          ├── data                                # 模拟数据
          ├── font                                # 字体图标
          ├── img                                 # 图片资源
          ├── js
          │   ├── ckeditor
          │   │   ├── lang                        # 多语资源
          │   │   └── ...
          │   ├── form                            # 设计器页面js逻辑
          │   │   ├── component                   # 组件库
          │   │   │   ├── approveopinion.js
          │   │   │   ├── ...
          │   │   │   └── userselecter.js
          │   │   ├── component.js                # 组件基类，定义组件需要的方法
          │   │   ├── componentmodel.js           # 组件远程获取数据接口
          │   │   ├── form-formula.js             # 增加的公式功能(文本控件) 
          │   │   ├── form-multilanguage.js       # 增加的多语功能(文本控件) 
          │   │   ├── form-plugin.js              # 配置/添加组件
          │   │   ├── formlayout.js               # 设计器主逻辑（增加功能注册事件）
          │   │   ├── formpreview.js
          │   │   ├── tplutil.js                  # 模板字符串，修改到的都抽取成 html 模板了
          │   │   └── utils.js                    # 公共方法，弹窗message、loading等
          │   ├── requirejs
          │   ├── teams                           # 模板管理页面js逻辑
          │   │   ├── component
          │   │   │   ├── event.js
          │   │   │   └── template.js             # 模板字符串(模板管理页面)
          │   │   ├── core
          │   │   │   ├── app.js
          │   │   │   ├── main.js                 # 貌似是整个app的启动模块
          │   │   │   ├── page.js
          │   │   │   └── router.js
          │   │   ├── form
          │   │   │   ├── formcloudmodel.js       # Backbone.Model
          │   │   │   ├── formcloudview.js
          │   │   │   ├── formcolor.js
          │   │   │   ├── formmanagemodel.js      # Backbone.Model
          │   │   │   ├── formoperationview.js
          │   │   │   ├── formpage.js
          │   │   │   └── formwriteview.js        # 模板管理主逻辑（增加功能注册事件）
          │   │   ├── formstat
          │   │   │   ├── formstatdatatableview.js
          │   │   │   └── formstatmodel.js
          │   │   └── utils.js
          │   ├── trd                             # 第三方组件 
          │   ├── form.js
          │   ├── index.js                        # 设计器入口js，配置require
          │   ├── plugins.js
          │   ├── table.js
          │   └── ...
          ├── swf
          └── tmpl
              └── template.html                   # 组件模板
```


<a name="cf00790f"></a>
## 加载流程（index.js  =>  formlayout.js）

- 1、index.js中获取语种信息后将formlayout.js引入；
- 2、formlayout.js中c.loadFormLayout方法将大JSON解析成设计区域的控件布局，c.loadtreeData方法获取元数据，解析成左侧业务对象树；
- 3、控件对应的设置区域是点击控件触发渲染的。

<a name="9902bff0"></a>
## formlayout.js详细说明

- 1、先初始化执行了几个方法，包括绑定事件、获取大JSON以及获取元数据，分别说明如下：
  - c.beforeunload()				关闭窗口时如果有未保存时的提示
  - c.formEvents()				编辑区事件绑定
  - c.formSetupEvents()			表单设置区域的事件绑定
  - c.componentSetupEvents()		控件设置区域事件绑定
  - c.componentDraggableEvents()	拖拽事件
  - c.loadFormLayout()			获取大JSON并解析渲染设计区域
  - c.loadtreeData()				获取元数据并解析渲染左侧业务对象树
- 2、三个主要接口：
  - 获取大JSON：queryTemplate
  - 获取元数据：loadBusinessObj
  - 保存：saveUITemplate
- 3、loadFormLayout方法：
  - 基本流程：获取大JSON => c.analyseLayout => c.analyseComponent
  - analyseLayout：将字符串数据转为对象
  - analyseComponent：循环递归，初始化绑定该控件的属性，并调用控件自己js中的renderEditPreview方法，渲染控件
- 4、loadtreeData方法：
  - 基本流程：获取元数据 => c.initTreeModel
  - initTreeModel：初始化业务对象树
- 5、拖拽逻辑说明：
  - 拖拽业务对象（c.businessObjectTable）：<br />
原理：直接new相应的控件进行初始化，将元数据当前拖拽节点的数据携带过来后重新赋值给该控件对应的属性，然后调用targetDiv.data("componentData", b)初始化绑定控件的componentData，最后调用该控件自己js中的render方法渲染。
  - 拖拽控件、布局<br />
原理：原理同拖拽业务对象的实现，区别是，业务对象的控件类型是元数据携带的，而基础控件和布局是写死的DOM，控件的componentKey也是绑定在DOM上的，从DOM上取出componentKey，进行相应控件的初始化和componentData的绑定。

<a name="f02cc1a7"></a>
## 保存逻辑

- 1、流程：c.saveOrupdatejs  =>  doSaveAjax
- 2、saveOrupdatejs：处理成保存接口调用需要的数据格式，该方法中调用了assemComponent方法，递归生成每个布局组件的layoutDetail，最后生成大json。该方法最终return出一个对象，格式为{ form: {}, formLayout: {} }，form中存放了模板的信息，formLayout中是布局，也就是大json。
- 3、doSaveAjax：调用保存接口。

<a name="dc506e24"></a>
## 单个控件举例说明（单行文本输入框text.js）

- 1、初始化控件时，将属性重新赋值放在componentSetup中，对应的html模板赋值给		tpl这个变量。
- 2、四个render方法：
  - renderEditor：		点击控件时触发，渲染控件设置区域
  - renderEditPreview：	解析大json时触发，渲染设计区域，绑定componentData
  - render：				拖拽释放触发，渲染设计区域
  - renderPreview：		预览触发，渲染该控件的预览结构
- 3、所有更改控件属性的方法都会通过formlayout.js触发并回调到对应控件的内部方法中，以更改该控件的私有属性。
- 4、所有控件的属性和方法都通过$(“控件元素”).data("componentData")获取，比如控件的属性在$(“控件元素”).data("componentData"）.componentSetup这个对象中，控件的内部方法如更改标题，调用$(“控件元素”).data("componentData").setTitle(val)。

<a name="de50479a"></a>
## 新增控件流程

- 1、在工具栏添加控件
  - 在src/index.html中的工具栏添加新的控件DOM
- 2、在模板中添加新控件模板
  - 在static/design/tmpl/templates.html中添加新组件的模板DOM
  - 在static/design/js/form/tplutil.js中添加模板的引入
- 3、创建组件JS文件
  - 在static/design/js/form/component目录下创建新控件的渲染JS
  - 编辑渲染逻辑
- 4、添加新控件引用
  - 在static/design/js/form/form-plugin.js中添加新控件的引用

