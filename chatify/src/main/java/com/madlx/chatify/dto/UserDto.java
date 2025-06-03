package com.madlx.chatify.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long userid;
    private String username;
    private String firstName;
    private String lastName;
}
