package com.example.demo.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Role;
public interface RoleRepo extends JpaRepository<Role, Integer> {
	Optional<Role> findByName(String name);
}