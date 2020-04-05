package com.accountmanager.system.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * The persistent class for the journal_list database table.
 * 
 */
@Entity
@Table(name = "journal_list")
@NamedQuery(name = "JournalList.findAll", query = "SELECT j FROM JournalList j")
public class JournalList implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name = "chart_account_id")
	private String chartAccountId;

	@Column(name = "journal_id")
	private String journalId;

	private float credit;

	private String detail;

	private float debit;

	// bi-directional many-to-one association to Journal
	@ManyToOne
	@JoinColumn(name = "journal_id", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonBackReference
	private Journal journal;

	public JournalList() {
	}

	public String getId() {
		return this.id;
	}

	public String getJournalId() {
		return journalId;
	}

	public void setJournalId(String journalId) {
		this.journalId = journalId;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getChartAccountId() {
		return this.chartAccountId;
	}

	public void setChartAccountId(String chartAccountId) {
		this.chartAccountId = chartAccountId;
	}

	public float getCredit() {
		return this.credit;
	}

	public void setCredit(float credit) {
		this.credit = credit;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public float getDebit() {
		return this.debit;
	}

	public void setDebit(float debit) {
		this.debit = debit;
	}

	public Journal getJournal() {
		return this.journal;
	}

	public void setJournal(Journal journal) {
		this.journal = journal;
	}

}