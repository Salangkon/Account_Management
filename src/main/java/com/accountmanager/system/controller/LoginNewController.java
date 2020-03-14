package com.accountmanager.system.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.accountmanager.system.model.User;
import com.accountmanager.system.repository.UserRepository;

@Controller
public class LoginNewController {
	
//	@Autowired
//	UserRepository userRepo;
//	
//	@RequestMapping("/login")
//	public String authenLogin(String id, String password, Model model, HttpServletRequest request) {
//		User checkUser = new User();
//		try {
//			checkUser = userRepo.findByIdAndPassword(id, password);
//			if (checkUser != null) {
//				request.getSession().setAttribute("user",checkUser);
//				model.addAttribute("messessError", "S");
//			}
//		} catch (Exception e) {
//			request.getSession().setAttribute("user",checkUser);
//			model.addAttribute("messessError", "F");
//			e.printStackTrace();
//		}
//		return "/";
//	}

}
