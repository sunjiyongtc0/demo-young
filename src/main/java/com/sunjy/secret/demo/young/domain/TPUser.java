package com.sunjy.secret.demo.young.domain;

import java.util.Date;
import javax.persistence.*;

@Table(name = "Surprised..t_p_user")
public class TPUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_pass")
    private String userPass;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "is_del")
    private String isDel;

    @Column(name = "clo_1")
    private String clo1;

    @Column(name = "clo_2")
    private String clo2;

    @Column(name = "clo_3")
    private String clo3;

    @Column(name = "clo_4")
    private String clo4;

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return user_name
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return user_pass
     */
    public String getUserPass() {
        return userPass;
    }

    /**
     * @param userPass
     */
    public void setUserPass(String userPass) {
        this.userPass = userPass;
    }

    /**
     * @return create_time
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return update_time
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * @param updateTime
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * @return is_del
     */
    public String getIsDel() {
        return isDel;
    }

    /**
     * @param isDel
     */
    public void setIsDel(String isDel) {
        this.isDel = isDel;
    }

    /**
     * @return clo_1
     */
    public String getClo1() {
        return clo1;
    }

    /**
     * @param clo1
     */
    public void setClo1(String clo1) {
        this.clo1 = clo1;
    }

    /**
     * @return clo_2
     */
    public String getClo2() {
        return clo2;
    }

    /**
     * @param clo2
     */
    public void setClo2(String clo2) {
        this.clo2 = clo2;
    }

    /**
     * @return clo_3
     */
    public String getClo3() {
        return clo3;
    }

    /**
     * @param clo3
     */
    public void setClo3(String clo3) {
        this.clo3 = clo3;
    }

    /**
     * @return clo_4
     */
    public String getClo4() {
        return clo4;
    }

    /**
     * @param clo4
     */
    public void setClo4(String clo4) {
        this.clo4 = clo4;
    }
}