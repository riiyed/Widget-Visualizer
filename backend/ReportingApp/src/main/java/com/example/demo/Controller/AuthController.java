package com.example.demo.Controller;

import com.example.demo.Dto.JwtAuthResponse;
import com.example.demo.Dto.LoginDTO;
import com.example.demo.Dto.UserDTO;
import com.example.demo.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class AuthController {

	@Autowired
	AuthService authService;
	
	@PostMapping("login")
	public JwtAuthResponse login(@RequestBody LoginDTO loginDTO){
		String jwt = authService.login(loginDTO);
		return new JwtAuthResponse(jwt);
	}
	
	@PostMapping("register")
	public UserDTO register(@RequestBody UserDTO userDTO){
		return authService.register(userDTO);
	}
}
