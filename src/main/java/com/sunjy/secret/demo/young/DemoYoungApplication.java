package com.sunjy.secret.demo.young;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.sunjy.secret.demo.young.mapper")
public class DemoYoungApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoYoungApplication.class, args);
    }

}
