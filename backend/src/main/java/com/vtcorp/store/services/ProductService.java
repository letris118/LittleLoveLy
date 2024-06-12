package com.vtcorp.store.services;

import com.vtcorp.store.dtos.ProductDTO;
import com.vtcorp.store.entities.Brand;
import com.vtcorp.store.entities.Category;
import com.vtcorp.store.entities.Product;
import com.vtcorp.store.entities.ProductImage;
import com.vtcorp.store.mappers.ProductMapper;
import com.vtcorp.store.repositories.BrandRepository;
import com.vtcorp.store.repositories.CategoryRepository;
import com.vtcorp.store.repositories.ProductImageRepository;
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
import java.util.Date;
import java.util.List;

@Service
public class ProductService {

    private static final String UPLOAD_DIR = "src/main/resources/static/images/products";
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductMapper productMapper, BrandRepository brandRepository, CategoryRepository categoryRepository, ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.productImageRepository = productImageRepository;
    }

    public List<Product> getActiveProducts() {
        return productRepository.findProductsByActive(true);
    }

    public Product getProductById(Long id) {
        return productRepository.getReferenceById(id);
    }

    @Transactional
    public Product saveProduct(ProductDTO productDTO) {
        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        List<Category> categories = categoryRepository.findAllById(productDTO.getCategoryIds());
        if (categories.size() != productDTO.getCategoryIds().size()) {
            throw new RuntimeException("One or more categories not found");
        }

        Product product = productMapper.toEntity(productDTO);
        product.setBrand(brand);
        product.setCategories(categories);
        List<ProductImage> images = handleProductImages(productDTO.getNewImageFiles(), product);
        product.setProductImages(images);
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save product", e);
        }
    }

    @Transactional
    public Product updateProduct(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        List<Category> categories = categoryRepository.findAllById(productDTO.getCategoryIds());
        if (categories.size() != productDTO.getCategoryIds().size()) {
            throw new RuntimeException("One or more categories not found");
        }
        List<ProductImage> newImages = handleProductImages(productDTO.getNewImageFiles(), product);
        List<ProductImage> savedImages = product.getProductImages();
        List<ProductImage> imagesToDelete = null;
        if (savedImages != null && !savedImages.isEmpty()) {
            imagesToDelete = new ArrayList<>(savedImages);
            List<Long> imageToKeepIds = productDTO.getImageProductIds();
            if (imageToKeepIds != null && !imageToKeepIds.isEmpty()) {
                List<ProductImage> imagesToKeep = productImageRepository.findAllById(imageToKeepIds);
                imagesToDelete.removeAll(imagesToKeep);
                newImages.addAll(imagesToKeep);
            }
        }

        // annotation @Transactional is used to roll back the transaction if an exception occurs
        // any changes made to managed entities will be automatically saved to the database
        // no need to call save() method
        productMapper.updateEntity(productDTO, product);
        product.setBrand(brand);
        product.setCategories(categories);
        product.getProductImages().clear();
        product.getProductImages().addAll(newImages);

        if (imagesToDelete != null) {
            removeImages(imagesToDelete);
        }
        return product;
    }

    private List<ProductImage> handleProductImages(List<MultipartFile> imageFiles, Product product) {
        List<ProductImage> productImageList = new ArrayList<>();
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
                        productImageList.add(ProductImage.builder()
                                .imagePath(storedFileName)
                                .product(product)
                                .build());
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to save image", e);
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }
        return productImageList;
    }

    public void removeImages(List<ProductImage> images) {
        for (ProductImage image : images) {
            Path imagePath = Paths.get(UPLOAD_DIR, image.getImagePath());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image", e);
            }
        }
    }
}