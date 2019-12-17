| **现有分支** | **特性说明** | **tag 号** | **已合并到develop** | **融合计划** | **环境对应关系** | **风险** | **特性发布团队** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| master | ys最新稳定版本功能 | 固定版本，如：2.2.14 | - | <br /> | ys预发环境 |  | 大前端 |
| develop | 用于ys测试环境日常迭代 | snapshot | - | <br /> | ys daily环境 |  | MDF2.0核心团队 |
| feature/amc<br />feature/amc-test<br />feature/imp | ncc风格特性 | amc<br />imp | amc已经融合，imp未融合 | 1219 | 后续会合并成一个分支 | 需升级到react16，后续讨论 | 大前端 |
| feature/hpapaas | iuap5.0开发平台UI设计器，增加拖拽 | hpapass | 否 |  | <br /> | 1.字体图标问题<br />2.去除antd<br />3.提供上下文参数PREFIX<br />4.linetabs修改<br />5.大量容错处理undefined.forEach、null.forEach<br />6.baseui的antd多语言去掉<br />7.toolbar.tag和icon兼容<br />8.cube下的容错（跟拆分的cube合并）<br />9.流式布局12格<br />10.refEntity、cRefRetId、gridmodel<br />11表格设计态模拟数据和行工具栏按钮 | 大前端 |
| feature/mobile

feature/mobile-next | MDF2.0移动版特性，已合并到develop | <br /> | 是 | 1219 | 暂无，后续将保留该特性分支 |  | 大前端 |
| feature/baseui | baseui切换验证 | 暂无 | 是 | 目前已经合并到develop分支 |  | 1、已经合并到develop分支，根据开关动态选择是否切换。<br />2、需验证每个节点整体流程 | 大前端 |
| feature/lang

feature/locale | 多语 | snapshot-lang | 否 | 1219前 | <br /> | 1、翻译不全有时显示中文；<br />2、有时会阻塞交互，需验证到位<br />3、提供稳定版本，删除这两个临时版本 | <br /> |
| feature/wangxinr | 升级零售、电商通 |  | 否 | 1219 |  |  | 营销云团队 |
| feature/youyucai | 升级友云采 |  | 否 |  |  |  |  |