[https://www.showdoc.cc/89974793848004?page_id=602167737086688](https://www.showdoc.cc/89974793848004?page_id=602167737086688)


<a name="LEOir"></a>
## [SimpleModel]()
<a name="BoIaX"></a>
### [方法]()
<a name="wx6WG"></a>
#### [getValue()]()
说明：获取绑定Model的组件Value值<br />入参：无<br />例：model.getValue()
<a name="OqXJM"></a>
#### [setValue(value,check)]()
说明：设置Value值<br />入参：value：为想要设置的值<br />check：boolean型  可选型参数 内部调用参数 可不传<br />              例：model.setValue(value)
<a name="TcDzF"></a>
#### [clear()]()
说明：清除当前数据<br />入参：无<br />例：model.clear()
<a name="JzmKl"></a>
### [事件]()
<a name="Pmsl1"></a>
#### [beforeValueChange]()
       说明： Value改变前事件<br />       例：
示例中data格式为{ value: value, oldValue: oldValue }<br />      viewmodel.get(propertyName).on(' beforeValueChange',
function (data) {<br />        return true;<br />      });<br />       返回true则继续进行value的改变，返回false则终止value的改变
<a name="S1ZpQ"></a>
#### afterValueChange
       说明： value改变后事件，允许对改变后的数据进行操作<br />       例：
示例中data格式为{ value: value, oldValue: oldValue }<br />      viewmodel.get(propertyName).on('afterValueChange',
function (data) {}); 
<a name="zZFj7"></a>
## [ListModel]()
<a name="r1b0d"></a>
### [方法]()
<a name="lMQc7"></a>
#### [clear()]()
说明：清除数据<br />例：model.clear()
<a name="K8bTe"></a>
#### [setDataSource(proxyConfig,
queryParams, callback)]()
说明：如果ListModel中dataSourceMode为local则proxyConfig参数传递为真实数据。<br />否则proxyConfig参数传递服务请求地址，queryParams传递请求参数，callback传递回调函数。<br />例：<br />dataSourceMode为local<br />model. setDataSource(listData)<br />dataSourceMode不为local<br />model. setDataSource(‘bill/list.do’,{‘id’:1},function(result){})
<a name="OHSyB"></a>
#### [select(selectedKeys)]()
说明：选中方法<br />入参：selectedKeys传递要选中的key值 [‘key1’,’key2’]<br />例：model.selete(selectedKeys);
<a name="82mG9"></a>
#### [getSelectedNodes()]()
说明：获取已选中的数据<br />例：var arrSelectList = model. getSelectedNodes()
<a name="reXoK"></a>
#### [getSelectedKeys()]()
说明：获取已选中的数据的key值<br />例：var arrSelectKeys = model. getSelectedKeys ()
<a name="5kbvD"></a>
#### [setValue(value,check)]()
说明：设置Value值<br />入参：<br />value：为想要设置的值<br />check：boolean型  可选型参数 内部调用参数 可不传<br />例：model.setValue(value)     
<a name="rvsZq"></a>
#### [getValue()]()
说明：获取绑定Model组件的Value值<br />例：model.getValue()
<a name="BgdiQ"></a>
### [事件]()
<a name="uSLmf"></a>
#### beforeSetDataSource
           说明：DataSource改变前事件<br />       例：
<br />      viewmodel.get(propertyName).on(' beforeSetDataSource,
function (data) {<br />        return true;<br />      });<br />       返回true则继续进行DataSource的改变，返回false则终止DataSource的改变
<a name="3WYN6"></a>
#### afterSetDataSource
           说明：DataSource改变后事件<br />       例：viewmodel.get(propertyName).on(' afterSetDataSource,
function (data) {}); 
<a name="y3291"></a>
#### beforeSelect
       说明：select选择前事件<br />       例：示例中的data为select选中数据<br />              viewmodel.get(propertyName).on(' beforeSelect,
function (data) {<br />        return true;<br />      });<br />       返回true则继续进行select的改变，返回false则终止select的改变
<a name="SFYOT"></a>
#### afterSelect
       说明：select选择后事件<br />       例：示例中的data为select选中数据<br />              viewmodel.get(propertyName).on(' afterSelect,
function (data) {}); 
<a name="GXao4"></a>
#### beforeValueChange
       说明： Value改变前事件<br />       例：
