package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.RegisterRequest;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.exceptions.UserAlreadyExistException;

public interface UserService {
    UserDto registerUser(RegisterRequest request) throws UserAlreadyExistException;

    boolean deleteUser(Long userId);

    UserDto getUser(String username);

    void updateUser(long userId, User user);
}
