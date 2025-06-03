package com.madlx.chatify.security;

import com.madlx.chatify.dataRequest.LoginRequest;
import com.madlx.chatify.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;


@Service
public class AuthenticationService {


    private final AuthenticationManager authManager;
    private final AppUserDetailService appUserDetailService;
    private final JwtService jwtService;

    public AuthenticationService(AuthenticationManager authManager, AppUserDetailService appUserDetailService, JwtService jwtService) {
        this.authManager = authManager;
        this.appUserDetailService = appUserDetailService;
        this.jwtService=jwtService;
    }


    public  String authenticate(LoginRequest request) {
        Authentication authentication= authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
       return jwtService.generateToken(request.getUsername());
    }
}
