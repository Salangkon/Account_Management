package com.accountmanager.system.repository;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.Journal;

public interface JournalRepository extends CrudRepository<Journal, String> {

}
