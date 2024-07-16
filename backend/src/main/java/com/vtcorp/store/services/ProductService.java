package com.vtcorp.store.services;

import com.vtcorp.store.dtos.ProductListResponseDTO;
import com.vtcorp.store.dtos.ProductRequestDTO;
import com.vtcorp.store.dtos.ProductResponseDTO;
import com.vtcorp.store.dtos.ReviewRequestDTO;
import com.vtcorp.store.dtos.projections.ProductBuyerView;
import com.vtcorp.store.dtos.projections.ProductManagementView;
import com.vtcorp.store.entities.*;
import com.vtcorp.store.mappers.ProductMapper;
import com.vtcorp.store.mappers.ProductReviewMapper;
import com.vtcorp.store.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class ProductService {

    private static final String UPLOAD_PRODUCT_IMG_DIR = "src/main/resources/static/images/products";
    private static final String UPLOAD_REVIEW_IMG_DIR = "src/main/resources/static/images/reviews";
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final UserRepository userRepository;
    private final ProductReviewMapper productReviewMapper;
    private final ProductReviewRepository productReviewRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductMapper productMapper, BrandRepository brandRepository, CategoryRepository categoryRepository, ProductImageRepository productImageRepository, UserRepository userRepository, ProductReviewMapper productReviewMapper, ProductReviewRepository productReviewRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.productImageRepository = productImageRepository;
        this.userRepository = userRepository;
        this.productReviewMapper = productReviewMapper;
        this.productReviewRepository = productReviewRepository;
    }

    public ProductListResponseDTO getAllProducts(Pageable pageable) {
        Page<ProductManagementView> projectedProducts = productRepository.findAllBy(pageable);
        List<ProductResponseDTO> products = productMapper.toResponseDTOs(projectedProducts.getContent());
        return new ProductListResponseDTO(products, projectedProducts.getTotalPages());
    }

    public ProductListResponseDTO getActiveProducts(Pageable pageable) {
        Page<ProductBuyerView> projectedProducts = productRepository.findByActiveTrue(pageable);
        List<ProductResponseDTO> products = new ArrayList<>();
        for (ProductBuyerView projectedProduct : projectedProducts.getContent()) {
            ProductResponseDTO dto = productMapper.toResponseDTO(projectedProduct);
            dto.setAverageRating(calculateAverageRating(projectedProduct.getProductReviews()));
            products.add(dto);
        }
        return new ProductListResponseDTO(products, projectedProducts.getTotalPages());
    }

    public ProductResponseDTO getProductById(Long id) {
        return mapProductToProductResponseDTO(productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found")));
    }

    public List<ProductResponseDTO> getAllProductsByBrand(long brandId) {
        Brand brand = brandRepository.findById(brandId).get();
        List<Product> products = productRepository.findByBrand(brand);
        return mapProductsToProductResponseDTOs(products);
    }

    public List<ProductResponseDTO> getActiveProductsByBrand(long brandId) {
        Brand brand = brandRepository.findById(brandId).get();
        List<Product> products = productRepository.findByBrandAndActive(brand, true);
        return mapProductsToProductResponseDTOs(products);
    }

    public List<ProductResponseDTO> getAllProductsByCategories(List<Long> categoryIds) {
        List<Category> categories = categoryRepository.findAllById(categoryIds);
        if (categories.size() != categoryIds.size()) {
            throw new RuntimeException("One or more categories not found");
        }

        List<Product> products = productRepository.findAllByCategories(categoryIds);

        return mapProductsToProductResponseDTOs(products);

    }

    public List<ProductResponseDTO> getActiveProductsByCategories(List<Long> categoryIds) {
        List<Category> categories = categoryRepository.findAllById(categoryIds);
        if (categories.size() != categoryIds.size()) {
            throw new RuntimeException("One or more categories not found");
        }

        List<Product> products = productRepository.findActiveByCategories(categoryIds);

        return mapProductsToProductResponseDTOs(products);

    }

    public ProductListResponseDTO getAllProductsBySearchQuery(String searchQuery, Pageable pageable) {
        searchQuery = escapeSpecialCharacters(searchQuery);
        Page<ProductManagementView> projectedProducts = productRepository.findByNameContainingIgnoreCase(searchQuery, pageable);
        List<ProductResponseDTO> products = productMapper.toResponseDTOs(projectedProducts.getContent());
        return new ProductListResponseDTO(products, projectedProducts.getTotalPages());
    }

    public List<ProductResponseDTO> getActiveProductsBySearchQuery(String searchQuery) {
        List<Product> products = productRepository.findByNameContainingIgnoreCaseAndActive(searchQuery, true);

        return products != null ? mapProductsToProductResponseDTOs(products) : Collections.emptyList();
    }

    private String escapeSpecialCharacters(String input) {
        return input.replace("%", "\\%").replace("_", "\\_").replace("[", "\\[").replace("]", "\\]").replace("^", "\\^").replace("\\", "\\\\");
    }

    public List<ProductResponseDTO> getAllProductsByFieldAndAscOrDesc(String field, boolean isAsc) {
        return isAsc ? mapProductsToProductResponseDTOs(productRepository.findAll(Sort.by(field).ascending())) : mapProductsToProductResponseDTOs(productRepository.findAll(Sort.by(field).descending()));
    }

    @Transactional
    public ProductResponseDTO addProduct(ProductRequestDTO productRequestDTO) {

        Brand brand = brandRepository.findById(productRequestDTO.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        List<Category> categories = categoryRepository.findAllById(productRequestDTO.getCategoryIds());
        if (categories.size() != productRequestDTO.getCategoryIds().size()) {
            throw new RuntimeException("One or more categories not found");
        }
        Product product = productMapper.toEntity(productRequestDTO);
        product.setNoSold(0);
        product.setActive(true);
        product.setBrand(brand);
        product.setCategories(categories);
        List<ProductImage> images = handleProductImages(productRequestDTO.getNewImageFiles(), product);
        product.setProductImages(images);
        product.setAddedDate(new Date());
        product.setLastModifiedDate(product.getAddedDate());
        try {
            return productMapper.toResponseDTO(productRepository.save(product));
        } catch (Exception e) {
            throw new RuntimeException("Failed to save product", e);
        }
    }

    @Transactional
    public ProductResponseDTO addReview(ReviewRequestDTO reviewRequestDTO) {
        long productId = reviewRequestDTO.getProductId();
        String username = reviewRequestDTO.getUsername();


        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        ProductReview productReview = productReviewMapper.toEntity(reviewRequestDTO);

        productReview.setProduct(product);
        productReview.setUser(user);
        productReview.setUploadedDate(new Date());

        if (reviewRequestDTO.getImage() != null) {
            Path uploadPath = Paths.get(UPLOAD_REVIEW_IMG_DIR);
            try {
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                String storedFileName = System.currentTimeMillis() + "_" + reviewRequestDTO.getImage().getOriginalFilename();
                try (InputStream inputStream = reviewRequestDTO.getImage().getInputStream()) {
                    Files.copy(inputStream, Paths.get(UPLOAD_REVIEW_IMG_DIR, storedFileName), StandardCopyOption.REPLACE_EXISTING);
                    productReview.setImagePath(storedFileName);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to save image", e);
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }

        productReviewRepository.save(productReview);
        product.getProductReviews().add(productReview);
        user.getProductReviews().add(productReview);
        return mapProductToProductResponseDTO(product);

    }

    @Transactional
    public ProductResponseDTO updateProduct(ProductRequestDTO productRequestDTO) {
        Product product = productRepository.findById(productRequestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Brand brand = brandRepository.findById(productRequestDTO.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        List<Category> categories = categoryRepository.findAllById(productRequestDTO.getCategoryIds());
        if (categories.size() != productRequestDTO.getCategoryIds().size()) {
            throw new RuntimeException("One or more categories not found");
        }
        List<ProductImage> newImages = handleProductImages(productRequestDTO.getNewImageFiles(), product);
        List<ProductImage> savedImages = product.getProductImages();
        List<ProductImage> imagesToDelete = null;
        if (savedImages != null && !savedImages.isEmpty()) {
            imagesToDelete = new ArrayList<>(savedImages);
            List<Long> imageToKeepIds = productRequestDTO.getImageIds();
            if (imageToKeepIds != null && !imageToKeepIds.isEmpty()) {
                List<ProductImage> imagesToKeep = productImageRepository.findAllById(imageToKeepIds);
                imagesToDelete.removeAll(imagesToKeep);
                newImages.addAll(imagesToKeep);
            }
        }

        // annotation @Transactional is used to roll back the transaction if an exception occurs
        // any changes made to managed entities will be automatically saved to the database
        // no need to call save() method
        productMapper.updateEntity(productRequestDTO, product);
        product.setBrand(brand);
        product.setCategories(categories);
        product.getProductImages().clear();
        product.getProductImages().addAll(newImages);
        product.setLastModifiedDate(new Date());
        if (imagesToDelete != null) {
            removeImages(imagesToDelete);
        }
        return mapProductToProductResponseDTO(product);
    }

    public String deactivateProduct(long id) {
        productRepository.setActivateProduct(false, id);
        return "Product deactivated";
    }

    public String activateProduct(long id) {
        productRepository.setActivateProduct(true, id);
        return "Product activated";
    }


    private List<ProductImage> handleProductImages(List<MultipartFile> imageFiles, Product product) {
        List<ProductImage> productImageList = new ArrayList<>();
        if (imageFiles != null) {
            Path uploadPath = Paths.get(UPLOAD_PRODUCT_IMG_DIR);
            try {
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                for (MultipartFile image : imageFiles) {
                    String storedFileName = (new Date()).getTime() + "_" + image.getOriginalFilename();
                    try (InputStream inputStream = image.getInputStream()) {
                        Files.copy(inputStream, Paths.get(UPLOAD_PRODUCT_IMG_DIR, storedFileName), StandardCopyOption.REPLACE_EXISTING);
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

    private void removeImages(List<ProductImage> images) {
        for (ProductImage image : images) {
            Path imagePath = Paths.get(UPLOAD_PRODUCT_IMG_DIR, image.getImagePath());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image", e);
            }
        }
    }

    private double calculateAverageRating(List<ProductReview> productReviews) {
        if (productReviews == null || productReviews.isEmpty()) {
            return 0;
        }
        int totalStars = 0;
        for (ProductReview review : productReviews) {
            totalStars += review.getStar();
        }
        double average = (double) totalStars / productReviews.size();
        return Math.round(average * 10.0) / 10.0;
    }

    private ProductResponseDTO mapProductToProductResponseDTO(Product product) {
        ProductResponseDTO productResponseDTO = productMapper.toResponseDTO(product);
        productResponseDTO.setAverageRating(calculateAverageRating(product.getProductReviews()));
        return productResponseDTO;
    }

    private List<ProductResponseDTO> mapProductsToProductResponseDTOs(List<Product> products) {
        List<ProductResponseDTO> productResponseDTOs = new ArrayList<>();
        for (Product product : products) {
            productResponseDTOs.add(mapProductToProductResponseDTO(product));
        }
        return productResponseDTOs;
    }
}