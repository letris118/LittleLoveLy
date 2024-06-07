package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.userdetails.UserDetails;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    UserDTO toDTO(User user);

    @Mapping(target = "password", ignore = true)
    User toEntity(UserDTO userDTO);

    default UserDTO userDetailsToUserDTO(UserDetails userDetails) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(userDetails.getUsername());
        userDTO.setRole(userDetails.getAuthorities().toString());
        return userDTO;
    }
}
