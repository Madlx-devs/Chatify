package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.RegisterRequest;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.exceptions.UserAlreadyExistException;
import com.madlx.chatify.exceptions.EmailAlreadyExistException;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService  {

    @Autowired
    private final UserRepo userRepo;

    private  final PasswordEncoder passwordEncoder;

    public UserDto registerUser(RegisterRequest request) throws UserAlreadyExistException {
        userRepo.findByUsername(request.getUsername()).ifPresent((user)->{throw  new UserAlreadyExistException("user already exist with this username");});
        userRepo.findByEmail(request.getEmail()).ifPresent(user -> {throw  new EmailAlreadyExistException("user with this email already exist! please login");});
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        User userToSave = new User(request.getUsername(),encryptedPassword, request.getFirstname(),request.getLastname() , request.getEmail());
        User savedUser= userRepo.save(userToSave);
        return new UserDto(savedUser.getId(), savedUser.getFirstname(), savedUser.getLastname(),savedUser.getUsername(),savedUser.getEmail());
    }

    public boolean deleteUser(Long userId){
        return userRepo.findById(userId).
                map(user -> {
                 userRepo.delete(user);
                 return true;
        })
                .orElse(false);
    }
    public UserDto getUser(String username) {
        Optional<User> user = userRepo.findByUsername(username);
        UserDto userDto = null;
        if (user.isPresent()) {
            User user1 = user.get();
            userDto = new UserDto(user1.getId(), user1.getFirstname(), user1.getLastname(), user1.getUsername(), user1.getEmail());
        }
        return userDto;
    }
}
