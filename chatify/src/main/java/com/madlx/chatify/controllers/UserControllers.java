package com.madlx.chatify.controllers;

import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.exceptions.UserAlreadyExistException;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1")
public class UserControllers {
    private  final UserService userService;

    @PutMapping(path = "/updateUser")
    public ResponseEntity<UserDto> updateUser(@RequestBody User user)throws UserNotAuthorizedException{
        return new  ResponseEntity<>(HttpStatus.OK);
    }

}
