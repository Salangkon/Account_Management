package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;

/**
 * The persistent class for the chart_accounts_level5 database table.
 * 
 */
@Entity
@Table(name = "chart_accounts_level5")
@NamedQuery(name = "ChartAccountsLevel5.findAll", query = "SELECT c FROM ChartAccountsLevel5 c")
public class ChartAccountsLevel5 implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name = "id_lv")
	private String idlv;

	@Column(name = "create_by")
	private String createBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date")
	private Date createDate;

	private String icon;

	@Column(name = "pass_code")
	private String passCode;

	private String text;

	private String detail;

	@Column(name = "update_by")
	private String updateBy;

	@Column(name = "status_delete")
	private String statusDelete;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date")
	private Date updateDate;

	// bi-directional many-to-one association to ChartAccountsLevel4
	@ManyToOne
	@JoinColumn(name = "id_lv", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonBackReference
	private ChartAccountsLevel4 chartAccountsLevel4;

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public ChartAccountsLevel5() {
	}

	public String getStatusDelete() {
		return statusDelete;
	}

	public void setStatusDelete(String statusDelete) {
		this.statusDelete = statusDelete;
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

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getIcon() {
		return this.icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getPassCode() {
		return this.passCode;
	}

	public void setPassCode(String passCode) {
		this.passCode = passCode;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUpdateBy() {
		return this.updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public ChartAccountsLevel4 getChartAccountsLevel4() {
		return this.chartAccountsLevel4;
	}

	public void setChartAccountsLevel4(ChartAccountsLevel4 chartAccountsLevel4) {
		this.chartAccountsLevel4 = chartAccountsLevel4;
	}

	public String getIdlv() {
		return idlv;
	}

	public void setIdlv(String idlv) {
		this.idlv = idlv;
	}

}