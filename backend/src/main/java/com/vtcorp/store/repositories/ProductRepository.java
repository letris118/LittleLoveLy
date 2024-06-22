package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Category;
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

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.categoryId IN ?1")
    List<Product> findAllByCategories(List<Long> categoryIds);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.categoryId IN ?1 and p.active = true")
    List<Product> findActiveByCategories(List<Long> categoryIds);

    List<Product> findByNameContainingIgnoreCase(String searchQuery);

    List<Product> findByNameContainingIgnoreCaseAndActive(String searchQuery, boolean active);


}