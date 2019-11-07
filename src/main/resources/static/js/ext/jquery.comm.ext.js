/**
 * JQuery插件的两种形式：
 * 1、jQuery.extend(object) 是为JQuery类添加扩展，相当于是给JQuery类添加静态方法。
 *		调用步骤是：$.方法名(参数);
 *	  jQuery.foo = function(param){}
 *	  <=>
 *	  jQuery.extend({
 *						方法名1:function(param){
 *								
 *							},
 *						方法名2:function(param){
 *								
 *							}
 *					})
 *	  
 *	  调用方式都是$.方法名(参数)
 *	  扩展->加上命名空间：
 *	  jQuery.命名空间名={
 *		  	方法名1:function(param){
 *				
 *				},
 *			方法名2:function(param){
 *				
 *				}
 *		  }
 * 2、jQuery.fn.extend(object);  给JQuery实例对象添加方法，相当于是添加成员方法，在方法内部可以使用$符号。
 *		(function($){
 *			$.fn.extend({
 *							方法名1:function(){
 *								
 *								},
 *							方法名2:function(){
 *								
 *								}	
 *						})		  
 *		})(jQuery);
 * 		<=>
 *		(function($){
 *			$.fn.方法名1:function(){
 *								
 *								};		  
 *		})(jQuery);
 *		调用的方式都是$("#id").方法名(参数);
 **/
 
