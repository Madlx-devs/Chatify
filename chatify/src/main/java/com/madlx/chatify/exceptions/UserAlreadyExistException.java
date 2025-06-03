package com.madlx.chatify.exceptions;

import org.springframework.web.client.ResourceAccessException;

public class UserAlreadyExistException extends ResourceAccessException {

    public UserAlreadyExistException(String message){
        super(message);
    }
}
