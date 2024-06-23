package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.GiftRequestDTO;
import com.vtcorp.store.dtos.GiftResponseDTO;
import com.vtcorp.store.entities.Gift;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GiftMapper {

    Gift toEntity(GiftRequestDTO giftRequestDTO);

    @Mapping(target = "giftId", ignore = true)
    void updateEntity(GiftRequestDTO giftRequestDTO, @MappingTarget Gift gift);

    GiftResponseDTO toResponseDTO(Gift gift);

    List<GiftResponseDTO> toResponseDTOs(List<Gift> gifts);
}
