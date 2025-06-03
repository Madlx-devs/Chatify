package com.madlx.chatify.dataRequest;

import lombok.Data;


import java.util.UUID;

@Data
public class MessageRequest {
    private String content;
    private UUID roomId;
}
