package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@Builder
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
    @JsonView(Views.Cart.class)
    private Gift gift;

    @JsonView(Views.Cart.class)
    private Integer quantity;

    @JsonView(Views.Cart.class)
    private Integer point;

}
