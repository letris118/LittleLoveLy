package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {

    @Id
    private String orderId;
    private Date createdDate;
    private String status;
    private String cusName;
    private String cusMail;
    private String cusPhone;
    private Long cusCityCode;
    private Long cusDistrictId;
    private Long cusWardCode;
    private String cusStreet;
    private Integer totalQuantity;
    private Double basePrice;
    private Double finalBasePrice;
    private Double shippingFee;
    private Double finalShippingFee;
    private Double postDiscountPrice;
    private Integer totalPoint;
    private String trackingCode;

    @ManyToOne
    @JoinColumn(name = "fk_username")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fk_voucher_id")
    private Voucher voucher;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GiftIncluding> giftIncludings;

}
