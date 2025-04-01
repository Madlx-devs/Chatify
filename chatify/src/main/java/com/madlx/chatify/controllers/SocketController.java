package com.madlx.chatify.controllers;


import com.madlx.chatify.dataRequest.MessageRequest;
import com.madlx.chatify.security.AppUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class SocketController {

    private final MessageControllers messageControllers;

    @MessageMapping("/room/{roomId}")
    @SendTo("/room/{roomId}")
    public ResponseEntity<?> SendMessage(@DestinationVariable UUID roomId , MessageRequest request, @AuthenticationPrincipal AppUserDetails userDetails){
        return messageControllers.sendMessage(request,userDetails);
    }
}
