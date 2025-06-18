package com.madlx.chatify.service;

import com.madlx.chatify.dataRequest.RoomRequest;
import com.madlx.chatify.repo.TopicRepo;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.madlx.chatify.dto.RoomDto;
import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.entity.Topic;
import com.madlx.chatify.entity.User;
import com.madlx.chatify.exceptions.RoomNotFoundException;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.exceptions.TopicNotFoundException;
import com.madlx.chatify.exceptions.UserNotAuthorizedException;
import com.madlx.chatify.repo.RoomRepo;
import com.madlx.chatify.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {

    private  final  RoomRepo roomRepo;

    private  final  UserRepo userRepo;
    private  final TopicRepo topicRepo;


    @PreAuthorize("isAuthenticated()")
    public RoomDto createRoom(RoomRequest roomRequest, UserDetails userDetails) {

        // Fetch host (current user)
        User host = userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Fetch topic
        Topic topic = topicRepo.findById(roomRequest.getTopicId())
                .orElseThrow(() -> new TopicNotFoundException("Topic not found"));

        // Create new Room entity
        Room room = new Room();
        room.setRoomName(roomRequest.getRoomName());
        room.setRoomDescription(roomRequest.getRoomDescription());
        room.setHost(host);
        room.setTopic(topic);
        room.setParticipants(Set.of(host));
        room.setAdmins(List.of(host));

        // Save and return DTO
        Room savedRoom = roomRepo.save(room);

        //add the room to the topic
        int i = topic.getRooms().isEmpty()?0:topic.getRooms().size();
        topic.getRooms().add(i, savedRoom);


        return new RoomDto(
                savedRoom.getUuid(),
                savedRoom.getRoomName(),
                savedRoom.getRoomDescription(),
                savedRoom.getHost().getId(),
                savedRoom.getHost().getUsername()
        );
    }
    @PreAuthorize("isAuthenticated()")
    public RoomDto joinRoom(UUID roomId,UserDetails userDetails) {
        Room room= roomRepo.findById(roomId).
                orElseThrow(()->new RoomNotFoundException("no room present"));
        User user =userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(()->new RuntimeException("no user"));
        room.getParticipants().add(user);
        Room roomSaved= roomRepo.save(room);
        return new RoomDto(roomSaved.getUuid(),roomSaved.getRoomName(),roomSaved.getRoomDescription(),user.getId(),user.getUsername());
    }

    @PreAuthorize("isAuthenticated()")
    public Room leaveRoom(UUID roomId, UserDetails userDetails) {
        return roomRepo.findById(roomId)
                .map(room -> {
                    room.getParticipants().removeIf(user -> user.getUsername().equals(userDetails.getUsername()));
                    return roomRepo.save(room);
                })
                .orElseThrow(() -> new RoomNotFoundException("ROOM NOT FOUND"));
    }

    public List<UserDto> allUserByRoom(UUID roomId, UserDetails userDetails) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));

        User user = userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!room.getParticipants().contains(user)) {
            throw new UserNotAuthorizedException("User not authorized");
        }
        return room.getParticipants().stream()
                .map(user1 -> new UserDto(user1.getId(), user1.getUsername(), user1.getFirstname(), user1.getLastname(), user1.getEmail()))
                .toList();
    }

    public boolean isMemberOfRoom(UUID roomId, String username) {
        Room room = roomRepo.findByUuid(roomId).orElseThrow(() -> new RuntimeException("room not find"));
        return room.getParticipants().stream().anyMatch(user -> user.getUsername().equals(username));
    }

    public List<RoomDto> getRoom(String username) {
        return roomRepo.findAll().stream().filter((room )-> Objects.equals(room.getHost().getUsername(), username))
                .map(room -> new RoomDto(room.getUuid(),room.getRoomName(),room.getRoomDescription(),room.getHost().getId(), room.getHost().getUsername())).toList();
    }
}
