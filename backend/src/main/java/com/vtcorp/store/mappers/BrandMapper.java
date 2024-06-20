package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.BrandResponseDTO;
import com.vtcorp.store.entities.Brand;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    BrandResponseDTO toResponseDTO(Brand brand);

    List<BrandResponseDTO> toResponseDTOs(List<Brand> brands);
}
