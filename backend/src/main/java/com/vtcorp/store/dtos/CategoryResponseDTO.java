package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vtcorp.store.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDTO {

    private long categoryId;
    private String name;

    @JsonIgnoreProperties({"subCategories", "parentCategory", "products", "brands"})
    private List<Category> subCategories;

    @JsonIgnoreProperties({"subCategories", "parentCategory", "products", "brands"})
    private Category parentCategory;
}
