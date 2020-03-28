package com.accountmanager.system.pojo;

import java.util.List;

public class SeleteChartAccount {

	private String title;
	private String passCode;
	List<seleteChartAccountList> seleteChartAccountList;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPassCode() {
		return passCode;
	}

	public void setPassCode(String passCode) {
		this.passCode = passCode;
	}

	public List<seleteChartAccountList> getSeleteChartAccountList() {
		return seleteChartAccountList;
	}

	public void setSeleteChartAccountList(List<seleteChartAccountList> seleteChartAccountList) {
		this.seleteChartAccountList = seleteChartAccountList;
	}

}
