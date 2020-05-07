package com.accountmanager.system.api.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.F2Model;
import com.accountmanager.system.model.TaxReport;
import com.accountmanager.system.repository.F2Repository;
import com.accountmanager.system.repository.TaxReportRepository;

@RestController
@RequestMapping("/TaxReport")
public class TaxReportController {

	@Autowired
	TaxReportRepository taxReportRepo;
	@Autowired
	F2Repository F2Repo;

	@GetMapping("/get-all")
	public Iterable<TaxReport> getAll() {
		return taxReportRepo.findAll();
	}
	
	@GetMapping("/get-by/{type}")
	public ResponseEntity<?> getBy(@PathVariable String type) {
		if (type.equalsIgnoreCase("TaxInvoice")) {
			return new ResponseEntity<>(taxReportRepo.findByType("ReportSaleTax"), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(taxReportRepo.findByType("ReportBuyTax"), HttpStatus.OK);
		}
	}

	@PostMapping("/add-update/TaxReport")
	public ResponseEntity<?> addUpdateTaxReport(@Valid @RequestBody F2Model f2Model) {
		Date date = new Date();
		Timestamp ts = new Timestamp(date.getTime());
		try {
			System.err.println(f2Model.getId());
			 
			// clear old data report
			TaxReport report = taxReportRepo.findByF2Id(f2Model.getId());
			if (report != null) {
				taxReportRepo.delete(report);
			}

			// mapping data
			TaxReport taxReport = new TaxReport();
			if (f2Model != null) {
				taxReport.setId(UUID.randomUUID().toString());
				taxReport.setF2Id(f2Model.getId());
				taxReport.setDate(ts);
				taxReport.setDepartmentId(f2Model.getDepartmentId());
				taxReport.setReferenceDocument(f2Model.getReferenceDocument());
				if (f2Model.getType().equalsIgnoreCase("TaxInvoice")) {
					taxReport.setType("ReportSaleTax");
				} else {
					taxReport.setType("ReportBuyTax");
				}
				if (f2Model.getStatusVat().equals("1")) {
					taxReport.setPrice(f2Model.getPrice());
					taxReport.setPriceVat(f2Model.getVat());
					taxReport.setProductPriceAll(f2Model.getProductPriceAll());
				} else {
					taxReport.setPrice(f2Model.getPrice1());
					taxReport.setPriceVat(f2Model.getVat1());
					taxReport.setProductPriceAll(f2Model.getProductPriceAll1());
				}
				taxReport.setCompany(f2Model.getCompanyId());
				taxReport.setCreateBy("");
				taxReport.setCreateDate(ts);
				taxReport.setCreateBy("");
				taxReport.setUpdateDate(ts);
			}

			return new ResponseEntity<>(taxReportRepo.save(taxReport), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}

	}

} // end class
