package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.F2Model;

public interface F2Repository extends CrudRepository<F2Model, String> {
	F2Model findById(String id);

	List<F2Model> findByType(String type);

	List<F2Model> findByStatus(String status);

	List<F2Model> findByTypeAndStatus(String type, String status);

	@Query(value = "select * from f2_model where type = ?1 and ?2 <= date", nativeQuery = true)
	List<F2Model> findByTypeAndStartDate(String type, String startDate);

	@Query(value = "select * from f2_model where type = ?1 and ?2 >= date", nativeQuery = true)
	List<F2Model> findByTypeAndEndDate(String type, String endDate);

	@Query(value = "select * from f2_model where type = ?1 and date between ?2 and ?3", nativeQuery = true)
	List<F2Model> findByTypeAndStartDateAndEndDate(String type, String startDate, String endDate);
	
	@Query(value = "select * from f2_model where type = ?1 and  status = ?2 and ?3 <= date", nativeQuery = true)
	List<F2Model> findByTypeAndStatusAndStartDate(String type, String status, String startDate);

	@Query(value = "select * from f2_model where type = ?1 and status = ?2 and ?3 >= date", nativeQuery = true)
	List<F2Model> findByTypeAndStatusAndEndDate(String type, String status, String endDate);

	@Query(value = "select * from f2_model where type = ?1 and status = ?2 and date between ?3 and ?4", nativeQuery = true)
	List<F2Model> findByTypeAndStatusAndStartDateAndEndDate(String type, String status, String startDate, String endDate);

}
