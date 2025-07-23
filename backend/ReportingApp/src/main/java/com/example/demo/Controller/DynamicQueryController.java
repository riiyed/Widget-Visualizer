package com.example.demo.Controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DbUtil.Service.DatabaseUtils;
import com.example.demo.Dto.DynamicQueryRequest;
import com.example.demo.Services.DynamicQueryService;

@RestController
@RequestMapping("api/dynamic-query")
@CrossOrigin(origins = "http://localhost:4200")

public class DynamicQueryController {
	@Autowired
	private DynamicQueryService dynamicQueryService;
	
	@Autowired
	private DatabaseUtils dbDatabaseUtils;
	@PostMapping("execute-query")
	public ResponseEntity<?> executeQuery(@RequestBody String queryTxt) {
		try {
			
			List<?> result = dynamicQueryService.runDynamicQuery(queryTxt);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error:" + e.getMessage());
		}
	} 
	
	@PostMapping("connect")
	public ResponseEntity<?> connect(@RequestBody DynamicQueryRequest request) {
	    try {
	        dbDatabaseUtils.setConnection(request.getURL(), request.getUsername(), request.getPassword());
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "Connected");
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("error", e.getMessage());
	        return ResponseEntity.badRequest().body(errorResponse);
	    }
	}

}
