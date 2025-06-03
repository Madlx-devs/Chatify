package com.madlx.chatify.exceptions;

public class TopicNotFoundException extends RuntimeException{
    public TopicNotFoundException(String message) {
        super(message);
    }

    public TopicNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TopicNotFoundException(Throwable cause) {
        super(cause);
    }
}
