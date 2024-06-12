package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.LoginDTO;
import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.services.EmailSenderService;
import com.vtcorp.store.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final EmailSenderService emailSenderService;

    public AuthController(UserService userService, EmailSenderService emailSenderService) {
        this.userService = userService;
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            return ResponseEntity.ok(userService.login(loginDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            userDTO.setRole("ROLE_CUSTOMER");
            User user = userService.addUser(userDTO);
            emailSenderService.sendEmail(user.getMail(), "Welcome to our store", "Welcome to our store, " + user.getName());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}