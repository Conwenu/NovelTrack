package com.example.NovelTrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class NovelTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(NovelTrackApplication.class, args);
	}

	@GetMapping("/")
	public static String idk()
	{
		return "LOL😹😹😹";
	}

}
