package com.madlx.chatify.security;

import com.madlx.chatify.entity.User;
import com.madlx.chatify.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AppUserDetailService  implements UserDetailsService {
    private  final UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user =userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("USER NOT FOUND with" +username));
       return  new AppUserDetails(user);
    }
}
