package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "brand")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long brandId;
    private String name;
    private String logo;

    @JsonIgnoreProperties({"brand", "articles", "orderDetails", "productReviews"})
    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

    @JsonIgnoreProperties({"brands", "products", "subCategories", "parentCategory"})
    @ManyToMany
    @JoinTable(name = "brand_specializing",
            joinColumns = @JoinColumn(name = "fk_brand_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_category_id"))
    private List<Category> categories;

}
