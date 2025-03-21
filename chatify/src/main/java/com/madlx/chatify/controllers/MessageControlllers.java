package com.madlx.chatify.controllers;

import com.madlx.chatify.dataRequest.MessageRequest;
import com.madlx.chatify.dto.MessageDto;
import com.madlx.chatify.entity.Message;
import com.madlx.chatify.security.AppUserDetails;
import com.madlx.chatify.service.MessageServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/message")
public class MessageControlllers{

    private  final MessageServiceImpl messageService;

    public MessageControlllers(MessageServiceImpl messageService) {
        this.messageService = messageService;
    }
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest messageRequest, @AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(messageService.sendMessage(messageRequest,userDetails),HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<MessageDto>> GetAllMessagesOfRoom(@RequestParam UUID roomId,@AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(messageService.AllMessageRoom(roomId,userDetails),HttpStatus.OK);
    }
}
