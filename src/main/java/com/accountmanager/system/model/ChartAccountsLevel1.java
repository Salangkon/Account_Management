package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the chart_accounts_level1 database table.
 * 
 */
@Entity
@Table(name="chart_accounts_level1")
@NamedQuery(name="ChartAccountsLevel1.findAll", query="SELECT c FROM ChartAccountsLevel1 c")
public class ChartAccountsLevel1 implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

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

	//bi-directional many-to-one association to ChartAccountsLevel2
	@OneToMany(mappedBy="chartAccountsLevel1")
	private List<ChartAccountsLevel2> chartAccountsLevel2s;

	public ChartAccountsLevel1() {
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

	public List<ChartAccountsLevel2> getChartAccountsLevel2s() {
		return this.chartAccountsLevel2s;
	}

	public void setChartAccountsLevel2s(List<ChartAccountsLevel2> chartAccountsLevel2s) {
		this.chartAccountsLevel2s = chartAccountsLevel2s;
	}

	public ChartAccountsLevel2 addChartAccountsLevel2(ChartAccountsLevel2 chartAccountsLevel2) {
		getChartAccountsLevel2s().add(chartAccountsLevel2);
		chartAccountsLevel2.setChartAccountsLevel1(this);

		return chartAccountsLevel2;
	}

	public ChartAccountsLevel2 removeChartAccountsLevel2(ChartAccountsLevel2 chartAccountsLevel2) {
		getChartAccountsLevel2s().remove(chartAccountsLevel2);
		chartAccountsLevel2.setChartAccountsLevel1(null);

		return chartAccountsLevel2;
	}

}