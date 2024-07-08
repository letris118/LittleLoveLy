package com.vtcorp.store.services;

import com.vtcorp.store.constants.Role;
import com.vtcorp.store.dtos.*;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.mappers.UserMapper;
import com.vtcorp.store.repositories.UserRepository;
import com.vtcorp.store.utils.CodeGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserMapper userMapper;
    private final EmailSenderService emailSenderService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, TokenService tokenService, UserMapper userMapper, EmailSenderService emailSenderService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userMapper = userMapper;
        this.emailSenderService = emailSenderService;
    }

    public String login(LoginDTO loginDTO) {
        try {
            // generate token
            String username = loginDTO.getUsername();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, loginDTO.getPassword()));
            return tokenService.generateLoginToken(authentication);
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public String register(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByMail(userRequestDTO.getMail())) {
            throw new IllegalArgumentException("Mail already used");
        }
        if (userRepository.existsByPhone(userRequestDTO.getPhone())) {
            throw new IllegalArgumentException("Phone already used");
        }
        User user = userMapper.toEntity(userRequestDTO);
        user.setUsername(CodeGenerator.generateUsername());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        user.setRole("ROLE_CUSTOMER");
        user.setPoint(0);
        user.setRegisteredDate(new Date());
        user = userRepository.save(user);
        emailSenderService.sendWelcomeEmailAsync(user.getMail(), user.getName());
        return "User registered successfully";
    }

    public UserResponseDTO addUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = userMapper.toEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        user.setRegisteredDate(new Date());
        return userMapper.toResponseDTO(userRepository.save(user));
    }

    public List<UserResponseDTO> getAllUsers() {
        return userMapper.toResponseDTOs(userRepository.findAll());
    }

    public UserResponseDTO getUserById(String id) {
        return userMapper.toResponseDTO(userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found")));
    }

    public String forgotPassword(MailDTO mailDTO) {
        if (!userRepository.existsByMail(mailDTO.getMail())) {
            throw new IllegalArgumentException("Mail not found");
        }
        String token = tokenService.generatePasswordResetToken(mailDTO.getMail());
        String content = "<p>Click to recover password: </p>" +
                "<a href='http://localhost:3000/resetPassword?token=" +
                token + "'>Recover password</a>";
        emailSenderService.sendEmailAsync(mailDTO.getMail(), "Password recovery", content);
        return "Check your email to recover password";
    }

    public String resetPassword(PasswordDTO passwordDTO) {
        String token = passwordDTO.getToken();
        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }
        String mail = tokenService.validateToken(token).getSubject();
        User user = userRepository.findByMail(mail).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        user.setPassword(passwordEncoder.encode(passwordDTO.getNewPassword()));
        userRepository.save(user);
        emailSenderService.sendEmailAsync(mail, "Password Changed", "Your password has been changed successfully");
        return "Password changed successfully";
    }

    @Transactional
    public UserResponseDTO updateUser(UserRequestDTO userRequestDTO, String usernameAuth) {
        User user = userRepository.findById(userRequestDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateEntity(userRequestDTO, user);
        User userAuth = (usernameAuth != null) ? userRepository.findById(usernameAuth).orElse(null) : null;
        String mail = userRequestDTO.getMail();
        if (mail != null && userAuth != null && userAuth.getRole().equals(Role.ROLE_ADMIN) && (user.getRole().equals(Role.ROLE_ADMIN) || user.getRole().equals(Role.ROLE_STAFF))) {
            user.setMail(mail);
        }
        userRepository.save(user);
        return userMapper.toResponseDTO(user);
    }

    public String updateMail(String username, MailDTO mailDTO) {
        if (!userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("User not found");
        }
        String newMail = mailDTO.getMail();
        if (newMail == null || newMail.isEmpty()) {
            throw new IllegalArgumentException("No mail provided");
        }
        if (userRepository.existsByMail(newMail)) {
            throw new IllegalArgumentException("Mail already exists");
        }
        String token = tokenService.generateMailChangeToken(username, newMail);
        String content = "<p>Click to confirm mail change: </p>" +
                "<a href='http://localhost:8010/api/auth/confirm-change-mail?token=" +
                token + "'>Confirm mail change</a>";
        emailSenderService.sendEmailAsync(newMail, "Mail change", content);
        return "Check your email to confirm mail change";
    }

    public String confirmChangeMail(String token) {
        Jwt jwt = tokenService.validateToken(token);
        String username = jwt.getSubject();
        String newEmail = (String) jwt.getClaims().get("newEmail");
        User user = userRepository.findById(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setMail(newEmail);
        userRepository.save(user);
        emailSenderService.sendEmailAsync(newEmail, "Mail Changed", "Your mail has been changed successfully");
        return "http://localhost:3000/profile?msg=mail-changed";
    }

    public List<UserResponseDTO> getUsersByRole(String role) {
        switch (role) {
            case "admin" -> role = Role.ROLE_ADMIN;
            case "customer" -> role = Role.ROLE_CUSTOMER;
            case "staff" -> role = Role.ROLE_STAFF;
        }
        return userMapper.toResponseDTOs(userRepository.findByRole(role));
    }

    public String changePassword(String username, PasswordDTO passwordDTO) {
        User user = userRepository.findById(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!passwordEncoder.matches(passwordDTO.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Incorrect current password");
        }
        user.setPassword(passwordEncoder.encode(passwordDTO.getNewPassword()));
        userRepository.save(user);
        emailSenderService.sendEmailAsync(user.getMail(), "Password Changed", "Your password has been changed successfully");
        return "Password changed successfully";
    }
}
