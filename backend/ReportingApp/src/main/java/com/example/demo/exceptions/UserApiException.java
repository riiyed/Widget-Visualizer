package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserApiException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	private HttpStatus status;
	private String message;
}