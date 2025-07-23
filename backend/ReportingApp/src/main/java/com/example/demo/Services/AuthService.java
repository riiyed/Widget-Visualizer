package com.example.demo.Services;

import com.example.demo.Dto.LoginDTO;
import com.example.demo.Dto.UserDTO;

public interface AuthService {
	String login(LoginDTO loginDTO);
	UserDTO register(UserDTO userDTO);
}