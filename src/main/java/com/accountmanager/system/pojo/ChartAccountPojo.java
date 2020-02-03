package com.accountmanager.system.pojo;

import java.util.List;

public class ChartAccountPojo {

	private String step;
	private String text;
	private String icon;
	private List<ChartAccountStep2Pojo> children;

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

	public List<ChartAccountStep2Pojo> getChildren() {
		return children;
	}

	public void setChildren(List<ChartAccountStep2Pojo> children) {
		this.children = children;
	}

}