示例中data格式为{ value: value, oldValue: oldValue }<br />      viewmodel.get(propertyName).on(' beforeValueChange',
function (data) {<br />        return true;<br />      });<br />       返回true则继续进行value的改变，返回false则终止value的改变
<a name="3ngCc"></a>
#### afterValueChange
       说明： value改变后事件，允许对改变后的数据进行操作<br />       例：
示例中data格式为{ value: value, oldValue: oldValue }<br />      viewmodel.get(propertyName).on('afterValueChange',
function (data) {});
<a name="BfhRD"></a>
## [ReferModel]()
说明：参照与tag绑定Model类型
<a name="YMtAa"></a>
### [方法]()
<a name="aa9Uf"></a>
#### [clear()]()
说明：清除数据<br />例：model.clear()
<a name="s61zm"></a>
#### [setFilter(filter)]()
说明：设置filter<br />例：model.setFilter(filter)
<a name="NOuhj"></a>
#### [getFilter()]()
说明：获取filter<br />例：model.getFilter()
<a name="zxI7r"></a>
#### [setCondition(condition)]()
说明：设置Condition<br />例：model.setCondition(condition)
<a name="6Yv0X"></a>
#### [getCondition()]()
说明：获取Condition<br />例：model.getCondition()
<a name="u2eNH"></a>
#### [setReturnFields(fields)]()
 
