package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{username}")
    ResponseEntity<?> getUserById(@PathVariable String username) {
        try {
            return ResponseEntity.ok(userService.getUserById(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody UserDTO userDTO) {
        String role = userDTO.getRole();
        if (role == null || (!role.equals("ROLE_ADMIN") && !role.equals("ROLE_CUSTOMER")
                && !role.equals("ROLE_STAFF"))) {
            return ResponseEntity.badRequest().body("Invalid role");
        }
        try {
            return ResponseEntity.ok(userService.addUser(userDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
