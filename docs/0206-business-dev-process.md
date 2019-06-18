# 初试业务开发全流程

<a name="a5b57a8e"></a>
# 开发文档

<a name="054c2d8e"></a>
## 一、环境搭建

<a name="efcc3182"></a>
### 1、后端项目启动

**准备工作（首先在git上clone下后端工程omc_test）**<br />**

- Tomcat：版本8.0
- jdk :版本1.8
- maven：版本3.5.4
- eclipse ：版本4.9.0

**eclipse中导入后端工程yonyou-mdf-server,该工程为springboot工程，启动yonyou-mdf-server模块下的启动类即可，需要注意的是，yonyou-mdf-server模块下，在application.xml文件中有rpc的配置，本地测试时尽量更改一下注册后的工程名称，防止影响其他的注册服务。**<br />**

- 引入工程前需要eclipse配置jdk、maven等，配置settings.xml引用，步骤为： eclipse->window->preferences->user settings->user settings browse->引入配置后settings.xml->update settings->apply->apply and close
- 更新项目，右键omc项目->maven->update project，更新时选择全部工程
- 修改路径，右键omc-web项目->web project settings->context root->改成/->apply and close
- 创建server，server->add and remove->add omc-web项目->完成->启动项目

<a name="ab6b510e"></a>
### 2、前端项目启动

**准备工作（首先在git上clone下前端工程omc_test_web）**<br />**

