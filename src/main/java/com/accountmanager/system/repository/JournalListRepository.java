package com.accountmanager.system.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.JournalList;

public interface JournalListRepository extends CrudRepository<JournalList, String>{

	List<JournalList> findByJournalId(String id);

}
