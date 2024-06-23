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
    private String type;
    private String description;
    private Double discountPercentage;
    private Double maxDiscountAmount;
    private Double discountAmount;
    private Double minOrderAmount;
    private Double shipDiscountAmount;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date endDate;
    private boolean active;

}
