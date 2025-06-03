package com.madlx.chatify.controllers;


import com.madlx.chatify.exceptions.*;
import io.jsonwebtoken.ExpiredJwtException;
import org.hibernate.internal.util.StringHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> UserAlreadyExist(UserAlreadyExistException userAlreadyExistException){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userAlreadyExistException.getMessage());
    }

    @ExceptionHandler(UserNotAuthorizedException.class)
    public ResponseEntity<String> userNotAuthorized(UserNotAuthorizedException userNotAuthorizedException){
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userNotAuthorizedException.getMessage());
    }

    @ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<String >roomNotFound(RoomNotFoundException roomNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(roomNotFoundException.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException runtimeException){
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(runtimeException.getMessage());
    }
    @ExceptionHandler(TopicNotFoundException.class)
    public ResponseEntity<String> handleTopicException(TopicNotFoundException topicNotFoundException){
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(topicNotFoundException.getMessage());
    }
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleJwtException()
    {
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("please login again");
    }
}
