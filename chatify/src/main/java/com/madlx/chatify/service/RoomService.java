package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.RoomRequest;
import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.entity.Room;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;

public interface RoomService {

    RoomDto createRoom(RoomRequest roomRequest, UserDetails userDetails);


    RoomDto joinRoom(UUID roomId, UserDetails userDetails);

    List<RoomDto> getAllRooms(UserDetails userDetails);

    Room leaveRoom(UUID roomId, UserDetails userDetails);

    List<UserDto> allUserByRoom(UUID roomId, UserDetails userDetails);

    boolean isMemberOfRoom(UUID roomId, String username);

    List<RoomDto> getRoom(String username);
}
