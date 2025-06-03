package com.madlx.chatify.dataRequest;

import lombok.Data;

@Data
public class RoomRequest {
    private long topicId;
    private String roomName;
    private String roomDescription;
}
