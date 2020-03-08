package com.accountmanager.system.api.controller;

import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.system.model.Journal;
import com.accountmanager.system.model.JournalList;
import com.accountmanager.system.pojo.GroupJounalModel;
import com.accountmanager.system.pojo.JournalSearchPojo;
import com.accountmanager.system.repository.JournalListRepository;
import com.accountmanager.system.repository.JournalRepository;
import com.accountmanager.system.service.JournalSearchService;

@RestController
@RequestMapping("/api-journal")
public class JournalController {

	@Autowired
	JournalRepository journalRepo;
	@Autowired
	JournalListRepository journalListRepo;
	@Autowired
	JournalSearchService journalSearchService;

	@GetMapping("/get-all")
	public List<Journal> getAll() {
		List<Journal> journals = (List<Journal>) journalRepo.findAll();
		journals.sort(
				(e2, e1) -> new Long(e1.getCreateDate().getTime()).compareTo(new Long(e2.getCreateDate().getTime())));
		return journals;
	}

	@PostMapping("/add-update")
	public ResponseEntity<?> addUpdate(@RequestBody Journal journal) {
		try {
			List<JournalList> journalLists = new ArrayList<JournalList>();
			journal.setId(UUID.randomUUID().toString());
			journal.setCreateDate(new Timestamp(new Date().getTime()));
			if (journal.getJournalLists() != null) {
				for (JournalList list : journal.getJournalLists()) {
					list.setId(UUID.randomUUID().toString());
					list.setJournalId(journal.getId());
					journalLists.add(list);
				}
				journal.setJournalLists(journalLists);
			}
			return new ResponseEntity<>(journalRepo.save(journal), HttpStatus.OK);
		} catch (Exception ex) {
			ex.printStackTrace();
			String errorMessage;
			errorMessage = ex + " <== error";
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/delete/{id}")
	public Boolean delete(@PathVariable("id") String id) {
		Boolean result = false;
		try {
			System.err.println(id);
			Journal journal = journalRepo.findOne(id);
			for (JournalList journalList : journal.getJournalLists()) {
				journalListRepo.delete(journalList);
			}
			journalRepo.delete(journal);
			result = true;
		} catch (Exception e) {
			result = false;
		}
		return result;
	}

	// generate department code
	@GetMapping("/generate-dep/{type}")
	public String getGenerateDepartmentCode(@PathVariable("type") String type) {
		// format date yyMMdd
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyMMdd", Locale.US);
		String date = simpleDateFormat.format(new Date());
		// search number generate
		String num = "%" + type + date + "%";

		String gen = null;
		gen = journalRepo.findByDepartmentIdLike(num);
		if (gen == null) {
			gen = type + date + "001";
		} else {
			String[] arrOfStr = gen.split(type);
			for (String a : arrOfStr) {
				gen = a;
			}
			System.out.println(gen);
			int plus = Integer.parseInt(gen);
			plus++;
			gen = type + String.valueOf(plus);
		}
		return gen;
	}

	@PostMapping("/update-status/{id}/{status}")
	public Journal updateById(@PathVariable("id") String id, @PathVariable("status") String status) {
		Journal journal = journalRepo.findOne(id);

		journal.setUpdateDate(new Timestamp(new Date().getTime()));
		switch (status) {
			case "0":
				journal.setStatus("0");
				break;
			case "1":
				journal.setStatus("1");
				break;
			case "2":
				journal.setStatus("2");
				break;
		}

		return journalRepo.save(journal);
	}

	@GetMapping(value = "/journalSearch/namejournal/{name}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public List<GroupJounalModel> getjournalSearch(@PathVariable String name)
			throws IllegalAccessException, InvocationTargetException {

		final List<JournalSearchPojo> data = journalSearchService.searchJournal(name);
		Map<Object, Collection<JournalSearchPojo>> mapValues = new HashMap<>();
		final List <GroupJounalModel> dataSearch = new ArrayList<>();
		
		 if (data.size() > 0) {
			mapValues = data.stream().collect(
                    Collectors.groupingBy(x -> x.getText(), HashMap::new,
                            Collectors.toCollection(ArrayList::new)));
		}
		for (Map.Entry me: mapValues.entrySet()) {
			GroupJounalModel groupJounal =new GroupJounalModel();
			groupJounal.setKey((String) me.getKey());
			groupJounal.setValue((List) me.getValue());
		dataSearch.add(groupJounal);
	  }
		return dataSearch;
	}

}// end class
