package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.F2Model;

public interface F2Repository extends CrudRepository<F2Model, String> {

	List<F2Model> findByType(String type);

}
