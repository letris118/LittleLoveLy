package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Message;
import com.vtcorp.store.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByBelongToOrderByDateAsc(User user);

    @Query("SELECT DISTINCT m.belongTo.username FROM Message m")
    List<String> findDistinctBelongToUsernames();

}
