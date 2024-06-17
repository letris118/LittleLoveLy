package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.UserDTO;
import com.vtcorp.store.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    User toEntity(UserDTO userDTO);

    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "mail", ignore = true)
    @Mapping(target = "role", ignore = true)
    void updateEntity(UserDTO userDTO, @MappingTarget User user);
}
