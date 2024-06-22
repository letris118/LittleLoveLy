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
    private Long cusCityCode;
    private Long cusDistrictId;
    private Long cusWardCode;
    private String cusStreet;

    private String voucherId;

    private List<CartItemDTO> orderDetails;

    private List<Long> giftIds;

}