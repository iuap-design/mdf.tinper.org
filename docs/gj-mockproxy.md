# 数据 mock 和 proxy

<a name="db17638f"></a>
## 如何快速创建mock

> 通过简单的图示来讲解


- 访问mock平台地址：[https://mock.yonyoucloud.com/](https://mock.yonyoucloud.com/) 使用集团统一账户登录

![1.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550216604929-866100ac-d0a9-4b5a-95ba-b426f25fb8c5.png#align=left&display=inline&height=328&name=1.png&originHeight=1384&originWidth=3152&size=2090795&width=746)

- 选择个人空间，点击右侧 添加项目

![2.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550216789395-18d9438e-69b1-4875-8ab8-8865f558bed5.png#align=left&display=inline&height=291&name=2.png&originHeight=1308&originWidth=3348&size=206307&width=746)

- 输入项目名称、选择个人空间以及相应字段，选择私有或公开，点击 创建项目

![3.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550216854618-c85d8b7e-e73f-4e2b-b658-6fb0b58cfdb7.png#align=left&display=inline&height=295&name=3.png&originHeight=1328&originWidth=3356&size=188495&width=746)

- 创建项目完毕后，开始 添加接口 

![4.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550216921751-75c2a01d-9301-4545-89a4-ccf5d8bdcae3.png#align=left&display=inline&height=214&name=4.png&originHeight=956&originWidth=3334&size=165014&width=746)

- 选择分类、输入接口名称、要模拟的路径，提交

![5.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550217287384-f9121b99-8dc9-42b4-bca1-7119ca484545.png#align=left&display=inline&height=235&name=5.png&originHeight=1048&originWidth=3328&size=194931&width=746)

- 选择 编辑 选项卡

![6.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550217987720-1cfe17e5-5601-4f87-9c39-5ae6971f19bb.png#align=left&display=inline&height=318&name=6.png&originHeight=1432&originWidth=3358&size=250764&width=746)

- 找到下面的 Response 输入模拟的json，可以是mockjs方式，输入后 保存

![7.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550218021112-61157ee1-f092-47ca-a9c1-69515713802d.png#align=left&display=inline&height=308&name=7.png&originHeight=880&originWidth=2130&size=106017&width=746)

- 切换到 预览 可以查看到Mock地址，这个地址就是最终我们需要访问的地址

![8.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550218074817-97d9c532-ebae-4be4-912c-ab2ce2dec677.png#align=left&display=inline&height=510&name=8.png&originHeight=1104&originWidth=1614&size=123776&width=746)

- 浏览器访问后就可以看到我们编写的模拟JSON数据

![9.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1550218162529-568424d4-91b1-4fe9-adef-20360695ca45.png#align=left&display=inline&height=206&name=9.png&originHeight=262&originWidth=948&size=35187&width=746)

<a name="099a56c9"></a>
## proxy设置与mock平台的集成使用

设置ucf配置文件中的proxy，通过url设置对方服务器，以及本地router到对方router。

```javascript
// 代理的配置
proxy: [
  {
    // true 开启当前配置，false 关闭当前配置
    enable: true,
    headers: {
      // 与下方url一致即可
      "Referer": "https://mock.yonyoucloud.com"
    },
    // 代理的路由到对方路由
    router: [
      '/mock'
    ],
    url: 'https://mock.yonyoucloud.com'
  }
]
```

通过设置url为[https://mock.yonyoucloud.com](https://mock.yonyoucloud.com/)，然后要访问的本地路由代理到对方的路由mock，实际上访问就是：

> 只有当访问到/mock/**/路径下的才会代理到对方服务器

| 本地访问 | 远端访问 |
| --- | --- |
| http://127.0.0.1:3000/mock/326/getMasterList | https://mock.yonyoucloud.com/mock/326/getMasterList |

<a name="d41d8cd9"></a>
## 

