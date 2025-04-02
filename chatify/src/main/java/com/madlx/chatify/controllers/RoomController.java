package com.madlx.chatify.controllers;

import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.security.AppUserDetails;
import com.madlx.chatify.service.RoomService;
import com.madlx.chatify.utility.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RoomDto> createRoom(@RequestBody Room room, @AuthenticationPrincipal UserDetails userDetails)throws UserNotAuthorizedException {
        return new ResponseEntity<RoomDto>(roomService.createRoom(room,userDetails), HttpStatus.OK);
    }

    @DeleteMapping("/leave")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Room> leaveRoom(@RequestParam UUID roomId,@AuthenticationPrincipal UserDetails userDetails){
        return new ResponseEntity<Room>(roomService.leaveRoom(roomId,userDetails),HttpStatus.OK);
    }

    @PostMapping("/join/{uuid}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RoomDto>joinRoom(@PathVariable(value = "uuid") UUID roomId,@AuthenticationPrincipal AppUserDetails userDetails){
        return new ResponseEntity<>(roomService.joinRoom(roomId,userDetails),HttpStatus.OK);
    }
    @GetMapping("/getUsers")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUserByRoom(@RequestParam UUID roomId, @AuthenticationPrincipal UserDetails userDetails){
        List<UserDto> users=roomService.allUserByRoom(roomId,userDetails);
       return new ResponseEntity<>(new ApiResponse<>("all users ",users),HttpStatus.OK);
    }

}