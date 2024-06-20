package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.ProductRequestDTO;
import com.vtcorp.store.dtos.ProductResponseDTO;
import com.vtcorp.store.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductRequestDTO productRequestDTO);

    @Mapping(target = "productId", ignore = true)
    void updateEntity(ProductRequestDTO productRequestDTO, @MappingTarget Product product);

    ProductResponseDTO toDTO(Product product);
}
