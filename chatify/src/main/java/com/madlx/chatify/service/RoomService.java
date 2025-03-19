package com.madlx.chatify.service;

import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.enums.Roles;
import com.madlx.chatify.exceptions.RoomNotFoundException;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.repo.RoomRepo;
import com.madlx.chatify.repo.UserRepo;
import com.madlx.chatify.security.AppUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public RoomDto createRoom(Room room,AppUserDetails userDetails){
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
    public RoomDto joinRoom(UUID roomId,AppUserDetails userDetails) {
            Room roomMap= roomRepo.findById(roomId).map(room -> {
                 userRepo.findByUsername(userDetails.getUsername()).map(user -> {
                     room.setParticipants(Set.of(user));
                     return  user;
                 }).orElseThrow(()-> new RoomNotFoundException("no such room"));
                return room;
             }).orElseThrow(()-> new UsernameNotFoundException("no user found"));
             return  new RoomDto(roomMap.getUuid(),roomMap.getRoomName(),roomMap.getRoomDescription());
    }

    @PreAuthorize("isAuthenticated()")
    public Room leaveRoom(UUID roomId, AppUserDetails userDetails) {
        return roomRepo.findById(roomId)
                .map(room -> {
                    room.getParticipants().removeIf(user -> user.getUsername().equals(userDetails.getUsername()));
                    return roomRepo.save(room);
                })
                .orElseThrow(() -> new RoomNotFoundException("ROOM NOT FOUND"));
    }


}
