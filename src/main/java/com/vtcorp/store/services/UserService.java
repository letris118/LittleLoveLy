package com.vtcorp.store.services;

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

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, TokenService tokenService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userMapper = userMapper;
    }

    public UserDTO login(LoginDTO loginDTO) {
        try {
            // generate token
            String username = loginDTO.getUsername();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    username, loginDTO.getPassword()));
            String token = tokenService.generateToken(authentication);
            System.out.println("Role:[" + tokenService.decodeToken(token).getClaims().get("role") + "]");

            User user = userRepository.findByUsernameOrMail(username, username).orElse(null);
            UserDTO userDTO = userMapper.toDTO(user);
            userDTO.setToken(token);
            return userDTO;
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public User saveCustomer(UserDTO userDTO) {
        if (userRepository.findById(userDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = userMapper.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole("customer");
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

}