<a name="CLYmR"></a>
#### [setValue(value,check)]()
说明：设置Value值<br />入参：       value：为想要设置的值<br />check：boolean型
内部调用参数 可不传<br />例：model.setValue(value)
<a name="jU7l1"></a>
#### [getValue()]()
说明：获取Value值<br />例：model.setValue
<a name="KGxkc"></a>
#### [getSelectedNodes()]()
说明：绑定组件为tag时，调用该方法获取参照选中返回数据<br />例：model. getSelectedNodes()
<a name="uGbg6"></a>
### [事件]()
<a name="ebIxe"></a>
#### beforeBrowse
           说明：点击按钮弹出参照前事件 <br />       例： <br />      viewmodel.get(propertyName).on(' beforeBrowse, function () {<br />        return
true;<br />      });<br />       返回true则继续进行弹出参照操作，返回false则终止弹出
<a name="MOcEA"></a>
#### afterBrowse
           说明：点击按钮弹出参照后事件 <br />       例： viewmodel.get(propertyName).on(' afterBrowse, function () {}); 
<a name="DkAuv"></a>
#### beforeValueChange
       说明： 参照确定返回数据改变前事件<br />       例： 示例中data格式为{ value: value,
oldValue: oldValue }<br />      viewmodel.get(propertyName).on(' beforeValueChange', function (data) {<br />        return
true;<br />      });<br />       返回true则继续进行value的改变，返回false则终止value的改变
<a name="SrwKJ"></a>
#### afterValueChange
       说明：参照确定返回数据改变后事件，允许对改变后的数据进行操作<br />       例： 示例中data格式为{ value: value,
oldValue: oldValue }<br />     
viewmodel.get(propertyName).on('afterValueChange', function (data) {});<br /> 
<a name="5vZ2L"></a>
## TreeModel
<a name="mvcBo"></a>
### [方法]()
<a name="FTCvG"></a>
#### [setDataSource(proxyConfig, queryParams, callback)]()
说明：如果TreeModel中dataSourceMode为local则proxyConfig参数传递为真实数据。<br />否则proxyConfig参数传递服务请求地址，queryParams传递请求参数，callback传递回调函数。<br />例：<br />dataSourceMode为local    model. setDataSource(TreeData)<br />dataSourceMode不为local<br />model. setDataSource(‘bill/list.do’,{‘id’:1},function(result){})
<a name="d0ViC"></a>
#### [addNode(node, parentKey)]()
说明：添加树节点方法<br />入参：       node为要添加的节点<br />parentKey为要添加的节点的父节点<br />注意事项：parentKey为可选参数，表示要添加的节点是根节点还是存在父节点
<a name="OFi5U"></a>
#### [deleteNode(key)]()
说明：删除节点<br />入参：key为要删除的节点的key值
<a name="ZB33e"></a>
#### [updateNode(node)]()
说明：更新节点<br />入参：node为要更新的节点
<a name="LJP2i"></a>
#### [select(selectedKeys)]()
说明：设置选中的树节点<br />入参：selectedKeys树节点的key值 可为数组
<a name="l0ld8"></a>
#### [getSelectedNodes()]()
说明：获取已选中的树节点
<a name="byaQc"></a>
#### [getSelectedKeys()]()
说明：获取已选中树节点的key值
<a name="JJHWd"></a>
#### [check(checkedKeys)]()
说明：当树组件的checkable属性为true时，才会在树组件中显示选中框。该方法为设置勾选树节点<br />入参：checkedKeys需要勾选的树节点key值
<a name="xJUXM"></a>
#### [getCheckedNodes()]()
说明：获取已勾选的树节点
<a name="zIfc4"></a>
#### [getCheckedKeys()]()
说明：获取已勾选的树节点的key值
<a name="wmiQY"></a>
### [事件]()
<a name="PpaO5"></a>
#### beforeSetDataSource
           说明：DataSource改变前事件<br />       例： <br />      viewmodel.get(propertyName).on(' beforeSetDataSource, function (data) {<br />        return
true;<br />      });<br />       返回true则继续进行DataSource的改变，返回false则终止DataSource的改变
<a name="6NykQ"></a>
#### afterSetDataSource
           说明：DataSource改变后事件<br />       例：viewmodel.get(propertyName).on(' afterSetDataSource, function (data) {}); 
<a name="mA9vN"></a>
#### beforeSelect
       说明：select选择前事件<br />       例：示例中的data为select选中数据<br />              viewmodel.get(propertyName).on(' beforeSelect, function (data) {<br />        return
true;<br />      });<br />       返回true则继续进行select的改变，返回false则终止select的改变
<a name="Ks3p8"></a>
#### afterSelect
       说明：select选择后事件<br />       例：示例中的data为select选中数据<br />              viewmodel.get(propertyName).on(' afterSelect, function (data) {});
<a name="9Z5io"></a>
#### beforeCheck
       说明：点击选择框check选中前事件<br />       例：示例中的data为check选中数据<br />              viewmodel.get(propertyName).on(' beforeCheck, function (data) {<br />        return
true;<br />      });<br />       返回true则继续进行check的改变，返回false则终止check的改变<br /> 
<a name="AtIBy"></a>
#### afterCheck
       说明：点击选择框check选中后事件<br />       例：示例中的data为check选中数据<br />              viewmodel.get(propertyName).on(' afterCheck, function (data) {});<br /> 
<a name="KpSNr"></a>
## GridModel
<a name="xNmlf"></a>
### [方法]()
<a name="bqgG9"></a>
#### [validate()]()
<a name="MHoJV"></a>
#### [getDirtyData()]()
说明：获取脏数据
<a name="osGCK"></a>
#### [getDirtyRowIndexes()]()
说明：获取脏数据的行号集合
<a name="UDqUU"></a>
#### [getData()]()
说明：获取所有数据
<a name="l09RD"></a>
#### [getColumns(fields)]()
说明：批量获取栏目信息<br />入参：       fields为所需获取栏目的fieldname集合<br />可选参数，如不传，则获取所有栏目的信息
<a name="K2fXU"></a>
#### [getColumns(field)]()
说明：获取单列栏目的信息<br />入参：       field为所需获取栏目的fieldname
<a name="CY3zF"></a>
#### [hasColumn(field)]()
说明：判断函数，判断是否包含该栏目<br />入参：       field为所要判断栏目的fieldname<br />返回值：true or false
<a name="bNs66"></a>
#### [setDirty(dirty)]()
说明：设置脏数据取值范围 默认为false为收集数据时只收集脏数据。<br />入参：dirty  类型Boolean   
<br />传入true则收集数据时不区别脏数据，为完整数据。    
<a name="SUZ3U"></a>
#### [setReadOnly(value)]()
说明：设置grid属性为是否可编辑状态<br />入参：value    true or
false
<a name="utK9z"></a>
#### [setFocusedRowIndex(index)]()
说明：设置焦点行<br />入参：index 需要设置的焦点行行号
<a name="mYgz9"></a>
#### [getCellValue(rowIndex,cellName)]()
说明：获取单元格value值<br />入参：rowIndex  行号<br />              cellName  列名（fieldname）
<a name="VjEKL"></a>
#### [setCellValue(rowIndex, cellName, value, check, blur)]()
说明：设置单元格value值<br />入参：rowIndex 行号<br />          cellName 
列名（fieldname）<br />              value   值<br />              check   boolean型  内部调用参数 可不传<br />      blur  为true时，单元格数据改变后变为不可编辑状态
<a name="BA22a"></a>
#### [getRowState(rowIndex,name)]()
说明：获取行状态<br />入参： rowIndex  行号<br />               name 状态名<br />              例：model. getRowState(1,’disabled’) <br />             获取行1的disabled状态
<a name="ZCKfK"></a>
#### [setRowState(rowIndex, name, value)]()
说明：设置行状态<br />入参： rowIndex  行号
               name 状态名<br />          Value 状态值<br />例： model.setRowState(1,’disabled’,true)<br />          设置行1的状态disabled为true
<a name="kNmbS"></a>
#### [getColumnState(cellName, name)]()
说明：获取列状态<br />入参： cellName  列名(fieldname)<br />               Name  状态名   <br />例： model. getColumnState(2,’readOnly’)
<a name="uyEyd"></a>
#### [setColumnState(cellName, name, value)]()
说明：设置列状态<br />入参： cellName 列名(fieldname)<br />               name 状态名<br />               value 状态值<br />例： model. setColumnState(‘inventory’,’readOnly’,true)<br />               设置inventory列的readOnly状态为true
<a name="IkIjy"></a>
#### [setColumnValue(cellName, value, check)]()
说明：设置整列数据的值<br />入参： cellName 列名(fieldname)<br />               Value  列值<br />               Check  boolean型  内部调用参数 可不传
<a name="EP9xE"></a>
#### [getCellState(rowIndex, cellName, name)]()
说明：获取单元格状态<br />入参： rowIndex  行号
               cellName 
列名<br />               Name   状态名<br />例： model. getCellState (1,’ inventory’,’readOnly’)<br />               获取第一行inventory列的readOnly状态的值
<a name="F5vPc"></a>
#### [setCellState(rowIndex, cellName, name, value)]()
说明：设置单元格状态<br />入参：       rowIndex  行号<br />                     cellName  列名(fieldname)<br />                     name     状态名<br />                     value     状态值<br />例：model. setCellState(1,’ inventory’,’readOnly’,true)<br />              设置第1行inventory列的readOnly状态为true
<a name="xwjdn"></a>
#### [setColumns(columns, fieldNames)]()
说明：设置grid栏目<br />入参：       columns  栏目集合<br />                     fieldNames  fieldname集合(可不传)
<a name="SDsGa"></a>
#### [showRows(selected)]()
 
<a name="sNgBV"></a>
#### [clear()]()
说明：清除全部数据
<a name="KzF8B"></a>
#### [setDataSource(proxyConfig, queryParams, callback)]()
说明：如果GridModel中dataSourceMode为local则proxyConfig参数传递为真实数据。<br />否则proxyConfig参数传递服务请求地址，queryParams传递请求参数，callback传递回调函数。<br />例：<br />dataSourceMode为local  model. setDataSource(GridData)<br />dataSourceMode不为local<br />model.
setDataSource(‘bill/list.do’,{‘id’:1},function(result){})
<a name="c7QXZ"></a>
#### [load (proxyConfig, params, callback)]()
说明：调用方法同setDataSource方法中dataSourceMode不为local的情况
<a name="8q25I"></a>
#### [setPageSize(pageSize)]()
说明：设置grid分页的页大小<br />入参： pageSize  页大小
<a name="3gcWq"></a>
#### [setPageIndex(pageIndex)]()
说明：设置grid分页中的页码<br />入参：pageIndex  页码
<a name="nHZds"></a>
#### [getPageSize()]()
说明：获取当前grid分页的页大小
<a name="m2VdE"></a>
#### [select(rowIndexes)]()
说明：设置grid选中行<br />入参： rowIndexes  行号集合<br />例： model.select([1,2,3])<br />              设置grid选中行号为1,2,3行
<a name="NSTcJ"></a>
#### [getPageIndex()]()
说明：获取grid分页中的当前页码
<a name="bk54r"></a>
#### [unselect(rowIndexes)]()
说明：设置grid取消选中的行<br />入参： rowIndexes  行号集合
<a name="4goBs"></a>
#### [selectAll()]()
说明：选中所有行
<a name="YbzI8"></a>
#### [unselectAll()]()
说明：取消选中所有行
<a name="gAGrC"></a>
#### [getSelectedRows()]()
说明：获取grid中已选中行的数据
<a name="1KO25"></a>
#### [getSelectedRowIndexes()]()
说明：获取grid中已选中行的行号
<a name="ZXITl"></a>
#### [getRows()]()
说明：获取grid中的所有行数据
<a name="8JgCM"></a>
#### [updateRow(rowIndex, rowData)]()
说明：更新行数据<br />入参：       rowIndex  行号<br />                rowData   行数据
<a name="r8Beb"></a>
#### [insertRow(rowIndex, rowData)]()
说明：grid插行功能<br />入参：       rowIndex  行号<br />                rowData   行数据<br />例：model.insertRow(3,rowData)  <br />在第三行下插入行，行数据为rowData
<a name="fDW2l"></a>
#### [insertRows(rowIndex, rowDatas)]()
说明：grid批量插行功能 <br />入参： rowIndex 行号<br />          rowDatas 行数据<br />例：model.insertRow(3,rowDatas)<br />在第三行下插入rowDatas.length行，数据为rowDatas
<a name="TFqKj"></a>
#### [appendRow(rowData)]()
说明：grid增行功能<br />入参：       rowData  行数据
<a name="K6wmm"></a>
#### [deleteRows(rowIndexes)]()
说明：grid 删行功能<br />入参：rowIndexes  行号集合<br />例：     model.deleteRows([1,2])<br />       删除grid中第行号为1,2的行
<a name="NPqcz"></a>
#### [getRowsByIndexes(rowIndexes)]()
说明：根据行号获取grid中数据<br />入参：rowIndexes  行号集合
<a name="cMblj"></a>
#### [getRow(rowIndex)]()
说明：根据行号获取行数据<br />入参：rowIndex  单个行号
<a name="x9T2p"></a>
### [事件]()
<a name="klukY"></a>
#### beforeCellValueChange
说明：grid单元格数据改变前事件<br />例：示例中data格式为{ rowIndex:‘行号’, cellName: ‘列名’, value: ‘新值’, oldValue: ‘旧值’}<br />      viewmodel.get(propertyName).on(' beforeCellValueChange, function (data) {<br />        return
true;<br />      });<br />              返回true继续单元格数据改变，返回false终止单元格数据改变。
<a name="5fTuj"></a>
#### afterCellValueChange
       说明：grid单元格数据改变后事件<br />       例：示例中data格式为{ rowIndex:‘行号’, cellName: ‘列名’, value: ‘新值’, oldValue: ‘旧值’}<br />              viewmodel.get(propertyName).on(' afterCellValueChange, function (data) {});
<a name="4Sifq"></a>
#### beforeRowStateChange
       说明：行状态改变前事件<br />       例：示例中data格式为{ rowIndex: ‘行号’, propertyName: ‘状态名’, value: ‘状态新值’, oldValue: ‘旧值’}<br />              viewmodel.get(propertyName).on(' beforeRowStateChange', function (data) {<br />       return true;<br />});<br />       返回true继续行状态改变，返回false终止改变
<a name="fl0D8"></a>
#### afterRowStateChange
       说明：行状态改变后事件<br />       例：示例中data格式为{ rowIndex: ‘行号’, propertyName: ‘状态名’, value: ‘状态新值’, oldValue: ‘旧值’}<br />              viewmodel.get(propertyName).on(' afterRowStateChange', function (data) {});
<a name="dPttW"></a>
#### beforeColumnStateChange
       说明：列状态改变前事件<br />       例：示例中data格式为{ cellName: ‘列名’, propertyName: ‘状态名’, value: ‘状态名’, oldValue: ‘旧值’}<br />       viewmodel.get(propertyName).on(' beforeColumnStateChange', function (data) {<br />              return
true;<br />});<br />       返回true继续列状态改变，返回false终止状态改变
<a name="UMHro"></a>
#### afterColumnStateChange
       说明：列状态改变后事件<br />       例：示例中data格式为{ cellName: ‘列名’, propertyName: ‘状态名’, value: ‘状态名’, oldValue: ‘旧值’}<br />       viewmodel.get(propertyName).on(' afterColumnStateChange', function (data)
{});
<a name="7cFON"></a>
#### beforeColumnValueChange
           说明：列值改变前事件<br />       例：示例中data格式为{ cellName: ‘列名’, value: ‘列值’}<br />       viewmodel.get(propertyName).on(' beforeColumnValueChange', function (data) {<br />       return
true;<br />});<br />返回true允许列值改变，返回false终止列值改变
<a name="0xZmI"></a>
#### afterColumnValueChange
           说明：列值改变后事件<br />       例：示例中data格式为{ cellName: ‘列名’, value: ‘列值’}<br />       viewmodel.get(propertyName).on(' afterColumnValueChange', function (data)
{});
<a name="jffPS"></a>
#### beforeCellStateChange
       说明：单元格状态改变前事件<br />       例：示例中data格式为{ rowIndex: ‘行号’, cellName: ‘列名’, propertyName: ‘状态名’, value: ‘新值’, oldValue: ‘旧值’ }<br />       viewmodel.get(propertyName).on(' beforeCellStateChange', function (data) {<br />              return
true;<br />});<br />返回true则允许状态改变，返回false终止改变
<a name="bYYfT"></a>
#### afterCellStateChange
       说明：单元格状态改变后事件<br />       例：示例中data格式为{ rowIndex: ‘行号’, cellName: ‘列名’, propertyName: ‘状态名’, value: ‘新值’, oldValue: ‘旧值’ }<br />       viewmodel.get(propertyName).on(' afterCellStateChange', function (data) {});
<a name="K7vzJ"></a>
#### beforeSetColumns
       说明：设置grid栏目前事件<br />       例：示例中columns格式为栏目数据格式<br />       viewmodel.get(propertyName).on(' beforeSetColumns', function (columns) {<br />       return
true;<br />});<br />       返回true为允许设置栏目，返回false终止设置
<a name="GjrC4"></a>
#### afterSetColumns
       说明：设置grid栏目后事件<br />       例：示例中columns格式为栏目数据格式<br />       viewmodel.get(propertyName).on(' afterSetColumns', function (columns) {});
<a name="1yhgF"></a>
#### beforeSetDataSource
       说明：设置grid数据前事件<br />       例：示例中data为grid数据格式<br />       viewmodel.get(propertyName).on(' beforeSetDataSource', function (data) {<br />              return
true;<br />});<br />       返回true为允许设置grid数据，返回false为终止设置数据
<a name="iCMdr"></a>
#### afterSetDataSource
       说明：设置grid数据后事件<br />       例：示例中data为grid数据格式<br />       viewmodel.get(propertyName).on(' afterSetDataSource', function (data) {});
<a name="dpcvC"></a>
#### beforeSelect
       说明：选中select前事件<br />       例：示例中rowIndexes为行号，单行(整形)or多行(数组)<br />       viewmodel.get(propertyName).on(' beforeSelect', function (rowIndexes) {<br />       return
false;<br />});<br />返回true为允许选中，返回false为终止选中
<a name="lHF5u"></a>
#### afterSelect
       说明：选中select后事件<br />       例：示例中rowIndexes为行号，单行(整形)or多行(数组)<br />viewmodel.get(propertyName).on(' afterSelect', function (rowIndexes) {});
<a name="lIHNb"></a>
#### beforeUnSelect
       说明：取消选中select前事件<br />       例：示例中rowIndexes为行号，单行(整形)or多行(数组)<br />       viewmodel.get(propertyName).on(' beforeUnSelect', function (rowIndexes) {<br />       return
false;<br />});<br />返回true为允许取消选中，返回false为终止取消选中
<a name="KVElB"></a>
#### afterUnSelect
       说明：选中select后事件<br />       例：示例中rowIndexes为行号，单行(整形)or多行(数组)<br />viewmodel.get(propertyName).on(' afterUnSelect', function (rowIndexes) {});
<a name="nwyIR"></a>
#### beforeSelectAll
       说明：全选前事件<br />       例：<br />       viewmodel.get(propertyName).on(' beforeSelectAll', function () {<br />       return
false;<br />});<br />返回true为允许全选，返回false为终止全选
<a name="aiJdm"></a>
#### afterSelectAll
       说明：全选后事件<br />       例：示例中rows为选中行数据<br />viewmodel.get(propertyName).on(' afterSelectAll', function (rows) {});
<a name="q2zqy"></a>
#### beforeUnSelectAll
       说明：全消前事件<br />       例：<br />       viewmodel.get(propertyName).on(' beforeUnSelectAll', function () {<br />       return
false;<br />});<br />返回true为允许全消，返回false为终止全消
<a name="qPShG"></a>
#### afterUnSelectAll
       说明：全消后事件<br />       例：viewmodel.get(propertyName).on(' afterUnSelectAll', function () {});
<a name="8jUVh"></a>
#### beforeInsertRow
       说明：增行/插行前事件<br />       例：示例中data格式为{ index: ‘增/插行行号’, row: ‘行数据’}<br />       viewmodel.get(propertyName).on('beforeInsertRow',
function (data) {<br />       return
false;<br />});<br />返回true为允许增/插行，返回false为终止操作
<a name="DJRSh"></a>
#### afterInsertRow
       说明：增行/插行后事件<br />       例：示例中data格式为{ index: ‘增/插行行号’, row: ‘行数据’}<br />       viewmodel.get(propertyName).on('afterInsertRow',
function (data) {});
<a name="nRkuE"></a>
#### beforeDeleteRows
       说明：删行前事件<br />       例：示例中rows为要删除的行数据<br />       viewmodel.get(propertyName).on('beforeDeleteRow',
function (rows) {<br />       return
false;<br />});<br />返回true为允许删行，返回false为终止操作
<a name="YWhLi"></a>
#### afterDeleteRows
       说明：删行后事件<br />       例：示例中rows为已删除的行数据<br />       viewmodel.get(propertyName).on('afterDeleteRow',
function (rows) {});
<a name="aR6i9"></a>
## ContainerModel
           说明：所有model的基类
<a name="9YCq3"></a>
### [方法]()
<a name="612Fd"></a>
#### [get(propertyName)]()
           说明：根据子model属性名获取子model<br />       入参：propertyName：子model属性名<br />       例：viewmodel.get(propertyName)
<a name="O9h4W"></a>
#### [addProperty(propertyName, value)]()
           说明：新增子model<br />       入参：propertyName：子model属性名；value：子model值<br />       例：viewmodel.addProperty(propertyName,value)
<a name="UGgp6"></a>
#### [removeProperty(propertyName)]()
           说明：根据属性名移除子model<br />       入参：propertyName：子model属性名<br />       例：viewmodel.removeProperty(propertyName)
<a name="zThEX"></a>
#### [getData()]()
           说明：获取基类数据<br />       入参：无<br />       例：viewmodel.getData()
<a name="OK8tf"></a>
#### [getOriginalData()]()
           说明：获取基类model中初始数据<br />       入参：无<br />       例：viewmodel.getOriginalData()
<a name="c1DIs"></a>
#### [getNecessaryData()]()
           说明：获取基类model中bMustSelect为true的数据<br />       入参：无<br />       例：viewmodel.getNecessaryData()
<a name="XNL5V"></a>
#### [setDirty(dirty)]()
           说明：设置是否收集数据时只收集脏数据(true为收集所有数据，false为只收集脏数据)<br />       入参：dirty：true or false<br />       例：viewmodel.setDirty()
<a name="dbwbl"></a>
#### [validate()]()
           说明：设置是否收集数据时只收集脏数据(true为收集所有数据，false为只收集脏数据)<br />       入参：dirty：true or false<br />       例：viewmodel.setDirty()<br /> 
<a name="epyU2"></a>
#### [getDirtyData()]()
           说明：获取脏数据(差异化数据)方法<br />       入参：无<br />       例：viewmodel.getDirtyData()
<a name="YJEj0"></a>
#### [loadData(data)]()
           说明：加载数据方法<br />       入参：data：需加载的数据<br />       例：viewmodel.loadData()
<a name="xQJyo"></a>
#### [loadDirtyData(data)]()
           说明：加载脏数据方法<br />       入参：data：需加载的数据<br />       例：viewmodel.loadDirtyData()
<a name="JjT2x"></a>
#### [clear()]()
           说明：清除数据方法<br />       入参：无 <br />       例：viewmodel.clear()
<a name="W33Mc"></a>
#### [collectData(all)]()
           说明：收集数据方法(all为true收集所有数据，false为只收集脏数据)<br />       入参：all：true or false<br />       例：viewmodel.collectData(all)
<a name="ol8gn"></a>
#### [setReadOnly(value)]()
           说明：设置只读属性readOnly方法<br />       入参：value：true or false<br />       例：viewmodel.setReadOnly(value)
<a name="s9soM"></a>
#### [getGridModel(propertyName)]()
           说明：根据属性名获取GridModel<br />       入参：propertyName：子model属性名  <br />                     如propertyName不传则默认取基类model中第一个GridModel<br />       例：viewmodel.getGridModel(propertyName)
<a name="KRJHb"></a>
#### [getTreeModel(propertyName)]()
           说明：根据属性名获取TreeModel<br />       入参：propertyName：子model属性名  <br />                     如propertyName不传则默认取基类model中第一个TreeModel<br />       例：viewmodel.getTreeModel(propertyName)<br /> 
<a name="OvL1M"></a>
### 事件

