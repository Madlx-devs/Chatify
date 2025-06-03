package com.madlx.chatify.repo;

import com.madlx.chatify.dto.MessageDto;
import com.madlx.chatify.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepo extends JpaRepository<Message,Long> {

    @Query(nativeQuery = true , value ="SELECT * from message where room_id=:roomId")
    List<Message>findMessageByRoom(@Param("roomId") UUID roomId);
}
