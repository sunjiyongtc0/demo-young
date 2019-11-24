package com.sunjy.secret.demo.young.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

@Service
public class yunService {
    private  static final DecimalFormat df = new DecimalFormat( "0.00" );
    private  static final String[] code={"哈尔滨","呼和浩特","石家庄","贵阳"};
    public String mainData(int src){
        //被选中城市名
        String codename=code[src];
        JSONObject js=new JSONObject();
        js.put("message","操作成功");
        js.put("state",1);
        js.put("doing","地图");
        JSONArray js2=new JSONArray();
        JSONArray js3=new JSONArray();
        JSONArray js7=new JSONArray();
        for (int i=0;i<code.length;i++){
            //点
            Map d=new HashMap();
            d.put("value",Double.parseDouble(df.format(Math.random()*100)));
            d.put("name",code[i]);
            js2.add(d);
        }
        for(int j=0;j<code.length;j++){
            JSONArray js4=new JSONArray();
            JSONArray js5=new JSONArray();
            JSONArray js6=new JSONArray();
            if(src==j){
                continue;
            }
            //线
            Map d1=new HashMap();
            d1.put("name",code[j]);
            Map d2=new HashMap();
            d2.put("name",codename);
            Map d3=new HashMap();
            d3.put("name",codename);
            d3.put("value",Double.parseDouble(df.format(Math.random()*100)));
            Map d4=new HashMap();
            d4.put("name",code[j]);
            js4.add(d1);js4.add(d2);
            js5.add(d4);js5.add(d3);
            js3.add(js4);js3.add(js5);
            Map d5=new HashMap();
            d5.put("name",code[j]);
            d5.put("value",Double.parseDouble(df.format(Math.random()*100)));
            js6.add(d5);
            js7.add(js6);
        }
        js.put("drop",js2);
        js.put("line",js3);
        js.put("new",js7);
        return js.toString();
    }

    public String quotasScene(){
        JSONObject js=new JSONObject();
        js.put("message","操作成功");
        js.put("state",1);
        js.put("doing","数据展示");
        JSONArray js1=new JSONArray();
        Map matrix = new HashMap();
        for(String s0:code) {
            for(String s1:code) {
                if(s0.equals(s1)){
                    continue;
                }else{
                    Map d = new HashMap();
                    d.put("src",s0);
                    d.put("dest",s1);
                    d.put("rtt",Double.parseDouble(df.format(Math.random()*100)));
                    d.put("rata",Double.parseDouble(df.format(Math.random()*100)));
                    js1.add(d);
                    matrix.put(s0+"-"+s1,Double.parseDouble(df.format(Math.random()*100)));
                }
            }
        }
        js.put("dataList",js1);
        js.put("matrix",matrix);
        return js.toString();
    }
    public String lineData(int d){
        JSONObject js=new JSONObject();
        js.put("message","操作成功");
        js.put("state",1);
        js.put("doing","城市趋势图");
        int[] row={1,2,3,4,5,6,7};
        double[] rtt=new double[row.length];
        double[] rata=new double[row.length];
        for(int i=0;i<row.length;i++){
            rtt[i]=Double.parseDouble(df.format(Math.random()*100));
            rata[i]=Double.parseDouble(df.format(Math.random()*100));
        }
        js.put("row",row);
        js.put("rtt",rtt);
        js.put("rata",rata);
        return js.toString();
    }
public String columnData(int d){
    JSONObject js=new JSONObject();
    js.put("message","操作成功");
    js.put("state",1);
    js.put("doing","重点网站监测");
    String[] type={"新浪新闻","搜狐新闻","网易新闻","腾讯新闻","凤凰网","雅虎","环球网","人民网","环球时报","新华网"};
    double[] rtt={Double.parseDouble(df.format(Math.random()*100)),Double.parseDouble(df.format(Math.random()*100)),Double.parseDouble(df.format(Math.random()*100)),66.66,55.55,44.44,33.33,22.22,11.11,00.11};
    double[] rata={Double.parseDouble(df.format(Math.random()*100)),45,40,35,Double.parseDouble(df.format(Math.random()*100)),25,20,15,Double.parseDouble(df.format(Math.random()*100)),5};
    js.put("type",type);
    js.put("rtt",rtt);
    js.put("rata",rata);
    return js.toString();
}
public String stripData(){
    JSONObject js=new JSONObject();
    js.put("message","操作成功");
    js.put("state",1);
    js.put("doing","骨干网网间质量监测");
    String[]  src={"哈尔滨","济南","呼和浩特","陕西","河北","河南","广东","山东","上海","湖北","武汉","重庆","广东"};
    Map sr=new HashMap();
    for (int i=0;i<src.length;i++) {
        sr.put(src[i],Double.parseDouble(df.format(Math.random()*100)));
    }
    js.put("stripdata",sr);
    js.put("src",src);
    return js.toString();
}

}
