package com.accountmanager.system.pojo;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.util.Date;

public class TaxReportDTO {
    private String id;
    private Date date;
    private String dateStr;
    private String departmentId;
    private float price;
    private float priceVat;
    private float productPriceAll;
    private String referenceDocument;
    private String type;
    private String createBy;
    private Timestamp createDate;
    private String updateBy;
    private Timestamp updateDate;
    private String company;
    private String f2Id;

    private String no;
    private String countNo;
    private String sumPrice;
    private String sumPriceVat;
    private String sumProductPriceAll ;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDateStr() {
        return dateStr;
    }

    public void setDateStr(String dateStr) {
        this.dateStr = dateStr;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getPriceVat() {
        return priceVat;
    }

    public void setPriceVat(float priceVat) {
        this.priceVat = priceVat;
    }

    public float getProductPriceAll() {
        return productPriceAll;
    }

    public void setProductPriceAll(float productPriceAll) {
        this.productPriceAll = productPriceAll;
    }

    public String getReferenceDocument() {
        return referenceDocument;
    }

    public void setReferenceDocument(String referenceDocument) {
        this.referenceDocument = referenceDocument;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public Timestamp getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Timestamp updateDate) {
        this.updateDate = updateDate;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getF2Id() {
        return f2Id;
    }

    public void setF2Id(String f2Id) {
        this.f2Id = f2Id;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getCountNo() {
        return countNo;
    }

    public void setCountNo(String countNo) {
        this.countNo = countNo;
    }

    public String getSumPrice() {
        return sumPrice;
    }

    public void setSumPrice(String sumPrice) {
        this.sumPrice = sumPrice;
    }

    public String getSumPriceVat() {
        return sumPriceVat;
    }

    public void setSumPriceVat(String sumPriceVat) {
        this.sumPriceVat = sumPriceVat;
    }

    public String getSumProductPriceAll() {
        return sumProductPriceAll;
    }

    public void setSumProductPriceAll(String sumProductPriceAll) {
        this.sumProductPriceAll = sumProductPriceAll;
    }
}
