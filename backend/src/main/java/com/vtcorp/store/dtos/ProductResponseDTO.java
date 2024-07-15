package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.entities.Brand;
import com.vtcorp.store.entities.Category;
import com.vtcorp.store.entities.ProductImage;
import com.vtcorp.store.entities.ProductReview;
import com.vtcorp.store.jsonview.Views;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {

    @JsonView({Views.Product.class, Views.ProductCustomerView.class, Views.ProductManagementView.class})
    private long productId;

    @JsonView({Views.Product.class, Views.ProductCustomerView.class, Views.ProductManagementView.class})
    private String name;

    @JsonView(Views.Product.class)
    private Double listedPrice;

    @JsonView({Views.Product.class, Views.ProductCustomerView.class, Views.ProductManagementView.class})
    private Double sellingPrice;

    @JsonView(Views.Product.class)
    private String description;

    @JsonView({Views.Product.class, Views.ProductCustomerView.class})
    private Integer noSold;

    @JsonView({Views.Product.class, Views.ProductManagementView.class})
    private Integer stock;

    @JsonView({Views.Product.class, Views.ProductManagementView.class})
    private boolean active;

    @JsonView({Views.Product.class, Views.ProductCustomerView.class})
    private double averageRating;

    @JsonView(Views.Product.class)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date addedDate;

    @JsonView({Views.Product.class, Views.ProductManagementView.class})
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date lastModifiedDate;

    @JsonView({Views.Product.class, Views.ProductManagementView.class})
    private Brand brand;

    @JsonView(Views.Product.class)
    private List<Category> categories;

    @JsonView({Views.Product.class, Views.ProductCustomerView.class, Views.ProductManagementView.class})
    private List<ProductImage> productImages;

    @JsonView(Views.Product.class)
    private List<ProductReview> productReviews;
}
