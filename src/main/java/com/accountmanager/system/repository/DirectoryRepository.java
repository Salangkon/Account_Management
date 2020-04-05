package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.Directory;

public interface DirectoryRepository extends CrudRepository<Directory, String> {

	@Query( value = "select * from directory where name = ?1", nativeQuery = true)
	Directory findByName(String name);
	
	@Query( value = "select * from directory group by create_date desc", nativeQuery = true)
	List<Directory> findAllGroupByCreateDate();

}
