package com.madlx.chatify.controllers;


import com.madlx.chatify.dataRequest.MessageRequest;
import com.madlx.chatify.security.AppUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins ="http://localhost:5173")
public class SocketController {

    private final MessageControllers messageControllers;

    //@MessageMapping("/room/{roomId}")
    //@SendTo("/rooms/{roomId}")
    @PostMapping("/send")
    public ResponseEntity<?> SendMessage(@DestinationVariable UUID roomId , MessageRequest request, @AuthenticationPrincipal AppUserDetails userDetails){
        return  ResponseEntity.status(HttpStatus.OK).body(messageControllers.sendMessage(request,userDetails));
    }
}
