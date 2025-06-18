package com.madlx.chatify.filters;

import com.madlx.chatify.security.AppUserDetailService;
import com.madlx.chatify.security.AppUserDetails;
import com.madlx.chatify.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final AppUserDetailService userDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain   filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        // Check if authHeader is null or does not start with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = authHeader.substring(7);
        String username = jwtService.extractUsername(jwtToken);

        if (username != null) {
            UserDetails userDetails = userDetailService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwtToken, userDetails.getUsername())) {
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(userDetails ,null, userDetails.getAuthorities())
                );
            }
        }

        filterChain.doFilter(request, response);
    }
}