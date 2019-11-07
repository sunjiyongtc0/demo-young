package com.sunjy.secret.demo.young.contoller;

import com.sunjy.secret.demo.young.service.worldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MapContoller {
    private static final String index="world_Map";
    @Autowired
    private worldService worlds;

    @RequestMapping("/world_Map")
    public String index(){
         return index;
    }
    @ResponseBody
    @RequestMapping("/world_Map/worldMap")
    public String worldMap(){
        String q=worlds.worldMap();
        return q;
    }
    @ResponseBody
    @RequestMapping("/world_Map/quotas")
    public String quotas(){
        String q=worlds.quotasScene();
        return q;
    }

}
