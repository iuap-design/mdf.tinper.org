# 开发调试经验和技巧

<a name="8ae75dfe"></a>
## 1开发调试的时候通常我们会遇到以下几种问题

（1）在浏览器中有明显的报错信息<br />（2）无明显的报错信息需要在安装插件，当前只说明Chrome浏览器下的调试方法

<a name="3dc8811b"></a>
## 2具体操作步骤如下：
开发调试中常用的调试插件有两个react-developer-tools、redux devtools，react-developer-tools中用于查看react源码，因为在浏览其中我们看到的是原生的代码，有时我们需要查看对应的react源代码；而redux devtools用于redux项目状态进行调试

<a name="5a2f3fab"></a>
### 2.1下载插件
因为谷歌插件下载需要FQ（FAN QIANG）,这里提供一个本地资源：https://www.crx4chrome.com/crx/3068/，谷歌下载.crx后缀的文件，也可以在FQ状态下访问google商店[https://chrome.google.com/webstore/category/extensions](https://chrome.google.com/webstore/category/extensions)，搜索react developer tools和redux即可<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550542375698-72cf5ee5-1989-4621-bc85-4fe50ad9d2c2.png#align=left&display=inline&height=754&name=image.png&originHeight=943&originWidth=1920&size=233647&width=1536)<br />react developer tools

![image.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550543545048-a3ccb5e5-01ce-45be-b741-02ea04e99f1a.png#align=left&display=inline&height=754&name=image.png&originHeight=943&originWidth=1920&size=310910&width=1536)<br />redux devtools

<a name="06178f6f"></a>
### 2.2 插件安装（以谷歌为例）
打开谷歌浏览器，在路劲栏输入：[chrome://extensions/，]()将下载的插件拖入谷歌浏览器（crx后缀文件），然后选中允许访问文件网址<br />![](https://cdn.nlark.com/yuque/0/2019/png/192593/1550544713850-9e1d7156-9609-4ed3-b941-15fe41da20c9.png#align=left&display=inline&height=242&originHeight=626&originWidth=1930&size=0&width=746)

点击详细信息<br />![](https://cdn.nlark.com/yuque/0/2019/png/192593/1550544768489-8d28f81a-e9ce-4e23-9c3e-1a0b126b7bf1.png#align=left&display=inline&height=573&originHeight=1442&originWidth=1414&size=0&width=562)<br />react developer tools会自动检测React组件，不过在webpack-dev-server模式下，webpack会自动将React组件放入到iframe下，导致React组件检测失败，变通方法是webpack-dev-server配置在--inline模式下即可。<br />安装完成后，如果访问的是react页面，打开控制面板（右键选择）可以看到React标签，同时在右侧可以看到props、state相关的值。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550548589708-877c9214-3982-4eaf-b05b-ddb7e05f7943.png#align=left&display=inline&height=790&name=image.png&originHeight=987&originWidth=1920&size=134145&width=1536)<br />在redux页签内也可以查看mirrorx中相关的状态值，如下图所示<br />![redux.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550560583966-1d2714cb-97f3-477b-a3bd-e941a47b92b8.png#align=left&display=inline&height=366&name=redux.png&originHeight=943&originWidth=1920&size=48581&width=746)<br />

<a name="39b81a1d"></a>
### 2.3 具体调试


<a name="9c7e1a25"></a>
#### 2.3.1 Console中显示具体错误信息
如果console中含有具体的错误信息，通常提示中会显示错误代码所在的文件和具体的行号信息，或者直接单击错误信息也可以直接跳转到错误的页面及相应行<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550557049398-25e01b43-770f-4404-8cd0-8199f7cebeb6.png#align=left&display=inline&height=754&name=image.png&originHeight=943&originWidth=1920&size=149320&width=1536)<br />错误提示信息

![image.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550557212600-d6cdc7b6-94f4-4563-83b9-ca9e762f7eb5.png#align=left&display=inline&height=754&name=image.png&originHeight=943&originWidth=1920&size=162650&width=1536)<br />具体错误页面

<a name="665208d3"></a>
#### 2.3.2无明显错误信息时调试
有时console没有提示具体的错误信息，但是页面显示与我们的预期不符，这样就需要进行逐点调试，逐点调试的意思是在相关操作的不同执行逻辑处设置断点,切换到Sources页签，在左侧webpack/src找到对应的文件<br />![sources.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550559800651-165f519d-cf1b-456d-8080-63eba476258a.png#align=left&display=inline&height=366&name=sources.png&originHeight=943&originWidth=1920&size=114543&width=746)<br />断点调试期间同时可以在React 页签下观察props和state值

特别提示：try...catch...会吞掉错误信息，如果相关代码通过try...catch...包裹，而代码有错误此时错误并不会显示在console中，这一点需要特别注意。

