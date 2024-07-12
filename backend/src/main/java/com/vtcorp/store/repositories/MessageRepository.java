package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Message;
import com.vtcorp.store.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByBelongTo(User user);
}
