package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the f2_model database table.
 * 
 */
@Entity
@Table(name="f2_model")
@NamedQuery(name="F2Model.findAll", query="SELECT f FROM F2Model f")
public class F2Model implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name="company_id")
	private String companyId;

	@Column(name="create_by")
	private String createBy;

	@Column(name="create_date")
	private Timestamp createDate;

	@Temporal(TemporalType.DATE)
	private Date date;

	@Temporal(TemporalType.DATE)
	@Column(name="date_end")
	private Date dateEnd;

	@Column(name="department_id")
	private String departmentId;

	private float discount;

	@Column(name="discount_price")
	private float discountPrice;

	@Lob
	private String note;

	@Column(name="product_price")
	private float productPrice;

	@Column(name="update_by")
	private String updateBy;

	@Column(name="update_date")
	private Timestamp updateDate;

	private float vat;

	//bi-directional many-to-one association to F2ListModel
	@OneToMany(mappedBy="f2Model", cascade = CascadeType.MERGE)
	private List<F2ListModel> f2ListModels;

	public F2Model() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getCreateBy() {
		return this.createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Timestamp getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getDateEnd() {
		return this.dateEnd;
	}

	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	public String getDepartmentId() {
		return this.departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public float getDiscount() {
		return this.discount;
	}

	public void setDiscount(float discount) {
		this.discount = discount;
	}

	public float getDiscountPrice() {
		return this.discountPrice;
	}

	public void setDiscountPrice(float discountPrice) {
		this.discountPrice = discountPrice;
	}

	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public float getProductPrice() {
		return this.productPrice;
	}

	public void setProductPrice(float productPrice) {
		this.productPrice = productPrice;
	}

	public String getUpdateBy() {
		return this.updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Timestamp getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public float getVat() {
		return this.vat;
	}

	public void setVat(float vat) {
		this.vat = vat;
	}

	public List<F2ListModel> getF2ListModels() {
		return this.f2ListModels;
	}

	public void setF2ListModels(List<F2ListModel> f2ListModels) {
		this.f2ListModels = f2ListModels;
	}

	public F2ListModel addF2ListModel(F2ListModel f2ListModel) {
		getF2ListModels().add(f2ListModel);
		f2ListModel.setF2Model(this);

		return f2ListModel;
	}

	public F2ListModel removeF2ListModel(F2ListModel f2ListModel) {
		getF2ListModels().remove(f2ListModel);
		f2ListModel.setF2Model(null);

		return f2ListModel;
	}

}