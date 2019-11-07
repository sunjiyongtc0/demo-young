
/**
 * 仪表盘
 */
function getGaugeData() {
	var jsonData = "" ;
	$.ajax({
		url : path + "/bigscreen_Bigscreen/importSiteDataShow",
		data : {"isProvince":isProvince,"regionCode":regionCode},
		async : false,
		type : "POST",
		dataType : 'json',
		success : function(result) {
		   jsonData = result;
		}
	});
	return jsonData;
}


function gauge(options) {
	var config = {
		select:'',
		color0: [[0.3, '#2bdc33'],[0.7, '#ffc600'],[1, '#fc3d3d']],
		color1: [[0.3, '#2bdc33'],[0.7, '#ffc600'],[1, '#fc3d3d']],
		center : ['50%', '50%'],    // 默认全局居中
        radius : '100%',
        axisLine_length : 17,
        axisTick_length : 0,
        splitLine_length : 0,
        title_show : true,
        name1:'',
        name2:'',
        max1:0,
        min1:0,
        data1:[0],
        max2:0,
        min2:0,
        data2:[0]
	};
	$.extend(config, options);
	var option = {
		title : {
			show:config.title_show,
			top : "auto",
			padding:'20px',
			text:"暂无数据"
		},
		tooltip : {
	        formatter: "{a} <br/>{c} {b}"
	        //formatter: "{a} <br/>{c}"
	    },
	    series : [
	        {
	            name:config.name1,
	            type:'gauge',
	            center : config.center,    // 默认全局居中
	            radius : config.radius,
	            min:parseInt(config.min1),
	            max:parseInt(config.max1),
	            startAngle:160,
	            endAngle:20,
	            splitNumber:2,
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: config.color0, 
	                    width: config.axisLine_length
	                }
	            },
	            axisTick: {            // 坐标轴小标记
	                splitNumber:5,
	                length :config.axisTick_length,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            splitLine: {           // 分隔线
	                length :config.splitLine_length,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                width:2
	            },
	            title : {
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder',
	                    fontSize: 12,
	                    fontStyle: 'italic',
	                    color:"#fff"
	                }
	            },
	            detail : {
	                show: false
	            },
	            data:config.data1
	        },
	        {
	           	name:config.name2,
	            type:'gauge',
	            center : config.center,    // 默认全局居中
	            radius : config.radius,
	           	min:parseInt(config.min2),
	            max:parseInt(config.max2),
	            startAngle:340,
	            endAngle:200,
	            splitNumber:2,
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: config.color1, 
	                    width: config.axisLine_length
	                }
	            },
	            axisTick: {            // 坐标轴小标记
	                splitNumber:5,
	                length :config.axisTick_length,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            splitLine: {           // 分隔线
	                length :config.axisTick_length,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                width:2
	            },
	            title : {
	            	offsetCenter:[0,'40%'],
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder',
	                    fontSize: 12,
	                    fontStyle: 'italic',
	                    color:"#fff"
	                }
	            },
	            detail : {
	                show: false
	            },
	            data:config.data2
	        }
	    ]
	};
	var myChart = echarts.init(config.select);
	myChart.setOption(option);
}
