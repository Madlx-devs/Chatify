package com.madlx.chatify.exceptions;

public class JwtTokenExpiration extends Exception{

    public JwtTokenExpiration(String message) {
        super(message);
    }

    public JwtTokenExpiration(String message, Throwable cause) {
        super(message, cause);
    }
}
