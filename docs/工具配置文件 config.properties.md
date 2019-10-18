[jra 工具包.zip](https://www.yuque.com/attachments/yuque/0/2019/zip/319615/1571303231608-abd22216-cec2-4a3f-aba8-d1b72bc99c72.zip?_lake_card=%7B%22uid%22%3A%221571303224509-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fzip%2F319615%2F1571303231608-abd22216-cec2-4a3f-aba8-d1b72bc99c72.zip%22%2C%22name%22%3A%22jra+%E5%B7%A5%E5%85%B7%E5%8C%85.zip%22%2C%22size%22%3A13475434%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22oOWdC%22%2C%22card%22%3A%22file%22%7D)工具包下载地址

本地创建config文件夹,放入config.properties 文件

示例<br />config.properties 文件内容

```json
# 产品线(ys,ncc,diwork...all代表所有)
productline=YS
# 领域(财务云，税务云，营销云，all代表所有)
domain=FED
# 项目标识（一般以代码工程来区分，按构建、打包和部署来做隔离维度）
project=FW
# 使用者组，主要决定打包范围和数据版本范围的参数，不使用项目是因为多个项目可能属于一个组
groupCode=YS_FED_FW
# 项目路径 （一般通过命令行传入）这里是为了说明参数而设置的样例，不生效
# path=
# 配置文件路径 （一般通过命令行传入，不传的话默认取项目路径下的/config/文件夹，传的话是传入的路径下的/config/文件夹）这里是为了说明参数而设置的样例，不生效
# configpath=
# 资源文件路径(不写的话，默认是项目路径下的/resources/lang/文件夹) 如果注释掉这行，则抽取时不输出资源文件
respath=/Users/jony/workspaces/yonyou/lang/new/yonyou-mdf-framework/packages/mdf-lang/resource
# 项目资源类型 （项目中需要抽取的资源代码类型，以逗号分隔，例如 java,js,db,php，方便起见，这里用了文件的扩展名，db特指数据库多语资源）
type=js,jsx
# 资源抽取器，按项目资源类型分类，统一实行IResourcesExtractor，有默认实现，也可以自行替换
# extractor={"java":"com.yonyou.iuap.ucf.multilang.extractor.JavaResourcesExtractor"}
# 开发层次(主要说明要抽取资源的项目属于哪个开发层次，0代表公共，1代表水平产品，2代表行业，3代表客开（这个需要总体架构部给个编码），层次越高优先级越高)
gradation=1
# 扩展层级（相同的开发层次也可能针对同一个资源id做不同的名词扩展，所以这里增加扩展层级的概念，对开发层次做一个补充，同样是层级越高优先级越高）
extgradation=0
# 资源库（用于切换测试、正式库，目前没有使用）
# resdb={"url":"jdbc:mysql://10.10.12.72:3306/umultilangs?useUnicode=true&characterEncoding=utf8","user":"root","psw":"ufsoft"}
# 项目库（用于配置要抽取资源的项目库的地址，目前只支持了）
# projectdb={"url":"jdbc:mysql://127.0.0.1:3306/umultilangs?useUnicode=true&characterEncoding=utf8","user":"root","psw":"ufsoft"}
# 表和字段，一个json结构的串，外层key是表名，内层key是字段名，value是翻译后的resid存的字段名
# table={"bd_org":{"name":"nameresid","displayname":"displaynameresid"}}
# 排除规则 (排除抽取的文件，该目录或文件里的资源不进行抽取和替换)
excludepath=html.jsx,html.js
# 替换规则 （不同的资源代码类型对应的替换规则是不一样的，这里可以声明每种资源类型对应的规则串）其中resid会替换成资源编码，resvalue会替换成资源内容 另注：因为是在java里执行，所以必须加转义字符，不然/* */会忽略掉
replace={"java":"com.yonyou.iuap.ucf.common.i18n.MessageUtils.getMessage(\\\"%resid\\\") /* \\\"%resvalue\\\" */","js":"cb.lang.template(\\\"%resid\\\") /* \\\"%resvalue\\\" */"}
# 数据抽取方式：1:全部新增resid 2:增量
extractiontype=2
# 资源id复用逻辑 all,product,domain,project
share=product
# 资源id查找逻辑 all,product,domain,project
search=product,domain,project
# 是否替换enum，如果进行替换，需要开发者自行解决编译错误
replaceenum=true

# 是否本地生成资源（无法远程服务时可以先生成本地然后导入，开启本参数后将不调用远端服务）
 localres=true
# 本地资源标识码，拼接在resid里，用于防止和以上传的资源产生冲突
 localflag=L
# 本地资源起始编号，本地化资源会以其实编号为起点，生成8位流水号
# localstart=10000
# 资源统一服务地址，防止以后专属化部署服务地址切换预留的参数，通过这个可以切换工具对应的统一资源服务地址
# serverurl="http://127.0.0.1/international-pub/rest/multilang/addMultiLangResource"
# 租户信息，不传默认为系统，系统为0租户
# tenantId=0
```