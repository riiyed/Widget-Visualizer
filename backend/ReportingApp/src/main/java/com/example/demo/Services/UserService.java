package com.example.demo.Services;
import java.util.List;
import com.example.demo.Dto.UserDTO;
import com.example.demo.Entity.User;
public interface UserService {
	UserDTO getUserDTO(Integer id);
	User getUser(Integer id);
	UserDTO addUser(UserDTO user);
	
	UserDTO appendRoles(Integer userId, List<String> roles);
	List<String> createRole(String roleName);
}