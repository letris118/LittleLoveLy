package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.entities.GiftIncluding;
import com.vtcorp.store.entities.OrderDetail;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.entities.Voucher;
import com.vtcorp.store.jsonview.Views;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {

    @JsonView(Views.Order.class)
    private String orderId;

    @JsonView(Views.Order.class)
    @JsonFormat(pattern = "dd/MM/yyyy, hh:mm a", timezone = "Asia/Ho_Chi_Minh")
    private Date createdDate;

    @JsonView(Views.Order.class)
    private String status;

    @JsonView(Views.Order.class)
    private String cusName;

    @JsonView(Views.Order.class)
    private String cusMail;

    @JsonView(Views.Order.class)
    private String cusPhone;

    @JsonView(Views.Order.class)
    private String cusCity;

    @JsonView(Views.Order.class)
    private String cusDistrict;

    @JsonView(Views.Order.class)
    private String cusWard;

    @JsonView(Views.Order.class)
    private String cusStreet;

    @JsonView(Views.Order.class)
    private Integer totalQuantity;

    @JsonView(Views.Order.class)
    private Double basePrice;

    @JsonView(Views.Order.class)
    private Double shippingFee;

    @JsonView(Views.Order.class)
    private Double postDiscountPrice;

    @JsonView(Views.Order.class)
    private Integer totalPoint;

    @JsonView(Views.Order.class)
    private String trackingCode;

    @JsonView(Views.Order.class)
    private Voucher voucher;

    @JsonView(Views.Order.class)
    private User user;

    @JsonView(Views.Order.class)
    private List<OrderDetail> orderDetails;

    @JsonView(Views.Order.class)
    private List<GiftIncluding> giftIncludings;
}
