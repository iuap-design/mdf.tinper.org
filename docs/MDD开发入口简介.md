<a name="2LbUz"></a>
## 1. UIMetaEngine

```
<br/> 详细介绍参照MDD SDK使用文档
 1. getMeta()

    - 功能说明：获取布局元数据，
    - 重要参数说明：
        - @NotNull ViewControlParams viewControlParams //布局元素可见性控制参数：只读，只写，读写
        - String bIncludeViewModel, String bIncludeView <br/>//用来判断生成布局数据所使用的Loader,分别对应ViewModelLoader和ViewLoader
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求

2. getTemplateList()
    - 功能说明：获取表单关联的模板列表
    - 重要参数说明：
        - String billno //表单Number
        - Integer mode //模版类型,0代表显示模版，1代表打印模版，2代表word模版
        - String terminalType //模板类型，目前主要用于指定触屏模板类型
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求
3. getCommands()
    - 功能说明：获取表单定义的指令
    - 重要参数说明：
        - String billno //表单Number
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求
4. getSimpleVM()
    - 功能说明：获取简单对象ViewModel，用于SQL类型参数等场景
    - 重要参数说明：
        - String billno //表单Number
        - E tplId //可以指定要获取的Template
        - Boolean isTplExport //是否用于模板导出
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求
5. getCommonFilters()
    - 功能说明：查询常用过滤条件(租户级)
    - 重要参数说明：
        - int solutionid //过滤条件所属的方案的ID
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求

6. getSolutionList()
    - 功能说明：通过FilterId获取过滤解决方案列表
    - 重要参数说明：
        - int filterId //方案所属的Filter
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求
7. getSolutionCommonList()
    - 功能说明：通过SolutionId获取通用过滤方案列表
    - 重要参数说明：
        - int solutionid //过滤条件所属的方案的ID
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求

8. getFilterBase()
    - 功能说明：获取过滤信息
    - 重要参数说明：
        - int filterId //方案所属的Filter
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求

9. delSolution()
    - 功能说明：删除查询方案
    - 重要参数说明：
        - int solutionid //过滤条件所属的方案的ID
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求

10. saveSolution()
    - 功能说明：保存修改的查询方案
    - 重要参数说明
        - Map<String,Object> solutions //solution对象构造的Mapper参数
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求
11. setDefaultFilter()
    - 功能说明：设置默认过滤方案
    - 重要参数说明
        - int solutionId //过滤方案ID
        - String domain //跨域查询元数据标识，不为null的时候根据domian发起Dubbo跨域查询请求
12. getRefMeta()
    - 功能说明：获取参照元数据
    - 重要参数说明：
        - BaseReqDto reqParam //通用的操作DTO对象
        - ViewControlParams viewControlParams //布局元素可见性控制参数：只读，只写，读写

13. getRefData()
    - 功能说明：获取参照业务数据
    - 重要参数说明：
        - BaseReqDto reqParam //通用的操作DTO对象
        - ViewControlParams viewControlParams //布局元素可见性控制参数：只读，只写，读写
14. getFiltersInfo()
    - 功能说明：获取过滤栏目信息
    - 重要参数说明：
        - int filterId //过滤栏目ID

15. exportExcel()
    - 功能说明：导出数据为Excel
    - 重要参数说明：
        - POIDto poiDto //数据导出操作DTO对象
16. exportTemplate()
    - 功能说明：导出当前业务数据所用模板，可以作为数据导入样例模板
    - 重要参数说明：
        - POIDto poiDto //数据导出操作DTO对象
17. importData()
    - 功能说明：通过模板导入业务数据，插入业务数据库
    - 重要参数说明：
        - MultipartFile file //数据载体文件(指定模板格式的Excel)
        - POIDto poiDto //数据导出操作DTO对象
```

<a name="7fe80b5a"></a>
### 2. RuleEngine

```
<br/> 详细介绍参照MDD SDK使用文档 
 1. execute()
    - 功能说明：规则引擎执行入口，主要包括规则列表解析，规则对象获取，规则列表执行
    - 重要参数说明：
        - RuleContext ruleContext //规则上下文，用来传递规则引擎执行过程中的必要参数<br/>
        /** 操作类型 枚举*/
        private OperationTypeEnum operateType;
        /** 字符串类型的action, 用于扩展operationType 实现OperationTypeEnum 不存在的规则action; getAction 优先取枚举类型的值，如果为空则取此字段值 */
        private String operationTypeEx;        
        /** 跨域domain 设置此值则为跨域查询，当前应用在UI元数据查询方法getMeta*/
        private String domain;
        /** 获取ruleList处理器接口的实现示例对象, 不传递默认使用DefaultRuleListHandler */
        private IRuleListHandler ruleListHandler;
        /** 规则链执行实例对象，不传使用DefaultExecRulesHandler */
        private IExecRulesHandler execRulesHandler;
        /** 规则list 排序比较器, 不传递默认使用DefaultRulesOrderCompartor */
        private IRulesOrderCompartor rulesOrderCompartor;
        /** 异步执行时候成功 */
        private boolean isMakeup = false;
        /** 租户ID */
        private T tenantId = (T) "0";
        /** 用户ID */
        private E userId;
        /** 用户名，主要用来插入创建人(修改人)信息 */
        private String userName;
        /** 规则等级：低->高： 拼接过滤条件形如 [ruleLv]_[action] ;例如 当前营销云版本应构造此参数为{"common","[subId]","[billnum]"} */
        private String[] ruleLvs;
        /** 规则关键字： 用于根据此关键字过滤规则列表; 过滤规则注册表key 字段 */
        private String ruleKey4Filter;        
        /** UI 元数据元素可见控制 过滤参数 */
        private ViewControlParams viewControlParams;
        /** UI 元数据基本信息 来源表bill_base & bill_entity */
        private UIMetaBaseInfo uiMetaBaseInfo;
        /** 自定义参数--map 方式 */
        private Map<String, Object> customMap;
        /** 自定义参数-- 泛型方式 */
        private T paramObj;
```