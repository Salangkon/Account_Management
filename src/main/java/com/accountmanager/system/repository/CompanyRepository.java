package com.accountmanager.system.repository;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.Company;

public interface CompanyRepository extends CrudRepository<Company, String> {

}
