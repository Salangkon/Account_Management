package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.Journal;

public interface JournalRepository extends CrudRepository<Journal, String> {

	@Query(value = "select max(document_code) from journal where document_code like ?1", nativeQuery = true)
	String findByDepartmentIdLike(String num);

	@Query(value = "select * from journal where ?1 >= date", nativeQuery = true)
	List<Journal> findByEndDate(String toDate);
	
	@Query(value = "select * from journal where ?1 <= date", nativeQuery = true)
	List<Journal> findByStartDate(String formDate);
	
	@Query(value = "select * from journal where date between ?1 and ?2", nativeQuery = true)
	List<Journal> findByStartDateAndEndDate(String formDate, String toDate);

}
