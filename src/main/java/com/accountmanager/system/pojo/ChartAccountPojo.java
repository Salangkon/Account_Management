package com.accountmanager.system.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;

public class ChartAccountPojo {

	private String id;
	private String passCode;
	private String textEdit;
	private String detail;
	private String step;
	private String icon;
	private Date date;
	private String text;
	private StatePojo state;
	private String statusDelete;
	private List<ChartAccountStep2Pojo> children;

	public String getTextEdit() {
		return textEdit;
	}

	public String getStatusDelete() {
		return statusDelete;
	}

	public void setStatusDelete(String statusDelete) {
		this.statusDelete = statusDelete;
	}

	public void setTextEdit(String textEdit) {
		this.textEdit = textEdit;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
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

	public StatePojo getState() {
		return state;
	}

	public void setState(StatePojo state) {
		this.state = state;
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

	public List<ChartAccountStep2Pojo> getChildren() {
		return children;
	}

	public void setChildren(List<ChartAccountStep2Pojo> children) {
		this.children = children;
	}

}
