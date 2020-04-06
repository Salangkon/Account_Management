package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accountmanager.system.model.DBFile;

@Repository
public interface DBFileRepository extends CrudRepository<DBFile, String> {

	@Query( value = "select * from files where directory_id = ?1 group by created_date desc", nativeQuery = true)
	List<DBFile> findByDirectoryId(String directoryId);
}
