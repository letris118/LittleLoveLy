package com.vtcorp.store.dtos;

import lombok.*;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDTO {

    private long voucherId;
    private String title;
    private Integer limit;
    private Integer appliedCount = 0;
    private Integer type;
    private String description;
    private Double discountRate;
    private Double validMaxDiscount;
    private Double discountPrice;
    private Double validMinPrice;
    private Date expiryDate;
    private boolean active = true;

}
