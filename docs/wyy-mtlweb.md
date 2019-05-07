# mtl-web模型驱动开发框架


<a name="481feccf"></a>
## 如何使用

```javascript
import { MTLComponent } from 'mtl-core';

const LogicComponent = () => (
    <div className="home-wrap">
        <MTLComponent url='url' />
    </div>
);

// 大组件：UI模板
ReactDOM.render(<LogicComponent />, root)

// 小组件：纯组件，被引用
<Form>
    <Input />
    <LogicComponent />
    <Button>提交</Button>
</Form>
```


<a name="d17a0f0b"></a>
## 参考

- [https://github.com/iuap-design/mtl-web](https://github.com/iuap-design/mtl-web)
