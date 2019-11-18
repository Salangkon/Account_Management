package com.accountmanager.system.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accountmanager.system.model.DBFile;

@Repository
public interface DBFileRepository extends CrudRepository<DBFile, String> {

}
