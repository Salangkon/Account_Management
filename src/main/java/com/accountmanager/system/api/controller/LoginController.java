package com.accountmanager.system.api.controller;

import java.util.HashMap;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.Company;
import com.accountmanager.system.model.User;
import com.accountmanager.system.repository.CompanyRepository;
import com.accountmanager.system.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api-login")
public class LoginController {
	static ObjectMapper mapper = new ObjectMapper();

	@Autowired
	UserRepository userRepo;
	@Autowired
	CompanyRepository companyRepo;

	@PostMapping("/login")
	private HashMap<String, String> loginUser(@RequestBody HashMap<String, String> user, Model model,
			HttpServletRequest request) {
		HashMap<String, String> res = new HashMap<String, String>();
		res.put("res", "false");
		System.err.println(user.get("id") + " :: " + user.get("password"));
		try {
			User checkUser = userRepo.findByIdAndPassword(user.get("id"), user.get("password"));
			if (checkUser != null) {
				res.put("res", "pass");
				request.getSession().setAttribute("user", checkUser);
				model.addAttribute("messessError", "S");
			}
		} catch (Exception e) {
			res.put("res", "false");
			model.addAttribute("messessError", "F");
			e.printStackTrace();
		}
		return res;
	}

	@PostMapping("/seting")
	private User seting(@RequestBody HashMap<String, String> user, Model model, HttpServletRequest request) {
		return userRepo.findByIdAndPassword(user.get("id"), user.get("password"));
	}

	@PostMapping("save-update")
	private HashMap<String, String> loginUsaveUpdate(@RequestBody User user) {
		HashMap<String, String> map = new HashMap<String, String>();
		try {
			userRepo.save(user);
			map.put("res", "pass");
		} catch (Exception e) {
			map.put("res", "false");
			e.printStackTrace();
		}
		return map;
	}

	@PostMapping("save-update-company")
	private HashMap<String, String> loginUsaveUpdateCompany(@RequestBody Company company) {
		HashMap<String, String> map = new HashMap<String, String>();
		try {
			companyRepo.save(company);
			map.put("res", "pass");
		} catch (Exception e) {
			map.put("res", "false");
			e.printStackTrace();
		}
		return map;
	}

	@PostMapping("save-update-user")
	private HashMap<String, String> loginUsaveUpdateUser(@RequestBody User user) {
		HashMap<String, String> map = new HashMap<String, String>();
		try {
			userRepo.save(user);
			map.put("res", "pass");
		} catch (Exception e) {
			map.put("res", "false");
			e.printStackTrace();
		}
		return map;
	}

	@PostMapping("/register")
	private HashMap<String, String> register(@RequestBody Company companys) throws JsonProcessingException {
		HashMap<String, String> map = new HashMap<String, String>();
		try {
			for (User user : companys.getUsers()) {
				System.err.println(mapper.writeValueAsString(user));

				User use = userRepo.findOne(user.getId());
				if (use != null) {
					map.put("res", "user");
				} else {
					String id = UUID.randomUUID().toString();
					companys.setCompanyId(id);
					user.setCompanyId(id);

					System.err.println(mapper.writeValueAsString(companys));
					companyRepo.save(companys);

					userRepo.save(user);

					map.put("res", "pass");
				}
			}

		} catch (Exception e) {
			map.put("res", "false");
			e.printStackTrace();
		}
		return map;
	}

	@GetMapping("/seting-persanol/{companyId}")
	private Iterable<User> setingPersanol(@PathVariable("companyId") String companyId) {
		Company company = companyRepo.findOne(companyId);
		return company.getUsers();
	}

	@GetMapping("/update-position/{id}/{position}")
	private String updateStatus(@PathVariable("id") String id,
			@PathVariable("position") String position) {
		String res = "fail";
		try {
			User user = userRepo.findOne(id);
			user.setStatus(position);
			userRepo.save(user);
			res = "pass";
		} catch (Exception e) {
			e.printStackTrace();
		}

		return res;
	}

	@GetMapping("/get-all")
	private Iterable<User> loginUser() {
		return userRepo.findAll();
	}

}
