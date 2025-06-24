package com.madlx.chatify.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import reactor.util.annotation.Nullable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long messageId;
    @NotNull
    @NotEmpty
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
