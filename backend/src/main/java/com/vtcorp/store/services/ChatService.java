package com.vtcorp.store.services;

import com.vtcorp.store.constants.Role;
import com.vtcorp.store.dtos.MessageDTO;
import com.vtcorp.store.entities.Message;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.repositories.MessageRepository;
import com.vtcorp.store.repositories.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ChatService {

    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;

    public ChatService(MessageRepository messageRepository, SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveAndSendMessage(MessageDTO messageDTO) {
        messageRepository.save(toEntity(messageDTO));
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(), "/private", messageDTO);
    }

    public List<MessageDTO> getChatHistory(String username) {
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        List<Message> messages = messageRepository.findByBelongToOrderByDateAsc(user);
        List<MessageDTO> messageDTOs = new ArrayList<>();
        for (Message message : messages) {
            messageDTOs.add(toDTO(message));
        }
        return messageDTOs;
    }

    private Message toEntity(MessageDTO messageDTO) {
        boolean isCustomer = true;
        User customer = userRepository.findById(messageDTO.getSenderName()).orElse(null);
        if (customer == null || !customer.getRole().equals(Role.ROLE_CUSTOMER)) {
            customer = userRepository.findById(messageDTO.getReceiverName()).orElseThrow(() -> new RuntimeException("Customer not found"));
            isCustomer = false;
        }
        Message message = new Message();
        message.setMessage(messageDTO.getMessage());
        message.setDate(new Date());
        message.setCustomer(isCustomer);
        message.setBelongTo(customer);
        if (customer.getMessages() == null) {
            customer.setMessages(new ArrayList<>());
        }
        customer.getMessages().add(message);
        return message;
    }

    private MessageDTO toDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        if (message.isCustomer()) {
            messageDTO.setSenderName(message.getBelongTo().getUsername());
            messageDTO.setReceiverName("staff");
        } else {
            messageDTO.setSenderName("staff");
            messageDTO.setReceiverName(message.getBelongTo().getUsername());
        }
        messageDTO.setMessage(message.getMessage());
        messageDTO.setDate(message.getDate());
        return messageDTO;
    }

    public List<String> getCustomers() {
        return messageRepository.findDistinctBelongToUsernames();
    }
}
