package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsernameOrMailOrPhone(String username, String mail, String phone);
    Optional<User> findByMail(String mail);
    boolean existsByUsername(String username);
    boolean existsByMail(String mail);
    boolean existsByPhone(String phone);
}
