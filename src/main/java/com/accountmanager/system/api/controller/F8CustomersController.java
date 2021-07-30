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
import com.accountmanager.system.model.User;
import com.accountmanager.system.repository.CompanyRepository;
import com.accountmanager.system.repository.CustomersListRepository;
import com.accountmanager.system.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class F8CustomersController {
	@Autowired
	CustomersListRepository customersListRepo;
	@Autowired
	UserRepository userRepo;

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
	
	@GetMapping("/customers-list/name/{company}/{type}")
	public List<CustomersList> customersListNameAndtype(@PathVariable("company") String company,
			@PathVariable("type") String type, HttpServletRequest request) {
		System.err.println("company :: " + company);
		List<CustomersList> customers = customersListRepo.findByCompanyAndType(company, type);
		request.getSession().setAttribute("customers", customers);
		return customers;
	}
	
	@GetMapping("/customers-list/company-name/{companyName}")
	public CustomersList customersListCompanyName(@PathVariable("companyName") String companyName) {
		System.err.println("Company Name :: " + companyName);
		CustomersList customers = customersListRepo.findByCompanyName(companyName);
		return customers;
	}

	@PostMapping("/add-update-customers-list")
	public CustomersList addUpdatecustomersList(@RequestBody CustomersList customersList) {
		try {
			if (customersList.getOfficeType() == 0) {
				customersList.setOfficeType(1);
			}
			User user = userRepo.findOne(customersList.getCreateBy());
			customersList.setCompany(user.getCompanyId());

			CustomersList customers = customersListRepo.findByCompanyName(customersList.getCompanyName());
			if (customers != null) {
				customersList.setCompanyId(customers.getCompanyId());
			} else {
				customersList.setCompanyId(customersList.getCompanyName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
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
