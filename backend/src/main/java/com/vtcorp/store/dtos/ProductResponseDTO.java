package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vtcorp.store.entities.Brand;
import com.vtcorp.store.entities.Category;
import com.vtcorp.store.entities.ProductImage;
import com.vtcorp.store.entities.ProductReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {
    private long productId;
    private String name;
    private Double listedPrice;
    private Double sellingPrice;
    private String description;
    private Integer noSold;
    private Integer stock;
    private boolean active;
    private double averageRating;

    @JsonIgnoreProperties({"products", "categories"})
    private Brand brand;

    @JsonIgnoreProperties({"products", "subCategories", "parentCategory", "brands"})
    private List<Category> categories;

    @JsonIgnoreProperties("product")
    private List<ProductImage> productImages;

    @JsonIgnoreProperties("product")
    private List<ProductReview> productReviews;
}
