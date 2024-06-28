package com.vtcorp.store.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderEvaluationDTO {

    private Integer totalQuantity;
    private Integer totalPoint;
    private Double basePrice;
    private Double finalBasePrice;
    private Double shippingFee;
    private Double finalShippingFee;
    private Double postDiscountPrice;

    private int bonusPoint;
}
