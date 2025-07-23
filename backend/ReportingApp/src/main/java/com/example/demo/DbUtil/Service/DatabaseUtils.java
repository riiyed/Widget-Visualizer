package com.example.demo.DbUtil.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.stereotype.Component;

@Component
public class DatabaseUtils {

    private String jdbcUrl;
    private String jdbcUsername;
    private String jdbcPassword;

    private Connection connection;

    public void setConnection(String jdbcUrl, String jdbcUsername, String jdbcPassword) {
        this.jdbcUrl = jdbcUrl;
        this.jdbcUsername = jdbcUsername;
        this.jdbcPassword = jdbcPassword;
    }

    public Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            try {
                connection = DriverManager.getConnection(jdbcUrl, jdbcUsername, jdbcPassword);
            } catch (SQLException e) {
                throw new SQLException("Failed to create the database connection.", e);
            }
        }
        return connection;
    }

    public void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
