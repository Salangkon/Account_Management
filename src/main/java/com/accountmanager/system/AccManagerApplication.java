package com.accountmanager.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses=AccManagerApplication.class)
public class AccManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccManagerApplication.class, args);
	}

}
