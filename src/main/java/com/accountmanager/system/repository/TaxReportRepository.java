package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.TaxReport;

public interface TaxReportRepository extends CrudRepository<TaxReport, String> {

	TaxReport findByF2Id(String f2Id);

	List<TaxReport> findByType(String string);

	@Query(value = "select * from tax_report where type = ?1 and ?2 >= date", nativeQuery = true)
	List<TaxReport> findByTypeAndEndDate(String string, String endDate);

	@Query(value = "select * from tax_report where type = ?1 and ?2 <= date", nativeQuery = true)
	List<TaxReport> findByTypeAndStartDate(String string, String startDate);

	@Query(value = "select * from tax_report where type = ?1 and date between ?2 and ?3", nativeQuery = true)
	List<TaxReport> findByTypeAndStartDateAndEndDate(String string, String startDate, String endDate);

}
