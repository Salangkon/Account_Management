package com.accountmanager.system.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.Journal;

public interface JournalRepository extends CrudRepository<Journal, String> {

	@Query(value = "select max(document_code) from journal where document_code like ?1", nativeQuery = true)
	String findByDepartmentIdLike(String num);

}
