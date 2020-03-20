package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.CategoryExpensesMapping;

public interface CategoryExpensesMappingRepository extends CrudRepository<CategoryExpensesMapping, String> {

	List<CategoryExpensesMapping> findByMapping(String groupExpense);

}
