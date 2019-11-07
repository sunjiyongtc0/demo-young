var ParamValue;
var board_paramId;
var quote;
//标记是否是省大屏配置。1代表集团，0代表省
var provincial = 1;
var regionCode = 100000;
var regionName = "集团";
var provinceList;
var isSystemAdminRole = $("#systemAdminRole").val();
var configData ;
$(function(){
	$("#tradiv").hide();
	LoadTableData();
	findData();
	//设置config
		require.config({
			paths:{
				echarts:'/js/echarts-2.2.0/build/dist',
			} 
		});
});

/************************预加载****************/
function LoadTableData(){
	var provincecodeUrl ="/provinceList?regionCode="+regionCode;
	$.ajax({
		dataType: "json",
		url: "/provinceList",
		success: function(result) {
			provinceList=result.object;
			console.log(provinceList);
		}
	});
	$("#table2").hide();
	var trHTML2 ="<th>&nbsp;</th>";
	var trHTML3 ="<th>&nbsp;</th>";
	for(var key in provinceList){
		var trHTML1 = "<tr><th>"+provinceList[key]+"</th></tr>";
		trHTML2 += "<th colspan='2'>"+provinceList[key]+"</th>";
		trHTML3 += "<th width='62'>v6</th><th width='62'>v4</th>";
		$("#tab1").append(trHTML1);
	}
	$("#tab2").append("<tr>"+trHTML2+"</tr>");
	$("#tab2").append("<tr>"+trHTML3+"</tr>");
}

/************************ 获取数据json，加载数据页面 ****************/
function findData(){
	var codeUrl ="/findData?regionCode="+regionCode;
	$.ajax({
		dataType: "json",
		url: codeUrl,
		success: function(result) {
			configData=result.object;
			var MatrixsData=configData.MatrixsData;
			var RankData=configData.RankData;
			//页面渲染
			setDests(RankData);
			setMatrixs(MatrixsData);
		}
	});
}
//质差链路排名
function setDests(RankData){
	$("#table2").show();
	var j=1;
	for(var i=0;i<RankData.length;i++){
			var sd=RankData[i].srcDest;
			var index=sd.lastIndexOf("\-");
			var src=sd.substring(0,index) ;
			var dest=sd.substring(index+1,sd.length) ;
		var trHTML = " <tr onclick='setTratab("+src+","+dest+")' ><td width='11%'><span class='ipv-num'>"+(j++)+"</span></td><td width='17%'>"+provinceList[src]+"</td><td width='17%'>"+provinceList[dest]+"</td><td width='16%'>"+RankData[i].v6+"</td><td width='16%'>"+RankData[i].v4+"</td><td class='font-red'>"+RankData[i].rata+"%</td></tr>";
		$("#table2").append(trHTML);//在table最后面添加一行
	}
}

