package com.vtcorp.store.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_detail")
public class OrderDetail {

    @Embeddable
    @Data
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
    private Product product;

    private Integer quantity;
    private Double price;
}
