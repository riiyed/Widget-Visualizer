package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jsondata")
public class JsonData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chart_type", nullable = false)
    private String chartType;

    @Column(name = "coordinates", columnDefinition = "text", nullable = false)
    private String coordinates;

    @Column(name = "email", nullable = false)
    private String email;  

    public JsonData() {
    }

    public JsonData(String chartType, String coordinates, String email) {
        this.chartType = chartType;
        this.coordinates = coordinates;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getChartType() {
        return chartType;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setChartType(String chartType) {
        this.chartType = chartType;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
