package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.MessageDTO;
import com.vtcorp.store.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
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

    @GetMapping("/chat/history/{username}")
    public List<MessageDTO> getChatHistory(@PathVariable String username) {
        return chatService.getChatHistory(username);
    }
}
