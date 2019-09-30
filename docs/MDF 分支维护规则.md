<a name="ITpDE"></a>
## 两条主干分支


| 分支 | 分支说明 | 用途 | 对应版本号规则 |
| --- | --- | --- | --- |
| `master` 分支 | 代表稳定分支，其每次合并都视为一次版本发布。理想情况下会打tag，同时发包。具体过程还需要再讨论细化。 | pre 预发布环境 | 可用于升级package第二位版本号，如[2.x.0](https://www.yuque.com/gpgy5k/ucf/cm1rnu/2.x.0)； |
| `develop`  分支 | 1、分支代表开发主分支，其每次合并代表一次新增功能点。<br />2、不允许直接在develop上开发，新功能需要基于devleop分支单独开新分支推进 | daily 测试环境 | 可用于发布package第三位的测试版本，如2.0.x； |



<a name="i7Q4N"></a>
## 特别说明

- `tags` ：每次发版时，同时打一个 `tag` 。用于以后快速定位到对应的代码。
- `develop` 分支发布会比较频繁，【重要】只要有发布package的新版本相关代码，必须要先合并到develop分支，测完后再发，【不允许直接在自己的新分支上直接发布】。
<a name="0FeBb"></a>
## 
<a name="4No5Y"></a>
## 特性分支
<a name="8tWuy"></a>
#### feature/xxx 代表特性分支

  1. 用于开发新功能。
  1. 基于develop签出。
  1. 自测完毕后合并至develop。
  1. 每个新功能对应一个独立的feature/xxx分支。
  1. 合并后即删除。



<a name="WsIT5"></a>
## 修复分支
<a name="NGSMu"></a>
#### hotfix/xxx 代表紧急修复分支

  1. 用于修复线上版本的小bug。
  1. 基于master签出。
  1. 修复完毕后合并至master。
  1. 每个线上修复对应一个独立的 hotfix/xxx分支。
  1. 合并后即删除。

<a name="lPjSN"></a>
## 预发布分支
<a name="evsaz"></a>
####  release/xxx 代表版本分支（可以省略此步骤）

  1. 介于develop和master之间，用于分割待发布版本和正在开发的新功能。
  1. 基于develop签出，之后仅修复bug，不添加功能。
  1. 测试完成后，同时合并到 master 和develop，或合并到 master 之后，再将master合并至develop。一方面合并到master后发包，另一方面会将其上的修复同步回develop。
  1. 合并后即删除。


<a name="O0g51"></a>
## 参考

分支规则基于 git flow，规则参阅 [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/) 。

具体规则如下：

![](http://design.yonyoucloud.com/static/yuque/0/2019/png/447347/1567684748435-ced35407-17a3-4f1d-b1bd-eb5aa07fecd9.png#align=left&display=inline&height=1524&originHeight=1524&originWidth=1150&size=0&status=done&width=1150)