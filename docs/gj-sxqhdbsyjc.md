# 实现前后端部署与集成

前提：构建出目标前端静态资源。<br />当前部署方式从是否使用Gpass角度讲分为两种：<br />（1）Gpass平台部署<br />这种部署方式将iuap应用平台、前端工程、后端工程统一部署到Gpass平台<br />（2）云原生部署<br />这种部署方式会先将前端工程部署到iuap应用平台，然后将iuap应用平台和后端工程独立部署，而云原生根据静态资源的部署方式又分为nginx部署和tomcat 部署。

<a name="a8c86abc"></a>
## 1 通过 GPaaS 进行部署

// 会链接到用友云平台官网的相关部署文档

<a name="04966614"></a>
## 2 通过云原生的方式进行部署
<a name="bbe7d79a"></a>
### 2.1 nginx 部署
<a name="3e15d0d1"></a>
#### 2.1.1 前端打包

![微信图片_20190220130103.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550638893426-bbef35cf-d479-4b17-907c-8c736f1274dd.png#align=left&display=inline&height=576&name=%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190220130103.png&originHeight=904&originWidth=1170&size=177682&width=746)<br />打包完成后生成ucf-publish目录，最后部署到应用平台也是这个目录结构<br />![1.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550639682085-9b43637c-e49e-4e19-9453-d30c73690f25.png#align=left&display=inline&height=606&name=1.png&originHeight=606&originWidth=378&size=60134&width=378)

<a name="ac7464f5"></a>
#### 2.1.2 后端打包
后端打包的时候只需要打包后台自己开发使用的工程<br />在后端工程名下右键按照如下步骤操作<br />![后端打包01.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550640187693-9b752bb8-083f-4081-92c2-1fe46bc4cb0e.png#align=left&display=inline&height=658&name=%E5%90%8E%E7%AB%AF%E6%89%93%E5%8C%8501.png&originHeight=712&originWidth=807&size=59297&width=746)<br />生成war包

![后端打包02.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550640297419-70f58422-bc01-4cb6-98a0-47be11e1eb23.png#align=left&display=inline&height=224&name=%E5%90%8E%E7%AB%AF%E6%89%93%E5%8C%8502.png&originHeight=362&originWidth=1203&size=29168&width=746)<br />打包成功

![后端打包03.png](https://cdn.nlark.com/yuque/0/2019/png/192593/1550640358503-c121553c-dbb9-44bd-8258-8855e7eadd6c.png#align=left&display=inline&height=167&name=%E5%90%8E%E7%AB%AF%E6%89%93%E5%8C%8503.png&originHeight=167&originWidth=384&size=6037&width=384)<br />打包结果

<a name="7c5d1ccb"></a>
#### 2.1.3 nginx配置

<a name="a45a3ec9"></a>
### 2.3 tomcat 
前端资源打成war包，被java后端引用，部署在一个tomcat服务器



