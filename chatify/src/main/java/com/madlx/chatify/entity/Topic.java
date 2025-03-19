package com.madlx.chatify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long topicId;
    @Column(nullable = false)
    private String topicName;
    private String topicDescription;
    @OneToMany(mappedBy ="topic",orphanRemoval = true ,fetch =FetchType.LAZY)
    private List<Room> rooms;
}
