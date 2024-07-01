package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.ArticleImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleImageRepository extends JpaRepository<ArticleImage, Long> {
    Optional<ArticleImage> findByImagePath(String imagePath);
}
