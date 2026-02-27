package com.madlx.chatify.service;

import com.madlx.chatify.dto.TopicDto;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.entity.Topic;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface TopicService {
    @PreAuthorize("isAuthenticated()")
    TopicDto createTopic(Topic topic, UserDetails userDetails);

    List<TopicDto> getAllTopic(UserDetails userDetails);

    List<Room> allRoom(long topicId);

    List<TopicDto> getTopicByUser(UserDetails userDetails);
}
