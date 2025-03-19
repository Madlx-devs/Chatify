package com.madlx.chatify.service;

import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.exceptions.UserAlreadyExistException;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.madlx.chatify.enums.Roles.USER;


@Service
@RequiredArgsConstructor
public class UserService  {

    @Autowired
    private final UserRepo userRepo;

    private  final PasswordEncoder passwordEncoder;

    public UserDto createUser(User user){
      userRepo.findByUsername(user.getUsername()).ifPresent((user1) -> {
          throw new UserAlreadyExistException("USER ALREADY EXIST");
      });
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setRole(USER);
       User fetchedUser =userRepo.save(user);
        return new UserDto(fetchedUser.getId(),
                           fetchedUser.getUsername(),
                           fetchedUser.getFirstName(),
                           fetchedUser.getLastName());
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
