package com.accountmanager.system.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;

@Entity
@NamedQuery(name = "Directory.findAll", query = "SELECT d FROM Directory d")
public class Directory {
	@Id
	private String id;

	private String name;

	@Column(name = "created_by")
	private String createdBy;

	@Column(name = "create_date", nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createDate = new Date();

	// bi-directional many-to-one association to Directory
	@OneToMany(mappedBy = "directory")
	private List<DBFile> dbFiles;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public List<DBFile> getDbFiles() {
		return dbFiles;
	}

	public void setDbFiles(List<DBFile> dbFiles) {
		this.dbFiles = dbFiles;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

}
