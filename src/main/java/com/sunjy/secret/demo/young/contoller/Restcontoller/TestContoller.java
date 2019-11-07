package com.sunjy.secret.demo.young.contoller.Restcontoller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestContoller {
    @RequestMapping("/hello")
    public String hello(){
        return "success";
    }
}
