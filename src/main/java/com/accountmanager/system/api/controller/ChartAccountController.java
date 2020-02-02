package com.accountmanager.system.api.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.ChartAccounts;
import com.accountmanager.system.repository.ChartAccountsRepository;

@RestController
@RequestMapping("/api-chart-account")
public class ChartAccountController {
	@Autowired
	ChartAccountsRepository chartAccountsRepo;
	
	@GetMapping("/get-all")
	private Iterable<ChartAccounts> getAll() {
		return chartAccountsRepo.findAll();
	}
	
	@PostMapping("/add-update")
	private ChartAccounts addUpdate(@RequestBody ChartAccounts chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		return chartAccountsRepo.save(chartAccounts);
	}

}
