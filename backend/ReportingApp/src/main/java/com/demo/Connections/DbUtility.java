package com.demo.Connections;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbUtility {
	private String url;
	private String username;
	private String password;
	private Connection connection;
	
	public DbUtility(String url, String username, String password) {
		this.url = url;
		this.username = username;
		this.password = password;
		
	}
	//Gets connection 
	public Connection connect() throws SQLException {
	    if (connection == null || connection.isClosed()) {
	        connection = DriverManager.getConnection(url, username, password);
	        System.out.println("Connection established!");
	    }
	    return connection;
	}

	//Closes connection
	public void disconnect() {
		if (connection != null) {
			try {
				connection.close();
				System.out.println("Disconnected from database");
			}
			catch (SQLException e) {
				System.err.println("Error closing connection:" + e.getMessage());
			}
		}
	}
	
}