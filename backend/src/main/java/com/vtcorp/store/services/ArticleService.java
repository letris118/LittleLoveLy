package com.vtcorp.store.services;

import com.vtcorp.store.dtos.ArticleDTO;
import com.vtcorp.store.entities.Article;
import com.vtcorp.store.entities.ArticleImage;
import com.vtcorp.store.entities.Product;
import com.vtcorp.store.mappers.ArticleMapper;
import com.vtcorp.store.repositories.ArticleImageRepository;
import com.vtcorp.store.repositories.ArticleRepository;
import com.vtcorp.store.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;


@Service
public class ArticleService {

    private static final String UPLOAD_DIR = "src/main/resources/static/images/articles";
    private final ArticleMapper articleMapper;
    private final ArticleRepository articleRepository;
    private final ProductRepository productRepository;
    private final ArticleImageRepository articleImageRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ProductRepository productRepository, ArticleMapper articleMapper, ArticleImageRepository articleImageRepository) {
        this.articleRepository = articleRepository;
        this.productRepository = productRepository;
        this.articleMapper = articleMapper;
        this.articleImageRepository = articleImageRepository;
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public List<Article> getActiveArticles() {
        return articleRepository.findByActive(true);
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    @Transactional
    public Article addArticle(ArticleDTO articleDTO) {

        List<Long> productIds = articleDTO.getProductIds();
        List<Product> products = Collections.emptyList();

        if (productIds != null && !productIds.isEmpty()) {
            products = productRepository.findAllById(articleDTO.getProductIds());
            if (products.size() != articleDTO.getProductIds().size()) {
                throw new RuntimeException("One or more products not found");
            }
        }

        Article article = articleMapper.toEntity(articleDTO);
        List<ArticleImage> images = handleImages(articleDTO.getNewImageFiles(), article);
        article.setProducts(products);
        article.setArticleImages(images);
        try {
            return articleRepository.save(article);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save article", e);
        }
    }

    @Transactional
    public Article updateArticle(ArticleDTO articleDTO) {
        Article article = articleRepository.findById(articleDTO.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article not found"));

        List<Long> productIds = articleDTO.getProductIds();
        List<Product> products = Collections.emptyList();

        if (productIds != null && !productIds.isEmpty()) {
            products = productRepository.findAllById(articleDTO.getProductIds());
            if (products.size() != articleDTO.getProductIds().size()) {
                throw new RuntimeException("One or more products not found");
            }
        }

        List<ArticleImage> newImages = handleImages(articleDTO.getNewImageFiles(), article);
        List<ArticleImage> savedImages = article.getArticleImages();
        List<ArticleImage> imagesToDelete = null;
        if (savedImages != null && !savedImages.isEmpty()) {
            imagesToDelete = new ArrayList<>(savedImages);
            List<Long> imageToKeepIds = articleDTO.getImageIds();
            if (imageToKeepIds != null && !imageToKeepIds.isEmpty()) {
                List<ArticleImage> imagesToKeep = articleImageRepository.findAllById(imageToKeepIds);
                imagesToDelete.removeAll(imagesToKeep);
                newImages.addAll(imagesToKeep);
            }
        }
        articleMapper.updateEntity(articleDTO, article);
        article.setProducts(products);
        article.getArticleImages().clear();
        article.getArticleImages().addAll(newImages);

        if (imagesToDelete != null) {
            removeImages(imagesToDelete);
        }
        return article;

    }

    private List<ArticleImage> handleImages(List<MultipartFile> imageFiles, Article article) {
        List<ArticleImage> articleImageList = new ArrayList<>();
        if (imageFiles != null) {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            try {
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                for (MultipartFile image : imageFiles) {
                    String storedFileName = (new Date()).getTime() + "_" + image.getOriginalFilename();
                    try (InputStream inputStream = image.getInputStream()) {
                        Files.copy(inputStream, Paths.get(UPLOAD_DIR, storedFileName), StandardCopyOption.REPLACE_EXISTING);
                        articleImageList.add(ArticleImage.builder()
                                .imagePath(storedFileName)
                                .article(article)
                                .build());
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to save image", e);
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }
        return articleImageList;

    }

    private void removeImages(List<ArticleImage> images) {
        for (ArticleImage image : images) {
            Path imagePath = Paths.get(UPLOAD_DIR, image.getImagePath());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image", e);
            }
        }
    }

}