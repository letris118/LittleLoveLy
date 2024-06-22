package com.vtcorp.store.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTotalDTO {

    private double totalPrice;
    private int totalPoint;

}
