package com.vtcorp.store.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;
    private String content;
    private Date timestamp;

    @ManyToOne
    @JoinColumn(name = "fk_sender_username")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "fk_conversation_id")
    private Conversation conversation;

}
