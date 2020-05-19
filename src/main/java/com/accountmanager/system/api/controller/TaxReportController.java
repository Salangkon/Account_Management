package com.accountmanager.system.api.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
	@Autowired
	F8CustomersController customersContro;
	
	@GetMapping("/get-all")
	public Iterable<TaxReport> getAll() {
		return taxReportRepo.findAll();
	}

	@GetMapping("/get-by/{type}/{startDate}/{endDate}")
	public ResponseEntity<?> getBy(@PathVariable String type, @PathVariable String startDate,
			@PathVariable String endDate) {
		System.out.println("type :: " + type + " >> startDate :: " + startDate + " >> endDate :: " + endDate);
		List<TaxReport> reports = new ArrayList<TaxReport>();
		try {
			if (type.equalsIgnoreCase("ReportSaleTax")) {
				switch (startDate) {
				case "0":
					switch (endDate) {
					case "0":
						reports = taxReportRepo.findByType("ReportSaleTax");
						break;
					default:
						reports = taxReportRepo.findByTypeAndEndDate("ReportSaleTax", endDate);
						break;
					}
					break;
				default:
					switch (endDate) {
					case "0":
						reports = taxReportRepo.findByTypeAndStartDate("ReportSaleTax", startDate);
						break;
					default:
						reports = taxReportRepo.findByTypeAndStartDateAndEndDate("ReportSaleTax", startDate, endDate);
						break;
					}
					break;
				}
			} else {
				switch (startDate) {
				case "0":
					switch (endDate) {
					case "0":
						reports = taxReportRepo.findByType("ReportBuyTax");
						break;
					default:
						reports = taxReportRepo.findByTypeAndEndDate("ReportBuyTax", endDate);
						break;
					}
					break;
				default:
					switch (endDate) {
					case "0":
						reports = taxReportRepo.findByTypeAndStartDate("ReportBuyTax", startDate);
						break;
					default:
						reports = taxReportRepo.findByTypeAndStartDateAndEndDate("ReportBuyTax", startDate, endDate);
						break;
					}
					break;
				}
			}
			
			for (TaxReport taxReport : reports) {
				TaxReport report = new TaxReport();
				report = taxReport;
				report.setCompany(customersContro.customersList(taxReport.getCompany()).getCompanyName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return new ResponseEntity<>(reports, HttpStatus.OK);
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
				taxReport.setDate(f2Model.getDate());
				taxReport.setDepartmentId(f2Model.getDepartmentId());
				taxReport.setReferenceDocument(f2Model.getReferenceDocument());
				taxReport.setCreateBy(f2Model.getCreateBy());
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
				taxReport.setCreateDate(ts);
				taxReport.setUpdateDate(ts);
			}

			return new ResponseEntity<>(taxReportRepo.save(taxReport), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}

	}

} // end class
