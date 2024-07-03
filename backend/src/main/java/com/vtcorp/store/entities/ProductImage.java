package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "product_image")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.Cart.class)
    private long imageId;

    @JsonView({Views.Cart.class, Views.Order.class})
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "fk_product_id")
    private Product product;

}
