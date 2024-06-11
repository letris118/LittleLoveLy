package com.vtcorp.store.dtos;

import com.vtcorp.store.entities.Product;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private String orderId;
    private Date createdDate = new Date();
    private String status = "Đang chờ xử lí";
    private String cusName;
    private String cusMail;
    private String cusPhone;
    private String cusCity;
    private String cusDistrict;
    private String cusWard;
    private String cusStreet;
    private Integer totalQuantity;
    private Double totalPrice;
    private Double postDiscountPrice;
    private Integer totalPoint;
    private String trackingCode;

    private String username;
    private String voucherId;
    private List<Long> productIds;//orderdetail
    private List<Long> giftIds;//giftincluding

}