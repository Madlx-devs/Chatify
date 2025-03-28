package com.madlx.chatify.controllers;

import com.madlx.chatify.dataRequest.LoginRequest;
import com.madlx.chatify.dataRequest.RegisterRequest;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.security.AuthenticationService;
import com.madlx.chatify.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins ="http://localhost:5173")
@RestController
public class LoginController {
        private  final AuthenticationService authenticationService;
        private final UserService userService;

    public LoginController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<String>Login(@RequestBody LoginRequest request){
        return new ResponseEntity<>(authenticationService.authenticate(request),
                HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequest registerRequest){
        return new ResponseEntity<>(userService.registerUser(registerRequest),HttpStatus.OK);
    }
}
