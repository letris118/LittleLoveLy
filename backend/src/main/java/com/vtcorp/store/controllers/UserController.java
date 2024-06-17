package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Get all users")
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get user by username")
    @GetMapping("/{username}")
    ResponseEntity<?> getUserById(@PathVariable String username) {
        try {
            return ResponseEntity.ok(userService.getUserById(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Add a new user", description = "Role must be ROLE_ADMIN, ROLE_CUSTOMER or ROLE_STAFF")
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

    @Operation(summary = "Update user by username", description = "Cannot update username, mail, password and role")
    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
        if (!username.equals(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Username in URL and body must be the same");
        }
        try {
            return ResponseEntity.ok(userService.updateUser(userDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update user's email by username", description = "Send a link with token to the new email to confirm")
    @PutMapping("/{username}/mail")
    public ResponseEntity<?> updateMail(@PathVariable String username, @RequestParam String newMail) {
        try {
            return ResponseEntity.ok(userService.updateMail(username, newMail));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Confirm email change", description = "Validates the token and update the email")
    @PutMapping("/confirm-mail-change")
    public ResponseEntity<?> confirmMailChange(@RequestParam String token) {
        try {
            return ResponseEntity.ok(userService.confirmMailChange(token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
