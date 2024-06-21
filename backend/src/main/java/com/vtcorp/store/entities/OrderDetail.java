package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_detail")
public class OrderDetail {

    @Embeddable
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderDetailId implements Serializable {
        @Column(name = "fk_order_id")
        private String orderId;
        @Column(name = "fk_product_id")
        private long productId;
    }

    @EmbeddedId
    private OrderDetailId orderDetailId;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "fk_order_id")
    private Order order;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "fk_product_id")
    @JsonView(Views.Cart.class)
    private Product product;

    @JsonView(Views.Cart.class)
    private Integer quantity;

    @JsonView(Views.Cart.class)
    private Double price;
}
