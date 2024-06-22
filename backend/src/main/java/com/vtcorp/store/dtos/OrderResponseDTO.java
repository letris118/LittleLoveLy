package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vtcorp.store.entities.GiftIncluding;
import com.vtcorp.store.entities.OrderDetail;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.entities.Voucher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {

    private String orderId;
    private String createdDate;
    private String status;
    private String cusName;
    private String cusMail;
    private String cusPhone;
    private Long cusCityCode;
    private Long cusDistrictId;
    private Long cusWardCode;
    private String cusStreet;
    private Integer totalQuantity;
    private Double totalPrice;
    private Double postDiscountPrice;
    private Integer totalPoint;
    private String trackingCode;

    @JsonIgnoreProperties({"orders", "vouchers", "productReviews"})
    private User user;

    @JsonIgnoreProperties({"orders", "users"})
    private Voucher voucher;

    @JsonIgnoreProperties({"order", "product"})
    private List<OrderDetail> orderDetails;

    @JsonIgnoreProperties({"order", "gift.giftIncludings"})
    private List<GiftIncluding> giftIncludings;
}
