package com.vtcorp.store.dtos;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDTO {

    private String cusName;
    private String cusMail;
    private String cusPhone;
    private Integer provinceId;
    private Integer districtId;
    private Integer wardCode;
    private String cusStreet;

    private String voucherId;

    private List<CartItemDTO> orderDetails;

}