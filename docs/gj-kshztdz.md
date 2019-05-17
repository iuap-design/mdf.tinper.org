# 可视化主题定制

<a name="nsQhm"></a>
## 1.主题定制三部曲
- 打开[http://bee.tinper.org/tinper-bee/theme](http://bee.tinper.org/tinper-bee/theme#/) 选择可视化主题定制(如图)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/319615/1556524526074-dc6c8cb4-6b61-476a-bb35-34e0087bb52d.png#align=left&display=inline&height=709&name=image.png&originHeight=1418&originWidth=2280&size=250374&status=done&width=1140)

- 选择主题色(注:如果需要详细的配色，可以展开其他配置)

- 选择版本号(注:项目中使用的哪个版本的tinper-bee，一定要选择对应的，否则样式会有不同)

- 点击开始构建，等待下载(如图)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/319615/1556524723076-8527a706-37cc-4f50-a1df-6f399948e3da.png#align=left&display=inline&height=60&name=image.png&originHeight=120&originWidth=668&size=9375&status=done&width=334)


<a name="yhmf2"></a>
## 2.定制的主题如何快速融入ucf-webapp

拷贝定制下来的tinper-bee-theme.css，放到 ucf-webapp/ucf-common/src/styles/下面，把文件名称改成tinper-bee.css 即可，刷新项目即可显示新的样式。

<a name="CfC1s"></a>
## 3.如何定制样式带有前缀的tinper-bee.css

![image.png](https://cdn.nlark.com/yuque/0/2019/png/319615/1556525092206-70cfde0e-9df6-4ebb-a2d3-c2b36ac35b64.png#align=left&display=inline&height=139&name=image.png&originHeight=277&originWidth=3304&size=108766&status=done&width=1652)

输入定制的css样式的前缀，可编译出组件前均带有此前缀的样式。试用场景一般包括复杂的样式覆盖，提升样式优先级等功能。

