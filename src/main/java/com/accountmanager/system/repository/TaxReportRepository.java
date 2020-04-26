package com.accountmanager.system.repository;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.TaxReport;

public interface TaxReportRepository extends CrudRepository<TaxReport, String> {

	TaxReport findByF2Id(String f2Id);

}
