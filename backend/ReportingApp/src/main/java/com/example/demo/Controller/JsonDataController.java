package com.example.demo.Controller;

import com.example.demo.Entity.JsonData;
import com.example.demo.Repository.JsonDataRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jsondata")
@CrossOrigin
public class JsonDataController {

    @Autowired
    private JsonDataRepository jsonDataRepository;

    @PostMapping("/save")
    public JsonData save(@RequestBody JsonData data) {
        try {
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = "unknown@example.com";
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                email = userDetails.getUsername(); 
            }

            
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode coordinatesJson = (ObjectNode) mapper.readTree(data.getCoordinates());
            coordinatesJson.put("email", email);
            data.setCoordinates(coordinatesJson.toString());

            
            data.setEmail(email);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonDataRepository.save(data);
    }

    @GetMapping("/all")
    public List<JsonData> getAll() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = "unknown@example.com";
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            email = userDetails.getUsername();
        }
        
        return jsonDataRepository.findByEmail(email);
    }

    @GetMapping("/{id}")
    public JsonData getById(@PathVariable Long id) {
        return jsonDataRepository.findById(id).orElse(null);
    }
}
