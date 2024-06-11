package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.ProductDTO;
import com.vtcorp.store.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductDTO productDTO);

    @Mapping(target = "productId", ignore = true)
    void updateEntity(ProductDTO productDTO, @MappingTarget Product product);
}
