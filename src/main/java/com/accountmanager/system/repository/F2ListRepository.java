package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.F2ListModel;

public interface F2ListRepository extends CrudRepository<F2ListModel, String> {

	List<F2ListModel> findById(String id);

	@Query(value = "DELETE FROM f2_list_model WHERE f2_id = ?1", nativeQuery = true)
	void deleteF2Id(String f2Id);

}
