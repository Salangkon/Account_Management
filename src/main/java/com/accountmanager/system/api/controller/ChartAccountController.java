package com.accountmanager.system.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.ChartAccounts;
import com.accountmanager.system.pojo.ChartAccountPojo;
import com.accountmanager.system.pojo.ChartAccountStep2Pojo;
import com.accountmanager.system.pojo.ChartAccountStep3Pojo;
import com.accountmanager.system.repository.ChartAccountsRepository;

@RestController
@RequestMapping("/api-chart-account")
public class ChartAccountController {
	@Autowired
	ChartAccountsRepository chartAccountsRepo;

	@GetMapping("/get-all")
	private Iterable<ChartAccountPojo> getAll() {
		List<ChartAccountPojo> chartAccountPojos = new ArrayList<ChartAccountPojo>();
		
		Iterable<ChartAccounts> accounts = chartAccountsRepo.findAll();

		for (ChartAccounts chartAccounts : accounts) {
			ChartAccountPojo chartAccountsPojo = new ChartAccountPojo();

			if (chartAccounts.getStep1() != 0) {
				chartAccountsPojo.setText(chartAccounts.getText());
				chartAccountsPojo.setStep(String.valueOf(chartAccounts.getStep1()));
				List<ChartAccountStep2Pojo> chartAccountStep2Pojos = new ArrayList<ChartAccountStep2Pojo>();

				for (ChartAccounts chartAccounts2 : accounts) {
					ChartAccountStep2Pojo chartAccountStep2Pojo = new ChartAccountStep2Pojo();
					if (chartAccounts2.getStep2() != 0) {
						if (chartAccounts2.getStep2() == chartAccounts.getStep1()) {
							chartAccountStep2Pojo.setText(chartAccounts2.getText());
							chartAccountStep2Pojo.setStep(String.valueOf(chartAccounts2.getStep2()));
							chartAccountStep2Pojos.add(chartAccountStep2Pojo);
							
							List<ChartAccountStep3Pojo> chartAccountStep3Pojos = new ArrayList<ChartAccountStep3Pojo>();

							for (ChartAccounts chartAccounts3 : accounts) {
								ChartAccountStep3Pojo chartAccountStep3Pojo = new ChartAccountStep3Pojo();
								if (chartAccounts3.getStep3() != 0) {
									if (chartAccounts2.getStep2() == chartAccounts3.getStep3()) {
										chartAccountStep3Pojo.setText(chartAccounts3.getText());
										chartAccountStep3Pojo.setStep(String.valueOf(chartAccounts3.getStep3()));
										chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());
										chartAccountStep3Pojos.add(chartAccountStep3Pojo);
									}
									chartAccountStep2Pojo.setChildren(chartAccountStep3Pojos);
								}
							}
							
						}
						chartAccountsPojo.setChildren(chartAccountStep2Pojos);
					}
				}
				chartAccountPojos.add(chartAccountsPojo);
			}
		}

		return chartAccountPojos;
	}

	@PostMapping("/add-update")
	private ChartAccounts addUpdate(@RequestBody ChartAccounts chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		return chartAccountsRepo.save(chartAccounts);
	}

}
