package com.madlx.chatify.dataRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import java.util.UUID;

@Data
public class MessageRequest {
    @NotNull
    @NotBlank(message = "data should not be blank")
    private String content;
    private UUID roomId;
}
