package com.madlx.chatify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class RoomDto  {
    private UUID roomId;
    private String roomName;
    private String roomDescription;
    private Long hostId;
    private String username;

    public RoomDto(UUID roomId, String roomName, String roomDescription) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomDescription = roomDescription;
    }
}
