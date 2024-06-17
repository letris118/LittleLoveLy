package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.GiftDTO;
import com.vtcorp.store.entities.Gift;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface GiftMapper {

    Gift toEntity(GiftDTO giftDTO);

    @Mapping(target = "giftId", ignore = true)
    void updateEntity(GiftDTO giftDTO, @MappingTarget Gift gift);

}