////---1、将form表单序列化---$("#ff").serializeObject();  返回form序列化后的JSON对象
////---2、内容在iframe中显示---$("#ff").iframe(url); 返回Jquery对象
(function($){
	$.fn.extend({
		/**
		 * 将Form表单序列化成json，调用过程$("#addForm").serializeObject();
		 **/
		serializeObject:function(){
			var json = {};
			var a = this.serializeArray();
			$.each(a, function() {
				var item = this;
				if (json[item["name"]]) {
				    json[item["name"]] = json[item["name"]] + "," + item["value"];
				} else {
				    json[item["name"]] = item["value"];
				}
			});
			return json;    
		},
		iframe:function(options){
			if(!$.isPlainObject(options)){
				options = {url:options};
			}
			var opts = $.extend({}, $.fn.iframe.defaults, options);
			var a = this;
			$.each(a, function() {
				if(opts.url){
					//var ifm = $("<iframe id='iframepage' name='iframepage' marginheight='0' marginwidth='0' height='"+($(window).height()-105)+"' width='100%' scrolling='yes' frameborder='0' src='"+opts.url+"'></iframe>");
					var ifm = $("<iframe id='iframepage' name='iframepage' marginheight='0' marginwidth='0' allowtransparency='true' width='100%' scrolling='no' frameborder='0' src='"+opts.url+"'></iframe>");
					$(a).html(ifm);
				}
			});
			return a;
		}
	});		
	
	$.fn.iframe.defaults = {
		url:""
	};
	
	$.fn.exportxls = function(options) { 
		var opts = $.extend({}, $.fn.exportxls.defaults, options);
		var a = this;
		return a.each(function(){
			/* 循环得到opts配置的值
			$.each(opts,function(i){
				alert(i + " " + opts[i]);
			});*/
			$(a).bind("click",function(){
				// 获取表格的内容
				var toExcelStr = "<table>"+$("#"+opts.tableId).html()+"</table>";
				if(opts.isPage == 1){ // 如果是分页，只是将表格的头部信息传给Action或者jsp进行处理。否则的话，将整个表格传入Action
					if(url == null){
						alert("请填写导出请求的url地址");
						return;
					}
					var subHtml = $($("#"+opts.tableId).parent().parent().html()).find("tr").remove("tr:not(.t)");
					toExcelStr = subHtml.parents("table").parent().html();
				}
				toExcelStr = toExcelStr.replace(/(\w+)\s*=\s*([\w\(\)\.]+)/ig,'$1="$2"').replace(/'/ig,'\"'); // 加上引号
				// 获取表格的标题
				var table_title = opts.tableTitle;
				if((table_title == null || table_title.length <= 0)&&(opts.titleFrom.lenght>0 && $("#"+opts.titleFrom).length>0)){
					table_title = $("#"+opts.titleFrom).text();
				}
				// 构建form字符串
				var frm_str = "<form id='exportForm' name='exportForm' style='display: none' action='"+opts.actionUrl+"' method='post'>";
				frm_str += "<input name='fileName' value='"+opts.fileName+"' type='hidden'/>";
				frm_str += "<input name='content' value='"+toExcelStr+"' type='hidden'/>";
				frm_str += "<input name='isPage' type='hidden' value='"+opts.isPage+"'/>";
				frm_str += "<input name='tableTitle' type='hidden' value='"+opts.tableTitle+"'/>";
				frm_str += "<input name='startX' type='hidden' value='"+opts.startX+"'/>";
				frm_str += "<input name='startY' type='hidden' value='"+opts.startY+"'/>";
				frm_str += "<input name='totalSheet' type='hidden' value='"+opts.totalSheet+"'/>";
				frm_str += "<input name='sheet' type='hidden' value='"+opts.sheet+"'/>";
				frm_str += "<input name='widths' type='hidden' value='"+opts.widths+"'/>";
				frm_str += "<input name='thcolor' type='hidden' value='"+opts.color.th+"'/>";
				frm_str += "<input name='titlecolor' type='hidden' value='"+opts.color.title+"'/>";
				frm_str += "</form>";
				// 构建form的jQuery变量
				var frm = $(frm_str);
				if(opts.isPage == 1){
					$(".search_bar :input:not(':button'):not(':submit')").each(function(index,domEle){
						var inputTab = "<input type='hidden' name='" + $(this).attr("name") + "' value='"+ $(this).val() +"' />";
						frm.append(inputTab);
					});
				}
				frm.appendTo("body");
				$("#exportForm").submit();
				frm.remove();
			});
		});
	};
	$.fn.exportxls.defaults = {    
		fileName: "export.xls",	// 导出的文件名称    
		tableId: "news_table", // 需要导出表格的id
		actionUrl:"/eea", // 默认的提交地址
		isPage:0, // 是否选择分页
		tableTitle:"", // 导出表格的标题，可以用titleFrom id选择器从页面中选择文字
		titleFrom:"", // 如果没有填写tableTitle，可以用titleFrom ID选择器来选择表格标题的引用地址
		startX:0, // table在excel中的纵坐标偏移
		startY:0, // table在excel中横坐标的偏移
		totalSheet:1, // 导出excel中共有多少个sheet标签
		sheet:1, // 数据在第几个标签中,
		color:{th:"",title:""},
		widths:""
	};  
	
})(jQuery);

jQuery.datagrid = {
	// 获取选中行，返回选中行的ID，以逗号隔开。必须要保证表格有ID有ID属性
	getSelections:function(rows){
		var ss = [];
		for(var i=0; i<rows.length; i++){
            var row = rows[i];
            ss.push(row.id);
        }
        return ss.join(',');
	}
}

/**
 * 以ajax方式从服务器返回json
 * @author liangjianye
 * @param url
 *            此处url相对路径即可 url="/common_Quotas/findReportPropertiesByTaskParam"
 *            getJSONData方法会自动加上path
 * @param data
 *            参数 {"taskParam.id":task_param_id,"tag" : Math.random()}
 *            可以统一传递一个tag参数get请求也不会存在缓存
 * @param type
 *            默认get请求，可是是get或者post
 * @returns 返回服务器的json数据
 */
var getJSONData = jQuery.getJSONData = function(url, data, type) {
	var jsonData = null;
	if (type == null) {
		type = "GET";
	} else {
		type = "POST";
	}
	$.ajax({
		url : url,
		data : data || {},
		async : false,
		type : type,
		dataType : 'json',
		success : function(result) {
			jsonData = result;
		}
	});
	return jsonData;
}

/**************************************************easyui-插件-----开始********************************************************/
////---1、easyui中form序列化，$("#ff").form("serializeObject"); 返回form序列化后的JSON对象
////---2、获取form表单的值，$("#ff").form("getValue","user_name");获取表单中name='user_name' 的元素值
$.extend($.fn.form.methods, {
	/**
	 * 将easyui的form序列化成json对象。
	 * 调用方法：$('form').form('serializeObject');
	 */
    serializeObject: function(jq){  
		var o = {};    
		var a = $(jq[0]).serializeArray();    
		$.each(a, function() {    
		   if (o[this.name]) {    
			   if (!o[this.name].push) {    
				   o[this.name] = [o[this.name]];    
			   }    
			   o[this.name].push(this.value || '');    
		   } else {    
			   o[this.name] = this.value || '';    
		   }    
		});    
		return o;  
    },
    /**
	 * 获取easyui表单的值。
	 * 调用方法：$('form').form('getValue','user_name'); // 获取表单中name='user_name' 的元素值
	 */
    getValue:function(jq,name){  
        var jsonValue = $(jq[0]).form("serializeObject");
        return jsonValue[name]; 
    }
});

//jquery easyui 扩展验证
$.extend($.fn.validatebox.defaults.rules, {    
	 //权重的验证0到1之间的两位小数
	 validate_weight : {
		validator : function(value) {
		return /^(0\.(0[1-9]{1}|[1-9]\d?)|1(\.0{1,2})?)$/.test(value);
		},
		message : '请输入0到1的数字，最高精确到2位小数'
     },
     //正实数的验证
     validate_positive_number : {
		validator : function(value) {
			return /^[0-9]\d*(\.\d+)?$/.test(value);
		},
	 	message : '请输入正实数'
     },
     
     //正整数的验证
     validate_positive_integer_number : {
		validator : function(value) {
			return /^[0-9]*[1-9][0-9]*$/.test(value);
		},
	 	message : '请输入正整数'
     },
     
     // 验证整数或小数
     validate_intOrFloat : {
        validator : function(value) {
            return /^\d+(\.\d+)?$/.test(value);
        },
        message : '请输入数字'
     },
     //电话号码验证
     phoneRex : {
 		validator : function(value) {
 			var rex = /^1[3-8]+\d{9}$/;
 		// var rex=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
 		// 区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
 		// 电话号码：7-8位数字： \d{7,8
 		// 分机号：一般都是3位数字： \d{3,}
 		// 这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
 		var rex2 = /^((010)|(02\d{1})|(0[3-9][1-9]\d{1}))-\d{7,8}(-(\d{3,}))?$/; //有-
 		var rex3 = /^((010)|(02\d{1})|(0[3-9][1-9]\d{1}))\d{7,8}$/; //没有-
 		if (rex.test(value) || rex2.test(value) || rex3.test(value)){
 			// alert('t'+value);
 			return true;
 		} else {
 			// alert('false '+value);
 			return false;
 		}

 	},
 	message : '请输入正确电话或手机格式'
 	},
 	//验证邮箱
 	Email: {
 		validator: function (value) {
 			var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 			return reg.test(value);
 		},
 	    message: '输入的邮箱格式不准确'
 	},
 	//验证汉字
     CHS: {
         validator: function (value) {
             return /^[\u0391-\uFFE5]+$/.test(value);
         },
         message: '只能输入汉字'
     },
     //移动手机号码验证
     mobile: {//value值为文本框中的值
         validator: function (value) {
             var reg = /^1[3|4|5|8|9]\d{9}$/;
             return reg.test(value);
         },
         message: '输入手机号码格式不准确.'
     },
     //国内邮编验证
     zipcode: {
         validator: function (value) {
             var reg = /^[1-9]\d{5}$/;
             return reg.test(value);
         },
         message: '邮编必须是非0开始的6位数字.'
     },
     //用户账号验证(只能包括 _ 数字 字母) 
     account: {
         validator: function (value) {
                 if (!/^[\w]+$/.test(value)) {
                     $.fn.validatebox.defaults.rules.account.message = '只能由数字、字母、下划线组成.';
                     return false;
                 } else {
                     return true;
                 }
         }, 
         message: '只能包含下划线、数字、字母，不能有其他的字符.'
     },
     //名称校验特殊字符(只能包括 _ 数字 字母) 
     validText: {
         validator: function (value) {
	    	 var pattern = new RegExp("[`~!%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]"); 
	         
	         if (pattern.test(value)) {
	         	$(this).select();
	         	 return false;
             } else {
                 return true;
             }
         }, 
         message: '包含下划线、数字、字母，不能有其他的字符.'
     }
}); 
//文本框的特殊字符校验，默认为false，即未发现特殊字符;返回true说明发现了特殊字符
function checkAllTextValidJ() {
	
	var result = false; 
	//文本框type为text的
	$.each($("[type='text']"),function(index) {
		
		var pattern = new RegExp("[`~!%#$^&*=|{}':;'\\[\\]<>/?；：%……+￥【】‘”“'。，、？]"); 
            
        if (pattern.test($(this).val())) {
        	$.messager.alert("包含下划线、数字、字母，不能有其他的字符.", "warning");
        	result = true;
        	$(this).select();
        	return;
        }
	})
	//文本框type为input的
	$.each($("[type='input']"),function(index) {
		
		var pattern = new RegExp("[`~!%#$^&*=|{}':;'\\[\\]<>/?；：%……+￥【】‘”“'。，、？]"); 
            
        if (pattern.test($(this).val())) {
        	
        	$.messager.alert("包含下划线、数字、字母，不能有其他的字符.", "warning");
        	result = true;
        	$(this).select();
        	return;
        }
	})
	
	return result;
}
//日期格式化
Date.prototype.format = function(formatString) {
    with (this) {
        return (formatString||"{0}-{1}-{2} {3}:{4}:{5}").format(
              getFullYear()
            , ("0" + (getMonth()+1)).slice(-2)
            , ("0" + getDate()).slice(-2)
            , ("0" + getHours()).slice(-2)
            , ("0" + getMinutes()).slice(-2)
            , ("0" + getSeconds()).slice(-2)
        );
    }
};
/**************************************************easyui-插件-----结束********************************************************/