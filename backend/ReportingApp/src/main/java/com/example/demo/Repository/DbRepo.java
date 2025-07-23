package com.example.demo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.DbData;

public interface DbRepo extends JpaRepository<DbData, Long>{

}
