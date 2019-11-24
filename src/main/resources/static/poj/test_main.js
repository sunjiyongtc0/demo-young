var src=0;
var code=["哈尔滨","呼和浩特","石家庄","贵阳"];
var procode=["黑龙江","内蒙古","河北","贵州"];
var tableData;
var chinaGeoCoordMap = {
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
    TableStrip();
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
    var chinaDatas =postdata.new;
    var mapChart = echarts.init(document.getElementById('mapChina'));// 初始化echarts地图
    var convertData = function(data) {
        var res = [];
        for(var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            // var toCoord = [116.4551,40.2539];
            var toCoord = chinaGeoCoordMap[code[d]];
            if(fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord,
                    value: dataItem[0].value
                }, {
                    coord: toCoord,
                }]);
            }
        }
        return res;
    };
    var series = [];
    [[code[d], chinaDatas]].forEach(function(item, i) {
        series.push({
                type: 'lines',
                // zlevel: 2,
                effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 5, //图标大小
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: .3 //尾迹线条曲直度
                    }
                },
                data: convertData(item[1])
            }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                // zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: 'stroke', //波纹绘制方式 stroke, fill
                    scale: 4 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right', //显示位置
                        offset: [5, 0], //偏移设置
                        formatter: function(params){//圆环显示文字
                            return params.data.name;
                        },
                        fontSize: 13
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: 'circle',
                symbolSize: function(val) {
                    // return 5+ val[2] * 5; //圆环大小
                    return  4;
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: '#f00'
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                }),
            }

        );
    });

    var option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(185, 255, 246, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var value=params.data.value;
                res = "数据：" + value;
                return res;
            }
        },
        geo: {
            map: 'china',
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(51, 69, 89, .5)', //地图背景色
                    borderColor: '#516a89', //省市边界线00fcff 516a89
                    borderWidth: 1
                },
                emphasis: {
                    color: 'rgba(37, 43, 61, .5)' //悬浮背景
                }
            }
        },
        series: series
    };
    mapChart.setOption(option);

    mapChart.on('click', function(params){
        console.log(params)
        for(var i=0;i<code.length;i++){
            if(params.name==procode[i]){
                src=i-1;
                if(src==-1){src=3}
                f();
            }
        }
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
                // areaStyle: {
                //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //         offset: 0,
                //         color: 'rgb(255, 158, 68)'
                //     }, {
                //         offset: 1,
                //         color: 'rgba(255, 255, 255,1)'
                //     }])
                // },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8ec6ad'
                        }, {
                            offset: 1,
                            color: '#ffe'
                        }])
                    }
                },
                data:lineData.rtt
            },
            {
                name:'丢包率',
                type:'line',
                smooth: true,
                symbolSize: 1,
                symbolRotate: -5,
                // areaStyle: {
                //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //         offset: 0,
                //         color: 'rgb(23, 154, 168)'
                //     }, {
                //         offset: 1,
                //         color: 'rgba(255, 255, 255,1)'
                //     }])
                // },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#d68262'
                        }, {
                            offset: 1,
                            color: '#ffe'
                        }])
                    }
                },
                data:lineData.rata
            }
        ]
    };
    mapChart.setOption(option);
}
//右下柱图
function TableColumn(d) {
    var s="";
    s+=code[d]+"云基地重点网站监测-TOP10";
    $("#table3").html(s);
    var ColumnData=$.getJSONData("/Yun_Map/ColumnData?d="+d);
    var mapChart = echarts.init(document.getElementById('mapColumn'));// 初始化echart柱图
    //----------------------------------------------------------------------------------------------------
    //图表X轴数据
    var Xdata = ColumnData.type;
    //图表项目
    var fp_bar_postion = ["left","left","left","left","right","right","right","right"];
    var fp_coler=['#258df6','#6fce7d','#fbc807','#f5814b'];
    //图表项目数据
    var rtt = ColumnData.rtt;
    var rata=ColumnData.rata;

    var option = {



        grid: [{
            show: false,
            left: "3%",
            top: 60,
            bottom: 60,
            containLabel: true,
            width:  '40%' ,
        }, {
            show: false,
            left: '50.5%',
            top: 80,
            bottom: 60,
            width:  '20%' ,
        }, {
            show: false,
            right: "3%",
            top: 60,
            bottom: 60,
            containLabel: true,
            width:  '40%' ,
        }, ],

        xAxis: [
            {
                max: function(value) {
                    return value.max+50;
                },
                type: 'value',
                triggerEvent: true,
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                position: 'top',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#B2B2B2',
                        fontSize: 12,
                    },
                },
                splitLine: {
                    show: false,
                },
            },
            {
                gridIndex: 1,
                show: false,
            },
            {
                max: 100,
                gridIndex: 2,
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                position: 'top',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#B2B2B2',
                        fontSize: 12,
                    },
                },
                splitLine: {
                    show: false,
                },
            }
        ],
        yAxis: [{
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                margin: 8,
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },

            },
            data: Xdata,
        }, {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#9D9EA0',
                    fontSize: 12,
                },

            },
            data: Xdata.map(function(value) {
                return {
                    value: value,
                    textStyle: {
                        align: 'center',
                    }
                }
            }),
        }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#9D9EA0',
                    fontSize: 12,
                },

            },
            data: Xdata,
        }, ],
        series: [{
            name: '时延',
            type: 'bar',
            stack: 'one',
            barGap: 15,
            barWidth: 10,
            label: {
                normal: {
                    show: true,
                    position:'inside',
                    textStyle: {
                        color: '#fff',

                        fontSize: 12,
                    },
                },
                emphasis: {
                    show: true,
                    position: 'inside',
                    offset: [0, 0],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#258df6'
                    }, {
                        offset: 1,
                        color: '#ffe'
                    }]),
                    barBorderRadius: 10,
                },
                opacity: 1,

            },
            emphasis: {
                opacity: 1,
            },
            data: rtt,
        },
            {
                name: '丢包',
                stack: 'right',
                type: 'bar',
                barGap: 15,
                barWidth: 10,
                xAxisIndex: 2,
                yAxisIndex: 2,
                label: {
                    normal: {
                        show: true,
                        position:'inside',
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                        },
                    },
                    emphasis: {
                        show: true,
                        position: 'inside',
                        offset: [0, 0],
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: '#fbc807'
                        }, {
                            offset: 1,
                            color: '#ffe'
                        }]),
                        barBorderRadius: 10,
                    },
                    opacity: 1,

                },
                emphasis: {
                    opacity: 1,
                },
                data: rata,
            },
        ]

    };

    //----------------------------------------------------------------------------------------------------
    mapChart.setOption(option);
}
//左下条形图
function TableStrip(){
    //创建条形图模型-------------------------
    var dao="<td width=\"37%\">";
    for(var i=0;i<20;i++){
        if(i<14){
            dao+="<span class=\"fam-light\"></span>";
        }else{
            dao+="<span class=\"fam-gray\"></span>";
        }
    }
    dao+="</td>";
    //创建条形图模型-------------------------end
    //创建左侧表格---------------------------------
    var strip=$.getJSONData("/Yun_Map/StripData");
    var stripdata=strip.stripdata;
    var src=strip.src;
    var s="";
    for(var i=0;i<7;i++){
        s+="<tr><td width=\"13%\" align=\"center\"><span class=\"sd-num\">"+(i+1)+"</span></td>" +
            "<td width=\"24%\">"+src[i]+"</td>";
        s+=dao;
        s+="<td class=\"b-c\">"+stripdata[src[i]]+"</td></tr>";
    }
    $("#ts1").html(s);
    //创建左侧表格---------------------------------end
    //创建右侧表格---------------------------------
    var s2="";
    for(var i=7;i<src.length;i++){
        s2+="<tr><td width=\"13%\" align=\"center\"><span class=\"sd-num\">"+(i+1)+"</span></td>" +
            "<td width=\"24%\">"+src[i]+"</td>";
        s2+=dao;
        s2+="<td class=\"b-c\">"+stripdata[src[i]]+"</td></tr>";
    }
    $("#ts2").html(s2);
}
