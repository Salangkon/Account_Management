package com.accountmanager.system.repository;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.CustomersList;

public interface CustomersListRepository extends CrudRepository<CustomersList, String> {

}
