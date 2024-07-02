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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


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
        article.setUploadedDate(new Date());
        article.setActive(true);
        article.setProducts(products);
        List<ArticleImage> articleImages = new ArrayList<>();
        article.setContent(handleImages(article.getContent(), article, articleImages));
        article.setArticleImages(articleImages);
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

        List<ArticleImage> newImages = new ArrayList<>();
        String content = handleImages(articleRequestDTO.getContent(), article, newImages);
        List<ArticleImage> savedImages = article.getArticleImages();
        List<ArticleImage> imagesToDelete = null;
        if (savedImages != null && !savedImages.isEmpty()) {
            imagesToDelete = new ArrayList<>(savedImages);
            imagesToDelete.removeAll(newImages);
        }
        articleMapper.updateEntity(articleRequestDTO, article);
        article.setProducts(products);
        article.setContent(content);
        article.getArticleImages().clear();
        article.getArticleImages().addAll(newImages);

        if (imagesToDelete != null) {
            removeImages(imagesToDelete);
        }
        return articleMapper.toResponseDTO(article);
    }

    public String deactivateArticle(long id) {
        articleRepository.setActivateArticle(false, id);
        return "Article deactivated";
    }

    public String activateArticle(long id) {
        articleRepository.setActivateArticle(true, id);
        return "Article activated";
    }

    private String handleImages(String content, Article article, List<ArticleImage> articleImages) {
        Pattern patternBase64 = Pattern.compile("data:image/(png|jpg|jpeg);base64,([^\"]*)");
        Pattern patternUrl = Pattern.compile("http://localhost:8010/images/articles/([^\"]*)");
        Matcher matcherBase64 = patternBase64.matcher(content);
        Matcher matcherUrl = patternUrl.matcher(content);
        int i = 0;
        Path uploadPath = Paths.get(UPLOAD_DIR);
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create upload directory", e);
        }
        // Keep old images
        while (matcherUrl.find()) {
            ArticleImage articleImage = articleImageRepository.findByImagePath(matcherUrl.group(1))
                    .orElseThrow(() -> new RuntimeException("Image not found"));
            articleImages.add(articleImage);
        }
        // Save new images
        while (matcherBase64.find()) {
            String base64Image = matcherBase64.group(2);
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            String fileName = (new Date()).getTime() + "_" + i + ".jpg";
            Path imagePath = Paths.get(UPLOAD_DIR, fileName);

            try (FileOutputStream fos = new FileOutputStream(imagePath.toFile())) {
                fos.write(imageBytes);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image", e);
            }
            if (!Files.exists(imagePath) || !Files.isReadable(imagePath)) {
                throw new RuntimeException("File is not accessible after saving: " + imagePath);
            }
            // Replace the Base64 encoded image in the content with the image URL
            String imageUrl = "http://localhost:8010/images/articles/" + fileName;
            content = content.replace(matcherBase64.group(0), imageUrl);
            // Create a new ArticleImage object and add it to the list
            ArticleImage articleImage = new ArticleImage();
            articleImage.setImagePath(fileName);
            articleImage.setArticle(article);
            articleImages.add(articleImage);
            i++;
        }
        return content;
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