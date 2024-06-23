package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherRequestDTO {

    private long voucherId;
    private String title;
    private Integer limit;

    private String type;
    private String description;
    private Double discountPercentage;
    private Double maxDiscountAmount;
    private Double discountAmount;
    private Double minOrderAmount;
    private Double shipDiscountAmount;
    private Date startDate;
    private Date endDate;


}
