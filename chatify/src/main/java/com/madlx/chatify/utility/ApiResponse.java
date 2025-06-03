package com.madlx.chatify.utility;

import lombok.Data;

@Data
public class ApiResponse<T>{

    String message;
    T object;

    public ApiResponse(String message, T object) {
        this.message = message;
        this.object = object;
    }
}