- 安装node-v6.3.1-x64.msi    `在前端工程omc_test_web\tools目录下有该工具，双击安装即可`
- 因为使用的是diwork登录拦截，所以访问需要域名访问，本地开发可以通过修改omc_test_web工程目录下的package.json文件，将127.0.0.1修改为本地host文件映射的域名（本地host文件映射域名，即在C:\Windows\System32\drivers\etc目录下的hosts文件中增加一个域名映射），如下图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180039-54fecd98-128c-40ab-9f9f-907784867857.png#align=left&display=inline&height=144&originHeight=204&originWidth=1023&size=0&status=done&width=720)
- 启动client，步骤为：打开dos窗口--->项目根目录--->npm install --->npm run debug:client
- 启动服务端，步骤为：打开dos窗口--->项目根目录 --->npm run debug:server
- 在后端工程启动的情况下，访问地址：[http://localhost:3003/](http://localhost:3003/)

<a name="c329095f"></a>
## 二、元数据及模板配置

<a name="1554b91c"></a>
### 目前支持两种方式的元数据配置；方式1为通过xml文件生成元数据 ,方式2为通过平台的配置页面生成元数据

<a name="c19ff2df"></a>
#### 方式1：

- 在omc-meta-resources工程中定义元数据的xml文件，定义方式可参考员工bd_staff.xml文件进行配置,xml文件中详细说明如下：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180349-668b2fbc-d82c-4380-9c8e-81dfedf8edc0.png#align=left&display=inline&height=439&originHeight=546&originWidth=896&size=0&status=done&width=720)![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180233-f8e01c34-b616-4af3-9c99-4abfad0c9c17.png#align=left&display=inline&height=225&originHeight=314&originWidth=1005&size=0&status=done&width=720)

上图中，`<references><reference file="base.xml"/></references>`表示引入； `<component name="defdocument" moduleName="bd" title="自定义档案组件">`表示组件，其中name：组件编码、title：组件名称、moduleName：所属模块； `<class name="DefdocumentVO" title="自定义档案" tableName="bd_defdocument">` 表示实体，其中name：实体编码、title：实体名称、tableName：表名；`<attribute name="code" columnName="code" title="自定义档案编码" type="String" iLength="100"/>`表示属性，其中name：属性编码、columName：表字段名、type：类型、iLength：长度； `<enum name="EnumCertType" title="证件类型">`表示枚举；另外还有realization表示实现（client：对应当前的vo对象路径名称，supplier：实现接口的路径名称）、generalization表示继承（parent：继承vo类路径名称，child：对应当前的vo对象路径名称）、association表示关系（type：表示对应关系类型，默认：composition，roleB：主表别名，typeB：主表，roleA：从表别名，typeA：从表，roleAMulti：对应的表示1，1..n，n..n关联关系）。 

- 执行omc-app-test下的DomainBuildTest和TableBuildTest生产元数据实体和建表SQL,需要更改appNames，改为xml中定义的，例如bd.defdocument（对应xml文件中的moduleName.name）如下图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180089-a6dd137e-65b1-4749-84b2-de5f3a8eaf07.png#align=left&display=inline&height=62&originHeight=67&originWidth=783&size=0&status=done&width=720)执行后会生成建表sql，会生成omc-resources目录，建表sql会生成在该目录下（需要刷新），然后在数据库中执行该建表sql；

<a name="9131dc31"></a>
#### 方式2：

- 方式2为通过平台的配置页面生成元数据，都是通过界面化的配置，配置页面地址为：<[http://workbench.yyuap.com/yymetadata-web/index/index.html#/basemodel](http://workbench.yyuap.com/yymetadata-web/index/index.html#/basemodel)>
- 首先配置组件，其中模块和编码生成组件的URI，配置信息如图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180050-ce24ab28-b7a1-4855-b892-9ba61df02174.png#align=left&display=inline&height=217&originHeight=407&originWidth=1348&size=0&status=done&width=720)
- 其次是添加实体，组件新建完成后，点击修改按钮进入修改界面，在该界面点击添加按钮，添加实体，添加实体时需要继承基类，同时，接口需要添加ITenant接口，配置如图：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180216-3e683027-e461-494d-8ba5-136444e2a2c4.png#align=left&display=inline&height=225&originHeight=483&originWidth=1543&size=0&status=done&width=720)
- 最后是添加属性，属性添加方式和实体类似，实体新建完成后，点击修改按钮进入修改页面，页面中有添加属性按钮，上图红色方框内，需要注意属性的类型，根据属性选择相应的类型
- 如果属性中有枚举类型，需要先新建枚举，枚举的新建在组件页面，如图中的红色框，如图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180121-d98b8ba8-1129-4c37-80bc-3453e1cb827b.png#align=left&display=inline&height=118&originHeight=199&originWidth=1215&size=0&status=done&width=720)
- 组件创建完成后，导出DDL文件，并在数据库中执行该文件。如下图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180104-03129b94-9565-461d-a94b-07c0ed881b09.png#align=left&display=inline&height=160&originHeight=186&originWidth=838&size=0&status=done&width=720)

<a name="a46d3f23"></a>
### 模板配置，同样有两种方式，一种是通过Excel生成，另一种是通过设计器

<a name="018f925e"></a>
#### Excel方式：

1. 在omc_test\scripts\UIExcel里复制一个excel表格，配置列表和卡片，Excel中只需要更改几处即可，包括cBillNo，要根据xml文件中配置的组件名称来配置，如名称为defdocument，则cBillNo需要更改为defdocumentlist，注：不是单个替换，需要全部替换为defdocumentlist，可以再Excel中查找替换，全部替换，如下图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180153-581a8dac-7d9c-4b73-b793-da072c19ee52.png#align=left&display=inline&height=160&originHeight=201&originWidth=905&size=0&status=done&width=720)另外还有修改数据源cDataSourceName，该名称同样是根据xml中进行修改，例如bd.defdocument.DefdocumentVO，如下图所示：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180429-fe948c2a-35e4-40a4-b3e7-b702bcdcf0a1.png#align=left&display=inline&height=230&originHeight=230&originWidth=406&size=0&status=done&width=406)；还要修改字段，需要显示哪几个字段配置哪几个，如下图：![](https://cdn.nlark.com/yuque/0/2019/png/271483/1551684180460-b998e340-2062-4fda-aaa4-1d6493e0c4ec.png#align=left&display=inline&height=107&originHeight=197&originWidth=1323&size=0&status=done&width=720)；
2. 执行excel的宏，生成对应的UI数据sql，生成路径omc_test\scripts\UIExcel\UIExcelCreateSQL，然后将生成的sql在数据库中执行。

<a name="393e3809"></a>
#### 设计器模式：


<a name="01dd0cb7"></a>
### 扩展开发文档

> 详情查看《[营销云-扩展开发](https://www.yuque.com/gpgy5k/ucf/rfmm1s)》


