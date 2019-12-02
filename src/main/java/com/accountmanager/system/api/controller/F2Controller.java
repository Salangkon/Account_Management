package com.accountmanager.system.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.F2ListModel;
import com.accountmanager.system.model.F2Model;
import com.accountmanager.system.repository.F2ListRepository;
import com.accountmanager.system.repository.F2Repository;

@RestController
@RequestMapping("/api-f2")
public class F2Controller {

	@Autowired
	F2Repository f2Repo;
	@Autowired
	F2ListRepository f2ListRepo;	
			
	@GetMapping("/get-all")
	public Iterable<F2Model> F2Model() {
		return f2Repo.findAll();
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
