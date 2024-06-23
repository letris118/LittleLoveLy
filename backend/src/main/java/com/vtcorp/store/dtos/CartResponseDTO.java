package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.entities.GiftIncluding;
import com.vtcorp.store.entities.OrderDetail;
import com.vtcorp.store.jsonview.Views;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {

    @JsonView(Views.Cart.class)
    private List<OrderDetail> orderDetails;

    @JsonView(Views.Cart.class)
    private List<GiftIncluding> giftIncludings;
}
