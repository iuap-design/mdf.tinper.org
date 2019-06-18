# 设计器-控件新增

<a name="b893b7b4"></a>
### 1.在工具栏添加控件
- 在src/index.html中的工具栏添加新的控件DOM,如：新增一个多语控件

```html
<div class="widget-item general_js text-type" title="拖拽至页面中间区域" componentKey="MultiLanguage">
    <span class="widgetMark">
    		<i class="UIT-iconfont UIT-input"></i>
    </span>
    <span class="title">多语文本</span>
 </div>
```
> 注：componentKey是组件类型的唯一参数，i代表该组件类型的图标

<a name="1d42ceff"></a>
### 2.在模板中添加新控件模板

- 在static/design/tmpl/templates.html中添加新组件的模板DOM

```html
<script id="templateMultiLanguage" type="text/html">
		<!--中间设计态dom结构-->
    <div id="form-multilanguage" class="field field_js">
        <span class=" widgetDele-btn">
            <i class="UIT-iconfont UIT-cancel02 j_widgetDele"></i>
        </span>
        <label class="widget-title">
            <span class="widget-title_js">多语文本输入框</span>
            <span class="c-danger widget-required_js"></span>
        </label>
        <div class="widget-content">
            <div class="field-description hide">描述</div>
            <input type="text" class="form-control medium" />
        </div>
    </div>
    <!--点击当前控件，右侧编辑态显示dom结构-->
    <div id="editor-multilanguage" class="field field_js">
        <div class="form-group">
            <label>标题</label>
            <input id="component-title" type="text" class="form-control ds-b w-full" maxlength="100" />
            <div id="addMultiLangWrapper" class="addMultiLangWrapper">
                <button id="addMultiLang" class="btn addMultiLang">添加多语</button>
            </div>
        </div>
        <div class="form-group formeditcontent-titlelayout">
            <label>标题布局</label>
            <div class="controls editor-component-itemstyle">
                <label class="radio-inline">
                    <input name="title-layout" type="radio" value="field-hoz">
                    <span>横</span>
                </label>
                <label class="radio-inline">
                    <input name="title-layout" type="radio" value="">
                    <span>列</span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>控件监听器</label>
            <input id="component-listener" type="text" class="form-control ds-b w-full" />
        </div>
        <div class="form-group">
            <label>使用公式</label>
            <input id="component-formula" name="component-formula" type="text" class="form-control ds-b w-full" />
        </div>
        <div class="form-group length-class">
            <label>输入长度</label>
            <input type="text" class="form-control ds-b w-full component-length" maxlength="100" />
        </div>
        <div class="form-group required-class">
            <div class="controls">
                <div class="checkbox">
                    <label>
                        <input id="required" type="checkbox">
                        <span>必填</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group readOnly-class">
            <div class="controls">
                <div class="checkbox">
                    <label>
                        <input id="readOnly" type="checkbox">
                        <span>只读</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group multiLang-class">
            <div class="controls">
                <div class="checkbox">
                    <label>
                        <input id="multiLang" type="checkbox" disabled="disabled">
                        <span>多语</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="controls">
                <div class="checkbox">
                    <label>
                        <input id="isidentity" type="checkbox">
                        <span>身份证格式验证</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="controls">
                <div class="checkbox">
                    <label>
                        <input id="isList" type="checkbox">
                        <span>在列表中显示</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group isMainList">
            <div class="controls">
                <div class="checkbox">
                    <label>
                        <input id="isMainList" type="checkbox">
                        <span>列表字段</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group componentType">
            <label>类型</label>
            <div class="controls editor-component-itemstyle">
                <label class="radio-inline">
                    <input type="radio" name="componentType" value="Text" />
                    <span>单行</span>
                </label>
                <label class="radio-inline">
                    <input type="radio" name="componentType" value="TextArea" />
                    <span>多行</span>
                </label>
            </div>
        </div>
        <div class="form-group formeditcontent-widgetsize">
            <label>尺寸</label>
            <div class="controls editor-component-itemstyle">
                <label class="radio-inline">
                    <input type="radio" value="small" name="tSize" />
                    <span>小尺寸</span>
                </label>
                <label class="radio-inline">
                    <input type="radio" value="medium" name="tSize" />
                    <span>标准尺寸</span>
                </label>
                <label class="radio-inline">
                    <input type="radio" value="large" name="tSize" />
                    <span>大尺寸</span>
                </label>
                <div name="user-defined-div" class="user-defined-div hide">
                    <div class="comp-width fl">
                        <span class="fl">宽度</span>
                        <div class="form-error fl"></div>
                        <div id="user-defined-width" contenteditable="true" class="user-defined-width fl"></div>
                    </div>
                    <div class="comp-height fl">
                        <span class="fl">高度</span>
                        <div class="form-error fl"></div>
                        <div id="user-defined-height" contenteditable="true" class="user-defined-height fl"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group bdColor">
            <label>边框颜色</label>
            <div class="in-color"></div>
        </div>
    </div>
    <!--预览时，显示的dom结构-->
    <div id="preview-multilanguage" componentKey="Text" class="field field_js">
        <label class="widget-title">
            <span class="widget-title_js">文本输入框</span>
            <span class="c-danger widget-required_js"></span>
        </label>
        <div class="form-error"></div>
        <div class="widget-content">
            <div class="field-description hide">描述</div>
            <input type="text" componentKey="Text" class="form-control check_js">
            <div class="input-instead j_readOnly hide"></div>
        </div>
    </div>
    <!--搜索该控件，显示的dom结构（暂时无用）-->
    <div id="statsearch-multilanguage" class="inner-el">
        <select class="form-control sch-item j_condition">
            <option value="like">包含</option>
            <option value="eq">等于</option>
            <option value="neq">不等于</option>
        </select>
        <input class="form-control sch-item" type="text" value="">
        <a class="j_deletesearch dele" title="删除此搜索项">
            <i class="icon-remove"></i>
        </a>
    </div>
</script>

```

