var src=0;
var code=["哈尔滨","呼和浩特","石家庄","贵阳"]
var tableData;
var geoCoordData = {
    '北京': [116.4551,40.2539],//北京
    '上海': [121.4648,31.2891],//上海
    '天津': [117.4219,39.4189],//天津
    '重庆': [107.7539,30.1904],//重庆
    '哈尔滨': [127.9688,47.368],  //哈尔滨
    '吉林': [126.8154,43.2584],//长春
    '辽宁': [123.1238,41.1216],//沈阳
    '呼和浩特': [111.4124,41.4901],//呼和浩特
    '石家庄': [115.4995,38.1006],//石家庄
    '新疆': [86.9236,40.5883],//乌鲁木齐
    '甘肃': [103.5901,36.3043],//兰州
    '青海': [97.4038,35.8207],//西宁
    '陕西': [109.1162,34.2004],//西安
    '宁夏': [106.3586,37.5775],//银川
    '河南': [113.4668,33.6234],//郑州
    '山东': [118.1582,36.3701],//济南
    '山西': [112.3352,37.9413],//太原
    '安徽': [117.29,32.0581],//合肥
    '湖北': [112.3896,31.3628],//武汉
    '湖南': [111.5823,27.5568],//长沙
    '江苏': [119.8062,32.9208],//南京
    '四川': [103.9526,30.7617],//成都
    '贵阳': [106.6992,26.7682],//贵阳
    '云南': [101.6199,23.9663],//昆明
    '广西': [108.479,23.6152],//南宁
    '西藏': [89.1865,30.9465],//拉萨
    '浙江': [120.5313,29.3773],//杭州
    '江西': [116.0046,28.3633],//南昌
    '广东': [113.5107,23.5196],//广州
    '福建': [118.3543,25.9222],//福州
    '台湾':[ 121.1173,23.9638],//台湾省 台 台北
    '海南': [110.0893,19.3516],//海口
    '香港': [115.1373,21.3338],//香港
    '澳门': [115.5873,22.1538]//澳门
};
$(window).resize(function() {
    window.location.reload();
});
$(document).ready(function (){
    f();
    TableFirst();
    setInterval(f,10000);
});
function f() {
    if(src==3){
        src=0;
    }else{src=src+1}
    MapShow(src);
    tableData=$.getJSONData("/Yun_Map/quotas");
    TableCountShow(src);
    TableLine(src)
    TableColumn(src)
}

