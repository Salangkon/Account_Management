package com.accountmanager.system.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.CustomersList;
import com.accountmanager.system.repository.CustomersListRepository;

@RestController
@RequestMapping("/api")
public class F8CustomersController {
	@Autowired
	CustomersListRepository customersListRepo;

	@GetMapping("/customers-list")
	public Iterable<CustomersList> customersList() {
		return customersListRepo.findAll();
	}

	@GetMapping("/customers-list/{customersId}")
	public CustomersList customersList(@PathVariable("customersId") String customersId) {
		return customersListRepo.findOne(customersId);
	}

	@GetMapping("/customers-list/name/{company}")
	public List<CustomersList> customersListName(@PathVariable("company") String company, HttpServletRequest request) {
		System.err.println("company :: " + company);
		List<CustomersList> customers = customersListRepo.findByCompany(company);
		request.getSession().setAttribute("customers", customers);
		return customers;
	}

	@PostMapping("/add-update-customers-list")
	public CustomersList addUpdatecustomersList(@RequestBody CustomersList customersList) {
		return customersListRepo.save(customersList);
	}

	@DeleteMapping("/delete-customers-list/{companyId}")
	public String deletecustomersList(@PathVariable("companyId") String companyId) {
		String result = "Success";
		System.out.println(companyId);
		try {
			customersListRepo.delete(companyId);
		} catch (Exception e) {
			e.getStackTrace();
			result = "Fail";
		}
		return result;
	}

}
