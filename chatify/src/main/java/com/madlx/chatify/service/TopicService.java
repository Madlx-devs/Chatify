package com.madlx.chatify.service;

import com.madlx.chatify.dto.TopicDto;
import com.madlx.chatify.entity.Topic;
import com.madlx.chatify.repo.RoomRepo;
import com.madlx.chatify.repo.TopicRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TopicService {

    private  final TopicRepo topicRepo;
    private  final RoomRepo roomRepo;

    @PreAuthorize("isAuthenticated()")
    public TopicDto createTopic(Topic topic, UserDetails userDetails){

        Topic topicSaved=topicRepo.save(topic);
         return new TopicDto(topicSaved.getTopicName(),topicSaved.getTopicDescription(), userDetails.getUsername());
   }
   public List<Topic> getAllTopic(UserDetails userDetails){
        return topicRepo.findAll();
    }
}
