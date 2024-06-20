package com.vtcorp.store.services;

import com.vtcorp.store.dtos.*;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.mappers.UserMapper;
import com.vtcorp.store.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

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
        userRequestDTO.setRole("ROLE_CUSTOMER");
        User user = addUser(userRequestDTO);
        emailSenderService.sendEmail(userRequestDTO.getMail(), "Welcome to our store", "Welcome to our store, " + userRequestDTO.getName());
        return tokenService.generateAccessToken(user);
    }

    public User addUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = userMapper.toEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        return userRepository.save(user);
    }

    public List<UserResponseDTO> getAllUsers() {
        return userMapper.toResponseDTOs(userRepository.findAll());
    }

    public UserResponseDTO getUserById(String id) {
        return userMapper.toResponseDTO(userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found")));
    }

    public String forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
        if (!userRepository.existsByMail(forgotPasswordDTO.getMail())) {
            throw new IllegalArgumentException("Mail not found");
        }
        String token = tokenService.generatePasswordResetToken(forgotPasswordDTO.getMail());
        String content = "<p>Click to recover password: </p>" +
                "<a href='http://localhost:3000/reset-password?token=" +
                token + "'>Recover password</a>";
        emailSenderService.sendEmail(forgotPasswordDTO.getMail(), "Password recovery", content);
        return "Check your email to recover password";
    }

    public String changePassword(ChangePasswordDTO changePasswordDTO) {
        String token = changePasswordDTO.getToken();
        if (token == null) {
            throw new IllegalArgumentException("Token not found");
        }
        String mail = tokenService.validateToken(token).getSubject();
        User user = userRepository.findByMail(mail).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
        emailSenderService.sendEmail(mail, "Password Changed", "Your password has been changed successfully");
        return "Password changed successfully";
    }

    @Transactional
    public UserResponseDTO updateUser(UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(userRequestDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateEntity(userRequestDTO, user);
        userRepository.save(user);
        return userMapper.toResponseDTO(user);
    }

    public String updateMail(String username, String newMail) {
        if (!userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("User not found");
        }
        if (userRepository.existsByMail(newMail)) {
            throw new IllegalArgumentException("Mail already exists");
        }
        String token = tokenService.generateMailChangeToken(username, newMail);
        String content = "<p>Click to confirm mail change: </p>" +
                "<a href='http://localhost:3000/confirm-mail?token=" +
                token + "'>Confirm mail change</a>";
        emailSenderService.sendEmail(newMail, "Mail change", content);
        return "Check your email to confirm mail change";
    }

    public String confirmMailChange(String token) {
        Jwt jwt = tokenService.validateToken(token);
        String username = jwt.getSubject();
        String newEmail = (String) jwt.getClaims().get("newEmail");
        User user = userRepository.findById(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setMail(newEmail);
        userRepository.save(user);
        return "Mail changed successfully";
    }

}
