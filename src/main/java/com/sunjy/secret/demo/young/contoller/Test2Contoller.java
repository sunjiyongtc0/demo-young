package com.sunjy.secret.demo.young.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class Test2Contoller {
    @RequestMapping("/test")
    public String index(){
        return "test";
    }
}