- 在static/design/js/form/tplutil.js中添加模板的引入

```javascript
 multilanguage:$("#templateMultiLanguage").html().trim()
```
<a name="b6197fa3"></a>
### 3.创建组件JS文件

```javascript
define("form/component/multilanguage", ["form/component", "form/tplutil"], function () {
	var m = require("form/component");
	var l = require("form/tplutil");
	window.MultiLanguage = m.extend({
		initialize: function (b) {
			this.langObj = CKEDITOR.lang[CKEDITOR.currentLang].design;
			var defaultTitle = this.langObj.text;
			this.componentSetup = {
				cShowCaption: defaultTitle,
				authLevel: 3,
				bCanModify: false,
				bExtend: false,
				bFilter: true,
				iOrder: 317,
				bHidden: false,
				bIsNull: false,
				bJointQuery: false,
				bMain: true,
				bMustSelect: false,
				bNeedSum: false,
				bPrintCaption: true,
				bPrintUpCase: false,
				bSelfDefine: false,
				bShowIt: true,
				bSplit: false,
				bVmExclude: 0,
				cCaption: defaultTitle,
				cControlType: "Input",
				cDataSourceName: "st.storeout.StoreOut",
				cEnumType: "",
				cFieldName: "code",
				cItemName: "code",
				cName: "code",
				cSubId: "ST",
				componentKey: "Text",
				enterDirection: 4,
				iAlign: 1,
				iBillEntityId: 70363,
				iBillId: 1000051923,
				iBillTplGroupId: 521950,
				iColWidth: 1,
				iFieldType: 1,
				iMaxLength: 255,
				iMaxShowLen: 255,
				iSystem: 1,
				iTplId: 58112,
				id: 3048679,
				layoutDetail: [],
				size: "large"
			};
			null != b &&
				(this.componentSetup.cShowCaption = b.mul_language && b.mul_language[CKEDITOR.currentLang] ? b.mul_language[CKEDITOR.currentLang] : b.cShowCaption,
					this.componentSetup.authLevel = b.authLevel,
					this.componentSetup.bCanModify = b.bCanModify,
					this.componentSetup.bExtend = b.bExtend,
					this.componentSetup.bFilter = b.bFilter,
					this.componentSetup.iOrder = b.iOrder,
					this.componentSetup.bHidden = b.bHidden,
					this.componentSetup.bIsNull = b.bIsNull,
					this.componentSetup.bJointQuery = b.bJointQuery,
					this.componentSetup.bMain = b.bMain,
					this.componentSetup.bMustSelect = b.bMustSelect,
					this.componentSetup.bNeedSum = b.bNeedSum,
					this.componentSetup.bPrintCaption = b.bPrintCaption,
					this.componentSetup.bPrintUpCase = b.bPrintUpCase,
					this.componentSetup.bSelfDefine = b.bSelfDefine,
					this.componentSetup.bShowIt = b.bShowIt,
					this.componentSetup.bSplit = b.bSplit,
					this.componentSetup.bVmExclude = b.bVmExclude,
					this.componentSetup.cCaption = b.cCaption,
					this.componentSetup.cDataSourceName = b.cDataSourceName,
					this.componentSetup.cEnumType = b.cEnumType,
					this.componentSetup.cFieldName = b.cFieldName,
					this.componentSetup.cItemName = b.cItemName,
					this.componentSetup.cName = b.cName,
					this.componentSetup.cSubId = b.cSubId,
					this.componentSetup.enterDirection = b.enterDirection,
					this.componentSetup.iAlign = b.iAlign,
					this.componentSetup.iBillEntityId = b.iBillEntityId,
					this.componentSetup.iBillId = b.iBillId,
					this.componentSetup.iBillTplGroupId = b.iBillTplGroupId,
					this.componentSetup.iColWidth = b.iColWidth,
					this.componentSetup.iFieldType = b.iFieldType,
					this.componentSetup.iMaxLength = b.iMaxLength,
					this.componentSetup.iMaxShowLen = b.iMaxShowLen,
					this.componentSetup.iSystem = b.iSystem,
					this.componentSetup.iTplId = b.iTplId,
					this.componentSetup.id = b.id,
					this.componentSetup.layoutDetail = b.layoutDetail,
					this.componentSetup.size = b.size
				);
			this.tpl = l.get("multilanguage");
		},
		setTitle: function (b) {
			this.componentSetup.cShowCaption = b;
			this.componentSetup.cCaption = b;
			// if (this.componentSetup.mul_language[CKEDITOR.currentLang]) {
			// 	this.componentSetup.mul_language[CKEDITOR.currentLang] = b;
			// }
		},
		setDescribe: function (b) {
			this.componentSetup.describe = b
		},
		setItemListener: function (b) {
			this.componentSetup.itemListener = b
		},
		setRequired: function (b) {
			this.componentSetup.bIsNull = b
		},
		setReadOnly: function (b) {
			this.componentSetup.bCanModify = b
		},
		setMul: function (bool) {
			console.log(bool)
			this.componentSetup.is_mul_language = bool;
		},
		setIsList: function (b) {
			this.componentSetup.islist = b
		},
		setSize: function (b) {
			this.componentSetup.size = b
		},
		setWidth: function (b) {
			this.componentSetup.width = b
		},
		setHeight: function (b) {
			this.componentSetup.height = b
		},
		setTitleLayout: function (b) {
			this.componentSetup.titleLayout = b
		},
		setBorderColor: function (a) {
			this.componentSetup.borderColor = a
		},
		setFormula: function (a) {
			this.componentSetup.formula = a;
			$("#editor-component").find("input[name='component-formula']").val(this.componentSetup.formula.formulaText);
		},
		// 设置多语
		setMultiLang: function (mul_language) {
			this.componentSetup.mul_language = mul_language;
		},
		setIsIdentity: function (a) {
			this.componentSetup.isIdentity = a
		},
		setLength: function (b) {
			this.componentSetup.iMaxLength = b
		},
		setIsMainList: function (b) {
			this.componentSetup.isMainList = b
		},
		render: function (b) {
			var a = $(this.tpl).siblings("#form-multilanguage");
			a.find(".widget-title .widget-title_js").text(this.componentSetup.cShowCaption);
			a.find(".component-length").text(this.componentSetup.iMaxLength);
			"true" != !this.componentSetup.bIsNull && 1 != !this.componentSetup.bIsNull || a.find(".widget-title .widget-required_js").text(" *");
			"true" != !this.componentSetup.bCanModify && 1 != !this.componentSetup.bCanModify;
			"true" != this.componentSetup.is_mul_language && 1 != this.componentSetup.is_mul_language;
			"true" != this.componentSetup.isIdentity && 1 != this.componentSetup.isIdentity;
			"true" != this.componentSetup.isMainList && 1 != this.componentSetup.isMainList;
			// "" != this.componentSetup.describe && (a.find(".field-description").text(this.componentSetup.describe), a.find(".field-description").show());
			if (this.componentSetup.size == "user-defined") {
				a.find(".form-control").css("width", this.componentSetup.width);
				a.find(".form-control").css("height", this.componentSetup.height);
			} else {
				a.find(".form-control").attr("class", "form-control " + this.componentSetup.size);
			}
			if (this.componentSetup.fieldId == undefined || "" === this.componentSetup.fieldId) {
				var timeStamp = new Date().getTime().toString();
				this.componentSetup.fieldId = timeStamp;
			}
			b.attr("class", a.attr("class"));
			b.addClass(this.componentSetup.titleLayout);
			b.attr("tempId", this.componentSetup.fieldId);
			b.html(a.html())
		},
		renderEditor: function () {
			var b = $(this.tpl).siblings("#editor-multilanguage");
			b.find("#component-title").attr("value", this.componentSetup.cShowCaption);
			b.find(".component-length").attr("value", this.componentSetup.iMaxLength);
			b.find("#component-listener").attr("value", this.componentSetup.itemListener);
			b.find("input:radio[name='title-layout'][value='" + this.componentSetup.titleLayout + "']").attr("checked", !0);
			b.find("#component-describe").text(this.componentSetup.describe);
			"true" != !this.componentSetup.bIsNull && 1 != !this.componentSetup.bIsNull || b.find("#required").attr("checked", "true");
			"true" != !this.componentSetup.bCanModify && 1 != !this.componentSetup.bCanModify || b.find("#readOnly").attr("checked", "true");
			"true" != this.componentSetup.is_mul_language && 1 != this.componentSetup.is_mul_language || b.find("#multiLang").attr("checked", "true");
			"true" != this.componentSetup.isMainList && 1 != this.componentSetup.isMainList || b.find("#isMainList").attr("checked", "true");
			"true" != this.componentSetup.isIdentity && 1 != this.componentSetup.isIdentity || b.find("#isidentity").attr("checked", "true");
			"true" != this.componentSetup.islist && 1 != this.componentSetup.islist || b.find("#isList").attr("checked", "true");
			b.find("input:radio[name='tSize'][value='" + this.componentSetup.size + "']").attr("checked", "true");
			this.componentSetup.size == "user-defined" && (b.find("div[name='user-defined-div']").show(), b.find("input[id='user-defined-width']").attr("value", this.componentSetup.width), b.find("input[id='user-defined-height']").attr("value", this.componentSetup.height));
			b.find("input:radio[name='componentType'][value='" + this.componentSetup.componentKey + "']").attr("checked", "true");
			//显示公式
			this.componentSetup.formula && b.find("input[name='isFormula']").attr("checked", "true") && b.find("input[name='formula-content']").removeClass("hide");
			$("#editor-component").html(b.html());
			this.componentSetup.formula && this.componentSetup.formula.formulaText && $("#editor-component").find("input[name='component-formula']").val(this.componentSetup.formula.formulaText);
			// $("#editor-component").find("input[name='component-formula']").val($(JSON.parse(this.componentSetup.formula).formula).html());
			this.setLang();
		},
		setLang: function () {
			$('#editor-component').find('.form-group').eq(0).find('label').eq(0).text(this.langObj.title);
			$('#editor-component').find('.form-group').eq(0).find('#addMultiLang').text(this.langObj.addMul);
			$('#editor-component').find('.formeditcontent-titlelayout').find('label').eq(0).text(this.langObj.titleLayout);
			$('#editor-component').find('.formeditcontent-titlelayout').find('span').eq(0).text(this.langObj.row);
			$('#editor-component').find('.formeditcontent-titlelayout').find('span').eq(1).text(this.langObj.column);
			$('#editor-component').find('#component-listener').siblings().text(this.langObj.controlListener);
			$('#editor-component').find('#component-formula').siblings().text(this.langObj.useFormula);
			$('#editor-component').find('.length-class').find('label').eq(0).text(this.langObj.entryLength);
			$('#editor-component').find('#required').siblings().text(this.langObj.required);
			$('#editor-component').find('#readOnly').siblings().text(this.langObj.readOnly);
			$('#editor-component').find('#multiLang').siblings().text(this.langObj.multiLang);
			$('#editor-component').find('#isidentity').siblings().text(this.langObj.isidentity);
			$('#editor-component').find('#isList').siblings().text(this.langObj.isList);
			$('#editor-component').find('#isMainList').siblings().text(this.langObj.isMainList);
			$('#editor-component').find('.componentType').find('label').eq(0).text(this.langObj.type);
			$('#editor-component').find('.componentType').find('span').eq(0).text(this.langObj.singleLine);
			$('#editor-component').find('.componentType').find('span').eq(1).text(this.langObj.multipleLines);
			$('#editor-component').find('.formeditcontent-widgetsize').find('label').eq(0).text(this.langObj.size);
			$('#editor-component').find('.formeditcontent-widgetsize').find('span').eq(0).text(this.langObj.small);
			$('#editor-component').find('.formeditcontent-widgetsize').find('span').eq(1).text(this.langObj.standard);
			$('#editor-component').find('.formeditcontent-widgetsize').find('span').eq(2).text(this.langObj.large);
			$('#editor-component').find('.bdColor').find('label').eq(0).text(this.langObj.borderColor);
		},
		change: function (b) {
			var a = b.oldObj;
			b = b.changeEl;
			this.componentSetup.cShowCaption = a.componentSetup.cShowCaption;
			this.componentSetup.describe = a.componentSetup.describe;
			this.componentSetup.bIsNull = a.componentSetup.bIsNull;
			this.componentSetup.fieldId = a.componentSetup.fieldId;
			this.componentSetup.islist = a.componentSetup.islist;
			this.componentSetup.size = a.componentSetup.size;
			this.componentSetup.width = a.componentSetup.width;
			this.componentSetup.heigth = a.componentSetup.heigth;
			this.componentSetup.borderColor = a.componentSetup.borderColor;
			//增加属性
			this.componentSetup.bShowIt = a.componentSetup.bShowIt;
			this.componentSetup.isLabelDisplay = a.componentSetup.isLabelDisplay;
			this.componentSetup.formula = a.componentSetup.formula;
			this.componentSetup.itemCode = a.componentSetup.itemCode;
			this.componentSetup.itemId = a.componentSetup.itemId;
			this.componentSetup.itemKey = a.componentSetup.itemKey;
			this.componentSetup.index = a.componentSetup.index;
			this.componentSetup.titleLayout = a.componentSetup.titleLayout;
			this.componentSetup.isbusinessObj = a.componentSetup.isbusinessObj;
			this.componentSetup.bCanModify = a.componentSetup.bCanModify;
			this.componentSetup.is_mul_language = a.componentSetup.is_mul_language;
			this.componentSetup.isIdentity = a.componentSetup.isIdentity;
			this.componentSetup.itemListener = a.componentSetup.itemListener;
			this.componentSetup.iMaxLength = a.componentSetup.iMaxLength;
			this.componentSetup.isMainList = a.componentSetup.isMainList;
			// 特殊处理多语选项（根据打勾状态）
			this.componentSetup.is_mul_language = $('#editor-component').find('#multiLang').is(":checked");
			this.render(b);
			b.addClass("field-active");
			$('#editor-component').find('.multiLang-class').css('display', 'block');
		},
		renderPreview: function (b, a, c) {
			var d = $(this.tpl).siblings("#preview-multilanguage");
			d.find(".widget-title .widget-title_js").text(this.componentSetup.cShowCaption);
			d.find(".component-length").text(this.componentSetup.iMaxLength);
			"true" != !this.componentSetup.bIsNull && 1 != !this.componentSetup.bIsNull || d.find(".widget-title .widget-required_js").text(" *");
			"true" != !this.componentSetup.bCanModify && 1 != !this.componentSetup.bCanModify;
			"true" != this.componentSetup.is_mul_language && 1 != this.componentSetup.is_mul_language;
			"true" != this.componentSetup.isMainList && 1 != this.componentSetup.isMainList;
			"true" != this.componentSetup.isIdentity && 1 != this.componentSetup.isIdentity;
			// "" != this.componentSetup.describe && (d.find(".field-description").text(this.componentSetup.describe), d.find(".field-description").show());
			if (this.componentSetup.size == "user-defined") {
				d.find(".check_js").css("width", this.componentSetup.width);
				d.find(".check_js").css("height", this.componentSetup.height);
			} else {
				d.find(".check_js").addClass(this.componentSetup.size);
			}
			d.find(".check_js").attr("id", this.componentSetup.fieldId).attr("name", this.componentSetup.fieldId);
			d.find(".check_js").attr("cid", this.cid);
			d.attr("id", "field_" + this.componentSetup.fieldId);
			d.find(".check_js").data("componentData", this);
			a && d.find(".check_js").val("");
			d.addClass(this.componentSetup.titleLayout);
			d.find(".form-control").attr("placeholder", "请填写" + this.componentSetup.cShowCaption);
			this.readOnly(d, c);
			this.el = b;
			b.append(d)
		},
		renderEditPreview: function (b) {
			var a = $(this.tpl).siblings("#form-multilanguage");
			a.find(".widget-title .widget-title_js").text(this.componentSetup.cShowCaption);
			a.find(".component-length").text(this.componentSetup.iMaxLength);
			"true" != !this.componentSetup.bIsNull && 1 != !this.componentSetup.bIsNull || a.find(".widget-title .widget-required_js").text(" *");
			"true" != !this.componentSetup.bCanModify && 1 != !this.componentSetup.bCanModify;
			"true" != this.componentSetup.is_mul_language && 1 != this.componentSetup.is_mul_language;
			"true" != this.componentSetup.isMainList && 1 != this.componentSetup.isMainList;
			"true" != this.componentSetup.isIdentity && 1 != this.componentSetup.isIdentity;
			// "" != this.componentSetup.describe && (a.find(".field-description").text(this.componentSetup.describe), a.find(".field-description").show());
			if (this.componentSetup.size == "user-defined") {
				a.find(".form-control").css("width", this.componentSetup.width);
				a.find(".form-control").css("height", this.componentSetup.height);
			} else {
				a.find(".form-control").attr("class", "form-control " + this.componentSetup.size);
			}
			if (this.componentSetup.borderColor != "" && this.componentSetup.borderColor != "rgb(204, 204, 204)") {
				//a.find(".widget-title span.widget-title_js").css("color",this.componentSetup.borderColor);
				a.find(".form-control").css("border-color", this.componentSetup.borderColor);
			}
			a.attr("id", this.componentSetup.fieldId);
			a.data("componentData", this);
			a.addClass(this.componentSetup.titleLayout);
			b.append(a)
		},
		renderStatSearch: function (b) {
			var a = $(this.tpl).siblings("#statsearch-multilanguage");
			b = b.parentEl;
			b.attr("class", "sch-group j_formFieldSearchGroup");
			b.find(".j_formField-condition").html(a)
		},
		submitCheck: function (b, a) {
			var c = this.check(b);
			a(c)
		},
		checkEvents: function (b) {
			var a = this,
				c = a.el || $(document);
			c.on("blur", "input[id='" + a.componentSetup.fieldId + "'][cid='" + a.cid + "']", function () {
				var c = a.check($(this));
				b(c)
			});
			c.on("change", "input[id='" + a.componentSetup.fieldId + "'][cid='" + a.cid + "']", function () {
				null == a.check($(this)).message && a.saveComponentValue($(this))
			})
		},
		check: function (b) {
			var a = $.trim(b.val()),
				c = b.attr("placeholder"),
				d = {};
			d.element = b;
			a == c && (a = "");
			"" != a || "true" != !this.componentSetup.bIsNull && 1 != !this.componentSetup.bIsNull || (d.message = this.componentSetup.cShowCaption + "不能为空");
			return d
		},
		getValue: function (b) {
			var a = $.trim(b.val());
			b = b.attr("placeholder");
			var c = this.oldValue,
				d = {
					formField: {
						title: this.componentSetup.cShowCaption,
						componentKey: this.componentSetup.componentKey,
						id: this.componentSetup.fieldId
					},
					oldContent: this.oldValue,
					content: a
				};
			this.oldValue = a;
			return c && 0 < c.length ? d : "" == a || a == b ? null : d
		},
		setValue: function (b, a) {
			if (null != a) {
				var c = a.content;
				this.componentSetup.fieldId ? (b.find("#" + this.componentSetup.fieldId).val(c), b.find(".j_readOnly").html(c)) : b.find("[cid='" + this.cid + "']").val(c);
				this.oldValue = c
			}
		},
		empty: function (b) {
			this.componentSetup.fieldId ? b.find("#" + this.componentSetup.fieldId).val("") : b.find("[cid='" + this.cid + "']").val("")
		},
		readOnly: function (b, a) {
			var c = b.find("input[id='" + this.componentSetup.fieldId + "'][cid='" + this.cid + "']").attr("readOnly", a);
			a ? (c.addClass("hide"), c.siblings(".j_readOnly").removeClass("hide")) : (c.removeClass("hide"), c.siblings(".j_readOnly").addClass("hide"))
		}
	});
	return window.MultiLanguage
});
```
<a name="54f89e03"></a>
### 4.添加新控件引用

  - 在static/design/js/form/form-plugin.js中添加新控件的引用

```javascript
		"form/component/button",
    
  	require("form/component/button");
```


