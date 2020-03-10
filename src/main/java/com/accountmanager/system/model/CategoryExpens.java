package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the category_expenses database table.
 * 
 */
@Entity
@Table(name="category_expenses")
@NamedQuery(name="CategoryExpens.findAll", query="SELECT c FROM CategoryExpens c")
public class CategoryExpens implements Serializable {
	private static final long serialVersionUID = 1L;

	private String icon;

	private String name;

	private int row;

	private String status;

	public CategoryExpens() {
	}

	public String getIcon() {
		return this.icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getRow() {
		return this.row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}