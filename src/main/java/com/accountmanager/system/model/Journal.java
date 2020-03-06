package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the journal database table.
 * 
 */
@Entity
@NamedQuery(name="Journal.findAll", query="SELECT j FROM Journal j")
public class Journal implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name="company_id")
	private String companyId;

	@Column(name="create_by")
	private String createBy;

	@Column(name="create_date")
	private Timestamp createDate;

	private Timestamp date;

	@Lob
	private String description;

	@Column(name="reference_document")
	private String referenceDocument;

	@Column(name="sum_credit")
	private float sumCredit;

	@Column(name="sum_debit")
	private float sumDebit;

	private String type;

	@Column(name="update_by")
	private String updateBy;

	@Column(name="update_date")
	private Timestamp updateDate;

	//bi-directional many-to-one association to JournalList
	@OneToMany(mappedBy="journal", cascade = CascadeType.MERGE)
	private List<JournalList> journalLists;

	public Journal() {
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

	public Timestamp getDate() {
		return this.date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReferenceDocument() {
		return this.referenceDocument;
	}

	public void setReferenceDocument(String referenceDocument) {
		this.referenceDocument = referenceDocument;
	}

	public float getSumCredit() {
		return this.sumCredit;
	}

	public void setSumCredit(float sumCredit) {
		this.sumCredit = sumCredit;
	}

	public float getSumDebit() {
		return this.sumDebit;
	}

	public void setSumDebit(float sumDebit) {
		this.sumDebit = sumDebit;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
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

	public List<JournalList> getJournalLists() {
		return this.journalLists;
	}

	public void setJournalLists(List<JournalList> journalLists) {
		this.journalLists = journalLists;
	}

	public JournalList addJournalList(JournalList journalList) {
		getJournalLists().add(journalList);
		journalList.setJournal(this);

		return journalList;
	}

	public JournalList removeJournalList(JournalList journalList) {
		getJournalLists().remove(journalList);
		journalList.setJournal(null);

		return journalList;
	}

}