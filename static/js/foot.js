var timer = null

function append(){
    timer&&clearTimeout(timer);
    var container = document.getElementById('yuque-book-container')
    if(container){
        var div = document.createElement('div');
        div.innerHTML = '<div class="footer"><div class="u-row footer-top"><div class="u-col-md-3 u-col-sm-6 u-col-xs-12 footer-top-item"><p><b>相关资源</b></p><ul><li><a target="_blank" href="//mock.yonyoucloud.com/">Mock 接口管理平台</a></li><li><a target="_blank" href="//package.yonyoucloud.com/#/">YNPM-用友Node镜像服务</a></li><li><a target="_blank" href="//github.com/tinper-bee/bee-tools">bee-tools 基础组件开发工具</a></li><li><a target="_blank" href="//github.com/tinper-acs/ac-tools">ac-tools 业务组件开发工具</a></li><li><a target="_blank" href="//github.com/tinper-acs/ac-tools">YYIMSDK 即时通讯 SDK</a></li><li><a target="_blank" href="//www.yuque.com/ucf-web/book">UCF-WEB 微前端框架</a></li><li><a target="_blank" href="//tinper.org/webide/">Moy 框架在线示例</a></li><li><a target="_blank" href="//github.com/lebra/lebra-components">lebra-components 移动组件库</a></li></ul></div><div class="u-col-md-3 u-col-sm-6 u-col-xs-12 footer-top-item"><p><b>社区</b></p><ul><li><a target="_blank" href="//github.com/iuap-design/blog/issues">云平台体验技术团队BLOG</a></li></ul></div><div class="u-col-md-3 u-col-sm-6 u-col-xs-12 footer-top-item"><p><b>帮助</b></p><ul><li><a target="_blank" href="//github.com/tinper-bee">组件Github 源码</a></li><li><a target="_blank" href="//github.com/iuap-design/tinper-bee/releases">更新记录</a></li><li><a target="_blank" href="//github.com/iuap-design/tinper-bee/issues">常见问题</a></li></ul></div><div class="u-col-md-3 u-col-sm-6 u-col-xs-12 footer-top-item"><p><b>联系我们</b></p><ul><li><img src="//iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/tinper-bee/logo/address.png"> 北京市海淀区北清路68号用友产业园</li><li><img src="//iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/tinper-bee/logo/mail.png"> guoyff@yonyou.com</li></ul></div></div><div class="u-row"><div class="u-col-md-12 u-col-sm-12 u-col-xs-12 footer-middle"><div class="footer-line"></div></div><div class="u-col-md-12 u-col-sm-12 u-col-xs-12 footer-base"><div class="footer-base-font"><p class="copy-right">版权所有：用友网络科技股份有限公司 2017 京ICP备05007539号-7 京ICP证100714号 京公网安备1101080209224号</p><p class="produ">Powered by yonyou</p></div></div></div></div>'
        container.append(div)
    }else{
        timer = setTimeout(() => {
            append()
        }, 300);
    }
}

window.onload=function(){
    append();
}