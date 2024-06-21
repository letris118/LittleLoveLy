package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.UserRequestDTO;
import com.vtcorp.store.dtos.UserResponseDTO;
import com.vtcorp.store.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    User toEntity(UserRequestDTO userRequestDTO);

    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "mail", ignore = true)
    @Mapping(target = "role", ignore = true)
    void updateEntity(UserRequestDTO userRequestDTO, @MappingTarget User user);

    UserResponseDTO toResponseDTO(User user);

    List<UserResponseDTO> toResponseDTOs(List<User> users);
}
