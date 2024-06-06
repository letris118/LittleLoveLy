package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;
    private String name;
    private Double listedPrice;
    private Double sellingPrice;
    private String description;
    private Integer noSold;
    private Integer stock;
    private boolean active;

    @JsonIgnoreProperties({"products", "categories"})
    @ManyToOne
    @JoinColumn(name = "fk_brand_id")
    private Brand brand;

    @JsonIgnoreProperties({"products", "subCategories", "parentCategory", "brands"})
    @ManyToMany
    @JoinTable(name = "product_category",
            joinColumns = @JoinColumn(name = "fk_product_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_category_id"))
    private List<Category> categories;

    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    private List<Article> articles;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;

    @JsonIgnoreProperties("product")
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductReview> productReviews;

    @JsonIgnoreProperties("product")
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> productImages;

}
