package com.madlx.chatify.dto;

import lombok.Data;

@Data
public class TopicDto {
    private Long topicId;
    private String topicName;
    private String topicDescription;
    private String createdBy ;
    private int room;

    public TopicDto(long topicId,String topicName, String topicDescription, String createdBy, int room) {
        this.createdBy=createdBy;
        this.topicId=topicId;
        this.topicName=topicName;
        this.topicDescription=topicDescription;
        this.room=room;
    }
}
