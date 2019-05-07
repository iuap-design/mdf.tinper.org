# 迁移升级工具 ucf-web-migrate

> 一个 CLI 工具，旨在帮助uba开发者用户快速将其工程迁移升级为 ucf-web 微前端框架


<a name="e655a410"></a>
## 安装

```bash
# 安装全局
npm i ucf-web-migrate  -g
```

<a name="ecff77a8"></a>
## 使用

1. 首先需要切换到原来的工程目录下，执行 
```bash
migrate init
```

2. 等待工具帮助我们迁移完成


![GIF.gif](https://cdn.nlark.com/yuque/0/2019/gif/257952/1552099628476-69ce7646-8513-43ed-9573-a37d19cde935.gif#align=left&display=inline&height=514&name=GIF.gif&originHeight=635&originWidth=922&size=25463&status=done&width=746)
<a name="f411d0f1"></a>
## 说明

工具在迁移是依赖原项目的 node_modules 环境，所以要先安装原来的项目依赖，安装过程中会生成备份目录（_back）,并迁移所有的源代码，同时适配 原uba脚手架搭建的单页和多页项目。


<a name="9525aaf3"></a>
## 问题解答

1. 为什么我执行命令后出现了找不到webpack的错误？
  1. 请使用npm install安装原来工程依赖包即可，工具需要读取内置资源包
2. 这个工具会不会把我原来的工程给改坏了？
  1. 绝对不会对原始工程做修改，操作之前，工具会在根目录下备份`_bak`名字的资源目录，放心使用
3. 迁移完成后，我想知道ucf工程都有什么、都是做什么的？
  1. 可以移步这里了解：[https://www.yuque.com/ucf-web/book/gv978w](https://www.yuque.com/ucf-web/book/gv978w)
4. 我对工具源码比较关注，我从哪里可以看一下工具都是如何操作的呢？
  1. 可以移步查看源码：[https://github.com/iuap-design/ucf-web-migrate](https://github.com/iuap-design/ucf-web-migrate)
