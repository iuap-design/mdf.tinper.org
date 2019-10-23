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