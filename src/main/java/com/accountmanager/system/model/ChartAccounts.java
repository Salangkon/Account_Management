package com.accountmanager.system.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

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
	@Column(name = "step2")
	private int step2;
	@Column(name = "step3")
	private int step3;
	@Column(name = "create_by")
	private String createBy;
	@Column(name = "create_date")
	private Date createDate;

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

	public int getStep2() {
		return step2;
	}

	public void setStep2(int step2) {
		this.step2 = step2;
	}

	public int getStep3() {
		return step3;
	}

	public void setStep3(int step3) {
		this.step3 = step3;
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

}
