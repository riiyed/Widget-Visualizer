package com.example.demo.Services;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepo;

@Component
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    User user = userRepo.findByEmail(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

	    Set<GrantedAuthority> authorities = user.getRoles().stream()
	        .map(role -> new SimpleGrantedAuthority(role.getName()))
	        .collect(Collectors.toSet());

	    return new org.springframework.security.core.userdetails.User(
	        user.getEmail(),     // ✅ match the email used to authenticate
	        user.getPassword(),
	        authorities
	    );
	}
}
	