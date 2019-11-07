$(window).resize(function() {
	window.location.reload();
});

var refreshTime = 15000 ;//仪表盘国际方向自动刷新的毫秒数
var listPagingRefreshTime = 10000 ;//仪表盘国际方向自动刷新的毫秒数
var pageSize=12;
var intlNum = 0 ;//仪表盘国际方向自动刷新的次数
var intlPageNum = 6 ;//国际方向每一行显示的个数
var fixNum = 0 ;//保留小数位

$(document).ready(function (){
		//初始化仪表板数据
		initData() ;
		if (screen.height > 900) {
            $(".page").height(screen.height);
        } else {
            $(".page").height(900);
        }
		$(".unicon-bj").height($(document).height());
        var mt=$(".yibp").height()+80;
        
		$(".top6").css({'margin-top':mt});
		$(".miit_map_right").height($('.yibp').height());
		var $tr_height = $("table.miit_tab_title tr").eq(0).height();
		pageSize = parseInt(($("div.miit_map_right").height()-$tr_height-$("div.miit_tab_h3").height())/$tr_height)-1;
})


var data_6=[300,310,];//优中差区间范围
var splitList = [ 
    {"end" : data_6[0]},
    {"start" : data_6[0],"end" : data_6[1]}, 
    {"start" : data_6[1]} 
   ];

