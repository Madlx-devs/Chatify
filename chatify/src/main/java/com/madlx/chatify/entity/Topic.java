package com.madlx.chatify.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
    @JsonManagedReference // forward serialization
    private List<Room> rooms;
}
