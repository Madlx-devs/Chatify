package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.MessageRequest;
import com.madlx.chatify.dto.MessageDto;
import com.madlx.chatify.exceptions.RoomNotFoundException;
import com.madlx.chatify.exceptions.TopicNotFoundException;
import com.madlx.chatify.security.AppUserDetails;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.UUID;

public interface MessageService {
    @PreAuthorize("isAuthenticated()")
    MessageDto sendMessage(MessageRequest messageRequest, UserDetails userDetails) throws UsernameNotFoundException, RoomNotFoundException, TopicNotFoundException;

    @PreAuthorize("isAuthenticated()")
    List<MessageDto> AllMessageRoom(UUID roomId, UserDetails userDetails);

    boolean deleteMessage(Long messageId,UserDetails userDetails);
}
