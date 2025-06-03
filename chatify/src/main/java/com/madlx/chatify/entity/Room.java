package com.madlx.chatify.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    private String roomName;
    private String roomDescription;
    @ManyToOne
    @JoinColumn(name = "host_id")
    private  User host;

    @ManyToMany
    @JoinTable(
            name = "room_participants",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonBackReference // prevent recursion
    private Topic topic;

    @JoinTable(name = "room_admins",
    joinColumns = @JoinColumn(name="room_id"),
    inverseJoinColumns = @JoinColumn(name ="admin_id")
    )
    @OneToMany
    private List<User> admins;
}
