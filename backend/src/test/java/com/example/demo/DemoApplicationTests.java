package com.example.demo;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class DemoApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void getRootReturnsTaskList() throws Exception {
		mockMvc.perform(get("/"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isArray());
	}

	@Test
	void postedTaskContainsCreationDate() throws Exception {
		String description = "TDD Task";

		mockMvc.perform(post("/tasks")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"taskdescription\":\"" + description + "\"}"))
				.andExpect(status().isOk());

		mockMvc.perform(get("/"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[?(@.taskdescription == '" + description + "')].creationDate")
						.value(hasItem(LocalDate.now().toString())));
	}

}