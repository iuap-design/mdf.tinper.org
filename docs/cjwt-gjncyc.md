# 构建内存溢出

<a name="a047b772"></a>
## 现象
项目开发中，当项目过大的时候，`node`内存溢出而停止`build`项目，即是项目构建过程中频繁报内存溢出：`FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - process out of memory`

<a name="4b86211f"></a>
## 解决
修改package.json

```bash
"build":"node --max_old_space_size=9000 ./node_modules/.bin/ucf-scripts build"
```

