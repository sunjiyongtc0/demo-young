package com.sunjy.secret.demo.young.contoller;

import com.alibaba.fastjson.JSONObject;
import com.sunjy.secret.demo.young.service.traceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TraceContoller {
    private  static final String trace="trace-v64";
    @Autowired
    private traceService traceservice;

    @RequestMapping("/trace")
    public String index(){
        return trace;
    }

    @ResponseBody
    @RequestMapping("/findData")
    public String findData(){
        JSONObject result=traceservice.findData();
        return result.toJSONString();
    }

    //字典表，，获取省份名称及编号
    @ResponseBody
    @RequestMapping("/provinceList")
    public String provinceList()throws Exception{
        JSONObject result =  traceservice.provinceList();
        return result.toJSONString();

    }
    @ResponseBody
    @RequestMapping("/findTraData")
    //获取trace测试对比分析数据 String srcCode, String destCode
      public String findTraData(String src, String dest) throws Exception{
        JSONObject result =  traceservice.findtraData(src,dest);
        return result.toJSONString();
    }

}
