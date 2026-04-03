package com.WayneRagsac.PassionProjectReactionTimeBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PassionProjectReactionTimeBackendApplication {

	public static void main(String[] args) {
		new DotEnvLoader(); // Load environment variables from .env file
		System.out.println("DB_USER: " + System.getProperty("DB_USER"));
		System.out.println("DB_PASSWORD: " + System.getProperty("DB_PASSWORD"));
		SpringApplication.run(PassionProjectReactionTimeBackendApplication.class, args);
	}

}
