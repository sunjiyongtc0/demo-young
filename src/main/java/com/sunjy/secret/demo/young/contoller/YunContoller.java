package com.sunjy.secret.demo.young.contoller;

import com.sunjy.secret.demo.young.service.yunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class YunContoller {
    private static final String index="Yun_Map";
    @Autowired
    private yunService yun;

    @RequestMapping("/Yun_Map")
    public String index(){
         return index;
    }
    @ResponseBody
    @RequestMapping("/Yun_Map/maindata")
    public String mainData(HttpServletRequest request ){
        int src=Integer.valueOf(request.getParameter("src"));
        String q=yun.mainData(src);
        return q;
    }
    @ResponseBody
    @RequestMapping("/Yun_Map/quotas")
    public String quotas(){
        String q=yun.quotasScene();
        return q;
    }
    @ResponseBody
    @RequestMapping("/Yun_Map/lineData")
    public String lineData(int d){
        String q=yun.lineData(d);
        return q;
    }
}
