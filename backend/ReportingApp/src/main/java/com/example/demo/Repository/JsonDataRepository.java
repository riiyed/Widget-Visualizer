package com.example.demo.Repository;

import com.example.demo.Entity.JsonData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JsonDataRepository extends JpaRepository<JsonData, Long> {
    List<JsonData> findByEmail(String email);
}
