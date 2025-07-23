package com.example.demo.Entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@jakarta.persistence.Entity
@Table(name = "database_info")
@NoArgsConstructor
public class DbData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, unique = true, length = 200)
	public String URL;
	@Column(length = 100)
	public String Username;
	@Column(length = 100)

	public String Password;

//	public DbData() {
//		super();
//	}

	public DbData(Long id, String uRL, String username, String password) {
		super();
		this.id = id;
		URL = uRL;
		Username = username;
		Password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getURL() {
		return URL;
	}

	public void setURL(String uRL) {
		URL = uRL;
	}

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}
}