//矩阵数据
function setMatrixs(MatrixsData){
	for(var key in provinceList){
		var trHTML="<td style='width:70px; float:left;color:#222; font-weight:normal; background:#dcdeea;'>"+provinceList[key]+"</td>";
		for(var key2 in provinceList){
			var sd=key+"-"+key2;
			var html="<td>--</td><td>--</td>"
			if(key!=key2){
			for(var i=0;i<MatrixsData.length;i++){
				if(MatrixsData[i].srcDest==sd){
						if(MatrixsData[i].rata>30){
							html="<td class='cor-red'>"+MatrixsData[i].v6+"</td><td class='cor-red'>"+MatrixsData[i].v4+"</td>";
						}else if(MatrixsData[i].rata>10){
							html="<td class='cor-org'>"+MatrixsData[i].v6+"</td><td class='cor-org'>"+MatrixsData[i].v4+"</td>";
						}else {
							html="<td >"+MatrixsData[i].v6+"</td><td >"+MatrixsData[i].v4+"</td>";
						}
					}
				}
			}
			trHTML += html;
		}
		$("#tab2").append("<tr>"+trHTML+"</tr>");
	}
}
/*********************************************************************/
//tra测试数据-------对比列表
function setTratab(s,d){
	$("#tradiv").show();
	$("#tratab").html("");
	var html=" <tr><th rowspan='2' width='12%'>&nbsp;</th><th rowspan='2' width='3%'>序号</th>" +
			"<th colspan='2' width='11%'>时延</th><th colspan='2' width='11%'>抖动</th>" +
			"<th colspan='2' width='11%'>丢包率</th><th colspan='2' width='20%'>主机IP</th>" +
			"<th colspan='2'>IP归属地</th></tr>" +
			"<tr><th>v6</th><th>v4</th><th>v6</th><th>v4</th><th>v6</th>" +
			"<th>v4</th><th>v6</th><th>v4</th><th>v6</th><th>v4</th></tr>";
	var traUrl ="/findTraData?src="+s+"&dest="+d;
	$.ajax({
		dataType: "json",
		url: traUrl,
		success: function(result) {
			var traData=result.object;
			var Heads=traData[s+"-"+d];
			var Tails=traData[d+"-"+s];
			var row=Heads.length;
			if(Heads!=null){
				for(var i=0;i<row;i++){
					html+="<tr>";
					if(i==0){
						html+="<td rowspan='"+row+"' class='name-bg'>"+provinceList[s]+"-"+provinceList[d]+" <font color='#1f76bb'>(正)</font></td>";
					}
					html+="<td><span class='ipv-num'>"+(i+1)+"</span></td><td>"+Heads[i].delayv6+"</td><td>"+Heads[i].delayv4+"</td>" +
						"<td>"+Heads[i].jitterv6+"</td><td>"+Heads[i].jitterv4+"</td><td>"+Heads[i].lost_ratev6+"</td><td>"+Heads[i].lost_ratev4+"</td>" +
						"<td>"+Heads[i].host_ipv6+"</td><td>"+Heads[i].host_ipv4+"</td>" +
						"<td>"+Heads[i].ipv6+"</td><td>"+Heads[i].ipv4+"</td></tr>";
				}

			}
			if(Tails!=null){
				for(var i=0;i<row;i++){
					html+="<tr>";
					if(i==0){
						html+="<td rowspan='"+row+"' class='name-bg'>"+provinceList[d]+"-"+provinceList[s]+" <font color='#1f76bb'>(反)</font></td>";
					}
					html+="<td><span class='ipv-num'>"+(i+1)+"</span></td><td>"+Tails[i].delayv6+"</td><td>"+Tails[i].delayv4+"</td>" +
						"<td>"+Tails[i].jitterv6+"</td><td>"+Tails[i].jitterv4+"</td><td>"+Tails[i].lost_ratev6+"</td><td>"+Tails[i].lost_ratev4+"</td>" +
						"<td>"+Tails[i].host_ipv6+"</td><td>"+Tails[i].host_ipv4+"</td>" +
						"<td>"+Tails[i].ipv6+"</td><td>"+Tails[i].ipv4+"</td></tr>";
				}

			}
			setEchart(s,d,row,Heads,Tails);
			$("#tratab").append(html);
		}
	});


}
/**
 * echart图形 ------对比条形图
 * */
function setEchart(s,d,row,Heads,Tails){
	
	$("#Htrace").html("<h5 class='city-name'>"+provinceList[s]+"-"+provinceList[d]+"<font color='#1f76bb'>(正向trace)</font></h5> " +
			"<span class='chart-leg'></span>");
	$("#Ttrace").html("<h5 class='city-name'>"+provinceList[d]+"-"+provinceList[s]+"<font color='#1f76bb'>(反向trace)</font></h5> " +
			"<span class='chart-leg'></span>");
	var mainId="curve1";
	var mainId2="curve2";
	var xData=[];
	var dataHeads={};
	var dataTails={};
	var Heads1=[];
	var Heads2=[];
	var Tails1=[];
	var Tails2=[];
	for(var i=0;i<row;i++){
		xData[i]=i+1;
		Heads1[i]=Heads[i].delayv6;
		Heads2[i]=Heads[i].delayv4;	
		Tails1[i]=Tails[i].delayv6;
		Tails2[i]=Tails[i].delayv4;
	}
	dataHeads[0]=Heads1;
	dataHeads[1]=Heads2;
	dataTails[0]=Tails1;
	dataTails[1]=Tails2;
	curveAction(mainId,xData, dataHeads);
	curveAction(mainId2,xData, dataTails);
}	
/**
 * 构造Echarts图形生成参数
 * */
function curveAction(mainId,xData, data){
	require([
        'echarts',
        'echarts/chart/line'
   ],
   function(ec){
		var myChart = ec.init(document.getElementById(mainId));
		//图表选项，包含图表实例任何可配置选项： 公共选项 ， 组件选项 ， 数据选项
		option = {
				  tooltip : {
				        trigger: 'axis'//鼠标提示格式对比型
				    },
				    legend: {
				        data:['v6','v4']
				    },
				    xAxis : [
				        {
				            name: '跳数',
				            type : 'category',
				            boundaryGap : false,//两端空白
				            data : xData
				        }
				    ],
				    yAxis : [
				        {
				        	name: '时延',
				            type : 'value',
				        }
				    ],
				    grid: {x:50,y:20, y2:25, x2:'6%',backgroundColor:'rgba(255,255,255,0)'},//曲线轴现在上下间隔宽度
				    series : [
				        {
				            name:'v6',
				            type:'line',
				            smooth: true,
				            symbolSize: 1,
				            symbolRotate: -5,
				            data:data[0]
				        },
				        {
				            name:'v4',
				            type:'line',
				            smooth: true,
				            symbolSize: 1,
				            symbolRotate: -5,
				            areaStyle: {},
				            data:data[1]
				        }
				    ]
				};
		//配置图表实例任何可配置选项
		myChart.setOption(option);
		}
	);
}
