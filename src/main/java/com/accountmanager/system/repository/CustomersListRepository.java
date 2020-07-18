package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.CustomersList;

public interface CustomersListRepository extends CrudRepository<CustomersList, String> {

	List<CustomersList> findByCompanyName(String companyName);

	List<CustomersList> findByCompany(String company);

}
