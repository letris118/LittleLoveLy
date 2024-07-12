package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.MessageDTO;
import com.vtcorp.store.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageDTO receiveMessage(@Payload MessageDTO messageDTO) {
        return messageDTO;
    }

    @MessageMapping("/private-message")
    public MessageDTO recMessage(@Payload MessageDTO messageDTO) {
        chatService.saveAndSendMessage(messageDTO);
        return messageDTO;
    }

    @GetMapping("/chat/customers/{username}")
    public List<MessageDTO> getChatHistory(@PathVariable String username) {
        return chatService.getChatHistory(username);
    }

    @GetMapping("/chat/customers")
    public List<String> getCustomers() {
        return chatService.getCustomers();
    }
}
