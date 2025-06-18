package com.madlx.chatify.exceptions;

import org.springframework.web.client.ResourceAccessException;

import java.io.IOException;

public class EmailAlreadyExistException  extends ResourceAccessException {
    public EmailAlreadyExistException(String msg) {
        super(msg);
    }

    public EmailAlreadyExistException(String msg, IOException ex) {
        super(msg, ex);
    }
}
