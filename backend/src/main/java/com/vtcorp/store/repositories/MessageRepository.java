package com.vtcorp.store.repositories;

import com.vtcorp.store.dtos.UserMessageReadDTO;
import com.vtcorp.store.entities.Message;
import com.vtcorp.store.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByBelongToOrderByDateAsc(User user);

    @Query("SELECT new com.vtcorp.store.dtos.UserMessageReadDTO(m.belongTo.username, " +
            "CASE WHEN COUNT(m) > SUM(CASE WHEN m.isRead = true THEN 1 ELSE 0 END) THEN false ELSE true END) " +
            "FROM Message m GROUP BY m.belongTo.username")
    List<UserMessageReadDTO> findUsernamesWithReadStatus();

    @Transactional
    @Modifying
    @Query("UPDATE Message m SET m.isRead = true WHERE m.belongTo.username = :username AND m.isRead = false")
    void markMessagesAsReadByUser(@Param("username") String username);

}
