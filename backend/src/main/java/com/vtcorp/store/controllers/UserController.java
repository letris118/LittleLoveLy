package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.MailDTO;
import com.vtcorp.store.dtos.PasswordDTO;
import com.vtcorp.store.dtos.UserRequestDTO;
import com.vtcorp.store.constants.Role;
import com.vtcorp.store.services.OrderService;
import com.vtcorp.store.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final OrderService orderService;

    @Autowired
    public UserController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
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

    @Operation(summary = "Get all users by role", description = "role: admin, customer, staff")
    @GetMapping("/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable String role) {
        try {
            return ResponseEntity.ok(userService.getUsersByRole(role));
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
    public ResponseEntity<?> addUser(@RequestBody UserRequestDTO userRequestDTO) {
        String role = userRequestDTO.getRole();
        if (role == null || (!role.equals(Role.ROLE_ADMIN) && !role.equals(Role.ROLE_CUSTOMER)
                && !role.equals(Role.ROLE_STAFF))) {
            return ResponseEntity.badRequest().body("Invalid role");
        }
        try {
            return ResponseEntity.ok(userService.addUser(userRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update user by username", description = "Cannot update username, mail, password and role")
    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody UserRequestDTO userRequestDTO, Authentication authentication) {
        if (!username.equals(userRequestDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Username in URL and body must be the same");
        }
        try {
            String usernameAuth = (authentication != null) ? authentication.getName() : null;
            return ResponseEntity.ok(userService.updateUser(userRequestDTO, usernameAuth));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hasBoughtProduct")
    public ResponseEntity<?> hasUserBoughtProduct(@RequestParam String username, @RequestParam Long productId){
        try {
            return ResponseEntity.ok(orderService.hasUserBoughtProduct(username, productId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Change password of user by username")
    @PutMapping("/change-password/{username}")
    public ResponseEntity<?> changePassword(@PathVariable String username, @RequestBody PasswordDTO passwordDTO) {
        try {
            return ResponseEntity.ok(userService.changePassword(username, passwordDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
