package com.madlx.chatify.security;

import com.madlx.chatify.dataRequest.LoginRequest;
import com.madlx.chatify.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {


    private final AuthenticationManager authManager;
    private final  AppUserDetailService appUserDetailService;
    private final JwtService jwtService;

    public AuthenticationService(AuthenticationManager authManager, AppUserDetailService appUserDetailService,JwtService jwtService) {
        this.authManager = authManager;
        this.appUserDetailService = appUserDetailService;
        this.jwtService=jwtService;
    }


    public  String authenticate(LoginRequest request) {
       Authentication authentication= authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
       if(!authentication.isAuthenticated()){
            return "bad credentials";
        }
        return jwtService.generateToken(request.getUsername());
    }
}
