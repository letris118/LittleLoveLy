package com.vtcorp.store.services;

import com.vtcorp.store.entities.Product;
import com.vtcorp.store.repositories.BrandRepository;
import com.vtcorp.store.repositories.CategoryRepository;
import com.vtcorp.store.repositories.ProductRepository;
import interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, BrandRepository brandRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Product> getActiveProducts() {
        return productRepository.findProductsByActive(true);
    }

    @Override
    public Product geProductById(Long id) {
        return productRepository.getReferenceById(id);
    }
}
