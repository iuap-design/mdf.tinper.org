# service 规范化

传统的开发是把所有的URL和接口服务写在一起，这样不便于维护归类，通过规范化Service定义来达到一个规范

一个常规的service服务类如下：

```javascript
/**
 * 服务请求类
 */
import request from "ucf-request";
//定义接口地址
const URL = {
    "GET_LIST":  `/order/list`
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.GET_LIST, {
        method: "get",
        params
    });
}
```

然后在model里面导入该类拿到调用的方法，大致如下：

```javascript
/**
 * 数据模型类
 */

import { actions } from "mirrorx";
import * as api from "./service";

export default {
    // 确定 Store 中的数据模型作用域
    name: "app",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        order: '',
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 按钮测试数据
         * @param {*} param
         * @param {*} getState
         */
        async loadData(params, getState) {
            let result = await api.getList(params);
            return result;
        }
    }
};

```

