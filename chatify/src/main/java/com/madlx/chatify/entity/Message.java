package com.madlx.chatify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long messageId;
    @Column(columnDefinition ="TEXT")
    private String content;
    @ManyToOne(optional = false)
    private User user;
    @ManyToOne(optional = false)
    @JoinColumn(name = "room_id")
    private Room room;
    @ManyToOne(optional = false)
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
