package com.sunjy.secret.demo.young;

import com.sunjy.secret.demo.young.domain.TCRegion;
import com.sunjy.secret.demo.young.mapper.TCRegionMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.List;
@SpringBootTest
class DemoYoungApplicationTests {

    @Autowired
    private TCRegionMapper tcRegionMapper;
    @Test
    void contextLoads() {
    }
    @Test
    public void  testselect(){
    List<TCRegion>  l=tcRegionMapper.selectAll();
        System.out.println(l.size());
}
@Test
    public void testsdata(){
    Example e = new Example(TCRegion.class);
    Example.Criteria criteria = e.createCriteria();
    criteria.andEqualTo("rLevel", Byte.valueOf(1+""));
    criteria.andEqualTo("rParentCode", 100001l);
    List<Long> ids = new ArrayList();
    ids.add(999999l);
    ids.add(820000l);
    ids.add(710000l);
//    Long code[]={999999l,820000l,710000l};
    criteria.andNotIn("rCode",ids );
//    criteria.andEqualTo("departmentId", departmentId);
    e.and(criteria);
    List<TCRegion> regioData = tcRegionMapper.selectByExample(e);
//    List<TCRegion> regioData=tcRegionMapper.selectByExample("SELECT r.r_code CODE,r.r_name NAME FROM t_c_region r WHERE  r.r_level = 1 AND r_parent_code=100001  AND r_code NOT IN (999999,820000,710000) ");
    System.out.println(regioData.size());
    }
}
