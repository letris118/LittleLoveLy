package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, ProductReview.ProductReviewId> {
}
