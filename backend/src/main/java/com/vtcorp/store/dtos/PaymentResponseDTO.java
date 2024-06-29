package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentResponseDTO {

    @JsonView(Views.Order.class)
    private String code;

    @JsonView(Views.Order.class)
    private String message;

    @JsonView(Views.Order.class)
    private String data;
}
