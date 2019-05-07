# 什么是 MDD


基于多端协议的模型驱动开发方式，简称为 `UCF-MDD`，即通过`UI`元数据（`viewapplication`）来描述页面UI的布局效果，通过数据模型（`viewmodel`）来描述页面交互逻辑及数据模型。标准化的多端协议接口将以上信息通送达到前端（多端），端上再通过一套渲染引擎SDK通过协议解析并与标准组件绑定后实现`UI`渲染，并提供给开发者一定的`UI`扩展操作和数据扩展操作的能力。


<a name="67b24e26"></a>
## 什么是mtl-web

mtl-web 是在一致性多端协议的基础上，结合标准基础组件和复合业务组件而提供的一套渲染引擎。能够将标准协议翻译成前端页面进行渲染和呈现，实现快速开发，并实现运行时页面的动态可扩展，

<a name="54e6e5d2"></a>
## 标准协议说明

- 模型定义-viewapplication：[https://www.yuque.com/gpgy5k/ucf/ikpq0g](https://www.yuque.com/gpgy5k/ucf/ikpq0g)
- 模型定义-viewmodel：[https://www.yuque.com/gpgy5k/ucf/ud8q1m](https://www.yuque.com/gpgy5k/ucf/ud8q1m)

