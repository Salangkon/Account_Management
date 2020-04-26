package com.accountmanager.system.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

/**
 * The persistent class for the customers_list database table.
 * 
 */
@Entity
@Table(name = "customers_list")
@NamedQuery(name = "CustomersList.findAll", query = "SELECT c FROM CustomersList c")
public class CustomersList implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "company_id")
	private String companyId;

	@Lob
	private String address;

	@Column(name = "company_name")
	private String companyName;

	@Column(name = "company_type")
	private String companyType;

	@Column(name = "customer_name")
	private String customerName;

	private String department;

	private String email;

	@Column(name = "office_type")
	private int officeType;

	@Column(name = "tax_id")
	private String taxId;

	private String tel;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date created_date = new Date();

	@Column(name = "create_by")
	private String createBy;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updated_date = new Date();

	@Column(name = "update_by")
	private Date updateBy;

	@OneToOne
	@JoinColumn(name = "company_id", referencedColumnName = "company")
	private TaxReport taxReport;

	public CustomersList() {
	}

	public String getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCompanyName() {
		return this.companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyType() {
		return this.companyType;
	}

	public void setCompanyType(String companyType) {
		this.companyType = companyType;
	}

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getDepartment() {
		return this.department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getOfficeType() {
		return this.officeType;
	}

	public void setOfficeType(int officeType) {
		this.officeType = officeType;
	}

	public String getTaxId() {
		return taxId;
	}

	public void setTaxId(String taxId) {
		this.taxId = taxId;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Date getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(Date updateBy) {
		this.updateBy = updateBy;
	}

	public Date getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}

	public Date getUpdated_date() {
		return updated_date;
	}

	public void setUpdated_date(Date updated_date) {
		this.updated_date = updated_date;
	}

	public TaxReport getTaxReport() {
		return taxReport;
	}

	public void setTaxReport(TaxReport taxReport) {
		this.taxReport = taxReport;
	}

}