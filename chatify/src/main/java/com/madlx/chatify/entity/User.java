package com.madlx.chatify.entity;

import com.madlx.chatify.enums.Roles;
import com.madlx.chatify.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor()
@AllArgsConstructor
@Entity
@Table(name = "users_details")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true,nullable = false)
    @Size(min = 3 ,message = "username should be of 3 or more characters")
    private String username;
    @Size(min = 8 ,message = "password should be greater than 8 characters")
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String firstname;
    @Column(nullable = true)
    private String lastname ;
    private Status status;
    private Roles role;

    public User(String username, String password, String firstname, String lastname) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