$(function() {
	   var data_101={};//指标下拉框数据
	   var dataArrayOfMap={};//map中的所有数据
	   $("#text_datetime").val(new Date().format("{0}-{1}-{2}"));
	   /*********************************指标图例操作begin*********************************/
	   $("#th_quota").text("时延(ms)");
	   $("#td_good").text("<="+data_6[0]);
	   $("#td_normal").text(data_6[0]+"-"+data_6[1]);
	   $("#td_bad").text(">"+data_6[1]);
	    /*********************************指标图例操作end*********************************/
	  /////////////////////////////////////////////指标begin
	  $('#combox_quota').combobox({
		    url: '/world_Map/quotas',
		    valueField: 'value',
			textField: 'text',
			groupField:'group',
			editable:false,
			onLoadSuccess:function(data){
			  if(data.length == 0){
				  $.messager.show("请先配置场景信息","info");  
				  return;
			  }
		       $('#combox_quota').combobox('setValue',$('#combox_quota').combobox('getData').length>0 ? $('#combox_quota').combobox('getData')[0].value : '');
		       $($('#combox_quota').combobox('getData')).each(function(i_1,object_1){
			    	if(object_1.value==$("#combox_quota").combo("getValue")){
			    		data_101=object_1;
			    	}
			    });
		       $("#i_update").click();//调用方法
		    },
	      onSelect:function(){
	    	 $($('#combox_quota').combobox('getData')).each(function(i_1,object_1){
			    	if(object_1.value==$("#combox_quota").combo("getValue")){
			    		data_101=object_1;
			    	}
			 });
	      	 $("#i_update").click();//调用方法
			}
	  });
	  //////////////////////////////////////////////指标end
	  
	  
	  /****************************地图悬浮事件begin****************************/
	  var formatter_1=function(option){
		  var config=option.config,
		      param=option.param,
		      ticket=option.ticket,
		      callback=option.callback;
		      var name="";
		      if(param.name.indexOf(">")!=-1){//表示连接线
		    	  if(param.name.split(">").length>=2){
		    		  name=$.trim(param.name.split(">")[1]);
		    	  }
		      }else{
		    	  name=$.trim(param.name);
		      }
		      var dataOfMap=null;
    		  $.each(dataArrayOfMap,function(i_1,object_1){
    			  if($.trim(object_1.name)==name){
    				  dataOfMap=object_1;
    				  return false;
    			  }
    		  });
    		  if(dataOfMap==null){
    			  return "<div style='width:100%;height:20px;text-align:left'><h5>该地区未配置测试</h5></div>";
    		  }else{
    			  return "<div style='width:100%;height:40px;text-align:left'><h5>中国  > "+name+"</h5>" +
 		  		 "<h3>国际方向时延:"+(dataOfMap==null? 
 		  				                       "无" : dataOfMap.value)+
 		         "ms</h3></div>";
    		  }
	  }
	  /****************************地图悬浮事件end****************************/
	  /////////////////////////////////////////主方法begin
	  $("#i_update").click(function(){
		  ////////////////////////////////////////////begin
		  $("#div_map").width($(window).width()*0.9).height($(window).height()*0.9);
		  var data_1=$.getJSONData("/world_Map/worldMap",
					               { 
					                "quota":$("#combox_quota").combo("getValue"),//指标
					                "scene_id":Global.SCENE_ID_6,//情景
					                "test_time":$("#text_datetime").val(),//时间
					                "tag" : Math.random()
					               },
						           "POST");
	      if(data_1.state){
	    	  var data_3=[];
	    	  var data_4={};
	    	  var data_2=$.map(data_1.object.data,function(object_1,i_1){
	    		  	//	国际表t_k_world没有跟地址对应的数据，则不绘制地图。数据列表显示，目的地址为-
		    		if(object_1.dest_code===null){
		    			  return false;
		    		}
		    		//@desc 将目的端中国过滤掉
		    		if (object_1 && object_1.dest_name=="中国"){
                        return null;
                    }
//		    		if(object_1.quota!=null){
//		    			data_3.push([{name:"中国"},{name:object_1.dest_name}]):"";
//		    			data_3.push([{name:"中国"},{name:object_1.dest_name,value:"20"}]):"";
//		    			}
	    			object_1.quota!=null ? data_3.push([{name:"中国"},{name:object_1.dest_name}]):"";
	    			(object_1.quota!=null)? data_3.push([{name:"中国"},{name:object_1.dest_name,value:object_1.quota}]):"";
	    		    
	    			
	    			data_4[object_1.dest_code]=" "+object_1.dest_name;
			    	return object_1.quota==null ? $.extend({},{
								    		                   name:object_1.dest_name,
								    		                   value:object_1.quota,
								    		                   dataOfArea:object_1
									    	                   }) : 
					    	                	   $.extend({},{
									    		                name:object_1.dest_name,
									    		                //特殊处理广东、上海北京的用户
									    		                value:object_1.quota,
									    		                dataOfArea:object_1
									    		                /*itemStyle:{normal:{color:function(){
									    		                	if(parseFloat(object_1.quota)>parseFloat(data_6[1])){
									    		                		return acsno.world.defaultcolor[2];//值越大越坏就返回红色反之返回绿色
									    		                	//}else if(parseFloat(object_1.quota)<parseFloat(data_6[0])){
									    		                	//	return data_101.order!="desc" ? acsno.world.defaultcolor[0] : acsno.world.defaultcolor[2];//绿色
									    		                	}else{
									    		                		return acsno.world.defaultcolor[0];//黄色
									    		                	}
									    		                 }
									    		                 }}*/
									    	                    });
			   });
	    	   dataArrayOfMap=data_2;
	      }
	      //alert(JSON.stringify(data_5));
	      //$.extend(data_5,data_4);
	      //alert(JSON.stringify(data_5));
		  acsno.world.initMap({
				             "selector":$("#div_map"),
				             "mapType":'world',
				             "text":"",
				             "data_1":data_2,
				             "data_2":data_3,
				             "nameMap":data_4,
				             "quoto":data_1.object.quota,
				             "formatter":function(option){
					    	    	return formatter_1(option);
					   	      }
			                 });
        ////////////////////////////////////////////地图end
		  
		////////////////////////////////////////////最差国际排名begin
	   $("#div_acsno_line").html("");
//       var data_1=$.getJSONData("/world_Map/worldHistogram",
//    		                   {"scene_id":Global.SCENE_ID_6,
//    	                        "quota":$("#combox_quota").combo("getValue"),
//    	                        "order":data_101.order,
//    	                        "test_time":$("#text_datetime").val(),
//    	                        "tag" : Math.random()
//    	                        },
//    	                        "POST");
       if(data_1.state){
    	   $("#table_world tr").remove();//删除除第一行除外的所有的行
    	   //判断下是否是展开状态
    	   var dsp="display:none";
    	   if($("#showOrHide").attr("class")!="inter_tab_h3_expand"){
    		   dsp="display:";
    	   }
    	   var table_1=$("#table_world");
    	   
    	   
    	   
    	   //排序操作
      	 var len = data_1.object.data.length;  
      	 for (var i = 0; i < len; i++) {  
               //split() 方法用于把一个字符串分割成字符串数组  
               //获取每行分割后数组的第一个值,即此列的数组类型,定义了字符串\数字\Ip  
               type = data_1.object.data[i].quota; 
               
               for (var j = i + 1; j < len; j++) {  
                   //获取每行分割后数组的第二个值,即文本值  
                   value1 = data_1.object.data[i].quota;  
                   //获取下一行分割后数组的第二个值,即文本值  
                   value2 = data_1.object.data[j].quota;  
                   //接下来是数字\字符串等的比较  
                       value1 = value1 == "" ? 0 : value1;  
                       value2 = value2 == "" ? 0 : value2;  
                       if (parseFloat(value1) < parseFloat(value2)) {  
                           var temp = data_1.object.data[j];  
                           data_1.object.data[j] = data_1.object.data[i];  
                           data_1.object.data[i] = temp;  
                          
                       }  
                   }
               } 
      	 for (var i = 0; i < len; i++) {  
      		if(data_1 && data_1.object && data_1.object.data[i] && data_1.object.data[i]["dest_name"]=="中国" ){//如果目的地址是中国，将其过滤掉
      			continue;
      		}
      		if(i < pageSize){
				var tr_1=$("<tr />").appendTo(table_1);
			}else{
				var tr_1=$("<tr style='display:none;'/>").appendTo(table_1);
			}
    		//if(i_1<pageSize){ common_tab_cur_td
//	    		var tr_1=$("<tr/>").appendTo($("#table_world"));
    		//需要根据登录用户显示不同的字段
		    	var td_1=$("<td/>").attr("class","txtmid").appendTo(tr_1);
		    	var span_1=$("<span/>").attr("class","miit_tab_num").text(i+1).appendTo(td_1);
		    	var td_2=$("<td/>").attr("class","zg").attr({style:dsp}).text(data_1.object.data[i]["quota"]==null ? "-" : parseFloat(data_1.object.data[i]["quota"]).toFixed(fixNum)).appendTo(tr_1);
		    	var td_3=$("<td/>").attr("class","gz").attr({style:dsp}).text(data_1.object.data[i]["quota_gz"]==null ? "-" : parseFloat(data_1.object.data[i]["quota_gz"]).toFixed(fixNum)).appendTo(tr_1);
		    	var td_4=$("<td/>").attr("class","sh").attr({style:dsp}).text(data_1.object.data[i]["quota_sh"]==null ? "-" : parseFloat(data_1.object.data[i]["quota_sh"]).toFixed(fixNum)).appendTo(tr_1);
		    	var td_5=$("<td/>").attr("class","bj").attr({style:dsp}).text(data_1.object.data[i]["quota_bj"]==null ? "-" : parseFloat(data_1.object.data[i]["quota_bj"]).toFixed(fixNum)).appendTo(tr_1);
		    	var td_6=$("<td/>").text(data_1.object.data[i]["dest_name"]==null ? "-" :data_1.object.data[i]["dest_name"]).appendTo(tr_1);
    		//}
           }  
    	   
    	   

	    		$(".bj").each(function(i,object){
	    			$(object).show();
	    		});
       }
       ////////////////////////////////////////////最差国际排名end
	  });
      /////////////////////////////////////////主方法end
	  setInterval(function(){
		  $("#i_update").click();//调用方法
	  },60000);
	  
	  //填充国内数据
	  fillCountryData() ;
	  //填充国际数据
	  fillIntlData() ;
	  window.setInterval("fillIntlData()",refreshTime);  
	  window.setInterval("autoListPaging()",listPagingRefreshTime);  
})

