package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.ArticleRequestDTO;
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
    ResponseEntity<?> getArticleById(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(articleService.getArticleById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Add article")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addArticle(@ModelAttribute ArticleRequestDTO articleRequestDTO) {
        try {
            return ResponseEntity.ok(articleService.addArticle(articleRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update article by ID")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateArticle(@PathVariable long id, @ModelAttribute ArticleRequestDTO articleRequestDTO) {
        if (id != articleRequestDTO.getArticleId()) {
            return ResponseEntity.badRequest().body("Article ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(articleService.updateArticle(articleRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
