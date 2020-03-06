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

import com.accountmanager.system.model.Journal;
import com.accountmanager.system.model.JournalList;
import com.accountmanager.system.repository.JournalListRepository;
import com.accountmanager.system.repository.JournalRepository;

@RestController
@RequestMapping("/api-journal")
public class JournalController {

	@Autowired
	JournalRepository journalRepo;
	@Autowired
	JournalListRepository journalListRepo;
	
	@GetMapping("/get-all")
	public List<Journal> getAll() {
		return (List<Journal>) journalRepo.findAll();
	}
	
	@PostMapping("/add-update")
	public ResponseEntity<?> addUpdate(@RequestBody Journal journal) {
		try {
			List<JournalList> journalLists = new ArrayList<JournalList>();
			journal.setId(UUID.randomUUID().toString());
			for (JournalList list : journal.getJournalLists()) {
				list.setId(UUID.randomUUID().toString());
				list.setJournalId(journal.getId());
				journalLists.add(list);
			}
			journal.setJournalLists(journalLists);
			return new ResponseEntity<>(journalRepo.save(journal), HttpStatus.OK);
		} catch (Exception ex) {
			ex.printStackTrace();
			String errorMessage;
			errorMessage = ex + " <== error";
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

}
