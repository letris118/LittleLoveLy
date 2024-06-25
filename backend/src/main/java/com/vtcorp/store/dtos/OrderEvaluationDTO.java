package com.vtcorp.store.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderEvaluationDTO {

    private double basePrice;
    private Double shippingFee;
    private int bonusPoint;

    private Integer totalQuantity;
    private Double totalPrice;
    private Double postDiscountPrice;
    private Integer totalPoint;
}
