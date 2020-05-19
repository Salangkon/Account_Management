package com.accountmanager.system.api.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
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

import com.accountmanager.system.model.CategoryExpensesMapping;
import com.accountmanager.system.model.CustomersList;
import com.accountmanager.system.model.F2ListModel;
import com.accountmanager.system.model.F2Model;
import com.accountmanager.system.model.Journal;
import com.accountmanager.system.model.JournalList;
import com.accountmanager.system.repository.CategoryExpensesMappingRepository;
import com.accountmanager.system.repository.CustomersListRepository;
import com.accountmanager.system.repository.F2ListRepository;
import com.accountmanager.system.repository.F2Repository;
import com.accountmanager.system.repository.JournalListRepository;
import com.accountmanager.system.repository.JournalRepository;

@RestController
@RequestMapping("/api-f2")
public class F2Controller {

	@Autowired
	F2Repository f2Repo;
	@Autowired
	F2ListRepository f2ListRepo;
	@Autowired
	CustomersListRepository customersListRepo;
	@Autowired
	JournalRepository journalRepo;
	@Autowired
	JournalListRepository journalListRepo;
	@Autowired
	F6JournalController journalController;
	@Autowired
	CategoryExpensesMappingRepository categoryExpensesMappingRepo;

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

	@GetMapping("/generate-dep/{type}")
	public String getGenerateDepartmentCode(@PathVariable("type") String type) {
		// format date yyMMdd
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyMMdd", Locale.US);
		String date = simpleDateFormat.format(new Date());
		// search number generate
		String num = "%" + type + date + "%";

		String gen = null;
		gen = f2Repo.findByDepartmentIdLike(num);
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

	@GetMapping("/get-by/{type}/{status}/{startDate}/{endDate}")
	public List<F2Model> F2Model(@PathVariable String type, @PathVariable String status, @PathVariable String startDate,
			@PathVariable String endDate) {
		List<F2Model> f2Models = new ArrayList<F2Model>();
		List<F2Model> f2ModelsDisplay = new ArrayList<F2Model>();
		System.err.println(type + " :: " + status + " :: " + startDate + " :: " + endDate);

		switch (status) {
		case "1":
			f2Models = searchF2(type, "รออนุมัติ", startDate, endDate);
			break;
		case "2":
			f2Models = searchF2(type, "อนุมัติ", startDate, endDate);
			break;
		case "3":
			f2Models = searchF2(type, "ไม่อนุมัติ", startDate, endDate);
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
		F2Model f2Model = f2Repo.findById(id);

		// Convert Date to Timestamp
		Date date = new Date();
		Timestamp ts = new Timestamp(date.getTime());
		f2Model.setUpdateDate(ts);

		switch (status) {
		case "0":
			f2Model.setStatus("รออนุมัติ");
			break;
		case "2":
			f2Model.setStatus("อนุมัติ");
			break;
		case "3":
			f2Model.setStatus("ไม่อนุมัติ");
			break;
		case "5":
			f2Model.setStatus("ชำระเงินแล้ว");
//			if (journalRepo.findByF2IdAndType(f2Model.getId(), "PV") == null) {
				ReceiveReport(f2Model, "PV");
//			}
			break;
		case "6":
			f2Model.setStatus("ชำระเงินแล้ว");
//			if (journalRepo.findByF2IdAndType(f2Model.getId(), "PV") == null) {
				Expenses(f2Model, "PV");
//			}
			break;
		case "7":
			f2Model.setStatus("ไม่อนุมัติ");
			List<Journal> journals = journalRepo.findByF2Id(f2Model.getId());
			for (Journal journal : journals) {
				journalController.updateById(journal.getId(), "2");
			}
			break;
		}
		return f2Repo.save(f2Model);
	}

	@PostMapping("/add-update")
	public ResponseEntity<?> Quotation(@RequestBody F2Model f2Model) {
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
			if (f2Repo.findOne(f2Model.getId()) == null) {
				switch (f2Model.getType()) {
				case "ReceiveReport":
					ReceiveReport(f2Model, "UV");
					break;
				case "TaxInvoice":
					TaxInvoice(f2Model, "UV");
					break;
				case "Receipt":
					Receipt(f2Model, "RV");
					break;
				case "Expenses":
					Expenses(f2Model, "UV");
					break;
				default:
					break;
				}
			}

			return new ResponseEntity<>(f2Repo.save(f2Model), HttpStatus.OK);
		} catch (Exception ex) {
			String errorMessage;
			errorMessage = ex + " <== error";
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

	public void ReceiveReport(F2Model f2Model, String passId) {
		System.err.println(passId);
		Journal journal = new Journal();
		CustomersList customersList = customersListRepo.findOne(f2Model.getCompanyId());
		journal.setDescription(
				"ค่าซื้อ บริการ จาก " + customersList.getCompanyName() + " #" + f2Model.getDepartmentId());
		journal.setReferenceDocument("");
		journal.setType(passId);
		journal.setStatus("1");
		journal.setCompanyId(f2Model.getCompanyId());
		journal.setDate(f2Model.getDateEnd());
		journal.setF2Id(f2Model.getId());
		journal.setCreateDate(new Timestamp(new Date().getTime()));
		journal.setDocumentCode(journalController.getGenerateDepartmentCode(passId));
		journal.setSumCredit(f2Model.getPrice());
		journal.setSumDebit(f2Model.getPrice());
		journal.setCreateBy(f2Model.getCreateBy());
		if (passId.equals("PV")) {
			if (f2Model.getPrice() != 0) {
				List<JournalList> journalLists = new ArrayList<JournalList>();
				List<String> ChartAccountId = new ArrayList<String>();
				ChartAccountId.add("6ffc89bc-48bc-4d5e-b8f2-65c88a10429b");
				ChartAccountId.add("f4220d85-32f3-47b0-9b7f-3475618a29ca");
				for (String string : ChartAccountId) {
					JournalList journalList = new JournalList();
					journalList.setChartAccountId(string);
					switch (string) {
					case "6ffc89bc-48bc-4d5e-b8f2-65c88a10429b":
						journalList.setCredit(0);
						journalList.setDebit(f2Model.getVat());
						journalList.setDetail(journal.getDescription());
						break;
					case "f4220d85-32f3-47b0-9b7f-3475618a29ca":
						journalList.setCredit(f2Model.getPrice());
						journalList.setDebit(0);
						journalList.setDetail(journal.getDescription());
						break;
					}
					journalLists.add(journalList);
				}
				journal.setJournalLists(journalLists);
			}
		} else {
			if (f2Model.getPrice() != 0) {
				if (f2Model.getVat() != 0) {
					List<JournalList> journalLists = new ArrayList<JournalList>();
					List<String> ChartAccountId = new ArrayList<String>();
					ChartAccountId.add("d1d70beb-41c0-4f7b-9949-ef8a2574672e");
					ChartAccountId.add("530e91d5-46ab-4cc4-9452-0787f688879b");
					ChartAccountId.add("6ffc89bc-48bc-4d5e-b8f2-65c88a10429b");
					for (String string : ChartAccountId) {
						JournalList journalList = new JournalList();

						journalList.setChartAccountId(string);
						switch (string) {
						case "d1d70beb-41c0-4f7b-9949-ef8a2574672e":
							journalList.setCredit(0);
							journalList.setDebit(f2Model.getProductPriceAll());
							journalList.setDetail(journal.getDescription());
							break;
						case "530e91d5-46ab-4cc4-9452-0787f688879b":
							journalList.setCredit(0);
							journalList.setDebit(f2Model.getVat());
							journalList.setDetail(journal.getDescription());
							break;
						case "6ffc89bc-48bc-4d5e-b8f2-65c88a10429b":
							journalList.setCredit(f2Model.getPrice());
							journalList.setDebit(0);
							journalList.setDetail(journal.getDescription());
							break;
						}
						journalLists.add(journalList);
					}
					journal.setJournalLists(journalLists);
				} else {
					List<JournalList> journalLists = new ArrayList<JournalList>();
					List<String> ChartAccountId = new ArrayList<String>();
					ChartAccountId.add("d1d70beb-41c0-4f7b-9949-ef8a2574672e");
					ChartAccountId.add("6ffc89bc-48bc-4d5e-b8f2-65c88a10429b");
					for (String string : ChartAccountId) {
						JournalList journalList = new JournalList();
						journalList.setChartAccountId(string);
						switch (string) {
						case "d1d70beb-41c0-4f7b-9949-ef8a2574672e":
							journalList.setCredit(0);
							journalList.setDebit(f2Model.getPrice());
							journalList.setDetail(journal.getDescription());
							break;
						case "6ffc89bc-48bc-4d5e-b8f2-65c88a10429b":
							journalList.setCredit(f2Model.getPrice());
							journalList.setDebit(0);
							journalList.setDetail(journal.getDescription());
							break;
						}
						journalLists.add(journalList);
					}
					journal.setJournalLists(journalLists);
				}
			}
		}

		journalController.addUpdate(journal);
	}

	public void TaxInvoice(F2Model f2Model, String passId) {
		System.err.println(passId);
		Journal journal = new Journal();
		CustomersList customersList = customersListRepo.findOne(f2Model.getCompanyId());
		journal.setDescription(
				"ค่าซื้อ บริการ จาก " + customersList.getCompanyName() + " #" + f2Model.getDepartmentId());
		journal.setReferenceDocument("");
		journal.setType(passId);
		journal.setStatus("1");
		journal.setCompanyId(f2Model.getCompanyId());
		journal.setDate(f2Model.getDateEnd());
		journal.setF2Id(f2Model.getId());
		journal.setCreateDate(new Timestamp(new Date().getTime()));
		journal.setDocumentCode(journalController.getGenerateDepartmentCode(passId));
		journal.setSumCredit(f2Model.getPrice());
		journal.setSumDebit(f2Model.getPrice());
		journal.setCreateBy(f2Model.getCreateBy());
		if (passId.equals("UV")) {
			if (f2Model.getPrice() != 0) {
				List<JournalList> journalLists = new ArrayList<JournalList>();
				List<String> ChartAccountId = new ArrayList<String>();
				ChartAccountId.add("70cb28eb-6ae8-40d2-9e30-a8487617eef9");
				ChartAccountId.add("93fc6b4d-46a5-456c-8816-926857976c6c");
				ChartAccountId.add("628014ce-763d-4ed1-88f5-878180c8f7e8");
				for (String string : ChartAccountId) {
					JournalList journalList = new JournalList();
					journalList.setChartAccountId(string);
					switch (string) {
					case "70cb28eb-6ae8-40d2-9e30-a8487617eef9":
						journalList.setCredit(0);
						journalList.setDebit(f2Model.getProductPriceAll());
						journalList.setDetail(journal.getDescription());
						break;
					case "93fc6b4d-46a5-456c-8816-926857976c6c":
						journalList.setCredit(f2Model.getPrice());
						journalList.setDebit(0);
						journalList.setDetail(journal.getDescription());
						break;
					case "628014ce-763d-4ed1-88f5-878180c8f7e8":
						journalList.setCredit(f2Model.getVat());
						journalList.setDebit(0);
						journalList.setDetail(journal.getDescription());
						break;
					}
					journalLists.add(journalList);
				}
				journal.setJournalLists(journalLists);
			}
		}

		journalController.addUpdate(journal);
	}

	public void Receipt(F2Model f2Model, String passId) {
		System.err.println(passId);
		Journal journal = new Journal();
		CustomersList customersList = customersListRepo.findOne(f2Model.getCompanyId());
		journal.setDescription(
				"ค่าซื้อ บริการ จาก " + customersList.getCompanyName() + " #" + f2Model.getDepartmentId());
		journal.setReferenceDocument("");
		journal.setType(passId);
		journal.setStatus("1");
		journal.setCompanyId(f2Model.getCompanyId());
		journal.setDate(f2Model.getDateEnd());
		journal.setF2Id(f2Model.getId());
		journal.setCreateDate(new Timestamp(new Date().getTime()));
		journal.setDocumentCode(journalController.getGenerateDepartmentCode(passId));
		journal.setSumCredit(f2Model.getPrice());
		journal.setSumDebit(f2Model.getPrice());
		journal.setCreateBy(f2Model.getCreateBy());
		if (passId.equals("RV")) {
			if (f2Model.getPrice() != 0) {
				List<JournalList> journalLists = new ArrayList<JournalList>();
				List<String> ChartAccountId = new ArrayList<String>();
				ChartAccountId.add("f4220d85-32f3-47b0-9b7f-3475618a29ca");
				ChartAccountId.add("8a5e1e08-7c35-4d00-b932-cf487e64961c");
				for (String string : ChartAccountId) {
					JournalList journalList = new JournalList();
					journalList.setChartAccountId(string);
					switch (string) {
					case "f4220d85-32f3-47b0-9b7f-3475618a29ca":
						journalList.setCredit(0);
						journalList.setDebit(f2Model.getPrice());
						journalList.setDetail(journal.getDescription());
						break;
					case "8a5e1e08-7c35-4d00-b932-cf487e64961c":
						journalList.setCredit(f2Model.getPrice());
						journalList.setDebit(0);
						journalList.setDetail(journal.getDescription());
						break;
					}
					journalLists.add(journalList);
				}
				journal.setJournalLists(journalLists);
			}
		}
		journalController.addUpdate(journal);
	}

	public void Expenses(F2Model f2Model, String passId) {
		System.err.println(passId);
		Journal journal = new Journal();
		CustomersList customersList = customersListRepo.findOne(f2Model.getCompanyId());
		journal.setDescription(
				"ค่าซื้อ บริการ จาก " + customersList.getCompanyName() + " #" + f2Model.getDepartmentId());
		journal.setReferenceDocument("");
		journal.setType(passId);
		journal.setStatus("1");
		journal.setCompanyId(f2Model.getCompanyId());
		journal.setDate(f2Model.getDateEnd());
		journal.setF2Id(f2Model.getId());
		journal.setCreateDate(new Timestamp(new Date().getTime()));
		journal.setDocumentCode(journalController.getGenerateDepartmentCode(passId));
		journal.setSumCredit(f2Model.getProductPriceAll());
		journal.setSumDebit(f2Model.getProductPriceAll());
		journal.setCreateBy(f2Model.getCreateBy());
		if (passId.equals("UV")) {
			if (f2Model.getPrice() != 0) {
				List<JournalList> journalLists = new ArrayList<JournalList>();
				List<HashMap<String, String>> ChartAccountId = new ArrayList<HashMap<String, String>>();
				List<HashMap<String, String>> mappings = new ArrayList<HashMap<String, String>>();
				for (F2ListModel f2ListModel : f2Model.getF2ListModels()) {
					HashMap<String, String> data = new HashMap<String, String>();
					data.put("id", f2ListModel.getGroupExpense());
					data.put("detail", f2ListModel.getProduct());
					data.put("pice", String.valueOf(f2ListModel.getProductSumPrice()));
					mappings.add(data);
				}
				ChartAccountId = categoryExpensesMappingRopo(mappings, customersList.getCompanyName(),
						f2Model.getDepartmentId());

				for (HashMap<String, String> mapping : ChartAccountId) {
					JournalList journalList = new JournalList();
					journalList.setChartAccountId(mapping.get("id"));
					switch (mapping.get("level")) {
					case "1":
						journalList.setCredit(0);
						journalList.setDebit(Float.parseFloat(mapping.get("pice")));
						journalList.setDetail(mapping.get("detail"));
						break;
					case "2":
						journalList.setCredit(0);
						journalList.setDebit(f2Model.getVat());
						journalList.setDetail(mapping.get("detail"));
						break;
					case "3":
						journalList.setCredit(Float.parseFloat(mapping.get("pice"))
								+ f2Model.getVat() / f2Model.getF2ListModels().size());
						journalList.setDebit(0);
						journalList.setDetail(mapping.get("detail"));
						break;
					}
					journalLists.add(journalList);
				}
				journal.setJournalLists(journalLists);
			}
		} else if (passId.equals("PV")) {
			if (f2Model.getPrice() != 0) {
				List<JournalList> journalLists = new ArrayList<JournalList>();
				List<HashMap<String, String>> ChartAccountId = new ArrayList<HashMap<String, String>>();
				List<HashMap<String, String>> mappings = new ArrayList<HashMap<String, String>>();
				for (F2ListModel f2ListModel : f2Model.getF2ListModels()) {
					HashMap<String, String> data = new HashMap<String, String>();
					data.put("id", f2ListModel.getGroupExpense());
//					data.put("detail", f2ListModel.getProduct());
					data.put("pice", String.valueOf(f2ListModel.getProductSumPrice()));
					mappings.add(data);
				}
				ChartAccountId = categoryExpensesMappingRopoPV(mappings, customersList.getCompanyName(),
						f2Model.getDepartmentId());

				for (HashMap<String, String> mapping : ChartAccountId) {
					JournalList journalList = new JournalList();
					journalList.setChartAccountId(mapping.get("id"));
					switch (mapping.get("level")) {
					case "1":
						journalList.setCredit(0);
						journalList.setDebit(Float.parseFloat(mapping.get("pice")));
						journalList.setDetail("ชำระค่า ส่งเสริมการขาย ให้แก่ " + customersList.getCompanyName() + " #"
								+ f2Model.getDepartmentId());
						break;
					case "2":
						journalList.setCredit(f2Model.getProductPriceAll());
						journalList.setDebit(0);
						journalList.setDetail(mapping.get("detail"));
						break;
					}
					journalLists.add(journalList);
				}
				journal.setJournalLists(journalLists);
			}
		}

		journalController.addUpdate(journal);
	}

	@GetMapping("/categoryExpensesMappingRopo")
	public List<HashMap<String, String>> categoryExpensesMappingRopo(List<HashMap<String, String>> mappings,
			String name, String department) {
		List<HashMap<String, String>> expenses = new ArrayList<HashMap<String, String>>();
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("id", "530e91d5-46ab-4cc4-9452-0787f688879b");
		data.put("detail", "ชำระค่า ส่งเสริมการขาย ให้แก่ " + name + " #" + department);
		data.put("level", "2");
		expenses.add(data);

		for (HashMap<String, String> mapping : mappings) {
			List<CategoryExpensesMapping> expensesMapping = categoryExpensesMappingRepo
					.findByMapping(mapping.get("id"));
			for (CategoryExpensesMapping categoryExpensesMapping : expensesMapping) {
				if (categoryExpensesMapping.getLevel() != 2) {
					HashMap<String, String> data1 = new HashMap<String, String>();
					data1.put("id", categoryExpensesMapping.getId());
					data1.put("pice", mapping.get("pice"));
					data1.put("detail", mapping.get("detail"));
					data1.put("level", String.valueOf(categoryExpensesMapping.getLevel()));
					expenses.add(data1);
				}
			}
		}
		expenses.sort((e1, e2) -> new String(e1.get("level")).compareTo(new String(e2.get("level"))));
		return expenses;
	}

	public List<HashMap<String, String>> categoryExpensesMappingRopoPV(List<HashMap<String, String>> mappings,
			String name, String department) {
		List<HashMap<String, String>> expenses = new ArrayList<HashMap<String, String>>();
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("id", "f4220d85-32f3-47b0-9b7f-3475618a29ca");
		data.put("level", "2");
		data.put("detail", "ชำระค่า ส่งเสริมการขาย ให้แก่ " + name + " #" + department);
		expenses.add(data);

		for (HashMap<String, String> mapping : mappings) {
			List<CategoryExpensesMapping> expensesMapping = categoryExpensesMappingRepo
					.findByMapping(mapping.get("id"));
			for (CategoryExpensesMapping categoryExpensesMapping : expensesMapping) {
				if (categoryExpensesMapping.getLevel() == 3) {
					HashMap<String, String> data1 = new HashMap<String, String>();
					data1.put("id", categoryExpensesMapping.getId());
//					data1.put("detail", mapping.get("detail"));
					float price = Float.parseFloat(mapping.get("pice"));
					float priceCal = (price * 7 / 100) + price;
					data1.put("pice", String.valueOf(priceCal));
					data1.put("level", "1");
					expenses.add(data1);
				}
			}
		}
		expenses.sort((e1, e2) -> new String(e1.get("level")).compareTo(new String(e2.get("level"))));
		return expenses;
	}

} // end class
