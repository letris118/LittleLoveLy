package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.ChangePasswordDTO;
import com.vtcorp.store.dtos.ForgotPasswordDTO;
import com.vtcorp.store.dtos.LoginDTO;
import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
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
            return ResponseEntity.ok(userService.register(userDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        try {
            return ResponseEntity.ok(userService.forgotPassword(forgotPasswordDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            return ResponseEntity.ok(userService.changePassword(changePasswordDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}