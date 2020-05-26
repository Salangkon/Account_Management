package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.CategoryExpensesMapping;

public interface CategoryExpensesMappingRepository extends CrudRepository<CategoryExpensesMapping, String> {

	@Query(value = "select * from category_expenses_mapping where mapping = ?1", nativeQuery = true)
	List<CategoryExpensesMapping> findByMapping(String groupExpense);

}
