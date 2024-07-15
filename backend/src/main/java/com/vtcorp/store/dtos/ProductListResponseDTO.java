package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponseDTO {

    @JsonView({Views.ProductCustomerView.class, Views.ProductManagementView.class})
    private List<ProductResponseDTO> products;

    @JsonView({Views.ProductCustomerView.class, Views.ProductManagementView.class})
    private int totalPages;
}
