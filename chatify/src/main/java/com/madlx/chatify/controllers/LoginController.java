package com.madlx.chatify.controllers;

import com.madlx.chatify.dataRequest.LoginRequest;
import com.madlx.chatify.dataRequest.RegisterRequest;
import com.madlx.chatify.dto.AuthResponse;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.security.AuthenticationService;
import com.madlx.chatify.service.UserService;
import com.madlx.chatify.utility.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AuthResponse>Login(@RequestBody LoginRequest request){
        String token= authenticationService.authenticate(request);
         UserDto user=userService.getUser(request.getUsername());
         return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse("login successful",token,user));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserDto>> register(@RequestBody RegisterRequest registerRequest){
        UserDto userRegistered= userService.registerUser(registerRequest);
        return  userRegistered!= null ?
                ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("user registered successfully",userRegistered))
                :new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
