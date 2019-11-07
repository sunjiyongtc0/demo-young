package com.sunjy.secret.demo.young.domain;

import javax.persistence.*;

@Table(name = "myshop.t_c_region")
public class TCRegion {
    @Column(name = "r_code")
    private Long rCode;

    @Column(name = "r_name")
    private String rName;

    @Column(name = "r_en_name")
    private String rEnName;

    @Column(name = "r_level")
    private Byte rLevel;

    @Column(name = "r_parent_code")
    private Long rParentCode;

    @Column(name = "r_name_relation")
    private String rNameRelation;

    @Column(name = "delete_flag")
    private Byte deleteFlag;

    /**
     * @return r_code
     */
    public Long getrCode() {
        return rCode;
    }

    /**
     * @param rCode
     */
    public void setrCode(Long rCode) {
        this.rCode = rCode;
    }

    /**
     * @return r_name
     */
    public String getrName() {
        return rName;
    }

    /**
     * @param rName
     */
    public void setrName(String rName) {
        this.rName = rName;
    }

    /**
     * @return r_en_name
     */
    public String getrEnName() {
        return rEnName;
    }

    /**
     * @param rEnName
     */
    public void setrEnName(String rEnName) {
        this.rEnName = rEnName;
    }

    /**
     * @return r_level
     */
    public Byte getrLevel() {
        return rLevel;
    }

    /**
     * @param rLevel
     */
    public void setrLevel(Byte rLevel) {
        this.rLevel = rLevel;
    }

    /**
     * @return r_parent_code
     */
    public Long getrParentCode() {
        return rParentCode;
    }

    /**
     * @param rParentCode
     */
    public void setrParentCode(Long rParentCode) {
        this.rParentCode = rParentCode;
    }

    /**
     * @return r_name_relation
     */
    public String getrNameRelation() {
        return rNameRelation;
    }

    /**
     * @param rNameRelation
     */
    public void setrNameRelation(String rNameRelation) {
        this.rNameRelation = rNameRelation;
    }

    /**
     * @return delete_flag
     */
    public Byte getDeleteFlag() {
        return deleteFlag;
    }

    /**
     * @param deleteFlag
     */
    public void setDeleteFlag(Byte deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Override
    public String toString() {
        return "TCRegion{" +
                "rCode=" + rCode +
                ", rName='" + rName + '\'' +
                ", rEnName='" + rEnName + '\'' +
                ", rLevel=" + rLevel +
                ", rParentCode=" + rParentCode +
                ", rNameRelation='" + rNameRelation + '\'' +
                ", deleteFlag=" + deleteFlag +
                '}';
    }
}