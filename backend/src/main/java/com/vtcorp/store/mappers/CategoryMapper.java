package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.CategoryResponseDTO;
import org.mapstruct.Mapper;
import com.vtcorp.store.entities.Category;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponseDTO toResponseDTO(Category category);

    List<CategoryResponseDTO> toResponseDTOs(List<Category> categories);
}
