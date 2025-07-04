package com.madlx.chatify.controllers;

import com.madlx.chatify.dataRequest.RoomRequest;
import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.security.AppUserDetails;
import com.madlx.chatify.service.RoomService;
import com.madlx.chatify.utility.ApiResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins ="http://localhost:5173")
public class RoomController {
    @Autowired
    private RoomService roomService;
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RoomDto> createRoom(@RequestBody  @NotNull RoomRequest room, @AuthenticationPrincipal UserDetails userDetails)throws UserNotAuthorizedException {
        return new ResponseEntity<>(roomService.createRoom(room,userDetails), HttpStatus.OK);
    }

    @DeleteMapping("/leave")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Room> leaveRoom(@RequestParam String roomId,@AuthenticationPrincipal UserDetails userDetails){
        return new ResponseEntity<Room>(roomService.leaveRoom(UUID.fromString(roomId),userDetails),HttpStatus.OK);
    }
    @GetMapping("/isParticipant")
    @PreAuthorize("isAuthenticated()")
    public boolean isParticipant(@RequestParam String roomId, @AuthenticationPrincipal UserDetails userDetails){
        return roomService.isMemberOfRoom(UUID.fromString(roomId), userDetails.getUsername());
    }
    @PostMapping("/join/{uuid}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<RoomDto>>joinRoom(@PathVariable(value = "uuid") UUID roomId,@AuthenticationPrincipal AppUserDetails userDetails){
        boolean participant = roomService.isMemberOfRoom(roomId, userDetails.getUsername());
        return participant
                ? ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("you  are  already  in this room", null))
                : ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("", roomService.joinRoom(roomId, userDetails)));
    }


    @GetMapping("/getUsers")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUserByRoom(@RequestParam UUID roomId, @AuthenticationPrincipal UserDetails userDetails){
        List<UserDto> users=roomService.allUserByRoom(roomId,userDetails);
       return new ResponseEntity<>(new ApiResponse<>("all users ",users),HttpStatus.OK);
    }
    @GetMapping("getRooms")
    public ResponseEntity<ApiResponse<List<RoomDto>>> getAllRoom(@AuthenticationPrincipal UserDetails userDetails){
        return   ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<List<RoomDto>>("rooms have been fetched",roomService.getAllRooms(userDetails)));
    }
}