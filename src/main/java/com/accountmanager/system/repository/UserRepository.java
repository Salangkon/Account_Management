package com.accountmanager.system.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accountmanager.system.model.User;

public interface UserRepository extends CrudRepository<User, String> {

	@Query(value = "select * from user where id = ?1 and password = ?2 ", nativeQuery = true)
	User findByIdAndPassword(String id, String password);

}
