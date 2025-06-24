package com.madlx.chatify.controllers;

import com.madlx.chatify.dataRequest.MessageRequest;
import com.madlx.chatify.dto.MessageDto;
import com.madlx.chatify.security.AppUserDetails;
import com.madlx.chatify.service.MessageService;
import com.madlx.chatify.service.MessageServiceImpl;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/message")
@CrossOrigin(origins ="http://localhost:5173")
public class MessageControllers {

    private  final MessageService messageService;

    public MessageControllers(MessageServiceImpl messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody @NotNull MessageRequest messageRequest, @AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(messageService.sendMessage(messageRequest,userDetails),HttpStatus.CREATED);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deleteMessage(@RequestParam Long messageId ,@AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(messageService.deleteMessage(messageId,userDetails),HttpStatus.OK);
    }

    @GetMapping("/getAll/{roomId}")
    public ResponseEntity<List<MessageDto>> GetAllMessagesOfRoom(@PathVariable String roomId,@AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(messageService.AllMessageRoom(UUID.fromString(roomId),userDetails),HttpStatus.OK);
    }
}
