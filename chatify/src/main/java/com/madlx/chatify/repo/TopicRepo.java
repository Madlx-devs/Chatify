package com.madlx.chatify.repo;

import com.madlx.chatify.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TopicRepo extends JpaRepository<Topic , Long> {
}
