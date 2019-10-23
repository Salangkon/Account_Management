package com.accountmanager.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
	
	/* ตั้งค่า */
	@RequestMapping("/data-table")
	public String setting() {
		return "DataTable";
	}

}
