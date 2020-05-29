package com.accountmanager.system.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the category_expenses_mapping database table.
 * 
 */
@Entity
@Table(name = "category_expenses_mapping")
public class CategoryExpensesMapping {

	@Id
	private String id;

	private int level;

	private String mapping;

	private String name;

	public CategoryExpensesMapping() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getLevel() {
		return this.level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getMapping() {
		return this.mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}