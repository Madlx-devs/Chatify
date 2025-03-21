package com.madlx.chatify.controllers;

import com.madlx.chatify.dto.TopicDto;
import com.madlx.chatify.entity.Topic;
import com.madlx.chatify.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/topic")
public class TopicControllers {
    private final TopicService topicService;
    @Autowired
    public TopicControllers(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public TopicDto createTopic(@RequestBody Topic topic, @AuthenticationPrincipal UserDetails userDetails){
    return topicService.createTopic(topic,userDetails);
    }

}
