package com.accountmanager.system.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.CategoryExpens;
import com.accountmanager.system.repository.CategoryExpensRepository;

@RestController
@RequestMapping("/api-expense")
public class F4ExpensesController {

	@Autowired
	CategoryExpensRepository categoryExpensRepo;

	@GetMapping("/get-dropdown")
	private Iterable<CategoryExpens> getDropdown() {
		return categoryExpensRepo.findAll();
	}
}
