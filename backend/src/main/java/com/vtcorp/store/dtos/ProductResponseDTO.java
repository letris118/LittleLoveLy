package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vtcorp.store.entities.Brand;
import com.vtcorp.store.entities.Category;
import com.vtcorp.store.entities.ProductImage;
import com.vtcorp.store.entities.ProductReview;
import lombok.*;

import java.util.Date;
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
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date addedDate;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date lastModifiedDate;

    @JsonIgnoreProperties("products")
    private Brand brand;

    @JsonIgnoreProperties({"products", "subCategories", "parentCategory"})
    private List<Category> categories;

    @JsonIgnoreProperties("product")
    private List<ProductImage> productImages;

    @JsonIgnoreProperties({"product", "user"})
    private List<ProductReview> productReviews;
}
