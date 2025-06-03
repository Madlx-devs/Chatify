package com.madlx.chatify.repo;

import com.madlx.chatify.dto.UserDto;
import com.madlx.chatify.entity.Room;
import com.madlx.chatify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomRepo  extends JpaRepository<Room, UUID> {
    Optional<Room> findByUuid(UUID roomId);
}
