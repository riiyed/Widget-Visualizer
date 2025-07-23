package com.example.demo.Dto;

public class JwtAuthResponse {
    private String accessToken;
    private final String tokenType = "Bearer";

    public JwtAuthResponse() {
    }

    public JwtAuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }
}
