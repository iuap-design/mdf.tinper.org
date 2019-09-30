<a name="b3HCx"></a>
# 

MDF2.0 框架在mdf-cube核心包中内置了requirejs，用于在客户端支持AMD方式的文件模块化

并在cb对象上挂载了两个模块化相关API：

```css
// 加载并运行文件
cb.require('', function(){

})

// 定义模块
cb.define('', [], function(){

})
```