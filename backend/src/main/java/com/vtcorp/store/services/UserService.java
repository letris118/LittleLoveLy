package com.vtcorp.store.services;

import com.vtcorp.store.dtos.ChangePasswordDTO;
import com.vtcorp.store.dtos.ForgotPasswordDTO;
import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.dtos.LoginDTO;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.mappers.UserMapper;
import com.vtcorp.store.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    username, loginDTO.getPassword()));
            return tokenService.generateLoginToken(authentication);
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public String register(UserDTO userDTO) {
        userDTO.setRole("ROLE_CUSTOMER");
        addUser(userDTO);
        emailSenderService.sendEmail(userDTO.getMail(), "Welcome to our store", "Welcome to our store, " + userDTO.getName());
        return "User registered successfully";
    }

    public User addUser(UserDTO userDTO) {
        if (userRepository.findById(userDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = userMapper.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public String forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
        User user = userRepository.findByMail(forgotPasswordDTO.getMail()).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
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
}
