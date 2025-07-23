package com.example.demo.Dto;

public class DynamicQueryRequest {
private String URL;
private String Username;
private String Password;
private String Query;


public DynamicQueryRequest() {
	super();
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
public String getQuery() {
	return Query;
}
public void setQuery(String query) {
	Query = query;
}

}

