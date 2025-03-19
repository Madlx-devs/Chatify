package com.madlx.chatify.controllers;

import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.security.AppUserDetails;
import com.madlx.chatify.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RoomDto> createRoom(@RequestBody Room room, @AuthenticationPrincipal AppUserDetails userDetails)throws UserNotAuthorizedException {
        return new ResponseEntity<RoomDto>(roomService.createRoom(room,userDetails), HttpStatus.OK);
    }

    @DeleteMapping("/leave")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Room> leaveRoom(@RequestParam UUID roomId,@AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<Room>(roomService.leaveRoom(roomId,userDetails),HttpStatus.OK);
    }

    @PostMapping("/join/{uuid}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RoomDto>joinRoom(@PathVariable(value = "uuid") UUID roomId,@AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(roomService.joinRoom(roomId,userDetails),HttpStatus.OK);
    }
}