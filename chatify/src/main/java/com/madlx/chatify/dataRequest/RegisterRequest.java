package com.madlx.chatify.dataRequest;


import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {


    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;

}
