package com.accountmanager.system.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
			
	@GetMapping("/get-by/{type}")
	public List<F2Model> F2Model(@PathVariable String type) {
		List<F2Model> f2Models = new ArrayList<F2Model>();
		List<F2Model> f2ModelsDisplay = new ArrayList<F2Model>();
		f2Models = f2Repo.findByType(type);
		for (F2Model f2Model : f2Models) {
			F2Model model = new F2Model();
			CustomersList customers = customersListRepo.findOne(f2Model.getCompanyId());
			model = f2Model;
			model.setCompanyId(customers.getCompanyName());
			f2ModelsDisplay.add(f2Model);
		}
		return f2ModelsDisplay;
	}


	@PostMapping("/add-update")
	public ResponseEntity<?> Quotation(@RequestBody F2Model f2Model) {
		try {
			if (f2Model.getId() == null) {
				f2Model.setId(UUID.randomUUID().toString());
			}
			List<F2ListModel> f2ListModels = new ArrayList<>();
			for (F2ListModel f2ListModel : f2Model.getF2ListModels()) {
				if (f2ListModel.getId() == null) {
					f2ListModel.setId(UUID.randomUUID().toString());
				}
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
