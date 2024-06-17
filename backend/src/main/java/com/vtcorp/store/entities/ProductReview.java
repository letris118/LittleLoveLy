package com.vtcorp.store.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_review")
public class ProductReview {

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductReviewId implements Serializable {
        @Column(name = "fk_product_id")
        private long productId;
        @Column(name = "fk_username")
        private String username;
    }

    @EmbeddedId
    private ProductReviewId productReviewId;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "fk_product_id")
    private Product product;

    @ManyToOne
    @MapsId("username")
    @JoinColumn(name = "fk_username")
    private User user;

    private String feedback;
    private Integer star;
    private String imagePath;

}
