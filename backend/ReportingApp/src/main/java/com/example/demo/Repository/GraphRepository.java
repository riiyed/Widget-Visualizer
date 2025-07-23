package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.GraphEntity;

public interface GraphRepository extends JpaRepository<GraphEntity, Long> {
}


