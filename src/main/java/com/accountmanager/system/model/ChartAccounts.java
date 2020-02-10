package com.accountmanager.system.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "chart_accounts")
@NamedQuery(name = "ChartAccounts.findAll", query = "SELECT c FROM ChartAccounts c")
public class ChartAccounts {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private String id;
	@Column(name = "text")
	private String text;
	@Column(name = "icon")
	private String icon;
	@Column(name = "step1")
	private int step1;
	@Column(name = "id_step1")
	private String idStep1;
	@Column(name = "step2")
	private int step2;
	@Column(name = "id_step2")
	private String idStep2;
	@Column(name = "step3")
	private int step3;
	@Column(name = "id_step3")
	private String idStep3;
	@Column(name = "step4")
	private int step4;
	@Column(name = "id_step4")
	private String idStep4;
	@Column(name = "create_by")
	private String createBy;
	@CreationTimestamp
	@Column(name = "create_date")
	private Date createDate;
	@Column(name = "update_by")
	private String updateBy;
	@UpdateTimestamp
	@Column(name = "update_date")
	private Date updateDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public int getStep1() {
		return step1;
	}

	public void setStep1(int step1) {
		this.step1 = step1;
	}

	public String getIdStep1() {
		return idStep1;
	}

	public void setIdStep1(String idStep1) {
		this.idStep1 = idStep1;
	}

	public int getStep2() {
		return step2;
	}

	public void setStep2(int step2) {
		this.step2 = step2;
	}

	public String getIdStep2() {
		return idStep2;
	}

	public void setIdStep2(String idStep2) {
		this.idStep2 = idStep2;
	}

	public int getStep3() {
		return step3;
	}

	public void setStep3(int step3) {
		this.step3 = step3;
	}

	public String getIdStep3() {
		return idStep3;
	}

	public void setIdStep3(String idStep3) {
		this.idStep3 = idStep3;
	}

	public int getStep4() {
		return step4;
	}

	public void setStep4(int step4) {
		this.step4 = step4;
	}

	public String getIdStep4() {
		return idStep4;
	}

	public void setIdStep4(String idStep4) {
		this.idStep4 = idStep4;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
