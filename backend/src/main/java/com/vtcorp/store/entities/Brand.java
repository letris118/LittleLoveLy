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


}
