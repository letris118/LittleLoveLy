package com.vtcorp.store.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {

    private String orderId;
    private long productId;

    private Integer quantity;
    private Double price;
}
