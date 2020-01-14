package com.accountmanager.system.api.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.CustomersList;
import com.accountmanager.system.model.F2ListModel;
import com.accountmanager.system.model.F2Model;
import com.accountmanager.system.repository.CustomersListRepository;
import com.accountmanager.system.repository.F2ListRepository;
import com.accountmanager.system.repository.F2Repository;

@RestController
@RequestMapping("/api-f2")
public class F2Controller {

	@Autowired
	F2Repository f2Repo;
	@Autowired
	F2ListRepository f2ListRepo;
	@Autowired
	CustomersListRepository customersListRepo;

	@GetMapping("/get-f2ListRepo-by-id/{id}")
	public List<F2ListModel> getByIdF2ListRepo(@PathVariable("id") String id) {
		List<F2ListModel> f2ListModels = new ArrayList<F2ListModel>();
		try {
			if (id != null) {
				F2Model f2Model = f2Repo.findById(id);
				f2ListModels = f2Model.getF2ListModels();
			}
		} catch (Exception e) {
			// TODO: handle exception
		}

		return f2ListModels;
	}

	@DeleteMapping("/delete-f2/{id}")
	public String deletecustomersList(@PathVariable("id") String id) {
		String result = "Success";
		try {
			F2Model f2Model = f2Repo.findById(id);
			if (f2Model.getF2ListModels() != null) {
				for (F2ListModel f2ListModel : f2Model.getF2ListModels()) {
					f2ListRepo.delete(f2ListModel);
				}
			}
			f2Repo.delete(id);
		} catch (Exception e) {
			e.getStackTrace();
			result = "Fail";
		}
		return result;
	}

	@GetMapping("/get-by/{type}/{status}/{startDate}/{endDate}")
	public List<F2Model> F2Model(@PathVariable String type, @PathVariable String status, @PathVariable String startDate,
			@PathVariable String endDate) {
		List<F2Model> f2Models = new ArrayList<F2Model>();
		List<F2Model> f2ModelsDisplay = new ArrayList<F2Model>();
		System.err.println(type + " :: " + status + " :: " + startDate + " :: " + endDate);

		switch (status) {
		case "1":
			f2Models = searchF2(type, "รอพิจารณา", startDate, endDate);
			break;
		case "2":
			f2Models = searchF2(type, "ผ่านการตวจสอบ", startDate, endDate);
			break;
		case "3":
			f2Models = searchF2(type, "ยกเลิก", startDate, endDate);
			break;
		default:
			switch (startDate) {
			case "0":
				switch (endDate) {
				case "0":
					f2Models = f2Repo.findByType(type);
					break;
				default:
					f2Models = f2Repo.findByTypeAndEndDate(type, endDate);
					break;
				}
				break;
			default:
				switch (endDate) {
				case "0":
					f2Models = f2Repo.findByTypeAndStartDate(type, startDate);
					break;
				default:
					f2Models = f2Repo.findByTypeAndStartDateAndEndDate(type, startDate, endDate);
					break;
				}
				break;
			}
		}

		for (F2Model f2Model : f2Models) {
			F2Model model = new F2Model();
			CustomersList customers = customersListRepo.findOne(f2Model.getCompanyId());
			model = f2Model;
			model.setCompanyId(customers.getCompanyName());
			if (f2Model.getUpdateDate() == null) {
				f2Model.setUpdateDate(f2Model.getCreateDate());
			}
			f2ModelsDisplay.add(f2Model);
		}

		f2ModelsDisplay.sort(
				(e2, e1) -> new Long(e1.getUpdateDate().getTime()).compareTo(new Long(e2.getUpdateDate().getTime())));

		return f2ModelsDisplay;
	}

	public List<F2Model> searchF2(String type, String status, String startDate, String endDate) {
		List<F2Model> f2Models = new ArrayList<F2Model>();
		switch (startDate) {
		case "0":
			switch (endDate) {
			case "0":
				f2Models = f2Repo.findByTypeAndStatus(type, status);
				break;
			default:
				f2Models = f2Repo.findByTypeAndStatusAndEndDate(type, status, endDate);
				break;
			}
			break;
		default:
			switch (endDate) {
			case "0":
				f2Models = f2Repo.findByTypeAndStatusAndStartDate(type, status, startDate);
				break;
			default:
				f2Models = f2Repo.findByTypeAndStatusAndStartDateAndEndDate(type, status, startDate, endDate);
				break;
			}
			break;
		}
		return f2Models;
	}

	@GetMapping("/get-by-id/{id}")
	public F2Model getById(@PathVariable("id") String id) {
		return f2Repo.findById(id);
	}

	@PostMapping("/update-status/{id}/{status}")
	public F2Model updateById(@PathVariable("id") String id, @PathVariable("status") String status) {
		F2Model f2ListModel = f2Repo.findById(id);
		
		// Convert Date to Timestamp
		Date date = new Date();
		Timestamp ts = new Timestamp(date.getTime());
		f2ListModel.setUpdateDate(ts);
		
		switch (status) {
		case "0":
			f2ListModel.setStatus("รอพิจารณา");
			break;
		case "2":
			f2ListModel.setStatus("ผ่านการตวจสอบ");
			break;
		case "3":
			f2ListModel.setStatus("ยกเลิก");
			break;
		}

		return f2Repo.save(f2ListModel);
	}

	@PostMapping("/add-update")
	public ResponseEntity<?> Quotation(@RequestBody F2Model f2Model) {
		// Convert Date to Timestamp
		Date date = new Date();
		Timestamp ts = new Timestamp(date.getTime());

		List<F2ListModel> f2ListModels = new ArrayList<>();

		try {
			if (f2Model.getId() == null || f2Model.getId().equals("")) {
				f2Model.setId(UUID.randomUUID().toString());
				f2Model.setCreateDate(ts);
			} else {
				f2Model.setCreateDate(f2Repo.findById(f2Model.getId()).getCreateDate());
				f2Model.setUpdateDate(ts);
			}
			F2Model f2ListModels2 = f2Repo.findById(f2Model.getId());
			if (f2ListModels2 != null) {
				for (F2ListModel f2ListModel : f2ListModels2.getF2ListModels()) {
					f2ListRepo.delete(f2ListModel.getId());
				}
			}

			for (F2ListModel f2ListModel : f2Model.getF2ListModels()) {
				f2ListModel.setId(UUID.randomUUID().toString());
				f2ListModel.setF2Id(f2Model.getId());
				f2ListModels.add(f2ListModel);
			}
			f2Model.setF2ListModels(f2ListModels);
			return new ResponseEntity<>(f2Repo.save(f2Model), HttpStatus.OK);
		} catch (Exception ex) {
			String errorMessage;
			errorMessage = ex + " <== error";
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

}
