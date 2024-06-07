package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Product;
import org.apache.tomcat.jni.Pool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByActive(boolean active);
}