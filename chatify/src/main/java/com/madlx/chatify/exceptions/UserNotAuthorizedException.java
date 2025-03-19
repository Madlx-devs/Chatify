package com.madlx.chatify.exceptions;


import org.springframework.web.client.ResourceAccessException;

public class UserNotAuthorizedException  extends RuntimeException {
    public UserNotAuthorizedException(String msg) {
        super(msg);
    }
}
