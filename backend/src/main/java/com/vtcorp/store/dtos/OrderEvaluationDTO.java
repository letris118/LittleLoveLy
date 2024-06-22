package com.vtcorp.store.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderEvaluationDTO {

    private double totalPrice;
    private double basePrice;
    private Double shippingFee;
    private int totalPoint;
    private int additionalPoint;
}
