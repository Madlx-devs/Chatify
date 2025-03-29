package com.madlx.chatify.exceptions;

public class MessageNotFoundException extends RuntimeException{

    public MessageNotFoundException(String message) {
        super(message);
    }
}
