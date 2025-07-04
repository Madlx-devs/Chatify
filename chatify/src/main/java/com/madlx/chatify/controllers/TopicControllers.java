package com.madlx.chatify.controllers;

import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.dto.TopicDto;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.entity.Topic;
import com.madlx.chatify.service.TopicService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topic")
@CrossOrigin(origins ="http://localhost:5173")
public class TopicControllers {
    private final TopicService topicService;
    @Autowired
    public TopicControllers(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public TopicDto createTopic(@RequestBody @NotNull Topic topic, @AuthenticationPrincipal UserDetails userDetails){
    return topicService.createTopic(topic,userDetails);
    }

    @GetMapping("/getAll")
    public List<TopicDto> getAllTopics(@AuthenticationPrincipal UserDetails userDetails){
        return topicService.getAllTopic(userDetails);
    }
    @GetMapping("/getMyTopics")
    public List<TopicDto> getMyTopics (@AuthenticationPrincipal UserDetails userDetails){
        return topicService.getTopicByUser(userDetails);
    }
    @GetMapping("/allRooms")
    public List<Room> getAllRooms(@RequestParam  @NotNull Long topicId , @AuthenticationPrincipal UserDetails userDetails){
        return  topicService.allRoom(topicId);
    }
}
