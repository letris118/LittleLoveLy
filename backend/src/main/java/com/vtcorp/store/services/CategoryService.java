package com.vtcorp.store.services;

import com.vtcorp.store.dtos.CategoryResponseDTO;
import com.vtcorp.store.mappers.CategoryMapper;
import com.vtcorp.store.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryResponseDTO> getAllCategories() {
        return categoryMapper.toResponseDTOs(categoryRepository.findAll());
    }

    public CategoryResponseDTO getCategoryById(Long id) {
        return categoryMapper.toResponseDTO(categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found")));
    }
}
