package com.accountmanager.system.pojo;

import java.util.Date;
import java.util.List;

public class ChartAccountStep4Pojo {

	private String id;
	private String passCode;
	private String textEdit;
	private String detail;
	private String step;
	private String text;
	private String icon;
	private Date date;
	private List<ChartAccountStep5Pojo> children;

	public String getTextEdit() {
		return textEdit;
	}

	public void setTextEdit(String textEdit) {
		this.textEdit = textEdit;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassCode() {
		return passCode;
	}

	public void setPassCode(String passCode) {
		this.passCode = passCode;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public List<ChartAccountStep5Pojo> getChildren() {
		return children;
	}

	public void setChildren(List<ChartAccountStep5Pojo> children) {
		this.children = children;
	}

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

}
