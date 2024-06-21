package com.vtcorp.store.services;

import com.vtcorp.store.dtos.ArticleRequestDTO;
import com.vtcorp.store.dtos.ArticleResponseDTO;
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

    public List<ArticleResponseDTO> getAllArticles() {
        return articleMapper.toResponseDTOs(articleRepository.findAll());
    }

    public List<ArticleResponseDTO> getActiveArticles() {
        return articleMapper.toResponseDTOs(articleRepository.findByActive(true));
    }

    public ArticleResponseDTO getArticleById(Long id) {
        return articleMapper.toResponseDTO(articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found")));
    }

    @Transactional
    public ArticleResponseDTO addArticle(ArticleRequestDTO articleRequestDTO) {

        List<Long> productIds = articleRequestDTO.getProductIds();
        List<Product> products = Collections.emptyList();

        if (productIds != null && !productIds.isEmpty()) {
            products = productRepository.findAllById(articleRequestDTO.getProductIds());
            if (products.size() != articleRequestDTO.getProductIds().size()) {
                throw new RuntimeException("One or more products not found");
            }
        }

        Article article = articleMapper.toEntity(articleRequestDTO);
        List<ArticleImage> images = handleImages(articleRequestDTO.getNewImageFiles(), article);
        article.setUploadedDate(new Date());
        article.setActive(true);
        article.setProducts(products);
        article.setArticleImages(images);
        try {
            return articleMapper.toResponseDTO(articleRepository.save(article));
        } catch (Exception e) {
            throw new RuntimeException("Failed to save article", e);
        }
    }

    @Transactional
    public ArticleResponseDTO updateArticle(ArticleRequestDTO articleRequestDTO) {
        Article article = articleRepository.findById(articleRequestDTO.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article not found"));

        List<Long> productIds = articleRequestDTO.getProductIds();
        List<Product> products = Collections.emptyList();

        if (productIds != null && !productIds.isEmpty()) {
            products = productRepository.findAllById(articleRequestDTO.getProductIds());
            if (products.size() != articleRequestDTO.getProductIds().size()) {
                throw new RuntimeException("One or more products not found");
            }
        }

        List<ArticleImage> newImages = handleImages(articleRequestDTO.getNewImageFiles(), article);
        List<ArticleImage> savedImages = article.getArticleImages();
        List<ArticleImage> imagesToDelete = null;
        if (savedImages != null && !savedImages.isEmpty()) {
            imagesToDelete = new ArrayList<>(savedImages);
            List<Long> imageToKeepIds = articleRequestDTO.getImageIds();
            if (imageToKeepIds != null && !imageToKeepIds.isEmpty()) {
                List<ArticleImage> imagesToKeep = articleImageRepository.findAllById(imageToKeepIds);
                imagesToDelete.removeAll(imagesToKeep);
                newImages.addAll(imagesToKeep);
            }
        }
        articleMapper.updateEntity(articleRequestDTO, article);
        article.setProducts(products);
        article.getArticleImages().clear();
        article.getArticleImages().addAll(newImages);

        if (imagesToDelete != null) {
            removeImages(imagesToDelete);
        }
        return articleMapper.toResponseDTO(article);

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