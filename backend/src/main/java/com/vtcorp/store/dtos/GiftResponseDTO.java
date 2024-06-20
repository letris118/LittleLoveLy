package com.vtcorp.store.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GiftResponseDTO {

    private long giftId;
    private String name;
    private Integer point;
    private Integer stock;
    private String imagePath;
    private boolean active;
}