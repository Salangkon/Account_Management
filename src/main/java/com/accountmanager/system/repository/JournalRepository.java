package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.Journal;

public interface JournalRepository extends CrudRepository<Journal, String> {

	@Query(value = "select max(document_code) from journal where document_code like ?1", nativeQuery = true)
	String findByDepartmentIdLike(String num);

	@Query(value = "select * from journal where ?1 >= date and `type` = ?2", nativeQuery = true)
	List<Journal> findByEndDate(String toDate, String type);
	
	@Query(value = "select * from journal where ?1 <= date and `type` = ?2", nativeQuery = true)
	List<Journal> findByStartDate(String formDate, String type);
	
	@Query(value = "select * from journal where date between ?1 and ?2 and `type` = ?3", nativeQuery = true)
	List<Journal> findByStartDateAndEndDate(String formDate, String toDate, String type);

	@Query(value = "select * from journal where `type` = ?1", nativeQuery = true)
	List<Journal> findByType(String type);

	@Query(value = "select * from journal where f2_id = ?1 and type = ?2", nativeQuery = true)
	Journal findByF2IdAndType(String id, String type);

	@Query(value = "select * from journal where f2_id = ?1", nativeQuery = true)
	List<Journal> findByF2Id(String id);

}
