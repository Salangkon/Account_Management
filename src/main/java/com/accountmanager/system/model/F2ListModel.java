package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.sql.Timestamp;


/**
 * The persistent class for the f2_list_model database table.
 * 
 */
@Entity
@Table(name="f2_list_model")
@NamedQuery(name="F2ListModel.findAll", query="SELECT f FROM F2ListModel f")
public class F2ListModel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name="create_date")
	private Timestamp createDate;

	private String product;

	@Column(name="product_detail")
	private String productDetail;

	@Column(name="product_number")
	private int productNumber;

	@Column(name="product_price")
	private float productPrice;

	@Column(name="product_sum_price")
	private float productSumPrice;

	@Column(name="update_date")
	private Timestamp updateDate;
	
	@Column(name="f2_id")
	private String f2Id;

	//bi-directional many-to-one association to F2Model
	@ManyToOne
	@JoinColumn(name = "f2_id", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonBackReference
	private F2Model f2Model;

	public F2ListModel() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Timestamp getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public String getProduct() {
		return this.product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getProductDetail() {
		return this.productDetail;
	}

	public void setProductDetail(String productDetail) {
		this.productDetail = productDetail;
	}

	public int getProductNumber() {
		return this.productNumber;
	}

	public void setProductNumber(int productNumber) {
		this.productNumber = productNumber;
	}

	public float getProductPrice() {
		return this.productPrice;
	}

	public void setProductPrice(float productPrice) {
		this.productPrice = productPrice;
	}

	public float getProductSumPrice() {
		return this.productSumPrice;
	}

	public void setProductSumPrice(float productSumPrice) {
		this.productSumPrice = productSumPrice;
	}

	public Timestamp getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public F2Model getF2Model() {
		return this.f2Model;
	}

	public void setF2Model(F2Model f2Model) {
		this.f2Model = f2Model;
	}

	public String getF2Id() {
		return f2Id;
	}

	public void setF2Id(String f2Id) {
		this.f2Id = f2Id;
	}

}