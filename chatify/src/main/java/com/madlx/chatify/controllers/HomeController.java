package com.madlx.chatify.controllers;

import com.madlx.chatify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {
    @Autowired
    private UserService userService;

    @GetMapping
    public String hello(){
        return  "hello";
    }


}
