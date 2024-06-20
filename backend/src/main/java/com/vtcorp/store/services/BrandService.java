package com.vtcorp.store.services;

import com.vtcorp.store.dtos.BrandResponseDTO;
import com.vtcorp.store.mappers.BrandMapper;
import com.vtcorp.store.repositories.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;

    @Autowired
    public BrandService(BrandRepository brandRepository, BrandMapper brandMapper) {
        this.brandRepository = brandRepository;
        this.brandMapper = brandMapper;
    }

    public List<BrandResponseDTO> getAllBrands() {
        return brandMapper.toResponseDTOs(brandRepository.findAll());
    }

    public BrandResponseDTO getBrandById(Long id) {
        return brandMapper.toResponseDTO(brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found")));
    }
}
