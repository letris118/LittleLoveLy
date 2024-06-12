package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Article;
import com.vtcorp.store.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByActive(boolean active);
}