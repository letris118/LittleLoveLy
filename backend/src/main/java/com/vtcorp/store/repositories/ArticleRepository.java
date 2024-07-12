package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByActive(boolean active);
    @Transactional
    @Modifying
    @Query("UPDATE Article a SET a.active = ?1 WHERE a.articleId = ?2")
    void setActivateArticle(boolean active, long id);

}