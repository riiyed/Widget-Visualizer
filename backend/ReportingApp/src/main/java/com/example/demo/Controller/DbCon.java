package com.example.demo.Controller;

import com.example.demo.Entity.DbData;
import com.example.demo.Repository.DbRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dbdata")
public class DbCon {

    private final DbRepo repo;

    @Autowired
    public DbCon(DbRepo repo) { 
        this.repo = repo;
    }

// Create a new DbData record
    @PostMapping
    public ResponseEntity<DbData> createDbData(@RequestBody DbData dbData) {
        DbData saved = repo.save(dbData);
        return ResponseEntity.ok(saved);
    }
    
   

    // Get all DbData records
    @GetMapping
    public ResponseEntity<List<DbData>> getAllDbData() {
        List<DbData> list = repo.findAll();
        return ResponseEntity.ok(list);
    }
    

    // Get a DbData record by ID
    @GetMapping("/{id}")
    public ResponseEntity<DbData> getDbDataById(@PathVariable Long id) {
        Optional<DbData> dataOpt = repo.findById(id);
        return dataOpt.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update DbData record by ID
    @PutMapping("/{id}")
    public ResponseEntity<DbData> updateDbData(@PathVariable Long id, @RequestBody DbData dbDataDetails) {
        Optional<DbData> dataOpt = repo.findById(id);
        if (!dataOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        DbData existing = dataOpt.get();
        existing.setURL(dbDataDetails.getURL());
      existing.setUsername(dbDataDetails.getUsername());
        existing.setPassword(dbDataDetails.getPassword());

        DbData updated = repo.save(existing);
        return ResponseEntity.ok(updated);
    }

    // Delete a DbData record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDbData(@PathVariable Long id) {
        Optional<DbData> dataOpt = repo.findById(id);
        if (!dataOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}



