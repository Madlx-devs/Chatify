package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.RegisterRequest;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.exceptions.UserAlreadyExistException;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService  {

    @Autowired
    private final UserRepo userRepo;

    private  final PasswordEncoder passwordEncoder;

    public UserDto registerUser(RegisterRequest request) throws UserAlreadyExistException {
        userRepo.findByUsername(request.getUsername()).ifPresent((user)->{throw  new UserAlreadyExistException("user already exist with this username");});
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        User userToSave = new User(request.getUsername(),encryptedPassword, request.getFirstname(),request.getLastname());
        User savedUser= userRepo.save(userToSave);
        return new UserDto(savedUser.getId(),savedUser.getUsername(), savedUser.getFirstname(), savedUser.getLastname());
    }

    public boolean deleteUser(Long userId){
        return userRepo.findById(userId).
                map(user -> {
                 userRepo.delete(user);
                 return true;
        })
                .orElse(false);
    }

}
