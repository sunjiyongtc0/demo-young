package com.sunjy.secret.demo.young.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sunjy.secret.demo.young.domain.TCRegion;
import com.sunjy.secret.demo.young.mapper.TCRegionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class traceService {
    private  static final String trace="trace-v64";
    private  static final DecimalFormat df = new DecimalFormat( "0.00" );
    @Autowired
    private TCRegionMapper tcRegionMapper;

    public JSONObject findData() {
        JSONObject result = new JSONObject();
        JSONObject jo = new JSONObject();
        try {
            //添加矩阵参数
            JSONArray ja= new JSONArray();
            //查询region表，获取code
            Example e = new Example(TCRegion.class);
            Example.Criteria criteria = e.createCriteria();
            criteria.andEqualTo("rLevel", Byte.valueOf(1+""));
            criteria.andEqualTo("rParentCode", 100001l);
            List<Long> ids = new ArrayList();
            ids.add(999999l);ids.add(820000l);ids.add(710000l);
            criteria.andNotIn("rCode",ids );
            e.and(criteria);
            List<TCRegion> regioData = tcRegionMapper.selectByExample(e);
            for (TCRegion rData : regioData) {
                String src=rData.getrCode()+"";
                for(TCRegion rData2 : regioData) {
                    JSONObject Data= new JSONObject();
                    Data.put("srcDest",src+"-"+rData2.getrCode());
                    double v6=Double.parseDouble(df.format(Math.random()*100));
                    double v4=Double.parseDouble(df.format(Math.random()*100));
                    Data.put("v6",v6);
                    Data.put("v4",v4);
                    Data.put("rata", Double.parseDouble(df.format((v6-v4)*100/v4)));
                    ja.add(Data);
                }
            }
            jo.put("MatrixsData", ja);
            JSONArray jar= new JSONArray();
            //获取质量对比差的数据
            for(Object o:ja){
                JSONObject j= JSON.parseObject(o.toString())  ;
                if(j.getDouble("rata")>=30){
                    jar.add(j);
                }
            }
            BubbleSort(jar);
            jo.put("RankData", jar);
        } catch (Exception e) {
            throw e;
        }finally {
            result.put("state",1);
            result.put("message","");
            result.put("object",jo);
        }
        return result;
    }

    public JSONObject provinceList(){
        JSONObject result = new JSONObject();
        //添加地区字典表
        JSONObject provinceList = new JSONObject();
        try {

            //查询region表，获取code
            Example e = new Example(TCRegion.class);
            Example.Criteria criteria = e.createCriteria();
            criteria.andEqualTo("rLevel", Byte.valueOf(1+""));
            criteria.andEqualTo("rParentCode", 100001l);
            List<Long> ids = new ArrayList();
            ids.add(999999l);ids.add(820000l);ids.add(710000l);
            criteria.andNotIn("rCode",ids );
            e.and(criteria);
            List<TCRegion> regioData = tcRegionMapper.selectByExample(e);
            for (TCRegion rData : regioData) {
                provinceList.put(rData.getrCode()+"", rData.getrName());
            }
        } catch (Exception e) {
            result.put("state",0);
            result.put("message","查看失败" + e.getMessage());
            throw e;
        }finally {
            result.put("state",1);
            result.put("message","");
            result.put("object",provinceList);
           return result;
        }

    }
   public  JSONObject findtraData(String src, String dest){
       JSONObject result = new JSONObject();
       JSONObject jo = new JSONObject();
       try {
           String srcCode = src;
           String destCode = dest;
           String Heads=srcCode+"-"+destCode;
           String Tails=destCode+"-"+srcCode;
           for(int j=0;j<2;j++){
               JSONArray Data= new JSONArray();
               for(int i=0;i<10;i++){
                   JSONObject data0 = new JSONObject();
                   data0.put("delayv6",df.format(Math.random()*100));
                   data0.put("delayv4", df.format(Math.random()*100));
                   data0.put("jitterv6", df.format(Math.random()*100));
                   data0.put("jitterv4", df.format(Math.random()*100));
                   data0.put("lost_ratev6", df.format(Math.random()*100));
                   data0.put("lost_ratev4", df.format(Math.random()*100));
                   data0.put("host_ipv6", "211.7.13.121");
                   data0.put("host_ipv4", "139.226.231.105");
                   data0.put("ipv6", "中国-新疆-乌鲁木齐-联通");
                   data0.put("ipv4", "中国-上海-上海-联通");
                   Data.add(data0);
               }
               if(j==0){
                   jo.put(Heads, Data);
               }else{
                   jo.put(Tails, Data);
               }
           }
       } catch (Exception e) {
           throw e;
       }finally {
           result.put("object", jo);
           return result;
       }
   }




    /**
     * 工具方法<br>
     * JSONArray数据由大到小排序
     * */
    public static void BubbleSort(JSONArray arr){
        JSONObject temp;//临时变量
        for(int i=0; i<arr.size()-1; i++){
            for(int j=arr.size()-1; j>i; j--){
                double m=arr.getJSONObject(j).getDoubleValue("rata");
                double n=arr.getJSONObject(j-1).getDoubleValue("rata");
                if( m>n){
                    temp = arr.getJSONObject(j);
                    arr.set(j, arr.getJSONObject(j-1));
                    arr.set(j-1, temp);
                }
            }
        }
    }
}
