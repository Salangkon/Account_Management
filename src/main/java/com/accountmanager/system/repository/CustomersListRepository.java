package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.CustomersList;

public interface CustomersListRepository extends CrudRepository<CustomersList, String> {

	CustomersList findByCompanyName(String companyName);

	List<CustomersList> findByCompany(String company);

	List<CustomersList> findByCompanyAndType(String company, String type);

}
