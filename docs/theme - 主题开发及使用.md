**一、如何在组件中使用主题的可配属性**

1. package.json 文件中，增加配置。

```javascript
  "themeType":"ncc",
```

2. webpack.dev.config

```javascript
    new webpack.DefinePlugin({
		...
        'process.env.__THEMETYPE__': '"ncc"',
    }),

```


3. yxyweb/common/helpers
```javascript
import {getTheme} from "./themeUiConfig

const env = {  
	...
  //加载主题文件
  THEMES_CONFIG:getTheme(process.env.__THEMETYPE__)
}
```


3. yxyweb/common/helpers/themeUiConfig.jsx

```javascript
export function getTheme(type){
  let theme = {}
  switch (type) {
    case "ncc":
        theme = getNccTheme();
      break;
    default:
      break;
  }
  return theme;
}


function getNccTheme(type){
  return {
      table:{
        rowheight:30,
        headerHeight:35
      }
  }
}
```

4. table.jsx

```javascript
...
import env from '../../helpers/env'

...
 const {rowheight,headerHeight} =  env.THEMES_CONFIG.table;

...
this.headerHeight = headerHeight?headerHeight:35;
this.rowheight = rowheight?rowheight:30;

```

**二、如何在业务项目中使用**

例如资产云

1. ucf-amc-front/src/client/index.jsx

```javascript
...
import 'yxyweb/client/styles/ncc-theme'

```

2. 在ucf-amc-front/src/client/styles/default/upc-common.less  中编写项目个性化的覆盖样式。
```css
#container{
  background:url('../default/images/globalBackground.jpg') no-repeat;
  background-size: 100%;
  padding: 10px 20px 5px 20px;
  box-sizing: border-box;
}
```

