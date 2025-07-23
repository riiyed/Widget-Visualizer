package com.example.demo.Services;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.UserDTO;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.exceptions.UserApiException;
import com.example.demo.Repository.RoleRepo;
import com.example.demo.Repository.UserRepo;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    RoleRepo roleRepo;

    @Override
    public User getUser(Integer id) {
        return userRepo.findById(id).orElseThrow(() -> 
            new UserApiException(HttpStatus.NOT_FOUND, "User not found with id: " + id));
    }

    @Override
    public UserDTO getUserDTO(Integer id) {
        User user = getUser(id);
        return UserDTO.toDTO(user);
    }

    @Override
    public UserDTO addUser(UserDTO user) {
        if (user.getUserId() != null) 
            throw new UserApiException(HttpStatus.BAD_REQUEST, "User ID should not be provided for registration");

        if (userRepo.existsByEmail(user.getEmail()))
            throw new UserApiException(HttpStatus.BAD_REQUEST, "User already exists with this email");

        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userRepo.save(UserDTO.toUser(user));
        // Assign roles if provided
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            return appendRoles(savedUser.getUserId(), user.getRoles());
        }
        return UserDTO.toDTO(savedUser);
    }

    @Override
    public UserDTO appendRoles(Integer userId, List<String> roleNames) {
        User user = getUser(userId);
        List<Role> previousRoles = user.getRoles();
        List<Role> updatedRoles = (previousRoles != null) ? new ArrayList<>(previousRoles) : new ArrayList<>();

        for (String roleName : roleNames) {
            Role fetchedRole = roleRepo.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

            Set<User> users = fetchedRole.getUsers();
            if (users == null) {
                users = new HashSet<>();
            }

            if (users.contains(user)) {
                throw new RuntimeException("User already has role: " + roleName);
            }

            users.add(user);
            fetchedRole.setUsers(users);
            updatedRoles.add(fetchedRole);
        }

        user.setRoles(updatedRoles);
        userRepo.save(user);
        return UserDTO.toDTO(user);
    }

    @Override
    public List<String> createRole(String roleName) {
        Optional<Role> fetchedRole = roleRepo.findByName(roleName);
        if (fetchedRole.isPresent()) 
            throw new RuntimeException("Role already exists: " + roleName);

        Role role = new Role();
        role.setName(roleName);
        roleRepo.save(role);

        List<Role> roles = roleRepo.findAll();
        return roles.stream()
                    .map(Role::getName)
                    .collect(Collectors.toList());
    }
}
