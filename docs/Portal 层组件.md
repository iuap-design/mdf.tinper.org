<a name="xqwI2"></a>
# 一、页面结构
 portal页面分为三部分，header区域，主菜单和动态显示区； header区域包括logo区域，父页面tabs切换区和用户相关信息；父页面tabs切换区为tabs切换栏，不展示pannel；动态显示区为tabs嵌套，不显示切换title只展示pannel；<br />![portal页面结构图.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558172618130-d2adfc89-bcf9-4e7c-bf01-e0943ae63929.png#align=left&display=inline&height=532&name=portal%E9%A1%B5%E9%9D%A2%E7%BB%93%E6%9E%84%E5%9B%BE.png&originHeight=532&originWidth=751&size=8991&status=done&width=751)

<a name="5QUtc"></a>
# 二、页面加载方式
portal页为单独的入口页面，内部无子路由，通过tabs嵌套在动态显示区展示不同的页面。portal页面加载的数据源主要分为两个部分tabs和portal；<br />**tabs嵌套说明**：用户从菜单栏中点击加载功能节点，数据会被保存在tabs中，利用tabs组件的activeKey每次来展示一个功能节点信息，这页面暂称为**父页面；**每个功能节点可能会包含有列表和查看详情的交互，父页面的渲染也是加载了一个tabs，利用portal中的activeKey来展示出页面，这个最终被展示出来的页面成为**子页面**；

tabs数据：

```
{
    "panes": [{
        "key": "PORTAL",
        "title": "首页",
        "closable": false,
        "content": {
            "type": "platform",
            "url": "home"
        },
        "params": {
            "key": "PORTAL",
            "title": "首页",
            "content": {
                "type": "platform",
                "url": "home"
            }
        }
    }],
    "needUpdate": true,
    "activeKey": "PORTAL"
}

```
**tabs数据说明：**<br /> panes负责渲染header区域的tabs切换栏和动态区域的父页面；<br />activekey用来展示当前pannel；<br /> 

portal数据格式：<br />![77B4F639-EF1C-4EC3-8236-2C73E8403FE4.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558170097569-c163939c-4f35-4c10-a99a-e0134518e217.png#align=left&display=inline&height=1566&name=77B4F639-EF1C-4EC3-8236-2C73E8403FE4.png&originHeight=1566&originWidth=720&size=161922&status=done&width=720)

protal数据说明：<br />1.每一个功能节点的code对应一个数据，数据中panes是一个数组结构，用来渲染子页面的tabs；<br />2.每个功能节点中的activeKey用来展示当前的页面;
<a name="9uzQe"></a>
# 三、关键流程分析
 1、添加tabs项<br />      点击菜单栏添加新的功能节点，首先dispatch tabsacition的addItems，更新tabs数据，然后重新渲染tabs界面<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558322653590-8eb755cc-7457-4a6b-9585-b0062b603e39.png#align=left&display=inline&height=502&name=image.png&originHeight=1456&originWidth=1152&size=315505&status=done&width=397) <br />因为有新的portalTabItem 的组件添加，会调用该组件的componentDidMount钩子函数，在该生命周期中dispatch了portalAction的metaInit，实现了portal数据与tabs数据的同步，渲染动态显示区。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558322860580-9cd25cc0-4171-42d6-b23b-5f9c8edfeda6.png#align=left&display=inline&height=126&name=image.png&originHeight=288&originWidth=1654&size=52699&status=done&width=722)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558322968838-5c20ecc5-5af7-4418-9190-db5fd458ff92.png#align=left&display=inline&height=700&name=image.png&originHeight=1396&originWidth=1436&size=366903&status=done&width=720)

2、 删除tabs项<br />  删除某一功能点dispatch的是tabsaction的deleteItem，更细tabs数据，同时渲染页面<br /> ![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558334238175-a5629656-ef88-4e95-a413-741eea4dec1d.png#align=left&display=inline&height=798&name=image.png&originHeight=798&originWidth=1528&size=173846&status=done&width=1528)<br />删除项被卸载，触发componentWillUnmount钩子函数，在该生命周期中，会调用portalactions的destory方法，同步protal数据，渲染动态展示区；<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558334354344-488dd982-b85e-41de-bb8f-b44f6de91558.png#align=left&display=inline&height=147&name=image.png&originHeight=218&originWidth=1104&size=35984&status=done&width=744)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558334399387-27a9a52e-e19f-4ea2-8f01-09ca896e7541.png#align=left&display=inline&height=190&name=image.png&originHeight=190&originWidth=1342&size=65102&status=done&width=1342)

3、功能节点内部跳转<br />  从功能节点的列表页跳转到详情页时，会触发portalaction的addItem，更新portal数据，渲染动态展示区<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/296771/1558335104135-585e99f5-9091-4f13-b2a0-864e69cdd168.png#align=left&display=inline&height=190&name=image.png&originHeight=190&originWidth=1342&size=65102&status=done&width=1342)

