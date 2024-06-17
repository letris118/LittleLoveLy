package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActive(boolean active);

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.active = ?1 WHERE p.productId = ?2")
    void setActivateProduct(boolean active, long id);
}