//中间地图线图
function MapShow(d) {
    var postdata=$.getJSONData("/Yun_Map/maindata?src="+d);
    var data0=postdata.drop;
    var data1=postdata.line;
    var mapChart = echarts.init(document.getElementById('mapChina'));// 初始化echarts地图
    // 绘制图表
// var data0=[{name:"哈尔滨",value:"100"},{name:"呼和浩特",value:"100"},{name:"石家庄",value:"100"},{name:"贵阳",value:"100"}];
//var data1=[[{name:"呼和浩特"},{name:"哈尔滨"}],[{name:"呼和浩特"},{name:"哈尔滨",value:"100"}],[{name:"石家庄"},{name:"哈尔滨"}],[{name:"石家庄"},{name:"哈尔滨",value:"100"}],[{name:"贵阳"},{name:"哈尔滨"}],[{name:"贵阳"},{name:"哈尔滨",value:"100"}]];
    var option = {
        series : [{
            name: 'china',
            type: 'map',
            mapType: 'china',
            scaleSize: 2,
            hoverable: false,
            roam: false,// 是否开启滚轮缩放和拖拽漫游，默认为false（关闭）'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
            selectedMode: false,// 选中模式，默认关闭，可选single，multiple
            // itemStyle begin
            itemStyle: {
                normal: {
                    borderColor: '#607aff',
                    color: '#182dc6',
                    label: {show: true, textStyle: {color: 'rgb(255,255,255)'}},// 省名称显示在地图上
                },
                emphasis: {
                    label: {show: true}// 高亮显示的时候省名称显示在地图上
                }
            },
            data:data0,
            // data: config.data_1,
            //连接线配置begin
            markLine: {//连接线
                smooth: true,//平滑为true 设置成false会变成一条直线
                symbol: ['circle', 'arrow'],//符号象征,记号 连接线的两端符合，启为空，终为原点 //arrow 箭头 circle实心圆  emptyCircle 空心圆
                //symbolSize:5,//记号的大小
                effect: {
                    show: true,
                    scaleSize: 1,//刻度大小
                    period: 30,//周期，时期
                    color: '#fff',//颜色(填充的颜色)
                    shadowBlur: 10//影子模糊度
                },//折现的动态样式
                itemStyle: {
                    normal: {
                        label: {show: false},
                        borderWidth: 1,//连接线的宽度
                        // borderColor:'#b71e30'//线的颜色
                        //borderColor:'red'//线的颜色
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                },
                data:data1,
                // data: config.data_2,
            },//标记
            markPoint: {
                symbol: 'emptyCircle',
                symbolSize: function (value) {
                    return 13;
                },
                effect: {
                    show: true,
                    shadowBlur: 2
                },
                itemStyle: {
                    normal: {
                        label: {show: true}
                    }
                },
                data:data0,
            },
            geoCoord:geoCoordData
        }]

    };
    mapChart.setOption(option);
    mapChart.on(echarts.config.EVENT.CLICK, function(param) {
        for(var i=0;i<code.length;i++){
            if(param.name==code[i]){
                src=i;
                f();
            }
        }
        // config.click({
        //     myChart : mapChart,
        //     target : dom_1,
        //     param : param
        // });
    });
}
//左上数据统计汇总
function TableCountShow(d) {
    var rttrata=tableData.dataList;
    var avgrata=0;
    var avgrtt=0;
    var cityrata=0;
    var cityrtt=0;
    for(var i=0;i<rttrata.length;i++){
        avgrata+=rttrata[i].rata;
        avgrtt+=rttrata[i].rtt;
        if(rttrata[i].src==code[d]){
            cityrata+=rttrata[i].rata;
            cityrtt+=rttrata[i].rtt;
        }
    }
    avgrata=avgrata/rttrata.length;avgrtt=avgrtt/rttrata.length;
    cityrata=cityrata/code.length-1;cityrtt=cityrtt/code.length-1;
    console.log("TableShow"+d)
    $("#count").html("联通全国平均时延/丢包率：<span class=\"cld-org\">"+avgrtt.toFixed(2)+"ms / "+avgrata.toFixed(2)+"%</span>")
    $("#city").html("    <h5 class=\"city-name\">"+code[d]+"</h5>\n" +
        "    <div class=\"city-dey dey-click\">\n" +
        "      <p class=\"cld-fon24\">"+cityrtt.toFixed(2)+"</p>\n" +
        "      <p>时延(ms)</p>\n" +
        "    </div>\n" +
        "    <div class=\"city-dey\">\n" +
        "      <p class=\"cld-fon24\">"+cityrata.toFixed(2)+"</p>\n" +
        "      <p>丢包(%)</p>\n" +
        "    </div>")
}
//右上矩阵表格
function TableFirst() {
    var matrix=tableData.matrix;
    var s="";
    s+="<tr><td width=\"20%\">&nbsp;</td><td width=\"20%\">"+code[0]+"</td><td width=\"20%\">"+code[1]+"</td>" +
    "<td width=\"20%\">"+code[2]+"</td><td>"+code[3]+"</td></tr>";
for(var i=0;i<code.length;i++){
    s+="<tr><td>"+code[i]+"</td>";
    for(var j=0;j<code.length;j++){
        if(code[i]==code[j]){
            s+="<td width=\"17%\"><span class=\"block-cor\"></span></td>";
        }else {
            var val=matrix[code[i]+"-"+code[j]];
            if(val>80){
              s+="<td width=\"17%\"><span class=\"block-cor bg-ye\"></span></td>";
            }else if(val<30){
               s+="<td width=\"17%\"><span class=\"block-cor bg-green\"></span></td>";
            }else{
                s+="<td width=\"17%\"><span class=\"block-cor bg-ye\"></span></td>";
            }
        }
    }
}
    $("#table1").html(s);

}
//右中条形图
function TableLine(d) {
    var s="";
    s+="<div class=\"fam-title floleft\">"+code[d]+"网间质量趋势图</div>" +
        "<div class=\"cla-time floright\">按时间：<span class=\"time-slot slo-click\">年</span><span class=\"time-slot\">月</span><span class=\"time-slot\">日</span></div>";
    $("#table2").html(s);
    var lineData=$.getJSONData("/Yun_Map/lineData?d="+d);
    var mapChart = echarts.init(document.getElementById('mapline'));// 初始化echarts线图
    var option = {
        grid: {x:20,y:20, y2:25, x2:'3%',backgroundColor:'rgba(58,76,109,0.5)'},//曲线轴现在上下间隔宽度
        legend: {
            data:['时延','丢包率'],
            x: 'left'
        },
        xAxis : [
            {
                name: '时间',
                type : 'category',
                boundaryGap : false,//两端空白
                data : lineData.row
            }
        ],
        yAxis: [
            {
                name: '时延(m/s)',
                type: 'value'
            },
            {
                name: '丢包率(%)',
                max: 100,
                type: 'value'
            }
        ],
        series : [
            {
                name:'时延',
                type:'line',
                smooth: true,
                symbolSize: 1,
                symbolRotate: -5,
                areaStyle: {
                    color:"blue"
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //     offset: 0,
                    //     color: 'rgb(255, 158, 68)'
                    // }, {
                    //     offset: 1,
                    //     color: 'rgb(255, 70, 131)'
                    // }])
                },
                data:lineData.rtt
            },
            {
                name:'丢包率',
                type:'line',
                smooth: true,
                symbolSize: 1,
                symbolRotate: -5,
                areaStyle: {},
                data:lineData.rata
            }
        ]
    };
    mapChart.setOption(option);
}

function TableColumn(d) {
    var s="";
    s+=code[d]+"云基地重点网站监测-TOP10";
    $("#table3").html(s);
    var ColumnData=$.getJSONData("/Yun_Map/ColumnData?d="+d);
    var mapChart = echarts.init(document.getElementById('mapColumn'));// 初始化echart柱图
    // var option = {}

    mapChart.setOption(option);
}