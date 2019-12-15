package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.F2ListModel;

public interface F2ListRepository extends CrudRepository<F2ListModel, String> {

	List<F2ListModel> findById(String id);

}
