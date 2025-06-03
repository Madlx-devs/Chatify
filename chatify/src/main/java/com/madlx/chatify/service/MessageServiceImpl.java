package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.MessageRequest;
import com.madlx.chatify.dto.MessageDto;
import com.madlx.chatify.entity.Message;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.entity.Topic;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.exceptions.MessageNotFoundException;
import com.madlx.chatify.exceptions.RoomNotFoundException;
import com.madlx.chatify.exceptions.TopicNotFoundException;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.repo.MessageRepo;
import com.madlx.chatify.repo.RoomRepo;
import com.madlx.chatify.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepo messageRepo;
    private final UserRepo userRepo;
    private final RoomRepo roomRepo;
    @Autowired
    public MessageServiceImpl(MessageRepo messageRepo, RoomRepo roomRepo,UserRepo userRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.roomRepo=roomRepo;
    }
    @PreAuthorize("isAuthenticated()")
    @Override
    public MessageDto sendMessage(MessageRequest messageRequest, UserDetails userDetails)throws UsernameNotFoundException, RoomNotFoundException, TopicNotFoundException {
       //fetching the username from the authentication(securityContextHolder)
        String uname= userDetails.getUsername();
        //fetching the user based on the username;
        User user=  userRepo.findByUsername(uname).orElseThrow(()->new UsernameNotFoundException("No such user"));
        //fetching the room....
        Room room = roomRepo.findById(messageRequest.getRoomId()).orElseThrow(()->new RoomNotFoundException("no Topic exist"));
        //topic id
       Topic topic= room.getTopic();
        Message message=new Message();
        message.setUser(user);
        message.setRoom(room);
        message.setTopic(topic);
        message.setContent(messageRequest.getContent());

        Message messageReceived=messageRepo.save(message);

         return new MessageDto(messageReceived.getContent(),messageReceived.getUser().getUsername());
    }
        @PreAuthorize("isAuthenticated()")
        @Override
        public List<MessageDto> AllMessageRoom(UUID roomId, UserDetails userDetails){
        Room room = roomRepo.findById(roomId).orElseThrow(()->new RoomNotFoundException("No room found"));
        User user = userRepo.findByUsername(userDetails.getUsername()).orElseThrow(()->new UsernameNotFoundException("user not found"));
            if(!room.getParticipants().contains(user)){
              throw  new UserNotAuthorizedException("you are not authorized to view this , please join the room");
            }
            List<Message>messages= messageRepo.findMessageByRoom(roomId);
            return messages.stream().map(message -> new MessageDto(message.getContent(),message.getUser().getUsername()))
                    .toList();
        }

    @Override
    public boolean deleteMessage(Long messageId,UserDetails userDetails) {
        Message msg =messageRepo.findById(messageId).orElseThrow(()->new MessageNotFoundException("no message exist"));
        if(msg.getUser().getUsername().equals(userDetails.getUsername())){
            messageRepo.delete(msg);
            return true;
        }
        return false;
    }

}
