package com.madlx.chatify.repo;

import com.madlx.chatify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.external.com.google.gdata.util.common.base.UnicodeEscaper;

import java.util.Optional;


@Repository
public interface UserRepo  extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String userName);

    Optional<User> findByEmail(String email);
}
