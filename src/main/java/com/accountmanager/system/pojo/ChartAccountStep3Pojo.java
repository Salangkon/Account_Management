package com.accountmanager.system.pojo;

import java.util.Date;
import java.util.List;

public class ChartAccountStep3Pojo {

	private String step;
	private String text;
	private String icon;
	private Date date;
	private List<ChartAccountStep4Pojo> children;

	public String getStep() {
		return step;
	}

	public void setStep(String step) {
		this.step = step;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public List<ChartAccountStep4Pojo> getChildren() {
		return children;
	}

	public void setChildren(List<ChartAccountStep4Pojo> children) {
		this.children = children;
	}

}
