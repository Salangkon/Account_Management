package com.accountmanager.system.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.CustomersList;
import com.accountmanager.system.repository.CustomersListRepository;

@RestController
@RequestMapping("api")
public class UserController {
	
	@Autowired
	CustomersListRepository customersListRepo;
	
	@GetMapping("/login")
	public String HomePages() {
		return "HomePages";
	}
	
}