function showOrHide(){
	if($("#showOrHide").attr("class")=="inter_tab_h3_expand"){
		$(".miit_map_right").width($(".miit_map_right").width()*2);

		$(".bj").each(function(i,object){
			$(object).show();
		});


		$(".zg").each(function(i,object){
			$(object).show();
		});

		$("#showOrHide").attr("class","inter_tab_h3_back");
	}else{
		$(".miit_map_right").width($(".miit_map_right").width()/2);

		$(".gz").each(function(i,object){
			$(object).hide();
		});


		$(".sh").each(function(i,object){
			$(object).hide();
		});


		$(".zg").each(function(i,object){
			$(object).hide();
		});

		$("#showOrHide").attr("class","inter_tab_h3_expand");
	}
}
/**
 * 列表定时分页功能
 */
function autoListPaging(){
	if(!prepage()){
		nextpage() ;
	}
}
//上一个
function prepage(){
	var b=false;
	var idx=-1;
	$("#table_world tr").each(function(i,obj){
		//alert(obj.style.display+" "+obj.innerHTML);
		//前翻页，找到第一个显示的tr，把之前的十五条处理成显示即可，如果第一条就是显示的，则返回
		if(i==0 && obj.style.display==""){
			return false;
		}
		if(!b && obj.style.display==""){//到第一个显示的行，之后的pageSize条都得设置为隐藏
			idx=i;
			b=true;
		}
		if(b && obj.style.display==""){
			obj.style.display="none";
		}
	});
	if(idx==-1) return false;
	$("#table_world tr").each(function(i,obj){
		if(i<idx && i>=(idx-pageSize)){
			obj.style.display="";
		}
	});
	return b ;
}
//下一页
function nextpage(){
	var b=false;
	var idx=-1;
	$("#table_world tr").each(function(i,obj){
		//alert(obj.style.display+" "+obj.innerHTML);
		//先找到第一条没显示的tr，然后进行显示，把之前的pageSize条隐藏了
		if(!b && obj.style.display==""){
			b=true;
		}
		if(b && obj.style.display=="none"){
			idx=i;
			return false;
		}
	});
	if(idx==-1) return false;
	$("#table_world tr").each(function(i,obj){
		if(i<idx && i>=(idx-pageSize)){
			obj.style.display="none";
		}
		if(i>=idx && i<(idx+pageSize)){
			obj.style.display="";
		}
	});
	return b ;
}
/**
 * 初始化数据
 */
