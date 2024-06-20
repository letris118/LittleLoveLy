package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponseDTO {

    private long voucherId;
    private String title;
    private Integer limit;
    private Integer appliedCount;
    private Integer type;
    private String description;
    private Double discountRate;
    private Double validMaxDiscount;
    private Double discountPrice;
    private Double validMinPrice;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date expiryDate;
    private boolean active;

}
