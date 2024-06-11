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
@Table(name = "gift_including")
public class GiftIncluding {

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GiftIncludingId implements Serializable {
        @Column(name = "fk_order_id")
        private String orderId;
        @Column(name = "fk_gift_id")
        private long giftId;
    }

    @EmbeddedId
    private GiftIncludingId giftIncludingId;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "fk_order_id")
    private Order order;

    @ManyToOne
    @MapsId("giftId")
    @JoinColumn(name = "fk_gift_id")
    private Gift gift;

    private Integer quantity;
    private Integer point;

}