function initData(){
	var country_str="";
	var intl_str="";
	for (var index = 0; index < gaugeData.gateway.length; index++) {
		var name = gaugeData.gateway[index].name ;
		var newName = "";
		if(name && name.length>0){
			for(var i=0; i< name.length ;i++){
				if(i==0){
					newName += name[i];
				}else{
					newName += "<br/>" + name[i];
				}
			}
		}
		country_str+="<div class=\"yib-c\">";
		country_str+="<div class='yip-l'>"+newName+"</div>";
		country_str+="<div class='yip-m' id='country_"+index+"'></div>";
		country_str+="<div class='yip-r'></div>";
		country_str+="</div>";
	}
	$("#country_gateway").append(country_str);
	
	for (var index = 0; index < intlPageNum; index++) {
		if (index >=gaugeData.intl.length) {
			break ;
		}
		var name = gaugeData.intl[index].name ;
		intl_str+="<div class='yip-m2' id='intlDiv_"+index+"'>" ;
		intl_str+="<div class='top6-p' id='intl_"+index+"'></div>" ;
		intl_str+="<div class='top6-name' id='intlName_"+index+"'>"+gaugeData.intl[index].name+"</div>" ;
		intl_str+="</div>" ;
	}
	$("#intl_gateway").append(intl_str);
}
/**
 * 填充国内数据
 */
function fillCountryData() {
	/*****************国内数据*****************/
	var param = {};
	for (var i = 0; i < gaugeData.gateway.length; i++) {
		var name = gaugeData.gateway[i].name ;
		var max = gaugeData.gateway[i].bandwidth ;
		var outcome = gaugeData.gateway[i].outcome ;
		var income = gaugeData.gateway[i].income ;
		param = {
			select : $('#country_' + i)[0],
			data1 : [{value : parseFloat(outcome),name : '出流量(G)'}],
			max1 : max,
			min1 : 0,
			name1 : '出流量(G)',
			data2 : [{value : parseFloat(income),name : '入流量(G)'}],
			max2 : max,
			min2 : 0,
			name2 : '入流量(G)'
		};
		gauge(param);
	}
}
/**
 * 填充国际数据
 */
function fillIntlData() {
	/*****************国际数据*****************/
	var param = {};
	intlNum++ ;//每一次刷新，该值加1
	//显示所有国际数据结构
	for (var index = 0; index < intlPageNum; index++) {
		$('#intlDiv_' + index).show() ;
	}
	var num = Math.ceil(gaugeData.intl.length/intlPageNum) ;//向上取整,有小数就整数部分加1
	var j = -1 ;//从0到6
	for (var i = (intlNum-1)*intlPageNum; i < ((intlNum-1)*intlPageNum + intlPageNum); i++) {
		if (i>=gaugeData.intl.length) {
			//隐藏最后一页不显示的数据
			for (var index = (j+1); index < intlPageNum; index++) {
				$('#intlDiv_' + index).hide() ;
			}
			break  ;
		}
		j++ ;
		var name = gaugeData.intl[i].name ;
		var max = gaugeData.intl[i].bandwidth ;
		var outcome = gaugeData.intl[i].outcome ;
		var income = gaugeData.intl[i].income ;
		$("#intlName_"+j).text(name) ;//定义仪表盘下方标题
		param = {
			select : $('#intl_' + j)[0],
			data1 : [{value : parseFloat(outcome),name : '出流量(G)'}],
			max1 : max,
			min1 : 0,
			name1 : '出流量(G)',
			data2 : [{value : parseFloat(income),name : '入流量(G)'}],
			max2 : max,
			min2 : 0,
			name2 : '入流量(G)'
		};
		gauge(param);
	}
	//当访问的次数与总记录数6的倍数相等时，intlNum=0，再从第一页开始显示
	if (num==intlNum) {
		intlNum=0 ;
	}
}