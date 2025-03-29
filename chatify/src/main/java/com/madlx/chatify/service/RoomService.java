package com.madlx.chatify.service;

import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.exceptions.RoomNotFoundException;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.exceptions.TopicNotFoundException;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.repo.RoomRepo;
import com.madlx.chatify.repo.UserRepo;
import com.madlx.chatify.security.AppUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {

    private  final  RoomRepo roomRepo;

    private  final  UserRepo userRepo;


    @PreAuthorize("isAuthenticated()")
    public RoomDto createRoom(Room room,UserDetails userDetails){
        if(room.getTopic()==null){
            throw new TopicNotFoundException("no topic selected");
        }
       userRepo.findByUsername(userDetails.getUsername()).map((user) -> {room.setHost(user);
        room.setParticipants(Set.of(user));
        room.setAdmins(List.of(user));
           return room;
       });
     Room roomMap=roomRepo.save(room);
    return new RoomDto(roomMap.getUuid(),
             roomMap.getRoomName(),
             roomMap.getRoomDescription(),
             roomMap.getHost().getId(),
     roomMap.getHost().getUsername());
    }
    @PreAuthorize("isAuthenticated()")
    public RoomDto joinRoom(UUID roomId,UserDetails userDetails) {
        Room room= roomRepo.findById(roomId).
                orElseThrow(()->new RoomNotFoundException("no room present"));
        User user =userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(()->new RuntimeException("no user"));
        room.getParticipants().add(user);
        Room roomSaved= roomRepo.save(room);
        return new RoomDto(roomSaved.getUuid(),roomSaved.getRoomName(),roomSaved.getRoomDescription(),user.getId(),user.getUsername());
    }

    @PreAuthorize("isAuthenticated()")
    public Room leaveRoom(UUID roomId, UserDetails userDetails) {
        return roomRepo.findById(roomId)
                .map(room -> {
                    room.getParticipants().removeIf(user -> user.getUsername().equals(userDetails.getUsername()));
                    return roomRepo.save(room);
                })
                .orElseThrow(() -> new RoomNotFoundException("ROOM NOT FOUND"));
    }

    public List<UserDto> allUserByRoom(UUID roomId, UserDetails userDetails) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));

        User user = userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!room.getParticipants().contains(user)) {
            throw new UserNotAuthorizedException("User not authorized");
        }
        return room.getParticipants().stream()
                .map(user1 -> new UserDto(user1.getId(), user1.getUsername(), user1.getFirstname(), user1.getLastname()))
                .toList();
    }
}
