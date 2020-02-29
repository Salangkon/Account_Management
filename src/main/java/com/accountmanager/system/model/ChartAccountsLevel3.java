package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the chart_accounts_level3 database table.
 * 
 */
@Entity
@Table(name="chart_accounts_level3")
@NamedQuery(name="ChartAccountsLevel3.findAll", query="SELECT c FROM ChartAccountsLevel3 c")
public class ChartAccountsLevel3 implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name="create_by")
	private String createBy;
	
	@Column(name = "id_lv")
	private String idlv;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	private String icon;

	@Column(name="pass_code")
	private String passCode;

	private String text;
	
	private String detail;

	@Column(name="update_by")
	private String updateBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_date")
	private Date updateDate;

	//bi-directional many-to-one association to ChartAccountsLevel2
	@ManyToOne
	@JoinColumn(name = "id_lv", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonBackReference
	private ChartAccountsLevel2 chartAccountsLevel2;

	//bi-directional many-to-one association to ChartAccountsLevel4
	@OneToMany(mappedBy="chartAccountsLevel3")
	private List<ChartAccountsLevel4> chartAccountsLevel4s;

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public ChartAccountsLevel3() {
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

	public ChartAccountsLevel2 getChartAccountsLevel2() {
		return this.chartAccountsLevel2;
	}

	public void setChartAccountsLevel2(ChartAccountsLevel2 chartAccountsLevel2) {
		this.chartAccountsLevel2 = chartAccountsLevel2;
	}

	public List<ChartAccountsLevel4> getChartAccountsLevel4s() {
		return this.chartAccountsLevel4s;
	}

	public void setChartAccountsLevel4s(List<ChartAccountsLevel4> chartAccountsLevel4s) {
		this.chartAccountsLevel4s = chartAccountsLevel4s;
	}

	public ChartAccountsLevel4 addChartAccountsLevel4(ChartAccountsLevel4 chartAccountsLevel4) {
		getChartAccountsLevel4s().add(chartAccountsLevel4);
		chartAccountsLevel4.setChartAccountsLevel3(this);

		return chartAccountsLevel4;
	}

	public ChartAccountsLevel4 removeChartAccountsLevel4(ChartAccountsLevel4 chartAccountsLevel4) {
		getChartAccountsLevel4s().remove(chartAccountsLevel4);
		chartAccountsLevel4.setChartAccountsLevel3(null);

		return chartAccountsLevel4;
	}

	public String getIdlv() {
		return idlv;
	}

	public void setIdlv(String idlv) {
		this.idlv = idlv;
	}

}