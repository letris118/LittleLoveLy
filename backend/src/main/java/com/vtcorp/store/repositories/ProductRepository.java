package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByActive(boolean active);
}