package com.madlx.chatify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long userid;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
}
