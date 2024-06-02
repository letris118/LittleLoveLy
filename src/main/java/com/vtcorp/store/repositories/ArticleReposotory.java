package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleReposotory extends JpaRepository<Article, Long> {
}
