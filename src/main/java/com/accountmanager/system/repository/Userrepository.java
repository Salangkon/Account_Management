package com.accountmanager.system.repository;

import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.User;

public interface Userrepository extends CrudRepository<User, String> {

}
