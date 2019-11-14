- bIsNull  是否可以为空
- bCheck 是否校验，bCheck为1是进行校验。当字段内容改变时，会触发common中的check方法，进行后端校验


默认整体输入完毕，点击保存时进行校验，如果想通过字段改变进行校验，需要捕捉字段改变事件 afterValueChange，在里面进行处理，可以根据正则自己判断，不可以可以使用cb.utils.alert弹出错误信息，或者使用cb.util.setCheckMsg将错误信息显示在输入框的下面。