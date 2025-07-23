package com.example.demo.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.UserService;
import com.example.demo.Dto.UserDTO;

@RestController
@RequestMapping("api/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("{userId}")
	public UserDTO getUser(@PathVariable Integer userId) {
		return userService.getUserDTO(userId);
	}
	
	@PostMapping()
	public UserDTO addUser(@RequestBody UserDTO userDTO) {
		return userService.addUser(userDTO);
	}
	
	@PostMapping("role")
	public ResponseEntity<List<String>> addRole(@RequestParam String roleName){
		return ResponseEntity.ok(userService.createRole(roleName));
	}
	
	@PutMapping("{userId}/role")
	public UserDTO appendRole(@PathVariable Integer userId, @RequestBody List<String> roles) {
		return userService.appendRoles(userId, roles);
	}
	
}