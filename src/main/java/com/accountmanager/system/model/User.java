package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;

/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private String id;

	private String password;

	private String email;

	@Column(name = "f_name")
	private String fName;

	@Column(name = "l_name")
	private String lName;

	private String role;

	private Integer status;

	private Integer tel;

	@Temporal(TemporalType.DATE)
	@Column(name = "birth_day")
	private Date birthDay;

	@Temporal(TemporalType.DATE)
	@Column(name = "create_date")
	private Date createDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "update_date")
	private Date updateDate;

	public User() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getBirthDay() {
		return this.birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFName() {
		return this.fName;
	}

	public void setFName(String fName) {
		this.fName = fName;
	}

	public String getLName() {
		return this.lName;
	}

	public void setLName(String lName) {
		this.lName = lName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getTel() {
		return this.tel;
	}

	public void setTel(Integer tel) {
		this.tel = tel;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

}