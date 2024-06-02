package com.vtcorp.store.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_image")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "fk_product_id")
    private Product product;

}
