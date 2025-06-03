package com.madlx.chatify.exceptions;

import com.madlx.chatify.entity.User;

public class UserNotFoundException extends RuntimeException{

    UserNotFoundException(String message){
        super(message);
    }
}
