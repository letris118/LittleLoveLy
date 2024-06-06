package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;
    private String name;

    @JsonIgnoreProperties({"subCategories", "parentCategory", "products", "brands"})
    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    private List<Category> subCategories;

    @JsonIgnoreProperties({"subCategories", "parentCategory", "products", "brands"})
    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @JsonIgnoreProperties({"categories", "articles", "orderDetails", "productReviews"})
    @ManyToMany(mappedBy = "categories")
    private List<Product> products;

    @JsonIgnoreProperties({"categories", "products"})
    @ManyToMany(mappedBy = "categories")
    private List<Brand> brands;


}
