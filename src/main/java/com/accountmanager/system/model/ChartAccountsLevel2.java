package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;
import java.util.List;

/**
 * The persistent class for the chart_accounts_level2 database table.
 * 
 */
@Entity
@Table(name = "chart_accounts_level2")
@NamedQuery(name = "ChartAccountsLevel2.findAll", query = "SELECT c FROM ChartAccountsLevel2 c")
public class ChartAccountsLevel2 implements Serializable {
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

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date")
	private Date updateDate;

	// bi-directional many-to-one association to ChartAccountsLevel1
	@ManyToOne
	@JoinColumn(name = "id_lv", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonBackReference
	private ChartAccountsLevel1 chartAccountsLevel1;

	// bi-directional many-to-one association to ChartAccountsLevel3
	@OneToMany(mappedBy = "chartAccountsLevel2")
	private List<ChartAccountsLevel3> chartAccountsLevel3s;

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public ChartAccountsLevel2() {
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

	public ChartAccountsLevel1 getChartAccountsLevel1() {
		return this.chartAccountsLevel1;
	}

	public void setChartAccountsLevel1(ChartAccountsLevel1 chartAccountsLevel1) {
		this.chartAccountsLevel1 = chartAccountsLevel1;
	}

	public List<ChartAccountsLevel3> getChartAccountsLevel3s() {
		return this.chartAccountsLevel3s;
	}

	public void setChartAccountsLevel3s(List<ChartAccountsLevel3> chartAccountsLevel3s) {
		this.chartAccountsLevel3s = chartAccountsLevel3s;
	}

	public ChartAccountsLevel3 addChartAccountsLevel3(ChartAccountsLevel3 chartAccountsLevel3) {
		getChartAccountsLevel3s().add(chartAccountsLevel3);
		chartAccountsLevel3.setChartAccountsLevel2(this);

		return chartAccountsLevel3;
	}

	public ChartAccountsLevel3 removeChartAccountsLevel3(ChartAccountsLevel3 chartAccountsLevel3) {
		getChartAccountsLevel3s().remove(chartAccountsLevel3);
		chartAccountsLevel3.setChartAccountsLevel2(null);

		return chartAccountsLevel3;
	}

	public String getIdlv() {
		return idlv;
	}

	public void setIdlv(String idlv) {
		this.idlv = idlv;
	}

}