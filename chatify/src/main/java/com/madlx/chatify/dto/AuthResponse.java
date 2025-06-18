package com.madlx.chatify.dto;


import lombok.Data;

@Data
public class AuthResponse {

    private String message;
    private String token;
    private Object user;

    public AuthResponse(String message, String token ,Object user)  {
        this.message = message;
        this.token = token;
        this.user=user;
    }
}
