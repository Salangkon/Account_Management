package com.accountmanager.system.api.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.User;
import com.accountmanager.system.repository.UserRepository;

@RestController
@RequestMapping("/api-login")
public class LoginController {

	@Autowired
	UserRepository userRepo;

	@PostMapping("/login")
	private HashMap<String, String> loginUser(@RequestBody HashMap<String, String> user) {
		HashMap<String, String> res = new HashMap<String, String>();
		res.put("res", "false");
		System.err.println(user.get("id") + " :: " + user.get("password"));
		try {
			User checkUser = userRepo.findByIdAndPassword(user.get("id"), user.get("password"));
			if (checkUser != null) {
				res.put("res", "pass");
			}
		} catch (Exception e) {
			res.put("res", "false");
			e.printStackTrace();
		}
		return res;
	}

	@PostMapping("save-update")
	private String loginUsaveUpdate(@RequestBody User user) {
		String res = "false";
		try {
			userRepo.save(user);
			res = "pass";
		} catch (Exception e) {
			res = "false";
			e.printStackTrace();
		}
		return res;
	}

	@GetMapping("/get-all")
	private Iterable<User> loginUser() {
		return userRepo.findAll();
	}

}
