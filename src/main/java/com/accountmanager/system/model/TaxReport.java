package com.accountmanager.system.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "tax_report")
@NamedQuery(name = "TaxReport.findAll", query = "SELECT t FROM TaxReport t")
public class TaxReport implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	private Timestamp date;

	@Column(name = "department_id")
	private String departmentId;

	private float price;

	@Column(name = "price_vat")
	private float priceVat;

	@Column(name = "product_price_all")
	private float productPriceAll;

	@Column(name = "reference_document")
	private String referenceDocument;

	private String type;

	@CreatedBy
	@Column(name = "create_by")
	private String createBy;

	@CreatedDate
	@Column(name = "create_date")
	private Timestamp createDate;

	@LastModifiedDate
	@Column(name = "update_by")
	private String updateBy;

	@UpdateTimestamp
	@Column(name = "update_date")
	private Timestamp updateDate;

	// bi-directional one-to-one association to CustomersList
	@OneToOne(mappedBy = "taxReport")
	private CustomersList customersList;

	private String company;

	@Column(name = "f2_id")
	private String f2Id;

	public TaxReport() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCreateBy() {
		return this.createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Timestamp getDate() {
		return this.date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getDepartmentId() {
		return this.departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public float getPrice() {
		return this.price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getPriceVat() {
		return this.priceVat;
	}

	public void setPriceVat(float priceVat) {
		this.priceVat = priceVat;
	}

	public float getProductPriceAll() {
		return this.productPriceAll;
	}

	public void setProductPriceAll(float productPriceAll) {
		this.productPriceAll = productPriceAll;
	}

	public String getReferenceDocument() {
		return this.referenceDocument;
	}

	public void setReferenceDocument(String referenceDocument) {
		this.referenceDocument = referenceDocument;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUpdateBy() {
		return this.updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Timestamp getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public Timestamp getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public CustomersList getCustomersList() {
		return this.customersList;
	}

	public void setCustomersList(CustomersList customersList) {
		this.customersList = customersList;
	}

	public String getF2Id() {
		return f2Id;
	}

	public void setF2Id(String f2Id) {
		this.f2Id = f2Id;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

}