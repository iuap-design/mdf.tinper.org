# 不同node版本构建影响因素对比

> 可以参考看下阿里Egg团队的文章：[Node 12 值得关注的新特性](https://www.yuque.com/egg/nodejs/nodejs-12)


<a name="bf86b"></a>
## node 10.15.1(MacOS 10.14.2)
使用`node10.15.1`执行ucf构建服务(res_extra:false)消耗时间是：187秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557995767171-d801d97c-fd81-4b0f-9569-ffae45792ef7.png#align=left&display=inline&height=382&name=image.png&originHeight=764&originWidth=1454&size=283402&status=done&width=727)

使用`node10.15.1`执行ucf构建服务(res_extra:true)消耗时间是：91秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557996022688-5a7c8e83-7a0d-47df-913c-7ac0d532ddc9.png#align=left&display=inline&height=444&name=image.png&originHeight=888&originWidth=1476&size=328260&status=done&width=738)

<a name="U1UJX"></a>
## node 10.15.1(Windows10 SSD)
使用`node10.15.1`执行ucf构建服务(res_extra:false)消耗时间是：216秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557996151969-51865341-d4a0-4952-84db-77add4395d3c.png#align=left&display=inline&height=260&name=image.png&originHeight=519&originWidth=993&size=505619&status=done&width=496.5)

使用`node10.15.1`执行ucf构建服务(res_extra:true)消耗时间是：91秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557996227708-ce9ed86e-df02-40e6-b323-b2536f698dfe.png#align=left&display=inline&height=299&name=image.png&originHeight=597&originWidth=991&size=515102&status=done&width=495.5)

<a name="Pelcc"></a>
## node 12.2.0(MacOS 10.14.2)
使用`node12.2.0`执行ucf构建服务(res_extra:false)消耗时间是：158秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557997276309-17db653c-8729-4c54-a1e3-92fb04d7b4fd.png#align=left&display=inline&height=486&name=image.png&originHeight=972&originWidth=1184&size=242130&status=done&width=592)

使用`node12.2.0`执行ucf构建服务(res_extra:true)消耗时间是：73秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557996784442-e7d82a98-88fc-4e3e-bc46-c036df307b89.png#align=left&display=inline&height=486&name=image.png&originHeight=972&originWidth=1184&size=247766&status=done&width=592)<br />启用构建缓存优化后：38秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557996898329-5ddcad85-8844-4080-95d8-05163c3e6d08.png#align=left&display=inline&height=486&name=image.png&originHeight=972&originWidth=1184&size=190220&status=done&width=592)

<a name="DgoWq"></a>
## node 12.2.0(Windows10 SSD)
使用`node12.2.0`执行ucf构建服务(res_extra:false)消耗时间是：223秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557997768363-8c0b8366-b32e-4a82-a126-ca4e41fac48c.png#align=left&display=inline&height=337&name=image.png&originHeight=674&originWidth=989&size=435412&status=done&width=494.5)<br />使用`node12.2.0`执行ucf构建服务(res_extra:true)消耗时间是：87秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557997078635-689cedc8-c478-4923-8289-76867f2ad449.png#align=left&display=inline&height=337&name=image.png&originHeight=674&originWidth=989&size=578650&status=done&width=494.5)<br />使用构建缓存后：54秒<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/192735/1557997132594-55dccd09-4aa9-4552-baaa-c8e207e1b391.png#align=left&display=inline&height=337&name=image.png&originHeight=674&originWidth=989&size=690026&status=done&width=494.5)

<a name="Cqpzf"></a>
## 各个版本优化对比图

| node版本 | 优化 | 平台 | 耗时秒 |
| --- | --- | --- | --- |
| 10.12.1 | 否 | MacOS(i7-16g-ssd512g) | 187 |
| 10.12.1 | 是 | MacOS(i7-16g-ssd512g) | 91 |
| 10.12.1 | 否 | Windows10(i5-8g-ssd256g) | 216 |
| 10.12.1 | 是 | Windows10(i5-8g-ssd256g) | 91 |
| 12.2.0 | 否 | MacOS(i7-16g-ssd512g) | 158 |
| 12.2.0 | 是 | MacOS(i7-16g-ssd512g) | 73 |
| 12.2.0 | 否 | Windows10(i5-8g-ssd256g) | 223 |
| 12.2.0 | 是 | Windows10(i5-8g-ssd256g) | 87 |


