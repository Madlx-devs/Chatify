package com.madlx.chatify.controllers;


import com.madlx.chatify.exceptions.RoomNotFoundException;
import com.madlx.chatify.exceptions.UserAlreadyExistException;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> UserAlreadyExist(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user already exist with this username");
    }

    @ExceptionHandler(UserNotAuthorizedException.class)
    public ResponseEntity<String> userNotAuthorized(){
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("you are not authorized to access this resource");
    }

    @ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<String >roomNotFound(){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("no such room found");
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(String message){
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(message);
    }
}
