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
import com.accountmanager.system.pojo.ChartAccountStep4Pojo;
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
				if (chartAccounts.getUpdateDate() != null) {
					chartAccountsPojo.setDate(chartAccounts.getUpdateDate());
				} else {
					chartAccountsPojo.setDate(chartAccounts.getCreateDate());
				}
				List<ChartAccountStep2Pojo> chartAccountStep2Pojos = new ArrayList<ChartAccountStep2Pojo>();

				for (ChartAccounts chartAccounts2 : accounts) {
					ChartAccountStep2Pojo chartAccountStep2Pojo = new ChartAccountStep2Pojo();
					if (chartAccounts2.getStep2() != 0) {
						if (chartAccounts2.getStep2() == chartAccounts.getStep1()) {
							chartAccountStep2Pojo.setText(chartAccounts2.getText());
							chartAccountStep2Pojo.setIcon(chartAccounts2.getIcon());
							chartAccountStep2Pojo.setStep(String.valueOf(chartAccounts2.getStep2()));
							if (chartAccounts2.getUpdateDate() != null) {
								chartAccountStep2Pojo.setDate(chartAccounts2.getUpdateDate());
							} else {
								chartAccountStep2Pojo.setDate(chartAccounts2.getCreateDate());
							}
							chartAccountStep2Pojos.add(chartAccountStep2Pojo);
							List<ChartAccountStep3Pojo> chartAccountStep3Pojos = new ArrayList<ChartAccountStep3Pojo>();

							for (ChartAccounts chartAccounts3 : accounts) {
								ChartAccountStep3Pojo chartAccountStep3Pojo = new ChartAccountStep3Pojo();
								if (chartAccounts3.getStep3() != 0) {
									if (chartAccounts3.getStep3() == Integer.parseInt(chartAccounts2.getIdStep2())) {
										chartAccountStep3Pojo.setText(chartAccounts3.getText());
										chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());
										chartAccountStep3Pojo.setStep(String.valueOf(chartAccounts3.getStep3()));
										chartAccountStep3Pojo.setIcon(chartAccounts3.getIcon());
										if (chartAccounts3.getUpdateDate() != null) {
											chartAccountStep3Pojo.setDate(chartAccounts3.getUpdateDate());
										} else {
											chartAccountStep3Pojo.setDate(chartAccounts3.getCreateDate());
										}
										chartAccountStep3Pojos.add(chartAccountStep3Pojo);
										chartAccountStep2Pojo.setChildren(chartAccountStep3Pojos);

										List<ChartAccountStep4Pojo> chartAccountStep4Pojos = new ArrayList<ChartAccountStep4Pojo>();
										for (ChartAccounts chartAccounts4 : accounts) {
											ChartAccountStep4Pojo chartAccountStep4Pojo = new ChartAccountStep4Pojo();
											if (chartAccounts4.getStep4() != 0) {
												if (Integer.parseInt(chartAccounts3.getIdStep3()) == chartAccounts4.getStep4()) {
													chartAccountStep4Pojo.setText(chartAccounts4.getText());
													chartAccountStep4Pojo.setIcon(chartAccounts4.getIcon());
													chartAccountStep4Pojo.setStep(String.valueOf(chartAccounts4.getStep4()));
													chartAccountStep4Pojo.setIcon(chartAccounts4.getIcon());
													if (chartAccounts4.getUpdateDate() != null) {
														chartAccountStep4Pojo.setDate(chartAccounts4.getUpdateDate());
													} else {
														chartAccountStep4Pojo.setDate(chartAccounts4.getCreateDate());
													}
													chartAccountStep4Pojos.add(chartAccountStep4Pojo);
													chartAccountStep3Pojo.setChildren(chartAccountStep4Pojos);
												}
											}
										}
									}
								}
							}

						}
						chartAccountsPojo.setChildren(chartAccountStep2Pojos);
					}
				}
				chartAccountPojos.add(chartAccountsPojo);
			}
		}

		chartAccountPojos
				.sort((e1, e2) -> new Long(e1.getDate().getTime()).compareTo(new Long(e2.getDate().getTime())));

		return chartAccountPojos;
	}

	@PostMapping("/add-update")
	private ChartAccounts addUpdate(@RequestBody ChartAccounts chartAccounts) {
		chartAccounts.setId(UUID.randomUUID().toString());
		return chartAccountsRepo.save(chartAccounts);
	}

}
