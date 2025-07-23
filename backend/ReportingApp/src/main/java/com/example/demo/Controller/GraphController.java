package com.example.demo.Controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.GraphEntity;
import com.example.demo.Repository.GraphRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/graphs")
public class GraphController {

    @Autowired
    private GraphRepository graphRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveGraph(@RequestBody Map<String, Object> request) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            // Convert json_data Map to String JSON
            Object jsonDataObj = request.get("json_data");
            if (jsonDataObj == null) {
                return ResponseEntity.badRequest().body("json_data missing");
            }
            String jsonDataString = mapper.writeValueAsString(jsonDataObj);

            GraphEntity graph = new GraphEntity();
            graph.setJsonData(jsonDataString);

            if (request.containsKey("loan_amount")) {
                graph.setLoanAmount(new BigDecimal(request.get("loan_amount").toString()));
            }

            if (request.containsKey("interest_rate")) {
                graph.setInterestRate(new BigDecimal(request.get("interest_rate").toString()));
            }

            if (request.containsKey("loan_type")) {
                graph.setLoanType(request.get("loan_type").toString());
            }

            graphRepository.save(graph);
            return ResponseEntity.ok("Graph saved successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Save failed.");
        }
    }
}
