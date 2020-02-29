package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the chart_accounts_level4 database table.
 * 
 */
@Entity
@Table(name="chart_accounts_level4")
@NamedQuery(name="ChartAccountsLevel4.findAll", query="SELECT c FROM ChartAccountsLevel4 c")
public class ChartAccountsLevel4 implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	
	@Column(name = "id_lv")
	private String idlv;

	@Column(name="create_by")
	private String createBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	private String icon;

	@Column(name="pass_code")
	private String passCode;

	private String text;

	@Column(name="update_by")
	private String updateBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_date")
	private Date updateDate;

	//bi-directional many-to-one association to ChartAccountsLevel3
	@ManyToOne
	@JoinColumn(name = "id_lv", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonBackReference
	private ChartAccountsLevel3 chartAccountsLevel3;

	//bi-directional many-to-one association to ChartAccountsLevel5
	@OneToMany(mappedBy="chartAccountsLevel4")
	private List<ChartAccountsLevel5> chartAccountsLevel5s;

	public ChartAccountsLevel4() {
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

	public ChartAccountsLevel3 getChartAccountsLevel3() {
		return this.chartAccountsLevel3;
	}

	public void setChartAccountsLevel3(ChartAccountsLevel3 chartAccountsLevel3) {
		this.chartAccountsLevel3 = chartAccountsLevel3;
	}

	public List<ChartAccountsLevel5> getChartAccountsLevel5s() {
		return this.chartAccountsLevel5s;
	}

	public void setChartAccountsLevel5s(List<ChartAccountsLevel5> chartAccountsLevel5s) {
		this.chartAccountsLevel5s = chartAccountsLevel5s;
	}

	public ChartAccountsLevel5 addChartAccountsLevel5(ChartAccountsLevel5 chartAccountsLevel5) {
		getChartAccountsLevel5s().add(chartAccountsLevel5);
		chartAccountsLevel5.setChartAccountsLevel4(this);

		return chartAccountsLevel5;
	}

	public ChartAccountsLevel5 removeChartAccountsLevel5(ChartAccountsLevel5 chartAccountsLevel5) {
		getChartAccountsLevel5s().remove(chartAccountsLevel5);
		chartAccountsLevel5.setChartAccountsLevel4(null);

		return chartAccountsLevel5;
	}

	public String getIdlv() {
		return idlv;
	}

	public void setIdlv(String idlv) {
		this.idlv = idlv;
	}

}