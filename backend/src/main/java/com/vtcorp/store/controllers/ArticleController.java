package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.ArticleDTO;
import com.vtcorp.store.entities.Article;
import com.vtcorp.store.services.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @Operation(summary = "Get all articles")
    @GetMapping("/all")
    public ResponseEntity<?> getAllArticles() {
        try {
            return ResponseEntity.ok(articleService.getAllArticles());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active articles")
    @GetMapping
    public ResponseEntity<?> getActiveArticles() {
        try {
            return ResponseEntity.ok(articleService.getActiveArticles());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get article by ID")
    @GetMapping("/{id}")
    ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Article article = articleService.getArticleById(id);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(article);
    }

    @Operation(summary = "Add article")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addArticle(@ModelAttribute ArticleDTO articleDTO) {
        try {
            return ResponseEntity.ok(articleService.addArticle(articleDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update article by ID")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateArticle(@PathVariable long id, @ModelAttribute ArticleDTO articleDTO) {
        if (id != articleDTO.getArticleId()) {
            return ResponseEntity.badRequest().body("Article ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(articleService.updateArticle(articleDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
