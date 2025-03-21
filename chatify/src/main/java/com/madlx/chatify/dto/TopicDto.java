package com.madlx.chatify.dto;

import lombok.Data;

@Data
public class TopicDto {

    private String topicName;
    private String topicDescription;
    private String createdBy ;

    public TopicDto(String topicName, String topicDescription, String createdBy) {
        this.createdBy=createdBy;
        this.topicName=topicName;
        this.topicDescription=topicDescription;
    }
}
